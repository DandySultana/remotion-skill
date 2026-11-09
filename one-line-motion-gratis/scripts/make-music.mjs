#!/usr/bin/env node
// Musik latar bebas lisensi, disintesis langsung (tanpa sampel, tanpa unduhan).
// Pakai: node make-music.mjs <suasana> <detik> <out.wav>
// Suasana: ceria | lofi | piano | angkasa | synthwave | funk | tech | gamelan
import {writeFileSync} from 'node:fs';

const [mood = 'ceria', secArg = '30', out = 'music.wav'] = process.argv.slice(2);
const SR = 44100;
const dur = Number(secArg);
const N = Math.ceil(dur * SR);
const L = new Float32Array(N);
const R = new Float32Array(N);

// ---------- util ----------
const midi = (m) => 440 * 2 ** ((m - 69) / 12);
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const add = (i, v, pan = 0) => {
  if (i < 0 || i >= N) return;
  L[i] += v * (1 - Math.max(0, pan));
  R[i] += v * (1 + Math.min(0, pan));
};

// Petikan senar Karplus-Strong (ukulele/gitar/kecapi).
function pluck(t, freq, amp, decay = 0.996, pan = 0, bright = 0.5) {
  const p = Math.max(2, Math.round(SR / freq));
  const buf = new Float32Array(p).map(() => rnd() * 2 - 1);
  // Haluskan eksitasi: makin redup "bright", makin lembut petikannya (tidak mendesis).
  const passes = Math.round((1 - bright) * 6);
  for (let k = 0; k < passes; k++) for (let i = 1; i < p; i++) buf[i] = (buf[i] + buf[i - 1]) * 0.5;
  const start = Math.floor(t * SR);
  const len = Math.floor(SR * 2.2);
  const rel = Math.floor(SR * 0.4);
  let idx = 0;
  for (let n = 0; n < len; n++) {
    const a = buf[idx];
    const b = buf[(idx + 1) % p];
    buf[idx] = decay * (bright * a + (1 - bright) * (a + b) * 0.5);
    // Fade di ujung supaya nada panjang (bass) tidak terpotong jadi bunyi klik.
    add(start + n, a * amp * Math.min(1, (len - n) / rel) * Math.min(1, n / 40), pan);
    idx = (idx + 1) % p;
  }
}

// Nada aditif dengan envelope (piano lembut, rhodes, bel).
function tone(t, freq, d, amp, {partials = [1, 0.5, 0.25], ratios = null, attack = 0.005, decay = 3, trem = 0, pan = 0} = {}) {
  const start = Math.floor(t * SR);
  const len = Math.floor(d * SR);
  for (let n = 0; n < len; n++) {
    const s = n / SR;
    const env = Math.min(1, s / attack) * Math.exp(-s * decay / d) * Math.min(1, (len - n) / (0.03 * SR));
    let v = 0;
    partials.forEach((pa, k) => {
      const r = ratios ? ratios[k] : k + 1;
      v += pa * Math.sin(2 * Math.PI * freq * r * s);
    });
    if (trem) v *= 1 - trem * 0.5 * (1 + Math.sin(2 * Math.PI * 5 * s));
    add(start + n, v * env * amp, pan);
  }
}

// Pad lembut: beberapa sinus sedikit detune, attack/release panjang.
function pad(t, freqs, d, amp) {
  const start = Math.floor(t * SR);
  const len = Math.floor(d * SR);
  const atk = Math.min(1.2, d / 3);
  for (let n = 0; n < len; n++) {
    const s = n / SR;
    const env = Math.min(1, s / atk) * Math.min(1, (d - s) / atk);
    let v = 0;
    freqs.forEach((f, k) => {
      v += Math.sin(2 * Math.PI * f * s) + 0.5 * Math.sin(2 * Math.PI * f * 1.003 * s + k) + 0.25 * Math.sin(2 * Math.PI * f * 2 * s);
    });
    add(start + n, (v / freqs.length) * env * amp, Math.sin(s * 0.7) * 0.4);
  }
}

