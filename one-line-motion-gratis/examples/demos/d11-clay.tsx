import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {E, F, Grain, Shell, iv, type SceneFC} from '../lib';

const C = {bg: '#F2E8DC', cloth: '#E8D5C0', orange: '#E9A15B', dark: '#C77B3A', pink: '#F4A6A6', teal: '#2A9D8F', yellow: '#E9C46A', ink: '#3D2B1F', white: '#FFF8F0'};
// Stop-motion 12 fps + "boiling": bentuk bergetar halus tiap langkah.
const useStop = () => Math.floor(useCurrentFrame() / 2.5) * 2.5;
const boil = (step: number, k: string, a = 3) => (random(`${k}${Math.floor(step)}`) - 0.5) * a;

// Gumpalan clay: gradasi radial + highlight + bayangan.
const Blob: React.FC<{cx: number; cy: number; rx: number; ry: number; color: string; dark: string; k: string; rot?: number}> = ({cx, cy, rx, ry, color, dark, k, rot = 0}) => {
  const st = useStop();
  return (
    <g transform={`translate(${cx + boil(st, k + 'x')} ${cy + boil(st, k + 'y')}) rotate(${rot})`}>
      <defs>
        <radialGradient id={`rg${k}`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity={0.55} />
          <stop offset="25%" stopColor={color} />
          <stop offset="100%" stopColor={dark} />
        </radialGradient>
      </defs>
      <ellipse rx={rx + boil(st, k + 'r', 4)} ry={ry + boil(st, k + 's', 4)} fill={`url(#rg${k})`} />
    </g>
  );
};

const Table: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: `radial-gradient(circle at 50% 30%, #FBF4EA, ${C.bg} 60%, ${C.cloth})`}}>
    {children}
    <Grain opacity={0.1} blend="multiply" />
  </AbsoluteFill>
);

const Cat: React.FC<{x: number; y: number; sleep: boolean; squash?: number}> = ({x, y, sleep, squash = 1}) => {
  const f = useCurrentFrame();
  const breath = sleep ? 1 + Math.sin(f / 14) * 0.03 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${breath / squash} ${breath * squash})`}>
      <ellipse cx={0} cy={150} rx={300} ry={40} fill="rgba(0,0,0,.12)" />
      <Blob cx={0} cy={40} rx={260} ry={130} color={C.orange} dark={C.dark} k="body" />
      <Blob cx={230} cy={90} rx={110} ry={34} color={C.orange} dark={C.dark} k="tail" rot={-20} />
      <Blob cx={-170} cy={-30} rx={120} ry={105} color={C.orange} dark={C.dark} k="head" />
      <path d="M -260 -90 L -240 -190 L -180 -120 Z" fill={C.dark} />
      <path d="M -140 -120 L -90 -200 L -70 -100 Z" fill={C.dark} />
      {sleep ? (
        <>
          <path d="M -230 -30 q 20 14 40 0" stroke={C.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
          <path d="M -150 -30 q 20 14 40 0" stroke={C.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx={-210} cy={-35} r={20} fill={C.ink} /><circle cx={-130} cy={-35} r={20} fill={C.ink} />
          <circle cx={-204} cy={-42} r={6} fill="#fff" /><circle cx={-124} cy={-42} r={6} fill="#fff" />
        </>
      )}
      <ellipse cx={-170} cy={10} rx={14} ry={10} fill={C.pink} />
    </g>
  );
};

const Zzz: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      {[0, 1, 2].map((i) => {
        const t = ((f + i * 25) % 75) / 75;
        return <text key={i} x={320 + t * 120 + i * 20} y={700 - t * 260} fontFamily={F.baloo} fontWeight={800} fontSize={70 + i * 20} fill={C.teal} opacity={Math.sin(t * Math.PI)}>z</text>;
      })}
    </>
  );
};

const Big: React.FC<{text: string; sub: string; delay: number; color?: string}> = ({text, sub, delay, color = C.teal}) => {
  const f = useStop();
  const s = iv(f - delay, [0, 10], [0, 1], E.back);
  return (
    <div style={{position: 'absolute', top: 1100, left: 0, right: 0, textAlign: 'center', transform: `scale(${s})`}}>
      <div style={{fontFamily: F.baloo, fontWeight: 800, fontSize: 150, color, lineHeight: 1, textShadow: `0 8px 0 rgba(0,0,0,.15)`}}>{text}</div>
      <div style={{fontFamily: F.baloo, fontWeight: 600, fontSize: 60, color: C.ink}}>{sub}</div>
    </div>
  );
};

const S1: SceneFC = () => (
  <Table>
    <svg width={1080} height={1920} style={{position: 'absolute'}}><Cat x={560} y={860} sleep /><Zzz /></svg>
    <Big text="12–16 jam" sub="tidur sehari" delay={14} />
  </Table>
);

const S2: SceneFC = ({len}) => {
  const f = useStop();
  const t = iv(f, [10, 34], [0, 1]);
  const jump = Math.sin(t * Math.PI);
  const squash = f < 10 ? iv(f, [0, 10], [1, 0.75]) : t < 1 ? 1.2 : iv(f, [34, 44], [0.7, 1], E.back);
  return (
    <Table>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Cat x={300 + t * 420} y={900 - jump * 380} sleep={false} squash={squash} />
        <g transform={`translate(860 ${560 + Math.sin(f / 3) * 6})`} opacity={iv(f, [30, 40], [0, 1])}>
          <path d="M 0 -120 L -70 20 L -10 20 L -40 140 L 70 -20 L 10 -20 L 40 -120 Z" fill={C.yellow} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
        </g>
      </svg>
      <Big text="⚡ singkat" sub="energi untuk berburu" delay={Math.min(40, len - 30)} color={C.dark} />
    </Table>
  );
};

const S3: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const charge = iv(f, [10, len - 20], [0.15, 1]);
  return (
    <Table>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Cat x={540} y={900} sleep />
        <Zzz />
        <g transform="translate(540 440)">
          <rect x={-170} y={-80} width={320} height={160} rx={36} fill={C.white} stroke={C.ink} strokeWidth={12} />
          <rect x={150} y={-34} width={30} height={68} rx={10} fill={C.ink} />
          <rect x={-150} y={-60} width={280 * charge} height={120} rx={22} fill={charge > 0.8 ? '#5BBF6A' : C.yellow} />
        </g>
      </svg>
      <Big text="isi baterai" sub="bukan malas!" delay={20} />
    </Table>
  );
};

export const D11: React.FC = () => (
  <Shell id="11-clay" bg={C.bg} transition="zoom" scenes={[S1, S2, S3]}
    caption={{font: F.baloo, color: C.white, bg: C.teal, size: 54, weight: 800, radius: 999}}
    sfx={[[{src: 'pop', at: 14}], [{src: 'boing', at: 8}, {src: 'impact', at: 34, volume: 0.3}, {src: 'pop', at: 40}], [{src: 'riser', at: 10, volume: 0.25}, {src: 'ding', at: 100}]]}
  />
);
