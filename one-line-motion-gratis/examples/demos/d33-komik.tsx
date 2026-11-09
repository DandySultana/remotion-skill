import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, F, Shell, iv, useSp, type SceneFC} from '../lib';

const C = {paper: '#FFFFFF', ink: '#111111', yellow: '#FFD23F', pink: '#EE4266', teal: '#3BCEAC', blue: '#3A86FF', skin: '#FFD3B0'};

const Dots: React.FC<{color: string}> = ({color}) => <AbsoluteFill style={{backgroundImage: `radial-gradient(${color} 26%, transparent 28%)`, backgroundSize: '22px 22px', opacity: 0.35}} />;

// Panel komik yang masuk dengan sedikit hentakan.
const Panel: React.FC<{x: number; y: number; w: number; h: number; at: number; bg: string; children: React.ReactNode; rot?: number}> = ({x, y, w, h, at, bg, children, rot = 0}) => {
  const s = useSp(at, {damping: 12, stiffness: 200});
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, background: bg, border: `10px solid ${C.ink}`, overflow: 'hidden', transform: `scale(${s}) rotate(${rot}deg)`, opacity: Math.min(1, s * 3), boxShadow: `10px 10px 0 ${C.ink}`}}>
      <Dots color="rgba(0,0,0,.25)" />
      {children}
    </div>
  );
};

const Bubble: React.FC<{text: string; x: number; y: number; at: number; w?: number}> = ({text, x, y, at, w = 380}) => {
  const s = useSp(at, {damping: 10, stiffness: 220});
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, background: '#fff', border: `6px solid ${C.ink}`, borderRadius: 40, padding: '18px 24px', fontFamily: F.nunito, fontWeight: 800, fontSize: 40, color: C.ink, textAlign: 'center', transform: `scale(${s})`, transformOrigin: 'bottom left', lineHeight: 1.15}}>
      {text}
      <div style={{position: 'absolute', left: 50, bottom: -34, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `34px solid ${C.ink}`}} />
    </div>
  );
};

const Fx: React.FC<{text: string; x: number; y: number; at: number; color: string; size?: number; rot?: number}> = ({text, x, y, at, color, size = 170, rot = -10}) => {
  const f = useCurrentFrame();
  const p = iv(f - at, [0, 6], [0, 1], E.out);
  return <div style={{position: 'absolute', left: x, top: y, fontFamily: F.anton, fontSize: size, color, WebkitTextStroke: `8px ${C.ink}`, paintOrder: 'stroke', transform: `scale(${2 - p}) rotate(${rot}deg)`, opacity: p, textShadow: `8px 8px 0 ${C.ink}`}}>{text}</div>;
};

// Orang sederhana di depan laptop.
const Worker: React.FC<{x: number; y: number; mood: 'happy' | 'shock' | 'sad'; screen: string}> = ({x, y, mood, screen}) => (
  <svg width={600} height={600} style={{position: 'absolute', left: x, top: y}} viewBox="0 0 600 600">
    <circle cx={300} cy={190} r={110} fill={C.skin} stroke={C.ink} strokeWidth={8} />
    <path d="M 195 160 Q 300 40 405 160 Q 360 110 300 115 Q 240 110 195 160 Z" fill={C.ink} />
    {mood === 'shock' ? <><circle cx={260} cy={190} r={20} fill="#fff" stroke={C.ink} strokeWidth={6} /><circle cx={340} cy={190} r={20} fill="#fff" stroke={C.ink} strokeWidth={6} /><ellipse cx={300} cy={250} rx={24} ry={30} fill={C.ink} /></>
      : <><circle cx={260} cy={190} r={10} fill={C.ink} /><circle cx={340} cy={190} r={10} fill={C.ink} /><path d={mood === 'happy' ? 'M 260 240 Q 300 275 340 240' : 'M 260 260 Q 300 230 340 260'} stroke={C.ink} strokeWidth={8} fill="none" strokeLinecap="round" /></>}
    <path d="M 160 600 L 190 330 L 410 330 L 440 600 Z" fill={C.blue} stroke={C.ink} strokeWidth={8} />
    <path d="M 120 470 L 480 470 L 520 540 L 80 540 Z" fill="#9AA3AF" stroke={C.ink} strokeWidth={8} />
    <rect x={150} y={330} width={300} height={150} rx={10} fill={screen} stroke={C.ink} strokeWidth={8} />
  </svg>
);

