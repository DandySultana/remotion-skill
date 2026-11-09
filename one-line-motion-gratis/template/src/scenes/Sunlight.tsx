import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {Camera} from '../components/Camera';
import {KineticText} from '../components/KineticText';
import {theme} from '../theme';
import type {SceneProps} from '../types';
import {Sun} from './Sun';

const RAINBOW = ['#FF4D4D', '#FF9F43', '#FFD93D', '#6BCB77', '#4D96FF', '#3D5AFE', '#9B5DE5'];

export const Sunlight: React.FC<SceneProps> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const cx = width / 2;
  const top = height * 0.17;
  const beamEnd = height * 0.38;
  const beam = interpolate(frame, [8, 30], [0, 1], {easing: theme.ease.in, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fan = interpolate(frame, [34, 60], [0, 1], {easing: theme.ease.in, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Background>
      <Camera durationInFrames={durationInFrames} push={1.05}>
        <AbsoluteFill>
          <svg width={width} height={height}>
            <line x1={cx} y1={top} x2={cx} y2={top + (beamEnd - top) * beam} stroke="#FFFFFF" strokeWidth={46} strokeLinecap="round" />
            {RAINBOW.map((c, i) => {
              const angle = ((i - 3) * 9 * Math.PI) / 180;
              const len = height * 0.2 * fan;
              return (
                <line
                  key={c}
                  x1={cx}
                  y1={beamEnd}
                  x2={cx + Math.sin(angle) * len}
                  y2={beamEnd + Math.cos(angle) * len}
                  stroke={c}
                  strokeWidth={30}
                  strokeLinecap="round"
                  opacity={fan > 0 ? 1 : 0}
                />
              );
            })}
            <polygon
              points={`${cx},${beamEnd - 90} ${cx - 90},${beamEnd + 60} ${cx + 90},${beamEnd + 60}`}
              fill="rgba(255,255,255,0.25)"
              stroke={theme.palette.ink}
              strokeWidth={theme.stroke}
              strokeLinejoin="round"
              transform={`rotate(${Math.sin(frame / 20) * 3} ${cx} ${beamEnd})`}
            />
          </svg>
        </AbsoluteFill>
        <AbsoluteFill style={{alignItems: 'center', paddingTop: height * 0.04}}>
          <Sun size={180} />
        </AbsoluteFill>
        <AbsoluteFill style={{alignItems: 'center', paddingTop: height * 0.62}}>
          <div style={{width: width * 0.8}}>
            <KineticText text="Putih = *semua warna" size={96} delay={40} />
          </div>
        </AbsoluteFill>
      </Camera>
    </Background>
  );
};
