# Registro de cambios

Referencia de modificaciones realizadas en el proyecto. Actualizar este archivo
cada vez que se haga un cambio significativo.

## 2026-09-07 — Productos: nuevo slider apilado (ImageStackSlider)

- **Nuevo:** `src/components/ImageStackSlider.jsx` (reutilizable, props:
  `images`, `alt` opcional, `autoplayMs` opcional).
  - Estado `currentIndex` + `nextSlide()` / `prevSlide()` con wrap circular.
  - Autoplay cada 3s con pausa al hover; desactivado con
    `prefers-reduced-motion`.
  - Offset circular más corto (misma lógica que Galeria) → sin saltos en el
    loop, la primera y la última se conectan suavemente.
  - Slides `absolute inset-0` con `transform: translateX(offset*45%) scale(...)`,
    `opacity` y `zIndex` por índice + `transition-all duration-500 ease-out`:
    activa (scale 1, opacity 1, z-30) → ±1 (scale 0.85, opacity 0.6, z-20) →
    ±2 (scale 0.7, opacity 0.2, z-10) → resto oculto.
  - Contenedor `relative overflow-hidden rounded-2xl aspect-video` (sin
    overflow horizontal), flechas prev/next al estilo existente e indicadores
    inferiores (dots, activo alargado `trebol-500`, clicables).
  - Responsive: translateX en % escala con el ancho del contenedor.
  - **Modal de imagen ampliada:** clic en la imagen activa abre un modal
    (framer-motion, `AnimatePresence`) con la imagen en grande
    (`max-h-[80vh] object-contain`), flechas prev/next, botón cerrar (X),
    clic en el fondo para cerrar, tecla `Escape` y flechas del teclado.
    El autoplay se pausa mientras el modal está abierto y se bloquea el
    scroll del body (`overflow: hidden`).
- `src/components/Productos.jsx`: se reemplazó el uso de `ImageCarousel` por
  `ImageStackSlider` (import + una línea). El resto del panel no cambió.
- `src/components/ImageCarousel.jsx`: queda intacto y sin uso; rollback =
  volver a importar/usar `ImageCarousel`.

## 2026-09-07 — Galería: carrusel "naipe de cartas" (abanico 2D)

- `src/components/Galeria.jsx` reescrito por completo (reemplaza al marquee).
  - Solo imágenes de `public/img` (10 fotos), sin specs.
  - **Abanico 2D con framer-motion:** carta activa al frente (centro) y las
    demás se abren a los costados según `offset = i - active`:
    `x: calc(-50% + offset*34%)`, `rotate: -offset*8deg`,
    `scale: 1 - min(|offset|,3)*0.12`, `opacity` decreciente, `zIndex 20 - |offset|`.
  - Transición spring (stiffness 260, damping 30).
  - Controles: flechas prev/next, clic en cartas laterales para traerlas al
    frente, flechas del teclado (←/→) y contador `01 / 10`.
  - Autoplay cada 3s con pausa al hover; desactivado con
    `prefers-reduced-motion`.
  - **Loop infinito sin saltos:** el offset de cada carta se calcula con la
    distancia circular más corta (`((i - active + n/2) % n) - n/2`), por lo que
    pasar de la última a la primera imagen es un paso normal del abanico.
  - Solo la carta central se ve a color real; las demás se opacan y desenfocan
    progresivamente (`grayscale` + `blur` + `opacity` animados).
  - Carta activa con anillo `ring-trebol-500/60`; máscara de desvanecido en
    bordes; tamaño `w-72` (mobile) / `w-[34rem]` (desktop), `aspect-[4/3]`.
  - Se eliminó el contador `01 / 10`.
  - Header y animación de entrada se mantienen.

## 2026-09-07 — Textos: formato unificado (estilo Quiénes Somos)

- `src/components/QuienesSomos.jsx`: se eliminó el eyebrow "Nuestra Empresa" y
  cada párrafo lleva ahora un check circular verde trébol en badge
  `bg-trebol-500/10 ring-trebol-500/30`.
  - Animación de entrada con framer-motion (stagger por párrafo): primero
    entra el texto (`x: 15 → 0`), luego el badge con `scale` y por último el
    trazo del check se dibuja con `pathLength` 0→1. Se dispara al entrar en
    viewport.
  - Tildes agrandados: badge `h-8 w-8`, check `h-4 w-4` (antes `h-6/h-3.5`).
- Formato de textos de cuerpo mejorado en el resto de secciones (sin tocar
  Hero ni Quiénes Somos): `text-gray-300`, `leading-relaxed` + `tracking-tight`,
  tamaños mayores.
  - `Productos.jsx`: descripción `text-lg md:text-xl`; características
    `text-sm md:text-base`.
  - `Galeria.jsx`: descripción del panel expandido `text-gray-300 text-base`.
  - `Contacto.jsx`: subtítulo `text-lg md:text-xl`, `text-gray-300`.
  - `Footer.jsx`: párrafo de marca `text-gray-400` con `tracking-tight`.