// Saw beraliasing rendah + filter satu kutub (synthwave/funk bass).
function saw(t, freq, d, amp, cutoff = 0.15, pan = 0) {
  const start = Math.floor(t * SR);
  const len = Math.floor(d * SR);
  let y = 0;
  for (let n = 0; n < len; n++) {
    const s = n / SR;
    const ph = (freq * s) % 1;
    const x = 2 * ph - 1;
    y += cutoff * (x - y);
    const env = Math.min(1, s / 0.004) * Math.exp(-s * 3) * Math.min(1, (len - n) / (0.01 * SR));
    add(start + n, y * env * amp, pan);
  }
}

const kick = (t, amp = 0.9) => {
  const start = Math.floor(t * SR);
  for (let n = 0; n < SR * 0.35; n++) {
    const s = n / SR;
    add(start + n, Math.sin(2 * Math.PI * (50 + 90 * Math.exp(-s * 30)) * s) * Math.exp(-s * 9) * amp);
  }
};
const snare = (t, amp = 0.35) => {
  const start = Math.floor(t * SR);
  let lp = 0;
  for (let n = 0; n < SR * 0.22; n++) {
    const s = n / SR;
    lp += 0.35 * ((rnd() * 2 - 1) - lp);
    add(start + n, (lp * 1.4 + 0.35 * Math.sin(2 * Math.PI * 190 * s)) * Math.exp(-s * 18) * amp);
  }
};
const hat = (t, amp = 0.12, open = false) => {
  const start = Math.floor(t * SR);
  let prev = 0;
  for (let n = 0; n < SR * (open ? 0.18 : 0.05); n++) {
    const s = n / SR;
    const w = rnd() * 2 - 1;
    const hp = w - prev;
    prev = w;
    add(start + n, hp * Math.exp(-s * (open ? 18 : 70)) * amp, 0.25);
  }
};
const shaker = (t, amp = 0.03) => hat(t, amp, false);

// Progresi akor (nada MIDI). Diulang sepanjang durasi.
const PROG = {
  major: [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]], // I V vi IV
  lofi: [[62, 65, 69, 72], [55, 59, 62, 65], [60, 64, 67, 71], [57, 60, 64, 67]], // ii7 V7 Imaj7 vi7
  minor: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]], // i VI III VII
  funk: [[62, 65, 69, 72], [67, 71, 74, 77]],
};

