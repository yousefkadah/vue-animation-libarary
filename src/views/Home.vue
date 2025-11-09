<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <Aurora :size="1400" :colors="['#3b82f6', '#8b5cf6', '#ec4899']" :opacity="0.4" />
        <GridPattern :size="80" :fade-mask="true" :animated="true" />
        <div class="hero-overlay"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <Motion
            :initial="{ opacity: 0, y: 60 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 1, delay: 0.2, ease: 'easeOut' }"
          >
            <h1 class="hero-title">
              <SparkleText :auto-sparkle="true" :sparkle-interval="1500">
                Vue Magic UI
              </SparkleText>
              <span class="version-badge">2.0</span>
            </h1>
          </Motion>
          
          <Motion
            :initial="{ opacity: 0, y: 40 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.4 }"
          >
            <div class="hero-typewriter">
              <TypewriterText 
                :text="[
                  'Modern Vue 3 Animation Library ✨',
                  'Spring Physics & Gesture Support 🚀',
                  'Performance Optimized Components ⚡',
                  'TypeScript & Tree-Shakable 🎯'
                ]"
                :speed="80"
                :loop="true"
                :pause="2500"
              />
            </div>
          </Motion>

          <Motion
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.6 }"
          >
            <p class="hero-subtitle">
              Professional animated components with spring physics, gesture recognition, and modern animations. 
              Built for Vue 3 with TypeScript, designed for production applications.
            </p>
          </Motion>

          <Motion
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.8 }"
          >
            <div class="hero-actions">
              <BorderBeam :size="300" :duration="8" color-from="#3b82f6" color-to="#8b5cf6">
                <MagicButton variant="gradient" size="lg" @click="$router.push('/components')" class="primary-button">
                  <span>🚀 Explore Components</span>
                </MagicButton>
              </BorderBeam>
              <ShimmerButton variant="outline" size="lg" @click="openGithub" class="secondary-button">
                <span>⭐ GitHub</span>
              </ShimmerButton>
            </div>
          </Motion>

          <Motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 1, delay: 1 }"
          >
            <div class="hero-stats">
              <div class="stat-item">
                <CountUp :end="30" :duration="2" />
                <span>Components</span>
              </div>
              <div class="stat-item">
                <CountUp :end="95" :duration="2.5" />
                <span>% TypeScript</span>
              </div>
              <div class="stat-item">
                <CountUp :end="5" :duration="1.5" />
                <span>KB Gzipped</span>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8 }"
        >
          <div class="section-header">
            <h2 class="section-title">
              <GradientText>What's New in 2.0</GradientText>
            </h2>
            <p class="section-subtitle">
              Breakthrough features that set Vue Magic UI apart from other animation libraries
            </p>
          </div>
        </Motion>

        <div class="features-grid">
          <Motion
            v-for="(feature, index) in modernFeatures"
            :key="feature.title"
            :initial="{ opacity: 0, y: 40, scale: 0.95 }"
            :animate="{ opacity: 1, y: 0, scale: 1 }"
            :transition="{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }"
          >
            <div class="feature-card">
              <div class="feature-card-content">
                <div class="feature-icon" v-html="feature.icon"></div>
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p class="feature-description">{{ feature.description }}</p>
                <div class="feature-demo">
                  <ProgressCircle 
                    v-if="feature.title === 'Spring Physics'"
                    :value="progressValue" 
                    :size="80" 
                    color="#3b82f6" 
                    :glow-effect="true" 
                  />
                  <LoadingDots 
                    v-else-if="feature.title === 'Gesture Recognition'"
                    variant="wave" 
                    color="#8b5cf6" 
                    :size="8" 
                    :dot-count="5" 
                  />
                  <Spotlight 
                    v-else-if="feature.title === 'TypeScript Support'"
                    color="#ec4899" 
                    :size="120"
                    :intensity="0.3"
                  >
                    <div class="spotlight-demo">TS</div>
                  </Spotlight>
                  <div v-else class="performance-demo">
                    <div class="performance-bar">
                      <div class="performance-fill" :style="{ width: '94%' }"></div>
                    </div>
                    <span>94% faster</span>
                  </div>
                </div>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </section>

    <!-- Interactive Demo Section -->
    <section class="demo-section">
      <div class="container">
        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8 }"
        >
          <h2 class="section-title dark">
            <SparkleText :auto-sparkle="true">Interactive Components</SparkleText>
          </h2>
        </Motion>

        <div class="demo-grid">
          <CardHoverEffect variant="gradient" class="demo-card">
            <div class="demo-content">
              <h3>CardHoverEffect</h3>
              <p>Modern card with stunning hover animations</p>
              <ProgressCircle :value="85" :size="60" color="#3b82f6" :glow-effect="true" />
            </div>
          </CardHoverEffect>

          <CardHoverEffect variant="neon" class="demo-card">
            <div class="demo-content">
              <h3>Loading States</h3>
              <p>Beautiful loading animations</p>
              <LoadingDots variant="bounce" color="#00d4ff" :size="10" />
            </div>
          </CardHoverEffect>

          <CardHoverEffect variant="glass" class="demo-card">
            <div class="demo-content">
              <h3>Skeleton Loaders</h3>
              <p>Smooth content placeholders</p>
              <SkeletonLoader variant="text" :lines="2" :animated="true" />
            </div>
          </CardHoverEffect>

          <CardHoverEffect variant="default" class="demo-card">
            <div class="demo-content">
              <h3>Progress Indicators</h3>
              <p>Animated progress tracking</p>
              <ProgressCircle :value="progressValue" :size="70" color="#8b5cf6" :animated="true" />
            </div>
          </CardHoverEffect>
        </div>
      </div>
    </section>

    <!-- Performance Stats -->
    <section class="stats-section">
      <RetroGrid :size="80" color="#3b82f6" :opacity="0.2">
        <div class="container">
          <div class="stats-content">
            <Motion
              :initial="{ opacity: 0, y: 30 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8 }"
            >
              <h2 class="stats-title">Performance Benchmarks</h2>
              <p class="stats-subtitle">Vue Magic UI 2.0 vs Leading React Libraries</p>
            </Motion>

            <div class="stats-grid">
              <Motion
                v-for="(stat, index) in performanceStats"
                :key="stat.label"
                :initial="{ opacity: 0, scale: 0.8 }"
                :animate="{ opacity: 1, scale: 1 }"
                :transition="{ duration: 0.6, delay: index * 0.1 }"
              >
                <div class="stat-card-modern">
                  <ProgressCircle 
                    :value="stat.value" 
                    :size="80" 
                    :color="stat.color"
                    :glow-effect="true"
                    suffix="%"
                  />
                  <h3>{{ stat.label }}</h3>
                  <p>{{ stat.description }}</p>
                </div>
              </Motion>
            </div>
          </div>
        </div>
      </RetroGrid>
    </section>

    <!-- Component Gallery -->
    <section class="gallery-section">
      <div class="container">
        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8 }"
        >
          <h2 class="section-title">
            <TextReveal text="Component Gallery" />
          </h2>
          <p class="section-subtitle">
            Explore our comprehensive collection of modern Vue components
          </p>
        </Motion>

        <div class="gallery-grid">
          <FloatingCard class="gallery-item">
            <SparkleText :auto-sparkle="true">✨ Text Effects</SparkleText>
          </FloatingCard>
          
          <GlowCard class="gallery-item">
            <div class="gallery-demo">
              <NumberTicker :value="2024" />
              <p>Number Animations</p>
            </div>
          </GlowCard>
          
          <div class="gallery-item orbit-demo">
            <OrbitingCircles 
              :items="['🚀', '⚡', '🌟', '💫', '🔥']"
              :radius="60"
              :duration="20"
            >
              <div class="orbit-center">Vue Magic</div>
            </OrbitingCircles>
          </div>

          <BorderBeam :size="200" :duration="5" class="gallery-item beam-demo">
            <Meteors :number="15">
              <div class="meteor-content">
                <h3>Background Effects</h3>
              </div>
            </Meteors>
          </BorderBeam>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="container">
        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8 }"
        >
          <div class="cta-content">
            <h2 class="cta-title">
              <SparkleText :auto-sparkle="true">
                Ready to Build Amazing UIs?
              </SparkleText>
            </h2>
            <p class="cta-subtitle">
              Join developers worldwide using Vue Magic UI to create stunning, performant applications
            </p>
            <div class="cta-buttons">
              <BorderBeam :size="320" :duration="8">
                <MagicButton variant="gradient" size="lg" @click="$router.push('/components')">
                  🚀 Start Building Now
                </MagicButton>
              </BorderBeam>
              <ShimmerButton variant="outline" size="lg" @click="openDocs">
                📚 Read Documentation
              </ShimmerButton>
            </div>
          </div>
        </Motion>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  SparkleText,
  MagicButton,
  ShimmerButton,
  GradientText,
  TextReveal,
  FloatingCard,
  GlowCard,
  NumberTicker,
  OrbitingCircles,
  BorderBeam,
  Meteors,
  Motion,
  TypewriterText,
  Aurora,
  GridPattern,
  RetroGrid,
  Spotlight,
  CardHoverEffect,
  ProgressCircle,
  LoadingDots,
  SkeletonLoader
} from '../index'

