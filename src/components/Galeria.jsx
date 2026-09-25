import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getImageUrl } from "../lib/cloudinary";

const ITEMS = [
  { src: "/img/volcable-amarillo.jpg", title: "Volcable Amarillo", category: "Volcables" },
  { src: "/img/paquetero-azul.jpg", title: "Paquetero Azul", category: "Paqueteros" },
  { src: "/img/volcable-blanco.jpg", title: "Volcable Blanco", category: "Volcables" },
  { src: "/img/semi-bajada-bonano.jpg", title: "Semi Bajada Bonano", category: "Semi Bajada" },
  { src: "/img/paquetero-trasera.jpg", title: "Paquetero Trasera", category: "Paqueteros" },
  { src: "/img/playo-andina.jpg", title: "Playo Andina", category: "Playos" },
  { src: "/img/frame-hierronort.jpg", title: "Frame Norte", category: "Frames" },
  { src: "/img/paque-blanco.jpg", title: "Paquetero Blanco", category: "Paqueteros" },
  { src: "/img/signa-trebol.jpg", title: "Signa Trébol", category: "Signa" },
  { src: "/img/volcable-azul.jpg", title: "Volcable Azul", category: "Volcables" },
];

const SLIDES = [...ITEMS, ...ITEMS, ...ITEMS];

const CARD_WIDTH = "w-[78vw] sm:w-[62vw] md:w-[46vw] lg:w-[36vw] xl:w-[31vw]";

const PLACEHOLDER = "https://placehold.co/1200x800/0A0A0A/0D7C3E?text=Trébol";

/** @type {import("framer-motion").Transition} */
const CARD_SPRING = { type: "spring", stiffness: 170, damping: 24 };

/**
 * @param {Object} props
 * @param {{ src: string, title: string, category: string }} props.item
 * @param {number} props.index
 * @param {number} props.realIndex
 * @param {number} props.active
 * @param {number} props.count
 * @param {boolean | null} props.reduce
 * @param {(realIndex: number) => void} props.onOpen
 * @param {(el: HTMLElement | null) => void} [props.cardRef]
 */
function GalleryCard({
  item,
  index,
  realIndex,
  active,
  count,
  reduce,
  onOpen,
  cardRef,
}) {
  const half = Math.floor(count / 2);
  const rel = ((((index - active + half) % count) + count) % count) - half;
  const abs = Math.abs(rel);
  const clamped = Math.max(-1, Math.min(1, rel));
  const transition = reduce || abs > 3 ? { duration: 0 } : CARD_SPRING;

  return (
    <motion.article
      ref={cardRef}
      initial={false}
      animate={{
        y: index % 2 === 0 ? -18 : 18,
        rotateY: clamped * -12,
        scale: 1 - Math.min(abs, 2) * 0.09,
        opacity: Math.max(0.25, 1 - abs * 0.3),
      }}
      transition={transition}
      onClick={() => onOpen(realIndex)}
      className={`group relative aspect-[4/3] shrink-0 cursor-zoom-in select-none overflow-hidden rounded-2xl bg-dark-800 ring-1 ring-white/10 shadow-elevated ${CARD_WIDTH}`}
    >
      <motion.div
        initial={false}
        animate={{ x: clamped * 24 }}
        transition={transition}
        className="absolute -inset-x-10 inset-y-0"
      >
        <img
          src={getImageUrl(item.src)}
          alt={`${item.title} — Carrocería Trébol`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER;
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <span className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.25em] text-white/80 backdrop-blur">
        {String(realIndex + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
        <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-trebol-400">
          {item.category}
        </span>
        <h3 className="font-heading text-lg font-semibold text-white md:text-2xl">
          {item.title}
        </h3>
        <span className="mt-3 block h-px w-10 bg-amarillo transition-all duration-500 group-hover:w-20" />
      </div>

      <span
        className={`pointer-events-none absolute inset-0 rounded-2xl transition-all duration-500 ${
          rel === 0 ? "ring-2 ring-trebol-500/70" : "ring-1 ring-transparent"
        }`}
      />
    </motion.article>
  );
}

export default function Galeria() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const autoplay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = images.length;

  /* Autoplay: avanza solo, pausa al hover */
  useEffect(() => {
    if (!autoplay || hovered) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, hovered, count]);

  /* Navegación con teclado */
  useEffect(() => {
    const onKey = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % count);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  const prev = () => setActive((a) => (a - 1 + count) % count);
  const next = () => setActive((a) => (a + 1) % count);

  return (
    <section id="galeria" className="py-32 md:py-48 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Nuestros Trabajos
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Galería de
            <br />
            <span className="gradient-text">Proyectos</span>
          </h2>
        </motion.div>
      </div>

      {/* Naipe de cartas: abanico 2D */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center h-96 md:h-[38rem] px-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      >
        {images.map((src, i) => {
          /* Distancia circular más corta → loop infinito sin saltos */
          const half = Math.floor(count / 2);
          const offset =
            ((((i - active + half) % count) + count) % count) - half;
          const abs = Math.abs(offset);
          return (
            <motion.div
              key={src}
              onClick={() => setActive(i)}
              animate={{
                x: `calc(-50% + ${offset * 34}%)`,
                y: "-50%",
                rotate: -offset * 8,
                scale: (1 + (abs === 0 ? 0.1 : 0)) - Math.min(abs, 3) * 0.12,
                opacity: Math.max(0.15, 1 - abs * 0.22),
                filter: `grayscale(${Math.min(0.6, abs * 0.3)}) blur(${Math.min(
                  2.5,
                  abs * 0.8,
                )}px)`,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              style={{ zIndex: 20 - abs }}
              className="absolute left-1/2 top-1/2 w-72 md:w-[34rem] aspect-[4/3] cursor-pointer select-none overflow-hidden ring-1 ring-white/10 shadow-elevated"
            >
              <img
                src={getImageUrl(src)}
                alt="Carrocería Trébol"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/1200x800/0A0A0A/0D7C3E?text=Trébol`;
                }}
              />
              {i === active && (
                <div className="absolute inset-0 ring-2 ring-trebol-500/60 pointer-events-none" />
              )}
            </motion.div>
          );
        })}

        {/* Flechas */}
        <button
          type="button"
          onClick={prev}
          aria-label="Imagen anterior"
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 place-items-center rounded-full bg-black/50 backdrop-blur border border-white/10 text-white transition hover:bg-trebol-600 hover:border-trebol-500"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Imagen siguiente"
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 place-items-center rounded-full bg-black/50 backdrop-blur border border-white/10 text-white transition hover:bg-trebol-600 hover:border-trebol-500"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

      </motion.div>
    </section>
  );
}
