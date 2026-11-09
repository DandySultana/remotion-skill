import {AbsoluteFill} from 'remotion';
import {Background} from '../components/Background';
import {Camera} from '../components/Camera';
import {KineticText} from '../components/KineticText';
import type {SceneProps} from '../types';

export const Fallback: React.FC<SceneProps> = ({scene, durationInFrames}) => (
  <Background>
    <Camera durationInFrames={durationInFrames}>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 120}}>
        <KineticText text={scene.text} size={90} />
      </AbsoluteFill>
    </Camera>
  </Background>
);
