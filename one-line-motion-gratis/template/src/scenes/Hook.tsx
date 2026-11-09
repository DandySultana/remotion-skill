import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {Camera} from '../components/Camera';
import {KineticText} from '../components/KineticText';
import {Pop, usePop} from '../components/Pop';
import {theme} from '../theme';
import type {SceneProps} from '../types';
import {Sun} from './Sun';

export const Hook: React.FC<SceneProps> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const vertical = height > width;
  const sunIn = usePop(2);
  const bob = Math.sin(frame / 8) * 14;
  return (
    <Background>
      <Camera durationInFrames={durationInFrames} push={1.08}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: vertical ? 'flex-start' : 'center', paddingTop: vertical ? height * 0.13 : 0}}>
          <div style={{transform: `translateY(${(1 - sunIn) * -400 + bob}px)`, marginBottom: 40}}>
            <Sun size={vertical ? 280 : 220} />
          </div>
          <div style={{width: width * 0.86}}>
            <KineticText text="Kenapa langit warnanya *biru?" size={vertical ? 128 : 110} delay={6} />
          </div>
          <Pop delay={34} style={{marginTop: 10}}>
            <div
              style={{
                fontSize: vertical ? 180 : 140,
                fontFamily: theme.fonts.display,
                fontWeight: 800,
                color: theme.palette.accent,
                transform: `rotate(${interpolate(Math.sin(frame / 6), [-1, 1], [-12, 12])}deg)`,
              }}
            >
              ?
            </div>
          </Pop>
        </AbsoluteFill>
      </Camera>
    </Background>
  );
};
