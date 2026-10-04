import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Ruler, Handshake, Wrench } from "lucide-react";
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

export default function Normas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="normas"
      className="relative overflow-hidden py-32 md:pt-25 md:pb-15 px-4 text-center"
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
          <span className="text-trebol-600 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Respaldo y Certificaciones
          </span>
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

        {/* Certificaciones: una al lado de la otra debajo de los textos */}
        <div className="animate-marquee  grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.tag}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className=" group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-trebol-600 via-trebol-600 to-[#9BC53D] p-6 shadow-elevated transition-all duration-500 hover:border-white/50"
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
                    /* IRAM: el logo grande ocupa el lugar de título y descripción */
                    <img
                      src={getImageUrl(cert.image)}
                      alt={cert.tag}
                      className="w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <>
                      <h3 className="font-heading text-lg font-bold leading-snug tracking-tight text-white">
                        {cert.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed tracking-tight text-white/85">
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
    </section>
  );
}
