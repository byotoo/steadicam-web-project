import { resolve } from 'path'

export default {
  // Add this line! Use your actual repo name between the slashes
  base: '/steadicam-web-project/', 
  
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    emptyOutDir: true, // Ensures the old build is cleared out
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about.html'),
        services: resolve(__dirname, 'src/services.html'),
        portfolio: resolve(__dirname, 'src/portfolio.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        // Add any other HTML files you have here!
      }
    }
  },
  server: {
    port: 8080
  },
  css: {
     preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'mixed-decls',
            'color-functions',
            'global-builtin',
          ],
        },
     },
  },
}