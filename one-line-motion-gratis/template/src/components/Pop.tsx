import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

// Masuk dengan antisipasi + overshoot. delay dalam frame.
export const usePop = (delay = 0, config = theme.spring.pop) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config});
};

export const Pop: React.FC<{delay?: number; from?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({
  delay = 0,
  from = 40,
  style,
  children,
}) => {
  const s = usePop(delay);
  return (
    <div style={{transform: `translateY(${(1 - s) * from}px) scale(${0.6 + 0.4 * s})`, opacity: Math.min(1, s * 1.5), ...style}}>
      {children}
    </div>
  );
};