function render() {
  const bar = (bpm) => (60 / bpm) * 4;
  switch (mood) {
    case 'ceria': {
      const bpm = 112, B = bar(bpm), beat = B / 4;
      for (let t = 0, i = 0; t < dur; t += B, i++) {
        const ch = PROG.major[i % 4];
        // pola strum ukulele: D - D U - U D U
        [0, 1, 1.5, 2.5, 3, 3.5].forEach((p, k) => ch.concat(ch[0] + 12).forEach((m, j) => pluck(t + p * beat + j * 0.012, midi(m + 12), 0.11, 0.994, (j - 1.5) * 0.2, k % 2 ? 0.15 : 0.3)));
        pluck(t, midi(ch[0] - 12), 0.35, 0.997);
        pluck(t + 2 * beat, midi(ch[0] - 5), 0.3, 0.997);
        for (let b = 0; b < 4; b++) { if (b % 2 === 0) kick(t + b * beat, 0.45); else snare(t + b * beat, 0.12); shaker(t + b * beat + beat / 2, 0.025); }
      }
      break;
    }
    case 'lofi': {
      const bpm = 78, B = bar(bpm), beat = B / 4;
      for (let t = 0, i = 0; t < dur; t += B, i++) {
        const ch = PROG.lofi[i % 4];
        ch.forEach((m, j) => tone(t + j * 0.02, midi(m), B * 0.95, 0.07, {partials: [1, 0.35, 0.1], decay: 2.2, trem: 0.25, pan: (j - 1.5) * 0.25}));
        tone(t, midi(ch[0] - 24), B * 0.9, 0.22, {partials: [1, 0.2], decay: 1.5});
        kick(t, 0.6); kick(t + 2.5 * beat, 0.45);
        snare(t + beat, 0.18); snare(t + 3 * beat, 0.18);
        for (let e = 0; e < 8; e++) hat(t + e * beat / 2 + (e % 2 ? beat * 0.08 : 0), e % 2 ? 0.05 : 0.08);
      }
      for (let n = 0; n < N; n++) if (rnd() < 0.0006) add(n, (rnd() - 0.5) * 0.08); // debu vinyl
      break;
    }
    case 'piano': {
      const bpm = 68, B = bar(bpm), beat = B / 4;
      const prog = [[57, 64, 69, 72], [53, 60, 65, 69], [48, 55, 64, 67], [55, 62, 67, 71]];
      for (let t = 0, i = 0; t < dur; t += B, i++) {
        const ch = prog[i % 4];
        tone(t, midi(ch[0] - 12), B * 1.2, 0.2, {partials: [1, 0.4, 0.2, 0.1], decay: 4});
        [1, 2, 3, 2, 1, 2, 3, 2].forEach((k, e) => tone(t + e * beat / 2, midi(ch[k]), beat * 2, 0.09, {partials: [1, 0.3, 0.12, 0.05], decay: 4, pan: (k - 2) * 0.3}));
      }
      break;
    }
    case 'angkasa': {
      const prog = [[45, 52, 57, 64], [41, 48, 53, 60], [43, 50, 55, 62], [40, 47, 52, 59]];
      const B = 6;
      for (let t = 0, i = 0; t < dur; t += B, i++) pad(t, prog[i % 4].map(midi), B + 2, 0.16);
      for (let t = 0.5; t < dur; t += 1.5) tone(t, midi([76, 79, 83, 86][Math.floor(rnd() * 4)]), 3, 0.025, {partials: [1, 0.2], ratios: [1, 2.76], decay: 3, pan: rnd() - 0.5});
      for (let t = 0; t < dur; t += 6) tone(t, midi(33), 6, 0.18, {partials: [1, 0.3], attack: 1.5, decay: 1});
      break;
    }
    case 'synthwave': {
      const bpm = 100, B = bar(bpm), beat = B / 4;
      for (let t = 0, i = 0; t < dur; t += B, i++) {
        const ch = PROG.minor[i % 4];
        pad(t, ch.map((m) => midi(m + 12)), B, 0.08);
        for (let e = 0; e < 8; e++) saw(t + e * beat / 2, midi(ch[0] - 12 + (e % 2 ? 12 : 0)), beat / 2 * 0.9, 0.22, 0.12);
        for (let s = 0; s < 16; s++) tone(t + s * beat / 4, midi(ch[s % 3] + 24), beat / 4, 0.03, {partials: [1, 0.5, 0.33], decay: 6, pan: s % 2 ? 0.4 : -0.4});
        for (let b = 0; b < 4; b++) { kick(t + b * beat, 0.6); hat(t + b * beat + beat / 2, 0.08); }
        snare(t + beat, 0.3); snare(t + 3 * beat, 0.3);
      }
      break;
    }
    case 'funk': {
      const bpm = 104, B = bar(bpm), beat = B / 4, s16 = beat / 4;
      const bass = [0, -1, 3, -1, 0, 0, -1, 7, 0, -1, 3, 5, -1, 7, 5, 3];
      for (let t = 0, i = 0; t < dur; t += B, i++) {
        const ch = PROG.funk[i % 2];
        bass.forEach((o, k) => { if (o >= 0) saw(t + k * s16, midi(ch[0] - 24 + o), s16 * 0.9, 0.3, 0.2); });
        [1.5, 3.5].forEach((p) => ch.forEach((m, j) => pluck(t + p * beat + j * 0.006, midi(m), 0.07, 0.985, (j - 1.5) * 0.3, 0.35)));
        kick(t, 0.7); kick(t + 2.5 * beat, 0.5); kick(t + 2.75 * beat, 0.35);
        snare(t + beat, 0.3); snare(t + 3 * beat, 0.3);
        for (let k = 0; k < 16; k++) hat(t + k * s16, k % 4 === 2 ? 0.05 : 0.025, k === 14);
      }
      break;
    }
    case 'tech': {
      const bpm = 112, B = bar(bpm), beat = B / 4, s16 = beat / 4;
      const scale = [0, 2, 4, 7, 9, 12, 14, 16];
      for (let t = 0, i = 0; t < dur; t += B, i++) {
        const root = [60, 57, 53, 55][i % 4];
        pad(t, [root - 12, root - 5, root + 4].map(midi), B, 0.07);
        for (let k = 0; k < 16; k++) pluck(t + k * s16, midi(root + scale[(k * 3 + i) % 8]), 0.06, 0.99, k % 2 ? 0.35 : -0.35, 0.3);
        for (let b = 0; b < 4; b++) { kick(t + b * beat, 0.45); hat(t + b * beat + beat / 2, 0.07); }
        snare(t + beat, 0.12); snare(t + 3 * beat, 0.12);
      }
      break;
    }
    case 'gamelan': {
      // Laras mirip pelog (cent tidak sama rata), bilah metal = parsial inharmonis.
      const pelog = [0, 1.2, 2.7, 5.4, 6.8, 7.9, 10.1];
      const base = 62;
      const bell = {partials: [1, 0.45, 0.25, 0.12], ratios: [1, 2.76, 5.4, 8.9], decay: 4};
      const beat = 0.42;
      const melody = [0, 2, 3, 2, 4, 3, 2, 0, 3, 4, 5, 4, 3, 2, 3, 0];
      for (let t = 0, k = 0; t < dur; t += beat, k++) {
        const m = melody[k % 16];
        tone(t, midi(base + pelog[m]), 1.6, 0.11, {...bell, pan: -0.3});
        tone(t, midi(base + pelog[m]) * 1.006, 1.6, 0.06, {...bell, pan: 0.3}); // ombak: dua bilah sedikit beda
        if (k % 2) tone(t + beat / 2, midi(base + 12 + pelog[melody[(k + 3) % 16]]), 0.8, 0.05, {...bell, decay: 6});
        if (k % 8 === 0) tone(t, midi(base - 24), 5, 0.3, {partials: [1, 0.4, 0.2], ratios: [1, 1.5, 2.1], decay: 1.2, trem: 0.15});
        if (k % 4 === 2) tone(t, midi(base - 12 + pelog[3]), 1.5, 0.12, {partials: [1, 0.3], ratios: [1, 2.4], decay: 3});
        if (k % 2 === 0) hat(t, 0.04);
      }
      break;
    }
    default:
      throw new Error(`Suasana tidak dikenal: ${mood}`);
  }
}
render();

