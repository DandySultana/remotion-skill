import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, F, Shell, iv, useSp, type SceneFC} from '../lib';

const C = {bg: '#FFFFFF', ink: '#1A1A1A', accent: '#FF5A36', grey: '#BDBDBD'};

// Figur garis. pose: sudut sendi dalam derajat.
type Pose = {lean?: number; armL?: number; armR?: number; head?: number};
const Stick: React.FC<{x: number; y: number; s?: number; pose?: Pose; eyes?: 'open' | 'tired' | 'happy'}> = ({x, y, s = 1, pose = {}, eyes = 'open'}) => {
  const {lean = 0, armL = 200, armR = 160, head = 0} = pose;
  const arm = (a: number) => {
    const r = (a * Math.PI) / 180;
    return `M 0 -150 L ${Math.cos(r) * 120} ${-150 + Math.sin(r) * 120}`;
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${lean})`} stroke={C.ink} strokeWidth={12} strokeLinecap="round" fill="none">
      <circle cx={0} cy={-260} r={60} fill="#fff" transform={`rotate(${head} 0 -200)`} />
      {eyes === 'tired' ? <><path d="M -28 -262 l 18 0 M 10 -262 l 18 0" /><path d="M -20 -230 q 20 -8 40 0" /></>
        : eyes === 'happy' ? <><path d="M -30 -258 q 10 -12 20 0 M 10 -258 q 10 -12 20 0" /><path d="M -22 -232 q 22 18 44 0" /></>
        : <><circle cx={-20} cy={-262} r={5} fill={C.ink} /><circle cx={20} cy={-262} r={5} fill={C.ink} /></>}
      <path d="M 0 -200 L 0 0" />
      <path d={arm(armL)} /><path d={arm(armR)} />
      <path d="M 0 0 L -60 150 M 0 0 L 60 150" />
    </g>
  );
};

const Laptop: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g transform={`translate(${x} ${y})`} stroke={C.ink} strokeWidth={10} strokeLinejoin="round">
    <rect x={-150} y={-180} width={300} height={190} rx={12} fill="#F4F4F4" />
    <path d="M -190 10 L 190 10 L 220 50 L -220 50 Z" fill="#E0E0E0" />
  </g>
);

const Big: React.FC<{text: string; top: number; at: number; color?: string; size?: number}> = ({text, top, at, color = C.ink, size = 110}) => {
  const s = useSp(at, {damping: 12, stiffness: 180});
  return <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', fontFamily: F.inter, fontWeight: 900, fontSize: size, color, transform: `scale(${s})`, letterSpacing: '-0.02em'}}>{text}</div>;
};

const S1: SceneFC = () => {
  const f = useCurrentFrame();
  const droop = iv(f, [0, 60], [0, 14], E.smooth);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Stick x={430} y={900} pose={{lean: droop, armL: 20, armR: 10, head: droop}} eyes="tired" />
        <Laptop x={680} y={830} />
        <path d="M 120 1050 L 960 1050" stroke={C.ink} strokeWidth={10} />
        {[0, 1, 2].map((i) => <text key={i} x={500 + i * 40} y={560 - ((f + i * 20) % 60)} fontFamily={F.inter} fontWeight={900} fontSize={60} fill={C.grey} opacity={1 - ((f + i * 20) % 60) / 60}>z</text>)}
      </svg>
      <Big text="seharian di laptop?" top={1180} at={10} size={84} />
    </AbsoluteFill>
  );
};

// Tiga angka 20-6-20 muncul bergantian.
const S2: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const step = f < len * 0.33 ? 0 : f < len * 0.62 ? 1 : 2;
  const look = iv(f, [len * 0.33, len * 0.45], [0, 1], E.smooth);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Stick x={260} y={980} s={0.8} pose={{armL: 200, armR: step === 0 ? 300 : -20, head: look * -10}} />
        <path d="M 330 770 L 900 770" stroke={C.accent} strokeWidth={8} strokeDasharray="20 18" opacity={look} />
        <g transform="translate(900 760)" opacity={look}>
          <circle r={70} fill="none" stroke={C.ink} strokeWidth={10} />
          <path d="M -40 70 L -50 220 M 40 70 L 50 220" stroke={C.ink} strokeWidth={10} />
        </g>
      </svg>
      <div style={{position: 'absolute', top: 160, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 30}}>
        {[['20', 'menit'], ['6', 'meter'], ['20', 'detik']].map(([n, u], i) => (
          <div key={u} style={{textAlign: 'center', opacity: i <= step ? 1 : 0.15, transform: `scale(${i === step ? 1.08 : 1})`}}>
            <div style={{fontFamily: F.inter, fontWeight: 900, fontSize: 150, color: i === step ? C.accent : C.ink, lineHeight: 1}}>{n}</div>
            <div style={{fontFamily: F.inter, fontWeight: 700, fontSize: 40, color: C.ink}}>{u}</div>
          </div>
        ))}
      </div>
      <Big text={['tiap 20 menit', 'lihat sejauh 6 m', 'selama 20 detik'][step]} top={1200} at={0} size={80} />
    </AbsoluteFill>
  );
};

const S3: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Stick x={540} y={1000} pose={{armL: 230 + Math.sin(f / 5) * 20, armR: -50 - Math.sin(f / 5) * 20}} eyes="happy" />
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d="M 0 -30 L 8 -8 L 30 0 L 8 8 L 0 30 L -8 8 L -30 0 L -8 -8 Z" fill={C.accent} transform={`translate(${300 + i * 120} ${500 + Math.sin(f / 6 + i) * 20}) scale(${iv(f, [10 + i * 5, 20 + i * 5], [0, 1], E.back)})`} />)}
      </svg>
      <Big text="mata rileks" top={1180} at={len * 0.2} color={C.accent} size={110} />
      <div style={{position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', fontFamily: F.inter, fontSize: 24, color: '#AAA'}}>contoh gaya stickman</div>
    </AbsoluteFill>
  );
};

export const D34: React.FC = () => (
  <Shell id="34-stickman" bg={C.bg} transition="cut" scenes={[S1, S2, S3]} musicVolume={0.15}
    caption={{font: F.inter, color: '#fff', bg: C.ink, size: 46, weight: 800, radius: 8}}
    sfx={[[{src: 'boing', at: 30, volume: 0.3}], [{src: 'pop', at: 0}, {src: 'pop', at: 60}, {src: 'pop', at: 110}], [{src: 'pop', at: 10}, {src: 'pop', at: 20}, {src: 'ding', at: 40}]]}
  />
);
