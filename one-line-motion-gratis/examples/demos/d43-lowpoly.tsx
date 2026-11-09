import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E, F, Shell, iv, type SceneFC} from '../lib';

const C = {sky1: '#1E3A5F', sky2: '#3D7EA6', green: '#8FC1A9', snow: '#F1F5F2', sun: '#F4A259', rock: '#5B6C7A'};

// Gunung low-poly: tiap segitiga diberi warna sendiri (shading datar).
type Tri = [number, number, number, number, number, number, string];
const MOUNT: Tri[] = [
  [140, 1300, 380, 760, 520, 1300, '#4B5D6B'], [380, 760, 520, 1300, 560, 900, '#5E7180'],
  [560, 900, 520, 1300, 760, 1300, '#6D8291'], [380, 760, 540, 560, 560, 900, '#7E93A1'],
  [540, 560, 560, 900, 700, 820, '#93A7B4'], [700, 820, 560, 900, 760, 1300, '#5B6C7A'],
  [700, 820, 760, 1300, 980, 1300, '#4A5866'], [540, 560, 700, 820, 640, 600, '#A9BCC7'],
  [460, 680, 540, 560, 590, 650, C.snow], [540, 560, 640, 600, 590, 650, '#DDE6EA'],
  [0, 1300, 140, 1300, 220, 1080, '#3E6B5A'], [860, 1300, 1080, 1300, 1000, 1050, '#3E6B5A'],
];
const Mountain: React.FC<{grow: number; snow?: number}> = ({grow, snow = 1}) => (
  <g transform={`translate(540 1300) scale(1 ${grow}) translate(-540 -1300)`}>
    {MOUNT.map(([a, b, c, d, e, g, col], i) => <polygon key={i} points={`${a},${b} ${c},${d} ${e},${g}`} fill={col === C.snow || col === '#DDE6EA' ? (snow > 0.5 ? col : '#93A7B4') : col} stroke={col} strokeWidth={1} />)}
  </g>
);

const Sky: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `linear-gradient(${C.sky1}, ${C.sky2} 60%, #9CC5D9)`}}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <polygon points="140,260 220,300 200,380 120,390 80,320" fill={C.sun} />
        {[0, 1].map((i) => <polygon key={i} points={`${(i * 500 + f * 1.2) % 1400 - 200},${420 + i * 140} ${(i * 500 + f * 1.2) % 1400 - 60},${380 + i * 140} ${(i * 500 + f * 1.2) % 1400 + 80},${430 + i * 140}`} fill="rgba(241,245,242,.8)" />)}
        <rect x={0} y={1300} width={1080} height={620} fill="#2F5446" />
        {Array.from({length: 9}).map((_, i) => <polygon key={i} points={`${i * 130 - 20},1420 ${i * 130 + 50},1300 ${i * 130 + 120},1420`} fill={i % 2 ? '#3E6B5A' : '#467A65'} />)}
      </svg>
      {children}
    </AbsoluteFill>
  );
};

const Tag: React.FC<{text: string; top: number; at: number; size?: number}> = ({text, top, at, size = 76}) => {
  const f = useCurrentFrame();
  const p = iv(f - at, [0, 14], [0, 1], E.out);
  return <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', fontFamily: F.space, fontWeight: 700, fontSize: size, color: C.snow, opacity: p, transform: `translateY(${(1 - p) * 30}px)`, textShadow: '0 6px 20px rgba(0,0,0,.35)'}}>{text}</div>;
};

const S1: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  return (
    <Sky>
      <svg width={1080} height={1920} style={{position: 'absolute'}}><Mountain grow={iv(f, [0, len * 0.6], [0.05, 1], E.out)} /></svg>
      <Tag text="PAPUA" top={180} at={10} size={110} />
    </Sky>
  );
};

const S2: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const m = Math.round(iv(f, [8, len * 0.7], [0, 4884], E.out));
  return (
    <Sky>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Mountain grow={1} />
        <line x1={980} y1={1300} x2={980} y2={1300 - iv(f, [8, len * 0.7], [0, 740], E.out)} stroke={C.sun} strokeWidth={8} />
        <polygon points={`960,${1300 - iv(f, [8, len * 0.7], [0, 740], E.out)} 1000,${1300 - iv(f, [8, len * 0.7], [0, 740], E.out)} 980,${1270 - iv(f, [8, len * 0.7], [0, 740], E.out)}`} fill={C.sun} />
      </svg>
      <Tag text="Puncak Jaya" top={170} at={2} size={100} />
      <div style={{position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', fontFamily: F.space, fontWeight: 700, fontSize: 150, color: C.sun, fontVariantNumeric: 'tabular-nums', textShadow: '0 6px 20px rgba(0,0,0,.35)'}}>±{m.toLocaleString('id-ID')} m</div>
    </Sky>
  );
};

const S3: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const shrink = iv(f, [len * 0.35, len * 0.85], [1, 0.45], E.smooth);
  return (
    <Sky>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <g transform="translate(540 640) scale(2.2) translate(-540 -640)">
          <Mountain grow={1} snow={0} />
          <g transform={`translate(560 620) scale(${shrink}) translate(-560 -620)`}>
            <polygon points="460,680 540,560 590,650" fill={C.snow} /><polygon points="540,560 640,600 590,650" fill="#DDE6EA" />
          </g>
        </g>
      </svg>
      <Tag text="es abadi" top={1120} at={4} size={96} />
      <Tag text="kini terus menyusut" top={1230} at={len * 0.45} size={56} />
      <div style={{position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', fontFamily: F.space, fontSize: 24, color: 'rgba(241,245,242,.5)'}}>contoh gaya low-poly · ilustrasi</div>
    </Sky>
  );
};

export const D43: React.FC = () => (
  <Shell id="43-lowpoly" bg={C.sky1} transition="zoom" scenes={[S1, S2, S3]} musicVolume={0.17}
    caption={{font: F.space, color: C.sky1, bg: C.snow, size: 44, weight: 700, radius: 8}}
    sfx={[[{src: 'riser', at: 0, volume: 0.2}, {src: 'impact', at: 40, volume: 0.3}], [{src: 'whoosh', at: 8, volume: 0.25}, {src: 'ding', at: 90, volume: 0.3}], [{src: 'swoosh', at: 50, volume: 0.25}]]}
  />
);