// Reverb sederhana (beberapa comb + gema stereo), lalu normalisasi dan fade.
const wet = {angkasa: 0.45, piano: 0.3, gamelan: 0.35, lofi: 0.2}[mood] ?? 0.15;
for (const [ch, delays] of [[L, [1557, 1617, 1491, 1422]], [R, [1277, 1356, 1188, 1116]]]) {
  const dry = Float32Array.from(ch);
  for (const d of delays) {
    const buf = new Float32Array(d);
    for (let n = 0, i = 0; n < N; n++, i = (i + 1) % d) {
      const y = buf[i];
      buf[i] = dry[n] + y * 0.82;
      ch[n] += (y * wet) / delays.length;
    }
  }
}
let peak = 0;
for (let n = 0; n < N; n++) peak = Math.max(peak, Math.abs(L[n]), Math.abs(R[n]));
const g = 0.85 / (peak || 1);
const fadeIn = SR * 0.5, fadeOut = SR * 2;
const pcm = Buffer.alloc(44 + N * 4);
pcm.write('RIFF', 0); pcm.writeUInt32LE(36 + N * 4, 4); pcm.write('WAVE', 8);
pcm.write('fmt ', 12); pcm.writeUInt32LE(16, 16); pcm.writeUInt16LE(1, 20); pcm.writeUInt16LE(2, 22);
pcm.writeUInt32LE(SR, 24); pcm.writeUInt32LE(SR * 4, 28); pcm.writeUInt16LE(4, 32); pcm.writeUInt16LE(16, 34);
pcm.write('data', 36); pcm.writeUInt32LE(N * 4, 40);
for (let n = 0; n < N; n++) {
  const f = Math.min(1, n / fadeIn, (N - n) / fadeOut);
  const soft = (x) => Math.tanh(x * g * f * 1.2) / Math.tanh(1.2);
  pcm.writeInt16LE(Math.round(soft(L[n]) * 32000), 44 + n * 4);
  pcm.writeInt16LE(Math.round(soft(R[n]) * 32000), 46 + n * 4);
}
writeFileSync(out, pcm);
console.log(`Musik "${mood}" ${dur} dtk → ${out}`);
