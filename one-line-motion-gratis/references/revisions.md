# Kamus revisi

Ubah permintaan bebas menjadi perubahan presisi: **adegan → elemen → properti → nilai**. Ubah hanya itu, lalu sebutkan apa yang berubah.

| Pengguna bilang | Artinya di kode |
|---|---|
| "lebih besar / kecil" | `size`/`scale` elemen ±25% (cek area aman lagi) |
| "lebih pelan / cepat" | durasi interpolate ×1,5 / ×0,7; spring stiffness turun/naik |
| "kurang hidup", "kaku" | tambah gerak sekunder, overshoot, stagger, kamera |
| "terlalu ramai" | buang elemen sekunder, kurangi partikel, satu fokus |
| "kasih wajah" | tambah mata (+kedip) dan mulut sesuai gaya preset |
| "warnanya kurang nendang" | naikkan saturasi aksen, pertegas kontras latar |
| "teksnya kebanyakan" | potong ke ≤ 6 kata/baris, sisanya biar narasi yang bicara |
| "suaranya kecepetan" | pendekkan naskah atau ganti setelan suara, generate ulang VO adegan itu |
| "ganti suara" | generate ulang semua VO dengan suara baru, lalu `sync-timeline.mjs` |
| "musiknya ganggu" | turunkan `music.volume` ke 0,08–0,1 atau ganti track |
| "hook-nya kurang" | ganti adegan 1: pertanyaan lebih tajam, visual paling aneh/besar di detik 0 |
| "bikin versi YouTube" | render `Video-16x9`, periksa tata letak horizontal di QA sheet |
| "ganti warna brand" | ubah `brand.json` saja, render ulang |

Alur:
1. Tulis rencana singkat ("Adegan 3: bulan 1,4× lebih besar, tambah wajah berkedip; mobil 30% lebih pelan").
2. Kerjakan. Bila narasi berubah: generate ulang VO adegan itu → `sync-timeline.mjs`.
3. Bila tata letak berubah: `qa-sheet.mjs` → cek → render.
4. Catat di `notes/revisions.md`.

Bila permintaan ambigu ("bikin lebih bagus"), tawarkan 2–3 interpretasi konkret dalam satu pertanyaan.
