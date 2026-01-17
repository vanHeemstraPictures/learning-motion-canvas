import {Rect, Txt, Circle} from '@motion-canvas/2d/lib/components';
import {initial, signal} from '@motion-canvas/2d/lib/decorators';
import {SignalValue, SimpleSignal} from '@motion-canvas/core/lib/signals';
import {ComponentChildren} from '@motion-canvas/2d/lib/components';
import {createRef} from '@motion-canvas/core/lib/utils';

export interface TerminalProps {
  width?: SignalValue<number>;
  height?: SignalValue<number>;
  title?: SignalValue<string>;
  titleBarColor?: SignalValue<string>;
  backgroundColor?: SignalValue<string>;
  borderRadius?: SignalValue<number>;
  children?: ComponentChildren;
  x?: SignalValue<number>;
  y?: SignalValue<number>;
  scale?: SignalValue<number>;
  opacity?: SignalValue<number>;
}

export class Terminal extends Rect {
  private readonly contentContainerRef = createRef<Rect>();

  @initial('#2d2d2d')
  @signal()
  public declare readonly titleBarColor: SimpleSignal<string, this>;

  @initial('#1e1e1e')
  @signal()
  public declare readonly backgroundColor: SimpleSignal<string, this>;

  @initial('Terminal')
  @signal()
  public declare readonly terminalTitle: SimpleSignal<string, this>;

  public contentContainer(): Rect {
    return this.contentContainerRef();
  }

  public constructor(props?: TerminalProps) {
    super({
      width: 1000,
      height: 600,
      fill: '#1e1e1e',
      radius: 8,
      shadowColor: '#00000088',
      shadowBlur: 30,
      shadowOffsetY: 10,
      ...props,
    });

    const titleBarHeight = 40;
    const buttonSize = 12;
    const buttonSpacing = 10;

    // Title bar
    this.add(
      <Rect
        width={() => this.width()}
        height={titleBarHeight}
        fill={() => this.titleBarColor()}
        radius={[8, 8, 0, 0]}
        y={() => -this.height() / 2 + titleBarHeight / 2}
      >
        {/* macOS-style window buttons */}
        <Circle
          size={buttonSize}
          fill="#ff5f57"
          x={() => -this.width() / 2 + 20}
        />
        <Circle
          size={buttonSize}
          fill="#febc2e"
          x={() => -this.width() / 2 + 20 + buttonSize + buttonSpacing}
        />
        <Circle
          size={buttonSize}
          fill="#28c840"
          x={() => -this.width() / 2 + 20 + (buttonSize + buttonSpacing) * 2}
        />

        {/* Title text */}
        <Txt
          text={() => this.terminalTitle()}
          fill="#cccccc"
          fontSize={16}
          fontFamily="JetBrains Mono, monospace"
          fontWeight={500}
        />
      </Rect>
    );

    // Content area with padding
    this.add(
      <Rect
        ref={this.contentContainerRef}
        width={() => this.width() - 40}
        height={() => this.height() - titleBarHeight - 40}
        fill="rgba(0, 0, 0, 0)"
        y={titleBarHeight / 2}
        clip
      >
        {props?.children}
      </Rect>
    );
  }
}
