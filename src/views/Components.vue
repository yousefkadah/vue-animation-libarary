<template>
  <div class="components-page">
    <!-- Mobile Menu Toggle -->
    <button 
      class="mobile-menu-toggle"
      :class="{ active: isMobileMenuOpen }"
      @click="isMobileMenuOpen = !isMobileMenuOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="main-layout">
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
        <div class="sidebar-content">
          <!-- Search Section -->
          <div class="search-section">
            <div class="search-input-wrapper">
              <input 
                v-model="searchQuery"
                type="text" 
                class="search-input" 
                placeholder="Search components..."
              >
              <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-4.35-4.35"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.5 10.5a5 5 0 1 1-11 0 5 5 0 0 1 11 0Z"/>
              </svg>
            </div>
          </div>
          
          <!-- Getting Started Section -->
          <div class="sidebar-section">
            <h3 class="sidebar-title">Getting Started</h3>
            <nav class="sidebar-nav">
              <a 
                href="#introduction" 
                class="sidebar-link getting-started-link"
                @click.prevent="scrollToSection('introduction')"
              >
                Introduction
              </a>
              <a 
                href="#installation" 
                class="sidebar-link getting-started-link"
                @click.prevent="scrollToSection('installation')"
              >
                Installation
              </a>
            </nav>
          </div>
          
          <!-- Components Section -->
          <div class="sidebar-section">
            <h3 class="sidebar-title">Components</h3>
            <nav class="sidebar-nav">
              <div 
                v-for="category in categories" 
                :key="category.id"
                class="category-group"
              >
                <!-- Category Title (not clickable) -->
                <div class="category-title-header">
                  {{ category.name }}
                </div>
                
                <!-- Always show all components for this category -->
                <div class="component-links">
                  <a
                    v-for="component in getComponentsByCategory(category.id)"
                    :key="component.name"
                    href="#"
                    :class="['sidebar-link', 'component-link', { active: selectedComponent === component.name }]"
                    @click.prevent="scrollToComponent(component.name)"
                  >
                    {{ component.name }}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content" @click="closeMobileMenu">
        <div class="content-container">
          <!-- Introduction Section -->
          <section v-if="!selectedComponent" id="introduction" class="content-section">
            <h1 class="page-title">Components</h1>
            <p class="page-description">
              Copy and paste the most trending components and use them in your websites without having to worry about styling and animations.
            </p>
            
            <!-- Installation Section -->
            <div id="installation" class="installation-section">
              <h3 class="section-subtitle">Installation</h3>
              <div class="installation-steps">
                <div class="step">
                  <h4 class="step-title">1. Install the package</h4>
                  <div class="code-block-wrapper">
                    <div class="code-header">
                      <span class="code-title">Terminal</span>
                      <button 
                        class="copy-button"
                        @click="copyCode('npm install vue-magic-ui')"
                        :class="{ copied: copiedCode === 'npm install vue-magic-ui' }"
                      >
                        {{ copiedCode === 'npm install vue-magic-ui' ? 'Copied!' : 'Copy' }}
                      </button>
                    </div>
                    <pre class="code-block"><code>npm install vue-magic-ui</code></pre>
                  </div>
                </div>
                
                <div class="step">
                  <h4 class="step-title">2. Import and use components</h4>
                  <div class="code-block-wrapper">
                    <div class="code-header">
                      <span class="code-title">main.ts</span>
                      <button 
                        class="copy-button"
                        @click="copyCode('import { FadeIn } from \'vue-magic-ui\'')"
                        :class="{ copied: copiedCode === 'import { FadeIn } from \'vue-magic-ui\'' }"
                      >
                        {{ copiedCode === 'import { FadeIn } from \'vue-magic-ui\'' ? 'Copied!' : 'Copy' }}
                      </button>
                    </div>
                    <pre class="code-block"><code>import { FadeIn } from 'vue-magic-ui'</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Single Component View -->
          <div v-if="selectedComponent" class="component-header-section">
            <button 
              class="back-button" 
              @click="selectedComponent = ''"
            >
              ← Back to {{ getCategoryName(getComponentCategory(selectedComponent)) }}
            </button>
            <h1 class="component-main-title">{{ selectedComponent }}</h1>
            <p class="component-main-description">
              {{ getComponentDescription(selectedComponent) }}
            </p>
          </div>

          <!-- Components Grid -->
          <div class="components-grid">
            <div 
              v-for="component in filteredComponents" 
              :key="component.name"
              :id="component.name.toLowerCase().replace(/\s+/g, '-')"
              class="component-card"
            >
              <div v-if="!selectedComponent" class="component-header">
                <h3>{{ component.name }}</h3>
                <p class="component-description">{{ component.description }}</p>
              </div>
              
              <div class="component-preview">
                <component :is="component.component" v-bind="component.props">
                  <template v-if="component.slots?.default">{{ component.slots.default }}</template>
                </component>
              </div>
              
              <div class="component-code-section">
                <!-- Simple Code Example -->
                <div class="component-usage">
                  <h4 class="usage-title">Usage Example</h4>
                  <div class="code-block-wrapper">
                    <div class="code-header">
                      <span class="code-title">{{ component.name }}</span>
                      <div class="code-actions">
                        <button 
                          class="copy-button"
                          @click="copyCode(component.code)"
                          :class="{ copied: copiedCode === component.code }"
                        >
                          {{ copiedCode === component.code ? 'Copied!' : 'Copy Usage' }}
                        </button>
                        <button 
                          class="copy-button secondary"
                          @click="copyComponentFile(component.name)"
                          :class="{ copied: copiedCode === (component.name + '-file') }"
                        >
                          {{ copiedCode === (component.name + '-file') ? 'Copied!' : 'Copy Source' }}
                        </button>
                      </div>
                    </div>
                    <pre class="code-block"><code>{{ component.code }}</code></pre>
                  </div>
                </div>

                <!-- Props Documentation -->
                <div v-if="component.propsDoc && component.propsDoc.length > 0" class="component-props">
                  <h4 class="props-title">Props</h4>
                  <div class="props-table">
                    <div class="props-header">
                      <span>Name</span>
                      <span>Type</span>
                      <span>Description</span>
                    </div>
                    <div 
                      v-for="prop in component.propsDoc" 
                      :key="prop.name"
                      class="prop-row"
                    >
                      <span class="prop-name">{{ prop.name }}</span>
                      <span class="prop-type">{{ prop.type }}</span>
                      <span class="prop-description">{{ prop.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  FadeIn,
  SlideIn,
  SparkleText,
  MagicButton,
  FloatingCard,
  TypewriterText,
  PulseLoader,
  WaveLoader,
  ParticleEffect,
  MorphingShape,
  ShimmerButton,
  CountUp,
  TextReveal,
  Meteors,
  GridPattern,
  BorderBeam,
  RippleEffect,
  RetroGrid,
  Aurora,
  NumberTicker,
  OrbitingCircles,
  AnimatedBeam,
  Marquee,
  GradientText,
  GlowCard
} from '../index'

const activeCategory = ref('animations')
const selectedComponent = ref('')
const copiedCode = ref('')
const isMobileMenuOpen = ref(false)
const searchQuery = ref('')

const categories = [
  { id: 'animations', name: 'Animations' },
  { id: 'effects', name: 'Effects' },
  { id: 'ui', name: 'UI Elements' },
  { id: 'backgrounds', name: 'Backgrounds' },
  { id: 'loaders', name: 'Loaders' }
]

const components = [
  // Animations
  {
    name: 'FadeIn',
    description: 'Smooth fade-in animation with customizable duration and delay',
    category: 'animations',
    component: FadeIn,
    props: { delay: 0 },
    slots: { default: 'Fade In Content' },
    code: `<FadeIn :delay="200">
  <div>Your content here</div>
</FadeIn>`,
    propsDoc: [
      { name: 'delay', type: 'number', description: 'Animation delay in milliseconds' },
      { name: 'duration', type: 'number', description: 'Animation duration in milliseconds' }
    ]
  },
  {
    name: 'SlideIn',
    description: 'Slide-in animation from different directions',
    category: 'animations',
    component: SlideIn,
    props: { direction: 'up' },
    slots: { default: 'Slide In Content' },
    code: `<SlideIn direction="up" :delay="100">
  <div>Your content here</div>
</SlideIn>`,
    propsDoc: [
      { name: 'direction', type: 'string', description: 'Animation direction: up, down, left, right' },
      { name: 'delay', type: 'number', description: 'Animation delay in milliseconds' }
    ]
  },
  {
    name: 'TypewriterText',
    description: 'Typewriter animation effect for text',
    category: 'animations',
    component: TypewriterText,
    props: { text: 'Hello World!', speed: 100 },
    code: `<TypewriterText 
  text="Hello World!" 
  :speed="100" 
/>`,
    propsDoc: [
      { name: 'text', type: 'string', description: 'Text to animate' },
      { name: 'speed', type: 'number', description: 'Typing speed in milliseconds' }
    ]
  },
  {
    name: 'CountUp',
    description: 'Animated number counter with easing',
    category: 'animations',
    component: CountUp,
    props: { endValue: 100, duration: 2000 },
    code: `<CountUp 
  :end-value="100" 
  :duration="2000" 
/>`,
    propsDoc: [
      { name: 'endValue', type: 'number', description: 'Final number to count to' },
      { name: 'duration', type: 'number', description: 'Animation duration in milliseconds' }
    ]
  },
  {
    name: 'TextReveal',
    description: 'Text reveal animation with various effects',
    category: 'animations',
    component: TextReveal,
    props: { text: 'Reveal me!' },
    slots: { default: 'Reveal me!' },
    code: `<TextReveal text="Reveal me!">
  Reveal me!
</TextReveal>`,
    propsDoc: [
      { name: 'text', type: 'string', description: 'Text to reveal' }
    ]
  },
  {
    name: 'NumberTicker',
    description: 'Animated number ticker with smooth transitions',
    category: 'animations',
    component: NumberTicker,
    props: { value: 42 },
    code: `<NumberTicker :value="42" />`,
    propsDoc: [
      { name: 'value', type: 'number', description: 'Number value to display' }
    ]
  },
  {
    name: 'AnimatedBeam',
    description: 'Animated beam connecting elements',
    category: 'animations',
    component: AnimatedBeam,
    props: {},
    code: `<AnimatedBeam />`,
    propsDoc: []
  },
  {
    name: 'Marquee',
    description: 'Smooth scrolling marquee text animation',
    category: 'animations',
    component: Marquee,
    props: { speed: 50 },
    slots: { default: 'Scrolling text...' },
    code: `<Marquee :speed="50">
  <div>Scrolling text...</div>
</Marquee>`,
    propsDoc: [
      { name: 'speed', type: 'number', description: 'Scroll speed' }
    ]
  },
  {
    name: 'OrbitingCircles',
    description: 'Animated orbiting circles around a center point',
    category: 'animations',
    component: OrbitingCircles,
    props: { radius: 100 },
    code: `<OrbitingCircles :radius="100" />`,
    propsDoc: [
      { name: 'radius', type: 'number', description: 'Orbit radius in pixels' }
    ]
  },
  {
    name: 'MorphingShape',
    description: 'Morphing shape animations',
    category: 'animations',
    component: MorphingShape,
    props: {},
    code: `<MorphingShape />`,
    propsDoc: []
  },

  // Effects
  {
    name: 'SparkleText',
    description: 'Animated text with sparkling effect',
    category: 'effects',
    component: SparkleText,
    props: { autoSparkle: true, sparkleInterval: 2000 },
    slots: { default: 'Sparkle Text' },
    code: `<SparkleText 
  :auto-sparkle="true" 
  :sparkle-interval="3000"
>
  Sparkle Text
</SparkleText>`,
    propsDoc: [
      { name: 'autoSparkle', type: 'boolean', description: 'Enable automatic sparkling' },
      { name: 'sparkleInterval', type: 'number', description: 'Interval between sparkles in milliseconds' }
    ]
  },
  {
    name: 'ParticleEffect',
    description: 'Animated particle system with various effects',
    category: 'effects',
    component: ParticleEffect,
    props: { count: 50 },
    code: `<ParticleEffect :count="50" />`,
    propsDoc: [
      { name: 'count', type: 'number', description: 'Number of particles' }
    ]
  },
  {
    name: 'Meteors',
    description: 'Animated meteor shower effect',
    category: 'effects',
    component: Meteors,
    props: { number: 20 },
    code: `<Meteors :number="20" />`,
    propsDoc: [
      { name: 'number', type: 'number', description: 'Number of meteors' }
    ]
  },
  {
    name: 'RippleEffect',
    description: 'Ripple animation effect on click',
    category: 'effects',
    component: RippleEffect,
    props: {},
    code: `<RippleEffect>
  <div>Click me for ripple!</div>
</RippleEffect>`,
    propsDoc: []
  },
  {
    name: 'BorderBeam',
    description: 'Animated border beam effect',
    category: 'effects',
    component: BorderBeam,
    props: { size: 200 },
    code: `<BorderBeam :size="200" />`,
    propsDoc: [
      { name: 'size', type: 'number', description: 'Beam size' }
    ]
  },
  {
    name: 'GradientText',
    description: 'Animated gradient text effect',
    category: 'effects',
    component: GradientText,
    props: {},
    slots: { default: 'Gradient Text' },
    code: `<GradientText>
  Gradient Text
</GradientText>`,
    propsDoc: []
  },

  // UI Elements
  {
    name: 'MagicButton',
    description: 'Interactive button with various styles and hover effects',
    category: 'ui',
    component: MagicButton,
    props: { variant: 'gradient' },
    slots: { default: 'Click me!' },
    code: `<MagicButton variant="gradient">
  Click me!
</MagicButton>`,
    propsDoc: [
      { name: 'variant', type: 'string', description: 'Button style: gradient, outline, solid' },
      { name: 'disabled', type: 'boolean', description: 'Disable button interaction' }
    ]
  },
  {
    name: 'ShimmerButton',
    description: 'Button with shimmer hover effect',
    category: 'ui',
    component: ShimmerButton,
    props: {},
    slots: { default: 'Shimmer Button' },
    code: `<ShimmerButton>
  Shimmer Button
</ShimmerButton>`,
    propsDoc: []
  },
  {
    name: 'FloatingCard',
    description: 'Floating card with hover animations',
    category: 'ui',
    component: FloatingCard,
    props: {},
    slots: { default: 'Card content' },
    code: `<FloatingCard>
  <div>Card content</div>
</FloatingCard>`,
    propsDoc: []
  },
  {
    name: 'GlowCard',
    description: 'Card with animated glow effect',
    category: 'ui',
    component: GlowCard,
    props: {},
    slots: { default: 'Glow card content' },
    code: `<GlowCard>
  <div>Glow card content</div>
</GlowCard>`,
    propsDoc: []
  },

  // Backgrounds
  {
    name: 'GridPattern',
    description: 'Animated grid background pattern',
    category: 'backgrounds',
    component: GridPattern,
    props: { size: 50 },
    code: `<GridPattern :size="50" />`,
    propsDoc: [
      { name: 'size', type: 'number', description: 'Grid cell size' }
    ]
  },
  {
    name: 'RetroGrid',
    description: 'Retro-style animated grid background',
    category: 'backgrounds',
    component: RetroGrid,
    props: {},
    code: `<RetroGrid />`,
    propsDoc: []
  },
  {
    name: 'Aurora',
    description: 'Aurora borealis animated background effect',
    category: 'backgrounds',
    component: Aurora,
    props: {},
    code: `<Aurora />`,
    propsDoc: []
  },

  // Loaders
  {
    name: 'PulseLoader',
    description: 'Animated loading spinner with pulse effect',
    category: 'loaders',
    component: PulseLoader,
    props: { size: 50, color: '#42b883' },
    code: `<PulseLoader 
  :size="50" 
  color="#42b883" 
/>`,
    propsDoc: [
      { name: 'size', type: 'number', description: 'Loader size in pixels' },
      { name: 'color', type: 'string', description: 'Loader color' }
    ]
  },
  {
    name: 'WaveLoader',
    description: 'Wave-style loading animation',
    category: 'loaders',
    component: WaveLoader,
    props: { color: '#42b883' },
    code: `<WaveLoader color="#42b883" />`,
    propsDoc: [
      { name: 'color', type: 'string', description: 'Wave color' }
    ]
  }
]

const filteredComponents = computed(() => {
  let filtered = components
  
  // If a specific component is selected, show only that component
  if (selectedComponent.value) {
    filtered = components.filter(component => component.name === selectedComponent.value)
  } else {
    // Filter by active category
    filtered = components.filter(component => component.category === activeCategory.value)
  }
  
  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(component => 
      component.name.toLowerCase().includes(query) ||
      component.description.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

const getComponentsByCategory = (categoryId: string) => {
  let filtered = components.filter(component => component.category === categoryId)
  
  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(component => 
      component.name.toLowerCase().includes(query) ||
      component.description.toLowerCase().includes(query)
    )
  }
  
  return filtered
}

const getComponentCategory = (componentName: string) => {
  const component = components.find(c => c.name === componentName)
  return component ? component.category : ''
}

const getComponentDescription = (componentName: string) => {
  const component = components.find(c => c.name === componentName)
  return component ? component.description : ''
}

const getCategoryName = (categoryId: string) => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : ''
}

const scrollToComponent = (componentName: string) => {
  selectedComponent.value = componentName
  isMobileMenuOpen.value = false // Close mobile menu when selecting a component
}

const scrollToSection = (sectionId: string) => {
  // Ensure we're showing the main introduction view
  selectedComponent.value = ''
  isMobileMenuOpen.value = false // Close mobile menu
  
  // Small delay to ensure the DOM has updated
  setTimeout(() => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      // Add a small visual feedback
      element.style.outline = '2px solid #3b82f6'
      element.style.outlineOffset = '4px'
      setTimeout(() => {
        element.style.outline = ''
        element.style.outlineOffset = ''
      }, 2000)
    }
  }, 100)
}

