import { resolve } from 'path'

export default {
  // Add this line! Use your actual repo name between the slashes
  base: '/steadicam-web-project/', 
  
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    emptyOutDir: true // Ensures the old build is cleared out
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