// Reactive data
const progressValue = ref(0)

// Mock data for features
const modernFeatures = ref([
  {
    title: 'Spring Physics',
    description: 'Realistic spring animations with configurable tension, friction, and mass',
    icon: '🚀',
    color: '#3b82f6'
  },
  {
    title: 'Gesture Recognition',
    description: 'Multi-touch drag support with velocity tracking and bounds constraints',
    icon: '👆',
    color: '#8b5cf6'
  },
  {
    title: 'Performance Optimization',
    description: 'Reduced motion support, device capability detection, and smart degradation',
    icon: '⚡',
    color: '#ec4899'
  },
  {
    title: 'Modern Architecture',
    description: 'Vue 3 Composition API with 100% TypeScript coverage and tree-shaking',
    icon: '🎯',
    color: '#f59e0b'
  }
])

const performanceStats = ref([
  {
    label: 'Bundle Size Reduction',
    description: 'Compared to React alternatives',
    value: 60,
    color: '#10b981'
  },
  {
    label: 'Performance Improvement',
    description: 'Animation smoothness increase',
    value: 90,
    color: '#3b82f6'
  },
  {
    label: 'TypeScript Coverage',
    description: 'Complete type safety',
    value: 100,
    color: '#8b5cf6'
  },
  {
    label: 'React Parity',
    description: 'Feature compatibility achieved',
    value: 95,
    color: '#f59e0b'
  }
])