## 2026-09-07 — Nueva sección: Quiénes Somos

- **Nuevo:** `src/components/QuienesSomos.jsx`
  - Sección `#quienes-somos` entre Hero y Productos (insertada en `App.jsx`).
  - Compacta: `py-24 md:py-32` (menor que el resto, que usan `py-32 md:py-48`).
  - Fondo verde sutil: gradiente `from-black via-trebol-900/25 to-black`,
    dos glows radiales `trebol-500/10` difuminados y líneas `trebol-500/20`
    arriba/abajo.
  - Layout: grid 2 columnas (título a la izquierda con "SOMOS" en
    `gradient-text`, 4 párrafos a la derecha), animación `useInView`.
  - Texto respetado; se corrigieron cortes de palabra: "fabricación" y
    "propiciando".

## 2026-09-07 — Hero: distribución de textos (referencia: proyecto Molca)

- `src/components/Hero.jsx`
  - Se mantienen: video de fondo, overlay, cinematic bars, navbar y efectos de
    scroll (`useScroll` / `useTransform`).
  - Contenido reordenado en **bloque alineado a la izquierda** (antes centrado):
    badge → título → descripción → botones, `max-w-3xl`, dentro de
    `max-w-7xl mx-auto` con `px-6 lg:px-10`.
  - Badge estilo referencia: `bg-white/10 backdrop-blur border-white/15`,
    uppercase `tracking-[0.3em]`, con punto verde trébol.
  - Título: `leading-[0.95]`, `tracking-tighter`, con `gradient-text` en "TREBOL".
  - Descripción: izquierda, `max-w-xl md:max-w-2xl`, `text-gray-300`.
  - Botones: mismos dos CTAs (Cotizar Ahora / Ver Productos), alineados a la
    izquierda (columna en mobile).
  - Scroll indicator: línea vertical animada + texto "Trébol Carrocerías"
    (vertical) abajo a la izquierda (antes: flecha centrada abajo).
  - Sin brochure (descartado de la referencia); se respetó el contenido actual.

## 2026-09-07 — Productos: carrusel de imágenes

- **Nuevo:** `src/components/ImageCarousel.jsx`
  - Imagen principal con crossfade, flechas prev/next, contador (ej. `1 / 3`)
    y miniaturas clicables.
  - Autoplay cada 5s, se pausa al pasar el mouse. Se desactiva si el usuario
    tiene `prefers-reduced-motion: reduce`.
  - Props: `images: string[]`, `alt: string`.
- **Cambio:** `src/components/Productos.jsx`
  - Cada producto tiene ahora `gallery: string[]` (3 imágenes por producto).
    Rutas actuales en `public/img` (volcable, paqueteros, playos, volquetes,
    térmicos, extensión chasis).
  - El carrusel se renderiza dentro del panel, por encima del overlay y del
    texto (`z-10`).
    - Desktop (`md+`): columna a la derecha del texto (`md:w-72`,
      `lg:w-[26rem]`, `xl:w-[30rem]`).
    - Mobile: tarjeta flotante arriba-derecha (`w-44`, `sm:w-56`).
  - Se reestructuró el contenedor de contenido a flex (columna en mobile,
    fila con `justify-between` en desktop).

## 2026-09-07 — Productos: corrección de errores (lint + tipos)

- `src/components/Productos.jsx`
  - **ESLint (`react-hooks/set-state-in-effect`):** el estado inicial de
    `prefers-reduced-motion` se lee con `useState` lazy; el effect solo se
    suscribe al cambio (`change`), sin `setState` síncrono.
  - **Tipos (JSDoc, `checkJs`):**
    - `typedef Product` con `icon: LucideIcon`, `image`, `gallery`, etc.
    - `ProductPanel` tipado (props opcionales: `panelRef`, `imgRef`, `dimRef`,
      `textRef`; `mode: "flow" | "stack"`).
    - Refs tipadas: `panelsRef`, `imgRefs`, `dimRefs`, `textRefs` (arrays de
      elementos `| null`), `styleCache`, `areaRef`, `stageRef`, `ref` del panel.
    - `rafId` como `number | null`, `apply(p)` con `p: number`, `onChange` con
      `MediaQueryListEvent`.
    - `e.currentTarget.src` en el `onError` de la imagen (antes `e.target`).
    - `String(dimOpacity)` al asignar `dim.style.opacity`.

## Verificación

Después de cada cambio, correr y dejar sin errores:

```bash
npx eslint .
npm run typecheck
npm run build
```
