import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [
        vue(),
        dts({
          insertTypesEntry: true,
          rollupTypes: true,
          tsconfigPath: resolve(__dirname, 'tsconfig.json')
        })
      ],
      build: {
        lib: {
          entry: {
            index: resolve(__dirname, 'src/index.ts')
          },
          name: 'VueMagicUI',
          formats: ['es', 'umd', 'cjs'],
          fileName: (format, entryName) => {
            const extension = format === 'es' ? 'mjs' : format === 'cjs' ? 'cjs' : 'js'
            return `${entryName}.${extension}`
          }
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            },
            exports: 'named'
          }
        },
        sourcemap: true,
        minify: 'terser',
        cssCodeSplit: true,
        assetsInlineLimit: 4096
      }
    }
  }

  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true
        }
      })
    ],
    base: mode === 'production' ? '/vue-animation-libarary/' : '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@composables': resolve(__dirname, 'src/composables'),
        '@utils': resolve(__dirname, 'src/utils')
      }
    },
    server: {
      port: 3000,
      open: true,
      hmr: {
        overlay: true
      }
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router']
          }
        }
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router']
    },
    define: {
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    }
  }
})
