import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {E, F, Shell, iv, type SceneFC} from '../lib';

const C = {paper: '#FBF7EF', blue: '#7FB7D9', pink: '#F2A7A0', yellow: '#F6D27A', green: '#8CC59A', ink: '#4A4A58'};
const RAINBOW = ['#E8817A', '#F2A766', '#F6D27A', '#8CC59A', '#7FB7D9', '#8E8CC9', '#B89AD3'];

// Kertas basah + filter rembesan cat (dipakai semua adegan).
const Paper: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: C.paper}}>
    <svg width={0} height={0} style={{position: 'absolute'}}>
      <filter id="wc">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="4" />
        <feDisplacementMap in="SourceGraphic" scale="28" />
        <feGaussianBlur stdDeviation="2.2" />
      </filter>
      <filter id="grainP"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /></filter>
    </svg>
    {children}
    <AbsoluteFill style={{opacity: 0.08, mixBlendMode: 'multiply'}}>
      <svg width="100%" height="100%"><rect width="100%" height="100%" filter="url(#grainP)" /></svg>
    </AbsoluteFill>
  </AbsoluteFill>
);

// Bercak cat yang "mekar".
const Blob: React.FC<{x: number; y: number; r: number; color: string; at: number; op?: number}> = ({x, y, r, color, at, op = 0.55}) => {
  const f = useCurrentFrame();
  const p = iv(f - at, [0, 30], [0, 1], E.out);
  return <circle cx={x} cy={y} r={r * p} fill={color} opacity={op * p} filter="url(#wc)" style={{mixBlendMode: 'multiply'}} />;
};

const Title: React.FC<{text: string; top: number; at: number; size?: number}> = ({text, top, at, size = 96}) => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', top, left: 60, right: 60, textAlign: 'center', fontFamily: F.caveat, fontWeight: 700, fontSize: size, color: C.ink, opacity: iv(f - at, [0, 20], [0, 1]), filter: `blur(${iv(f - at, [0, 20], [6, 0])}px)`, lineHeight: 1.05}}>{text}</div>;
};

const S1: SceneFC = () => {
  const f = useCurrentFrame();
  return (
    <Paper>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Blob x={300} y={420} r={260} color={C.blue} at={0} op={0.35} />
        <Blob x={760} y={380} r={220} color="#A9B4C2" at={6} op={0.35} />
        {Array.from({length: 26}).map((_, i) => {
          const x = 120 + random(`rx${i}`) * 840;
          const y = ((f * (14 + random(`rv${i}`) * 8) + random(`ry${i}`) * 900) % 1000) + 300;
          return <line key={i} x1={x} y1={y} x2={x - 10} y2={y + 46} stroke={C.blue} strokeWidth={6} strokeLinecap="round" opacity={0.55} />;
        })}
      </svg>
      <Title text="Setelah hujan…" top={1080} at={10} size={120} />
    </Paper>
  );
};

const S2: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const spread = iv(f, [len * 0.25, len * 0.6], [0, 1], E.smooth);
  return (
    <Paper>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Blob x={170} y={300} r={140} color={C.yellow} at={0} op={0.7} />
        <line x1={170} y1={300} x2={540} y2={700} stroke={C.yellow} strokeWidth={22} strokeLinecap="round" opacity={iv(f, [6, 20], [0, 0.8])} filter="url(#wc)" />
        <Blob x={540} y={720} r={110} color="#BFE0F2" at={14} op={0.8} />
        <circle cx={540} cy={720} r={110 * iv(f, [14, 40], [0, 1])} fill="none" stroke={C.blue} strokeWidth={6} opacity={0.6} />
        {RAINBOW.map((c, i) => {
          const a = ((-30 + i * 9) * Math.PI) / 180;
          const L = 520 * spread;
          return <line key={c} x1={560} y1={740} x2={560 + Math.cos(a) * L} y2={740 + Math.sin(a) * L + 240 * spread} stroke={c} strokeWidth={26} strokeLinecap="round" opacity={0.75} filter="url(#wc)" />;
        })}
      </svg>
      <div style={{position: 'absolute', top: 1110, left: 0, right: 0, textAlign: 'center', fontFamily: F.playfair, fontWeight: 700, fontSize: 150, color: C.ink, opacity: iv(f, [len * 0.55, len * 0.7], [0, 1])}}>± 42°</div>
    </Paper>
  );
};

const S3: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const p = iv(f, [4, len * 0.55], [0, 1], E.smooth);
  return (
    <Paper>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Blob x={540} y={1260} r={520} color={C.green} at={0} op={0.35} />
        {RAINBOW.map((c, i) => {
          const r = 470 - i * 34;
          const L = Math.PI * r;
          return <path key={c} d={`M ${540 - r} 1140 A ${r} ${r} 0 0 1 ${540 + r} 1140`} fill="none" stroke={c} strokeWidth={36} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - p)} opacity={0.8} filter="url(#wc)" />;
        })}
        <Blob x={240} y={1150} r={150} color="#FFFFFF" at={len * 0.5} op={0.95} />
        <Blob x={860} y={1150} r={150} color="#FFFFFF" at={len * 0.55} op={0.95} />
      </svg>
      <Title text="pelangi pun melengkung" top={290} at={len * 0.45} size={100} />
      <div style={{position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', fontFamily: F.caveat, fontSize: 30, color: 'rgba(74,74,88,.45)'}}>contoh gaya cat air</div>
    </Paper>
  );
};

export const D25: React.FC = () => (
  <Shell id="25-cat-air" bg={C.paper} transition="fade" scenes={[S1, S2, S3]} musicVolume={0.16}
    caption={{font: F.caveat, color: C.ink, bg: 'rgba(255,255,255,.75)', size: 56, weight: 700, radius: 999}}
    sfx={[[{src: 'swoosh', at: 6, volume: 0.25}], [{src: 'swoosh', at: 6, volume: 0.25}, {src: 'ding', at: 60, volume: 0.25}], [{src: 'riser', at: 0, volume: 0.15}, {src: 'ding', at: 70, volume: 0.3}]]}
  />
);