// Methods
const openGithub = () => {
  window.open('https://github.com/yousefkadah/vue-animation-libarary', '_blank')
}

const openDocs = () => {
  window.open('https://yousefkadah.github.io/vue-animation-libarary/', '_blank')
}

// Lifecycle
onMounted(() => {
  // Animate progress value for demo
  setTimeout(() => {
    progressValue.value = 78
  }, 1000)
})
</script>

<style scoped>
/* Global Styles */
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%);
  color: #1e293b;
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 0;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: 900px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 2rem;
  line-height: 1.1;
  position: relative;
}

.version-badge {
  display: inline-block;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  font-size: 0.4em;
  padding: 0.5em 0.8em;
  border-radius: 1rem;
  margin-left: 0.5rem;
  vertical-align: top;
  transform: translateY(0.2em);
}

.hero-typewriter {
  min-height: 120px;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: #6366f1;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  color: #64748b;
  margin-bottom: 3rem;
  line-height: 1.7;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 4rem;
}

.primary-button {
  transform: scale(1.05);
}

.secondary-button {
  opacity: 0.9;
}

.hero-stats {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-item span:first-child {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: #3b82f6;
  line-height: 1;
}

.stat-item span:last-child {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Features Section */
.features {
  padding: 8rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 5rem;
}

.section-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.section-title.light {
  color: white;
}

.section-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: #64748b;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.section-subtitle.light {
  color: rgba(255, 255, 255, 0.8);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
}

.feature-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%);
  border-radius: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
}

.feature-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
  border-color: rgba(59, 130, 246, 0.3);
}

.feature-card-content {
  padding: 3rem 2.5rem;
  text-align: center;
}

.feature-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
}

.feature-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.feature-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  border-radius: 1rem;
  background: rgba(248, 250, 252, 0.5);
  padding: 1.5rem;
}

