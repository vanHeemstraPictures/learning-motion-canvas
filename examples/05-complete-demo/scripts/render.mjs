/**
 * Motion Canvas rendering used to be driven by `@motion-canvas/cli` (`motion-canvas render`),
 * but that package is no longer available on npm.
 *
 * This demo still works for interactive development via Vite + `@motion-canvas/vite-plugin`.
 * If you need video rendering, follow the Motion Canvas docs for the currently supported
 * render workflow and update this script accordingly.
 */

console.error(
  [
    'Render is not configured in this demo (the old @motion-canvas/cli package is unavailable).',
    '',
    'You can still run the editor/dev server with:',
    '  npm run serve',
    '',
    'To render video output, check the Motion Canvas docs for the current rendering workflow',
    'and update learning-motion-canvas/examples/05-complete-demo/scripts/render.mjs.',
  ].join('\n'),
);

process.exit(1);

