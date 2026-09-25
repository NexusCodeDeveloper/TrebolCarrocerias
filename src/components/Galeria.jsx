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
  const headerRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });
  const cardRefs = useRef(/** @type {(HTMLElement | null)[]} */ ([]));
  const stepRef = useRef(0);
  const touchX = useRef(0);
  const swipedRef = useRef(false);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);

  const count = ITEMS.length;
  const [virtual, setVirtual] = useState(count);
  const virtualRef = useRef(count);
  const [lightbox, setLightbox] = useState(/** @type {number | null} */ (null));

  const goTo = useCallback(
    (/** @type {number} */ realTarget) => {
      const step = stepRef.current;
      if (!step) return;
      const half = Math.floor(count / 2);

      let base = virtualRef.current;
      let shift = 0;
      if (base < count) shift = count;
      else if (base >= 2 * count) shift = -count;

      if (shift !== 0) {
        base += shift;
        virtualRef.current = base;
        x.jump(x.get() - shift * step);
        setVirtual(base);
      }

      const currentReal = ((base % count) + count) % count;
      const delta =
        ((((realTarget - currentReal + half) % count) + count) % count) - half;
      if (delta === 0) return;

      const target = base + delta;
      virtualRef.current = target;
      setVirtual(target);
      animate(
        x,
        -target * step,
        reduce
          ? { duration: 0, velocity: 0 }
          : {
              type: "spring",
              stiffness: 130,
              damping: 26,
              mass: 0.9,
              velocity: 0,
            },
      );
    },
    [x, count, reduce],
  );

  const goNext = useCallback(() => {
    const currentReal = ((virtualRef.current % count) + count) % count;
    goTo(currentReal + 1);
  }, [goTo, count]);

  const goPrev = useCallback(() => {
    const currentReal = ((virtualRef.current % count) + count) % count;
    goTo(currentReal - 1);
  }, [goTo, count]);

  const showReal = useCallback(
    (/** @type {number} */ realTarget) => {
      const wrapped = ((realTarget % count) + count) % count;
      setLightbox(wrapped);
      goTo(wrapped);
    },
    [goTo, count],
  );

  const openLightbox = useCallback(
    (/** @type {number} */ realTarget) => {
      if (swipedRef.current) {
        swipedRef.current = false;
        return;
      }
      showReal(realTarget);
    },
    [showReal],
  );

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useLayoutEffect(() => {
    const measure = () => {
      const first = cardRefs.current[0];
      const second = cardRefs.current[1];
      if (!first || !second) return;
      const step = second.offsetLeft - first.offsetLeft;
      stepRef.current = step;
      x.jump(-virtualRef.current * step);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [x]);

  useEffect(() => {
    const onKey = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === "Escape" && lightbox !== null) {
        closeLightbox();
        return;
      }
      if (e.key === "ArrowRight") {
        if (lightbox !== null) showReal(lightbox + 1);
        else goNext();
      }
      if (e.key === "ArrowLeft") {
        if (lightbox !== null) showReal(lightbox - 1);
        else goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, goNext, goPrev, showReal, closeLightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightbox]);

  const onTouchStart = (/** @type {React.TouchEvent} */ e) => {
    touchX.current = e.touches[0].clientX;
    swipedRef.current = false;
  };

  const onTouchEnd = (/** @type {React.TouchEvent} */ e) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) < 48) return;
    swipedRef.current = true;
    if (dx < 0) goNext();
    else goPrev();
  };

  const realIndex = ((virtual % count) + count) % count;

  return (
    <section id="galeria" className="bg-black">
      <div
        ref={headerRef}
        className="mx-auto max-w-7xl px-4 pt-32 pb-12 md:pt-48 md:pb-16"
      >
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