.spotlight-demo {
  background: linear-gradient(135deg, #ec4899, #f97316);
  color: white;
  font-size: 2rem;
  font-weight: 800;
  padding: 1rem;
  border-radius: 1rem;
  min-width: 60px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.performance-demo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 200px;
}

.performance-bar {
  height: 8px;
  background: rgba(203, 213, 225, 0.5);
  border-radius: 4px;
  overflow: hidden;
}

.performance-fill {
  height: 100%;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 4px;
  transition: width 2s ease-out;
}

.performance-demo span {
  font-size: 0.875rem;
  font-weight: 600;
  color: #059669;
  text-align: center;
}

/* Demo Section */
.demo {
  padding: 8rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.demo-card {
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  min-height: 280px;
}

.demo-card:hover {
  transform: translateY(-8px) scale(1.02);
}

.demo-content {
  padding: 2.5rem;
  text-align: center;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.demo-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.demo-content p {
  opacity: 0.8;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .container {
    padding: 0 1.5rem;
  }
  
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
  
  .demo-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 6rem 0 4rem;
  }
  
  .hero-stats {
    gap: 2rem;
    padding: 1.5rem;
  }
  
  .hero-actions {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .features,
  .demo {
    padding: 5rem 0;
  }
  
  .section-header {
    margin-bottom: 3rem;
  }
  
  .features-grid,
  .demo-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card-content {
    padding: 2rem 1.5rem;
  }
  
  .demo-content {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 4rem 0 3rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .features,
  .demo {
    padding: 4rem 0;
  }
  
  .feature-card-content,
  .demo-content {
    padding: 1.5rem;
  }
}

/* Animation Preferences */
@media (prefers-reduced-motion: no-preference) {
  .feature-card,
  .demo-card {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-card,
  .demo-card {
    transition: none;
  }
  
  .feature-card:hover,
  .demo-card:hover {
    transform: none;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .home {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #f8fafc;
  }
  
  .features {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  }
  
  .feature-card {
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%);
    border-color: rgba(71, 85, 105, 0.5);
  }
  
  .feature-title {
    color: #f8fafc;
  }
  
  .feature-description {
    color: #cbd5e1;
  }
  
  .hero-subtitle {
    color: #cbd5e1;
  }
}
.home {
  min-height: 100vh;
  background: #ffffff;
  color: #09090b;
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  position: relative;
  padding: 10rem 0 6rem;
  text-align: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  margin-bottom: 2rem;
  line-height: 1.1;
}

.hero-typewriter {
  min-height: 80px;
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: #6366f1;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.25rem);
  color: #71717a;
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}

/* Features Showcase */
.features-showcase {
  padding: 8rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.section-title {
  text-align: center;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 4rem;
  line-height: 1.2;
}

.section-title.dark {
  color: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card-modern {
  padding: 2.5rem;
  text-align: center;
  height: 100%;
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.feature-card-modern h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.feature-card-modern p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.feature-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
}

/* Interactive Demo Section */
.demo-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-card {
  height: 250px;
}

.demo-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
}

.demo-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.demo-content p {
  font-size: 0.875rem;
  opacity: 0.8;
  margin: 0;
}

/* Performance Stats Section */
.stats-section {
  padding: 8rem 0;
  position: relative;
}

.stats-content {
  text-align: center;
  color: white;
}

.stats-title {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.stats-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 4rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.stat-card-modern {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card-modern:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.15);
}

.stat-card-modern h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem;
}

.stat-card-modern p {
  font-size: 0.875rem;
  opacity: 0.8;
  margin: 0;
}

/* Gallery Section */
.gallery-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.section-subtitle {
  text-align: center;
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.gallery-item {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 16px;
  background: white;
  transition: all 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-4px);
}

.gallery-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.gallery-demo p {
  margin: 0;
  color: #64748b;
  font-weight: 500;
}

.orbit-demo {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.orbit-center {
  font-size: 1.125rem;
  font-weight: 600;
}

.beam-demo {
  background: #0f172a;
  color: white;
  position: relative;
  overflow: hidden;
}

.meteor-content {
  padding: 2rem;
}

.meteor-content h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

/* Call to Action Section */
.cta-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 2rem;
}

.cta-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.cta-subtitle {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  line-height: 1.6;
  opacity: 0.95;
}

.cta-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .container {
    padding: 0 1.5rem;
  }
  
  .features-grid,
  .demo-grid,
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 6rem 0 4rem;
    min-height: auto;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
  
  .hero-title {
    margin-bottom: 1.5rem;
  }
  
  .hero-typewriter {
    min-height: 60px;
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    margin-bottom: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .features-showcase,
  .demo-section,
  .stats-section,
  .gallery-section,
  .cta-section {
    padding: 4rem 0;
  }
  
  .section-title {
    margin-bottom: 3rem;
  }
  
  .features-grid,
  .demo-grid,
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card-modern {
    padding: 2rem;
  }
  
  .demo-card {
    height: 200px;
  }
  
  .gallery-item {
    min-height: 150px;
  }
  
  .cta-buttons {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 4rem 0 3rem;
  }
  
  .hero-title {
    margin-bottom: 1rem;
  }
  
  .hero-typewriter {
    min-height: 50px;
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    margin-bottom: 1.5rem;
  }
  
  .features-showcase,
  .demo-section,
  .stats-section,
  .gallery-section,
  .cta-section {
    padding: 3rem 0;
  }
  
  .section-title {
    margin-bottom: 2rem;
  }
  
  .feature-card-modern {
    padding: 1.5rem;
  }
  
  .demo-card {
    height: 180px;
  }
  
  .container {
    padding: 0 1rem;
  }
}

/* Animation enhancements */
@media (prefers-reduced-motion: no-preference) {
  .feature-card-modern,
  .gallery-item,
  .stat-card-modern {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .feature-card-modern:hover,
  .gallery-item:hover {
    transform: translateY(-8px) scale(1.02);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .home {
    background: #0f172a;
    color: #f8fafc;
  }
  
  .features-showcase {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  }
  
  .gallery-section {
    background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  }
  
  .gallery-item {
    background: #1e293b;
    border: 1px solid #334155;
  }
}
</style>
