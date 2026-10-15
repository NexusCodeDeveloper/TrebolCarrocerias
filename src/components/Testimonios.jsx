import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import hidrotec from "../assets/clientes/01-hidrotec.png";
import serminca from "../assets/clientes/02-serminca.png";
import hierronort from "../assets/clientes/03-hierronort.png";
import aramis from "../assets/clientes/04-aramis.png";
import kajai from "../assets/clientes/05-kajai.png";
import siates from "../assets/clientes/06-siates.png";
import cnGrupo from "../assets/clientes/07-cn-grupo.png";
import laEstrella from "../assets/clientes/08-la-estrella.png";
import andina from "../assets/clientes/09-andina.png";
import galaKo from "../assets/clientes/10-gala-ko.png";
import smc from "../assets/clientes/11-smc.png";
import controlAndina from "../assets/clientes/12-control-andina.png";
import rq from "../assets/clientes/13-rq.png";
import cronec from "../assets/clientes/14-cronec.png";
import shamana from "../assets/clientes/15-shamana.png";
import imeca from "../assets/clientes/16-imeca.png";
import saltaPerforaciones from "../assets/clientes/17-salta-perforaciones.png";
import geoMix from "../assets/clientes/18-geo-mix.png";
import municipalidad from "../assets/clientes/19-municipalidad.png";
import noaGeneracion from "../assets/clientes/20-noa-generacion.png";
import jmg from "../assets/clientes/21-jmg.png";
import mei from "../assets/clientes/22-mei.png";
import nubicom from "../assets/clientes/23-nubicom.png";
import saltapor from "../assets/clientes/24-saltapor.png";
import saltaMunicipalidad from "../assets/clientes/25-salta-municipalidad.png";

/* Velocidad de la cinta de logos (px por segundo) */
const SPEED = 60;

/** @typedef {{ name: string, logo: string }} Client */

/** @type {Client[]} */
const clients = [
  { name: "Hidrotec", logo: hidrotec },
  { name: "Serminca Servicios Mineros", logo: serminca },
  { name: "Hierronort", logo: hierronort },
  { name: "Aramis Servicios Mineros", logo: aramis },
  { name: "Kajai Ingeniería", logo: kajai },
  { name: "Siates S.A.", logo: siates },
  { name: "CN Grupo", logo: cnGrupo },
  { name: "La Estrella Catering y Hotelería", logo: laEstrella },
  { name: "andina", logo: andina },
  { name: "Gala ko", logo: galaKo },
  { name: "smc", logo: smc },
  { name: "Control Andina", logo: controlAndina },
  { name: "RQ", logo: rq },
  { name: "Cronec SRL", logo: cronec },
  { name: "Shamana", logo: shamana },
  { name: "Imeca", logo: imeca },
  { name: "Salta Perforaciones", logo: saltaPerforaciones },
  { name: "Geo Mix", logo: geoMix },
  { name: "Municipalidad", logo: municipalidad },
  { name: "Noa Generación", logo: noaGeneracion },
  { name: "JMG", logo: jmg },
  { name: "Mei", logo: mei },
  { name: "Nubicom", logo: nubicom },
  { name: "Saltapor", logo: saltapor },
  { name: "Salta Municipalidad", logo: saltaMunicipalidad },
];

export default function Testimonios() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const trackRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const viewportRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const halfRef = useRef(0);
  const offsetRef = useRef(0);
  const hoverRef = useRef(false);
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  /* Cinta infinita de una línea (mismo motor que Normas):
     corre solo cuando es visible, se pausa con el mouse encima
     y con prefers-reduced-motion queda estática. */
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    let rafId = /** @type {number | null} */ (null);
    let last = 0;
    let visible = false;
    let lastWritten = -1;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();

    const step = (/** @type {number} */ now) => {
      rafId = requestAnimationFrame(step);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      let offset = offsetRef.current;
      if (!hoverRef.current && !reducedMotion) offset += SPEED * dt;

      const h = halfRef.current;
      if (h > 0) {
        while (offset >= h) offset -= h;
        while (offset < 0) offset += h;
      }

      offsetRef.current = offset;
      if (offset !== lastWritten) {
        lastWritten = offset;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
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

  return (
    <section
      id="testimonios"
      className="relative overflow-hidden pt-12 pb-8 md:pt-20 md:pb-10 px-4"
    >
      {/* Background: verde esmeralda brillante - confianza/éxito */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031d12] via-[#06331e] to-[#031d12]" />
      <div className="hidden md:block absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-emerald-500/20 blur-[160px]" />
      <div className="hidden md:block absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-emerald-600/20 blur-[160px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl  tracking-tight text-white leading-[1.05]">
            Empresas que nos
            <br />
            <span className="gradient-text font-bold">eligen</span>
          </h2>
        </motion.div>
      </div>

      {/* Cinta de logos: una sola línea, avanza sola (los PNG van tal cual) */}
      <div
        ref={viewportRef}
        className="relative z-10 -mx-4 overflow-hidden"
        onMouseEnter={() => {
          hoverRef.current = true;
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
        }}
      >
        <div ref={trackRef} className="flex w-max items-center gap-4 pr-4">
          {[...clients, ...clients].map((client, i) => (
            <img
              key={`${i}-${client.name}`}
              src={client.logo}
              alt={i < clients.length ? client.name : ""}
              aria-hidden={i >= clients.length}
              className="h-28 w-28 shrink-0 object-contain opacity-60 transition-all duration-500 hover:scale-105 hover:opacity-100 sm:h-26 sm:w-26 lg:h-48 lg:w-48"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
