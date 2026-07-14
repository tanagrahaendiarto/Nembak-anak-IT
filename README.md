# For You — Interactive Digital Love Letter

Sebuah website interaktif bertema **digital love letter** yang dibuat menggunakan HTML, CSS, dan JavaScript.

Project ini awalnya dibuat sebagai project sederhana untuk bersenang-senang, kemudian dikembangkan ulang menjadi pengalaman web yang lebih interaktif dan sinematik dengan transisi antar scene, musik latar, galeri kenangan, pilihan interaktif, dan ending yang berubah berdasarkan pilihan pengguna.

## Tentang Project

Website ini menggunakan konsep **interactive storytelling**, di mana pengguna mengikuti beberapa scene secara berurutan:

1. Opening
2. Personal Message
3. Memory Timeline
4. The Question
5. Choose a Moment
6. Final Reveal

Setiap scene dirancang untuk menciptakan pengalaman yang sederhana, personal, dan sinematik.

## Fitur

- Transisi antar scene
- Pengalaman interaktif berbasis storytelling
- Background music
- Kontrol play/pause musik
- Efek fade-in pada musik
- Memory cards dengan gambar
- Pertanyaan interaktif
- Tombol `Not Yet` yang menghindar saat akan diklik
- Pilihan aktivitas
- Pemilihan tanggal
- Ending dinamis berdasarkan pilihan pengguna
- Responsive untuk desktop dan mobile
- Ambient background glow
- Efek grain yang halus
- Typography bergaya editorial

## Teknologi yang Digunakan

- HTML5
- CSS3
- Vanilla JavaScript

Project ini tidak menggunakan framework atau library JavaScript tambahan.

## Struktur Project

```text
NEMBAK-ANAK-IT/
├── assets/
│   ├── images/
│   │   ├── memory-1.jpg
│   │   ├── memory-2.jpg
│   │   └── memory-3.jpg
│   │
│   └── music/
│       └── about-you.mp3
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── index.html
└── README.md
```

## Cara Kerja

Website ini menggunakan sistem berbasis **scene**.

Setiap bagian website direpresentasikan sebagai elemen dengan class `.scene`.

Contoh:

```html
<section class="scene" id="scene2">
  ...
</section>
```

Scene yang sedang ditampilkan memiliki class tambahan `.active`.

```html
<section class="scene active" id="scene1">
  ...
</section>
```

JavaScript mengatur perpindahan antar scene dengan menghapus class `active` dari scene sebelumnya dan menambahkannya ke scene berikutnya.

Project ini juga menyimpan state sementara dari interaksi pengguna:

```js
const experience = {
  currentScene: 1,
  selectedMoment: null,
  selectedDate: null,
  accepted: false,
  musicPlaying: false,
};
```

Data tersebut digunakan untuk mengatur pengalaman pengguna dan menampilkan ending berdasarkan pilihan yang dibuat.

## Menjalankan Project

Clone repository:

```bash
git clone URL_REPOSITORY
```

Masuk ke folder project:

```bash
cd NEMBAK-ANAK-IT
```

Kemudian jalankan `index.html` menggunakan local development server seperti **Live Server** di Visual Studio Code.

## Kustomisasi

Website ini dapat dipersonalisasi dengan mengubah:

- Nama dan teks di `index.html`
- Foto kenangan di `assets/images/`
- Musik latar di `assets/music/`
- Warna dan typography di `css/style.css`
- Interaksi di `js/script.js`

### Mengganti Musik

Ganti file:

```text
assets/music/about-you.mp3
```

Jika nama file musik diubah, sesuaikan juga bagian audio di `index.html`.

### Mengganti Foto

Ganti file:

```text
memory-1.jpg
memory-2.jpg
memory-3.jpg
```

dengan foto lain menggunakan nama file yang sama.

Jika menggunakan nama file yang berbeda, ubah path gambar di `index.html`.

## Arah Desain

Desain website ini berfokus pada:

- Nuansa gelap dan sinematik
- Aksen burgundy dan soft pink
- Typography bergaya editorial
- Interface minimal
- Animasi yang halus
- Interactive storytelling

Tujuannya adalah menciptakan pengalaman yang personal dan menarik tanpa menggunakan terlalu banyak efek visual yang tidak diperlukan.

## Pengembangan Selanjutnya

Beberapa fitur yang dapat dikembangkan:

- Modal detail untuk setiap memory
- Animasi scene yang lebih kompleks
- Custom cursor interaction
- Final reveal animation
- Kartu kenangan yang dapat disimpan
- Dukungan gesture untuk perangkat mobile
- Sistem konfigurasi untuk personalisasi
- Deployment menggunakan GitHub Pages

## Author

Dibuat oleh **Tana Graha**.

---

Project pribadi untuk bereksperimen dengan HTML, CSS, JavaScript, dan interactive web storytelling.