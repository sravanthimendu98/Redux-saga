import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Ensures global test functions like `expect` are available
    environment: 'jsdom', // Use jsdom as the test environment
    setupFiles: './src/setupTests.ts', // Path to the setup file
  },
});
