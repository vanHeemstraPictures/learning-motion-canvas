import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import terminalDemo from './scenes/terminal-demo?scene';
import codeDemo from './scenes/code-demo?scene';

export default makeProject({
  scenes: [intro, terminalDemo, codeDemo],
  background: '#0a0a0a',
  size: {
    width: 1920,
    height: 1080,
  },
});
