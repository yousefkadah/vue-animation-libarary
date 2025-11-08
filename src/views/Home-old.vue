<template>
  <div class="home">
    <!-- Hero Section with Background Effects -->
    <section class="hero">
      <div class="hero-background">
        <GridPattern />
        <Aurora />
      </div>
      <div class="hero-content">
        <FadeIn :delay="100">
          <h1 class="hero-title">
            <SparkleText :auto-sparkle="true" :sparkle-interval="1500">
              Vue Magic UI
            </SparkleText>
          </h1>
        </FadeIn>
        <FadeIn :delay="300">
          <p class="hero-subtitle">
            <TypewriterText 
              :text="['50+ free and open-source animated components', 'Built with Vue 3, TypeScript, and Tailwind CSS', 'Copy, paste, and customize with ease']"
              :loop="true"
              :speed="50"
            />
          </p>
        </FadeIn>
        <FadeIn :delay="500">
          <div class="hero-buttons">
            <MagicButton variant="gradient" @click="$router.push('/components')">
              <span>Browse Components</span>
              <span class="ml-2">→</span>
            </MagicButton>
            <ShimmerButton variant="outline" @click="openGithub">
              <span>GitHub</span>
              <span class="ml-2">⭐</span>
            </ShimmerButton>
          </div>
        </FadeIn>
      </div>
    </section>

    <!-- Demo Section -->
    <section class="demo">
      <div class="container">
        <FadeIn :delay="200">
          <h2 class="demo-title">
            <GradientText>See it in action</GradientText>
          </h2>
        </FadeIn>
        <div class="demo-grid">
          <GlowCard class="demo-card">
            <div class="demo-preview">
              <SparkleText :auto-sparkle="true" :sparkle-interval="2000">
                Magic UI Components
              </SparkleText>
            </div>
            <div class="demo-code">
              <pre><code>&lt;SparkleText :auto-sparkle="true"&gt;
  Magic UI Components
&lt;/SparkleText&gt;</code></pre>
            </div>
          </GlowCard>
          
          <GlowCard class="demo-card">
            <div class="demo-preview">
              <CountUp :end="1000" :duration="3000" prefix="$" />
            </div>
            <div class="demo-code">
              <pre><code>&lt;CountUp :end="1000" :duration="3000" prefix="$" /&gt;</code></pre>
            </div>
          </GlowCard>
          
          <GlowCard class="demo-card">
            <div class="demo-preview">
              <NumberTicker :value="42" suffix="+" />
            </div>
            <div class="demo-code">
              <pre><code>&lt;NumberTicker :value="42" suffix="+" /&gt;</code></pre>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <FadeIn :delay="100">
          <h2 class="features-title">
            <TextReveal text="Why Vue Magic UI?" />
          </h2>
        </FadeIn>
        <div class="features-grid">
          <FloatingCard class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Copy and Paste</h3>
            <p>Components are built to be copied and pasted into your apps. No package dependencies.</p>
          </FloatingCard>
          <FloatingCard class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>Customizable</h3>
            <p>Built with Vue 3 and TypeScript. Customize colors, animations, and behavior.</p>
          </FloatingCard>
          <FloatingCard class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>Open Source</h3>
            <p>Free to use for personal and commercial projects. MIT licensed.</p>
          </FloatingCard>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <CountUp :end="50" :duration="2000" suffix="+" class="stat-number" />
            <p class="stat-label">Components</p>
          </div>
          <div class="stat-card">
            <CountUp :end="1000" :duration="2000" suffix="+" class="stat-number" />
            <p class="stat-label">Downloads</p>
          </div>
          <div class="stat-card">
            <CountUp :end="5" :duration="2000" class="stat-number" />
            <p class="stat-label">Stars</p>
          </div>
          <div class="stat-card">
            <CountUp :end="100" :duration="2000" suffix="%" class="stat-number" />
            <p class="stat-label">Free</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <FadeIn :delay="200">
            <h2 class="cta-title">
              <SparkleText :auto-sparkle="true">
                Ready to get started?
              </SparkleText>
            </h2>
          </FadeIn>
          <FadeIn :delay="400">
            <p class="cta-subtitle">
              Start building beautiful UIs with Vue Magic UI components.
            </p>
          </FadeIn>
          <FadeIn :delay="600">
            <div class="cta-buttons">
              <MagicButton variant="gradient" size="lg" @click="$router.push('/components')">
                Get Started
              </MagicButton>
              <ShimmerButton variant="outline" size="lg" @click="openGithub">
                View on GitHub
              </ShimmerButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  SparkleText,
  MagicButton,
  ShimmerButton,
  FadeIn,
  TypewriterText,
  GradientText,
  GlowCard,
  CountUp,
  NumberTicker,
  TextReveal,
  FloatingCard,
  GridPattern,
  Aurora
} from '../index'

const openGithub = () => {
  window.open('https://github.com/your-username/vue-magic-ui', '_blank')
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #ffffff;
  color: #09090b;
}

/* Hero Section */
.hero {
  position: relative;
  padding: 8rem 0 4rem;
  text-align: center;
  background: linear-gradient(to bottom, #ffffff, #f8fafc);
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0.6;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: #71717a;
  margin-bottom: 2rem;
  line-height: 1.6;
  min-height: 60px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-buttons .ml-2 {
  margin-left: 0.5rem;
}

/* Demo Section */
.demo {
  padding: 4rem 0;
  background: #fafafa;
}

.demo-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.demo-preview {
  padding: 2rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.demo-code {
  background: #0f0f23;
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  overflow-x: auto;
}

.demo-code pre {
  margin: 0;
  color: #fafafa;
}

/* Features Section */
.features {
  padding: 4rem 0;
  background: #ffffff;
}

.features-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e4e4e7;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #09090b;
}

.feature-card p {
  color: #71717a;
  line-height: 1.6;
}

/* Stats Section */
.stats {
  padding: 4rem 0;
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  display: block;
}

.stat-label {
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 0;
}

/* CTA Section */
.cta {
  padding: 4rem 0;
  background: #f8fafc;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.25rem;
  color: #71717a;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: 4rem 0 2rem;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .demo-title,
  .features-title,
  .cta-title {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: #09090b;
  background: linear-gradient(to right, #09090b, #71717a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  font-weight: 400;
  color: #71717a;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Demo Section */
.demo {
  padding: 4rem 0;
  background: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.demo-card {
  background: white;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.demo-preview {
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border-bottom: 1px solid #e4e4e7;
}

.demo-code {
  padding: 1.5rem;
  background: #09090b;
  color: #fafafa;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  overflow-x: auto;
}

.demo-code pre {
  margin: 0;
}

.demo-code code {
  color: #fafafa;
}

/* Features Section */
.features {
  padding: 6rem 0;
  background: white;
}

.features-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 4rem;
  color: #09090b;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  padding: 2rem;
  text-align: center;
  background: white;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.feature-card:hover {
  border-color: #d4d4d8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #09090b;
}

.feature-card p {
  font-size: 1rem;
  line-height: 1.6;
  color: #71717a;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: 4rem 0 2rem;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .demo-preview {
    padding: 2rem 1rem;
  }
}

/* Typography */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
