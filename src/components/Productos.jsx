import { useEffect, useRef, useState } from "react";
import {
  Truck,
  Package,
  Box,
  ArrowUpDown,
  Thermometer,
  Wrench,
  Check,
} from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import { getImageUrl } from "../lib/cloudinary";

/**
 * @typedef {Object} Product
 * @property {import("lucide-react").LucideIcon} icon
 * @property {string} title
 * @property {string} subtitle
 * @property {string} description
 * @property {string} image
 * @property {string} stat
 * @property {string} statLabel
 * @property {string[]} features
 * @property {string[]} gallery
 */

/** @type {Product[]} */
const products = [
  {
    icon: Truck,
    title: "Baranda Volcable",
    subtitle: "Sistema hidráulico",
    description:
      "Carrocerías baranda volcable para transporte de carga general. Sistema de volcado hidráulico con control preciso, estructura reforzada y mayor durabilidad.",
    image: "/img/volcable-amarillo.jpg",
    stat: "500+",
    statLabel: "Unidades fabricadas",
    features: [
      "Volcado hidráulico con control preciso",
      "Estructura reforzada",
      "Mayor durabilidad",
    ],
    gallery: [
      "/img/volcable-amarillo.jpg",
      "/img/volcable-blanco.jpg",
      "/img/volcable-azul.jpg",
    ],
  },
  {
    icon: Package,
    title: "Paqueteros",
    subtitle: "Distribución",
    description:
      "Soluciones robustas para transporte de paquetes. Estructura reforzada con optimización de espacio, ideal para distribución urbana y larga distancia.",
    image: "/img/paquetero-azul.jpg",
    stat: "200+",
    statLabel: "Entregas realizadas",
    features: [
      "Optimización de espacio",
      "Estructura reforzada",
      "Ideal para distribución urbana y larga distancia",
    ],
    gallery: [
      "/img/paquetero-azul.jpg",
      "/img/paque-blanco.jpg",
      "/img/paquetero-trasera.jpg",
    ],
  },
  {
    icon: Box,
    title: "Playos",
    subtitle: "Carga general",
    description:
      "Carrocerías playo para carga paletizada. Suelo reforzado con antideslizante, laterales desmontables y sistema de amarrado integrado.",
    image: "/img/playo-andina.jpg",
    stat: "300+",
    statLabel: "Proyectos completos",
    features: [
      "Suelo reforzado antideslizante",
      "Laterales desmontables",
      "Sistema de amarrado integrado",
    ],
    gallery: [
      "/img/playo-andina.jpg",
      "/img/signa-trebol.jpg",
      "/img/semi-bajada-bonano.jpg",
    ],
  },
  {
    icon: ArrowUpDown,
    title: "Volquetes",
    subtitle: "Granel",
    description:
      "Volquetes industriales para materiales a granel. Descarga hidráulica optimizada, capacidad desde 5 hasta 20 metros cúbicos.",
    image: "/img/volcable-azul.jpg",
    stat: "150+",
    statLabel: "Volquetes activos",
    features: [
      "Descarga hidráulica optimizada",
      "Capacidad de 5 a 20 m³",
      "Diseño industrial para granel",
    ],
    gallery: [
      "/img/volcable-azul.jpg",
      "/img/volcable-blanco.jpg",
      "/img/volcable-amarillo.jpg",
    ],
  },
  {
    icon: Thermometer,
    title: "Térmicos",
    subtitle: "Temperatura",
    description:
      "Carrocerías térmicas con aislación de alta densidad y circulación forzada. Control de temperatura para cadena de frío.",
    image: "/img/paquetero-trasera.jpg",
    stat: "80+",
    statLabel: "Flotas equipadas",
    features: [
      "Aislación de alta densidad",
      "Circulación forzada",
      "Control de temperatura para cadena de frío",
    ],
    gallery: [
      "/img/paquetero-trasera.jpg",
      "/img/paque-blanco.jpg",
      "/img/paquetero-azul.jpg",
    ],
  },
  {
    icon: Wrench,
    title: "Extensión Chasis",
    subtitle: "Norma AITA",
    description:
      "Extensión de chasis bajo norma AITA. Homologación completa incluida, cumplimiento total con la normativa vigente.",
    image: "/img/frame-hierronort.jpg",
    stat: "100%",
    statLabel: "Homologados",
    features: [
      "Diseñada bajo norma AITA",
      "Homologación completa incluida",
      "Cumplimiento total de la normativa vigente",
    ],
    gallery: [
      "/img/frame-hierronort.jpg",
      "/img/semi-bajada-bonano.jpg",
      "/img/signa-trebol.jpg",
    ],
  },
];

