# Registro de cambios

Referencia de modificaciones realizadas en el proyecto. Actualizar este archivo
cada vez que se haga un cambio significativo.

## 2026-09-14 — Tipografía de títulos: Space Grotesk → Rubik

- `src/index.css`: el import de Google Fonts ahora carga Rubik en lugar de
  Space Grotesk (Inter se mantiene para el body).
- `tailwind.config.js`: `fontFamily.heading` pasa a `['Rubik', 'sans-serif']`.
- Probado visualmente: Hero, Normas y demás títulos renderizan con Rubik.

## 2026-09-14 — Footer mobile: logo + redes en una línea centrada

- `src/components/Footer.jsx`: en mobile el logo y los íconos de redes quedan
  en la misma fila, centrados (línea decorativa también centrada). Desde
  `md` se mantiene el layout apilado y alineado a la izquierda.

## 2026-09-14 — Clientes: header alineado a la izquierda

- `src/components/Testimonios.jsx`: el título de la sección pasa de centrado
  a alineado a la izquierda (animación `x: -50` como Galería) y en dos
  líneas: "Empresas que nos" / "eligen" con `gradient-text`.

## 2026-09-14 — Navbar y footer: enlaces "Proceso" y "Normas"

- `src/components/Navbar.jsx`: `navLinks` ahora incluye "Proceso"
  (`#como-lo-hacemos`) y "Normas" (`#normas`), entre Galería y Clientes.
  Verificado que la barra no desborda en 1024/1280/1440.
- `src/components/Footer.jsx`: `companyLinks` (columna "Empresa") suma los
  mismos dos enlaces.

## 2026-09-14 — Footer: bottom bar simplificada

- `src/components/Footer.jsx`: se eliminaron los links rápidos del bottom
  bar (Quiénes Somos, Galería, Clientes, Contacto) en desktop; queda solo el
  botón "volver arriba".
- La leyenda ahora tiene dos líneas: el copyright y debajo
  "Desarrollo Web by NexusCode". Todo el bottom bar quedó centrado en
  desktop y mobile (leyenda + flecha de volver arriba).

## 2026-09-14 — Footer: redes sociales + fix scroll horizontal del Hero

- `src/components/Icons.jsx`: nuevos `FacebookIcon`, `InstagramIcon` y
  `XIcon` (SVG inline con `fill="currentColor"`, porque lucide-react ya no
  incluye íconos de marcas).
- `src/components/Footer.jsx`: el texto "Fabricantes de carrocerías para
  camiones. Miembro CAPEMISA…" se reemplazó por los 3 íconos de redes en
  botones circulares con la paleta del sitio (gris → verde al hover, sin
  colores de marca). Las URLs quedan vacías en `socialLinks` para completar.
- **Fix:** scroll horizontal al scrollear el Hero en responsive. El video de
  fondo escala a `1.15` y la sección no recortaba el desborde (hasta 58px).
  Se agregó `overflow-hidden` a la `<section id="inicio">`.

## 2026-09-14 — Contacto unificado en el footer

- Eliminada la sección `src/components/Contacto.jsx` (junto con el mapa) y
  su uso en `App.jsx`.
- El bloque "Cotizá tu proyecto" del `Footer.jsx` pasa a ser la sección
  **Contacto**: id `#contacto` (los links del navbar siguen funcionando),
  eyebrow cambiado a "Contacto".
- Debajo del recuadro CTA se agregaron las 4 tarjetas de contacto (Llamanos,
  WhatsApp, Email y Ubicación + horario) extraídas de la sección eliminada,
  con animación `whileInView`.
- El botón "Solicitar cotización" sigue apuntando a `#contacto` (ahora esa
  misma sección).

## 2026-09-14 — Secciones "Cómo lo Hacemos" y "Normas que nos Avalan"

- **Nuevo:** `src/components/ComoLoHacemos.jsx` (id `como-lo-hacemos`) entre
  Galería y Normas: video de proceso de Cloudinary (`q_auto`) en marco
  `aspect-video` con glow, esquinas técnicas, badge "Tecnología CNC" y botón
  play/pause (respeta `prefers-reduced-motion`: sin autoplay).
- Panel de equipamiento: "Equipamiento de 1º generación CNC" con 6 ítems
  (Plegadora, Corte Láser, Guillotina, Soldadoras semiautomáticas, Serrucho
  sin fin, Sistema de pintura Airmix), cada uno con ícono lucide y hover
  verde; marca de agua "CNC" de fondo.
