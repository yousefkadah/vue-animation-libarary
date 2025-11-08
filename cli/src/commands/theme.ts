import fs from 'fs-extra'
import path from 'path'
import prompts from 'prompts'
import chalk from 'chalk'

interface ThemeConfig {
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
  }
  animations: {
    duration: {
      fast: number
      medium: number
      slow: number
    }
    easing: {
      default: string
      enter: string
      exit: string
    }
    springs: {
      gentle: { tension: number; friction: number }
      moderate: { tension: number; friction: number }
      bouncy: { tension: number; friction: number }
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    full: string
  }
}

const defaultThemes: Record<string, ThemeConfig> = {
  modern: {
    name: 'Modern',
    description: 'Clean and contemporary design with smooth animations',
    colors: {
      primary: '#3b82f6',
      secondary: '#6366f1',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b'
    },
    animations: {
      duration: { fast: 150, medium: 300, slow: 500 },
      easing: { default: 'ease-out', enter: 'ease-out', exit: 'ease-in' },
      springs: {
        gentle: { tension: 120, friction: 14 },
        moderate: { tension: 280, friction: 60 },
        bouncy: { tension: 400, friction: 30 }
      }
    },
    spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
    borderRadius: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', full: '9999px' }
  },
  
  neon: {
    name: 'Neon',
    description: 'Cyberpunk-inspired theme with glowing effects',
    colors: {
      primary: '#00ff87',
      secondary: '#ff006e',
      accent: '#8b5cf6',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#a1a1aa'
    },
    animations: {
      duration: { fast: 200, medium: 400, slow: 600 },
      easing: { default: 'cubic-bezier(0.4, 0, 0.2, 1)', enter: 'ease-out', exit: 'ease-in' },
      springs: {
        gentle: { tension: 150, friction: 20 },
        moderate: { tension: 300, friction: 40 },
        bouncy: { tension: 500, friction: 25 }
      }
    },
    spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
    borderRadius: { sm: '0.125rem', md: '0.375rem', lg: '0.5rem', full: '9999px' }
  },
  
  nature: {
    name: 'Nature',
    description: 'Organic theme with earth tones and gentle animations',
    colors: {
      primary: '#22c55e',
      secondary: '#84cc16',
      accent: '#f59e0b',
      background: '#fefffe',
      surface: '#f0fdf4',
      text: '#14532d',
      textSecondary: '#4ade80'
    },
    animations: {
      duration: { fast: 250, medium: 500, slow: 750 },
      easing: { default: 'ease-out', enter: 'ease-out', exit: 'ease-in' },
      springs: {
        gentle: { tension: 100, friction: 18 },
        moderate: { tension: 200, friction: 50 },
        bouncy: { tension: 300, friction: 35 }
      }
    },
    spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
    borderRadius: { sm: '0.5rem', md: '0.75rem', lg: '1rem', full: '9999px' }
  }
}

