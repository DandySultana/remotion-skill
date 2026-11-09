import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {E, F, Grain, Shell, iv, useSp, type SceneFC} from '../lib';

const C = {bg: '#0B1E2D', bg2: '#123047', chalk: '#E8F1F2', cyan: '#5CE1E6', yellow: '#FFD166', red: '#FF6B6B'};

const Board: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: `radial-gradient(circle at 50% 35%, ${C.bg2}, ${C.bg})`}}>
    <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 2px, transparent 2px 60px), repeating-linear-gradient(90deg, rgba(255,255,255,.04) 0 2px, transparent 2px 60px)'}} />
    {children}
    <Grain opacity={0.1} />
  </AbsoluteFill>
);

// Garis kapur yang menggambar dirinya sendiri.
const Chalk: React.FC<{d: string; len: number; delay: number; dur?: number; color?: string; w?: number}> = ({d, len, delay, dur = 18, color = C.chalk, w = 7}) => {
  const f = useCurrentFrame();
  const p = iv(f - delay, [0, dur], [0, 1], E.out);
  return <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />;
};

const Label: React.FC<{x: number; y: number; text: string; delay: number; size?: number; color?: string}> = ({x, y, text, delay, size = 60, color = C.chalk}) => {
  const f = useCurrentFrame();
  return <text x={x} y={y} fill={color} fontFamily={F.caveat} fontWeight={700} fontSize={size} textAnchor="middle" opacity={iv(f - delay, [0, 10], [0, 1])}>{text}</text>;
};

const Block: React.FC<{cx: number; cy: number; size: number; color: string}> = ({cx, cy, size, color}) => (
  <rect x={cx - size / 2} y={cy - size / 2} width={size} height={size} rx={14} fill={color} fillOpacity={0.25} stroke={color} strokeWidth={7} />
);

const S1: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const shrink = iv(f, [30, 70], [300, 240], E.smooth);
  const grow = iv(f, [len * 0.45, len * 0.45 + 40], [300, 360], E.smooth);
  return (
    <Board>
      <svg width={1080} height={1920}>
        <Label x={300} y={420} text="benda lain" delay={4} />
        <Label x={780} y={420} text="air" delay={14} color={C.cyan} />
        <Block cx={300} cy={700} size={shrink} color={C.chalk} />
        <Block cx={780} cy={700} size={grow} color={C.cyan} />
        {[[-1, 0], [1, 0], [0, -1], [0, 1]].map(([dx, dy], i) => (
          <g key={i}>
            <Chalk d={`M ${300 + dx * 230} ${700 + dy * 230} L ${300 + dx * 160} ${700 + dy * 160}`} len={80} delay={40 + i * 3} />
            <Chalk d={`M ${780 + dx * 170} ${700 + dy * 170} L ${780 + dx * 250} ${700 + dy * 250}`} len={90} delay={len * 0.45 + 10 + i * 3} color={C.cyan} />
          </g>
        ))}
        <Label x={300} y={1010} text="menyusut" delay={60} color={C.yellow} />
        <Label x={780} y={1010} text="mengembang!" delay={len * 0.45 + 30} color={C.yellow} />
        <Chalk d="M 540 520 L 540 900" len={380} delay={8} w={4} color="rgba(232,241,242,.4)" />
      </svg>
    </Board>
  );
};

// Molekul air: O merah + dua H putih.
const H2O: React.FC<{x: number; y: number; r: number}> = ({x, y, r}) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <circle cx={-26} cy={20} r={15} fill={C.chalk} />
    <circle cx={26} cy={20} r={15} fill={C.chalk} />
    <circle r={28} fill={C.red} />
  </g>
);

