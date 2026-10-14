import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

const serveAssistImages = (): Plugin => ({
  name: 'serve-assist-images',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const rawUrl = req.url?.split('?')[0];
      if (!rawUrl) return next();

      if (
        rawUrl.startsWith('/assist/image') ||
        rawUrl.startsWith('/public/assist/image') ||
        rawUrl.startsWith('/public-assist-image') ||
        rawUrl.startsWith('/images')
      ) {
        const rel = rawUrl
          .replace(/^\/public\/assist\/image\/?/, '')
          .replace(/^\/assist\/image\/?/, '')
          .replace(/^\/public-assist-image\/?/, '')
          .replace(/^\/images\/?/, '');

        const candidates = [
          path.resolve(__dirname, 'public/assist/image', rel),
          path.resolve(__dirname, 'public/assist/image/products', rel),
          path.resolve(__dirname, 'public/assist/image/models', rel),
          path.resolve(__dirname, 'public/assist/image/closeups', rel),
          path.resolve(__dirname, 'public/assist/image/categories', rel),
          path.resolve(__dirname, 'public/assist/image/banners', rel),
          path.resolve(__dirname, 'public/assist/image/avatars', rel),
          path.resolve(__dirname, 'public/assist/image/community', rel),
          path.resolve(__dirname, 'public/assist/image/brand', rel),
          path.resolve(__dirname, 'public-assist-image', rel),
        ];

        for (const candidate of candidates) {
          if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
            const ext = path.extname(candidate).toLowerCase();
            const mimeTypes: Record<string, string> = {
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.svg': 'image/svg+xml',
              '.webp': 'image/webp',
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            fs.createReadStream(candidate).pipe(res);
            return;
          }
        }
      }
      next();
    });
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), serveAssistImages()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

