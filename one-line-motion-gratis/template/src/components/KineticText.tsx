import {useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {theme} from '../theme';

// Kata masuk satu per satu. Kata yang diawali * diberi warna aksen: "Kenapa langit *biru?"
export const KineticText: React.FC<{text: string; size: number; delay?: number; color?: string; align?: 'center' | 'left'}> = ({
  text,
  size,
  delay = 0,
  color = theme.palette.ink,
  align = 'center',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  return (
    <div
      style={{
        fontFamily: theme.fonts.display,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.05,
        color,
        textAlign: align,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        gap: `0 ${size * 0.25}px`,
        textShadow: `0 ${size * 0.06}px 0 ${theme.palette.shadow}`,
      }}
    >
      {words.map((w, i) => {
        const accent = w.startsWith('*');
        const s = spring({frame: frame - delay - i * theme.stagger, fps, config: theme.spring.pop});
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: `translateY(${(1 - s) * size * 0.6}px) rotate(${(1 - s) * (i % 2 ? 8 : -8)}deg)`,
              opacity: Math.min(1, s * 2),
              color: accent ? theme.palette.primary : undefined,
            }}
          >
            {accent ? w.slice(1) : w}
          </span>
        );
      })}
    </div>
  );
};
