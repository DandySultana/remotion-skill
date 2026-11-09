# Prinsip gerak & tata letak

Berlaku untuk semua preset kecuali preset menyatakan lain.

## Gerak
- **Tidak ada frame diam > 1,5 detik.** Bungkus adegan dengan `Camera` (push 1→1,05), tambahkan gerak sekunder: mengambang (`Math.sin(frame/8)`), kedip, partikel, sinar berputar.
- **Masuk dengan karakter.** `usePop`/`Pop` (spring damping 13) untuk preset ceria; `theme.spring.soft` untuk sinematik/minimal.
- **Antisipasi.** Sebelum gerak cepat, elemen mundur 5–10% selama 4–6 frame.
- **Stagger.** Elemen satu kelompok masuk berurutan, jeda `theme.stagger` (4 frame).
- **Ikuti narasi.** Elemen muncul saat kata kuncinya diucapkan. Perkiraan frame kata ke-n: `n / wordsPerSecond * fps`. Untuk presisi, ambil timestamp dari transkrip VO.
- **Gerak harus habis bersama narasi, bukan sebelumnya.** Bila animasi utama selesai jauh sebelum adegan berakhir, tambahkan gerak berulang (emisi partikel bersiklus, denyut, kamera) supaya kolom "akhir" di lembar QA tetap hidup.
- **Transisi bercerita.** Match cut, zoom ke objek, wipe searah gerak, whoosh. Hindari fade polos berulang.
- **Angka penting.** `BigNumber`: count-up lalu mendarat dengan pantulan kecil + SFX ding.
- **Easing.** `theme.ease.in` untuk masuk, `theme.ease.out` untuk keluar, `theme.ease.smooth` untuk kamera.
- **Determinisme.** Acak hanya lewat `random(seed)` dari Remotion, bukan `Math.random()`.

## Tata letak
- **Area aman 9:16**: kosongkan 12% atas dan 20% bawah (UI TikTok/Reels/Shorts). Subtitle duduk di batas 22% bawah. Teks utama di 15–70% tinggi layar.
- **Area aman 16:9**: margin 5% di semua sisi; subtitle 7% dari bawah.
- **Ukuran minimum**: judul 9:16 ≥ 96px, teks pendukung ≥ 56px; 16:9 judul ≥ 80px, pendukung ≥ 44px.
- **Kontras** teks vs latar ≥ 4,5:1. Di atas latar ramai, beri bayangan keras (`textShadow` 0 6% shadow) atau pelat gelap.
- **Satu titik fokus per momen.** Bila dua elemen bergerak bersamaan, satu harus jelas lebih kecil/pelan.
- **Jangan bertabrakan dengan subtitle.** Teks utama tidak boleh berada di pita 70–80% tinggi layar (9:16) saat `captions` aktif.

## Responsif 9:16 ↔ 16:9
Adegan membaca `useVideoConfig()`:
```tsx
const {width, height} = useVideoConfig();
const vertical = height > width;
```
Vertikal: susun atas-bawah. Horizontal: susun kiri-kanan (ilustrasi kiri, teks kanan). Ukuran font diturunkan ±15% untuk 16:9. Jangan sekadar crop.

## Performa render
- Blur besar dan banyak `feTurbulence` memperlambat render. Batasi grain ke satu lapisan (`Background`).
- Bila render lambat: `--concurrency=50%`, kurangi lapisan blur, atau render `--scale=0.5` untuk preview.