// Enhanced copy code function with better error handling
const copyCode = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedCode.value = text
    setTimeout(() => {
      copiedCode.value = ''
    }, 2000)
    return true
  } catch (err) {
    // Fallback for older browsers or when clipboard API is not available
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      const result = document.execCommand('copy')
      document.body.removeChild(textArea)
      if (!result) {
        throw new Error('Copy command failed')
      }
      copiedCode.value = text
      setTimeout(() => {
        copiedCode.value = ''
      }, 2000)
      return true
    } catch (fallbackError) {
      document.body.removeChild(textArea)
      console.error('Failed to copy text:', fallbackError)
      throw fallbackError
    }
  }
}

// Copy component source code
const copyComponentFile = async (componentName: string) => {
  // Generate a simple component template
  const comp = components.find(c => c.name === componentName)
  if (!comp) return
  
  const kebabCase = componentName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
  
  const templateSection = `<template>
  <div class="${kebabCase}">
    ${comp.slots?.default ? '<slot />' : `<!-- ${componentName} content -->`}
  </div>
</template>`

  const scriptSection = `<script setup lang="ts">
interface Props {${comp.propsDoc?.map(prop => 
  `\n  ${prop.name}${prop.name === 'delay' || prop.name === 'duration' ? '?' : ''}: ${prop.type.toLowerCase()}`
).join('') || ''}
}

const props = defineProps<Props>()

// Component logic here
</scr` + `ipt>`

  const styleSection = `<style scoped>
.${kebabCase} {
  /* ${componentName} styles */
}
</style>`
  
  const sourceCode = templateSection + '\n\n' + scriptSection + '\n\n' + styleSection
  
  await copyCode(sourceCode)
  copiedCode.value = componentName + '-file'
}

