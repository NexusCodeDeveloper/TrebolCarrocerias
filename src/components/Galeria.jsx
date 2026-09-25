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

      <div
        className="relative touch-pan-y overflow-hidden py-12 md:py-16"
        style={{ perspective: "1600px" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          style={{ x, transformStyle: "preserve-3d" }}
          className="relative flex w-max items-center gap-5 pl-4 will-change-transform md:gap-8 lg:pl-[max(1rem,calc((100%-80rem)/2+1rem))]"
        >
          {SLIDES.map((item, i) => (
            <GalleryCard
              key={`${item.src}-${i}`}
              item={item}
              index={i}
              realIndex={i % count}
              active={virtual}
              count={count}
              reduce={reduce}
              onOpen={openLightbox}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-black to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-black to-transparent md:w-32" />

        <div className="absolute left-3 top-1/2 z-30 -translate-y-1/2 md:left-8">
          <motion.button
            type="button"
            onClick={goPrev}
            aria-label="Imagen anterior"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:border-trebol-500 hover:bg-trebol-600 md:h-14 md:w-14"
          >
            <motion.span
              animate={reduce ? { x: 0 } : { x: [-3, 3, -3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.span>
          </motion.button>
        </div>

        <div className="absolute right-3 top-1/2 z-30 -translate-y-1/2 md:right-8">
          <motion.button
            type="button"
            onClick={goNext}
            aria-label="Imagen siguiente"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:border-trebol-500 hover:bg-trebol-600 md:h-14 md:w-14"
          >
            <motion.span
              animate={reduce ? { x: 0 } : { x: [3, -3, 3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.span>
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 px-4 pb-32 md:flex-row md:justify-center md:gap-8 md:pb-48">
        <div className="flex items-center gap-2">
          {ITEMS.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => goTo(count + i)}
              aria-label={`Ir a imagen ${i + 1}`}
              aria-current={i === realIndex}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === realIndex
                  ? "w-6 bg-trebol-500"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-medium tracking-[0.3em] text-white/40">
          {String(realIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Imagen ampliada: ${ITEMS[lightbox].title}`}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={getImageUrl(ITEMS[lightbox].src)}
                  alt={`${ITEMS[lightbox].title} — Carrocería Trébol`}
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER;
                  }}
                  className="max-h-[72vh] w-full rounded-2xl object-contain ring-1 ring-white/10 shadow-elevated"
                />

                <button
                  type="button"
                  onClick={() => showReal(lightbox - 1)}
                  aria-label="Imagen anterior"
                  className="absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-trebol-600 md:left-4 md:h-12 md:w-12"
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => showReal(lightbox + 1)}
                  aria-label="Imagen siguiente"
                  className="absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-trebol-600 md:right-4 md:h-12 md:w-12"
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>

              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-trebol-400">
                    {ITEMS[lightbox].category}
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-white md:text-2xl">
                    {ITEMS[lightbox].title}
                  </h3>
                </div>
                <span className="text-xs font-medium tracking-[0.3em] text-white/40">
                  {String(lightbox + 1).padStart(2, "0")} /{" "}
                  {String(count).padStart(2, "0")}
                </span>
              </div>
            </motion.div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-trebol-500 hover:bg-trebol-600 md:right-6 md:top-6"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
