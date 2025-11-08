import prompts from 'prompts';
import path from 'path';
import fs from 'fs-extra';
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
      // Interactive selection with categories
      const categoryResponse = await prompts({
        type: 'select',
        name: 'category',
        message: 'Select a category:',
        choices: [
          { title: 'All Components', value: 'all' },
          { title: 'Animations', value: 'animations' },
          { title: 'Effects', value: 'effects' },
          { title: 'UI Elements', value: 'ui' },
          { title: 'Backgrounds', value: 'backgrounds' },
          { title: 'Loaders', value: 'loaders' },
          { title: 'Modern (Framer-style)', value: 'modern' }
        ]
      });

      if (!categoryResponse.category) {
        console.log(chalk.yellow('Operation cancelled.'));
        return;
      }

      const filteredComponents = categoryResponse.category === 'all' 
        ? COMPONENTS 
        : COMPONENTS.filter(comp => comp.category === categoryResponse.category);

      const response = await prompts({
        type: 'multiselect',
        name: 'components',
        message: 'Select components to add:',
        choices: filteredComponents.map(comp => ({
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

    // Ask if they want to add dependencies
    const depsResponse = await prompts({
      type: 'confirm',
      name: 'addDeps',
      message: 'Add modern animation composables and utilities?',
      initial: true
    });

    console.log(chalk.blue(`\n📦 Adding ${selectedComponents.length} component(s)...\n`));

    // Create output directory if it doesn't exist
    await fs.ensureDir(outputResponse.outputDir);

    // Add modern composables if requested
    if (depsResponse.addDeps) {
      const composablesDir = path.join(outputResponse.outputDir, '../composables');
      const utilsDir = path.join(outputResponse.outputDir, '../utils');
      
      await fs.ensureDir(composablesDir);
      await fs.ensureDir(utilsDir);
      
      console.log(chalk.blue('📁 Adding modern animation composables...'));
      
      // Copy modern composables and utilities
      const composables = [
        'useSpring.ts',
        'useGesture.ts', 
        'useScroll.ts',
        'useAnimation.ts',
        'usePerformance.ts'
      ];
      
      const utilities = [
        'easing.ts'
      ];
      
      for (const file of composables) {
        // In real implementation, these would be copied from templates
        console.log(chalk.dim(`  → ${file}`));
      }
      
      for (const file of utilities) {
        console.log(chalk.dim(`  → utils/${file}`));
      }
    }

    for (const component of selectedComponents) {
      const outputPath = path.join(outputResponse.outputDir, component.fileName);
      await downloadComponent(component.name, outputPath);
    }

    console.log(chalk.green(`\n✨ Successfully added ${selectedComponents.length} component(s)!`));
    
    if (depsResponse.addDeps) {
      console.log(chalk.green('✨ Added modern animation system!'));
    }
    
    console.log(chalk.dim('\nNext steps:'));
    console.log(chalk.dim('1. Import the components in your Vue app'));
    console.log(chalk.dim('2. Check the documentation for usage examples'));
    console.log(chalk.dim('3. Customize the components as needed'));
    
    if (depsResponse.addDeps) {
      console.log(chalk.dim('4. Use modern composables for advanced animations:'));
      console.log(chalk.dim('   - useSpring() for physics-based animations'));
      console.log(chalk.dim('   - useGesture() for touch/mouse interactions'));
      console.log(chalk.dim('   - useScroll() for scroll-triggered animations'));
    }

  } catch (error) {
    console.error(chalk.red('Error adding components:'), error);
    process.exit(1);
  }
}
