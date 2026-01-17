import {Rect, Txt, Circle, Line} from '@motion-canvas/2d/lib/components';
import {initial, signal} from '@motion-canvas/2d/lib/decorators';
import {SignalValue, SimpleSignal} from '@motion-canvas/core/lib/signals';
import {ComponentChildren} from '@motion-canvas/2d/lib/components';

export interface CodeEditorProps {
  width?: SignalValue<number>;
  height?: SignalValue<number>;
  title?: SignalValue<string>;
  fileName?: SignalValue<string>;
  theme?: 'dark' | 'light';
  children?: ComponentChildren;
  x?: SignalValue<number>;
  y?: SignalValue<number>;
  scale?: SignalValue<number>;
  opacity?: SignalValue<number>;
}

export class CodeEditor extends Rect {
  @initial('dark')
  @signal()
  public declare readonly theme: SimpleSignal<'dark' | 'light', this>;

  @initial('Code Editor')
  @signal()
  public declare readonly editorTitle: SimpleSignal<string, this>;

  @initial('example.ts')
  @signal()
  public declare readonly fileName: SimpleSignal<string, this>;

  public constructor(props?: CodeEditorProps) {
    const isDark = (props?.theme ?? 'dark') === 'dark';
    
    super({
      width: 1200,
      height: 700,
      fill: isDark ? '#1e1e1e' : '#ffffff',
      radius: 8,
      shadowColor: '#00000088',
      shadowBlur: 30,
      shadowOffsetY: 10,
      ...props,
    });

    const titleBarHeight = 45;
    const tabHeight = 35;
    const buttonSize = 12;

    // Title bar
    this.add(
      <Rect
        width={() => this.width()}
        height={titleBarHeight}
        fill={isDark ? '#2d2d2d' : '#e8e8e8'}
        radius={[8, 8, 0, 0]}
        y={() => -this.height() / 2 + titleBarHeight / 2}
      >
        {/* Window control buttons */}
        <Circle
          size={buttonSize}
          fill="#ff5f57"
          x={() => -this.width() / 2 + 20}
        />
        <Circle
          size={buttonSize}
          fill="#febc2e"
          x={() => -this.width() / 2 + 20 + buttonSize + 12}
        />
        <Circle
          size={buttonSize}
          fill="#28c840"
          x={() => -this.width() / 2 + 20 + (buttonSize + 12) * 2}
        />

        {/* Editor title */}
        <Txt
          text={() => this.editorTitle()}
          fill={isDark ? '#cccccc' : '#333333'}
          fontSize={14}
          fontFamily="JetBrains Mono, monospace"
          fontWeight={500}
        />
      </Rect>
    );

    // Tab bar
    this.add(
      <Rect
        width={() => this.width()}
        height={tabHeight}
        fill={isDark ? '#252526' : '#f3f3f3'}
        y={() => -this.height() / 2 + titleBarHeight + tabHeight / 2}
      >
        {/* File tab */}
        <Rect
          width={200}
          height={tabHeight}
          fill={isDark ? '#1e1e1e' : '#ffffff'}
          x={() => -this.width() / 2 + 100}
        >
          {/* File icon */}
          <Txt
            text="TS"
            fill="#3178c6"
            fontSize={12}
            fontWeight={700}
            fontFamily="JetBrains Mono, monospace"
            x={-80}
          />
          
          {/* File name */}
          <Txt
            text={() => this.fileName()}
            fill={isDark ? '#cccccc' : '#333333'}
            fontSize={13}
            fontFamily="JetBrains Mono, monospace"
            x={-20}
          />

          {/* Modified indicator */}
          <Circle
            size={8}
            fill="#3794ff"
            x={70}
          />
        </Rect>
      </Rect>
    );

    // Line numbers area
    this.add(
      <Rect
        width={60}
        height={() => this.height() - titleBarHeight - tabHeight}
        fill={isDark ? '#1e1e1e' : '#f8f8f8'}
        x={() => -this.width() / 2 + 30}
        y={() => (titleBarHeight + tabHeight) / 2}
      >
        {/* Line numbers (1-20) */}
        {Array.from({length: 20}, (_, i) => (
          <Txt
            key={i}
            text={`${i + 1}`}
            fill={isDark ? '#858585' : '#999999'}
            fontSize={14}
            fontFamily="JetBrains Mono, monospace"
            y={-280 + i * 30}
            x={0}
          />
        ))}
      </Rect>
    );

    // Separator line
    this.add(
      <Line
        points={[
          [
            () => -this.width() / 2 + 60,
            () => -this.height() / 2 + titleBarHeight + tabHeight
          ],
          [
            () => -this.width() / 2 + 60,
            () => this.height() / 2
          ]
        ]}
        stroke={isDark ? '#2d2d2d' : '#d4d4d4'}
        lineWidth={1}
      />
    );

    // Content area
    this.add(
      <Rect
        width={() => this.width() - 120}
        height={() => this.height() - titleBarHeight - tabHeight - 40}
        fill="rgba(0, 0, 0, 0)"
        x={30}
        y={() => (titleBarHeight + tabHeight) / 2 + 10}
        clip
      >
        {props?.children}
      </Rect>
    );
  }
}
