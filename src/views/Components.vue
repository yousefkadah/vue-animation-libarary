<template>
  <div class="components-page">
    <!-- Mobile Menu Toggle -->
    <button 
      class="mobile-menu-toggle"
      @click="isMobileMenuOpen = !isMobileMenuOpen"
      :class="{ active: isMobileMenuOpen }"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <!-- Main Layout -->
    <div class="main-layout">
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
        <div class="sidebar-content">
          <!-- Search Input -->
          <div class="search-section">
            <div class="search-input-wrapper">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search components..."
                class="search-input"
              />
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          </div>
          
          <div class="sidebar-section">
            <h3 class="sidebar-title">Getting Started</h3>
            <nav class="sidebar-nav">
              <a href="#introduction" class="sidebar-link">Introduction</a>
              <a href="#installation" class="sidebar-link">Installation</a>
            </nav>
          </div>
          
          <div class="sidebar-section">
            <h3 class="sidebar-title">Components</h3>
            <nav class="sidebar-nav">
              <div 
                v-for="category in categories" 
                :key="category.id"
                class="category-group"
              >
                <a 
                  :href="`#${category.id}`"
                  :class="['sidebar-link', 'category-link', { active: activeCategory === category.id && !selectedComponent, 'no-arrow': category.id === 'all' }]"
                  @click.prevent="activeCategory = category.id; selectedComponent = ''; closeMobileMenu()"
                >
                  {{ category.name }}
                </a>
                <div v-if="activeCategory === category.id && category.id !== 'all'" class="component-links">
                  <a 
                    v-for="component in getComponentsByCategory(category.id)" 
                    :key="component.name"
                    :href="`#${component.name.toLowerCase().replace(/\s+/g, '-')}`"
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
          <section v-if="activeCategory === 'all' && !selectedComponent" id="introduction" class="content-section">
            <h1 class="page-title">Components</h1>
            <p class="page-description">
              Copy and paste the most trending components and use them in your websites without having to worry about styling and animations.
            </p>
            
            <!-- Installation Section -->
            <div class="installation-section">
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
                        @click="copyCode(installationCode)"
                        :class="{ copied: copiedCode === installationCode }"
                      >
                        {{ copiedCode === installationCode ? 'Copied!' : 'Copy' }}
                      </button>
                    </div>
                    <pre class="code-block"><code>{{ installationCode }}</code></pre>
                  </div>
                </div>
                
                <div class="step">
                  <h4 class="step-title">3. Use in your templates</h4>
                  <div class="code-block-wrapper">
                    <div class="code-header">
                      <span class="code-title">App.vue</span>
                      <button 
                        class="copy-button"
                        @click="copyCode(usageExample)"
                        :class="{ copied: copiedCode === usageExample }"
                      >
                        {{ copiedCode === usageExample ? 'Copied!' : 'Copy' }}
                      </button>
                    </div>
                    <pre class="code-block"><code>{{ usageExample }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Components Grid -->
          <div class="components-grid">
            <!-- Single Component View -->
            <template v-if="selectedComponent">
              <div class="component-header-section">
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
              
              <div 
                v-for="component in filteredComponents" 
                :key="component.name"
                :id="component.name.toLowerCase().replace(/\s+/g, '-')"
                class="component-card single-component"
              >
                <div class="component-demo">
                  <component :is="component.component" v-bind="component.props">
                    <template v-if="component.slots?.default">{{ component.slots.default }}</template>
                  </component>
                </div>
                
                <div class="component-code-section">
                  <div class="code-tabs">
                    <button 
                      :class="['code-tab', { active: activeTab === 'manual' }]"
                      @click="activeTab = 'manual'"
                    >
                      📋 Manual
                    </button>
                    <button 
                      :class="['code-tab', { active: activeTab === 'cli' }]"
                      @click="activeTab = 'cli'"
                    >
                      ⚡ CLI
                    </button>
                    <button 
                      :class="['code-tab', { active: activeTab === 'props' }]"
                      @click="activeTab = 'props'"
                    >
                      📚 API
                    </button>
                  </div>
                  
                  <!-- Manual Installation Tab -->
                  <div v-if="activeTab === 'manual'" class="tab-content">
                    <div class="installation-method">
                      <h4 class="method-title">📋 Copy & Paste</h4>
                      <p class="method-description">Copy the component file and paste it into your project</p>
                    </div>
                    
                    <div class="code-example">
                      <div class="code-header">
                        <span class="code-title">{{ component.name }}.vue</span>
                        <div class="code-actions">
                          <button 
                            class="copy-button"
                            @click="copyComponentFile(component.name)"
                            :class="{ copied: copiedCode === `${component.name}-file` }"
                          >
                            {{ copiedCode === `${component.name}-file` ? '✅ Copied!' : '📋 Copy Component' }}
                          </button>
                          <button 
                            class="copy-button secondary"
                            @click="copyFullSource(component.name)"
                            :class="{ copied: copiedCode === `${component.name}-full-source` }"
                          >
                            {{ copiedCode === `${component.name}-full-source` ? '✅ Copied!' : '🚀 Copy Full Source' }}
                          </button>
                        </div>
                      </div>
                      <div v-if="componentCodeCache[component.name]" class="code-content">
                        <pre class="code-block"><code>{{ componentCodeCache[component.name] }}</code></pre>
                      </div>
                      <div v-else class="loading-indicator">
                        <div class="loading-spinner"></div>
                        <span>Loading source code...</span>
                      </div>
                    </div>
                    
                    <div class="manual-steps">
                      <h4>📝 Installation Steps:</h4>
                      <ol class="installation-steps-list">
                        <li>Create a new file: <code>components/{{ component.name }}.vue</code></li>
                        <li>Copy the component code above and paste it into the file</li>
                        <li>Import the component in your Vue file:</li>
                      </ol>
                      
                      <div class="code-example">
                        <div class="code-header">
                          <span class="code-title">Import & Usage</span>
                          <button 
                            class="copy-button"
                            @click="copyCode(getManualUsageCode(component.name))"
                            :class="{ copied: copiedCode === getManualUsageCode(component.name) }"
                          >
                            {{ copiedCode === getManualUsageCode(component.name) ? 'Copied!' : 'Copy' }}
                          </button>
                        </div>
                        <pre class="code-block"><code>{{ getManualUsageCode(component.name) }}</code></pre>
                      </div>
                    </div>
                  </div>
                  
                  <!-- CLI Installation Tab -->
                  <div v-if="activeTab === 'cli'" class="tab-content">
                    <div class="installation-method">
                      <h4 class="method-title">⚡ CLI Installation</h4>
                      <p class="method-description">Add components to your project with a single command</p>
                    </div>
                    
                    <div class="cli-steps">
                      <div class="cli-step">
                        <h5>1. Install the CLI (one time setup)</h5>
                        <div class="code-example">
                          <div class="code-header">
                            <span class="code-title">Terminal</span>
                            <button 
                              class="copy-button"
                              @click="copyCode('npm install -g vue-magic-ui-cli')"
                              :class="{ copied: copiedCode === 'npm install -g vue-magic-ui-cli' }"
                            >
                              {{ copiedCode === 'npm install -g vue-magic-ui-cli' ? 'Copied!' : 'Copy' }}
                            </button>
                          </div>
                          <pre class="code-block"><code>npm install -g vue-magic-ui-cli</code></pre>
                        </div>
                      </div>
                      
                      <div class="cli-step">
                        <h5>2. Initialize in your project</h5>
                        <div class="code-example">
                          <div class="code-header">
                            <span class="code-title">Terminal</span>
                            <button 
                              class="copy-button"
                              @click="copyCode('vue-magic-ui init')"
                              :class="{ copied: copiedCode === 'vue-magic-ui init' }"
                            >
                              {{ copiedCode === 'vue-magic-ui init' ? 'Copied!' : 'Copy' }}
                            </button>
                          </div>
                          <pre class="code-block"><code>vue-magic-ui init</code></pre>
                        </div>
                      </div>
                      
                      <div class="cli-step">
                        <h5>3. Add this component</h5>
                        <div class="code-example">
                          <div class="code-header">
                            <span class="code-title">Terminal</span>
                            <button 
                              class="copy-button"
                              @click="copyCode(`vue-magic-ui add ${component.name.toLowerCase()}`)"
                              :class="{ copied: copiedCode === `vue-magic-ui add ${component.name.toLowerCase()}` }"
                            >
                              {{ copiedCode === `vue-magic-ui add ${component.name.toLowerCase()}` ? 'Copied!' : 'Copy' }}
                            </button>
                          </div>
                          <pre class="code-block"><code>vue-magic-ui add {{ component.name.toLowerCase() }}</code></pre>
                        </div>
                      </div>
                      
                      <div class="cli-step">
                        <h5>4. Use in your template</h5>
                        <div class="code-example">
                          <div class="code-header">
                            <span class="code-title">Your Component</span>
                            <button 
                              class="copy-button"
                              @click="copyCode(component.code)"
                              :class="{ copied: copiedCode === component.code }"
                            >
                              {{ copiedCode === component.code ? 'Copied!' : 'Copy' }}
                            </button>
                          </div>
                          <pre class="code-block"><code>{{ component.code }}</code></pre>
                        </div>
                      </div>
                    </div>
                    
                    <div class="cli-benefits">
                      <h4>🚀 CLI Benefits:</h4>
                      <ul>
                        <li>✅ Automatic component installation</li>
                        <li>✅ Dependency management</li>
                        <li>✅ Type definitions included</li>
                        <li>✅ Consistent project structure</li>
                        <li>✅ Easy updates and version management</li>
                      </ul>
                    </div>
                  </div>
                  
                  <!-- Props Tab -->
                  <div v-if="activeTab === 'props'" class="tab-content">
                    <div v-if="component.propsDoc && component.propsDoc.length > 0" class="component-props">
                      <h4 class="props-title">API Reference</h4>
                      <div class="props-table">
                        <div class="props-header">
                          <span>Prop</span>
                          <span>Type</span>
                          <span>Default</span>
                          <span>Description</span>
                        </div>
                        <div 
                          v-for="prop in component.propsDoc" 
                          :key="prop.name"
                          class="prop-row"
                        >
                          <span class="prop-name">{{ prop.name }}</span>
                          <span class="prop-type">{{ prop.type }}</span>
                          <span class="prop-default">-</span>
                          <span class="prop-description">{{ prop.description }}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="no-props">
                      <p>This component doesn't have any configurable props.</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            
            <!-- All Components View -->
            <template v-else-if="activeCategory === 'all'">
              <div v-for="category in categories.filter(c => c.id !== 'all')" :key="category.id" class="category-section">
                <h2 :id="category.id" class="category-title">{{ category.name }}</h2>
                <div class="category-components">
                  <div 
                    v-for="component in getComponentsByCategory(category.id)" 
                    :key="component.name"
                    :id="component.name.toLowerCase().replace(/\s+/g, '-')"
                    class="component-card"
                  >
                    <div class="component-header">
                      <div class="header-top">
                        <h3 class="component-title">{{ component.name }}</h3>
                        <div class="component-badges">
                          <span class="category-badge">{{ getCategoryName(component.category) }}</span>
                          <span v-if="component.propsDoc && component.propsDoc.length > 0" class="props-badge">
                            {{ component.propsDoc.length }} Props
                          </span>
                        </div>
                      </div>
                      <p class="component-description">{{ component.description }}</p>
                      <div class="usage-hint">
                        <span class="hint-label">Usage:</span>
                        <code class="inline-code">&lt;{{ component.name }} /&gt;</code>
                      </div>
                    </div>
                    
                    <div class="component-demo">
                      <component :is="component.component" v-bind="component.props">
                        <template v-if="component.slots?.default">{{ component.slots.default }}</template>
                      </component>
                    </div>
                    
                    <div class="component-code-section">
                      <div class="code-tabs">
                        <button class="code-tab active">Preview</button>
                        <button class="code-tab">Code</button>
                      </div>
                      <div class="component-code">
                        <div class="code-header">
                          <span class="code-title">{{ component.name }}.vue</span>
                          <button 
                            class="copy-button"
                            @click="copyCode(component.code)"
                            :class="{ copied: copiedCode === component.code }"
                          >
                            {{ copiedCode === component.code ? 'Copied!' : 'Copy' }}
                          </button>
                        </div>
                        <pre class="code-block"><code>{{ component.code }}</code></pre>
                      </div>
                    </div>
                    
                    <div class="component-props" v-if="component.propsDoc">
                      <h4 class="props-title">API Reference</h4>
                      <div class="props-table">
                        <div class="props-header">
                          <span>Prop</span>
                          <span>Type</span>
                          <span>Default</span>
                          <span>Description</span>
                        </div>
                        <div 
                          v-for="prop in component.propsDoc" 
                          :key="prop.name"
                          class="prop-row"
                        >
                          <span class="prop-name">{{ prop.name }}</span>
                          <span class="prop-type">{{ prop.type }}</span>
                          <span class="prop-default">-</span>
                          <span class="prop-description">{{ prop.description }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            
            <!-- Category View -->
            <template v-else>
              <div 
                v-for="component in filteredComponents" 
                :key="component.name"
                :id="component.name.toLowerCase().replace(/\s+/g, '-')"
                class="component-card"
              >
                <div class="component-header">
                  <h3 class="component-title">{{ component.name }}</h3>
                  <p class="component-description">{{ component.description }}</p>
                </div>
                
                <div class="component-demo">
                  <component :is="component.component" v-bind="component.props">
                    <template v-if="component.slots?.default">{{ component.slots.default }}</template>
                  </component>
                </div>
                
                <div class="component-code-section">
                  <div class="code-tabs">
                    <button class="code-tab active">Preview</button>
                    <button class="code-tab">Code</button>
                  </div>
                  <div class="component-code">
                    <div class="code-header">
                      <span class="code-title">{{ component.name }}.vue</span>
                      <button 
                        class="copy-button"
                        @click="copyCode(component.code)"
                        :class="{ copied: copiedCode === component.code }"
                      >
                        {{ copiedCode === component.code ? 'Copied!' : 'Copy' }}
                      </button>
                    </div>
                    <pre class="code-block"><code>{{ component.code }}</code></pre>
                  </div>
                </div>
                
                <div class="component-props" v-if="component.propsDoc">
                  <h4 class="props-title">API Reference</h4>
                  <div class="props-table">
                    <div class="props-header">
                      <span>Prop</span>
                      <span>Type</span>
                      <span>Default</span>
                      <span>Description</span>
                    </div>
                    <div 
                      v-for="prop in component.propsDoc" 
                      :key="prop.name"
                      class="prop-row"
                    >
                      <span class="prop-name">{{ prop.name }}</span>
                      <span class="prop-type">{{ prop.type }}</span>
                      <span class="prop-default">-</span>
                      <span class="prop-description">{{ prop.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

const activeCategory = ref('all')
const selectedComponent = ref('')
const copiedCode = ref('')
const activeTab = ref('manual')
const isMobileMenuOpen = ref(false)
const searchQuery = ref('')
const componentCodeCache = ref<Record<string, string>>({})

// Installation and usage examples
const installationCode = `import { createApp } from 'vue'
import App from './App.vue'
import { FadeIn, SparkleText, MagicButton } from 'vue-magic-ui'

const app = createApp(App)

// Register components globally
app.component('FadeIn', FadeIn)
app.component('SparkleText', SparkleText)
app.component('MagicButton', MagicButton)

app.mount('#app')`

const usageExample = `<template>
  <div>
    <FadeIn :delay="200">
      <h1>Welcome to Vue Magic UI</h1>
    </FadeIn>
    
    <SparkleText :auto-sparkle="true">
      Beautiful animations
    </SparkleText>
    
    <MagicButton variant="gradient">
      Get Started
    </MagicButton>
  </div>
</template>`

const categories = [
  { id: 'all', name: 'All Components' },
  { id: 'animations', name: 'Animations' },
  { id: 'effects', name: 'Effects' },
  { id: 'ui', name: 'UI Elements' },
  { id: 'backgrounds', name: 'Backgrounds' },
  { id: 'loaders', name: 'Loaders' }
]

const components = [
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
    name: 'FloatingCard',
    description: 'Card component with floating animation',
    category: 'ui',
    component: FloatingCard,
    props: {},
    slots: { default: 'Floating Card Content' },
    code: `<FloatingCard>
  <div>Card content</div>
</FloatingCard>`,
    propsDoc: [
      { name: 'intensity', type: 'number', description: 'Float animation intensity' }
    ]
  },
  {
    name: 'TypewriterText',
    description: 'Typewriter effect with customizable speed and looping',
    category: 'effects',
    component: TypewriterText,
    props: { 
      text: ['Hello World!', 'Welcome to Vue Magic UI'], 
      loop: true, 
      speed: 100 
    },
    code: `<TypewriterText 
  :text="['Hello World!', 'Welcome!']"
  :loop="true"
  :speed="100"
/>`,
    propsDoc: [
      { name: 'text', type: 'string[]', description: 'Array of text strings to type' },
      { name: 'loop', type: 'boolean', description: 'Loop through text array' },
      { name: 'speed', type: 'number', description: 'Typing speed in milliseconds' }
    ]
  },
  {
    name: 'GradientText',
    description: 'Text with animated gradient colors',
    category: 'effects',
    component: GradientText,
    props: { colors: ['#42b883', '#369870', '#2a9d8f'] },
    slots: { default: 'Gradient Text' },
    code: `<GradientText :colors="['#42b883', '#369870', '#2a9d8f']">
  Gradient Text
</GradientText>`,
    propsDoc: [
      { name: 'colors', type: 'string[]', description: 'Array of gradient colors' }
    ]
  },
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
    description: 'Wave animation loader',
    category: 'loaders',
    component: WaveLoader,
    props: { color: '#369870' },
    code: `<WaveLoader color="#369870" />`,
    propsDoc: [
      { name: 'color', type: 'string', description: 'Wave color' }
    ]
  },
  {
    name: 'ParticleEffect',
    description: 'Animated particle system',
    category: 'effects',
    component: ParticleEffect,
    props: { count: 50, colors: ['#42b883', '#369870'] },
    code: `<ParticleEffect 
  :count="50" 
  :colors="['#42b883', '#369870']" 
/>`,
    propsDoc: [
      { name: 'count', type: 'number', description: 'Number of particles' },
      { name: 'colors', type: 'string[]', description: 'Particle colors' },
      { name: 'speed', type: 'number', description: 'Animation speed' }
    ]
  },
  {
    name: 'MorphingShape',
    description: 'Shape that morphs between different forms',
    category: 'effects',
    component: MorphingShape,
    props: { duration: 2000, size: 100 },
    code: `<MorphingShape :duration="2000" :size="100" />`,
    propsDoc: [
      { name: 'duration', type: 'number', description: 'Animation duration in milliseconds' },
      { name: 'size', type: 'number', description: 'Shape size in pixels' },
      { name: 'shapes', type: 'string[]', description: 'Array of shape types to morph between' }
    ]
  },
  {
    name: 'GlowCard',
    description: 'Card with glowing border effect',
    category: 'ui',
    component: GlowCard,
    props: { glowColor: '#42b883', glowIntensity: 0.8 },
    slots: { default: 'Hover me for glow effect!' },
    code: `<GlowCard :glow-color="#42b883" :glow-intensity="0.8">
  <div>Card content with glow</div>
</GlowCard>`,
    propsDoc: [
      { name: 'glowColor', type: 'string', description: 'Glow color' },
      { name: 'glowIntensity', type: 'number', description: 'Glow intensity (0-1)' }
    ]
  },
  {
    name: 'ShimmerButton',
    description: 'Button with shimmer animation effect',
    category: 'ui',
    component: ShimmerButton,
    props: { shimmerColor: '#ffffff', duration: 2000 },
    slots: { default: 'Shimmer Button' },
    code: `<ShimmerButton :shimmer-color="#ffffff" :duration="2000">
  Shimmer Button
</ShimmerButton>`,
    propsDoc: [
      { name: 'shimmerColor', type: 'string', description: 'Shimmer effect color' },
      { name: 'duration', type: 'number', description: 'Animation duration in milliseconds' }
    ]
  },
  {
    name: 'CountUp',
    description: 'Animated number counter',
    category: 'animations',
    component: CountUp,
    props: { end: 1000, duration: 2000, suffix: '+' },
    code: `<CountUp 
  :end="1000" 
  :duration="2000" 
  suffix="+" 
/>`,
    propsDoc: [
      { name: 'end', type: 'number', description: 'Target number to count to' },
      { name: 'duration', type: 'number', description: 'Animation duration in milliseconds' },
      { name: 'suffix', type: 'string', description: 'Suffix to append to number' }
    ]
  },
  {
    name: 'TextReveal',
    description: 'Text reveal animation with mask effect',
    category: 'animations',
    component: TextReveal,
    props: { text: 'Text Reveal Animation' },
    code: `<TextReveal 
  text="Text Reveal Animation" 
  :delay="100" 
/>`,
    propsDoc: [
      { name: 'text', type: 'string', description: 'Text to reveal' },
      { name: 'delay', type: 'number', description: 'Animation delay in milliseconds' }
    ]
  },
  {
    name: 'Meteors',
    description: 'Animated meteor shower background effect',
    category: 'backgrounds',
    component: Meteors,
    props: { 
      number: 8, 
      width: 300, 
      height: 200, 
      colors: ['#42b883', '#369870'] 
    },
    slots: { default: 'Meteors Content' },
    code: `<Meteors 
  :number="15" 
  :width="400" 
  :height="300"
  :colors="['#42b883', '#369870']"
>
  <div>Content over meteors</div>
</Meteors>`,
    propsDoc: [
      { name: 'number', type: 'number', description: 'Number of meteors' },
      { name: 'width', type: 'number', description: 'Container width' },
      { name: 'height', type: 'number', description: 'Container height' },
      { name: 'colors', type: 'string[]', description: 'Meteor colors' }
    ]
  },
  {
    name: 'GridPattern',
    description: 'Animated grid background pattern',
    category: 'backgrounds',
    component: GridPattern,
    props: { 
      width: 40, 
      height: 40, 
      strokeDasharray: '4,4',
      fade: true 
    },
    code: `<GridPattern 
  :width="40" 
  :height="40" 
  stroke-dasharray="4,4"
  :fade="true"
/>`,
    propsDoc: [
      { name: 'width', type: 'number', description: 'Grid cell width' },
      { name: 'height', type: 'number', description: 'Grid cell height' },
      { name: 'strokeDasharray', type: 'string', description: 'SVG stroke dash pattern' },
      { name: 'fade', type: 'boolean', description: 'Enable fade effect' }
    ]
  },
  {
    name: 'BorderBeam',
    description: 'Animated border with beam effect',
    category: 'effects',
    component: BorderBeam,
    props: { 
      size: 200, 
      duration: 8, 
      colorFrom: '#42b883', 
      colorTo: '#369870' 
    },
    slots: { default: 'Border Beam Content' },
    code: `<BorderBeam 
  :size="200" 
  :duration="8" 
  color-from="#42b883" 
  color-to="#369870"
>
  <div>Content with border beam</div>
</BorderBeam>`,
    propsDoc: [
      { name: 'size', type: 'number', description: 'Beam size' },
      { name: 'duration', type: 'number', description: 'Animation duration in seconds' },
      { name: 'colorFrom', type: 'string', description: 'Starting color' },
      { name: 'colorTo', type: 'string', description: 'Ending color' }
    ]
  },
  {
    name: 'RippleEffect',
    description: 'Click ripple effect animation',
    category: 'effects',
    component: RippleEffect,
    props: { color: '#42b883' },
    slots: { default: 'Click for Ripple' },
    code: `<RippleEffect color="#42b883">
  <button>Click for ripple</button>
</RippleEffect>`,
    propsDoc: [
      { name: 'color', type: 'string', description: 'Ripple color' }
    ]
  },
  {
    name: 'RetroGrid',
    description: 'Retro-style animated grid background',
    category: 'backgrounds',
    component: RetroGrid,
    props: { color: '#42b883', size: 50 },
    code: `<RetroGrid :color="#42b883" :size="50" />`,
    propsDoc: [
      { name: 'color', type: 'string', description: 'Grid color' },
      { name: 'size', type: 'number', description: 'Grid cell size' },
      { name: 'opacity', type: 'number', description: 'Grid opacity (0-1)' }
    ]
  },
  {
    name: 'Aurora',
    description: 'Aurora borealis background effect',
    category: 'backgrounds',
    component: Aurora,
    props: { 
      size: 400, 
      colors: ['#42b883', '#369870', '#2a9d8f'] 
    },
    slots: { default: 'Aurora Content' },
    code: `<Aurora 
  :size="400" 
  :colors="['#42b883', '#369870', '#2a9d8f']"
>
  <div>Content over aurora</div>
</Aurora>`,
    propsDoc: [
      { name: 'size', type: 'number', description: 'Aurora size' },
      { name: 'colors', type: 'string[]', description: 'Aurora colors' }
    ]
  },
  {
    name: 'NumberTicker',
    description: 'Animated number ticker with smooth transitions',
    category: 'animations',
    component: NumberTicker,
    props: { value: 12345, duration: 2000 },
    code: `<NumberTicker 
  :value="12345" 
  :duration="2000"
  suffix="+"
/>`,
    propsDoc: [
      { name: 'value', type: 'number', description: 'Number to display' },
      { name: 'duration', type: 'number', description: 'Animation duration in milliseconds' },
      { name: 'prefix', type: 'string', description: 'Text to show before the number' },
      { name: 'suffix', type: 'string', description: 'Text to show after the number' },
      { name: 'decimalPlaces', type: 'number', description: 'Number of decimal places' }
    ]
  },
  {
    name: 'OrbitingCircles',
    description: 'Orbiting circles animation',
    category: 'effects',
    component: OrbitingCircles,
    props: { radius: 100, duration: 4, count: 6 },
    code: `<OrbitingCircles :radius="100" :duration="4" :count="6" />`,
    propsDoc: [
      { name: 'radius', type: 'number', description: 'Orbit radius in pixels' },
      { name: 'duration', type: 'number', description: 'Orbit duration in seconds' },
      { name: 'count', type: 'number', description: 'Number of orbiting circles' }
    ]
  },
  {
    name: 'AnimatedBeam',
    description: 'Animated beam connecting two points',
    category: 'effects',
    component: AnimatedBeam,
    props: { color: '#42b883', duration: 3, width: 200 },
    code: `<AnimatedBeam :color="#42b883" :duration="3" :width="200" />`,
    propsDoc: [
      { name: 'color', type: 'string', description: 'Beam color' },
      { name: 'duration', type: 'number', description: 'Animation duration in seconds' },
      { name: 'width', type: 'number', description: 'Beam width in pixels' }
    ]
  },
  {
    name: 'Marquee',
    description: 'Scrolling marquee text with smooth animation',
    category: 'animations',
    component: Marquee,
    props: { 
      text: 'Scrolling marquee text example • Another text • More content',
      speed: 50 
    },
    code: `<Marquee 
  text="Your scrolling text here" 
  :speed="50" 
/>`,
    propsDoc: [
      { name: 'text', type: 'string', description: 'Text to scroll' },
      { name: 'speed', type: 'number', description: 'Scroll speed in pixels per second' }
    ]
  }
]

const filteredComponents = computed(() => {
  let filtered = components
  
  // If a specific component is selected, show only that component
  if (selectedComponent.value) {
    filtered = components.filter(component => component.name === selectedComponent.value)
  } else if (activeCategory.value !== 'all') {
    // Filter by category
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

const getImportCode = (componentName: string) => {
  return `import { ${componentName} } from 'vue-magic-ui'

export default {
  components: {
    ${componentName}
  },
  // ... rest of your component
}`
}

const scrollToComponent = (componentName: string) => {
  selectedComponent.value = componentName
  activeTab.value = 'manual' // Reset to manual tab when selecting a component
  isMobileMenuOpen.value = false // Close mobile menu when selecting a component
  
  // Load component code
  loadComponentCode(componentName)
  
  // If we're showing all components, scroll to the specific component
  if (activeCategory.value === 'all') {
    const elementId = componentName.toLowerCase().replace(/\s+/g, '-')
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// Load component code
const loadComponentCode = async (componentName: string) => {
  if (!componentCodeCache.value[componentName]) {
    const code = await getFullComponentCode(componentName)
    componentCodeCache.value[componentName] = code
  }
}

// Component code management
const getFullComponentCode = async (componentName: string) => {
  // Check cache first
  if (componentCodeCache.value[componentName]) {
    return componentCodeCache.value[componentName]
  }
  
  try {
    // Try to load the actual component file
    const response = await fetch(`/src/components/${componentName}.vue`)
    if (response.ok) {
      const actualCode = await response.text()
      componentCodeCache.value[componentName] = actualCode
      return actualCode
    }
  } catch (error) {
    console.warn(`Could not load ${componentName}.vue file, using template:`, error)
  }
  
  // Fallback: Generate enhanced component template based on the component definition
  const component = components.find(c => c.name === componentName)
  const kebabCase = componentName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
  
  // Generate props interface based on propsDoc
  let propsInterface = 'interface Props {\n'
  if (component?.propsDoc && component.propsDoc.length > 0) {
    component.propsDoc.forEach(prop => {
      const optional = prop.name === 'delay' || prop.name === 'duration' ? '?' : ''
      propsInterface += `  ${prop.name}${optional}: ${prop.type.toLowerCase()}\n`
    })
  }
  propsInterface += '}'
  
  // Generate default props
  let defaultProps = ''
  if (component?.propsDoc && component.propsDoc.length > 0) {
    defaultProps = 'withDefaults(defineProps&lt;Props&gt;(), {\n'
    component.propsDoc.forEach(prop => {
      if (prop.name === 'delay') defaultProps += '  delay: 0,\n'
      else if (prop.name === 'duration') defaultProps += '  duration: 1000,\n'
      else if (prop.type === 'boolean') defaultProps += `  ${prop.name}: false,\n`
      else if (prop.type === 'number') defaultProps += `  ${prop.name}: 1,\n`
      else if (prop.type === 'string') defaultProps += `  ${prop.name}: '',\n`
      else if (prop.type === 'string[]') defaultProps += `  ${prop.name}: () => [],\n`
    })
    defaultProps += '})'
  } else {
    defaultProps = 'defineProps&lt;Props&gt;()'
  }
  
  const code = `<template>
  <div class="${kebabCase}">
    <!-- ${componentName} implementation -->
    ${component?.slots?.default ? '<slot />' : '<!-- Component content -->'}
  </div>
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref, onMounted } from 'vue'

${propsInterface}

const props = ${defaultProps}

// Component logic here
onMounted(() => {
  // Initialize ${componentName}
})
&lt;/script&gt;

&lt;style scoped&gt;
.${kebabCase} {
  /* ${componentName} styles */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}
&lt;/style&gt;`;
  
  componentCodeCache.value[componentName] = code;
  return code;
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

// Helper functions for code generation
const getComponentCodeDisplay = async (componentName: string) => {
  return await getFullComponentCode(componentName)
}

const getManualUsageCode = (componentName: string) => {
  return `&lt;template&gt;
  &lt;${componentName} /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import ${componentName} from '@/components/${componentName}.vue'
&lt;/script&gt;`
}

const copyComponentFile = async (componentName: string) => {
  try {
    const code = await getFullComponentCode(componentName)
    await copyCode(code)
    copiedCode.value = `${componentName}-file`
    setTimeout(() => {
      copiedCode.value = ''
    }, 2000)
  } catch (error) {
    console.error('Failed to copy component file:', error)
    // Show error state briefly
    copiedCode.value = 'Error'
    setTimeout(() => {
      copiedCode.value = ''
    }, 2000)
  }
}

// Add function to copy full source with all dependencies
const copyFullSource = async (componentName: string) => {
  try {
    const componentCode = await getFullComponentCode(componentName)
    const usageCode = getManualUsageCode(componentName)
    const component = components.find(c => c.name === componentName)
    
    const fullSource = `/* 
 * ${componentName} Component - Vue Magic UI
 * ${component?.description || 'A Vue component for magical UI experiences'}
 */

// 1. Create the component file: components/${componentName}.vue
${componentCode}

// 2. Import and use in your component
${usageCode}

// 3. Available props:
${component?.propsDoc?.map(prop => `//   ${prop.name}: ${prop.type} - ${prop.description}`).join('\n') || '//   No props available'}

// For more components and documentation, visit: https://vue-magic-ui.com`
    
    await copyCode(fullSource)
    copiedCode.value = `${componentName}-full-source`
    setTimeout(() => {
      copiedCode.value = ''
    }, 2000)
  } catch (error) {
    console.error('Failed to copy full source:', error)
    copiedCode.value = 'Error'
    setTimeout(() => {
      copiedCode.value = ''
    }, 2000)
  }
}

// Mobile menu close function
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Initialize component codes on mount
onMounted(() => {
  components.forEach(component => {
    loadComponentCode(component.name)
  })
})
</script>

<style scoped>
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
  width: 250px;
  background: #ffffff;
  border-right: 1px solid #e4e4e7;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-content {
  padding: 2rem 0;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.sidebar-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #09090b;
  margin-bottom: 1rem;
  padding: 0 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.category-group {
  margin-bottom: 0.5rem;
}

.category-link {
  font-weight: 500;
  color: #09090b;
  position: relative;
  padding-right: 2rem;
}

.category-link::after {
  content: '▶';
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: #71717a;
  transition: transform 0.2s ease;
}

.category-link.active::after {
  transform: translateY(-50%) rotate(90deg);
}

.category-link.no-arrow::after {
  display: none;
}

.component-links {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  padding-left: 0.75rem;
  border-left: 1px solid #e4e7eb;
  margin-left: 1.5rem;
}

.component-link {
  font-size: 0.8125rem;
  color: #71717a;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0.125rem;
  border-radius: 4px;
  border-left: none;
}

.component-link:hover {
  background-color: #f4f4f5;
  color: #09090b;
}

.sidebar-link {
  display: block;
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  color: #71717a;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
}

.sidebar-link:hover {
  color: #09090b;
  background-color: #f4f4f5;
}

.sidebar-link.active {
  color: #09090b;
  background-color: #f4f4f5;
  border-left-color: #09090b;
  font-weight: 500;
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

/* Quick Usage */
.quick-usage {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e4e7eb;
}

.usage-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #09090b;
}

.usage-steps {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.usage-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e4e7eb;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: #09090b;
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
}

.step-text {
  font-size: 0.875rem;
  color: #71717a;
}

/* Tab Content */
.tab-content {
  display: block;
  background: white;
  border: 1px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 2rem;
}

.no-props {
  padding: 2rem;
  text-align: center;
  color: #71717a;
  background: #f8fafc;
  border-radius: 8px;
  margin-top: 1rem;
}

.no-props p {
  margin: 0;
  font-size: 0.875rem;
}

.usage-note {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f9ff;
  border-radius: 6px;
  border: 1px solid #bae6fd;
}

.usage-note h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 0.5rem;
}

.usage-note ul {
  margin: 0;
  padding-left: 1rem;
}

.usage-note li {
  font-size: 0.875rem;
  color: #0369a1;
  margin-bottom: 0.25rem;
}

/* Component Header Enhancements */
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.component-badges {
  display: flex;
  gap: 0.5rem;
}

.category-badge {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.props-badge {
  background: #ecfdf5;
  color: #059669;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.usage-hint {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e4e7eb;
}

.hint-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #09090b;
  margin-right: 0.5rem;
}

.inline-code {
  background: #27272a;
  color: #fafafa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.8125rem;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem;
  background: #ffffff;
}

.content-container {
  max-width: 800px;
}

.content-section {
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #09090b;
}

.page-description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #71717a;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #09090b;
}

.section-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #71717a;
}

/* Components Grid */
.components-grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.component-header-section {
  margin-bottom: 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f4f4f5;
  border: 1px solid #e4e7eb;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #71717a;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
}

.back-button:hover {
  background: #e4e7eb;
  color: #09090b;
}

.component-main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #09090b;
  margin-bottom: 0.5rem;
}

.component-main-description {
  font-size: 1.125rem;
  color: #71717a;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.single-component {
  border: none;
  box-shadow: none;
  background: transparent;
}

.single-component .component-demo {
  border: 1px solid #e4e7eb;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.category-section {
  margin-bottom: 4rem;
}

.category-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #09090b;
  border-bottom: 2px solid #e4e7eb;
  padding-bottom: 1rem;
}

.category-components {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.component-card {
  background: white;
  border: 1px solid #e4e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.component-card:hover {
  border-color: #d4d4d8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.component-header {
  padding: 2rem 2rem 1rem;
}

.component-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #09090b;
}

.component-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #71717a;
}

.component-demo {
  padding: 3rem 2rem;
  background: #f8fafc;
  border-top: 1px solid #e4e7eb;
  border-bottom: 1px solid #e4e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}

/* Code Section */
.component-code-section {
  background: white;
}

.code-tabs {
  display: flex;
  background: #f8fafc;
  border-radius: 8px 8px 0 0;
  padding: 0.25rem;
  gap: 0.25rem;
  border: 1px solid #e2e8f0;
  border-bottom: none;
}

.code-tab {
  padding: 0.75rem 1.25rem;
  background: transparent;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.code-tab:hover {
  background: #e2e8f0;
  color: #334155;
}

.code-tab.active {
  background: white;
  color: #42b883;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: 600;
}

.component-code {
  background: #1a1a1a;
  color: #fafafa;
  border-radius: 0 0 8px 8px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #27272a;
  border-bottom: 1px solid #3f3f46;
}

.code-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.code-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #fafafa;
  font-family: 'Fira Code', 'Courier New', monospace;
}

.copy-button {
  background: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 4px;
  color: #fafafa;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-button:hover {
  background: #3f3f46;
}

.copy-button.copied {
  background: #16a34a;
  border-color: #16a34a;
  color: white;
}

.copy-button.secondary {
  background: #42b883;
  border-color: #369870;
  font-weight: 500;
}

.copy-button.secondary:hover {
  background: #369870;
  border-color: #2a9d8f;
}

.copy-button.secondary.copied {
  background: #16a34a;
  border-color: #16a34a;
}

.code-block {
  padding: 1rem;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #fafafa;
  overflow-x: auto;
  margin: 0;
}

.component-props {
  background: #f8fafc;
  border-top: 1px solid #e4e7eb;
  padding: 1.5rem 2rem;
  margin-top: 0;
  border-radius: 0 0 8px 8px;
}

.component-props .props-title {
  margin-top: 0;
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
  grid-template-columns: 1fr 1fr 1fr 2fr;
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
  grid-template-columns: 1fr 1fr 1fr 2fr;
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
  color: #3b82f6;
}

.prop-type {
  font-family: 'Fira Code', 'Courier New', monospace;
  color: #dc2626;
  font-size: 0.75rem;
}

.prop-description {
  color: #71717a;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: white;
  border: 1px solid #e4e7eb;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  flex-direction: column;
  gap: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mobile-menu-toggle span {
  width: 18px;
  height: 2px;
  background: #09090b;
  transition: all 0.3s ease;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
}

/* Installation Method Styling */
.installation-method {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.method-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.method-description {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
}

/* Manual Installation Steps */
.manual-steps {
  margin-top: 2rem;
}

.manual-steps h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.installation-steps-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.installation-steps-list li {
  padding: 0.75rem 0;
  color: #475569;
  border-bottom: 1px solid #f1f5f9;
}

.installation-steps-list li:last-child {
  border-bottom: none;
}

.installation-steps-list code {
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: #42b883;
}

/* CLI Steps */
.cli-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.cli-step {
  position: relative;
}

.cli-step h5 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

/* CLI Benefits */
.cli-benefits {
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border-radius: 8px;
  border: 1px solid #bbf7d0;
}

.cli-benefits h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #166534;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cli-benefits ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cli-benefits li {
  padding: 0.5rem 0;
  color: #166534;
  font-size: 0.875rem;
}

/* Code Examples */
.code-example {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #334155;
}

.code-example .code-header {
  background: #334155;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #475569;
}

.code-example .code-title {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.code-example .copy-button {
  background: #42b883;
  border: 1px solid #42b883;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.code-example .copy-button:hover {
  background: #369870;
  border-color: #369870;
}

.code-example .copy-button.copied {
  background: #16a34a;
  border-color: #16a34a;
}

.code-example .code-block {
  background: #1e293b;
  color: #e2e8f0;
  margin: 0;
  padding: 1rem;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
}

/* Tab Content */
.tab-content {
  background: white;
  padding: 1.5rem 2rem;
}

.no-props {
  padding: 2rem;
  text-align: center;
  color: #71717a;
  background: #f8fafc;
  border-radius: 8px;
  margin-top: 1rem;
}

.no-props p {
  margin: 0;
  font-size: 0.875rem;
}

.usage-note {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f9ff;
  border-radius: 6px;
  border: 1px solid #bae6fd;
}

.usage-note h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 0.5rem;
}

.usage-note ul {
  margin: 0;
  padding-left: 1rem;
}

.usage-note li {
  font-size: 0.875rem;
  color: #0369a1;
  margin-bottom: 0.25rem;
}

/* Component Header Enhancements */
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.component-badges {
  display: flex;
  gap: 0.5rem;
}

.category-badge {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.props-badge {
  background: #ecfdf5;
  color: #059669;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.usage-hint {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e4e7eb;
}

.hint-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #09090b;
  margin-right: 0.5rem;
}

.inline-code {
  background: #27272a;
  color: #fafafa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.8125rem;
}

/* Quick Usage */
.quick-usage {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.usage-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #09090b;
  margin-bottom: 1rem;
}

.usage-steps {
  display: flex;
  gap: 1rem;
}

.usage-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
}

.step-text {
  font-size: 0.875rem;
  color: #71717a;
}

/* Loading Indicator */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  color: #64748b;
  font-size: 0.875rem;
  background: #f8fafc;
  border-radius: 6px;
  margin: 1rem;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #e2e8f0;
  border-top: 2px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
