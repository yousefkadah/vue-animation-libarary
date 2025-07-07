#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { addComponent } from './commands/add.js';
import { initProject } from './commands/init.js';
import { listComponents } from './commands/list.js';

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

program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('  $ vue-magic-ui init');
  console.log('  $ vue-magic-ui add button card');
  console.log('  $ vue-magic-ui add --all');
  console.log('  $ vue-magic-ui list');
});

program.parse();
