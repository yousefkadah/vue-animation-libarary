import prompts from 'prompts';
import path from 'path';
import chalk from 'chalk';
import { downloadComponent, COMPONENTS, ComponentInfo } from '../utils/components.js';

export async function addComponent(components: string[], options: any): Promise<void> {
  try {
    let selectedComponents: ComponentInfo[] = [];

    if (options.all) {
      selectedComponents = COMPONENTS;
    } else if (components.length > 0) {
      selectedComponents = COMPONENTS.filter(comp => 
        components.some(name => 
          comp.name.toLowerCase() === name.toLowerCase()
        )
      );
      
      const notFound = components.filter(name => 
        !COMPONENTS.some(comp => comp.name.toLowerCase() === name.toLowerCase())
      );
      
      if (notFound.length > 0) {
        console.log(chalk.yellow(`⚠️  Components not found: ${notFound.join(', ')}`));
        console.log(chalk.dim('Run "vue-magic-ui list" to see available components'));
      }
    } else {
      // Interactive selection
      const response = await prompts({
        type: 'multiselect',
        name: 'components',
        message: 'Select components to add:',
        choices: COMPONENTS.map(comp => ({
          title: comp.name,
          description: comp.description,
          value: comp
        })),
        hint: '- Space to select. Return to submit'
      });

      if (response.components) {
        selectedComponents = response.components;
      }
    }

    if (selectedComponents.length === 0) {
      console.log(chalk.yellow('No components selected.'));
      return;
    }

    // Ask for output directory
    const outputResponse = await prompts({
      type: 'text',
      name: 'outputDir',
      message: 'Where should we add the components?',
      initial: './src/components'
    });

    if (!outputResponse.outputDir) {
      console.log(chalk.yellow('Operation cancelled.'));
      return;
    }

    console.log(chalk.blue(`\n📦 Adding ${selectedComponents.length} component(s)...\n`));

    for (const component of selectedComponents) {
      const outputPath = path.join(outputResponse.outputDir, component.fileName);
      await downloadComponent(component.name, outputPath);
    }

    console.log(chalk.green(`\n✨ Successfully added ${selectedComponents.length} component(s)!`));
    console.log(chalk.dim('\nNext steps:'));
    console.log(chalk.dim('1. Import the components in your Vue app'));
    console.log(chalk.dim('2. Check the documentation for usage examples'));
    console.log(chalk.dim('3. Customize the components as needed'));

  } catch (error) {
    console.error(chalk.red('Error adding components:'), error);
    process.exit(1);
  }
}
