import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const cloudflareBaseUrl = env.CLOUD_FLARE_R2_BASE_URL || env.VITE_CLOUD_FLARE_R2_BASE_URL || 'https://pub-906aca35719743e28e7e6490148ac265.r2.dev'

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
    ],
    server: {
      proxy: {
        '/audio-proxy': {
          target: cloudflareBaseUrl,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/audio-proxy/, ''),
        },
      },
    },
  }
})
