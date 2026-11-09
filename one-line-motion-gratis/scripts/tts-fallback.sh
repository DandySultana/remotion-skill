#!/usr/bin/env bash
# Voiceover cadangan tanpa akun (untuk draf/preview). Untuk hasil final pakai ElevenLabs.
# Pakai: tts-fallback.sh "<teks>" <out.mp3> [voice]
set -euo pipefail
text="${1:?teks wajib}"; out="${2:?file output wajib}"; voice="${3:-Damayanti}"
tmp="$(mktemp -t olm-tts).aiff"
if command -v say >/dev/null; then
  say -v "$voice" -r 175 -o "$tmp" "$text"
elif command -v espeak-ng >/dev/null; then
  espeak-ng -v id -s 160 -w "${tmp%.aiff}.wav" "$text"; tmp="${tmp%.aiff}.wav"
else
  echo "Tidak ada mesin TTS lokal (say/espeak-ng)." >&2; exit 1
fi
ffmpeg -y -loglevel error -i "$tmp" -af "loudnorm=I=-16:TP=-1.5,apad=pad_dur=0.05" -ar 44100 -b:a 192k "$out"
rm -f "$tmp"
