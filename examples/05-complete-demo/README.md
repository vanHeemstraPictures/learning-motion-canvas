# Complete Motion Canvas Demo

A comprehensive example demonstrating terminal and code editor animations using Motion Canvas.

## Overview

This project showcases:
- **Intro Scene**: Animated title with background elements
- **Terminal Demo**: Realistic terminal window with command execution
- **Code Demo**: VS Code-style editor with TypeScript syntax highlighting

## Features

### Custom Components

- **Terminal**: Reusable terminal window with macOS-style controls
- **CodeEditor**: VS Code-inspired editor with tabs and line numbers
- **SyntaxHighlighter**: Wrapper for code syntax highlighting with presets

### Animations

- Typing effects with realistic timing
- Blinking cursor animation
- Line-by-line code reveal
- Syntax highlighting transitions
- Smooth scene transitions

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run serve
```

The Motion Canvas editor will open in your browser at `http://localhost:9000`

### Building

```bash
# Build the project
npm run build

# Render video output
npm run render
```

> Note: Rendering is not configured in this demo because the old `@motion-canvas/cli`
> package (which previously provided `motion-canvas render`) is no longer available on npm.
> Interactive development via `npm run serve` works normally.

## Project Structure

```
05-complete-demo/
├── src/
│   ├── project.ts              # Main project configuration
│   ├── scenes/
│   │   ├── intro.tsx           # Opening title animation
│   │   ├── terminal-demo.tsx   # Terminal command execution
│   │   └── code-demo.tsx       # Code editor with typing
│   └── components/
│       ├── Terminal.tsx        # Terminal window component
│       ├── CodeEditor.tsx      # Code editor component
│       └── SyntaxHighlighter.tsx # Syntax highlighting utilities
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Component Usage

### Terminal Component

```tsx
import {Terminal} from './components/Terminal';

<Terminal
  width={1200}
  height={700}
  title="My Terminal"
  titleBarColor="#2d2d2d"
  backgroundColor="#1e1e1e"
>
  {/* Terminal content */}
</Terminal>
```

### CodeEditor Component

```tsx
import {CodeEditor} from './components/CodeEditor';

<CodeEditor
  width={1400}
  height={800}
  fileName="example.ts"
  theme="dark"
>
  {/* Code content */}
</CodeEditor>
```

### SyntaxHighlighter Component

```tsx
import {SyntaxHighlighter, CodeSnippets} from './components/SyntaxHighlighter';

<SyntaxHighlighter
  language="typescript"
  code={CodeSnippets.typescript.helloWorld}
  fontSize={24}
  theme="monokai"
/>
```

## Animation Techniques

### Typing Effect

```typescript
function* typeText(textNode: any, fullText: string, duration: number) {
  const chars = fullText.split('');
  for (let i = 0; i <= chars.length; i++) {
    textNode().text(chars.slice(0, i).join(''));
    yield* waitFor(duration / chars.length);
  }
}
```

### Cursor Blinking

```typescript
function* blinkCursor(cursor: any) {
  cursor().opacity(1, 0);
  yield* all(
    cursor().opacity(0, 0.5).to(1, 0.5).loop()
  );
}
```

### Code Line Highlighting

```typescript
// Highlight specific lines
yield* codeBlock().selection(lines(5, 10), 1);

// Highlight entire code
yield* codeBlock().selection(lines(0, Infinity), 1);
```

## Customization

### Terminal Theme

Modify the Terminal component props:
- `titleBarColor`: Title bar background color
- `backgroundColor`: Terminal background color
- `title`: Window title text

### Code Editor Theme

Switch between dark and light themes:
```tsx
<CodeEditor theme="light" />  // Light theme
<CodeEditor theme="dark" />   // Dark theme (default)
```

### Syntax Highlighting

Supported languages:
- TypeScript
- JavaScript
- Python
- Bash/Shell
- YAML
- JSON

Add custom code snippets in `SyntaxHighlighter.tsx`:
```typescript
export const CodeSnippets = {
  typescript: {
    myCustomSnippet: `// Your code here`,
  },
};
```

## Export Settings

Configure output in `src/project.ts`:

```typescript
export default makeProject({
  scenes: [intro, terminalDemo, codeDemo],
  background: '#0a0a0a',
  size: {
    width: 1920,    // Video width
    height: 1080,   // Video height
  },
});
```

### Recommended Settings

- **YouTube/Presentation**: 1920x1080, 60fps
- **Social Media**: 1080x1080, 30fps
- **Tutorial**: 1920x1080, 30fps

## Tips & Best Practices

1. **Timing**: Aim for 60-80 words per minute for typing effects
2. **Cursor Blink**: Use 500-800ms intervals for realistic cursor blinking
3. **Command Delays**: Add 0.3-0.5s delays before showing command output
4. **Font**: Use monospaced fonts (JetBrains Mono, Fira Code, Cascadia Code)
5. **Colors**: Follow terminal color conventions (green for success, red for errors)

## Performance Optimization

- Keep animations under 5 minutes for optimal performance
- Use `removeChildren()` to clean up unused nodes
- Limit simultaneous animations to 3-5
- Cache text rendering when possible

## Troubleshooting

### Common Issues

**Animation not playing**
- Check that all scenes are imported in `project.ts`
- Verify generator functions use `yield*` correctly

**Code not highlighting**
- Ensure language is specified: `language="typescript"`
- Check that the Code component is properly imported

**Terminal text overflow**
- Adjust terminal width/height
- Reduce font size
- Break long lines into multiple text nodes

## Resources

- [Motion Canvas Documentation](https://motioncanvas.io/docs/)
- [Motion Canvas API Reference](https://motioncanvas.io/api/)
- [Terminal Color Schemes](https://terminal.sexy/)
- [Programming Fonts](https://www.programmingfonts.org/)

## License

MIT License

## Author

Willem van Heemstra - Cloud Engineer & DevSecOps Specialist