const S1: SceneFC = ({len}) => (
  <AbsoluteFill style={{background: C.yellow}}>
    <Panel x={60} y={140} w={960} h={560} at={0} bg="#CDE7FF">
      <Worker x={180} y={-10} mood="happy" screen="#E8F4FF" />
      <Bubble text="Dikit lagi beres…" x={520} y={60} at={8} w={360} />
    </Panel>
    <Panel x={60} y={760} w={960} h={560} at={len * 0.4} bg="#2A2A2A" rot={1}>
      <Worker x={180} y={-10} mood="shock" screen="#111" />
    </Panel>
    <Fx text="PET!" x={560} y={820} at={Math.floor(len * 0.48)} color={C.pink} />
  </AbsoluteFill>
);

const S2: SceneFC = ({len}) => (
  <AbsoluteFill style={{background: C.pink}}>
    <Panel x={60} y={200} w={960} h={760} at={0} bg="#E6E6E6">
      <Worker x={180} y={120} mood="sad" screen="#CFD6DE" />
      <Bubble text="File-ku… hilang semua?!" x={330} y={40} at={8} w={420} />
    </Panel>
    <Fx text="3 JAM" x={120} y={1000} at={Math.floor(len * 0.45)} color={C.yellow} size={190} rot={-6} />
    <Fx text="HILANG" x={430} y={1190} at={Math.floor(len * 0.55)} color="#fff" size={150} rot={4} />
  </AbsoluteFill>
);

const Key: React.FC<{label: string; at: number; w?: number}> = ({label, at, w = 260}) => {
  const f = useCurrentFrame();
  const down = f > at && f < at + 8;
  const s = useSp(at - 12, {damping: 12, stiffness: 180});
  return <div style={{width: w, height: 220, background: '#fff', border: `10px solid ${C.ink}`, borderRadius: 34, display: 'grid', placeItems: 'center', fontFamily: F.anton, fontSize: 110, color: C.ink, boxShadow: down ? `0 4px 0 ${C.ink}` : `0 18px 0 ${C.ink}`, transform: `translateY(${down ? 14 : 0}px) scale(${s})`}}>{label}</div>;
};

const S3: SceneFC = ({len}) => (
  <AbsoluteFill style={{background: C.teal}}>
    <Dots color="rgba(0,0,0,.2)" />
    <div style={{position: 'absolute', top: 240, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}>
      <Key label="Ctrl" at={Math.floor(len * 0.25)} w={340} />
      <div style={{fontFamily: F.anton, fontSize: 120, color: C.ink}}>+</div>
      <Key label="S" at={Math.floor(len * 0.3)} />
    </div>
    <Fx text="AMAN!" x={260} y={620} at={Math.floor(len * 0.38)} color={C.yellow} size={200} rot={-4} />
    <Panel x={130} y={940} w={820} h={300} at={len * 0.6} bg="#fff">
      <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: F.nunito, fontWeight: 800, fontSize: 52, color: C.ink, textAlign: 'center', padding: 30}}>atau nyalakan<br />simpan otomatis ✓</div>
    </Panel>
    <div style={{position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', fontFamily: F.nunito, fontSize: 26, color: 'rgba(17,17,17,.5)'}}>contoh gaya panel komik</div>
  </AbsoluteFill>
);

export const D33: React.FC = () => (
  <Shell id="33-komik" bg={C.yellow} transition="zoom" scenes={[S1, S2, S3]} musicVolume={0.16}
    caption={{font: F.nunito, color: C.ink, bg: '#fff', size: 46, weight: 800, radius: 18, border: `5px solid ${C.ink}`}}
    sfx={[[{src: 'pop', at: 8}, {src: 'impact', at: 36, volume: 0.45}], [{src: 'boing', at: 8}, {src: 'impact', at: 50, volume: 0.35}, {src: 'impact', at: 62, volume: 0.35}], [{src: 'click', at: 30}, {src: 'click', at: 36}, {src: 'ding', at: 44}, {src: 'pop', at: 70}]]}
  />
);
