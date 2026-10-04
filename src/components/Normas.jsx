import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Ruler,
  Handshake,
  Wrench,
} from "lucide-react";
import { getImageUrl } from "../lib/cloudinary";

const WATERMARK =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067601/Recurso_3_zznxnz.svg";

/**
 * @typedef {Object} Cert
 * @property {import("lucide-react").LucideIcon} [icon]
 * @property {string} [image]
 * @property {string} tag
 * @property {string} [title]
 * @property {string} [description]
 */

/** @type {Cert[]} */
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
    title: "Extensión de chasis",
    description:
      "Realizamos extensión de chasis bajo norma de la Asociación de Ingenieros y Técnicos del Automotor.",
  },
  {
    icon: Handshake,
    tag: "CAPEMISA",
    title: "Socios de la cámara",
    description: "Somos socios de la Cámara de Proveedores Mineros de Salta.",
  },
  {
    icon: Wrench,
    tag: "HIDRO-GRUBERT",
    title: "Servicio oficial Palfinger",
    description: "Servicio oficial de Hidro-Grubert Palfinger.",
  },
  {
    icon: ShieldCheck,
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791087308/LOGO_IRAM_pic0ju.svg",
    tag: "IRAM",
  },
];

const CARD_STEP = 300 + 24; // ancho de tarjeta + margen
const SPEED = 90; // px por segundo del loop automático

export default function Normas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const trackRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const viewportRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const halfRef = useRef(0);
  const offsetRef = useRef(0);
  const targetRef = useRef(/** @type {number | null} */ (null));
  const dragRef = useRef(
    /** @type {{ startX: number, startOffset: number } | null} */ (null),
  );
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  /* Loop infinito con rAF + transform. Solo corre cuando la sección es visible. */
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    let rafId = /** @type {number | null} */ (null);
    let last = 0;
    let visible = false;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();

    const step = (/** @type {number} */ now) => {
      rafId = requestAnimationFrame(step);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      let offset = offsetRef.current;
      let target = targetRef.current;

      if (target !== null) {
        offset += (target - offset) * 0.18;
        if (Math.abs(target - offset) < 0.5) {
          offset = target;
          target = null;
          targetRef.current = null;
        }
      } else if (!dragRef.current && !reducedMotion) {
        offset += SPEED * dt;
      }

      /* Loop infinito: offset y target se desplazan juntos al cruzar el límite */
      const h = halfRef.current;
      if (h > 0) {
        while (offset >= h) {
          offset -= h;
          if (target !== null) target -= h;
        }
        while (offset < 0) {
          offset += h;
          if (target !== null) target += h;
        }
        if (target !== null) targetRef.current = target;
      }

      offsetRef.current = offset;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const start = () => {
      if (rafId !== null) return;
      last = performance.now();
      rafId = requestAnimationFrame(step);
    };
    const stop = () => {
      if (rafId === null) return;
      cancelAnimationFrame(rafId);
      rafId = null;
    };

    const obs = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    obs.observe(viewport);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", measure);

    return () => {
      stop();
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", measure);
    };
  }, [reducedMotion]);

  /* Flechas: mueven al siguiente/anterior con suavizado, luego retoma el loop */
  const move = (/** @type {number} */ dir) => {
    const base = targetRef.current ?? offsetRef.current;
    targetRef.current = base + dir * CARD_STEP;
  };

  /* Swipe / arrastre (mobile y mouse) */
  const onPointerDown = (
    /** @type {React.PointerEvent<HTMLDivElement>} */ e,
  ) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = { startX: e.clientX, startOffset: offsetRef.current };
    targetRef.current = null;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* pointer no activo (eventos sintéticos) */
    }
  };
  const onPointerMove = (
    /** @type {React.PointerEvent<HTMLDivElement>} */ e,
  ) => {
    const d = dragRef.current;
    if (!d) return;
    let off = d.startOffset - (e.clientX - d.startX);
    const h = halfRef.current;
    if (h > 0) {
      while (off < 0) {
        off += h;
        d.startOffset += h;
      }
      while (off >= h) {
        off -= h;
        d.startOffset -= h;
      }
    }
    offsetRef.current = off;
  };
  const endDrag = () => {
    dragRef.current = null;
  };

  return (
    <section
      id="normas"
      className="relative overflow-hidden py-32 md:pt-15 md:pb-12 px-4 text-center"
    >
      {/* Background: degradado blanco → gris de izquierda a derecha */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-300" />

      {/* Marca de agua: logo grande a la izquierda */}
      <img
        src={getImageUrl(WATERMARK)}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 w-[36rem] max-w-[80vw] -translate-y-1/2 select-none opacity-[0.05] brightness-0"
        loading="lazy"
        decoding="async"
      />

      {/* Resplandores ambientales */}
      <div className="ambient-pulse absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-trebol-500/10 blur-[160px]" />
      <div className="ambient-pulse absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-trebol-600/10 blur-[160px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/30 to-transparent" />

      {/* Container fluid: usa todo el ancho de la sección */}
      <div className="w-full relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl  tracking-tight text-gray-900 leading-[1.05]">
            Normas que nos
            <br />
            <span className="gradient-text font-bold">avalan</span>
          </h2>
          <p className=" mt-6 max-w-2xl text-black font-bold text-base md:text-lg leading-relaxed tracking-tight mx-auto text-center">
            Cumplimos con las normativas vigentes y contamos con el respaldo de
            organismos y cámaras del sector.
          </p>
        </motion.div>

        {/* Carrusel: loop automático + flechas (PC) + swipe (mobile) */}
        <div className="relative">
          <div
            ref={viewportRef}
            className="cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              ref={trackRef}
              className="flex w-max will-change-transform"
              style={{ transform: "translate3d(0, 0, 0)" }}
            >
              {[...certs, ...certs].map((cert, i) => (
                <motion.div
                  key={`${cert.tag}-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + (i % certs.length) * 0.15,
                  }}
                  className="group relative mr-6 w-[300px] shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-trebol-900 via-trebol-700 to-[#279d3e] p-6 shadow-lg shadow-trebol-900/20 transition-colors duration-500 hover:border-white/50"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-4">
                      {cert.icon ? (
                        <div className="icon-pulse grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-950 ring-1 ring-trebol-500/30">
                          <cert.icon className="h-5 w-5 text-green-400" />
                        </div>
                      ) : null}

                      <span className="font-heading text-xs font-bold tracking-[0.2em] text-white/70">
                        {cert.tag}
                      </span>
                    </div>

                    <div className="mt-4">
                      {cert.image ? (
                        <img
                          src={getImageUrl(cert.image)}
                          alt={cert.tag}
                          width={300}
                          height={150}
                          className="w-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <>
                          <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-white text-left">
                            {cert.title}
                          </h3>

                          <p className="mt-2 text-sm leading-relaxed tracking-tight text-white/85 text-left">
                            {cert.description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Flechas sutiles: solo en PC (en mobile se desliza con el dedo) */}
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/70 text-gray-500 shadow-sm backdrop-blur transition hover:bg-white hover:text-gray-900 md:grid"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Siguiente"
            className="absolute right-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/70 text-gray-500 shadow-sm backdrop-blur transition hover:bg-white hover:text-gray-900 md:grid"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
