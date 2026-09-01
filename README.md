# PKL Jalantra — Web Presentation

Website presentasi berbasis HTML, CSS, dan JavaScript vanilla yang dibuat dari materi PPT Progress Praktik Kerja Lapangan (PKL) JALANTRA — SMKN 6 Malang.

## Fitur
- One-page presentation dengan smooth scrolling
- Responsive untuk desktop, tablet, dan mobile
- Animasi reveal saat scroll
- Progress bar halaman
- Navigasi section
- Profil dengan foto yang bisa diganti melalui `script.js`
- Tanpa framework

## Cara memasukkan foto orang

Buka `script.js`, lalu ubah:

```js
image: ""
```

menjadi:

```js
image: "assets/citra.jpg"
```

Kemudian buat folder:

```text
assets/
```

dan masukkan foto sesuai nama file.

## Struktur

```text
pkl-jalantra-web/
├── index.html
├── style.css
├── script.js
└── assets/
```

Buka `index.html` di browser untuk menjalankan website.
