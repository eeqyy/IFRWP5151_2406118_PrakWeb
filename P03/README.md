# Modul 3 — Penambahan Styling (HTML + CSS)

Versi lanjutan dari Modul 2 (`../P02/`) dengan penambahan **CSS eksternal**.

## Halaman

`index.html` · `about.html` · `skill.html` · `educational.html` ·
`experience.html` · `project.html` · `resume.html` · `kontak.html` ·
`style.css`

## Yang Dibedakan dari Modul 2

- Konten HTML **identik** dengan `P02/` — yang berubah adalah additions gaya.
- Setiap halaman menambahkan `<link rel="stylesheet" href="style.css">`.
- `style.css` dipecah per komponen: reset, header, navigasi, main, section,
  judul, gambar, form, aside, footer, dan media query HP.
- Ditambahkan elemen `<aside>` pada `index.html` untuk blok status.

## Tema Warna

| Peran | Warna |
| --- | --- |
| Latar halaman | `#ffe4ba` (krem) |
| Header | `#669bbc` (biru) |
| Latar section | `#e8f1f8` (biru muda) |
| Aksen / border | `#bd0606` (merah) |
| Teks utama | `#1f2937` |

Rasio kontras teks utama terhadap latar section dan warna aksen memenuhi
standar WCAG AA.

## Media Query

```css
@media (max-width: 700px) {
  nav ul { flex-direction: column; }
  section { padding: 20px; }
}
```
