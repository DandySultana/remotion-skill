// Daftar demo: satu per preset gaya. "sentences" = narasi persis seperti dibacakan VO,
// satu kalimat per adegan (dipakai untuk subtitle dan pembagian adegan).
export type DemoConfig = {
  id: string;
  title: string;
  style: string;
  music: string;
  voice: string;
  sentences: string[];
};

export const DEMOS: DemoConfig[] = [
  {id: '01-kartun', title: 'Kenapa langit biru?', style: 'Kartun Flat', music: 'ceria', voice: 'honeypie',
    sentences: ['Pernah kepikiran, kenapa langit warnanya biru?', 'Cahaya Matahari kelihatan putih, padahal isinya campuran semua warna pelangi.', 'Saat masuk ke udara, cahaya menabrak molekul gas, dan warna biru dipantulkan ke segala arah, kira-kira lima kali lebih kuat daripada merah.', 'Jadi, ke mana pun kamu menoleh, birunya ikut kelihatan!']},
  {id: '04-sains', title: 'Kenapa es mengapung?', style: 'Papan Sains', music: 'tech', voice: 'Sikedewi',
    sentences: ['Hampir semua benda menyusut saat membeku, tapi air justru sebaliknya.', 'Saat jadi es, molekul air menyusun diri jadi kisi berongga, sehingga volumenya bertambah sekitar sembilan persen.', 'Karena lebih ringan dari air di sekitarnya, es pun mengapung.']},
  {id: '06-sinematik', title: 'Matahari 8 menit lalu', style: 'Sinematik', music: 'angkasa', voice: 'Bram',
    sentences: ['Matahari berjarak sekitar seratus lima puluh juta kilometer dari Bumi.', 'Cahayanya butuh delapan menit lebih, untuk sampai ke mata kita.', 'Artinya, Matahari yang kamu lihat sekarang adalah Matahari delapan menit yang lalu.']},
  {id: '11-clay', title: 'Kucing tukang tidur', style: 'Clay', music: 'ceria', voice: 'honeypie',
    sentences: ['Kucing bisa tidur dua belas sampai enam belas jam sehari.', 'Itu karena tubuhnya dirancang untuk berburu dengan ledakan energi singkat.', 'Jadi, tidurnya bukan malas, tapi lagi isi baterai!']},
  {id: '12-retro', title: 'Disket vs HP-mu', style: 'Retro Neon', music: 'synthwave', voice: 'Putra',
    sentences: ['Dulu, satu disket cuma muat satu koma empat empat megabyte.', 'HP kamu yang seratus dua puluh delapan giga, setara hampir sembilan puluh ribu disket.', 'Kalau ditumpuk, tingginya hampir tiga ratus meter!']},
  {id: '25-cat-air', title: 'Kenapa pelangi melengkung?', style: 'Cat Air', music: 'piano', voice: 'Maya',
    sentences: ['Pernah lihat pelangi setelah hujan?', 'Cahaya Matahari dibiaskan butiran air, dan tiap warna keluar pada sudut sekitar empat puluh dua derajat.', 'Karena sudutnya sama ke segala arah, pelangi pun berbentuk lengkung.']},
  {id: '27-pixel', title: 'Kenapa game lama kotak-kotak?', style: 'Pixel 8-bit', music: 'synthwave', voice: 'Pratama',
    sentences: ['Dulu, konsol game cuma punya memori yang sangat kecil.', 'Setiap gambar disusun dari kotak-kotak kecil bernama piksel, dengan warna yang terbatas.', 'Keterbatasan itu justru melahirkan pixel art yang masih dicintai sampai sekarang!']},
  {id: '33-komik', title: 'Lupa simpan file', style: 'Panel Komik', music: 'funk', voice: 'Putra',
    sentences: ['Lagi asyik kerja, tiba-tiba laptop mati!', 'File berjam-jam hilang, karena lupa disimpan.', 'Biasakan tekan Control S, atau nyalakan simpan otomatis!']},
  {id: '34-stickman', title: 'Aturan dua puluh', style: 'Stickman', music: 'lofi', voice: 'Sikedewi',
    sentences: ['Kerja seharian di depan laptop?', 'Setiap dua puluh menit, lihat benda sejauh enam meter selama dua puluh detik.', 'Matamu jadi lebih rileks, kerja pun lebih fokus.']},
  {id: '43-lowpoly', title: 'Puncak Jaya', style: 'Low-poly 3D', music: 'angkasa', voice: 'Putra',
    sentences: ['Gunung tertinggi di Indonesia ada di Papua.', 'Namanya Puncak Jaya, tingginya sekitar empat ribu delapan ratus delapan puluh empat meter.', 'Di dekat puncaknya bahkan ada es abadi, yang kini terus menyusut.']},
];
