# Suara, SFX, dan musik

## Voiceover
Urutan pilihan:
1. **ElevenLabs** lewat plugin/MCP yang tersambung (misalnya `creative_generate_speech`; ambil `voice_id` dari `creative_list_voices`, jangan dari ingatan). Satu file per adegan.
2. **ElevenLabs API** bila pengguna punya `ELEVENLABS_API_KEY` di environment: `POST https://api.elevenlabs.io/v1/text-to-speech/<voice_id>` dengan model multilingual. Jangan pernah menampilkan atau menulis key ke file.
3. **Cadangan lokal** `scripts/tts-fallback.sh` (macOS `say` suara Damayanti, atau `espeak-ng`). Untuk draf dan preview timing. Katakan terus terang bahwa ini suara draf.

Pemilihan suara:
| Audiens/nada | Karakter suara |
|---|---|
| anak & remaja, kartun | ceria, hangat, tempo sedang-cepat |
| edukasi umum | jelas, ramah, netral |
| sinematik, sejarah | dalam, tenang, ada jeda |
| promo produk | energik, tersenyum |
| premium/brand | rendah, pelan, percaya diri |

Tips naskah untuk TTS:
- Tulis angka sebagai kata bila mungkin ("lima kali", "dua ribu dua puluh enam").
- Koma untuk jeda pendek, titik untuk jeda panjang. Hindari kurung dan singkatan.
- Setelah generate, dengarkan/ukur. Bila satu adegan terlalu panjang, pendekkan naskah, bukan mempercepat audio.

## Sinkron
`node scripts/sync-timeline.mjs <proyek> [jeda]` mengukur tiap VO dengan ffprobe dan menulis `durationInFrames = ceil((durasi + jeda) * fps)`. Jeda default 0,45 detik; pakai 0,7 untuk sinematik.

## SFX
`scripts/make-sfx.sh` mensintesis pustaka dasar dengan FFmpeg (bebas lisensi):

| File | Pakai untuk |
|---|---|
| `pop.wav` | elemen muncul, ikon, angka |
| `ding.wav` | fakta penting, jawaban, "aha" |
| `click.wav` | UI, label, tick angka |
| `whoosh.wav` | transisi, objek melesat |
| `swoosh.wav` | gerak cepat kecil, teks geser |
| `riser.wav` | membangun ketegangan sebelum reveal |
| `impact.wav` | klimaks, judul besar, "gong" |
| `boing.wav` | pantulan lucu, karakter |
| `typing.wav` | teks mesin ketik |

Aturan: maksimal 2–3 SFX per adegan, volume 0,4–0,7, selalu sinkron dengan gerak yang terlihat. Bila tersambung layanan SFX berlisensi, boleh mengganti dengan suara yang lebih kaya.

## Musik
- Default: `scripts/make-music.mjs <suasana> <detik> <out.wav>`, disintesis tanpa sampel, bebas lisensi:

| Suasana | Cocok untuk preset |
|---|---|
| `ceria` | kartun-flat, clay, spanduk, krayon, stiker, chibi |
| `lofi` | doodle, kolase, isometrik, chat, cara-order, karaoke, stickman, podcast, riso, origami |
| `piano` | arsip, minimal, etalase, cat-air, peta, manuskrip, majalah, testimoni, sketsa |
| `angkasa` | sinematik, glitch, lowpoly, mikro |
| `synthwave` | retro, pixel, brutalist |
| `funk` | kuliner, kinetic, flash-sale, komik, unboxing |
| `tech` | papan-sains, infografis, blueprint, sebelum-sesudah, info, hologram, aplikasi, swiss, bauhaus |
| `gamelan` | nusantara, bayang, popup, cukil |

- Alternatif: layanan musik berlisensi yang tersambung (cek dulu akunnya boleh mengunduh; jangan memakai URL preview), atau file milik pengguna. Jangan memakai lagu populer.
- Isi `timeline.music = {"src": "audio/music.mp3", "volume": 0.15}`. `Video.tsx` otomatis menurunkan musik saat VO bicara, menaikkan di sela, dan fade-out 1,5 detik di akhir.
- Panduan genre ada di tiap preset (`styles.md`).

## Loudness
`scripts/finish.sh` menormalkan ke -14 LUFS, true peak -1,5 dB: standar YouTube, TikTok, Instagram.
