#!/usr/bin/env bash
# Sintesis pustaka SFX dasar dengan FFmpeg: bebas lisensi, tanpa akun, tanpa unduhan.
# Pakai: make-sfx.sh <folder-tujuan>
set -euo pipefail
out="${1:?folder tujuan wajib diisi}"
mkdir -p "$out"
f() { ffmpeg -y -loglevel error "$@"; }
# pop: sinus turun cepat
f -f lavfi -i "aevalsrc='sin(2*PI*t*(900-6000*t))*exp(-40*t)':d=0.15" "$out/pop.wav"
# ding: dua harmoni meluruh
f -f lavfi -i "aevalsrc='0.6*sin(2*PI*1320*t)*exp(-5*t)+0.3*sin(2*PI*2640*t)*exp(-7*t)':d=1.0" "$out/ding.wav"
# click
f -f lavfi -i "aevalsrc='sin(2*PI*2200*t)*exp(-120*t)':d=0.05" "$out/click.wav"
# whoosh: noise disapu bandpass naik-turun
f -f lavfi -i "anoisesrc=d=0.6:c=pink:a=0.8" -af "bandpass=f=1200:w=900,afade=t=in:d=0.25,afade=t=out:st=0.3:d=0.3,volume=2" "$out/whoosh.wav"
# swoosh pendek
f -f lavfi -i "anoisesrc=d=0.3:c=white:a=0.5" -af "highpass=f=2500,afade=t=in:d=0.08,afade=t=out:st=0.1:d=0.2" "$out/swoosh.wav"
# riser: nada naik + noise
f -f lavfi -i "aevalsrc='0.4*sin(2*PI*t*(200+400*t))':d=1.5" -af "afade=t=in:d=1.4,volume=1.5" "$out/riser.wav"
# impact: bass rendah meluruh
f -f lavfi -i "aevalsrc='sin(2*PI*55*t)*exp(-4*t)+0.3*sin(2*PI*110*t)*exp(-6*t)':d=1.2" "$out/impact.wav"
# boing
f -f lavfi -i "aevalsrc='sin(2*PI*t*(300+120*sin(2*PI*12*t)))*exp(-6*t)':d=0.6" "$out/boing.wav"
# typing: rentetan klik
f -f lavfi -i "aevalsrc='sin(2*PI*1800*t)*exp(-150*mod(t\,0.09))*lt(mod(t\,0.09)\,0.03)':d=0.9" "$out/typing.wav"
echo "SFX dibuat di $out: pop ding click whoosh swoosh riser impact boing typing"
