import { createRouter, createWebHistory } from 'vue-router'
import { site } from './docs/site'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('./docs/pages/HomePage.vue') },
    {
      path: '/docs',
      component: () => import('./docs/pages/DocsLayout.vue'),
      children: [
        { path: '', component: () => import('./docs/pages/IntroductionPage.vue'), meta: { title: 'Introduction' } },
        { path: 'installation', component: () => import('./docs/pages/InstallationPage.vue'), meta: { title: 'Installation' } },
        { path: 'components', component: () => import('./docs/pages/ComponentsIndexPage.vue'), meta: { title: 'Components' } },
        { path: 'components/:slug', component: () => import('./docs/pages/ComponentPage.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', component: () => import('./docs/pages/NotFoundPage.vue') },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    if (to.path !== from.path) return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  if (title) document.title = `${title} — ${site.name}`
  else if (to.path === '/') document.title = `${site.name} — Animated components for ${site.framework}`
})
