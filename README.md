# Portfolio - Marcos Retamero

Estructura del proyecto reorganizada siguiendo buenas practicas de separacion de responsabilidades (HTML / CSS / JS).

## Estructura de carpetas

```
portfolio_marcos_retamero/
├── index.html          # Estructura y contenido (HTML semantico)
├── css/
│   └── style.css        # Todos los estilos (variables CSS, tema claro/oscuro, layout, animaciones)
├── js/
│   └── main.js           # Logica de interactividad (loader, cursor personalizado, toggle de tema, etc.)
└── assets/               # Carpeta reservada para imagenes, iconos y fuentes locales
```

## Buenas practicas aplicadas

- Separacion de HTML, CSS y JS en archivos independientes (antes todo estaba inline en un unico .html).
- CSS enlazado mediante `<link rel="stylesheet">` en el `<head>`.
- JS cargado con el atributo `defer` para no bloquear el renderizado y ejecutarse tras el parseo del DOM.
- Carpeta `assets/` preparada para centralizar recursos estaticos (imagenes, iconos, fuentes) en lugar de usar rutas dispersas o data URIs.
- Nombres de archivo en minusculas y con guiones, consistentes con convenciones web estandar.

## Siguientes pasos recomendados

- Si el proyecto crece, considerar dividir `main.js` en modulos (ej. `theme.js`, `cursor.js`, `animations.js`) usando ES Modules.
- Anadir un `package.json` si se introduce un bundler (Vite, Parcel) o un framework.
- Mover iconos/fuentes externas (Google Fonts) a local si se busca rendimiento offline.
