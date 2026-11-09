import {loadFont as anton} from '@remotion/google-fonts/Anton';
import {loadFont as baloo} from '@remotion/google-fonts/Baloo2';
import {loadFont as caveat} from '@remotion/google-fonts/Caveat';
import {loadFont as inter} from '@remotion/google-fonts/Inter';
import {loadFont as nunito} from '@remotion/google-fonts/Nunito';
import {loadFont as playfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as space} from '@remotion/google-fonts/SpaceGrotesk';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {DEMOS} from '../config';
import timing from '../timing.json';

export const F = {
  anton: anton('normal', {weights: ['400'], subsets: ['latin']}).fontFamily,
  baloo: baloo('normal', {weights: ['600', '800'], subsets: ['latin']}).fontFamily,
  caveat: caveat('normal', {weights: ['500', '700'], subsets: ['latin']}).fontFamily,
  inter: inter('normal', {weights: ['300', '500', '800', '900'], subsets: ['latin']}).fontFamily,
  nunito: nunito('normal', {weights: ['700', '800'], subsets: ['latin']}).fontFamily,
  playfair: playfair('normal', {weights: ['400', '700'], subsets: ['latin']}).fontFamily,
  space: space('normal', {weights: ['500', '700'], subsets: ['latin']}).fontFamily,
};

export const E = {
  out: Easing.bezier(0.33, 1, 0.68, 1),
  in: Easing.bezier(0.32, 0, 0.67, 0),
  smooth: Easing.bezier(0.65, 0, 0.35, 1),
  back: Easing.bezier(0.34, 1.56, 0.64, 1),
};

// interpolate yang selalu di-clamp.
export const iv = (f: number, inR: number[], outR: number[], easing?: (t: number) => number) =>
  interpolate(f, inR, outR, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});

export const useSp = (delay = 0, cfg: {damping?: number; stiffness?: number; mass?: number} = {damping: 13, stiffness: 150}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: cfg});
};

export const Grain: React.FC<{opacity?: number; blend?: React.CSSProperties['mixBlendMode']}> = ({opacity = 0.07, blend = 'overlay'}) => {
  const f = useCurrentFrame();
  const seed = Math.floor(f / 2) % 40;
  return (
    <AbsoluteFill style={{opacity, mixBlendMode: blend, pointerEvents: 'none'}}>
      <svg width="100%" height="100%">
        <filter id={`g${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.45}) => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,${strength}) 100%)`, pointerEvents: 'none'}} />
);

// Kata masuk berurutan. Kata berawalan * diberi warna aksen.
export const Words: React.FC<{
  text: string;
  size: number;
  font: string;
  color: string;
  accent: string;
  delay?: number;
  stagger?: number;
  weight?: number;
  mode?: 'pop' | 'rise' | 'fade' | 'type';
  align?: 'center' | 'left';
  shadow?: string;
  lineHeight?: number;
  letterSpacing?: string;
  upper?: boolean;
}> = ({text, size, font, color, accent, delay = 0, stagger = 4, weight = 800, mode = 'pop', align = 'center', shadow, lineHeight = 1.05, letterSpacing, upper}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: `0 ${size * 0.26}px`, fontFamily: font, fontWeight: weight, fontSize: size, lineHeight, color, textAlign: align, letterSpacing, textTransform: upper ? 'uppercase' : undefined, textShadow: shadow}}>
      {words.map((w, i) => {
        const d = delay + i * stagger;
        const isAccent = w.startsWith('*');
        const word = isAccent ? w.slice(1) : w;
        let style: React.CSSProperties = {};
        if (mode === 'pop') {
          const s = spring({frame: f - d, fps, config: {damping: 12, stiffness: 160}});
          style = {transform: `translateY(${(1 - s) * size * 0.5}px) scale(${0.5 + 0.5 * s}) rotate(${(1 - s) * (i % 2 ? 10 : -10)}deg)`, opacity: Math.min(1, s * 2)};
        } else if (mode === 'rise') {
          const p = iv(f - d, [0, 18], [0, 1], E.out);
          style = {transform: `translateY(${(1 - p) * size * 0.4}px)`, opacity: p, filter: `blur(${(1 - p) * 8}px)`};
        } else if (mode === 'fade') {
          style = {opacity: iv(f - d, [0, 20], [0, 1])};
        } else {
          const shown = Math.floor(iv(f - d, [0, word.length * 1.6], [0, word.length]));
          return (
            <span key={i} style={{color: isAccent ? accent : undefined}}>
              {word.slice(0, shown)}
              <span style={{opacity: 0}}>{word.slice(shown)}</span>
            </span>
          );
        }
        return (
          <span key={i} style={{display: 'inline-block', color: isAccent ? accent : undefined, ...style}}>
            {word}
          </span>
        );
      })}
    </div>
  );
};

