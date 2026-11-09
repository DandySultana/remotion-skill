import {AbsoluteFill, Audio, Sequence, Series, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {scenes as registry} from './scenes';
import {Caption} from './components/Caption';
import {theme} from './theme';
import type {Timeline} from './types';

const Music: React.FC<{src: string; volume: number; timeline: Timeline}> = ({src, volume, timeline}) => {
  const frame = useCurrentFrame();
  // Ducking: musik turun saat ada VO, naik di sela adegan tanpa VO.
  let start = 0;
  let speaking = false;
  for (const s of timeline.scenes) {
    if (frame >= start && frame < start + s.durationInFrames) speaking = Boolean(s.vo);
    start += s.durationInFrames;
  }
  const fadeOut = interpolate(frame, [start - 45, start], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <Audio src={staticFile(src)} volume={(speaking ? volume : volume * 2) * fadeOut} />;
};

export const Video: React.FC<{timeline: Timeline}> = ({timeline}) => (
  <AbsoluteFill style={{backgroundColor: theme.palette.bg}}>
    <Series>
      {timeline.scenes.map((scene) => {
        const Scene = registry[scene.component] ?? registry.Fallback;
        return (
          <Series.Sequence key={scene.id} durationInFrames={scene.durationInFrames} name={scene.id}>
            <Scene scene={scene} durationInFrames={scene.durationInFrames} />
            {scene.vo ? <Audio src={staticFile(scene.vo)} /> : null}
            {scene.sfx.map((s, i) => (
              <Sequence key={i} from={s.at} layout="none">
                <Audio src={staticFile(s.src)} volume={s.volume ?? 0.6} />
              </Sequence>
            ))}
            {theme.captions && scene.text ? <Caption text={scene.text} durationInFrames={scene.durationInFrames} /> : null}
          </Series.Sequence>
        );
      })}
    </Series>
    {timeline.music ? <Music src={timeline.music.src} volume={timeline.music.volume ?? 0.15} timeline={timeline} /> : null}
  </AbsoluteFill>
);
