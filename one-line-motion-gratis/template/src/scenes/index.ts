import type {SceneProps} from '../types';
import {Fallback} from './Fallback';
import {Hook} from './Hook';
import {Payoff} from './Payoff';
import {Scatter} from './Scatter';
import {Sunlight} from './Sunlight';

// Nama di sini = nilai "component" di timeline.json.
export const scenes: Record<string, React.FC<SceneProps>> = {Fallback, Hook, Sunlight, Scatter, Payoff};