- **Nuevo:** `src/components/Normas.jsx` (id `normas`) entre Como lo Hacemos
  y Testimonios: video de grúas, badge "Respaldo oficial" y 4 acreditaciones
  como tarjetas glass con ícono, tag, título, descripción y número `01–04`:
  CNTSV, AITA, CAPEMISA y **HIDRO-GRUBERT — Servicio oficial Palfinger**.
- Ambas secciones comparten fondo: degradado `black → dark-800 → black`,
  grilla técnica de 56px con máscara radial, glows verdes y hairlines
  `trebol-500/20`.
- **Nuevo:** `getVideoUrl` y `getVideoPoster` en `src/lib/cloudinary.js`.
  El poster se genera con `so_1` (el primer frame suele ser negro por el
  fundido de entrada) a partir del `.mp4`.
- Si el video no arranca (p. ej. `prefers-reduced-motion`), se muestra un
  botón de play central en ambas secciones para que sea evidente.

## 2026-09-10 — Footer: rediseño visual + contenido

- `src/components/Footer.jsx`:
  - Fondo coherente con Testimonios: degradado `dark-900 → black`, grilla
    técnica de 56px con máscara radial desde arriba, glow verde
    (`trebol-500/10`, blur 140px) y hairline superior.
  - Banda CTA convertida en panel destacado con borde degradado
    (`p-px` + `rounded-[2rem]`), fondo `dark-900/90` con blur y eyebrow
    "Cotizá tu proyecto".
  - Logo del footer más grande (`h-16 md:h-20`) y línea de acento verde.
  - Títulos de columna con subrayado degradado verde.
  - Links con subrayado animado al hover (crece de 0 a 100%).
  - Contacto ampliado: WhatsApp, email, dirección clickeable a Google Maps
    y horarios (Lun - Vie 8:00–18:00) con ícono `Clock`.
  - "Empresa" ahora incluye "Quiénes Somos"; bottom bar con links rápidos
    (ocultos en mobile) + botón volver arriba con `aria-label`.
  - Eliminado el `<div>` vacío que quedaba junto al logo.

## 2026-09-10 — Testimonios: fondo grilla técnica + logos reales

- `src/components/Testimonios.jsx`:
  - Fondo nuevo: degradado `black → dark-800 → black`, grilla técnica de
    56px (líneas `white/6%`) con máscara radial que se desvanece, dos glows
    verdes (`trebol-500/10` y `trebol-700/10`, blur 120px) y hairlines
    `trebol-500/20` arriba/abajo (coherente con Quiénes Somos).
  - Clientes actualizados a 8 empresas reales con logos de Cloudinary:
    Hidrotec, Serminca, Hierronort, Aramis, Kajai, Siates, CN Grupo y
    La Estrella. URLs procesadas con `getLogoUrl`.
  - **Nuevo:** `getLogoUrl` en `src/lib/cloudinary.js`: recorta los bordes
    transparentes de los logos (`e_trim`) y aplica `f_auto,q_auto`. Los
    logos venían en lienzos cuadrados con mucho margen, por eso se veían
    chicos; con `e_trim` ocupan todo el alto disponible.
  - Logos: `max-h-16 md:max-h-20 max-w-[85%]`, `opacity-60` en reposo →
    `opacity-100` + `scale-105` al hover (no se usa grayscale porque son
    monocromos blancos).
  - Se eliminó el placeholder de iniciales y el nombre inferior (los logos
    ya incluyen el nombre). Grilla `grid-cols-2 md:grid-cols-4` (4×2 en
    desktop). Tarjetas `bg-dark-800/60 backdrop-blur-sm`.

## 2026-09-10 — Cloudinary: helper de imágenes optimizadas (migración lista)

- **Nuevo:** `src/lib/cloudinary.js` — `getImageUrl(path)` con el patrón del
  otro proyecto (`CLOUD_NAME = "da1hje3a1"`):
  - URL completa de Cloudinary → inyecta `f_auto,q_auto` si falta.
  - Public ID (`trebol/archivo`) → arma la URL optimizada.
  - Ruta local (`/img/...`) → se devuelve igual (transición, hasta migrar).
- Componentes conectados al helper: `Productos.jsx` (imagen de fondo),
  `ImageCarousel.jsx` (imagen principal y miniaturas), `Galeria.jsx`,
  `Navbar.jsx` y `Footer.jsx` (logo).
- **Pendiente:** subir las 11 imágenes a la carpeta `trebol/` de Cloudinary,
  reemplazar las rutas en los arrays y luego borrar `public/img`.

## 2026-09-10 — Productos: rollback a ImageCarousel (miniaturas clicables)

- `src/components/Productos.jsx`: se volvió a `ImageCarousel` (import + uso).
  El slider apilado `ImageStackSlider` queda intacto y sin uso. Solo se tocó
  Productos (Galeria no se modificó).

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
