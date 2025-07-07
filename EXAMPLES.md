# Vue Magic UI Examples

## Basic Usage Examples

### 1. Text Animations

```vue
<template>
  <div>
    <!-- Sparkle Text -->
    <SparkleText 
      :auto-sparkle="true"
      :sparkle-interval="3000"
      :sparkle-colors="['#ffd700', '#ff6b6b', '#4ecdc4']"
    >
      ✨ Magical Text ✨
    </SparkleText>
    
    <!-- Typewriter Effect -->
    <TypewriterText 
      :text="['Welcome to our website', 'We create amazing experiences', 'Join us today!']"
      :loop="true"
      :speed="80"
      :pause-time="2000"
    />
    
    <!-- Gradient Text -->
    <GradientText 
      :colors="['#42b883', '#369870', '#2a9d8f']"
      :animated="true"
      :animation-duration="4"
    >
      Gradient Animation
    </GradientText>
  </div>
</template>
```

### 2. Interactive Components

```vue
<template>
  <div>
    <!-- Magic Button -->
    <MagicButton 
      variant="gradient"
      :ripple-effect="true"
      @click="handleMagicClick"
    >
      🚀 Launch Magic
    </MagicButton>
    
    <!-- Floating Card -->
    <FloatingCard 
      :glow-color="'#42b883'"
      :float-intensity="20"
      :rotate-intensity="10"
    >
      <div class="card-content">
        <h3>Floating Card</h3>
        <p>This card floats and glows on hover</p>
        <button @click="cardAction">Action</button>
      </div>
    </FloatingCard>
    
    <!-- Particle Effect -->
    <ParticleEffect 
      :width="600"
      :height="400"
      :particle-count="60"
      :colors="['#ff6b6b', '#4ecdc4', '#45b7d1', '#f093fb']"
      :interactive="true"
    >
      <div class="hero-content">
        <h1>Welcome to the Future</h1>
        <p>Interactive particle effects</p>
      </div>
    </ParticleEffect>
  </div>
</template>

<script setup lang="ts">
const handleMagicClick = () => {
  console.log('Magic button clicked!')
}

const cardAction = () => {
  console.log('Card action triggered!')
}
</script>
```

### 3. Entrance Animations

```vue
<template>
  <div>
    <!-- Fade In -->
    <FadeIn :delay="0" :duration="800">
      <div class="hero-section">
        <h1>Welcome</h1>
      </div>
    </FadeIn>
    
    <!-- Slide In -->
    <SlideIn direction="left" :delay="300" :duration="600">
      <div class="feature-card">
        <h3>Feature 1</h3>
        <p>Description of the feature</p>
      </div>
    </SlideIn>
    
    <SlideIn direction="right" :delay="600" :duration="600">
      <div class="feature-card">
        <h3>Feature 2</h3>
        <p>Description of the feature</p>
      </div>
    </SlideIn>
  </div>
</template>
```

### 4. Loading States

```vue
<template>
  <div>
    <!-- Pulse Loader -->
    <div class="loading-section">
      <PulseLoader 
        :size="80"
        color="#42b883"
        :duration="1.4"
      />
      <p>Loading content...</p>
    </div>
    
    <!-- Wave Loader -->
    <div class="loading-section">
      <WaveLoader 
        :size="60"
        color="#369870"
        :duration="1.2"
      />
      <p>Processing...</p>
    </div>
  </div>
</template>
```

### 5. Advanced Animations