export type CaptionStyle = {font: string; color: string; bg: string; size?: number; radius?: number; weight?: number; border?: string; upper?: boolean; bottom?: number};
export type SfxCue = {src: string; at: number; volume?: number};
export type Transition = 'cut' | 'fade' | 'wipe' | 'zoom' | 'slide' | 'iris';

const T = 12;

const Enter: React.FC<{kind: Transition; first: boolean; children: React.ReactNode}> = ({kind, first, children}) => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  if (first || kind === 'cut') return <AbsoluteFill>{children}</AbsoluteFill>;
  const p = iv(f, [0, T], [0, 1], E.smooth);
  const style: React.CSSProperties =
    kind === 'fade' ? {opacity: p}
    : kind === 'wipe' ? {clipPath: `inset(0 0 0 ${(1 - p) * 100}%)`}
    : kind === 'zoom' ? {opacity: p, transform: `scale(${1.25 - 0.25 * p})`}
    : kind === 'slide' ? {transform: `translateY(${(1 - p) * height}px)`}
    : {clipPath: `circle(${p * Math.hypot(width, height) * 0.6}px at 50% 45%)`};
  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

const chunk = (text: string, n: number) => {
  const w = text.split(/\s+/);
  const out: string[] = [];
  for (let i = 0; i < w.length; i += n) out.push(w.slice(i, i + n).join(' '));
  return out;
};

const Caption: React.FC<{text: string; len: number; style: CaptionStyle}> = ({text, len, style}) => {
  const f = useCurrentFrame();
  const {height} = useVideoConfig();
  const parts = chunk(text, 4);
  const total = parts.reduce((n, p) => n + p.length, 0);
  const usable = len - 10;
  let start = 0;
  let cur = '';
  let local = 0;
  for (const p of parts) {
    const l = (p.length / total) * usable;
    if (f >= start && f < start + l) { cur = p; local = f - start; }
    start += l;
  }
  if (!cur) return null;
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: height * (style.bottom ?? 0.2)}}>
      <div style={{fontFamily: style.font, fontWeight: style.weight ?? 800, fontSize: style.size ?? 52, color: style.color, background: style.bg, border: style.border, padding: '12px 28px', borderRadius: style.radius ?? 16, maxWidth: '86%', textAlign: 'center', textTransform: style.upper ? 'uppercase' : undefined, transform: `scale(${iv(local, [0, 5], [0.88, 1], E.out)})`, lineHeight: 1.2}}>
        {cur}
      </div>
    </AbsoluteFill>
  );
};

export type SceneFC = React.FC<{len: number}>;

// Kerangka demo: adegan sesuai timing VO, transisi, subtitle, VO, musik (ducking), SFX.
export const Shell: React.FC<{
  id: string;
  scenes: SceneFC[];
  bg: string;
  transition?: Transition;
  caption?: CaptionStyle | null;
  sfx?: SfxCue[][];
  musicVolume?: number;
  overlay?: React.ReactNode;
}> = ({id, scenes, bg, transition = 'fade', caption, sfx = [], musicVolume = 0.13, overlay}) => {
  const t = (timing as Record<string, {vo: string; durationInFrames: number; starts: number[]}>)[id];
  const cfg = DEMOS.find((d) => d.id === id)!;
  const f = useCurrentFrame();
  const end = t.durationInFrames;
  const music = iv(f, [0, 10, end - 40, end], [0, musicVolume, musicVolume, 0]);
  return (
    <AbsoluteFill style={{background: bg}}>
      {scenes.map((Scene, i) => {
        const from = t.starts[i];
        const to = i + 1 < scenes.length ? t.starts[i + 1] : end;
        const len = to - from;
        return (
          <Sequence key={i} from={from} durationInFrames={len + (i + 1 < scenes.length ? T : 0)} name={`adegan ${i + 1}`}>
            <Enter kind={transition} first={i === 0}>
              <Scene len={len} />
            </Enter>
            {(sfx[i] ?? []).map((s, k) => (
              <Sequence key={k} from={s.at} layout="none">
                <Audio src={staticFile(`sfx/${s.src}.wav`)} volume={s.volume ?? 0.5} />
              </Sequence>
            ))}
          </Sequence>
        );
      })}
      {overlay}
      {caption
        ? scenes.map((_, i) => {
            const from = t.starts[i];
            const to = i + 1 < scenes.length ? t.starts[i + 1] : end - 20;
            return (
              <Sequence key={`c${i}`} from={from} durationInFrames={to - from} layout="none">
                <Caption text={cfg.sentences[i]} len={to - from} style={caption} />
              </Sequence>
            );
          })
        : null}
      <Audio src={staticFile(t.vo)} />
      <Audio src={staticFile(`music/${cfg.music}.wav`)} volume={music} loop />
    </AbsoluteFill>
  );
};
