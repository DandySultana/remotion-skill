import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {BigNumber} from '../components/BigNumber';
import {Camera} from '../components/Camera';
import {KineticText} from '../components/KineticText';
import {Pop} from '../components/Pop';
import {theme} from '../theme';
import type {SceneProps} from '../types';

const MOLECULES = 9;
const PHOTONS = 36;

export const Scatter: React.FC<SceneProps> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const fieldTop = height * 0.14;
  const fieldH = height * 0.34;
  const mol = Array.from({length: MOLECULES}).map((_, i) => ({
    // Grid 3x3 dengan sedikit acak: tersebar rata tapi tetap terlihat alami.
    x: width * (0.2 + 0.3 * (i % 3) + 0.1 * (random(`mx${i}`) - 0.5)) + Math.sin(frame / 15 + i) * 18,
    y: fieldTop + fieldH * (0.18 + 0.32 * Math.floor(i / 3) + 0.1 * (random(`my${i}`) - 0.5)) + Math.cos(frame / 13 + i) * 18,
  }));
  const redX = interpolate(frame, [10, 70], [-100, width + 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Background>
      <Camera durationInFrames={durationInFrames} push={1.07}>
        <AbsoluteFill>
          <svg width={width} height={height}>
            <line x1={-100} y1={fieldTop + fieldH * 0.5} x2={redX} y2={fieldTop + fieldH * 0.5} stroke="#FF4D4D" strokeWidth={14} strokeLinecap="round" opacity={0.85} />
            {Array.from({length: PHOTONS}).map((_, i) => {
              const m = mol[i % MOLECULES];
              // Dipancarkan terus-menerus (siklus 36 frame) supaya hamburan terlihat sepanjang adegan.
              const start = 16 + (i % 12) * 3;
              const t = frame < start ? 0 : ((frame - start) % 36) + 1;
              const a = random(`a${i}-${Math.floor((frame - start) / 36)}`) * Math.PI * 2;
              const d = t * 8;
              return (
                <circle
                  key={i}
                  cx={m.x + Math.cos(a) * d}
                  cy={m.y + Math.sin(a) * d}
                  r={12}
                  fill={theme.palette.cool}
                  opacity={t === 0 ? 0 : interpolate(d, [0, 290], [1, 0], {extrapolateRight: 'clamp'})}
                />
              );
            })}
            {mol.map((m, i) => (
              <g key={i} transform={`translate(${m.x} ${m.y})`}>
                <circle r={34} fill={theme.palette.ink} stroke={theme.palette.shadow} strokeWidth={theme.stroke} />
                <circle cx={40} cy={-6} r={24} fill={theme.palette.ink} stroke={theme.palette.shadow} strokeWidth={theme.stroke} />
              </g>
            ))}
          </svg>
        </AbsoluteFill>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: height * 0.31}}>
          <Pop delay={40}>
            <div style={{display: 'flex', alignItems: 'baseline', gap: 24}}>
              <span style={{fontFamily: theme.fonts.display, fontWeight: 800, fontSize: 90, color: theme.palette.ink}}>±</span>
              <BigNumber to={5} suffix="×" size={260} delay={44} duration={24} />
            </div>
          </Pop>
          <div style={{width: width * 0.8}}>
            <KineticText text="*biru lebih tersebar" size={84} delay={60} />
          </div>
        </AbsoluteFill>
      </Camera>
    </Background>
  );
};
