/* global process */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // base: 'gallery-ecommerce',
  base: process.env.NODE_ENV === 'production' ? 'gallery-ecommerce' : '/',
  plugins: [react()],
});
