import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FoldVertical,
  Zap,
  Scissors,
  Flame,
  Slice,
  SprayCan,
  Play,
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
 * @param {boolean} [props.isPlaying]
 * @param {() => void} [props.onPlay]
 */
function VideoCard({ src, isInView, delay = 0, isPlaying = false, onPlay }) {
  /* Mobile: no reproducimos 3 videos a la vez (jank/touch). Poster + play manual. */
  const [isMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );
  const videoRef = useRef(/** @type {HTMLVideoElement | null} */ (null));

  /* Al tocar play, arranca el video (con gesto de usuario) */
  useEffect(() => {
    if (!isPlaying) return;
    videoRef.current?.play().catch(() => {});
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="relative"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black ring-1 ring-black/10 shadow-elevated">
        {isMobile ? (
          isPlaying ? (
            <video
              ref={videoRef}
              src={getVideoUrl(src)}
              poster={getVideoPoster(src)}
              autoPlay
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={onPlay}
              aria-label="Reproducir video"
              className="group absolute inset-0 h-full w-full"
            >
              <img
                src={getVideoPoster(src)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition group-hover:border-trebol-500 group-hover:bg-trebol-600">
                  <Play className="h-6 w-6 translate-x-0.5" />
                </span>
              </span>
            </button>
          )
        ) : (
          <video
            src={getVideoUrl(src)}
            poster={getVideoPoster(src)}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {videoCorners.map((position, i) => (
        <span
          key={position}
          style={{ animationDelay: `${i * 0.35}s` }}
          className={`corner-pulse pointer-events-none absolute h-6 w-6 border-trebol-500/60 ${position}`}
        />
      ))}
    </motion.div>
  );
}

export default function ComoLoHacemos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  /* Mobile: solo un video reproduce a la vez */
  const [playingVideo, setPlayingVideo] = useState(
    /** @type {number | null} */ (null),
  );

  return (
    <section
      id="como-lo-hacemos"
      className="relative overflow-hidden pt-12 pb-12  md:pt-40 md:pb-40 px-4"
    >
      {/* Background: degradado blanco → gris de izquierda a derecha */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-300 " />

      {/* Resplandores ambientales */}
      <div className="hidden md:block ambient-pulse absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-trebol-500/10 blur-[160px]" />
      <div className="hidden md:block ambient-pulse absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-trebol-600/10 blur-[160px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/30 to-transparent" />

      {/* Esquinas HUD (solo PC) */}
      {sectionCorners.map((position, i) => (
        <span
          key={position}
          style={{ animationDelay: `${i * 0.35}s` }}
          className={`corner-pulse pointer-events-none absolute hidden h-8 w-8 border-trebol-500/60 md:block ${position}`}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Textos + Equipamiento / Imagen */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ">
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
                isPlaying={playingVideo === i}
                onPlay={() => setPlayingVideo(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
