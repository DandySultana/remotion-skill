import {loadFont as anton} from '@remotion/google-fonts/Anton';
import {loadFont as baloo} from '@remotion/google-fonts/Baloo2';
import {loadFont as caveat} from '@remotion/google-fonts/Caveat';
import {loadFont as inter} from '@remotion/google-fonts/Inter';
import {loadFont as nunito} from '@remotion/google-fonts/Nunito';
import {loadFont as playfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as spaceGrotesk} from '@remotion/google-fonts/SpaceGrotesk';

// Tambah font baru: import loader-nya di sini lalu daftarkan namanya persis seperti di Google Fonts.
const loaders: Record<string, () => {fontFamily: string}> = {
  Anton: () => anton('normal', {weights: ['400'], subsets: ['latin']}),
  'Baloo 2': () => baloo('normal', {weights: ['600', '800'], subsets: ['latin']}),
  Caveat: () => caveat('normal', {weights: ['500', '700'], subsets: ['latin']}),
  Inter: () => inter('normal', {weights: ['400', '700', '900'], subsets: ['latin']}),
  Nunito: () => nunito('normal', {weights: ['600', '800'], subsets: ['latin']}),
  'Playfair Display': () => playfair('normal', {weights: ['500', '700'], subsets: ['latin']}),
  'Space Grotesk': () => spaceGrotesk('normal', {weights: ['500', '700'], subsets: ['latin']}),
};

export const loadBrandFont = (name: string): string => {
  const load = loaders[name];
  if (!load) throw new Error(`Font "${name}" belum didaftarkan di src/fonts.ts`);
  return load().fontFamily;
};
