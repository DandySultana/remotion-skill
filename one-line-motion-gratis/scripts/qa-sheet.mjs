#!/usr/bin/env node
// Render 3 still per adegan (awal, tengah, akhir) lalu gabung jadi satu lembar kontak untuk dicek sekilas.
// Pakai: node qa-sheet.mjs <folder-proyek> [composition=Video]
import {execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

const dir = process.argv[2] ?? '.';
const comp = process.argv[3] ?? 'Video';
const t = JSON.parse(readFileSync(join(dir, 'src', 'timeline.json'), 'utf8'));
const qa = join(dir, 'out', 'qa');
mkdirSync(qa, {recursive: true});

let start = 0;
let n = 0;
for (const s of t.scenes) {
  for (const p of [0.2, 0.55, 0.92]) {
    const frame = start + Math.floor(s.durationInFrames * p);
    const name = join('out', 'qa', `${String(n++).padStart(3, '0')}.jpg`);
    execFileSync('npx', ['remotion', 'still', comp, name, `--frame=${frame}`, '--scale=0.35', '--log=error'], {cwd: dir, stdio: 'inherit'});
  }
  start += s.durationInFrames;
}
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-pattern_type', 'glob', '-i', join(qa, '*.jpg'), '-vf', `tile=3x${t.scenes.length}:padding=8:color=white`, '-frames:v', '1', '-update', '1', join(dir, 'out', 'qa-sheet.jpg')]);
console.log(`Lembar QA: ${join(dir, 'out', 'qa-sheet.jpg')} (baris = adegan, kolom = awal/tengah/akhir)`);