// Mobile menu close function
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
/* Include all the existing CSS from the original file here */
.components-page {
  min-height: 100vh;
  background: #ffffff;
  color: #09090b;
}

/* Main Layout */
.main-layout {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: #fafafa;
  border-right: 1px solid #e4e7eb;
  overflow-y: auto;
  position: fixed;
  top: 64px;
  left: 0;
  height: calc(100vh - 64px);
  z-index: 100;
  transition: transform 0.3s ease;
}

.sidebar-content {
  padding: 0;
}

/* Search Section */
.search-section {
  padding: 1.5rem;
  border-bottom: 1px solid #e4e7eb;
  background: white;
}

.search-input-wrapper {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #e4e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #71717a;
}

/* Sidebar Sections */
.sidebar-section {
  border-bottom: 1px solid #e4e7eb;
}

.sidebar-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #71717a;
  padding: 1rem 1.5rem 0.5rem;
  margin: 0;
}

.sidebar-nav {
  padding-bottom: 1rem;
}

.category-group {
  margin-bottom: 0.5rem;
}

.category-title-header {
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #09090b;
  background-color: #f8fafc;
  border-left: 3px solid #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.75rem;
}

.getting-started-link {
  display: block;
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: #71717a;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
}

.getting-started-link:hover {
  background-color: #f4f4f5;
  color: #09090b;
  border-left-color: #e4e7eb;
}

