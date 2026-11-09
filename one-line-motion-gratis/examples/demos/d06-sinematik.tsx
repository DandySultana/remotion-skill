import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {E, F, Grain, Shell, Vignette, iv, type SceneFC} from '../lib';

const C = {deep: '#03060F', teal: '#0B2A3A', orange: '#FF9A3C', gold: '#FFD38A', text: '#F3EFE6'};

// Bintang 3 lapis parallax: lapisan depan bergerak lebih cepat.
const Stars: React.FC<{drift: number}> = ({drift}) => (
  <svg width={1080} height={1920} style={{position: 'absolute'}}>
    {[0, 1, 2].map((layer) =>
      Array.from({length: 70 - layer * 20}).map((_, i) => {
        const x = (random(`x${layer}${i}`) * 1300 - drift * (layer + 1) * 0.6) % 1300;
        return <circle key={`${layer}-${i}`} cx={x < -100 ? x + 1300 : x} cy={random(`y${layer}${i}`) * 1920} r={0.8 + layer * 1.1} fill="#fff" opacity={0.35 + layer * 0.25 + Math.sin(drift / 7 + i) * 0.1} />;
      }),
    )}
  </svg>
);

const Sun: React.FC<{x: number; y: number; r: number}> = ({x, y, r}) => (
  <>
    <div style={{position: 'absolute', left: x - r * 4, top: y - r * 4, width: r * 8, height: r * 8, borderRadius: '50%', background: `radial-gradient(circle, rgba(255,170,80,.45), transparent 65%)`}} />
    <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: `radial-gradient(circle at 40% 40%, #FFF3D0, ${C.orange} 60%, #E0641E)`, boxShadow: `0 0 ${r}px ${C.orange}`}} />
  </>
);

const Earth: React.FC<{x: number; y: number; r: number}> = ({x, y, r}) => (
  <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', overflow: 'hidden', background: 'radial-gradient(circle at 35% 35%, #6EC6FF, #1B4F8A 60%, #071A33)', boxShadow: `inset -${r * 0.4}px -${r * 0.2}px ${r * 0.5}px rgba(0,0,0,.7), 0 0 ${r * 0.4}px rgba(110,198,255,.5)`}}>
    <div style={{position: 'absolute', left: '20%', top: '30%', width: '35%', height: '25%', borderRadius: '50%', background: 'rgba(90,170,110,.8)'}} />
    <div style={{position: 'absolute', left: '55%', top: '55%', width: '25%', height: '20%', borderRadius: '50%', background: 'rgba(90,170,110,.7)'}} />
  </div>
);

const Space: React.FC<{len: number; push?: number; children: React.ReactNode}> = ({len, push = 1.08, children}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 70% 30%, ${C.teal}, ${C.deep} 70%)`}}>
      <AbsoluteFill style={{transform: `scale(${iv(f, [0, len], [1, push], E.smooth)})`}}>
        <Stars drift={f} />
        {children}
      </AbsoluteFill>
      <Grain opacity={0.06} />
      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};

const Title: React.FC<{top: string; main: string; delay: number; color?: string}> = ({top, main, delay, color = C.text}) => {
  const f = useCurrentFrame();
  const p = iv(f - delay, [0, 24], [0, 1], E.out);
  return (
    <div style={{position: 'absolute', top: 1060, left: 0, right: 0, textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 20}px)`, filter: `blur(${(1 - p) * 8}px)`}}>
      <div style={{fontFamily: F.inter, fontWeight: 300, fontSize: 40, letterSpacing: '0.3em', color: C.gold}}>{top}</div>
      <div style={{fontFamily: F.playfair, fontSize: 104, color, marginTop: 10, lineHeight: 1.1}}>{main}</div>
    </div>
  );
};

const S1: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const km = Math.round(iv(f, [20, len - 10], [0, 150], E.out));
  const line = iv(f, [10, 50], [0, 1], E.smooth);
  return (
    <Space len={len}>
      <Sun x={820} y={420} r={110} />
      <Earth x={220} y={860} r={70} />
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <line x1={260} y1={820} x2={260 + (720 - 260) * line} y2={820 - (820 - 470) * line} stroke={C.gold} strokeWidth={3} strokeDasharray="10 14" />
      </svg>
      <Title top="JARAK BUMI–MATAHARI" main={`${km} juta km`} delay={14} />
    </Space>
  );
};

const S2: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  const p = iv(f, [10, len - 10], [0, 1], E.smooth);
  const secs = Math.round(p * 500);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  const x = 820 + (220 - 820) * p;
  const y = 420 + (860 - 420) * p;
  return (
    <Space len={len} push={1.05}>
      <Sun x={820} y={420} r={110} />
      <Earth x={220} y={860} r={70} />
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <line x1={820} y1={420} x2={x} y2={y} stroke={C.gold} strokeWidth={6} opacity={0.5} />
        <circle cx={x} cy={y} r={18} fill="#FFF6DA" style={{filter: 'drop-shadow(0 0 20px #FFD38A)'}} />
      </svg>
      <div style={{position: 'absolute', top: 1040, left: 0, right: 0, textAlign: 'center', fontFamily: F.inter, fontWeight: 300, fontSize: 200, color: C.text, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em'}}>
        {mm}:{ss}
      </div>
      <div style={{position: 'absolute', top: 1280, left: 0, right: 0, textAlign: 'center', fontFamily: F.inter, fontSize: 40, letterSpacing: '0.3em', color: C.gold}}>PERJALANAN CAHAYA</div>
    </Space>
  );
};

const S3: SceneFC = ({len}) => {
  const f = useCurrentFrame();
  return (
    <Space len={len} push={1.12}>
      <Sun x={540} y={480} r={iv(f, [0, len], [120, 150])} />
      <div style={{position: 'absolute', left: -300, right: -300, top: 1500, height: 1400, borderRadius: '50%', background: 'radial-gradient(circle at 50% 0%, #2E6FB5, #0B2747 40%, #020812 70%)', boxShadow: '0 -30px 80px rgba(110,198,255,.35)'}} />
      <Title top="YANG KAMU LIHAT" main="8 menit yang lalu" delay={20} color={C.gold} />
    </Space>
  );
};

export const D06: React.FC = () => (
  <Shell id="06-sinematik" bg={C.deep} transition="fade" scenes={[S1, S2, S3]} musicVolume={0.22}
    caption={{font: F.inter, color: C.text, bg: 'rgba(0,0,0,.45)', size: 42, weight: 500, radius: 999}}
    sfx={[[{src: 'riser', at: 0, volume: 0.25}], [{src: 'whoosh', at: 10, volume: 0.3}], [{src: 'impact', at: 18, volume: 0.45}]]}
  />
);
