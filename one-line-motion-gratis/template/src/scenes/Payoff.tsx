import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {Camera} from '../components/Camera';
import {KineticText} from '../components/KineticText';
import {Pop} from '../components/Pop';
import {theme} from '../theme';
import type {SceneProps} from '../types';

// Langit "terisi" biru dari bawah, tokoh kecil mendongak, lalu CTA.
export const Payoff: React.FC<SceneProps> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const fill = interpolate(frame, [0, 40], [0, 1], {easing: theme.ease.in, extrapolateRight: 'clamp'});
  const look = interpolate(frame, [20, 34], [0, -18], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const gx = width / 2;
  const gy = height * 0.6;
  return (
    <Background from="#6EC6FF" to="#1E5BB8">
      <AbsoluteFill style={{background: theme.palette.bg, transform: `translateY(${-fill * 100}%)`}} />
      <Camera durationInFrames={durationInFrames} push={1.05}>
        <AbsoluteFill>
          <svg width={width} height={height}>
            <ellipse cx={gx} cy={height * 0.72} rx={width * 0.8} ry={height * 0.1} fill="#5BBF6A" stroke={theme.palette.shadow} strokeWidth={theme.stroke} />
            <g transform={`translate(${gx} ${gy})`}>
              <rect x={-55} y={0} width={110} height={170} rx={50} fill={theme.palette.accent} stroke={theme.palette.shadow} strokeWidth={theme.stroke} />
              <g transform={`rotate(${look})`}>
                <circle cy={-60} r={78} fill="#FFD9B3" stroke={theme.palette.shadow} strokeWidth={theme.stroke} />
                <circle cx={-26} cy={-78} r={10} fill={theme.palette.shadow} />
                <circle cx={26} cy={-78} r={10} fill={theme.palette.shadow} />
                <ellipse cx={0} cy={-30} rx={16} ry={20} fill={theme.palette.shadow} />
              </g>
            </g>
          </svg>
        </AbsoluteFill>
        <AbsoluteFill style={{alignItems: 'center', paddingTop: height * 0.16}}>
          <div style={{width: width * 0.86}}>
            <KineticText text="Birunya ada di *mana-mana!" size={130} delay={18} />
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: height * 0.12}}>
          <Pop delay={55}>
            <div
              style={{
                fontFamily: theme.fonts.display,
                fontWeight: 800,
                fontSize: 60,
                color: theme.palette.shadow,
                background: theme.palette.primary,
                padding: '18px 44px',
                borderRadius: 999,
                border: `${theme.stroke}px solid ${theme.palette.shadow}`,
                transform: `scale(${1 + Math.sin(frame / 6) * 0.03})`,
              }}
            >
              Follow untuk fakta lain
            </div>
          </Pop>
        </AbsoluteFill>
      </Camera>
    </Background>
  );
};
