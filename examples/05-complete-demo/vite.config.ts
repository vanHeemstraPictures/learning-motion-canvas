import {defineConfig} from 'vite';
import motionCanvasPlugin from '@motion-canvas/vite-plugin';

const motionCanvas: (options: {project: string}) => any =
  typeof motionCanvasPlugin === 'function'
    ? (motionCanvasPlugin as any)
    : (motionCanvasPlugin as any).default;

export default defineConfig({
  plugins: [
    motionCanvas({
      project: './src/project.ts',
    }),
  ],
  server: {
    // Hardening: keep dev server local-only.
    // (npm audit currently flags an esbuild dev-server advisory pulled in via Vite.)
    host: '127.0.0.1',
    port: 9000,
    open: true,
    cors: false,
  },
  build: {
    rollupOptions: {
      output: {
        dir: './output',
      },
    },
  },
});
