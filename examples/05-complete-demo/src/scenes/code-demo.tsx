import {makeScene2D, Code, lines} from '@motion-canvas/2d';
import {Rect, Txt} from '@motion-canvas/2d/lib/components';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef} from '@motion-canvas/core/lib/utils';
import {CodeEditor} from '../components/CodeEditor';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {Direction} from '@motion-canvas/core/lib/types';

export default makeScene2D(function* (view) {
  const editor = createRef<CodeEditor>();
  const codeBlock = createRef<Code>();
  const title = createRef<Txt>();

  view.add(
    <>
      {/* Scene title */}
      <Txt
        ref={title}
        fontSize={48}
        fontWeight={700}
        fill="#ffffff"
        fontFamily="JetBrains Mono, monospace"
        y={-450}
        opacity={0}
      >
        TypeScript Code Animation
      </Txt>

      {/* Code Editor */}
      <CodeEditor
        ref={editor}
        width={1400}
        height={800}
        y={50}
        scale={0.9}
        opacity={0}
      >
        <Code
          ref={codeBlock}
          fontSize={28}
          fontFamily="JetBrains Mono, monospace"
          language="typescript"
          code={''}
          x={-650}
          y={-320}
        />
      </CodeEditor>
    </>
  );

  // Fade in title
  yield* title().opacity(1, 0.8);
  yield* waitFor(0.5);

  // Fade in editor
  yield* all(
    editor().scale(1, 0.8),
    editor().opacity(1, 0.8)
  );

  yield* waitFor(0.5);

  // Type code line by line
  const code1 = `// Kubernetes deployment automation`;
  yield* codeBlock().code.append(code1, 1.2);
  yield* waitFor(0.3);

  const code2 = `\ninterface DeploymentConfig {`;
  yield* codeBlock().code.append(code2, 0.8);

  const code3 = `\n  namespace: string;`;
  yield* codeBlock().code.append(code3, 0.8);

  const code4 = `\n  replicas: number;`;
  yield* codeBlock().code.append(code4, 0.8);

  const code5 = `\n  image: string;`;
  yield* codeBlock().code.append(code5, 0.8);

  const code6 = `\n}`;
  yield* codeBlock().code.append(code6, 0.5);
  yield* waitFor(0.5);

  const code7 = `\n\nclass KubernetesDeployer {`;
  yield* codeBlock().code.append(code7, 0.8);

  const code8 = `\n  async deploy(config: DeploymentConfig) {`;
  yield* codeBlock().code.append(code8, 1);

  const code9 = `\n    console.log(\`Deploying to \${config.namespace}...\`);`;
  yield* codeBlock().code.append(code9, 1.2);
  yield* waitFor(0.3);

  const code10 = `\n    `;
  yield* codeBlock().code.append(code10, 0.3);

  const code11 = `\n    // Validate configuration`;
  yield* codeBlock().code.append(code11, 1);

  const code12 = `\n    if (!this.validateConfig(config)) {`;
  yield* codeBlock().code.append(code12, 1);

  const code13 = `\n      throw new Error('Invalid configuration');`;
  yield* codeBlock().code.append(code13, 1.2);

  const code14 = `\n    }`;
  yield* codeBlock().code.append(code14, 0.5);
  yield* waitFor(0.3);

  const code15 = `\n    `;
  yield* codeBlock().code.append(code15, 0.3);

  const code16 = `\n    // Apply Kubernetes manifest`;
  yield* codeBlock().code.append(code16, 1);

  const code17 = `\n    const manifest = this.generateManifest(config);`;
  yield* codeBlock().code.append(code17, 1.5);

  const code18 = `\n    await this.kubectl.apply(manifest);`;
  yield* codeBlock().code.append(code18, 1.2);
  yield* waitFor(0.3);

  const code19 = `\n    `;
  yield* codeBlock().code.append(code19, 0.3);

  const code20 = `\n    return { success: true, namespace: config.namespace };`;
  yield* codeBlock().code.append(code20, 1.5);

  const code21 = `\n  }`;
  yield* codeBlock().code.append(code21, 0.5);

  const code22 = `\n}`;
  yield* codeBlock().code.append(code22, 0.5);

  yield* waitFor(1);

  // Highlight specific lines
  yield* codeBlock().selection(lines(8, 11), 1);
  yield* waitFor(1.5);

  yield* codeBlock().selection(lines(15, 16), 1);
  yield* waitFor(1.5);

  yield* codeBlock().selection(lines(0, Infinity), 1);
  yield* waitFor(2);

  // Fade out
  yield* all(
    editor().opacity(0, 1),
    title().opacity(0, 1)
  );
});
