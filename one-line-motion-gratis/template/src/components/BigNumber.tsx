import {interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

// Angka penting: hitung naik lalu "mendarat" dengan sedikit pantulan.
export const BigNumber: React.FC<{to: number; suffix?: string; delay?: number; duration?: number; size: number; decimals?: number}> = ({
  to,
  suffix = '',
  delay = 0,
  duration = 30,
  size,
  decimals = 0,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, duration], [0, 1], {easing: theme.ease.in, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const land = interpolate(frame - delay - duration, [0, 4, 10], [1, 1.12, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        fontFamily: theme.fonts.display,
        fontWeight: 800,
        fontSize: size,
        color: theme.palette.primary,
        transform: `scale(${land})`,
        opacity: frame < delay ? 0 : 1,
        fontVariantNumeric: 'tabular-nums',
        textShadow: `0 ${size * 0.05}px 0 ${theme.palette.shadow}`,
      }}
    >
      {(to * p).toFixed(decimals).replace('.', ',')}
      {suffix}
    </div>
  );
};
