import chalk from 'chalk';
import { COMPONENTS } from '../utils/components.js';

export function listComponents(): void {
  console.log(chalk.blue('📦 Available Vue Magic UI Components:\n'));

  const categories = [...new Set(COMPONENTS.map(c => c.category))];
  
  categories.forEach(category => {
    console.log(chalk.yellow(`${category.toUpperCase()}:`));
    
    const categoryComponents = COMPONENTS.filter(c => c.category === category);
    categoryComponents.forEach(component => {
      console.log(`  ${chalk.green('●')} ${chalk.white(component.name)} - ${chalk.dim(component.description)}`);
    });
    
    console.log('');
  });

  console.log(chalk.blue('💡 Usage:'));
  console.log(chalk.dim('  vue-magic-ui add button card    # Add specific components'));
  console.log(chalk.dim('  vue-magic-ui add --all          # Add all components'));
  console.log(chalk.dim('  vue-magic-ui add                # Interactive selection'));
}
