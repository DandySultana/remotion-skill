# 10 preset gaya (One Line Motion Gratis)

Pilih satu preset per video, tulis namanya di `brand.json` (`preset`). Palet di bawah adalah titik awal; sesuaikan dengan brand pengguna. Setiap preset mencantumkan: tampilan, gerak, huruf, suara, dan jebakan yang harus dihindari.

| Kode | Preset | Paling cocok untuk |
|---|---|---|
| `kartun-flat` | Kartun Flat | explainer umum, edukasi anak & remaja |
| `papan-sains` | Papan Sains | IPA, rumus, proses |
| `sinematik` | Sinematik | fakta "wow", alam, pembuka premium |
| `clay` | Clay | konten lucu, anak, produk ramah |
| `retro` | Retro Neon | hiburan, teknologi, musik |
| `cat-air` | Cat Air | dongeng, edukasi anak, refleksi |
| `pixel` | Pixel 8-bit | gaming, teknologi, fakta seru |
| `komik` | Panel Komik | cerita lucu, edukasi, kisah pelanggan |
| `stickman` | Stickman | tips relatable, humor kantor |
| `lowpoly` | Low-poly 3D | geografi, alam, teknologi |

Versi lengkap One Line Motion berisi 52 preset (iklan UMKM, 3D bedah tembus pandang, peta, editorial, dan lainnya): onelinemotion.com

---

## kartun-flat — Kartun Flat
- **Tampilan**: bentuk membulat, outline gelap 6px, warna cerah, karakter berwajah sederhana (mata titik, pipi merona), bayangan datar satu tingkat.
- **Palet**: `#0F1B33` `#1D2F57` `#FFC93C` `#FF5C7A` `#4FC3F7`
- **Gerak**: spring dengan overshoot, squash & stretch ringan saat mendarat, karakter berkedip dan bernapas (scale 1→1,02).
- **Huruf**: Baloo 2 (judul) + Nunito (subtitle).
- **Suara**: ukulele/playful; pop, boing, ding, whoosh.
- **Hindari**: terlalu banyak warna; maksimal 5 di luar warna ilustrasi spesifik.

## papan-sains — Papan Sains
- **Tampilan**: latar biru tua, garis kapur/neon tipis, diagram berpanah, rumus, grid samar.
- **Palet**: `#0B1E2D` `#123047` `#E8F1F2` `#5CE1E6` `#FFD166`
- **Gerak**: garis menggambar diri (`DrawPath`), label muncul mengikuti panah, zoom ke detail.
- **Huruf**: Caveat untuk label, Space Grotesk untuk angka/rumus.
- **Suara**: elektronik ringan; click, ding.

## sinematik — Sinematik
- **Tampilan**: 3 lapisan parallax (depan bergerak 2–3× lebih cepat), satu color grade per video (teal-oranye, biru dingin, emas hangat, hijau lembap), kabut, sinar cahaya, partikel, vignette 30%, grain 5%.
- **Gerak**: kamera selalu bergerak pelan (push-in 1→1,08); tanpa overshoot (`theme.spring.soft`, `theme.ease.smooth`); satu momen klimaks cepat per video (whip/zoom tajam + `impact.wav`); transisi dip-to-black 10 frame atau match cut.
- **Huruf**: Playfair Display tipis, atau Inter kapital dengan letter-spacing 0,2em; fade + naik + blur 8→0.
- **Suara**: VO tenang ±2,0 kata/detik; riser, impact rendah; hening 0,5 detik sebelum reveal.

## clay — Clay
- **Tampilan**: bentuk tebal membulat, gradasi radial + highlight, noise sidik jari halus, latar kain.
- **Palet**: `#F2E8DC` `#E76F51` `#2A9D8F` `#E9C46A` `#264653`
- **Gerak**: stop-motion 12 fps, squash & stretch kuat, getaran "boiling" kecil tiap langkah.
- **Huruf**: Baloo 2 tebal.
- **Suara**: quirky; boing, pop.

## retro — Retro Neon
- **Tampilan**: gradasi ungu-pink-oranye, matahari bergaris, grid lantai melaju, glow neon, scanline + chromatic aberration tipis.
- **Palet**: `#14002B` `#3C096C` `#FF006E` `#FB5607` `#3A86FF`
- **Gerak**: grid melaju terus, glitch 4–6 frame saat transisi.
- **Huruf**: Space Grotesk tebal dengan glow.
- **Suara**: synthwave; swoosh, impact.

## cat-air — Cat Air
- **Tampilan**: sapuan warna transparan yang merembes di tepi (blur + `feTurbulence`/`feDisplacementMap`), tekstur kertas basah, lapisan warna saling menumpuk.
- **Palet**: `#FBF7EF` `#7FB7D9` `#F2A7A0` `#F6D27A` `#8CC59A`
- **Gerak**: warna "mekar" dari tengah (scale + blur turun), objek muncul dari genangan warna, tempo pelan.
- **Huruf**: Caveat atau Playfair Display tipis.
- **Suara**: piano/akustik lembut; swoosh halus, ding kecil.
- **Hindari**: garis tepi tegas dan warna jenuh; kehilangan kesan basah.

## pixel — Pixel 8-bit
- **Tampilan**: semua bentuk dari kotak piksel (grid 8–12 px), palet terbatas, bayangan blok, HUD skor ala game.
- **Palet**: `#1A1C2C` `#5D275D` `#B13E53` `#EF7D57` `#FFCD75` `#38B764`
- **Gerak**: posisi dibulatkan ke grid, animasi 8–12 fps, karakter melompat, koin berputar.
- **Huruf**: Space Grotesk tebal kapital, atau teks dari kotak piksel.
- **Suara**: synthwave/chiptune; click, pop, ding.
- **Hindari**: meniru karakter atau judul game yang ada.

## lowpoly — Low-poly 3D
- **Tampilan**: bidang segitiga dengan shading datar (warna berbeda per sisi), langit gradien, kabut tipis.
- **Palet**: `#1E3A5F` `#3D7EA6` `#8FC1A9` `#F1F5F2` `#F4A259`
- **Gerak**: kamera berputar pelan (skew/scale), puncak tumbuh, awan bergeser.
- **Huruf**: Space Grotesk.
- **Suara**: angkasa/ambient; whoosh.

## komik — Panel Komik
- **Tampilan**: panel bergaris hitam tebal, balon kata, efek bunyi besar ("BAM!"), titik halftone, warna cerah.
- **Palet**: `#FFFFFF` `#111111` `#FFD23F` `#EE4266` `#3BCEAC`
- **Gerak**: panel masuk satu per satu, balon kata pop, zoom dramatis ke panel.
- **Huruf**: Anton (efek bunyi) + Nunito (balon).
- **Suara**: funk; impact, boing.
- **Hindari**: meniru karakter komik yang ada.

## stickman — Stickman
- **Tampilan**: figur garis hitam sederhana dengan kepala bulat, properti seadanya, latar putih bersih, satu warna aksen.
- **Palet**: `#FFFFFF` `#1A1A1A` `#FF5A36`
- **Gerak**: pose ke pose yang jelas, ekspresi dari postur, humor timing.
- **Huruf**: Caveat atau Inter.
- **Suara**: lo-fi; pop, boing.