.component-links {
  padding-left: 1rem;
}

.component-link {
  display: block;
  padding: 0.5rem 1.5rem;
  font-size: 0.8125rem;
  color: #71717a;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
}

.component-link:hover {
  background-color: #f4f4f5;
  color: #09090b;
  border-left-color: #e4e7eb;
}

.component-link.active {
  background-color: #f0fdf4;
  color: #16a34a;
  border-left-color: #16a34a;
  font-weight: 500;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: 80px;
  left: 1rem;
  z-index: 1001;
  background: white;
  border: 1px solid #e4e7eb;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.mobile-menu-toggle span {
  width: 18px;
  height: 2px;
  background: #09090b;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.mobile-menu-toggle span:nth-child(1) {
  margin-bottom: 3px;
}

.mobile-menu-toggle span:nth-child(2) {
  margin-bottom: 3px;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 280px;
  background: white;
}

.content-container {
  padding: 2rem;
  max-width: none;
}

/* Page Header */
.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #09090b;
}

.page-description {
  font-size: 1.125rem;
  color: #71717a;
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* Component Header Section */
.component-header-section {
  margin-bottom: 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #71717a;
  background: #f4f4f5;
  border: 1px solid #e4e7eb;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
}

.back-button:hover {
  color: #09090b;
  background: #e4e7eb;
}

/* Components Grid */
.components-grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Installation Section */
.installation-section {
  margin-top: 3rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e4e7eb;
}

.section-subtitle {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #09090b;
}

.installation-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.step {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e4e7eb;
}

.step-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #09090b;
}

