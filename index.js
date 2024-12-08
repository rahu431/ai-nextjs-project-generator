#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer');
const chalk = require('chalk');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Enter your project name:',
  },
  {
    type: 'input',
    name: 'projectDescription',
    message: 'Describe the main functionality of your project:',
  },
  {
    type: 'input',
    name: 'openaiApiKey',
    message: 'Enter your OpenAI API key:',
  },
  {
    type: 'confirm',
    name: 'isExistingProject',
    message: 'Is this an existing project?',
    default: false,
  },
];

inquirer.prompt(questions).then(async (answers) => {
  const { projectName, projectDescription, openaiApiKey, isExistingProject } = answers;
  const projectPath = path.join(process.cwd(), projectName);

  if (!isExistingProject) {
    console.log(chalk.green(`Creating project ${projectName}...`));

    // Create project directory
    fs.mkdirSync(projectPath);

    // Initialize Next.js project with TypeScript
    execSync(`npx create-next-app@latest ${projectName} --typescript`, { stdio: 'inherit' });

    // Navigate to project directory
    process.chdir(projectPath);

    // Install Tailwind CSS
    execSync('npm install -D tailwindcss postcss autoprefixer', { stdio: 'inherit' });
    execSync('npx tailwindcss init -p', { stdio: 'inherit' });

    // Configure Tailwind CSS
    const tailwindConfig = `
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    `;
    fs.writeFileSync('tailwind.config.js', tailwindConfig);

    // Ensure the styles directory exists
    const stylesDir = path.join(projectPath, 'styles');
    if (!fs.existsSync(stylesDir)) {
      fs.mkdirSync(stylesDir);
    }
    const globalsCss = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    `;
    fs.writeFileSync(path.join(stylesDir, 'globals.css'), globalsCss);

    // Install TanStack Query
    execSync('npm install @tanstack/react-query', { stdio: 'inherit' });

    // Ensure the pages directory exists
    const pagesDir = path.join(projectPath, 'pages');
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir);
    }

    // Set up TanStack Query in _app.tsx
    const appTsx = `
    import '../styles/globals.css';
    import type { AppProps } from 'next/app';
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import { useState } from 'react';

    function MyApp({ Component, pageProps }: AppProps) {
      const [queryClient] = useState(() => new QueryClient());

      return (
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      );
    }

    export default MyApp;
    `;
    fs.writeFileSync(path.join(pagesDir, '_app.tsx'), appTsx);
  } else {
    console.log(chalk.green(`Adding features to existing project ${projectName}...`));

    // Navigate to project directory
    process.chdir(projectPath);
  }

  // Generate project files using AI
  const aiResponse = await axios.post(
    'https://api.openai.com/v1/engines/davinci-codex/completions',
    {
      prompt: `Generate a Next.js project with the following description: ${projectDescription}. Include optimized and reusable components, hooks, and any necessary APIs.`,
      max_tokens: 3000,
      n: 1,
      stop: null,
      temperature: 0.7,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
    }
  );

  const generatedCode = aiResponse.data.choices[0].text;

  // Write the generated code to multiple files
  const files = JSON.parse(generatedCode);
  for (const [filePath, fileContent] of Object.entries(files)) {
    const fullPath = path.join(projectPath, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, fileContent);
  }

  console.log(chalk.green('Project setup complete with AI-generated code!'));
});