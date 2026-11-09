import {Composition} from 'remotion';
import {Video} from './Video';
import timeline from './timeline.json';
import type {Timeline} from './types';

const t = timeline as Timeline;
const total = t.scenes.reduce((sum, s) => sum + s.durationInFrames, 0);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Video"
      component={Video}
      durationInFrames={Math.max(total, 1)}
      fps={t.fps}
      width={t.width}
      height={t.height}
      defaultProps={{timeline: t}}
    />
    {/* Versi lain dari naskah yang sama: tukar width/height, atur ulang tata letak di adegan via useVideoConfig(). */}
    <Composition
      id="Video-16x9"
      component={Video}
      durationInFrames={Math.max(total, 1)}
      fps={t.fps}
      width={1920}
      height={1080}
      defaultProps={{timeline: t}}
    />
  </>
);
