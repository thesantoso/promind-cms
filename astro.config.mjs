import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import emdash from 'emdash/astro';
import { d1 } from '@emdash-cms/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [
    react(),
    emdash({
      database: d1({ binding: 'DB' })
    })
  ],
  vite: {
    plugins: [],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('kysely')) {
              return 'kysely-core';
            }
          }
        }
      }
    }
  }
});