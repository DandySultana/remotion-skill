import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// WebGL lewat ANGLE: dibutuhkan adegan 3D (@remotion/three), aman untuk adegan 2D.
Config.setChromiumOpenGlRenderer('angle');