export async function configureTheme(): Promise<void> {
  try {
    console.log(chalk.blue('🎨 Vue Magic UI Theme Configuration\n'))
    
    // Ask for project setup
    const setupResponse = await prompts([
      {
        type: 'select',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { title: 'Use a preset theme', value: 'preset' },
          { title: 'Create a custom theme', value: 'custom' },
          { title: 'Generate theme tokens', value: 'tokens' }
        ]
      }
    ])
    
    if (!setupResponse.action) {
      console.log(chalk.yellow('Operation cancelled.'))
      return
    }
    
    let selectedTheme: ThemeConfig
    
    if (setupResponse.action === 'preset') {
      const themeResponse = await prompts({
        type: 'select',
        name: 'theme',
        message: 'Select a theme:',
        choices: Object.entries(defaultThemes).map(([key, theme]) => ({
          title: theme.name,
          description: theme.description,
          value: key
        }))
      })
      
      if (!themeResponse.theme) {
        console.log(chalk.yellow('Operation cancelled.'))
        return
      }
      
      selectedTheme = defaultThemes[themeResponse.theme]
    } else if (setupResponse.action === 'custom') {
      selectedTheme = await createCustomTheme()
    } else {
      await generateThemeTokens()
      return
    }
    
    // Ask for output format
    const formatResponse = await prompts({
      type: 'multiselect',
      name: 'formats',
      message: 'Export formats:',
      choices: [
        { title: 'CSS Custom Properties', value: 'css', selected: true },
        { title: 'SCSS Variables', value: 'scss' },
        { title: 'JavaScript/TypeScript', value: 'js' },
        { title: 'Tailwind Config', value: 'tailwind' },
        { title: 'Vue Magic UI Config', value: 'vue-magic' }
      ]
    })
    
    if (!formatResponse.formats || formatResponse.formats.length === 0) {
      console.log(chalk.yellow('No formats selected.'))
      return
    }
    
    // Ask for output directory
    const outputResponse = await prompts({
      type: 'text',
      name: 'outputDir',
      message: 'Output directory:',
      initial: './src/styles'
    })
    
    if (!outputResponse.outputDir) {
      console.log(chalk.yellow('Operation cancelled.'))
      return
    }
    
    console.log(chalk.blue('\n📁 Generating theme files...\n'))
    
    await fs.ensureDir(outputResponse.outputDir)
    
    // Generate files for each format
    for (const format of formatResponse.formats) {
      await generateThemeFile(selectedTheme, format, outputResponse.outputDir)
    }
    
    console.log(chalk.green('✨ Theme configuration complete!\n'))
    console.log(chalk.dim('Next steps:'))
    console.log(chalk.dim('1. Import the theme files in your project'))
    console.log(chalk.dim('2. Configure your animation components'))
    console.log(chalk.dim('3. Customize as needed'))
    
  } catch (error) {
    console.error(chalk.red('Error configuring theme:'), error)
    process.exit(1)
  }
}

async function createCustomTheme(): Promise<ThemeConfig> {
  console.log(chalk.blue('\n🎨 Creating custom theme...\n'))
  
  const responses = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'Theme name:',
      initial: 'Custom Theme'
    },
    {
      type: 'text',
      name: 'description',
      message: 'Theme description:',
      initial: 'A custom theme for my project'
    },
    {
      type: 'text',
      name: 'primary',
      message: 'Primary color:',
      initial: '#3b82f6'
    },
    {
      type: 'text',
      name: 'secondary',
      message: 'Secondary color:',
      initial: '#6366f1'
    },
    {
      type: 'text',
      name: 'accent',
      message: 'Accent color:',
      initial: '#06b6d4'
    },
    {
      type: 'select',
      name: 'animationStyle',
      message: 'Animation style:',
      choices: [
        { title: 'Gentle (slower, subtle)', value: 'gentle' },
        { title: 'Moderate (balanced)', value: 'moderate' },
        { title: 'Energetic (faster, bouncy)', value: 'energetic' }
      ]
    }
  ])
  
  const animationConfigs = {
    gentle: {
      duration: { fast: 250, medium: 500, slow: 750 },
      easing: { default: 'ease-out', enter: 'ease-out', exit: 'ease-in' },
      springs: {
        gentle: { tension: 100, friction: 20 },
        moderate: { tension: 180, friction: 50 },
        bouncy: { tension: 250, friction: 35 }
      }
    },
    moderate: {
      duration: { fast: 150, medium: 300, slow: 500 },
      easing: { default: 'ease-out', enter: 'ease-out', exit: 'ease-in' },
      springs: {
        gentle: { tension: 120, friction: 14 },
        moderate: { tension: 280, friction: 60 },
        bouncy: { tension: 400, friction: 30 }
      }
    },
    energetic: {
      duration: { fast: 100, medium: 200, slow: 350 },
      easing: { default: 'cubic-bezier(0.4, 0, 0.2, 1)', enter: 'ease-out', exit: 'ease-in' },
      springs: {
        gentle: { tension: 200, friction: 15 },
        moderate: { tension: 350, friction: 40 },
        bouncy: { tension: 500, friction: 25 }
      }
    }
  }
  
  return {
    name: responses.name,
    description: responses.description,
    colors: {
      primary: responses.primary,
      secondary: responses.secondary,
      accent: responses.accent,
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b'
    },
    animations: animationConfigs[responses.animationStyle as keyof typeof animationConfigs],
    spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
    borderRadius: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', full: '9999px' }
  }
}

