import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import terminalDemo from './scenes/terminal-demo?scene';
import codeDemo from './scenes/code-demo?scene';

export default makeProject({
  scenes: [intro, terminalDemo, codeDemo],
  // Global background behind all scenes & transitions (prevents any transparency showing through).
  background: '#0b1020',
  size: {
    width: 1920,
    height: 1080,
  },
});
