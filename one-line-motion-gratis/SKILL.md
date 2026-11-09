---
name: one-line-motion-gratis
description: "Versi gratis One Line Motion (10 gaya: Kartun Flat, Papan Sains, Pixel 8-bit, Retro Neon, Panel Komik, Low-poly 3D, Clay, Sinematik, Stickman, Cat Air). Ubah satu kalimat ide jadi video motion graphic bersuara (MP4): explainer, Shorts/Reels/TikTok, intro, promo, iklan produk, kinetic type. Alur: brief → 3 konsep → naskah per adegan → suara → animasi Remotion → QA → render → paket upload. Pakai saat pengguna minta bikin video animasi, motion graphic, explainer, konten edukasi bergerak, atau merevisi video One Line Motion."
---

# One Line Motion Gratis

Versi gratis berisi **10 preset gaya**. Versi lengkap (52 preset, iklan UMKM, 3D bedah tembus pandang, peta dunia, format YouTube panjang) ada di onelinemotion.com. Bila pengguna minta gaya yang tidak ada di `references/styles.md`, pilih preset terdekat dari 10 gaya ini dan sebutkan bahwa gaya itu tersedia di versi lengkap.

Skill ini mengubah satu kalimat ide menjadi video motion graphic yang bergerak seperti video sungguhan (bukan slide), lengkap dengan narasi, efek suara, subtitle, thumbnail, dan teks unggahan. Bahasa kerja default Bahasa Indonesia, kecuali pengguna minta lain.

Folder skill ini berisi:
- `template/`: proyek Remotion siap pakai (timeline dari durasi suara, token gaya, komponen gerak, subtitle otomatis, musik dengan ducking).
- `scripts/`: `new-project.sh`, `make-sfx.sh`, `make-music.mjs`, `tts-fallback.sh`, `sync-timeline.mjs`, `qa-sheet.mjs`, `finish.sh`.
- `examples/`: kode 10 video contoh, satu per preset gaya (lihat tabel di `references/styles.md`). Sebelum menganimasikan, baca contoh untuk preset yang dipilih sebagai titik awal (palet, komponen, cara gerak).
- `references/`: `styles.md` (preset gaya), `motion.md` (prinsip gerak & tata letak), `audio.md` (suara, SFX, musik), `formats.md` (spesifikasi platform & paket upload), `revisions.md` (kamus revisi), `prompts.md` (pustaka prompt untuk pengguna).

Sebut path skill ini `$SKILL` (folder tempat file ini berada).

## Prinsip utama

1. **Urutan tidak boleh dilompati.** Konsep dikunci sebelum naskah, naskah sebelum suara, suara sebelum animasi. Durasi adegan mengikuti durasi narasi, bukan sebaliknya.
2. **Satu adegan, satu ide.** Kalau satu adegan butuh dua kalimat penjelas, pecah jadi dua adegan.
3. **Selalu ada yang bergerak.** Tidak ada frame diam lebih dari 1,5 detik.
4. **Gaya dikunci di `brand.json`.** Semua warna, font, ketebalan garis, dan tempo dibaca dari sana, sehingga video ke-20 tetap serapi video pertama.
5. **Lihat sebelum render.** Lembar QA wajib dicek dengan mata (Read) sebelum render penuh.
6. **Jangan mengarang fakta.** Angka dan klaim dicek dengan web search; sumbernya dicatat.

## Alur kerja

Tampilkan progres singkat ke pengguna di tiap tahap, misalnya `Brief ✓ → Konsep ✓ → Naskah … → Suara → Animasi → QA → Render`.

### 1. Brief (5 hal)
1. **Apa**: pesan utama dalam satu kalimat.
2. **Untuk siapa**: audiens (pelajar SMP, umum, calon pembeli, dst.).
3. **Durasi**: default Shorts 30–45 detik, explainer 60–90 detik, intro 5–10 detik, promo 15–30 detik.
4. **Format**: 9:16 (Reels/TikTok/Shorts), 16:9 (YouTube), 1:1 (feed), atau beberapa sekaligus.
5. **Nada & gaya**: edukatif, lucu, dramatis, premium, jualan; preset gaya bila sudah punya. Untuk iklan usaha, tanyakan juga data usaha (nama, harga/diskon, alamat atau cara order) dan jangan mengarangnya.

