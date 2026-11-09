import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {E, F, Shell, iv, useSp, type SceneFC} from '../lib';

const C = {sky1: '#14002B', sky2: '#3C096C', pink: '#FF006E', orange: '#FB5607', blue: '#3A86FF', cyan: '#00F5FF', white: '#FFF5FF'};

// Latar synthwave: matahari bergaris + grid lantai yang terus melaju + scanline.
const Synth: React.FC<{children: React.ReactNode; sunY?: number}> = ({children, sunY = 760}) => {
  const f = useCurrentFrame();
  const off = (f * 6) % 80;
  return (
    <AbsoluteFill style={{background: `linear-gradient(${C.sky1}, ${C.sky2} 55%, #240046)`}}>
      <svg width={1080} height={1920} style={{position: 'absolute', filter: `drop-shadow(0 0 60px ${C.pink})`}}>
        <defs>
          <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFD166" /><stop offset="45%" stopColor={C.orange} /><stop offset="100%" stopColor={C.pink} /></linearGradient>
          <mask id="bands">
            <rect width={1080} height={1920} fill="#fff" />
            {Array.from({length: 7}).map((_, i) => <rect key={i} x={0} y={sunY + 10 + i * 34 + i * i * 2} width={1080} height={6 + i * 3} fill="#000" />)}
          </mask>
        </defs>
        <circle cx={540} cy={sunY} r={250} fill="url(#sun)" mask="url(#bands)" />
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1000, bottom: 0, perspective: 500, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: -1000, right: -1000, top: 0, height: 3000, transform: 'rotateX(72deg)', transformOrigin: 'top', backgroundImage: `linear-gradient(${C.pink} 3px, transparent 3px), linear-gradient(90deg, ${C.pink} 3px, transparent 3px)`, backgroundSize: '80px 80px', backgroundPosition: `0 ${off}px`, boxShadow: `inset 0 200px 200px ${C.sky2}`}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 996, height: 8, background: C.pink, boxShadow: `0 0 30px ${C.pink}`}} />
      {children}
      <AbsoluteFill style={{background: 'repeating-linear-gradient(transparent 0 3px, rgba(0,0,0,.18) 3px 5px)', pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};

const Neon: React.FC<{text: string; size: number; color: string; top: number; delay?: number; font?: string}> = ({text, size, color, top, delay = 0, font = F.space}) => {
  const f = useCurrentFrame();
  const on = f >= delay && !(f - delay < 10 && random('fl' + f) > 0.6);
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', fontFamily: font, fontWeight: 700, fontSize: size, color: on ? C.white : 'transparent', textShadow: on ? `0 0 10px ${color}, 0 0 30px ${color}, 0 0 60px ${color}` : 'none', letterSpacing: '0.02em'}}>
      {text}
    </div>
  );
};

const Floppy: React.FC<{x: number; y: number; s: number; rot?: number}> = ({x, y, s, rot = 0}) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
    <path d="M -100 -100 L 80 -100 L 100 -80 L 100 100 L -100 100 Z" fill="#1A1033" stroke={C.cyan} strokeWidth={6} style={{filter: `drop-shadow(0 0 10px ${C.cyan})`}} />
    <rect x={-55} y={-100} width={110} height={65} fill="none" stroke={C.cyan} strokeWidth={5} />
    <rect x={20} y={-90} width={22} height={45} fill={C.cyan} />
    <rect x={-70} y={10} width={140} height={90} rx={6} fill="none" stroke={C.pink} strokeWidth={5} />
  </g>
);

const S1: SceneFC = () => {
  const s = useSp(0, {damping: 10, stiffness: 120});
  const f = useCurrentFrame();
  return (
    <Synth sunY={1300}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}><Floppy x={540} y={560} s={2.4 * s} rot={Math.sin(f / 20) * 4} /></svg>
      <Neon text="1,44 MB" size={170} color={C.cyan} top={900} delay={14} />
      <Neon text="SATU DISKET" size={54} color={C.pink} top={1100} delay={24} />
    </Synth>
  );
};

const S2: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const n = Math.round(iv(f, [20, len * 0.8], [0, 89000], E.out));
  return (
    <Synth sunY={1300}>
      <div style={{position: 'absolute', left: 390, top: 240, width: 300, height: 560, borderRadius: 50, border: `8px solid ${C.cyan}`, boxShadow: `0 0 30px ${C.cyan}, inset 0 0 30px ${C.cyan}`, display: 'grid', placeItems: 'center', fontFamily: F.space, fontWeight: 700, fontSize: 80, color: C.white, textShadow: `0 0 20px ${C.cyan}`}}>128<br />GB</div>
      <Neon text="=" size={110} color={C.pink} top={820} delay={10} />
      <Neon text={`≈ ${n.toLocaleString('id-ID')}`} size={140} color={C.pink} top={950} delay={20} />
      <Neon text="DISKET" size={54} color={C.cyan} top={1120} delay={30} />
    </Synth>
  );
};

// Tinggi Monas (132 m) dalam skala tumpukan disket (293 m = 952 px).
const MON = Math.round((132 / 293) * 952);

const S3: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const h = iv(f, [5, len * 0.7], [0, 1], E.out);
  const meters = Math.round(h * 293);
  const stack = Math.floor(h * 34);
  return (
    <Synth sunY={1300}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        {Array.from({length: stack}).map((_, i) => <rect key={i} x={330 + Math.sin(i * 1.7) * 6} y={1180 - i * 28} width={200} height={24} fill="#1A1033" stroke={C.cyan} strokeWidth={3} />)}
        {/* siluet Monas 132 m untuk perbandingan skala */}
        <g transform="translate(780 1180)">
          <path d={`M -80 0 L 80 0 L 55 -70 L -55 -70 Z M -14 -70 L 14 -70 L 10 -${MON} L -10 -${MON} Z`} fill="rgba(255,0,110,.35)" stroke={C.pink} strokeWidth={8} strokeLinejoin="round" style={{filter: `drop-shadow(0 0 12px ${C.pink})`}} />
          <path d={`M 0 -${MON} q -26 -30 0 -64 q 26 34 0 64`} fill={C.orange} />
          <text x={0} y={-MON - 90} fill={C.white} fontFamily={F.space} fontWeight={700} fontSize={44} textAnchor="middle" style={{filter: `drop-shadow(0 0 8px ${C.pink})`}}>Monas 132 m</text>
        </g>
      </svg>
      <Neon text={`${meters} m`} size={150} color={C.cyan} top={150} delay={0} />
      <Neon text="≈ 2× TINGGI MONAS" size={64} color={C.pink} top={330} delay={len * 0.6} />
    </Synth>
  );
};

export const D12: React.FC = () => (
  <Shell id="12-retro" bg={C.sky1} transition="zoom" scenes={[S1, S2, S3]} musicVolume={0.16}
    caption={{font: F.space, color: C.white, bg: 'rgba(20,0,43,.8)', size: 44, weight: 700, border: `2px solid ${C.pink}`, radius: 8}}
    sfx={[[{src: 'whoosh', at: 0}, {src: 'click', at: 14}], [{src: 'swoosh', at: 0}, {src: 'riser', at: 20, volume: 0.25}, {src: 'ding', at: 100}], [{src: 'riser', at: 0, volume: 0.25}, {src: 'impact', at: 120, volume: 0.35}]]}
  />
);
