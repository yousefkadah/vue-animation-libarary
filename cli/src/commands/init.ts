import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import ora from 'ora';

export async function initProject(options: any): Promise<void> {
  try {
    console.log(chalk.blue('🎉 Welcome to Vue Magic UI!\n'));

    const questions = [
      {
        type: 'text',
        name: 'projectPath',
        message: 'Where is your Vue project located?',
        initial: '.'
      },
      {
        type: 'text',
        name: 'componentsDir',
        message: 'Where should we create the components directory?',
        initial: './src/components'
      },
      {
        type: 'confirm',
        name: 'addTailwind',
        message: 'Do you want to add Tailwind CSS classes info?',
        initial: true
      }
    ];

    const response = options.yes ? {} : await prompts(questions);
    
    const projectPath = response.projectPath || '.';
    const componentsDir = response.componentsDir || './src/components';
    const addTailwind = response.addTailwind !== false;

    const spinner = ora('Setting up Vue Magic UI...').start();

    // Ensure components directory exists
    const fullComponentsPath = path.resolve(projectPath, componentsDir);
    await fs.ensureDir(fullComponentsPath);

    // Create a simple config file
    const configPath = path.resolve(projectPath, 'vue-magic-ui.config.json');
    const config = {
      componentsDir,
      tailwind: addTailwind,
      version: '1.0.0',
      installedComponents: []
    };

    await fs.writeJSON(configPath, config, { spaces: 2 });

    // Create a basic index file for components
    const indexPath = path.join(fullComponentsPath, 'index.ts');
    const indexContent = `// Vue Magic UI Components
// Auto-generated file - do not edit manually

export * from './ui';
`;

    await fs.writeFile(indexPath, indexContent);

    // Create ui directory
    const uiDir = path.join(fullComponentsPath, 'ui');
    await fs.ensureDir(uiDir);

    spinner.succeed('Vue Magic UI initialized successfully!');

    console.log(chalk.green('\n✨ Setup complete!\n'));
    console.log(chalk.dim('Files created:'));
    console.log(chalk.dim(`  • ${path.relative(process.cwd(), configPath)}`));
    console.log(chalk.dim(`  • ${path.relative(process.cwd(), indexPath)}`));
    console.log(chalk.dim(`  • ${path.relative(process.cwd(), uiDir)}/`));
    
    console.log(chalk.blue('\n📦 Next steps:'));
    console.log(chalk.dim('  1. Run "vue-magic-ui add" to add components'));
    console.log(chalk.dim('  2. Run "vue-magic-ui list" to see available components'));
    console.log(chalk.dim('  3. Import and use components in your Vue app'));

  } catch (error) {
    console.error(chalk.red('Error initializing project:'), error);
    process.exit(1);
  }
}
