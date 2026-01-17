import {makeScene2D} from '@motion-canvas/2d';
import {Circle, Rect, Txt} from '@motion-canvas/2d/lib/components';
import {loop, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef} from '@motion-canvas/core/lib/utils';

export default makeScene2D(function* (view) {
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const circle1 = createRef<Circle>();
  const circle2 = createRef<Circle>();
  const circle3 = createRef<Circle>();

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

      {/* Background circles */}
      <Circle
        ref={circle1}
        size={400}
        fill="#1a5fb4"
        opacity={0.1}
        x={-600}
        y={-300}
      />
      <Circle
        ref={circle2}
        size={500}
        fill="#26a269"
        opacity={0.1}
        x={600}
        y={200}
      />
      <Circle
        ref={circle3}
        size={300}
        fill="#e01b24"
        opacity={0.1}
        x={0}
        y={400}
      />

      {/* Title */}
      <Txt
        ref={title}
        fontSize={90}
        fontWeight={700}
        fill="#ffffff"
        fontFamily="JetBrains Mono, monospace"
        opacity={0}
        y={-50}
      >
        Motion Canvas
      </Txt>

      {/* Subtitle */}
      <Txt
        ref={subtitle}
        fontSize={42}
        fill="#cccccc"
        fontFamily="JetBrains Mono, monospace"
        opacity={0}
        y={40}
      >
        Animations with Code
      </Txt>
    </>
  );

  // Animate background circles
  // `loop(...)` never finishes, so run it concurrently using `yield` (not `yield*`).
  yield loop(() => circle1().scale(0.8, 2).to(1.2, 2).to(0.8, 2));
  yield loop(() => circle2().scale(1.2, 2.5).to(0.9, 2.5).to(1.2, 2.5));
  yield loop(() => circle3().scale(1, 1.8).to(1.1, 1.8).to(1, 1.8));

  // Fade in title
  yield* title().opacity(1, 1);
  yield* waitFor(0.5);

  // Fade in subtitle
  yield* subtitle().opacity(1, 1);
  yield* waitFor(2);
});