Bila ada yang kosong, tanyakan sekaligus dalam SATU pertanyaan (AskUserQuestion bila tersedia). Bila pengguna bilang "langsung aja", pakai default dan sebutkan default yang dipakai.

Cek juga `~/.one-line-motion/brands/`. Bila ada brand kit tersimpan, tawarkan untuk dipakai ("Pakai brand kit *Kopi Senja* lagi?").

### 2. Tiga konsep → pengguna pilih satu
Baca `references/styles.md`. Tiap konsep berisi:
- **Nama** 2–4 kata dan **metafora visual** utama (misalnya "Greenland sebagai kepingan puzzle").
- **Preset gaya** + palet 5 warna (hex) + pasangan font.
- **Hook 3 detik pertama**: apa yang dilihat dan didengar.
- **Alur kamera/gerak** dalam satu kalimat.

Ketiganya harus beda metafora, bukan sekadar beda warna. Tandai satu sebagai rekomendasi dan beri alasan satu kalimat. Setelah dipilih, tulis `brand.json` proyek dari konsep itu.

### 3. Naskah per adegan
Bila topiknya faktual, cek fakta lebih dulu (web search) dan catat sumber di `notes/sources.md`. Lalu sajikan tabel:

| # | Durasi | Narasi (VO) | Visual | Gerak | Teks layar | SFX |

Aturan:
- Kecepatan VO Bahasa Indonesia ±2,3 kata/detik (sinematik ±2,0; promo energik ±2,6). Hitung kata supaya total pas dengan durasi.
- Adegan 1 = hook ≤ 3 detik: pertanyaan, fakta mengejutkan, atau kontradiksi.
- Adegan terakhir = payoff + ajakan (follow, komentar, kunjungi toko).
- Shorts 4–7 adegan; explainer 60–90 detik 6–10 adegan.
- Teks layar maksimal 6 kata per baris, 2 baris. Angka penting tampil besar.
- Narasi ditulis untuk didengar: kalimat pendek, kata sehari-hari, tanpa singkatan yang aneh bila dibaca TTS (tulis "lima kali", bukan "5x").

Minta persetujuan naskah (cukup "oke"), kecuali pengguna sudah bilang langsung jalan.

### 4. Siapkan proyek
```bash
bash "$SKILL/scripts/new-project.sh" <folder-proyek> [~/.one-line-motion/brands/<nama>.json]
```
Script ini menyalin template, membuat pustaka SFX sintetis di `public/sfx/`, dan memasang dependensi. Lalu muat skill `remotion-best-practices` (bila tersedia) sebelum menulis kode adegan.

### 5. Suara dulu
Baca `references/audio.md`. Ringkasnya:
1. **Voiceover per adegan** → `public/audio/vo-01.mp3`, `vo-02.mp3`, …
   - Utama: ElevenLabs (plugin/MCP `creative_generate_speech` atau tool ElevenLabs lain yang tersedia). Pilih suara sesuai audiens dan sebutkan namanya.
   - Cadangan tanpa akun (untuk draf): `bash "$SKILL/scripts/tts-fallback.sh" "<narasi>" public/audio/vo-01.mp3`. Beri tahu pengguna bahwa ini suara draf.
2. **Isi `src/timeline.json`**: satu entri per adegan (`id`, `component`, `vo`, `text` = narasi, `sfx`).
3. **Sinkronkan durasi**: `node "$SKILL/scripts/sync-timeline.mjs" <folder-proyek>`. Durasi adegan = durasi VO + 0,45 detik.
4. **SFX** dari `public/sfx/` (pop, ding, click, whoosh, swoosh, riser, impact, boing, typing) atau dari layanan SFX yang tersambung. Pasang di momen gerak penting saja, maksimal 2–3 per adegan. `at` dihitung dalam frame sejak awal adegan.
5. **Musik**: buat musik latar bebas lisensi sesuai suasana, sepanjang video + 2 detik:
   `node "$SKILL/scripts/make-music.mjs" <ceria|lofi|piano|angkasa|synthwave|funk|tech|gamelan> <detik> public/audio/music.wav`
   Atau pakai layanan musik berlisensi yang tersambung (pastikan akunnya punya hak unduh) atau file milik pengguna. Isi `timeline.music`. Ducking otomatis di `Video.tsx`.

