import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

// Gradasi + grain prosedural + vignette. Grain berganti tiap 2 frame supaya terasa "hidup".
export const Background: React.FC<{from?: string; to?: string; grain?: number; children?: React.ReactNode}> = ({
  from = theme.palette.bg2,
  to = theme.palette.bg,
  grain = 0.06,
  children,
}) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 50;
  return (
    <AbsoluteFill style={{background: `radial-gradient(120% 90% at 50% 20%, ${from} 0%, ${to} 70%)`}}>
      {children}
      <AbsoluteFill style={{opacity: grain, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
        <svg width="100%" height="100%">
          <filter id={`grain-${seed}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)'}} />
    </AbsoluteFill>
  );
};
