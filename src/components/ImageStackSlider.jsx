import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const AUTOPLAY_MS = 3000;

/**
 * @param {Object} props
 * @param {string[]} props.images
 * @param {string} [props.alt]
 * @param {number} [props.autoplayMs]
 */
export default function ImageStackSlider({
  images,
  alt = "",
  autoplayMs = AUTOPLAY_MS,
}) {
  const count = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const autoplay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Autoplay: avanza solo, pausa al hover o con el modal abierto */
  useEffect(() => {
    if (!autoplay || hovered || open || count < 2) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % count);
    }, autoplayMs);
    return () => clearInterval(id);
  }, [autoplay, hovered, open, count, autoplayMs]);

  const nextSlide = () => setCurrentIndex((i) => (i + 1) % count);
  const prevSlide = () => setCurrentIndex((i) => (i - 1 + count) % count);

  /* Modal: teclado (Escape / flechas) + bloqueo de scroll */
  useEffect(() => {
    if (!open) return;
    const onKey = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, count]);

  /* Distancia circular más corta → loop infinito sin saltos */
  const half = Math.floor(count / 2);

  return (
    <>
      <div
        className="relative aspect-video overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10 shadow-elevated select-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {images.map((src, i) => {
          const offset =
            ((((i - currentIndex + half) % count) + count) % count) - half;
          const abs = Math.abs(offset);
          const visible = abs <= 2;
          return (
            <div
              key={src}
              className="absolute inset-0 cursor-pointer transition-all duration-500 ease-out"
              onClick={() => {
                if (abs === 0) setOpen(true);
              }}
              style={{
                transform: `translateX(${offset * 45}%) scale(${
                  visible ? (abs === 0 ? 1 : 1 - abs * 0.15) : 0.6
                })`,
                opacity: visible ? (abs === 0 ? 1 : 1 - abs * 0.4) : 0,
                zIndex: visible ? 30 - abs * 10 : 0,
                pointerEvents: visible && abs === 0 ? "auto" : "none",
              }}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/1600x900/0A0A0A/0D7C3E?text=${alt}`;
                }}
              />
            </div>
          );
        })}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 z-40 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-trebol-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 z-40 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-trebol-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 gap-1.5">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-6 bg-trebol-500"
                      : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal: imagen ampliada */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Imagen ampliada: ${alt}`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={currentIndex}
                src={images[currentIndex]}
                alt={alt}
                className="w-full max-h-[80vh] object-contain rounded-2xl ring-1 ring-white/10 shadow-elevated"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/1600x900/0A0A0A/0D7C3E?text=${alt}`;
                }}
              />
              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Imagen anterior"
                    className="absolute left-2 md:left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-trebol-600"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Imagen siguiente"
                    className="absolute right-2 md:right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-trebol-600"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </motion.div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute top-5 right-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white border border-white/20 transition hover:bg-trebol-600 hover:border-trebol-500"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