const S2: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const p = iv(f, [10, len * 0.55], [0, 1], E.smooth);
  // Kisi heksagonal (seperti sarang lebah) sebagai posisi akhir.
  const lattice: [number, number][] = [];
  for (let row = 0; row < 5; row++) for (let col = 0; col < 5; col++) lattice.push([240 + col * 150 + (row % 2) * 75, 330 + row * 130]);
  const pct = Math.round(iv(f, [len * 0.55, len * 0.8], [0, 9]));
  return (
    <Board>
      <svg width={1080} height={1920}>
        {lattice.map(([lx, ly], i) => {
          const rx = 160 + random('x' + i) * 760 + Math.sin(f / 6 + i) * 20 * (1 - p);
          const ry = 300 + random('y' + i) * 560 + Math.cos(f / 5 + i) * 20 * (1 - p);
          return <H2O key={i} x={rx + (lx - rx) * p} y={ry + (ly - ry) * p} r={(1 - p) * random('r' + i) * 360} />;
        })}
        {lattice.map(([lx, ly], i) => {
          const n = lattice[i + 1];
          if (!n || (i + 1) % 5 === 0) return null;
          return <line key={'l' + i} x1={lx} y1={ly} x2={n[0]} y2={n[1]} stroke={C.cyan} strokeWidth={4} strokeDasharray="8 10" opacity={iv(p, [0.85, 1], [0, 0.8])} />;
        })}
        <Label x={540} y={1010} text="kisi berongga" delay={len * 0.4} color={C.cyan} size={66} />
      </svg>
      <AbsoluteFill style={{top: 1090, alignItems: 'center'}}>
        <div style={{fontFamily: F.space, fontWeight: 700, fontSize: 200, color: C.yellow, opacity: f > len * 0.55 ? 1 : 0}}>+{pct}%</div>
        <div style={{fontFamily: F.caveat, fontWeight: 700, fontSize: 64, color: C.chalk, opacity: f > len * 0.6 ? 1 : 0}}>volume bertambah</div>
      </AbsoluteFill>
    </Board>
  );
};

const S3: SceneFC = () => {
  const f = useCurrentFrame();
  const drop = useSp(4, {damping: 9, stiffness: 70});
  const bob = Math.sin(f / 12) * 8;
  const iceY = 300 + drop * 290 + bob;
  return (
    <Board>
      <svg width={1080} height={1920}>
        <Chalk d="M 260 380 L 300 1060 Q 305 1100 345 1100 L 735 1100 Q 775 1100 780 1060 L 820 380" len={1900} delay={0} dur={20} />
        <path d={`M 278 640 Q 400 ${630 + Math.sin(f / 8) * 8} 540 640 T 802 640 L 780 1060 Q 775 1090 740 1090 L 340 1090 Q 305 1090 300 1060 Z`} fill={C.cyan} fillOpacity={0.22} />
        <g transform={`translate(540 ${iceY}) rotate(${Math.sin(f / 15) * 4})`}>
          <rect x={-110} y={-90} width={220} height={180} rx={22} fill={C.chalk} fillOpacity={0.85} stroke={C.cyan} strokeWidth={6} />
          <path d="M -70 -50 L -20 -50" stroke={C.cyan} strokeWidth={8} strokeLinecap="round" />
        </g>
        <Label x={880} y={560} text="es" delay={30} color={C.chalk} size={64} />
        <Label x={880} y={620} text="0,92 g/cm³" delay={34} color={C.yellow} size={52} />
        <Label x={880} y={880} text="air" delay={40} color={C.cyan} size={64} />
        <Label x={880} y={940} text="1,00 g/cm³" delay={44} color={C.yellow} size={52} />
      </svg>
      <AbsoluteFill style={{top: 1170, alignItems: 'center'}}>
        <div style={{fontFamily: F.caveat, fontWeight: 700, fontSize: 104, color: C.chalk, opacity: iv(f, [50, 64], [0, 1])}}>lebih ringan = <span style={{color: C.yellow}}>mengapung</span></div>
      </AbsoluteFill>
    </Board>
  );
};

export const D04: React.FC = () => (
  <Shell id="04-sains" bg={C.bg} transition="wipe" scenes={[S1, S2, S3]}
    caption={{font: F.space, color: C.chalk, bg: 'rgba(5,15,25,.8)', size: 46, weight: 500, border: `2px solid ${C.cyan}`}}
    sfx={[[{src: 'click', at: 4}, {src: 'swoosh', at: 40}], [{src: 'riser', at: 10, volume: 0.25}, {src: 'ding', at: 120}], [{src: 'pop', at: 10}, {src: 'ding', at: 52}]]}
  />
);
