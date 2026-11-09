import {useCurrentFrame} from 'remotion';
import {theme} from '../theme';

// Matahari kartun berwajah, sinarnya berputar pelan dan wajahnya berkedip.
export const Sun: React.FC<{size: number}> = ({size}) => {
  const frame = useCurrentFrame();
  const blink = frame % 70 < 4 ? 0.1 : 1;
  const r = size / 2;
  return (
    <svg width={size * 1.6} height={size * 1.6} viewBox={`${-r * 1.6} ${-r * 1.6} ${size * 1.6} ${size * 1.6}`}>
      <g transform={`rotate(${frame * 0.8})`}>
        {Array.from({length: 12}).map((_, i) => (
          <rect key={i} x={-10} y={-r * 1.5} width={20} height={r * 0.38} rx={10} fill={theme.palette.primary} transform={`rotate(${i * 30})`} />
        ))}
      </g>
      <circle r={r} fill={theme.palette.primary} stroke={theme.palette.shadow} strokeWidth={theme.stroke} />
      <ellipse cx={-r * 0.32} cy={-r * 0.1} rx={r * 0.09} ry={r * 0.13 * blink} fill={theme.palette.shadow} />
      <ellipse cx={r * 0.32} cy={-r * 0.1} rx={r * 0.09} ry={r * 0.13 * blink} fill={theme.palette.shadow} />
      <path d={`M ${-r * 0.3} ${r * 0.22} Q 0 ${r * 0.48} ${r * 0.3} ${r * 0.22}`} stroke={theme.palette.shadow} strokeWidth={theme.stroke} fill="none" strokeLinecap="round" />
      <circle cx={-r * 0.55} cy={r * 0.18} r={r * 0.1} fill={theme.palette.accent} opacity={0.5} />
      <circle cx={r * 0.55} cy={r * 0.18} r={r * 0.1} fill={theme.palette.accent} opacity={0.5} />
    </svg>
  );
};