/* Config del efecto */
const SEGMENTS_SCROLL = 1.5; // × altura de viewport por transición (más alto = más lento)
const FINAL_SCALE = 0.92; // escala del panel tapado
const FINAL_DIM = 0.35; // opacidad del overlay negro del panel tapado
const FINAL_OFFSET_Y = -30; // px, desplazamiento vertical del panel tapado

export default function Productos() {
  const areaRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const stageRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const panelsRef = useRef(/** @type {(HTMLDivElement | null)[]} */ ([]));
  const imgRefs = useRef(/** @type {(HTMLImageElement | null)[]} */ ([]));
  const dimRefs = useRef(/** @type {(HTMLDivElement | null)[]} */ ([]));
  const textRefs = useRef(/** @type {(HTMLDivElement | null)[]} */ ([]));
  const styleCache = useRef(/** @type {(string | undefined)[]} */ ([]));
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [areaHeight, setAreaHeight] = useState(0);

  /* prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (/** @type {MediaQueryListEvent} */ e) =>
      setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Altura del área de scroll (recalculada en resize) */
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      setAreaHeight(
        Math.round(vh * (1 + (products.length - 1) * SEGMENTS_SCROLL)),
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Motor del efecto: stage + paneles calculados a mano (sin sticky) */
  useEffect(() => {
    if (reducedMotion) return;
    const LERP = 0.5; // suavizado mínimo de notchs: pegado al scroll, sin retraso visible
    let rafId = /** @type {number | null} */ (null);
    let current = 0; // progreso suavizado
    let target = 0; // progreso real del scroll

    const getTarget = () => {
      const area = areaRef.current;
      if (!area) return 0;
      const viewportH = window.innerHeight;
      const areaH = area.offsetHeight;
      const range = areaH - viewportH;
      if (range <= 0) return 0;
      const pinStart = area.getBoundingClientRect().top + window.scrollY;
      return Math.min(1, Math.max(0, (window.scrollY - pinStart) / range));
    };

    const apply = (/** @type {number} */ p) => {
      const area = areaRef.current;
      const stage = stageRef.current;
      if (!area || !stage) return;

      const viewportH = window.innerHeight;
      const areaH = area.offsetHeight;
      const pinStart = area.getBoundingClientRect().top + window.scrollY;
      const pinEnd = pinStart + areaH - viewportH;
      const scrollY = window.scrollY;

      /* Posición del stage: absolute → fixed → absolute (sticky a mano) */
      if (scrollY < pinStart) {
        stage.style.position = "absolute";
        stage.style.top = "0px";
      } else if (scrollY <= pinEnd) {
        stage.style.position = "fixed";
        stage.style.top = "0px";
      } else {
        stage.style.position = "absolute";
        stage.style.top = `${areaH - viewportH}px`;
      }

      /* Progreso global 0..N-1 */
      const global = p * (products.length - 1);
      const floor = Math.floor(global);
      const frac = global - floor;

      /* Transformaciones por panel (solo transform/opacity = compositor, sin repintado) */
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        const img = imgRefs.current[i];
        const dim = dimRefs.current[i];
        const text = textRefs.current[i];
        let transform;
        let dimOpacity;
        let imgTransform;
        let textStyle;
        if (i < floor) {
          transform = `translateY(${FINAL_OFFSET_Y}px) scale(${FINAL_SCALE})`;
          dimOpacity = FINAL_DIM;
          imgTransform = "scale(1)";
          textStyle = "opacity:0;transform:translateY(0px)";
        } else if (i === floor) {
          transform = `translateY(${FINAL_OFFSET_Y * frac}px) scale(${
            1 - (1 - FINAL_SCALE) * frac
          })`;
          dimOpacity = (FINAL_DIM * frac).toFixed(3);
          imgTransform = `scale(${1 - 0.1 * frac})`;
          textStyle = `opacity:${(1 - 0.7 * frac).toFixed(
            3,
          )};transform:translateY(${(-24 * frac).toFixed(2)}px)`;
        } else if (i === floor + 1) {
          transform = `translateY(${(1 - frac) * 100}%)`;
          dimOpacity = "0";
          imgTransform = `scale(${1 + 0.12 * (1 - frac)})`;
          textStyle = `opacity:${Math.min(1, frac * 1.5).toFixed(
            3,
          )};transform:translateY(${((1 - frac) * 40).toFixed(2)}px)`;
        } else {
          transform = "translateY(100%)";
          dimOpacity = "0";
          imgTransform = "scale(1)";
          textStyle = "opacity:0;transform:translateY(0px)";
        }
        const key = `${transform}|${dimOpacity}|${imgTransform}|${textStyle}`;
        if (styleCache.current[i] === key) return;
        styleCache.current[i] = key;
        panel.style.transform = transform;
        if (dim) dim.style.opacity = String(dimOpacity);
        if (img) img.style.transform = imgTransform;
        if (text) text.style.cssText = textStyle;
      });
    };

    const loop = () => {
      current += (target - current) * LERP;
      const done = Math.abs(target - current) < 0.0005;
      if (done) current = target;
      apply(current);
      if (done) {
        rafId = null;
      } else {
        rafId = requestAnimationFrame(loop);
      }
    };

    const startLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const onScroll = () => {
      target = getTarget();
      startLoop();
    };
    const onResize = () => {
      target = getTarget();
      startLoop();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [reducedMotion]);

  return (
    <section id="productos" className="bg-black">
      {/* Header - scroll normal */}
      <div className="pt-32 pb-8 px-4 max-w-7xl mx-auto">
        <span className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
          Nuestros Productos
        </span>
        <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-12">
          Soluciones que
          <br />
          <span className="gradient-text">mueven al transporte</span>
        </h2>
      </div>

      {reducedMotion ? (
        /* Reduced motion: flujo normal + fade-in simple */
        <div className="bg-black">
          {products.map((product, i) => (
            <ProductPanel
              key={product.title}
              product={product}
              index={i}
              mode="flow"
            />
          ))}
        </div>
      ) : (
        /* Stacking cards: scroll-area → stage → paneles */
        <div
          id="scroll-area"
          ref={areaRef}
          className="relative bg-black"
          style={{ height: areaHeight || undefined }}
        >
          <div
            ref={stageRef}
            className="absolute inset-x-0 top-0 h-screen overflow-hidden"
          >
            {products.map((product, i) => (
              <ProductPanel
                key={product.title}
                product={product}
                index={i}
                mode="stack"
                panelRef={(el) => {
                  panelsRef.current[i] = el;
                }}
                imgRef={(el) => {
                  imgRefs.current[i] = el;
                }}
                dimRef={(el) => {
                  dimRefs.current[i] = el;
                }}
                textRef={(el) => {
                  textRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * @param {Object} props
 * @param {Product} props.product
 * @param {number} props.index
 * @param {"flow" | "stack"} props.mode
 * @param {(el: HTMLDivElement | null) => void} [props.panelRef]
 * @param {(el: HTMLImageElement | null) => void} [props.imgRef]
 * @param {(el: HTMLDivElement | null) => void} [props.dimRef]
 * @param {(el: HTMLDivElement | null) => void} [props.textRef]
 */
function ProductPanel({
  product,
  index,
  mode,
  panelRef,
  imgRef,
  dimRef,
  textRef,
}) {
  const ref = useRef(/** @type {HTMLDivElement | null} */ (null));
  const [inView, setInView] = useState(false);

  /* Fade-in simple solo en modo flujo (reduced motion) */
  useEffect(() => {
    if (mode !== "flow") return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mode]);

  return (
    <div
      ref={(el) => {
        ref.current = el;
        if (panelRef) panelRef(el);
      }}
      className={
        mode === "flow"
          ? "relative h-screen w-full overflow-hidden"
          : "absolute inset-0 overflow-hidden"
      }
      style={{
        zIndex: index + 1,
        opacity: mode === "flow" ? (inView ? 1 : 0) : undefined,
        transition: mode === "flow" ? "opacity 0.8s ease" : undefined,
      }}
    >
      {/* Imagen de fondo full-bleed */}
      <img
        ref={(el) => {
          if (imgRef) imgRef(el);
        }}
        src={getImageUrl(product.image)}
        alt={product.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.currentTarget.src = `https://placehold.co/1600x900/0A0A0A/0D7C3E?text=${product.title}`;
        }}
      />

      {/* Overlay opaco: nunca menos de 0.55; más fuerte del lado del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/55 md:bg-gradient-to-r md:from-black/90 md:via-black/70 md:to-black/55" />

      {/* Overlay de oscurecimiento (opacity animada por JS, sin filter/repintado) */}
      <div
        ref={(el) => {
          if (dimRef) dimRef(el);
        }}
        className="absolute inset-0 bg-black"
        style={{ opacity: 0 }}
      />

      {/* Contenido: texto + carrusel */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-8 pt-28 md:flex-row md:items-center md:justify-between md:gap-12 md:pb-0 md:pt-0 md:px-20 lg:px-28">
        <div
          ref={(el) => {
            if (textRef) textRef(el);
          }}
          className="max-w-xl"
        >
          {/* Eyebrow: punto + línea decorativa */}
          <div className="flex items-center gap-4 mb-3 md:mb-6">
            <div className="w-3 h-3 rounded-full bg-trebol-500" />
            <div className="h-px flex-1 bg-gradient-to-r from-trebol-500/50 to-transparent" />
          </div>
          {/* Badge con ícono */}
          <div className="flex items-center gap-3 mb-2 md:mb-4">
            <product.icon className="w-5 h-5 md:w-6 md:h-6 text-trebol-400" />
            <span className="text-gray-400 text-xs md:text-sm tracking-[0.2em] uppercase">
              {product.subtitle}
            </span>
          </div>
          <h3 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-3 md:mb-6">
            {product.title}
          </h3>
          <p className="text-gray-300 text-base md:text-xl leading-relaxed tracking-tight mb-4 md:mb-8 max-w-lg">
            {product.description}
          </p>
          {/* Características */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 md:gap-y-3 mb-5 md:mb-10">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-trebol-400 mt-0.5 shrink-0" />
                <span className="text-gray-300 text-sm md:text-base leading-relaxed tracking-tight">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          {/* Estadística destacada + Cotizar */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-end gap-3 md:gap-4">
              <span className="font-heading text-4xl md:text-6xl font-bold text-trebol-400 tracking-tight leading-none">
                {product.stat}
              </span>
              <span className="text-gray-400 text-xs md:text-sm tracking-[0.15em] uppercase pb-1">
                {product.statLabel}
              </span>
            </div>
            <a
              href="#contacto"
              className="ml-auto inline-flex items-center gap-2 bg-trebol-500 hover:bg-trebol-600 px-5 py-2.5 md:px-6 md:py-3 rounded-full font-bold text-white text-xs md:text-sm tracking-tight transition-colors"
            >
              Cotizar
            </a>
          </div>
        </div>
        {/* Carrusel: arriba y centrado en mobile, columna derecha en desktop */}
        <div className="order-first mx-auto w-80 max-w-full shrink-0 md:order-none md:mx-0 md:w-96 lg:w-[32rem] xl:w-[36rem]">
          <ImageCarousel images={product.gallery} alt={product.title} />
        </div>
      </div>
    </div>
  );
}
