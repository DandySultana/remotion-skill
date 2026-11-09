# One Line Motion Gratis — 10 gaya animasi untuk Claude Code

> Skill gratis berisi 10 gaya: Kartun Flat, Papan Sains, Pixel 8-bit, Retro Neon, Panel Komik, Low-poly 3D, Clay, Sinematik, Stickman, dan Cat Air. Versi lengkap (52 gaya) ada di **onelinemotion.com**.

## Yang perlu disiapkan
- Claude Code (aplikasi desktop atau terminal)
- Node.js 18+ dan FFmpeg:
  - **Mac**: pasang [Homebrew](https://brew.sh), lalu jalankan `brew install node ffmpeg`
  - **Windows**: buka PowerShell, jalankan `winget install Git.Git`, `winget install OpenJS.NodeJS.LTS`, lalu `winget install Gyan.FFmpeg`, kemudian tutup dan buka lagi PowerShell. Git for Windows wajib, karena skrip skill berjalan di Git Bash.
  - **Linux (Ubuntu/Debian)**: `sudo apt install nodejs npm ffmpeg`
  - Cek: `node -v` dan `ffmpeg -version` harus menampilkan nomor versi
- Opsional: plugin ElevenLabs untuk suara final. Tanpa plugin, skill tetap jalan dengan suara draf.

## Pasang (sekali saja)
Salin folder `one-line-motion-gratis` ke folder skill pribadi Claude Code:

**Mac / Linux** (Terminal, dari folder tempat ZIP diekstrak):

```bash
mkdir -p ~/.claude/skills && cp -R one-line-motion-gratis ~/.claude/skills/
```

**Windows** (PowerShell, dari folder tempat ZIP diekstrak):

```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null; Copy-Item -Recurse one-line-motion-gratis "$HOME\.claude\skills\"
```

Atau salin manual: ekstrak ZIP, lalu pindahkan folder `one-line-motion-gratis` ke folder `.claude/skills` di folder pengguna (buat foldernya bila belum ada).

Buka ulang Claude Code. Cek dengan mengetik: `skill apa saja yang tersedia?`

## Mulai
Ketik di Claude Code:

> bikinin Shorts 30 detik gaya clay: kenapa kucing suka kardus?

Skill ini akan menanyakan brief, menawarkan 3 konsep, menulis naskah, membuat suara, menganimasikan, mengecek QA, lalu mengirim MP4 bersuara beserta judul, caption, dan hashtag.

Contoh prompt lain ada di `references/prompts.md`.

## Mau lebih banyak gaya?
Versi lengkap One Line Motion berisi 52 gaya (termasuk 7 preset iklan UMKM, 3D bedah tembus pandang, peta dunia akurat, Kartu Mitos), format YouTube panjang, dan 80+ prompt siap pakai: **onelinemotion.com**

Skill ini gratis untuk dipakai sendiri. Tolong jangan dijual ulang.
