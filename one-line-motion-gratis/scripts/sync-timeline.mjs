#!/usr/bin/env node
// Ukur durasi tiap VO lalu tulis ulang durationInFrames di timeline.json.
// Pakai: node sync-timeline.mjs <folder-proyek> [jeda-detik=0.45]
import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const dir = process.argv[2] ?? '.';
const pad = Number(process.argv[3] ?? 0.45);
const file = join(dir, 'src', 'timeline.json');
const t = JSON.parse(readFileSync(file, 'utf8'));

let start = 0;
for (const s of t.scenes) {
  if (s.vo) {
    const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', join(dir, 'public', s.vo)]);
    const sec = Number(String(out).trim());
    s.durationInFrames = Math.ceil((sec + pad) * t.fps);
  }
  // SFX tidak boleh jatuh setelah adegan selesai.
  s.sfx = s.sfx.filter((x) => x.at < s.durationInFrames);
  console.log(`${s.id}  ${(s.durationInFrames / t.fps).toFixed(2)} dtk  mulai ${(start / t.fps).toFixed(2)}`);
  start += s.durationInFrames;
}
writeFileSync(file, JSON.stringify(t, null, 2) + '\n');
console.log(`Total ${(start / t.fps).toFixed(2)} dtk`);