async function generateThemeFile(theme: ThemeConfig, format: string, outputDir: string): Promise<void> {
  let content = ''
  let filename = ''
  
  switch (format) {
    case 'css':
      content = generateCSSContent(theme)
      filename = 'theme.css'
      break
    case 'scss':
      content = generateSCSSContent(theme)
      filename = 'theme.scss'
      break
    case 'js':
      content = generateJSContent(theme)
      filename = 'theme.js'
      break
    case 'tailwind':
      content = generateTailwindContent(theme)
      filename = 'tailwind.theme.js'
      break
    case 'vue-magic':
      content = generateVueMagicContent(theme)
      filename = 'vue-magic-ui.config.js'
      break
  }
  
  const filepath = path.join(outputDir, filename)
  await fs.writeFile(filepath, content)
  console.log(chalk.green(`✓ Generated ${filename}`))
}

function generateCSSContent(theme: ThemeConfig): string {
  return `/* ${theme.name} Theme - ${theme.description} */
:root {
  /* Colors */
  --vmu-color-primary: ${theme.colors.primary};
  --vmu-color-secondary: ${theme.colors.secondary};
  --vmu-color-accent: ${theme.colors.accent};
  --vmu-color-background: ${theme.colors.background};
  --vmu-color-surface: ${theme.colors.surface};
  --vmu-color-text: ${theme.colors.text};
  --vmu-color-text-secondary: ${theme.colors.textSecondary};
  
  /* Animation Durations */
  --vmu-duration-fast: ${theme.animations.duration.fast}ms;
  --vmu-duration-medium: ${theme.animations.duration.medium}ms;
  --vmu-duration-slow: ${theme.animations.duration.slow}ms;
  
  /* Animation Easings */
  --vmu-easing-default: ${theme.animations.easing.default};
  --vmu-easing-enter: ${theme.animations.easing.enter};
  --vmu-easing-exit: ${theme.animations.easing.exit};
  
  /* Spacing */
  --vmu-spacing-xs: ${theme.spacing.xs};
  --vmu-spacing-sm: ${theme.spacing.sm};
  --vmu-spacing-md: ${theme.spacing.md};
  --vmu-spacing-lg: ${theme.spacing.lg};
  --vmu-spacing-xl: ${theme.spacing.xl};
  
  /* Border Radius */
  --vmu-radius-sm: ${theme.borderRadius.sm};
  --vmu-radius-md: ${theme.borderRadius.md};
  --vmu-radius-lg: ${theme.borderRadius.lg};
  --vmu-radius-full: ${theme.borderRadius.full};
}

/* Utility classes */
.vmu-animate-fast {
  transition-duration: var(--vmu-duration-fast);
  transition-timing-function: var(--vmu-easing-default);
}

.vmu-animate-medium {
  transition-duration: var(--vmu-duration-medium);
  transition-timing-function: var(--vmu-easing-default);
}

.vmu-animate-slow {
  transition-duration: var(--vmu-duration-slow);
  transition-timing-function: var(--vmu-easing-default);
}`
}

function generateSCSSContent(theme: ThemeConfig): string {
  return `// ${theme.name} Theme - ${theme.description}

// Colors
$vmu-color-primary: ${theme.colors.primary};
$vmu-color-secondary: ${theme.colors.secondary};
$vmu-color-accent: ${theme.colors.accent};
$vmu-color-background: ${theme.colors.background};
$vmu-color-surface: ${theme.colors.surface};
$vmu-color-text: ${theme.colors.text};
$vmu-color-text-secondary: ${theme.colors.textSecondary};

// Animation Durations
$vmu-duration-fast: ${theme.animations.duration.fast}ms;
$vmu-duration-medium: ${theme.animations.duration.medium}ms;
$vmu-duration-slow: ${theme.animations.duration.slow}ms;

// Animation Easings
$vmu-easing-default: ${theme.animations.easing.default};
$vmu-easing-enter: ${theme.animations.easing.enter};
$vmu-easing-exit: ${theme.animations.easing.exit};

// Spacing
$vmu-spacing-xs: ${theme.spacing.xs};
$vmu-spacing-sm: ${theme.spacing.sm};
$vmu-spacing-md: ${theme.spacing.md};
$vmu-spacing-lg: ${theme.spacing.lg};
$vmu-spacing-xl: ${theme.spacing.xl};

// Border Radius
$vmu-radius-sm: ${theme.borderRadius.sm};
$vmu-radius-md: ${theme.borderRadius.md};
$vmu-radius-lg: ${theme.borderRadius.lg};
$vmu-radius-full: ${theme.borderRadius.full};

// Maps for easy iteration
$vmu-colors: (
  'primary': $vmu-color-primary,
  'secondary': $vmu-color-secondary,
  'accent': $vmu-color-accent,
  'background': $vmu-color-background,
  'surface': $vmu-color-surface,
  'text': $vmu-color-text,
  'text-secondary': $vmu-color-text-secondary
);

$vmu-durations: (
  'fast': $vmu-duration-fast,
  'medium': $vmu-duration-medium,
  'slow': $vmu-duration-slow
);`
}

