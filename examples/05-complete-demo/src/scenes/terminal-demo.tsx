import {makeScene2D} from '@motion-canvas/2d';
import {Rect, Txt} from '@motion-canvas/2d/lib/components';
import {all, loop, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef, makeRef, useRandom} from '@motion-canvas/core/lib/utils';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {Direction} from '@motion-canvas/core/lib/types';
import {Terminal} from '../components/Terminal';

export default makeScene2D(function* (view) {
  // Transition INTO this scene: previous scene slides out left, this one comes in.
  yield* slideTransition(Direction.Left, 1);

  const random = useRandom();
  const terminal = createRef<Terminal>();
  const prompt = createRef<Txt>();
  const command = createRef<Txt>();
  const output = createRef<Txt>();
  const cursor = createRef<Rect>();
  const leftX = -560;
  const promptGap = 12;

  view.add(
    <>
      {/* Solid canvas background (so the editor doesn't show transparency grid) */}
      <Rect
        // Overscan so slide transitions never reveal transparent pixels.
        width={'300%'}
        height={'300%'}
        fill="#0b1020"
        zIndex={-100}
      />

      <Terminal
        ref={terminal}
        width={1200}
        height={700}
        scale={0.8}
        opacity={0}
      >
        {/* Command prompt */}
        <Txt
          ref={prompt}
          fill="#26a269"
          fontSize={24}
          fontFamily="JetBrains Mono, monospace"
          fontWeight={600}
          offsetX={-1}
          x={leftX}
          y={-280}
          text=""
        />

        {/* Command text */}
        <Txt
          ref={command}
          fill="#ffffff"
          fontSize={24}
          fontFamily="JetBrains Mono, monospace"
          offsetX={-1}
          x={() => prompt().x() + prompt().width() + promptGap}
          y={-280}
          text=""
        />

        {/* Blinking cursor */}
        <Rect
          ref={cursor}
          width={12}
          height={28}
          fill="#ffffff"
          x={() => command().x() + command().width() + 6}
          y={-280}
          opacity={1}
        />

        {/* Command output */}
        <Txt
          ref={output}
          fill="#cccccc"
          fontSize={20}
          fontFamily="JetBrains Mono, monospace"
          offsetX={-1}
          x={leftX}
          y={-200}
          text=""
          textAlign="left"
        />
      </Terminal>
    </>
  );

  // Fade in terminal
  yield* all(
    terminal().scale(1, 0.8),
    terminal().opacity(1, 0.8)
  );

  yield* waitFor(0.5);

  // Show prompt
  yield* typeText(prompt, 'willem@cloud-engineer:~$', 0.8);
  yield* waitFor(0.3);

  // Start cursor blinking
  yield blinkCursor(cursor);

  // Type command
  yield* typeText(command, 'kubectl get pods -n production', 2);
  yield* waitFor(0.5);

  // Stop cursor, show output
  cursor().opacity(0, 0.2);
  yield* waitFor(0.3);

  const outputText = `NAME                          READY   STATUS    RESTARTS   AGE
webapp-7d9b8c5f4-k8m2j       1/1     Running   0          2d
webapp-7d9b8c5f4-n5x7p       1/1     Running   0          2d
api-server-5c8f9d6-q4r8t     1/1     Running   1          5d
redis-cache-8f7c6d-m9p3k     1/1     Running   0          7d`;

  yield* typeText(output, outputText, 3);
  yield* waitFor(1);

  // New command
  const prompt2 = createRef<Txt>();
  const command2 = createRef<Txt>();
  const cursor2 = createRef<Rect>();

  terminal().contentContainer().add(
    <>
      <Txt
        ref={prompt2}
        fill="#26a269"
        fontSize={24}
        fontFamily="JetBrains Mono, monospace"
        fontWeight={600}
        offsetX={-1}
        x={leftX}
        y={60}
        text=""
      />
      <Txt
        ref={command2}
        fill="#ffffff"
        fontSize={24}
        fontFamily="JetBrains Mono, monospace"
        offsetX={-1}
        x={() => prompt2().x() + prompt2().width() + promptGap}
        y={60}
        text=""
      />
      <Rect
        ref={cursor2}
        width={12}
        height={28}
        fill="#ffffff"
        x={() => command2().x() + command2().width() + 6}
        y={60}
        opacity={1}
      />
    </>
  );

  yield* typeText(prompt2, 'willem@cloud-engineer:~$', 0.6);
  yield blinkCursor(cursor2);
  yield* typeText(command2, 'docker ps', 1.2);
  yield* waitFor(0.5);

  const output2 = createRef<Txt>();
  terminal().contentContainer().add(
    <Txt
      ref={output2}
      fill="#cccccc"
      fontSize={20}
      fontFamily="JetBrains Mono, monospace"
      offsetX={-1}
      x={leftX}
      y={120}
      text=""
      textAlign="left"
    />
  );

  cursor2().opacity(0, 0.2);
  yield* waitFor(0.3);

  const dockerOutput = `CONTAINER ID   IMAGE            STATUS         PORTS
a3c9f8e1d2b4   nginx:latest     Up 2 hours     0.0.0.0:80->80/tcp
b7f3e2c8a9d1   postgres:14      Up 3 hours     0.0.0.0:5432->5432/tcp`;

  yield* typeText(output2, dockerOutput, 2.5);
  yield* waitFor(2);
});

// Helper function for typing effect
function* typeText(textNode: any, fullText: string, duration: number) {
  const chars = fullText.split('');
  for (let i = 0; i <= chars.length; i++) {
    textNode().text(chars.slice(0, i).join(''));
    yield* waitFor(duration / chars.length);
  }
}

// Helper function for cursor blinking
function* blinkCursor(cursor: any) {
  cursor().opacity(1, 0);
  // Tween chains don't have `.loop()` in this Motion Canvas version.
  // `loop(...)` never finishes, so start it concurrently using `yield` (not `yield*`).
  yield loop(() => cursor().opacity(0, 0.5).to(1, 0.5));
}
