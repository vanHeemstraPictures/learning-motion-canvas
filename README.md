# Learning Motion Canvas

A comprehensive learning repository for Motion Canvas - creating professional animations with code, with emphasis on terminal and code animation techniques.

## Overview

Motion Canvas is a TypeScript-based animation framework that allows you to create complex animations programmatically. This repository documents the learning journey for creating high-quality animations, particularly focused on terminal windows, code editors, and developer-focused visual content.

## Repository Structure

```
learning-motion-canvas/
├── README.md
├── docs/
│   ├── 00-getting-started/
│   │   ├── installation.md
│   │   ├── project-setup.md
│   │   └── basic-concepts.md
│   ├── 01-core-concepts/
│   │   ├── scenes-and-nodes.md
│   │   ├── tweening-and-timing.md
│   │   ├── signals-and-reactivity.md
│   │   └── coordinate-systems.md
│   ├── 02-animations/
│   │   ├── basic-transitions.md
│   │   ├── easing-functions.md
│   │   ├── generators-and-flows.md
│   │   └── animation-patterns.md
│   ├── 03-terminal-animations/
│   │   ├── terminal-window-design.md
│   │   ├── typing-effects.md
│   │   ├── cursor-animations.md
│   │   ├── syntax-highlighting.md
│   │   └── command-output.md
│   ├── 04-code-animations/
│   │   ├── code-editor-setup.md
│   │   ├── line-by-line-reveal.md
│   │   ├── code-highlighting.md
│   │   ├── diff-animations.md
│   │   └── code-execution-flow.md
│   └── 05-advanced-techniques/
│       ├── custom-components.md
│       ├── performance-optimization.md
│       ├── audio-synchronization.md
│       └── export-strategies.md
├── examples/
│   ├── 01-basic-terminal/
│   │   ├── src/
│   │   │   ├── project.ts
│   │   │   └── scenes/
│   │   │       └── basic-terminal.tsx
│   │   └── package.json
│   ├── 02-typing-animation/
│   │   ├── src/
│   │   │   ├── project.ts
│   │   │   ├── scenes/
│   │   │   │   └── typing-effect.tsx
│   │   │   └── components/
│   │   │       └── TypeWriter.tsx
│   │   └── package.json
│   ├── 03-code-editor/
│   │   ├── src/
│   │   │   ├── project.ts
│   │   │   ├── scenes/
│   │   │   │   └── code-reveal.tsx
│   │   │   └── components/
│   │   │       ├── CodeBlock.tsx
│   │   │       └── SyntaxHighlighter.tsx
│   │   └── package.json
│   ├── 04-command-execution/
│   │   ├── src/
│   │   │   ├── project.ts
│   │   │   ├── scenes/
│   │   │   │   └── command-flow.tsx
│   │   │   └── components/
│   │   │       └── Terminal.tsx
│   │   └── package.json
│   └── 05-complete-demo/
│       ├── src/
│       │   ├── project.ts
│       │   ├── scenes/
│       │   │   ├── intro.tsx
│       │   │   ├── terminal-demo.tsx
│       │   │   └── code-demo.tsx
│       │   └── components/
│       │       ├── Terminal.tsx
│       │       ├── CodeEditor.tsx
│       │       └── SyntaxHighlighter.tsx
│       └── package.json
├── resources/
│   ├── fonts/
│   │   ├── FiraCode-Regular.ttf
│   │   ├── JetBrainsMono-Regular.ttf
│   │   └── CascadiaCode-Regular.ttf
│   ├── themes/
│   │   ├── terminal-themes.json
│   │   ├── vscode-dark.json
│   │   └── monokai.json
│   └── references/
│       ├── color-schemes.md
│       └── terminal-specs.md
└── templates/
    ├── terminal-template/
    └── code-editor-template/
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- TypeScript knowledge
- Basic understanding of React/JSX
- Familiarity with animation concepts

### Installation

```bash
# Clone the repository
git clone https://github.com/vanHeemstraPictures/learning-motion-canvas.git
cd learning-motion-canvas

# Install Motion Canvas globally
npm install -g @motion-canvas/cli