function generateJSContent(theme: ThemeConfig): string {
  return `// ${theme.name} Theme - ${theme.description}

export const theme = ${JSON.stringify(theme, null, 2)};

export const colors = theme.colors;
export const animations = theme.animations;
export const spacing = theme.spacing;
export const borderRadius = theme.borderRadius;

// CSS-in-JS helper functions
export const getColor = (colorName) => colors[colorName] || colorName;
export const getDuration = (speed) => animations.duration[speed] || speed;
export const getEasing = (type) => animations.easing[type] || type;
export const getSpacing = (size) => spacing[size] || size;
export const getBorderRadius = (size) => borderRadius[size] || size;

// Spring configurations for animation libraries
export const springs = animations.springs;

export default theme;`
}

function generateTailwindContent(theme: ThemeConfig): string {
  return `// ${theme.name} Theme - Tailwind CSS Configuration
// Add this to your tailwind.config.js file

module.exports = {
  theme: {
    extend: {
      colors: {
        'vmu-primary': '${theme.colors.primary}',
        'vmu-secondary': '${theme.colors.secondary}',
        'vmu-accent': '${theme.colors.accent}',
        'vmu-background': '${theme.colors.background}',
        'vmu-surface': '${theme.colors.surface}',
        'vmu-text': '${theme.colors.text}',
        'vmu-text-secondary': '${theme.colors.textSecondary}',
      },
      transitionDuration: {
        'vmu-fast': '${theme.animations.duration.fast}ms',
        'vmu-medium': '${theme.animations.duration.medium}ms',
        'vmu-slow': '${theme.animations.duration.slow}ms',
      },
      transitionTimingFunction: {
        'vmu-default': '${theme.animations.easing.default}',
        'vmu-enter': '${theme.animations.easing.enter}',
        'vmu-exit': '${theme.animations.easing.exit}',
      },
      spacing: {
        'vmu-xs': '${theme.spacing.xs}',
        'vmu-sm': '${theme.spacing.sm}',
        'vmu-md': '${theme.spacing.md}',
        'vmu-lg': '${theme.spacing.lg}',
        'vmu-xl': '${theme.spacing.xl}',
      },
      borderRadius: {
        'vmu-sm': '${theme.borderRadius.sm}',
        'vmu-md': '${theme.borderRadius.md}',
        'vmu-lg': '${theme.borderRadius.lg}',
        'vmu-full': '${theme.borderRadius.full}',
      }
    }
  }
};`
}

function generateVueMagicContent(theme: ThemeConfig): string {
  return `// ${theme.name} Theme - Vue Magic UI Configuration
// Use this configuration with Vue Magic UI components

export const vueMagicUIConfig = {
  theme: '${theme.name}',
  colors: ${JSON.stringify(theme.colors, null, 4)},
  
  // Default animation settings
  defaultAnimations: {
    duration: ${theme.animations.duration.medium},
    easing: '${theme.animations.easing.default}',
  },
  
  // Spring physics configurations
  springs: ${JSON.stringify(theme.animations.springs, null, 4)},
  
  // Component overrides
  componentDefaults: {
    FadeIn: {
      duration: ${theme.animations.duration.medium},
      ease: '${theme.animations.easing.enter}',
    },
    SlideIn: {
      duration: ${theme.animations.duration.medium},
      ease: '${theme.animations.easing.enter}',
    },
    Motion: {
      transition: {
        duration: ${theme.animations.duration.fast / 1000}, // Convert to seconds
        ease: '${theme.animations.easing.default}',
      }
    }
  },
  
  // Performance settings
  performance: {
    enableGPUAcceleration: true,
    reduceMotionThreshold: 0.5,
    throttleScrollEvents: true,
  }
};

export default vueMagicUIConfig;`
}

