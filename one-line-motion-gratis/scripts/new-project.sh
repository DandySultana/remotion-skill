#!/usr/bin/env bash
# Buat proyek video baru dari template One Line Motion.
# Pakai: new-project.sh <folder-tujuan> [brand.json]
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
dest="${1:?folder tujuan wajib diisi}"
if [ -e "$dest" ] && [ -n "$(ls -A "$dest" 2>/dev/null)" ]; then
  echo "Folder $dest sudah berisi file, pilih folder lain." >&2; exit 1
fi
mkdir -p "$dest"
cp -R "$here/../template/." "$dest/"
# Brand kit tersimpan dipakai ulang supaya gaya konsisten antar video.
if [ "${2:-}" != "" ]; then cp "$2" "$dest/brand.json"; fi
bash "$here/make-sfx.sh" "$dest/public/sfx" >/dev/null
(cd "$dest" && npm install --no-audit --no-fund --loglevel=error)
echo "Proyek siap di $dest"