# Create a new project
npm init @motion-canvas@latest
```

## Core Concepts

### Motion Canvas Fundamentals

1. **Scenes**: Individual animation sequences that can be composed together
2. **Nodes**: Visual elements (Rect, Circle, Txt, Code, etc.)
3. **Generators**: Functions that control animation timing using `yield*`
4. **Signals**: Reactive properties that can be animated
5. **Tweens**: Smooth transitions between values

### Key Components for Terminal/Code Animations

- `Code` node: Pre-built component for code display with syntax highlighting
- `Txt` node: Text rendering with rich formatting options
- `Rect` node: Containers for terminal windows
- Custom components: Reusable terminal and editor components

## Terminal Animation Techniques

### 1. Creating a Terminal Window

```typescript
import {makeScene2D} from '@motion-canvas/2d';
import {Rect, Txt} from '@motion-canvas/2d/lib/components';
import {createRef} from '@motion-canvas/core/lib/utils';

export default makeScene2D(function* (view) {
  const terminal = createRef<Rect>();
  
  view.add(
    <Rect
      ref={terminal}
      width={800}
      height={600}
      radius={8}
      fill="#1e1e1e"
      shadowColor="#00000088"
      shadowBlur={20}
    >
      <Rect
        height={30}
        fill="#2d2d2d"
        width={() => terminal().width()}
        y={() => -terminal().height() / 2 + 15}
      >
        <Txt text="Terminal" fill="#cccccc" fontSize={14} />
      </Rect>
    </Rect>
  );
});
```

### 2. Typing Animation Effect

```typescript
function* typeText(textNode: Txt, fullText: string, duration: number) {
  const chars = fullText.split('');
  for (let i = 0; i <= chars.length; i++) {
    textNode.text(chars.slice(0, i).join(''));
    yield* waitFor(duration / chars.length);
  }
}
```

### 3. Blinking Cursor

```typescript
function* blinkCursor(cursor: Rect) {
  while (true) {
    yield* cursor.opacity(0, 0.5);
    yield* cursor.opacity(1, 0.5);
  }
}
```

## Code Animation Techniques

### 1. Using the Built-in Code Component

```typescript
import {Code, makeScene2D} from '@motion-canvas/2d';
import {createRef} from '@motion-canvas/core/lib/utils';

export default makeScene2D(function* (view) {
  const codeRef = createRef<Code>();
  
  view.add(
    <Code
      ref={codeRef}
      fontSize={28}
      offsetX={-1}
      x={-400}
      code={''}
    />
  );

  yield* codeRef().code.append('function hello() {\n', 1);
  yield* codeRef().code.append('  console.log("Hello");\n', 1);
  yield* codeRef().code.append('}\n', 1);
});
```

### 2. Syntax Highlighting

Motion Canvas supports syntax highlighting through the `Code` component with language specifications:

```typescript
<Code
  language="typescript"
  code={`
const greeting: string = "Hello, Motion Canvas!";
console.log(greeting);
  `}
/>
```

### 3. Line-by-Line Reveal

```typescript
yield* codeRef().selection(lines(0, Infinity), 1);
yield* waitFor(0.5);
yield* codeRef().selection(lines(0, 0), 0.5);
yield* waitFor(1);
yield* codeRef().selection(lines(1, 1), 0.5);
```

## Advanced Techniques

### Custom Terminal Component

Create reusable terminal components with configurable themes:

```typescript
// components/Terminal.tsx
import {Rect, Txt} from '@motion-canvas/2d/lib/components';
import {initial, signal} from '@motion-canvas/2d/lib/decorators';

export class Terminal extends Rect {
  @initial('#1e1e1e')
  @signal()
  public declare readonly backgroundColor: string;

  @initial('#00ff00')
  @signal()
  public declare readonly textColor: string;

