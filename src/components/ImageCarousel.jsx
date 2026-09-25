import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { getImageUrl } from "../lib/cloudinary";

const AUTOPLAY_MS = 5000;

/**
 * @param {Object} props
 * @param {string[]} props.images
 * @param {string} props.alt
 */
export default function ImageCarousel({ images, alt }) {
  const count = images.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const autoplay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!autoplay || hovered || open || count < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, hovered, open, count]);

  useEffect(() => {
    if (!open) return;
    const onKey = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, count]);

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  return (
    <div
      className="select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        onClick={() => setOpen(true)}
        className="relative aspect-video cursor-zoom-in overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10 shadow-elevated"
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={getImageUrl(src)}
            alt={`${alt} ${i + 1}`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            style={{ opacity: i === index ? 1 : 0 }}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/1600x900/0A0A0A/0D7C3E?text=${alt}`;
            }}
          />
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-trebol-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-trebol-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white backdrop-blur">
              {index + 1} / {count}
            </span>
          </>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          aria-label="Ver imagen ampliada"
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-trebol-600"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {count > 1 && (
        <div className="mt-3 hidden gap-2 md:flex">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`relative aspect-video flex-1 overflow-hidden rounded-lg transition ${
                i === index
                  ? "ring-2 ring-trebol-500 opacity-100"
                  : "opacity-50 ring-1 ring-white/10 hover:opacity-80"
              }`}
            >
              <img
                src={getImageUrl(src)}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
              onClick={() => setOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label={`Imagen ampliada: ${alt}`}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={getImageUrl(images[index])}
                  alt={`${alt} ${index + 1}`}
                  className="max-h-[80vh] w-full rounded-2xl object-contain ring-1 ring-white/10 shadow-elevated"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/1600x900/0A0A0A/0D7C3E?text=${alt}`;
                  }}
                />

                {count > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Imagen anterior"
                      className="absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-trebol-600 md:left-4 md:h-12 md:w-12"
                    >
                      <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Imagen siguiente"
                      className="absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-trebol-600 md:right-4 md:h-12 md:w-12"
                    >
                      <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                    </button>
                    <span className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur">
                      {index + 1} / {count}
                    </span>
                  </>
                )}
              </motion.div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-trebol-500 hover:bg-trebol-600 md:right-6 md:top-6"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
