import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: env.DEV_SERVER_PORT,
    },
    define: {
      __APP_VERSION__: JSON.stringify(env.npm_package_version),
      __NODE_ENV__: JSON.stringify(env.NODE_ENV),
    },
  };
});
