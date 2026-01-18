import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/file-gmailer-web/', // ← crucial for GitHub Pages
  base: '/', // heroku deployment
});