### 6. Animasi
Baca `references/motion.md` dan bagian preset terpilih di `references/styles.md`.
- Satu file per adegan di `src/scenes/`, daftarkan di `src/scenes/index.ts` dengan nama yang sama dengan `component` di timeline.
- Pakai komponen bawaan dulu: `Background`, `Camera`, `Pop`/`usePop`, `KineticText` (kata berawalan `*` diberi warna aksen), `BigNumber`, `DrawPath`, `Caption`. Adegan contoh (`Hook`, `Sunlight`, `Scatter`, `Payoff`) menunjukkan polanya; hapus bila tidak dipakai.
- Semua gerak memakai `useCurrentFrame`, `interpolate`, `spring`. Jangan memakai animasi atau transition CSS.
- Warna, font, easing, spring hanya dari `theme`. Jangan menulis hex baru di adegan kecuali untuk ilustrasi spesifik (misalnya warna pelangi).
- Ilustrasi dibuat sendiri dengan SVG/React. Tekstur dibuat prosedural. Jangan memakai karakter, logo, atau gambar berhak cipta.
- Tata letak membaca `useVideoConfig()` supaya adegan yang sama bisa dirender 9:16 dan 16:9 (`Video-16x9`).
- Font baru didaftarkan di `src/fonts.ts`.

Jalankan `npx tsc --noEmit` di folder proyek sampai bersih.

### 7. QA visual (wajib)
```bash
node "$SKILL/scripts/qa-sheet.mjs" <folder-proyek>
```
Buka `out/qa-sheet.jpg` dengan Read. Tiap baris = satu adegan, kolom = awal/tengah/akhir. Periksa dan perbaiki:
- Teks bertabrakan dengan subtitle atau elemen lain, teks terpotong, keluar area aman.
- Adegan yang "mati" di kolom tengah/akhir (gerak sudah habis padahal narasi masih jalan).
- Kontras rendah, elemen terlalu kecil di layar HP.
- Konsistensi gaya antar adegan.

Ulangi sampai bersih. Tunjukkan lembar QA ke pengguna bila mereka ingin melihat preview.

### 8. Render & finishing
```bash
cd <folder-proyek> && npx remotion render Video out/video.mp4 --codec h264
bash "$SKILL/scripts/finish.sh" out/video.mp4 <detik-thumbnail>
```
Hasil: `video-final.mp4` (loudness -14 LUFS), `video-thumb.jpg`, `video-wa.mp4` (versi ringan). Untuk format lain: `npx remotion render Video-16x9 out/video-16x9.mp4`. Render lama bisa dijalankan di background.

### 9. Paket upload
Baca `references/formats.md`. Kirim MP4 final dengan SendUserFile, lalu sertakan:
- 3 pilihan judul (≤ 60 karakter), caption pendek, 5–8 hashtag relevan.
- Durasi, format, preset, suara yang dipakai, sumber musik/SFX.
- Sumber fakta (bila konten edukasi).

Tawarkan menyimpan brand kit: salin `brand.json` ke `~/.one-line-motion/brands/<nama>.json`.

### 10. Revisi 1 kalimat
Baca `references/revisions.md`. Terjemahkan permintaan ("bulannya lebih besar, kasih wajah") menjadi daftar: adegan → elemen → properti → nilai baru. Ubah HANYA itu.
- Revisi narasi: buat ulang VO adegan itu saja, jalankan `sync-timeline.mjs`.
- Jalankan QA sheet lagi bila tata letak berubah, lalu render ulang.
- Catat di `notes/revisions.md` (tanggal, permintaan, perubahan) dan sebutkan singkat apa yang berubah.

## Etika & lisensi
- Jangan meniru karakter, merek, atau gaya khas studio/kreator tertentu. Motif budaya digambar ulang dalam gaya umum dengan hormat.
- Musik dan SFX hanya dari sumber berlisensi, buatan pengguna, atau hasil sintesis `make-sfx.sh`.
- Ingatkan pengguna mengecek lisensi layanan suara/musik bila video dipakai untuk klien atau iklan berbayar.
- Penyederhanaan sains boleh, salah konsep tidak.