.code-block-wrapper {
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #2a2a2a;
  border-bottom: 1px solid #3a3a3a;
}

.code-actions {
  display: flex;
  gap: 0.5rem;
}

.copy-button.secondary {
  background: #6b7280;
}

.copy-button.secondary:hover {
  background: #4b5563;
}

.code-title {
  font-size: 0.875rem;
  color: #a1a1aa;
  font-weight: 500;
}

.copy-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.copy-button:hover {
  background: #2563eb;
}

.copy-button.copied {
  background: #10b981;
}

.code-block {
  padding: 1rem;
  font-family: 'Fira Code', 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #e5e7eb;
  overflow-x: auto;
  white-space: pre;
  margin: 0;
  background: #1a1a1a;
}

/* Component Cards */
.component-card {
  background: white;
  border: 1px solid #e4e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.component-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.component-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e4e7eb;
  background: #fafafa;
}

.component-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #09090b;
}

.component-description {
  font-size: 1rem;
  color: #71717a;
  line-height: 1.6;
  margin: 0;
}

.component-preview {
  padding: 3rem 2rem;
  background: #fafafa;
  border-bottom: 1px solid #e4e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  max-width: 100%;
  overflow: hidden;
}

/* Component Usage */
.component-usage {
  padding: 1.5rem 2rem;
}

