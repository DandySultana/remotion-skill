import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

// Subtitle otomatis dari narasi. Waktu tiap potongan diperkirakan dari jumlah huruf,
// cukup akurat untuk VO yang dibaca rata. Untuk sinkron per kata, isi timestamp dari transkrip.
const chunk = (text: string, size = 4) => {
  const words = text.split(/\s+/).filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i < words.length; i += size) out.push(words.slice(i, i + size).join(' '));
  return out;
};

export const Caption: React.FC<{text: string; durationInFrames: number}> = ({text, durationInFrames}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const vertical = height > width;
  const parts = chunk(text);
  const usable = Math.max(1, durationInFrames - 12);
  const total = parts.reduce((n, p) => n + p.length, 0);
  let start = 0;
  let current = '';
  let local = 0;
  for (const p of parts) {
    const len = (p.length / total) * usable;
    if (frame >= start && frame < start + len) {
      current = p;
      local = frame - start;
    }
    start += len;
  }
  if (!current) return null;
  const s = interpolate(local, [0, 5], [0.85, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: vertical ? height * 0.22 : height * 0.07}}>
      <div
        style={{
          fontFamily: theme.fonts.body,
          fontWeight: 800,
          fontSize: vertical ? 54 : 44,
          color: theme.palette.ink,
          background: 'rgba(0,0,0,0.55)',
          padding: '10px 26px',
          borderRadius: 18,
          transform: `scale(${s})`,
          maxWidth: width * 0.86,
          textAlign: 'center',
        }}
      >
        {current}
      </div>
    </AbsoluteFill>
  );
};
