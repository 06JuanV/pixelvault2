# PixelVault 🎮

Tienda de videojuegos estática (HTML + CSS + JS puro, sin frameworks ni build step).
Pensada como catálogo curado tipo "bóveda de cartuchos": cada juego se muestra como
una tarjeta-cartucho con etiqueta, precio y categoría.

## Estructura del proyecto

```
pixelvault/
├── index.html        → estructura de toda la página (una sola página)
├── css/
│   └── styles.css     → todo el diseño; variables de color al inicio del archivo
├── js/
│   └── script.js       → catálogo de juegos (array GAMES), filtros y carrito
└── README.md
```

No hay backend ni dependencias que instalar: es HTML/CSS/JS plano, así que se puede
abrir `index.html` directamente en el navegador o publicarlo en GitHub Pages.

## Cómo verla en tu máquina

Opción rápida: doble clic en `index.html`.

Opción con servidor local (recomendado si vas a editar mucho):
```bash
cd pixelvault
python3 -m http.server 8000
# abre http://localhost:8000
```

## Publicarla con GitHub Pages

```bash
cd pixelvault
git init
git add .
git commit -m "Primera versión de PixelVault"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/pixelvault.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Source → rama `main` / carpeta `/root`** y guarda.
En un par de minutos la tienda queda publicada en
`https://TU-USUARIO.github.io/pixelvault/`.

## Cambios representativos fáciles de hacer (buenos para practicar commits)

Estos son ejemplos concretos de ediciones pequeñas y visibles, ideales para hacer
varios commits distintos y ver el historial de cambios en GitHub:

1. **Agregar un juego nuevo** — en `js/script.js`, copia una línea del array `GAMES`
   y cambia `title`, `category`, `price`, `glyph` (2-3 letras) y `desc`.
2. **Cambiar la paleta de colores** — en `css/styles.css`, edita las variables dentro
   de `:root` (por ejemplo `--accent` o `--bg`) al inicio del archivo.
3. **Editar el texto del hero** — en `index.html`, dentro de `<section class="hero">`,
   cambia el `<h1>` y el párrafo `.hero-sub`.
4. **Cambiar el código de la oferta** — en `index.html`, busca `.promo-code-value`
   (sección "Oferta de temporada").
5. **Agregar una categoría de filtro nueva** — añade un botón en `#filterTabs` con un
   `data-filter` nuevo, y asigna esa categoría a algún juego en `GAMES`.
6. **Cambiar las tipografías** — en `index.html` cambia el `<link>` de Google Fonts, y
   en `css/styles.css` actualiza `--font-display` / `--font-mono` / `--font-pixel`.

Cada uno de estos cambios toca un archivo distinto y produce un resultado visible,
lo que los hace buenos commits individuales: `git add <archivo> && git commit -m "..."`.

## Notas técnicas

- El carrito guarda su estado solo en memoria (variable `cart` en `script.js`): se
  reinicia al recargar la página. Si quieres persistencia real, se puede migrar a
  `localStorage` o a un backend.
- Los "juegos" (Nebula Drift, Iron Vale, etc.) son títulos ficticios creados para esta
  demo, para evitar usar arte o nombres de juegos reales con derechos de autor.
- El diseño usa variables CSS (`:root` en `styles.css`) para que cambiar el color de
  marca no requiera tocar cada componente por separado.