```vue
<template>
  <div>
    <!-- Count Up Animation -->
    <div class="stats-section">
      <div class="stat-item">
        <CountUp 
          :end-value="1234567"
          :duration="3000"
          separator=","
          prefix="$"
        />
        <p>Total Sales</p>
      </div>
      
      <div class="stat-item">
        <CountUp 
          :end-value="45678"
          :duration="2500"
          separator=","
        />
        <p>Happy Customers</p>
      </div>
    </div>
    
    <!-- Text Reveal -->
    <TextReveal 
      text="This text reveals character by character as you scroll"
      :stagger="0.03"
      :threshold="0.8"
    />
    
    <!-- Morphing Shape -->
    <MorphingShape 
      :size="150"
      color="#42b883"
      :duration="3"
      :shapes="[
        'M50,10 L90,50 L50,90 L10,50 Z',
        'M50,5 C80,5 95,20 95,50 C95,80 80,95 50,95 C20,95 5,80 5,50 C5,20 20,5 50,5 Z',
        'M10,10 L90,10 L90,90 L10,90 Z'
      ]"
    />
  </div>
</template>
```

### 6. Complete Example - Landing Page

```vue
<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <ParticleEffect 
        :width="1200"
        :height="600"
        :particle-count="50"
        :colors="['#42b883', '#369870']"
        :interactive="true"
      >
        <div class="hero-content">
          <FadeIn :delay="0">
            <h1>
              <SparkleText :auto-sparkle="true">
                Welcome to the Future
              </SparkleText>
            </h1>
          </FadeIn>
          
          <FadeIn :delay="300">
            <p>
              <TypewriterText 
                :text="['Innovation starts here', 'Build amazing experiences', 'Join the revolution']"
                :loop="true"
                :speed="60"
              />
            </p>
          </FadeIn>
          
          <FadeIn :delay="600">
            <MagicButton variant="gradient" @click="ctaClick">
              Get Started Today
            </MagicButton>
          </FadeIn>
        </div>
      </ParticleEffect>
    </section>
    
    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <FadeIn :delay="0">
          <h2>
            <GradientText :colors="['#42b883', '#369870']">
              Amazing Features
            </GradientText>
          </h2>
        </FadeIn>
        
        <div class="features-grid">
          <SlideIn 
            v-for="(feature, index) in features" 
            :key="index"
            :direction="index % 2 === 0 ? 'left' : 'right'"
            :delay="index * 200"
          >
            <FloatingCard 
              :glow-color="feature.color"
              :float-intensity="15"
            >
              <div class="feature-card">
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </FloatingCard>
          </SlideIn>
        </div>
      </div>
    </section>
    
    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <CountUp 
              :end-value="1000000"
              :duration="3000"
              separator=","
              suffix="+"
            />
            <p>Users Worldwide</p>
          </div>
          
          <div class="stat-item">
            <CountUp 
              :end-value="99.9"
              :duration="2500"
              :decimals="1"
              suffix="%"
            />
            <p>Uptime</p>
          </div>
          
          <div class="stat-item">
            <CountUp 
              :end-value="24"
              :duration="2000"
              suffix="/7"
            />
            <p>Support</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Fast Performance',
    description: 'Optimized for speed and efficiency',
    color: '#42b883'
  },
  {
    title: 'Easy to Use',
    description: 'Simple and intuitive interface',
    color: '#369870'
  },
  {
    title: 'Secure',
    description: 'Enterprise-grade security',
    color: '#f093fb'
  },
  {
    title: 'Scalable',
    description: 'Grows with your business',
    color: '#4ecdc4'
  }
]

const ctaClick = () => {
  console.log('CTA clicked!')
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 2rem;
  font-weight: 700;
}

.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  height: 60px;
}

.features {
  padding: 100px 0;
  background: #f8f9fa;
}

.features h2 {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  text-align: center;
  padding: 30px;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.stats {
  padding: 100px 0;
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  text-align: center;
}

.stat-item {
  font-size: 2rem;
  font-weight: 700;
}

.stat-item p {
  font-size: 1rem;
  margin-top: 10px;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
```

## Tips for Best Results

1. **Performance**: Use `triggerOnce="true"` for entrance animations to prevent re-triggering
2. **Accessibility**: Consider users with motion sensitivity - provide options to disable animations
3. **Mobile**: Test animations on mobile devices for optimal performance
4. **Timing**: Stagger animations with delays for better visual flow
5. **Colors**: Use your brand colors by customizing the color props
6. **Loading States**: Always provide feedback during async operations with loaders
