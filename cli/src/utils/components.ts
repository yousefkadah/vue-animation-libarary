import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export interface ComponentInfo {
  name: string;
  fileName: string;
  category: 'animations' | 'buttons' | 'cards' | 'loaders' | 'backgrounds' | 'effects';
  description: string;
  dependencies?: string[];
}

export const COMPONENTS: ComponentInfo[] = [
  {
    name: 'MagicButton',
    fileName: 'MagicButton.vue',
    category: 'buttons',
    description: 'Button with magical hover effects and ripple animation'
  },
  {
    name: 'ShimmerButton',
    fileName: 'ShimmerButton.vue',
    category: 'buttons',
    description: 'Button with shimmer animation effect'
  },
  {
    name: 'GlowCard',
    fileName: 'GlowCard.vue',
    category: 'cards',
    description: 'Card with customizable glow effect'
  },
  {
    name: 'FloatingCard',
    fileName: 'FloatingCard.vue',
    category: 'cards',
    description: 'Card with floating animation'
  },
  {
    name: 'PulseLoader',
    fileName: 'PulseLoader.vue',
    category: 'loaders',
    description: 'Animated pulse loading indicator'
  },
  {
    name: 'WaveLoader',
    fileName: 'WaveLoader.vue',
    category: 'loaders',
    description: 'Wave animation loader'
  },
  {
    name: 'SparkleText',
    fileName: 'SparkleText.vue',
    category: 'effects',
    description: 'Text with animated sparkle effects'
  },
  {
    name: 'GradientText',
    fileName: 'GradientText.vue',
    category: 'effects',
    description: 'Text with animated gradient colors'
  },
  {
    name: 'TypewriterText',
    fileName: 'TypewriterText.vue',
    category: 'effects',
    description: 'Typewriter animation effect'
  },
  {
    name: 'TextReveal',
    fileName: 'TextReveal.vue',
    category: 'animations',
    description: 'Text reveal animation with stagger effect'
  },
  {
    name: 'FadeIn',
    fileName: 'FadeIn.vue',
    category: 'animations',
    description: 'Fade in animation wrapper'
  },
  {
    name: 'SlideIn',
    fileName: 'SlideIn.vue',
    category: 'animations',
    description: 'Slide in animation from different directions'
  },
  {
    name: 'CountUp',
    fileName: 'CountUp.vue',
    category: 'effects',
    description: 'Animated number counter'
  },
  {
    name: 'NumberTicker',
    fileName: 'NumberTicker.vue',
    category: 'effects',
    description: 'Number ticker animation'
  },
  {
    name: 'Marquee',
    fileName: 'Marquee.vue',
    category: 'animations',
    description: 'Scrolling marquee animation'
  },
  {
    name: 'Aurora',
    fileName: 'Aurora.vue',
    category: 'backgrounds',
    description: 'Aurora background effect'
  },
  {
    name: 'Meteors',
    fileName: 'Meteors.vue',
    category: 'backgrounds',
    description: 'Animated meteor shower background'
  },
  {
    name: 'GridPattern',
    fileName: 'GridPattern.vue',
    category: 'backgrounds',
    description: 'Animated grid background pattern'
  },
  {
    name: 'RetroGrid',
    fileName: 'RetroGrid.vue',
    category: 'backgrounds',
    description: 'Retro-style grid background'
  },
  {
    name: 'ParticleEffect',
    fileName: 'ParticleEffect.vue',
    category: 'effects',
    description: 'Animated particle system'
  },
  {
    name: 'MorphingShape',
    fileName: 'MorphingShape.vue',
    category: 'effects',
    description: 'Morphing shape animation'
  },
  {
    name: 'RippleEffect',
    fileName: 'RippleEffect.vue',
    category: 'effects',
    description: 'Click ripple effect wrapper'
  },
  {
    name: 'BorderBeam',
    fileName: 'BorderBeam.vue',
    category: 'effects',
    description: 'Animated border beam effect'
  },
  {
    name: 'AnimatedBeam',
    fileName: 'AnimatedBeam.vue',
    category: 'effects',
    description: 'Animated beam connection between elements'
  },
  {
    name: 'OrbitingCircles',
    fileName: 'OrbitingCircles.vue',
    category: 'effects',
    description: 'Orbiting circles animation'
  }
];

export const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/yousefkadah/vue-animation-libarary/main/src/components';

export async function downloadComponent(componentName: string, outputPath: string): Promise<void> {
  const component = COMPONENTS.find(c => c.name === componentName);
  if (!component) {
    throw new Error(`Component "${componentName}" not found`);
  }

  const spinner = ora(`Downloading ${component.name}...`).start();
  
  try {
    // For now, copy from local src (in production, this would fetch from GitHub)
    const srcPath = path.resolve(process.cwd(), '..', 'src', 'components', component.fileName);
    
    if (!await fs.pathExists(srcPath)) {
      throw new Error(`Component file not found: ${component.fileName}`);
    }

    await fs.ensureDir(path.dirname(outputPath));
    await fs.copy(srcPath, outputPath);
    
    spinner.succeed(`${chalk.green('✓')} ${component.name} downloaded successfully`);
  } catch (error) {
    spinner.fail(`Failed to download ${component.name}`);
    throw error;
  }
}
