// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     react(),      // ✅ REQUIRED for React
//     tailwindcss() // ✅ Tailwind plugin
//   ],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()], // Remove the tailwindcss plugin
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true
      }
    }
  }
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss()
//   ],
//   server: {
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true
//       },
//       '/socket.io': {
//         target: 'http://localhost:5000',
//         ws: true
//       }
//     }
//   }
// })



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import imagemin from 'vite-plugin-imagemin'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     imagemin({
//       // Optimize images during build
//       gifsicle: {
//         optimizationLevel: 7,
//         interlaced: false
//       },
//       optipng: {
//         optimizationLevel: 7
//       },
//       mozjpeg: {
//         quality: 80
//       },
//       pngquant: {
//         quality: [0.8, 0.9],
//         speed: 4
//       },
//       svgo: {
//         plugins: [
//           {
//             name: 'removeViewBox',
//             active: false
//           },
//           {
//             name: 'removeEmptyAttrs',
//             active: false
//           }
//         ]
//       }
//     })
//   ],
//   server: {
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true
//       },
//       '/socket.io': {
//         target: 'http://localhost:5000',
//         ws: true
//       }
//     }
//   },
//   build: {
//     chunkSizeWarningLimit: 1000,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           'react-vendor': ['react', 'react-dom', 'react-router-dom'],
//         },
//         // Ensure asset filenames are hashed for better caching
//         assetFileNames: (assetInfo) => {
//           let extType = assetInfo.name.split('.').at(1);
//           if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
//             extType = 'img';
//           }
//           return `assets/${extType}/[name]-[hash][extname]`;
//         },
//         chunkFileNames: 'assets/js/[name]-[hash].js',
//         entryFileNames: 'assets/js/[name]-[hash].js',
//       }
//     },
//     assetsInlineLimit: 4096,
//     sourcemap: false,
//     minify: 'terser',
//     terserOptions: {
//       compress: {
//         drop_console: true,
//         drop_debugger: true
//       }
//     },
//     // Empty outDir before building
//     emptyOutDir: true,
//     // Copy public assets
//     copyPublicDir: true
//   },
//   optimizeDeps: {
//     include: ['react', 'react-dom', 'react-router-dom', 'socket.io-client'],
//     exclude: []
//   },
//   resolve: {
//     alias: {
//       '@': '/src',
//       '@components': '/src/components',
//       '@assets': '/src/assets',
//       '@services': '/src/services',
//       '@context': '/src/context'
//     }
//   },
//   // Public directory (where static assets are served from)
//   publicDir: 'public'
// })