<template>
  <div class="app">
    <!-- Navigation Header -->
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">
          <SparkleText :auto-sparkle="true" :sparkle-interval="4000">
            Vue Magic UI
          </SparkleText>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/components" class="nav-link">Components</router-link>
          <MagicButton 
            variant="outline" 
            @click="openGithub"
            class="nav-button"
          >
            GitHub
          </MagicButton>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { SparkleText, MagicButton } from './index'

const openGithub = () => {
  window.open('https://github.com/yousefkadah/vue-animation-libarary', '_blank')
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #ffffff;
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #e4e4e7;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #09090b;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-logo:hover {
  color: #3b82f6;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #71717a;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.nav-link:hover {
  color: #09090b;
  background: #f4f4f5;
}

.nav-link.router-link-active {
  color: #3b82f6;
  background: #eff6ff;
}

.nav-button {
  font-size: 0.9rem;
}

/* Add padding to account for fixed navbar */
:deep(.home),
:deep(.components-page) {
  padding-top: 64px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.3rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
