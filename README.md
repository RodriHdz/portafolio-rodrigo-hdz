# Portafolio de Rodrigo Quiroz

Portafolio personal desarrollado con HTML, CSS, JavaScript Vanilla, Bootstrap 5 y Vite.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Instalación

```bash
npm install
```

## Iniciar el servidor de desarrollo

```bash
npm run dev
```

Vite mostrará la dirección local para abrir el proyecto en el navegador.

## Compilar para producción

```bash
npm run build
```

Los archivos finales se generan en `dist/`.

## Estructura del proyecto

```text
portafolio-rodrigo-shinobi/
├── public/
│   ├── favicon.svg
│   └── vendor/
│       ├── bootstrap.bundle.min.js
│       └── bootstrap.min.css
├── src/
│   ├── assets/
│   │   └── rodrigo-avatar.png
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
└── README.md
```

## ¿Dónde modificar el contenido?

- `index.html`: textos, secciones, tecnologías, proyectos y enlaces.
- `src/style.css`: colores, tamaños, distribución, efectos y animaciones.
- `src/main.js`: menú responsive, animaciones al desplazarse, navegación activa, ventanas de proyectos y formulario de contacto.

**Importante:** todo el contenido HTML está escrito directamente en `index.html`. JavaScript no crea ni inserta etiquetas HTML; solo controla las interacciones y actualiza texto cuando es necesario.

## Configurar tus enlaces

Al principio de `src/main.js`, completa estas constantes:

```javascript
const CONTACT_EMAIL = 'tu-correo@ejemplo.com';
const GITHUB_URL = 'https://github.com/tu-usuario';
const LINKEDIN_URL = 'https://www.linkedin.com/in/tu-perfil/';
```

Para agregar tu CV, guarda el PDF dentro de `public/` y crea un enlace en `index.html` que apunte a `/tu-cv.pdf`.

Bootstrap se incluye localmente, por lo que sus estilos y componentes no dependen de una CDN.
