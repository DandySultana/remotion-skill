import {Easing} from 'remotion';
import brand from '../brand.json';
import {loadBrandFont} from './fonts';

// Satu-satunya sumber gaya. Video ke-10 konsisten dengan video ke-1 karena semua adegan membaca dari sini.
export const theme = {
  ...brand,
  fonts: {
    display: loadBrandFont(brand.font.display),
    body: loadBrandFont(brand.font.body),
  },
  ease: {
    in: Easing.bezier(0.33, 1, 0.68, 1),
    out: Easing.bezier(0.32, 0, 0.67, 0),
    smooth: Easing.bezier(0.65, 0, 0.35, 1),
  },
  spring: {
    pop: {damping: 13, stiffness: 160, mass: 0.8},
    soft: {damping: 30, stiffness: 90},
  },
  stagger: 4,
};
