// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Use relative paths for old-school FTP hosting compatibility
  build: {
    format: 'file'
  }
});