.usage-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #09090b;
}

/* Props Table */
.component-props {
  background: #f8fafc;
  border-top: 1px solid #e4e7eb;
  padding: 1.5rem 2rem;
  margin-top: 0;
  border-radius: 0 0 8px 8px;
}

.props-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #09090b;
}

.props-table {
  background: white;
  border: 1px solid #e4e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.props-header {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e4e7eb;
  font-weight: 600;
  font-size: 0.875rem;
  color: #09090b;
}

.prop-row {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e4e7eb;
  font-size: 0.875rem;
}

.prop-row:last-child {
  border-bottom: none;
}

.prop-name {
  font-weight: 600;
  color: #09090b;
  font-family: 'Fira Code', 'Courier New', monospace;
}

.prop-type {
  color: #7c3aed;
  font-family: 'Fira Code', 'Courier New', monospace;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8125rem;
}

.prop-description {
  color: #71717a;
  line-height: 1.5;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
  }
  
  .sidebar {
    position: fixed;
    top: 64px;
    left: 0;
    width: 320px;
    height: calc(100vh - 64px);
    z-index: 999;
    background: white;
    border-right: 1px solid #e4e7eb;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 0;
    width: 100%;
  }
  
  .content-container {
    padding: 1rem;
  }
  
  .mobile-menu-toggle {
    display: flex;
    position: fixed;
    top: 75px;
    left: 1rem;
    z-index: 1000;
    background: white;
    border: 1px solid #e4e7eb;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .page-title {
    font-size: 2rem;
    margin-top: 3rem;
  }
  
  .component-preview {
    padding: 2rem 1.5rem;
    min-height: 180px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100%;
    top: 56px;
    height: calc(100vh - 56px);
  }
  
  .mobile-menu-toggle {
    top: 63px;
    left: 0.75rem;
  }
  
  .content-container {
    padding: 0.75rem;
  }
  
  .page-title {
    font-size: 1.75rem;
    margin-top: 3.5rem;
  }
  
  .component-preview {
    padding: 1.5rem 1rem;
    min-height: 150px;
  }
}
</style>
