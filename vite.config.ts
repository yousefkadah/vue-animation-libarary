/// <reference types="vitest/config" />
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json' with { type: 'json' }

const srcDir = fileURLToPath(new URL('./src', import.meta.url))

/**
 * Examples import components the way a user's project would (`@/components/ui/<slug>`),
 * so their source can be copied verbatim. Here that path points at the registry.
 */
const alias = [
  { find: /^@\/components\/ui\//, replacement: `${srcDir}/registry/ui/` },
  { find: /^@\//, replacement: `${srcDir}/` },
]

/** Ships the generated keyframes/animation theme next to the library bundle. */
function copyTheme(): Plugin {
  return {
    name: 'copy-theme-css',
    closeBundle() {
      mkdirSync('dist', { recursive: true })
      copyFileSync('src/styles/theme.generated.css', 'dist/theme.css')
    },
  }
}

/**
 * GitHub Pages has no SPA fallback. Copy the shell to every known route so deep links
 * return 200 (not the 404.html fallback), and keep 404.html for anything else.
 */
function staticRoutes(): Plugin {
  return {
    name: 'static-route-shells',
    apply: 'build',
    closeBundle() {
      const slugs = readdirSync('src/registry/ui', { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
      const routes = ['docs', 'docs/installation', 'docs/components', ...slugs.map((slug) => `docs/components/${slug}`)]
      for (const route of routes) {
        mkdirSync(`dist-site/${route}`, { recursive: true })
        copyFileSync('dist-site/index.html', `dist-site/${route}/index.html`)
      }
      copyFileSync('dist-site/index.html', 'dist-site/404.html')
    },
  }
}

export default defineConfig(({ mode, command }) => {
  if (mode === 'lib') {
    return {
      resolve: { alias },
      plugins: [
        vue(),
        dts({
          tsconfigPath: './tsconfig.lib.json',
          entryRoot: 'src',
          include: ['src/index.ts', 'src/lib/**/*.ts', 'src/registry/ui/**/*'],
          rollupTypes: false,
        }),
        copyTheme(),
      ],
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true,
        lib: {
          entry: { index: 'src/index.ts' },
          formats: ['es'],
          fileName: (_format, name) => `${name}.js`,
        },
        rollupOptions: {
          external: [
            ...Object.keys(pkg.peerDependencies),
            ...Object.keys(pkg.dependencies),
          ].flatMap((dep) => [dep, new RegExp(`^${dep}/`)]),
          output: { preserveModules: true, preserveModulesRoot: 'src' },
        },
      },
    }
  }

  return {
    base: command === 'build' ? '/vue-animation-libarary/' : '/',
    resolve: { alias },
    plugins: [vue(), tailwindcss(), staticRoutes()],
    build: {
      outDir: 'dist-site',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1500,
    },
    server: { port: 5173 },
    test: {
      environment: 'happy-dom',
      setupFiles: ['tests/setup.ts'],
      include: ['tests/**/*.test.ts'],
    },
  }
})
