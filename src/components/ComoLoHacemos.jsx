import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useInView } from "framer-motion";
import {
  FoldVertical,
  Zap,
  Scissors,
  Flame,
  Slice,
  SprayCan,
  Play,
  X,
} from "lucide-react";
import { getImageUrl, getVideoUrl, getVideoPoster } from "../lib/cloudinary";

const COMO_IMG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791076016/Recurso_23_gqgxqd.png";

const VIDEOS = [
  "https://res.cloudinary.com/da1hje3a1/video/upload/v1791079323/WhatsApp_Video_2026-10-03_at_10.47.13_PM_1_tugnol.mp4",
  "https://res.cloudinary.com/da1hje3a1/video/upload/v1791079322/WhatsApp_Video_2026-10-03_at_10.47.13_PM_dqql4f.mp4",
  "https://res.cloudinary.com/da1hje3a1/video/upload/v1791077488/WhatsApp_Video_2026-10-03_at_10.29.30_PM_uk5kue.mp4",
];

const equipment = [
  { icon: FoldVertical, name: "Plegadora" },
  { icon: Zap, name: "Corte Láser" },
  { icon: Scissors, name: "Guillotina" },
  { icon: Flame, name: "Soldadoras semiautomáticas" },
  { icon: Slice, name: "Serrucho sin fin" },
  { icon: SprayCan, name: "Sistema de pintura Airmix" },
];

const sectionCorners = [
  "top-6 left-6 border-t-2 border-l-2",
  "top-6 right-6 border-t-2 border-r-2",
  "bottom-6 left-6 border-b-2 border-l-2",
  "bottom-6 right-6 border-b-2 border-r-2",
];

const videoCorners = [
  "-top-2 -left-2 border-t-2 border-l-2",
  "-top-2 -right-2 border-t-2 border-r-2",
  "-bottom-2 -left-2 border-b-2 border-l-2",
  "-bottom-2 -right-2 border-b-2 border-r-2",
];

/**
 * @param {Object} props
 * @param {string} props.src
 * @param {boolean} props.isInView
 * @param {number} [props.delay]
 */
function VideoCard({ src, isInView, delay = 0 }) {
  const [open, setOpen] = useState(false);

  /* Modal: Escape + bloqueo de scroll */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay }}
        className="relative"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Reproducir video"
          className="group relative block aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-black/10 shadow-elevated"
        >
          <video
            src={getVideoUrl(src)}
            poster={getVideoPoster(src)}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/40" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="pulse-glow grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition group-hover:border-trebol-500 group-hover:bg-trebol-600">
              <Play className="h-6 w-6 translate-x-0.5" />
            </span>
          </span>
        </button>

        {videoCorners.map((position, i) => (
          <span
            key={position}
            style={{ animationDelay: `${i * 0.35}s` }}
            className={`corner-pulse pointer-events-none absolute h-6 w-6 border-trebol-500/60 ${position}`}
          />
        ))}
      </motion.div>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Video ampliado"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute right-5 top-5 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:rotate-90 hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={getVideoUrl(src)}
                poster={getVideoPoster(src)}
                controls
                autoPlay
                playsInline
                className="max-h-[80vh] w-full rounded-2xl bg-black object-contain shadow-elevated ring-1 ring-white/10"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default function ComoLoHacemos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="como-lo-hacemos"
      className="relative overflow-hidden py-32 md:pt-30 md:pb-30 px-4"
    >
      {/* Background: degradado blanco → gris de izquierda a derecha */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-300" />

      {/* Resplandores ambientales */}
      <div className="ambient-pulse absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-trebol-500/10 blur-[160px]" />
      <div className="ambient-pulse absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-trebol-600/10 blur-[160px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/30 to-transparent" />

      {/* Esquinas HUD */}
      {sectionCorners.map((position, i) => (
        <span
          key={position}
          style={{ animationDelay: `${i * 0.35}s` }}
          className={`corner-pulse pointer-events-none absolute h-8 w-8 border-trebol-500/60 ${position}`}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Textos + Equipamiento / Imagen */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* <span className="text-trebol-600 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
              Nuestro Proceso
            </span> */}
            <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl  tracking-tight text-gray-900 leading-[1.05]">
              Cómo lo
              <br />
              <span className="gradient-text font-bold">hacemos</span>
            </h2>
            <div className="mt-8 h-1 w-32 bg-gradient-to-r from-trebol-500 to-transparent" />
            <p className="mt-6 max-w-2xl text-black font-semibold text-base md:text-lg leading-relaxed tracking-tight">
              Combinamos equipamiento CNC de última generación con un equipo de
              profesionales para lograr precisión y terminaciones de calidad en
              cada unidad.
            </p>

            {/* Equipamiento: solo íconos + textos */}
            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {equipment.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                  style={{ animationDelay: `${0.9 + i * 0.18}s` }}
                  className="equipment-float group flex items-center gap-3"
                >
                  <div
                    className="icon-pulse grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-950 ring-1 ring-trebol-500/30"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  >
                    <item.icon className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-sm leading-snug tracking-tight text-black md:text-base">
                    {item.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 1 }}
            className="relative"
          >
            <img
              src={getImageUrl(COMO_IMG)}
              alt="Equipamiento CNC de Trébol Carrocerías"
              className="w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* Videos del proceso */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 2, delay: 2.5 }}
          className="relative"
        >
          <div className="mt-12 md:mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
            {VIDEOS.map((src, i) => (
              <VideoCard
                key={src}
                src={src}
                isInView={isInView}
                delay={0.4 + i * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
