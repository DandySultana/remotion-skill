# Format platform & paket upload

| Platform | Rasio | Ukuran | Durasi ideal | Catatan |
|---|---|---|---|---|
| TikTok | 9:16 | 1080×1920 | 21–45 dtk | hook ≤ 2 dtk; teks di tengah |
| Instagram Reels | 9:16 | 1080×1920 | 15–45 dtk | sampul dipotong 4:5 di grid, taruh judul di tengah |
| YouTube Shorts | 9:16 | 1080×1920 | ≤ 60 dtk | judul dibaca, buat jelas |
| YouTube | 16:9 | 1920×1080 | 60 dtk–5 mnt | thumbnail terpisah 1280×720 |
| Feed IG/FB | 1:1 atau 4:5 | 1080×1080 / 1080×1350 | 15–30 dtk | banyak ditonton tanpa suara: subtitle wajib |
| WhatsApp Status | 9:16 | 1080×1920 | ≤ 30 dtk | pakai `*-wa.mp4` (file kecil) |

Untuk format selain 9:16 dan 16:9, tambahkan `<Composition>` baru di `Root.tsx` dengan ukuran yang sesuai.

## Paket upload
Setelah render, siapkan di chat (dan simpan ke `notes/upload.md`):
1. **Judul** 3 pilihan, ≤ 60 karakter, mengandung kata kunci topik. Satu bergaya pertanyaan, satu fakta, satu "kamu".
2. **Caption** 1–3 kalimat + ajakan (komentar/follow).
3. **Hashtag** 5–8: 2 luas (#edukasi), 3 spesifik topik, 1–2 bahasa/lokal (#faktaunik).
4. **Thumbnail**: `*-thumb.jpg` dari frame hook. Untuk YouTube 16:9, render still khusus dengan judul besar 3–4 kata.
5. **Info teknis**: durasi, rasio, preset, suara, sumber musik/SFX, sumber fakta.

## Video YouTube panjang (3–5 menit, 16:9)
- **Naskah**: 12–15 adegan, satu adegan = satu paragraf narasi (±15–20 detik). Hook di adegan 1, penutup + ajakan di adegan terakhir. Tambahkan chapter YouTube dari waktu mulai tiap adegan.
- **Suara**: buat **satu take per adegan**, lalu gabungkan dengan jeda ±0,5 detik. Titik potong adegan = batas antar-take, jadi tidak perlu menebak jeda; take yang gagal cukup diulang satu itu saja. Musik latar diputar ulang (`loop`) sepanjang video dengan volume rendah.
- **Tata letak**: panel teks di kiri (judul + label kecil), visual di kanan; subtitle diturunkan ke ±11% dari bawah (`caption.bottom`) supaya tidak menabrak isi. Penanda tahap di atas (mis. "3. Naskah") membantu penonton mengikuti video tutorial.

## Kompilasi (beberapa video vertikal jadi satu video 16:9)
Untuk merangkum Shorts/Reels mingguan jadi satu video YouTube. 
- Video 9:16 di kanan dalam bingkai HP, panel kiri berisi nomor, nama gaya/topik, dan kalimat prompt aslinya.
- Potong kartu penutup tiap video (pakai `starts[]` terakhir dari `timing.json`) supaya ajakan tidak terulang; tutup dengan satu kartu ajakan di akhir.
- Durasi chapter = durasi tiap klip; tulis daftar chapter dan prompt di deskripsi.

