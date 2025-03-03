import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        styles: resolve(__dirname, 'src/core/styles'),
      },
    },
    server: {
      port: env.DEV_SERVER_PORT,
    },
    css: {
      devSourcemap: true,
    },
    define: {
      __PREFIX__: JSON.stringify(env.PREFIX),
      __PREFIX_JS__: JSON.stringify('\\@'),
      __APP_VERSION__: JSON.stringify(env.npm_package_version),
      __NODE_ENV__: JSON.stringify(env.NODE_ENV),
      __THEME__: JSON.stringify(env.THEME),
    },
    build: {
      outDir: 'build',
      emptyOutDir: true,
      rollupOptions: {
        input: resolve('src/core/styles/core.scss'),
      },
    },
  }
})