async function generateThemeTokens(): Promise<void> {
  console.log(chalk.blue('\n🔧 Generating design system tokens...\n'))
  
  const tokensResponse = await prompts({
    type: 'multiselect',
    name: 'tokens',
    message: 'Select token categories to generate:',
    choices: [
      { title: 'Colors', value: 'colors', selected: true },
      { title: 'Typography', value: 'typography' },
      { title: 'Spacing', value: 'spacing', selected: true },
      { title: 'Shadows', value: 'shadows' },
      { title: 'Animations', value: 'animations', selected: true },
      { title: 'Breakpoints', value: 'breakpoints' }
    ]
  })
  
  if (!tokensResponse.tokens) {
    console.log(chalk.yellow('Operation cancelled.'))
    return
  }
  
  const outputResponse = await prompts({
    type: 'text',
    name: 'outputDir',
    message: 'Output directory:',
    initial: './src/tokens'
  })
  
  if (!outputResponse.outputDir) {
    console.log(chalk.yellow('Operation cancelled.'))
    return
  }
  
  await fs.ensureDir(outputResponse.outputDir)
  
  // Generate comprehensive design tokens
  const tokens = generateDesignTokens(tokensResponse.tokens)
  
  for (const [category, content] of Object.entries(tokens)) {
    const filename = `${category}.tokens.js`
    const filepath = path.join(outputResponse.outputDir, filename)
    await fs.writeFile(filepath, content)
    console.log(chalk.green(`✓ Generated ${filename}`))
  }
  
  // Generate index file
  const indexContent = generateTokensIndex(tokensResponse.tokens)
  const indexPath = path.join(outputResponse.outputDir, 'index.js')
  await fs.writeFile(indexPath, indexContent)
  console.log(chalk.green('✓ Generated index.js'))
}

function generateDesignTokens(categories: string[]): Record<string, string> {
  const tokens: Record<string, string> = {}
  
  if (categories.includes('colors')) {
    tokens.colors = `// Color Tokens
export const colors = {
  // Base colors
  white: '#ffffff',
  black: '#000000',
  
  // Gray scale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Brand colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

export default colors;`
  }
  
  if (categories.includes('animations')) {
    tokens.animations = `// Animation Tokens
export const animations = {
  // Durations
  duration: {
    instant: 0,
    fast: 150,
    medium: 300,
    slow: 500,
    slower: 750,
  },
  
  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Spring configurations
  springs: {
    gentle: { tension: 120, friction: 14, mass: 1 },
    moderate: { tension: 280, friction: 60, mass: 1 },
    bouncy: { tension: 400, friction: 30, mass: 1 },
    stiff: { tension: 500, friction: 40, mass: 1 },
  },
  
  // Animation presets
  presets: {
    fadeIn: {
      duration: 300,
      easing: 'easeOut',
      keyframes: [
        { opacity: 0 },
        { opacity: 1 }
      ]
    },
    slideUp: {
      duration: 300,
      easing: 'easeOut',
      keyframes: [
        { transform: 'translateY(20px)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 }
      ]
    },
    scale: {
      duration: 200,
      easing: 'easeOut',
      keyframes: [
        { transform: 'scale(0.95)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 }
      ]
    }
  }
};

export default animations;`
  }
  
  if (categories.includes('spacing')) {
    tokens.spacing = `// Spacing Tokens
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
  40: '10rem',     // 160px
  48: '12rem',     // 192px
  56: '14rem',     // 224px
  64: '16rem',     // 256px
};

export const componentSpacing = {
  xs: spacing[1],   // 4px
  sm: spacing[2],   // 8px
  md: spacing[4],   // 16px
  lg: spacing[6],   // 24px
  xl: spacing[8],   // 32px
  '2xl': spacing[12], // 48px
};

export default spacing;`
  }
  
  return tokens
}

function generateTokensIndex(categories: string[]): string {
  const imports = categories.map(cat => `export { default as ${cat} } from './${cat}.tokens.js';`).join('\n')
  
  return `// Design System Tokens
${imports}

// Convenience re-exports
${categories.includes('colors') ? "export { colors } from './colors.tokens.js';" : ''}
${categories.includes('animations') ? "export { animations } from './animations.tokens.js';" : ''}
${categories.includes('spacing') ? "export { spacing, componentSpacing } from './spacing.tokens.js';" : ''}

// Combined theme object
export const theme = {
${categories.map(cat => `  ${cat}: require('./${cat}.tokens.js').default,`).join('\n')}
};

export default theme;`
}