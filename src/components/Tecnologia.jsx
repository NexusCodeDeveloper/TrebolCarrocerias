import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Zap, Target, Shield } from "lucide-react";

const technologies = [
  {
    icon: Zap,
    title: "Láser Fibra Óptica",
    description:
      "Corte de precisión milimétrica con tecnología láser de última generación.",
    stat: "0.1mm",
    statLabel: "Precisión",
  },
  {
    icon: Target,
    title: "Guillotina CNC",
    description:
      "Corte automatizado controlado por computadora que garantiza rectitud y consistencia.",
    stat: "3000mm",
    statLabel: "Capacidad",
  },
  {
    icon: Shield,
    title: "Plegadora CNC",
    description:
      "Doblado de chapa con control numérico para acabados perfectos.",
    stat: "100T",
    statLabel: "Presión",
  },
];

const features = [
  "Homologación CNTSV",
  "Member de CAPEMISA",
  "Stock permanente",
  "Asesoramiento gratuito",
  "Extensión de chasis AITA",
  "Ingeniería propia",
];

export default function Tecnologia() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      id="tecnologia"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Sticky parallax hero */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://placehold.co/1920x1080/0A0A0A/0D7C3E?text=Cargando+Video..."
          >
            <source
              src="https://www.pexels.com/es-es/download/video/37889019/"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-6 block">
            Nuestra Tecnología
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white mb-6">
            Vanguardia
            <br />
            <span className="gradient-text">Tecnológica</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Equipamiento de última generación para la máxima calidad y
            precisión.
          </p>
        </motion.div>
      </div>

      {/* Tech cards */}
      <div className="py-32 px-4 bg-black">
        <div className="max-w-7xl mx-auto" ref={ref}>
          <div className="grid md:grid-cols-3 gap-8">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative p-8 md:p-10 rounded-3xl border border-white/[0.06] bg-dark-800 hover:border-trebol-500/30 transition-all duration-500"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-trebol-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-trebol-500/10 flex items-center justify-center mb-8 group-hover:bg-trebol-500/20 transition-colors">
                    <tech.icon className="w-8 h-8 text-trebol-400" />
                  </div>

                  <h3 className="font-heading text-2xl font-bold mb-3 text-white tracking-tight">
                    {tech.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                    {tech.description}
                  </p>

                  <div className="border-t border-white/[0.06] pt-6">
                    <div className="font-heading text-5xl font-bold text-white tracking-tight mb-1">
                      {tech.stat}
                    </div>
                    <div className="text-gray-500 text-sm tracking-[0.2em] uppercase">
                      {tech.statLabel}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 p-10 md:p-14 rounded-3xl border border-white/[0.06] bg-dark-800"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-heading text-3xl md:text-4xl font-bold mb-8 tracking-tight">
                  ¿Por qué somos la{" "}
                  <span className="text-trebol-400">mejor opción</span>?
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-trebol-500 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden border border-white/[0.06]">
                  <img
                    src="/img/volcable-amarillo.jpg"
                    alt="Carrocería Trebol"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass rounded-xl p-4 border border-white/10">
                      <div className="text-trebol-400 text-sm font-medium tracking-[0.2em] uppercase">
                        Ubicación
                      </div>
                      <div className="text-white font-heading font-bold tracking-tight">
                        Ruta 51 Km 6½ — El Encón, Salta
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
