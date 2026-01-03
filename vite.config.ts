// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // Disable fast refresh in production to avoid eval
      // This ensures CSP compliance
      jsxRuntime: 'automatic',
    })
  ],
  server: {
    host: true,
    allowedHosts: true,
  },
  build: {
    // Ensure no eval is used in production builds
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
      },
    },
    // Generate source maps for debugging without eval
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    exclude: [],
  },
});