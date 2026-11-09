import {F, Shell, type SceneFC} from '../lib';
import {Hook} from '../kartun/scenes/Hook';
import {Payoff} from '../kartun/scenes/Payoff';
import {Scatter} from '../kartun/scenes/Scatter';
import {Sunlight} from '../kartun/scenes/Sunlight';
import type {SceneProps} from '../kartun/types';

// Adegan kartun memakai template skill apa adanya (bukti template langsung bisa dipakai).
const wrap = (C: React.FC<SceneProps>): SceneFC => ({len}) => (
  <C scene={{id: '', component: '', vo: null, durationInFrames: len, text: '', sfx: []}} durationInFrames={len} />
);

export const D01: React.FC = () => (
  <Shell
    id="01-kartun"
    bg="#0F1B33"
    transition="zoom"
    scenes={[wrap(Hook), wrap(Sunlight), wrap(Scatter), wrap(Payoff)]}
    caption={{font: F.nunito, color: '#FFF8EC', bg: 'rgba(10,18,36,.75)'}}
    sfx={[[{src: 'whoosh', at: 2}, {src: 'boing', at: 34}], [{src: 'riser', at: 6, volume: 0.3}, {src: 'ding', at: 36}], [{src: 'swoosh', at: 10}, {src: 'pop', at: 40}, {src: 'ding', at: 70}], [{src: 'whoosh', at: 0}, {src: 'pop', at: 55}]]}
  />
);
