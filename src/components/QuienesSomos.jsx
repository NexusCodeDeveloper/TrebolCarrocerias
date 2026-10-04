import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { getImageUrl } from "../lib/cloudinary";

const QUIENES_IMG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791062230/Recurso_4_xutkdu.png";
const QUIENES_LOGO =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067601/Recurso_4_xxrqtt.svg";

const paragraphs = [
  "Somos una empresa salteña que cuenta con un equipo de profesionales altamente calificados para la fabricación de carrocerías.",
  "Las desarrollamos y diseñamos con los materiales de mayor calidad del mercado y en base a los requerimientos de nuestros clientes.",
  "Contamos con stock de diferentes tipos, modelos, tamaños y con las mejores terminaciones.",
  "Brindamos asesoramiento gratuito, propiciando su seguridad y confianza.",
];

export default function QuienesSomos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="quienes-somos"
      className="relative overflow-hidden py-20 md:pt-40 md:pb-12 px-5"
    >
      {/* Background: degradado blanco → gris de izquierda a derecha */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-zinc-300" />
      <div className="absolute -top-32 right-0 w-[30rem] h-[30rem] rounded-full bg-trebol-500/10 blur-[160px]" />
      <div className="absolute -bottom-32 left-0 w-[30rem] h-[30rem] rounded-full bg-trebol-500/10 blur-[160px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center lg:items-start">
          {/* Título + imagen */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl  tracking-tight text-gray-900 leading-[1.05]">
                Quiénes
                <br />
                <span className="gradient-text font-bold">somos</span>
              </h2>
              <div className="mt-8 h-1 w-32 bg-gradient-to-r from-trebol-500 to-transparent" />
            </motion.div>
            {/* Imagen: entra desde la izquierda, 1s después de los textos */}
            <motion.img
              initial={{ opacity: 0, x: -80 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              src={getImageUrl(QUIENES_IMG)}
              alt="Carrocería Trébol"
              className="mt-10 w-full max-w-2xl object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Logo + texto */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-9"
          >
            <img
              src={getImageUrl(QUIENES_LOGO)}
              alt="Trébol Carrocerías"
              className="hidden h-40 w-auto lg:block"
              loading="lazy"
              decoding="async"
            />
            {paragraphs.map((text, i) => (
              <div key={text} className="flex items-start gap-4">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.55 + i * 0.2,
                    ease: "easeOut",
                  }}
                  className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-trebol-500/10 ring-1 ring-trebol-500/30"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-trebol-500"
                  >
                    <motion.path
                      d="M20 6 9 17l-5-5"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.7 + i * 0.2,
                        ease: "easeOut",
                      }}
                    />
                  </svg>
                </motion.span>
                <motion.p
                  initial={{ opacity: 0, x: 15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.2,
                    ease: "easeOut",
                  }}
                  className="text-black font-medium text-base md:text-lg leading-relaxed tracking-tight"
                >
                  {text}
                </motion.p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
