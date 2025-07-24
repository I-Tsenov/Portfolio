import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import path from 'path'

export default defineConfig({
  plugins: [react(), svgr({
    svgrOptions: {
      exportType: 'named', // or 'default' depending on your import style
    },
    include: '**/*.svg',
  }),],
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, './app'),
      '@features': path.resolve(__dirname, './src/features'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@src': path.resolve(__dirname, 'src/')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    // preprocessorOptions: {
    //   scss: {
    // additionalData: `@use "@styles/_globals.scss";\n\n`
    // Optional: Inject global SASS variables/mixins
    // }
    // }
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: 'index.html'
    }
  }
})