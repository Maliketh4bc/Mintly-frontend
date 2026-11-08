# Mintly-frontend

Panel web de Mintly, aplicación para coleccionar cartas Pokémon. TFG de 2º DAM de Marco Álvarez y Curro Portillo.

## Tecnologías

Angular 19 con CSS, Angular Router y Tailwind CSS 4. Tipografías Inter y Space Grotesk, cargadas desde Google Fonts.

## Instalación y arranque

```bash
npm install
ng serve -o
```

La aplicación se abre en `http://localhost:4200`. Necesita el backend (Mintly-backend) arrancado en `http://localhost:3000` cuando empiece a consumir la API.

## Versiones

| Herramienta | Versión |
|---|---|
| Node.js | 22.23.3 |
| npm | 10.9.9 |
| Angular CLI | 19.2.27 |
| Angular | 19.2.25 |
| TypeScript | 5.7.3 |
| RxJS | 7.8.2 |
| zone.js | 0.15.1 |
| Tailwind CSS | 4.3.5 |
| @tailwindcss/postcss | 4.3.5 |
| PostCSS | 8.5.32 |

## Estilos

La paleta de Mintly y las tipografías están definidas una sola vez en `src/styles.css`, dentro del bloque `@theme`. Colores disponibles como clases de Tailwind: `ink`, `paper`, `mint`, `mint-deep` y `mist`. Fuentes: `font-sans` para el texto, que es Inter, y `font-display` para los títulos, que es Space Grotesk.