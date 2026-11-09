#!/usr/bin/env bash
# Finishing: loudness -14 LUFS (standar YouTube/TikTok), thumbnail dari hook, versi ringan untuk WhatsApp.
# Pakai: finish.sh <video.mp4> [detik-thumbnail=1.2]
set -euo pipefail
in="${1:?file video wajib}"; at="${2:-1.2}"
base="${in%.*}"
ffmpeg -y -loglevel error -i "$in" -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 192k "$base-final.mp4"
ffmpeg -y -loglevel error -ss "$at" -i "$base-final.mp4" -frames:v 1 -q:v 2 "$base-thumb.jpg"
ffmpeg -y -loglevel error -i "$base-final.mp4" -c:v libx264 -crf 30 -preset slow -c:a aac -b:a 96k -movflags +faststart "$base-wa.mp4"
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$base-final.mp4")
printf "Selesai: %s (%.1f dtk)\n  thumbnail: %s\n  versi ringan: %s\n" "$base-final.mp4" "$dur" "$base-thumb.jpg" "$base-wa.mp4"
