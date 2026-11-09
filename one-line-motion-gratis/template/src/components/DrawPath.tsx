import {interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

// Garis yang menggambar dirinya sendiri (panah, diagram, coretan).
export const DrawPath: React.FC<{d: string; length: number; delay?: number; duration?: number; color?: string; width?: number}> = ({
  d,
  length,
  delay = 0,
  duration = 20,
  color = theme.palette.ink,
  width = theme.stroke,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, duration], [0, 1], {easing: theme.ease.in, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={length} strokeDashoffset={length * (1 - p)} />
  );
};
