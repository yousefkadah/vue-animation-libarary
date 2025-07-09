<template>
  <div class="app">
    <!-- Navigation Header -->
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">
          <span class="logo-text">Vue Magic UI</span>
        </router-link>
        
        <!-- Mobile Menu Button -->
        <button 
          class="mobile-menu-btn"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :class="{ active: isMobileMenuOpen }"
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <!-- Navigation Links -->
        <div class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen }">
          <router-link to="/" class="nav-link" @click="closeMobileMenu">Home</router-link>
          <router-link to="/components" class="nav-link" @click="closeMobileMenu">Components</router-link>
          <MagicButton 
            variant="outline" 
            @click="openGithub"
            class="nav-button"
          >
            GitHub
          </MagicButton>
        </div>
        
        <!-- Mobile Menu Overlay -->
        <div 
          v-if="isMobileMenuOpen"
          class="mobile-overlay"
          @click="closeMobileMenu"
        ></div>
      </div>
    </nav>

    <!-- Main Content -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MagicButton } from './index'

const isMobileMenuOpen = ref(false)

const openGithub = () => {
  window.open('https://github.com/yousefkadah/vue-animation-libarary', '_blank')
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu when clicking outside or on route change
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      isMobileMenuOpen.value = false
    }
  })
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
  position: relative;
  min-width: 0; /* Allow flex shrinking */
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #09090b;
  text-decoration: none;
  transition: all 0.2s ease;
  z-index: 1001;
  white-space: nowrap;
  overflow: hidden;
  flex-shrink: 0;
}

.logo-text {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.nav-logo:hover {
  transform: scale(1.05);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;
}

.mobile-menu-btn span {
  width: 20px;
  height: 2px;
  background: #09090b;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.mobile-menu-btn span:nth-child(1) {
  margin-bottom: 4px;
}

.mobile-menu-btn span:nth-child(2) {
  margin-bottom: 4px;
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Navigation Links */
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

/* Mobile Overlay */
.mobile-overlay {
  display: none;
}

/* Add padding to account for fixed navbar */
:deep(.home),
:deep(.components-page) {
  padding-top: 64px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .nav-container {
    padding: 0 1.5rem;
  }
  
  .nav-links {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
    height: 56px;
  }
  
  .nav-logo {
    font-size: 1.25rem;
    max-width: calc(100vw - 120px);
  }
  
  .logo-text {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .mobile-menu-btn {
    display: flex;
    flex-shrink: 0;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 280px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    border-left: 1px solid #e4e4e7;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 5rem 2rem 2rem;
    gap: 0;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  }
  
  .nav-links.mobile-open {
    transform: translateX(0);
  }
  
  .nav-link {
    padding: 1rem 1.5rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    text-align: left;
    border: 1px solid transparent;
  }
  
  .nav-link:hover {
    background: #f8fafc;
    border-color: #e2e8f0;
  }
  
  .nav-link.router-link-active {
    background: #eff6ff;
    border-color: #bfdbfe;
    color: #1d4ed8;
  }
  
  .nav-button {
    margin-top: 1rem;
    width: 100%;
    justify-content: center;
  }
  
  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.75rem;
    height: 56px;
  }
  
  .nav-logo {
    font-size: 1.1rem;
    max-width: calc(100vw - 100px);
  }
  
  .logo-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .nav-links {
    width: 100%;
    padding: 4rem 1.5rem 2rem;
  }
  
  .nav-link {
    padding: 0.875rem 1.25rem;
    font-size: 0.95rem;
  }
  
  :deep(.home),
  :deep(.components-page) {
    padding-top: 56px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .mobile-menu-btn span,
  .nav-links,
  .nav-link {
    transition: none;
  }
}

/* Dark mode support (future enhancement) */
@media (prefers-color-scheme: dark) {
  .navbar {
    background: rgba(9, 9, 11, 0.95);
    border-bottom-color: #27272a;
  }
  
  .nav-logo {
    color: #fafafa;
  }
  
  .nav-logo:hover {
    color: #60a5fa;
  }
  
  .nav-link {
    color: #a1a1aa;
  }
  
  .nav-link:hover {
    color: #fafafa;
    background: #27272a;
  }
  
  .nav-link.router-link-active {
    color: #60a5fa;
    background: #1e293b;
  }
  
  .mobile-menu-btn span {
    background: #fafafa;
  }
  
  @media (max-width: 768px) {
    .nav-links {
      background: rgba(9, 9, 11, 0.98);
      border-left-color: #27272a;
    }
    
    .nav-link:hover {
      background: #18181b;
      border-color: #3f3f46;
    }
    
    .nav-link.router-link-active {
      background: #1e293b;
      border-color: #334155;
      color: #60a5fa;
    }
  }
}
</style>
