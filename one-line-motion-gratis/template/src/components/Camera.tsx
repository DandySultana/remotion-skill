import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

// Gerak kamera pelan supaya tidak ada frame diam. push = besar zoom akhir.
export const Camera: React.FC<{durationInFrames: number; push?: number; drift?: number; children: React.ReactNode}> = ({
  durationInFrames,
  push = 1.06,
  drift = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], {easing: theme.ease.smooth, extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{transform: `scale(${1 + (push - 1) * p}) translateX(${drift * p}px)`}}>{children}</AbsoluteFill>
  );
};
