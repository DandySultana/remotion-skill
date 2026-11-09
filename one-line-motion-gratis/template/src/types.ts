export type Sfx = {src: string; at: number; volume?: number};

export type SceneData = {
  id: string;
  component: string;
  vo: string | null;
  durationInFrames: number;
  text: string;
  sfx: Sfx[];
};

export type Timeline = {
  fps: number;
  width: number;
  height: number;
  music: {src: string; volume?: number} | null;
  scenes: SceneData[];
};

export type SceneProps = {
  scene: SceneData;
  durationInFrames: number;
};
