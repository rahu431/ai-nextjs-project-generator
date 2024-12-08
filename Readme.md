# AI Next.js Project Generator

A CLI tool to generate Next.js projects with AI-generated code, including optimized and reusable components, hooks, and APIs based on user requirements.

## Features

- Create a new Next.js project with TypeScript, Tailwind CSS, and TanStack Query.
- Add new pages, hooks, and APIs to an existing Next.js project.
- Generate project files using OpenAI's GPT-4.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rahu431/ai-nextjs-project-generator.git
   cd ai-nextjs-project-generator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Link the CLI Tool Locally**

   ```bash
   npm link
   ```

## Usage

### Create a New Project

To create a new Next.js project, run the following command:

```bash
create-ai-nextjs-project
```

You will be prompted to enter the project name, description, and your OpenAI API key.

### Add Features to an Existing Project

To add new pages, hooks, and APIs to an existing Next.js project, run the following command:

```bash
create-ai-nextjs-project
```

You will be prompted to enter the project name, description, and your OpenAI API key. Additionally, you will be asked if this is an existing project. Answer `yes` to add features to the existing project.

## Example Workflow

1. **Run the CLI Tool**

   ```bash
   create-ai-nextjs-project
   ```

2. **Follow the Prompts**

   - Enter your project name.
   - Describe the main functionality of your project.
   - Enter your OpenAI API key.
   - Indicate whether this is an existing project.

3. **Project Setup**

   - For a new project, the tool will set up a Next.js project with TypeScript, Tailwind CSS, and TanStack Query.
   - For an existing project, the tool will add the specified features to the project.

4. **AI-Generated Code**

   - The tool will use OpenAI to generate code based on your project description.
   - The generated code will be written to the appropriate files in the project directory.

## Requirements

- Node.js (v14 or higher)
- npm
- OpenAI API key

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.