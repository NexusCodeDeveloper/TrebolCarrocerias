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
  Pause,
  Maximize2,
  X,
} from "lucide-react";
import { getVideoUrl, getVideoPoster } from "../lib/cloudinary";

const VIDEO_URL =
  "https://res.cloudinary.com/da1hje3a1/video/upload/v1789429589/d4efdcc51bcf17e843da2e194f324f2e_nssbtl.mp4";

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

function ProcessVideo({ isInView, delay = 0 }) {
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);
  const wasPlayingRef = useRef(false);
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [playing, setPlaying] = useState(() => !reducedMotion);
  const [expanded, setExpanded] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [playing]);

  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video) return;
    if (modalPlaying) {
      video.play().catch(() => setModalPlaying(false));
    } else {
      video.pause();
    }
  }, [modalPlaying, expanded]);

  const openExpanded = () => {
    wasPlayingRef.current = playing;
    setPlaying(false);
    setModalPlaying(true);
    setExpanded(true);
  };

  const closeExpanded = () => {
    setExpanded(false);
    if (wasPlayingRef.current) setPlaying(true);
  };

  useEffect(() => {
    if (!expanded) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        setExpanded(false);
        if (wasPlayingRef.current) setPlaying(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="relative"
    >
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-dark-800 ring-1 ring-white/10 shadow-elevated">
        <video
          ref={videoRef}
          src={getVideoUrl(VIDEO_URL)}
          poster={getVideoPoster(VIDEO_URL)}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur">
          <span className="text-xs font-medium tracking-tight text-white">
            Tecnología CNC
          </span>
        </div>

        <button
          type="button"
          onClick={openExpanded}
          aria-label="Ampliar video"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:border-trebol-500 hover:bg-trebol-600"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pausar video" : "Reproducir video"}
          className="pulse-glow absolute bottom-4 right-4 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition hover:border-trebol-500 hover:bg-trebol-600"
        >
          {playing ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 translate-x-px" />
          )}
        </button>
      </div>

      {videoCorners.map((position, i) => (
        <span
          key={position}
          style={{ animationDelay: `${i * 0.35}s` }}
          className={`corner-pulse pointer-events-none absolute h-6 w-6 border-trebol-500/60 ${position}`}
        />
      ))}

      {expanded &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Video ampliado"
            onClick={closeExpanded}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={closeExpanded}
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
                ref={modalVideoRef}
                src={getVideoUrl(VIDEO_URL)}
                poster={getVideoPoster(VIDEO_URL)}
                muted
                loop
                playsInline
                className="max-h-[80vh] w-full rounded-2xl bg-black object-contain shadow-elevated ring-1 ring-white/10"
              />
              <button
                type="button"
                onClick={() => setModalPlaying((p) => !p)}
                aria-label={modalPlaying ? "Pausar video" : "Reproducir video"}
                className="absolute bottom-4 right-4 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition hover:border-trebol-500 hover:bg-trebol-600"
              >
                {modalPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 translate-x-px" />
                )}
              </button>
            </div>
          </div>,
          document.body,
        )}
    </motion.div>
  );
}

export default function ComoLoHacemos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const videoRef = useRef(null);
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [playing, setPlaying] = useState(() => !reducedMotion);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [playing]);

  return (
    <section
      id="como-lo-hacemos"
      className="relative overflow-hidden py-32 md:py-48 px-4"
    >
      {/* Video de fondo full-bleed */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={getVideoUrl(VIDEO_URL)}
          poster={getVideoPoster(VIDEO_URL)}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
      </div>

      {/* Resplandores ambientales */}
      <div className="ambient-pulse absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-trebol-500/15 blur-[160px]" />
      <div className="ambient-pulse absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-trebol-600/15 blur-[160px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent" />
      {/* Grid técnico */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      {/* Esquinas HUD */}
      {sectionCorners.map((position, i) => (
        <span
          key={position}
          style={{ animationDelay: `${i * 0.35}s` }}
          className={`corner-pulse pointer-events-none absolute h-8 w-8 border-trebol-500/60 ${position}`}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Textos + Equipamiento */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
              Nuestro Proceso
            </span>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              Cómo lo
              <br />
              <span className="gradient-text">hacemos</span>
            </h2>
            <p className="mt-6 max-w-2xl text-gray-400 text-base md:text-lg leading-relaxed tracking-tight">
              Combinamos equipamiento CNC de última generación con un equipo de
              profesionales para lograr precisión y terminaciones de calidad en
              cada unidad.
            </p>
          </motion.div>

          {/* Equipamiento (glass sobre el video) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/45 p-6 backdrop-blur-md md:p-8"
          >
            <span className="pointer-events-none absolute -bottom-6 right-4 select-none font-heading text-8xl font-bold text-white/[0.03]">
              CNC
            </span>

            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <h3 className="font-heading text-lg font-bold tracking-tight text-white md:text-xl">
                  Equipamiento CNC de última generación
                </h3>
              </div>
              <div className="mb-6 h-px w-full bg-gradient-to-r from-trebol-500/40 to-transparent" />

              <ul className="grid sm:grid-cols-2 gap-4">
                {equipment.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                    style={{ animationDelay: `${0.9 + i * 0.18}s` }}
                    className="equipment-float group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-black/30 px-4 py-3 transition-colors duration-300 hover:border-trebol-500/30 hover:bg-black/50"
                  >
                    <div
                      className="icon-pulse grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-trebol-500/10 ring-1 ring-trebol-500/30"
                      style={{ animationDelay: `${i * 0.25}s` }}
                    >
                      <item.icon className="h-5 w-5 text-trebol-400" />
                    </div>
                    <span className="text-sm leading-snug tracking-tight text-gray-300 md:text-base">
                      {item.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Videos del proceso */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-6 lg:gap-8">
          <ProcessVideo isInView={isInView} delay={0.4} />
          <ProcessVideo isInView={isInView} delay={0.5} />
        </div>
      </div>
    </section>
  );
}
