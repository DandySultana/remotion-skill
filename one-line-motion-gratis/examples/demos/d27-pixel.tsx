import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {F, Shell, type SceneFC} from '../lib';

const C = {bg: '#1A1C2C', purple: '#5D275D', red: '#B13E53', orange: '#EF7D57', yellow: '#FFCD75', green: '#38B764', teal: '#257179', sky: '#41A6F6', white: '#F4F4F4', grey: '#566C86'};
const P = 20; // ukuran satu piksel
// Frame dibulatkan ke 10 fps supaya gerak terasa seperti game lama.
const useStep = () => Math.floor(useCurrentFrame() / 3);

// Gambar dari peta karakter: tiap huruf = satu warna.
const Sprite: React.FC<{map: string[]; pal: Record<string, string>; x: number; y: number; px?: number}> = ({map, pal, x, y, px = P}) => (
  <g transform={`translate(${Math.round(x / px) * px} ${Math.round(y / px) * px})`}>
    {map.flatMap((row, r) => row.split('').map((ch, c) => (pal[ch] ? <rect key={`${r}-${c}`} x={c * px} y={r * px} width={px} height={px} fill={pal[ch]} /> : null)))}
  </g>
);

const HERO = ['..rrrr..', '.rrrrrr.', '.ssskks.', 'sskssks.', '.ssssss.', '..bbbb..', '.bbbbbb.', 'sbbyybbs', '..bb.bb.', '.kk...kk'];
const HERO_PAL = {r: C.green, s: '#F2C9A0', k: C.bg, b: C.purple, y: C.yellow}; // karakter orisinal, bukan tiruan tokoh game
const COIN = ['.yy.', 'yooy', 'yooy', '.yy.'];

const Pixels: React.FC<{text: string; top: number; size?: number; color?: string; shadow?: string}> = ({text, top, size = 110, color = C.white, shadow = C.red}) => (
  <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', fontFamily: F.space, fontWeight: 700, fontSize: size, color, textShadow: `8px 8px 0 ${shadow}`, letterSpacing: '0.04em'}}>{text}</div>
);

const Ground: React.FC<{scroll?: number}> = ({scroll = 0}) => (
  <svg width={1080} height={1920} style={{position: 'absolute'}}>
    {Array.from({length: 60}).map((_, i) => {
      const x = ((i * 60 - scroll * 20) % 1200 + 1200) % 1200 - 60;
      return <g key={i}><rect x={x} y={1180} width={60} height={60} fill={C.green} /><rect x={x} y={1240} width={60} height={160} fill={C.teal} /><rect x={x + 6} y={1186} width={48} height={8} fill="#73EFF7" opacity={0.35} /></g>;
    })}
  </svg>
);

const S1: SceneFC = () => {
  const s = useStep();
  const kb = [64, 128, 256].map((v, i) => s > 4 + i * 3);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <div style={{position: 'absolute', top: 260, left: 140, right: 140, border: `${P}px solid ${C.grey}`, background: '#0F1020', height: 520, padding: 40}}>
        <div style={{fontFamily: F.space, fontWeight: 700, fontSize: 52, color: C.green}}>MEMORI:</div>
        {kb.map((on, i) => on ? <div key={i} style={{fontFamily: F.space, fontWeight: 700, fontSize: 86, color: i === 0 ? C.yellow : C.grey, textDecoration: i === 0 ? 'none' : 'line-through'}}>{[2, 4, 8][i]} KB</div> : null)}
      </div>
      <Pixels text="SANGAT KECIL" top={900} color={C.yellow} />
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        {s % 2 ? <rect x={860} y={300} width={P} height={P * 3} fill={C.green} /> : null}
      </svg>
    </AbsoluteFill>
  );
};

const S2: SceneFC = ({len}) => {
  const s = useStep();
  const shown = Math.min(HERO.length * 8, Math.floor(s * 2.2));
  const zoomOut = s > len / 3 * 0.55;
  const px = zoomOut ? 26 : 70;
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        {HERO.flatMap((row, r) => row.split('').map((ch, c) => {
          const idx = r * 8 + c;
          const col = (HERO_PAL as Record<string, string>)[ch];
          if (!col || idx > shown) return null;
          const ox = 540 - 4 * px, oy = (zoomOut ? 380 : 180);
          return <rect key={idx} x={ox + c * px} y={oy + r * px} width={px - (zoomOut ? 0 : 4)} height={px - (zoomOut ? 0 : 4)} fill={col} />;
        }))}
        {!zoomOut ? null : <rect x={540 - 4 * 26 - 40} y={340} width={8 * 26 + 80} height={10 * 26 + 80} fill="none" stroke={C.white} strokeWidth={6} strokeDasharray="20 14" />}
      </svg>
      <Pixels text="= PIKSEL" top={zoomOut ? 760 : 940} size={zoomOut ? 120 : 100} color={C.sky} />
      <div style={{position: 'absolute', top: zoomOut ? 930 : 1080, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 12}}>
        {[C.red, C.orange, C.yellow, C.green, C.sky, C.purple].map((c) => <div key={c} style={{width: 70, height: 70, background: c, border: `6px solid ${C.white}`}} />)}
      </div>
    </AbsoluteFill>
  );
};

const S3: SceneFC = ({len}) => {
  const s = useStep();
  const jump = Math.abs(Math.sin(s / 2.2)) * 160;
  const score = Math.min(9999, s * 137);
  return (
    <AbsoluteFill style={{background: `linear-gradient(${C.purple}, ${C.bg})`}}>
      <div style={{position: 'absolute', top: 70, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', fontFamily: F.space, fontWeight: 700, fontSize: 46, color: C.white}}>
        <span>SKOR {String(score).padStart(4, '0')}</span><span style={{color: C.red}}>♥♥♥</span>
      </div>
      <Pixels text="PIXEL ART" top={260} size={150} color={C.yellow} />
      <Pixels text="MASIH DICINTA" top={440} size={80} color={C.white} shadow={C.purple} />
      <Ground scroll={s} />
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        {[0, 1, 2, 3].map((i) => <Sprite key={i} map={COIN} pal={{y: C.yellow, o: C.orange}} x={((i * 300 + 900 - s * 20) % 1200 + 1200) % 1200 - 100} y={860} px={16} />)}
        <Sprite map={HERO} pal={HERO_PAL} x={300} y={980 - jump} px={20} />
      </svg>
      <div style={{position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', fontFamily: F.space, fontSize: 24, color: 'rgba(244,244,244,.4)'}}>contoh gaya pixel 8-bit</div>
      {void len}
    </AbsoluteFill>
  );
};

export const D27: React.FC = () => (
  <Shell id="27-pixel" bg={C.bg} transition="cut" scenes={[S1, S2, S3]} musicVolume={0.18}
    caption={{font: F.space, color: C.white, bg: C.bg, size: 46, weight: 700, radius: 0, border: `6px solid ${C.white}`}}
    sfx={[[{src: 'click', at: 15}, {src: 'click', at: 24}, {src: 'click', at: 33}], [{src: 'typing', at: 0, volume: 0.3}, {src: 'ding', at: 90}], [{src: 'boing', at: 10}, {src: 'pop', at: 40}, {src: 'pop', at: 70}, {src: 'ding', at: 100}]]}
  />
);
