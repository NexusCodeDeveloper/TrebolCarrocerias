import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
      className="relative overflow-hidden py-24 md:py-32 px-4"
    >
      {/* Background: verde sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-trebol-800/25 to-black" />
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-trebol-500/10 blur-[120px]" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 rounded-full bg-trebol-700/10 blur-[120px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              QUIÉNES
              <br />
              <span className="gradient-text">SOMOS</span>
            </h2>
            <div className="mt-8 h-px w-32 bg-gradient-to-r from-trebol-500 to-transparent" />
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5"
          >
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
                    className="h-4 w-4 text-trebol-400"
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
                  className="text-gray-300 text-base md:text-lg leading-relaxed tracking-tight"
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
