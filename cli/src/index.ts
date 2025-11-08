#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { addComponent } from './commands/add.js';
import { initProject } from './commands/init.js';
import { listComponents } from './commands/list.js';
import { configureTheme } from './commands/theme.js';

const program = new Command();

program
  .name('vue-magic-ui')
  .description('CLI for Vue Magic UI components')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize Vue Magic UI in your project')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(initProject);

program
  .command('add')
  .description('Add a component to your project')
  .argument('[components...]', 'Components to add')
  .option('-a, --all', 'Add all components')
  .option('-o, --overwrite', 'Overwrite existing files')
  .action(addComponent);

program
  .command('list')
  .alias('ls')
  .description('List all available components')
  .action(listComponents);

program
  .command('theme')
  .description('Configure themes and design tokens')
  .action(configureTheme);

program.on('--help', () => {
  console.log('');
  console.log(chalk.blue('Vue Magic UI CLI - Modern Animation Library for Vue 3'));
  console.log('');
  console.log('Examples:');
  console.log('  $ vue-magic-ui init                    # Initialize in your project');
  console.log('  $ vue-magic-ui add FadeIn Motion       # Add specific components');
  console.log('  $ vue-magic-ui add --all               # Add all components');
  console.log('  $ vue-magic-ui list                    # List available components');
  console.log('  $ vue-magic-ui theme                   # Configure themes and tokens');
  console.log('');
  console.log(chalk.dim('Modern features:'));
  console.log(chalk.dim('• Spring physics animations'));
  console.log(chalk.dim('• Gesture support'));
  console.log(chalk.dim('• Scroll-triggered animations'));
  console.log(chalk.dim('• Performance optimizations'));
  console.log(chalk.dim('• Accessibility features'));
});

program.parse();
