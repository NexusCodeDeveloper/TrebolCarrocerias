import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  Ruler,
  Handshake,
  Wrench,
  BadgeCheck,
  Play,
  Pause,
} from "lucide-react";
import { getVideoUrl, getVideoPoster } from "../lib/cloudinary";

const VIDEO_URL =
  "https://res.cloudinary.com/da1hje3a1/video/upload/v1789431363/gruas-hero-gral_wbhvaz.mp4";

const certs = [
  {
    icon: ShieldCheck,
    tag: "CNTSV",
    title: "Habilitada y homologada",
    description:
      "Nuestra empresa está habilitada y homologada por la Comisión Nacional del Tránsito y Seguridad Vial.",
  },
  {
    icon: Ruler,
    tag: "AITA",
    title: "Extensión de chasis bajo norma",
    description:
      "Realizamos extensión de chasis bajo norma de la Asociación de Ingenieros y Técnicos del Automotor.",
  },
  {
    icon: Handshake,
    tag: "CAPEMISA",
    title: "Socios de la cámara",
    description:
      "Somos socios de la Cámara de Proveedores Mineros de Salta.",
  },
  {
    icon: Wrench,
    tag: "HIDRO-GRUBERT",
    title: "Servicio oficial Palfinger",
    description: "Servicio oficial de Hidro-Grubert Palfinger.",
  },
];

const corners = [
  "-top-2 -left-2 border-t-2 border-l-2",
  "-top-2 -right-2 border-t-2 border-r-2",
  "-bottom-2 -left-2 border-b-2 border-l-2",
  "-bottom-2 -right-2 border-b-2 border-r-2",
];

export default function Normas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const videoRef = useRef(null);
  const [reducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
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
      id="normas"
      className="py-32 md:py-48 px-4 relative overflow-hidden"
    >
      {/* Fondo: degradado + grilla técnica + glows verdes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-800 to-black" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-trebol-500/10 blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-trebol-700/10 blur-[120px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <span className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Respaldo y Certificaciones
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Normas que nos
            <br />
            <span className="gradient-text">avalan</span>
          </h2>
          <p className="mt-6 max-w-2xl text-gray-400 text-base md:text-lg leading-relaxed tracking-tight">
            Cumplimos con las normativas vigentes y contamos con el respaldo de
            organismos y cámaras del sector.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-[3rem] bg-trebol-500/20 blur-3xl" />

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

              {!playing && (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Reproducir video"
                  className="absolute inset-0 z-20 grid place-items-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:border-trebol-500 hover:bg-trebol-600">
                    <Play className="h-6 w-6 translate-x-0.5" />
                  </span>
                </button>
              )}

              <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur">
                <BadgeCheck className="h-4 w-4 text-trebol-400" />
                <span className="text-xs font-medium tracking-tight text-white">
                  Respaldo oficial
                </span>
              </div>

              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pausar video" : "Reproducir video"}
                className="absolute bottom-4 right-4 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition hover:border-trebol-500 hover:bg-trebol-600"
              >
                {playing ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 translate-x-px" />
                )}
              </button>
            </div>

            {corners.map((position) => (
              <span
                key={position}
                className={`pointer-events-none absolute h-6 w-6 border-trebol-500/60 ${position}`}
              />
            ))}
          </motion.div>

          {/* Certificaciones */}
          <div className="space-y-5">
            {certs.map((cert, i) => (
              <motion.div
                key={cert.tag}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-dark-800/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-trebol-500/30 hover:bg-dark-800/80 md:p-7"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-trebol-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute -bottom-4 right-4 select-none font-heading text-7xl font-bold text-white/[0.03]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 flex items-start gap-5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-trebol-500/10 ring-1 ring-trebol-500/30">
                    <cert.icon className="h-6 w-6 text-trebol-400" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-heading text-sm font-bold tracking-[0.2em] text-trebol-400">
                        {cert.tag}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-trebol-500/40 to-transparent" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold tracking-tight text-white md:text-xl">
                      {cert.title}
                    </h3>
                    <p className="text-sm leading-relaxed tracking-tight text-gray-400 md:text-base">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
