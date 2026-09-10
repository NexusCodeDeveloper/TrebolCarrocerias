import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "../lib/cloudinary";

const images = [
  "/img/volcable-amarillo.jpg",
  "/img/paquetero-azul.jpg",
  "/img/volcable-blanco.jpg",
  "/img/semi-bajada-bonano.jpg",
  "/img/paquetero-trasera.jpg",
  "/img/playo-andina.jpg",
  "/img/frame-hierronort.jpg",
  "/img/paque-blanco.jpg",
  "/img/signa-trebol.jpg",
  "/img/volcable-azul.jpg",
];

const AUTOPLAY_MS = 3000;

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