  public constructor(props: any) {
    super({
      ...props,
      fill: props.backgroundColor ?? '#1e1e1e',
      radius: 8,
      shadowBlur: 20,
      shadowColor: '#00000088',
    });
  }
}
```

### Command Execution Flow

Simulate command execution with input, processing, and output:

```typescript
export default makeScene2D(function* (view) {
  // Show command prompt
  yield* typeText(prompt, '$ npm install motion-canvas', 1.5);
  
  // Show processing
  yield* spinner.rotation(360, 2).to(720, 2);
  
  // Show output
  yield* typeText(output, 'Successfully installed!', 1);
});
```

## Learning Resources

### Official Documentation

- [Motion Canvas Docs](https://motioncanvas.io/docs/)
- [Motion Canvas API Reference](https://motioncanvas.io/api/)
- [Motion Canvas GitHub](https://github.com/motion-canvas/motion-canvas)

### Terminal Animation Resources

- [Terminal Color Schemes](https://terminal.sexy/)
- [Monospaced Fonts](https://www.programmingfonts.org/)
- [ANSI Escape Codes](https://en.wikipedia.org/wiki/ANSI_escape_code)
- [Terminal Emulator Design Patterns](https://poor.dev/blog/terminal-anatomy/)

### Code Animation Inspiration

- [Prism.js Themes](https://prismjs.com/#supported-languages)
- [VS Code Themes](https://vscodethemes.com/)
- [Shiki Syntax Highlighter](https://shiki.matsu.io/)
- [Carbon Code Screenshots](https://carbon.now.sh/)

### Video Tutorials

- [Motion Canvas YouTube Channel](https://www.youtube.com/@MotionCanvas)
- [Creating Code Animations](https://www.youtube.com/watch?v=WTUafAwrunE)
- [Terminal UI in Motion Canvas](https://www.youtube.com/results?search_query=motion+canvas+terminal)

## Common Patterns

### 1. Typewriter Effect with Sound

```typescript
function* typeWithSound(
  text: Txt,
  content: string,
  duration: number,
  audio?: AudioClip
) {
  const chars = content.split('');
  for (let i = 0; i <= chars.length; i++) {
    text.text(chars.slice(0, i).join(''));
    if (audio) audio.play();
    yield* waitFor(duration / chars.length);
  }
}
```

### 2. Code Diff Animation

```typescript
// Highlight removed lines in red
yield* oldCode().selection(lines(2, 3), 0.5);
yield* oldCode().opacity(0.3, 0.5);

// Show new lines in green
yield* newCode().selection(lines(2, 4), 0.5);
yield* newCode().opacity(1, 0.5);
```

### 3. Multi-pane Terminal

```typescript
view.add(
  <Rect layout gap={20}>
    <Terminal title="Terminal 1" />
    <Terminal title="Terminal 2" />
  </Rect>
);
```

## Best Practices

### Performance

- Use `useCancellablePromises()` for complex animations
- Optimize text rendering by caching
- Limit simultaneous animations
- Use `removeChildren()` to clean up scenes

### Code Organization

- Separate components into dedicated files
- Create reusable animation generators
- Use TypeScript for type safety
- Document complex animation sequences

### Visual Design

- Use monospaced fonts (Fira Code, JetBrains Mono, Cascadia Code)
- Follow terminal color scheme conventions
- Maintain consistent timing (60-80 WPM for typing)
- Add subtle shadows and depth

### Terminal Authenticity

- Include proper prompt symbols (`$`, `>`, `#`)
- Show realistic command output
- Use authentic timing for command execution
- Include cursor blinking (500-800ms intervals)

## Export Settings

### For Terminal Videos

```typescript
// In project.ts
export default makeProject({
  scenes: [terminalScene],
  background: '#000000',
  size: {
    width: 1920,
    height: 1080,
  },
});
```

### Common Export Formats

- **Tutorial Videos**: 1920x1080, 60fps
- **Social Media**: 1080x1080 (square), 30fps
- **Presentation**: 1920x1080, 30fps
- **GIF Previews**: 800x600, 24fps

## Project Ideas

1. **Git Workflow Tutorial**: Animate git commands with visual branch representation
2. **API Request Flow**: Show curl commands with JSON responses
3. **Docker Container Lifecycle**: Terminal commands with container states
4. **Code Refactoring Demo**: Side-by-side before/after with diffs
5. **DevOps Pipeline**: Animated CI/CD stages with terminal output
6. **Security Scanning**: Show vulnerability scan output with highlights
7. **Kubernetes Deployment**: kubectl commands with cluster visualization
8. **Python Script Execution**: Code editor to terminal output flow

## Contributing

This is a personal learning repository, but suggestions and improvements are welcome through issues and pull requests.

## Progress Tracking

- [ ] Complete getting started examples
- [ ] Build custom Terminal component
- [ ] Implement advanced typing effects
- [ ] Create syntax highlighter wrapper
- [ ] Build code diff animation
- [ ] Create complete tutorial video template
- [ ] Document performance optimization techniques
- [ ] Add audio synchronization examples

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Motion Canvas team for the excellent framework
- DevOps and developer community for terminal/code animation inspiration
- Syntax highlighting libraries (Prism.js, Shiki)

---

**Willem van Heemstra** | Learning Motion Canvas for Developer Content Creation
