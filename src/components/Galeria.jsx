import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

const allImages = [
  {
    src: "/img/volcable-amarillo.jpg",
    alt: "Baranda Volcable Amarilla",
    category: "Baranda Volcable",
    stat: "500+",
    statLabel: "Unidades",
  },
  {
    src: "/img/paquetero-azul.jpg",
    alt: "Paquetero Azul",
    category: "Paqueteros",
    stat: "200+",
    statLabel: "Entregas",
  },
  {
    src: "/img/volcable-blanco.jpg",
    alt: "Baranda Volcable Blanca",
    category: "Baranda Volcable",
    stat: "50+",
    statLabel: "Este año",
  },
  {
    src: "/img/semi-bajada-bonano.jpg",
    alt: "Semi Bajada",
    category: "Playos",
    stat: "80+",
    statLabel: "Proyectos",
  },
  {
    src: "/img/paquetero-trasera.jpg",
    alt: "Paquetero Trasera",
    category: "Paqueteros",
    stat: "150+",
    statLabel: "Activos",
  },
  {
    src: "/img/playo-andina.jpg",
    alt: "Playo Andina",
    category: "Playos",
    stat: "300+",
    statLabel: "Completos",
  },
  {
    src: "/img/frame-hierronort.jpg",
    alt: "Frame Hierronort",
    category: "Chasis",
    stat: "100%",
    statLabel: "Homologados",
  },
];

const fallbackImages = allImages.map((img) => ({
  ...img,
  fallback: `https://placehold.co/600x500/0A0A0A/0D7C3E?text=${encodeURIComponent(img.alt)}`,
}));

export default function Galeria() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section id="galeria" className="py-32 md:py-48 px-4 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
              Nuestros Trabajos
            </span>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              Galería de
              <br />
              <span className="gradient-text">Proyectos</span>
            </h2>
          </motion.div>
        </div>

        {/* Gallery grid - asymmetric like reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {fallbackImages.map((img, i) => {
            const isLarge = i === 0 || i % 6 === 5;

            return (
              <motion.div
                key={`${img.src}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  isLarge ? "lg:col-span-2" : ""
                }`}
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  width={600}
                  height={500}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = img.fallback;
                  }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Stat badge - top right */}
                <div className="absolute top-4 right-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-center">
                  <div className="font-heading text-3xl font-bold text-white tracking-tight leading-none mb-1">
                    {img.stat}
                  </div>
                  <div className="text-gray-300 text-xs tracking-[0.1em] uppercase">
                    {img.statLabel}
                  </div>
                </div>

                {/* Category badge - top left */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                  <span className="text-white text-xs font-medium tracking-tight">
                    {img.category}
                  </span>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-heading font-bold text-lg tracking-tight mb-1">
                    {img.alt}
                  </h3>
                  <span className="text-trebol-400 text-sm">
                    {img.category}
                  </span>
                </div>

                {/* Plus button */}
                <div className="absolute bottom-5 right-5">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-trebol-500/80 group-hover:border-trebol-500 transition-all"
                  >
                    {expandedIndex === i ? (
                      <X className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </motion.div>
                </div>

                {/* Expanded detail panel */}
                <AnimatePresence>
                  {expandedIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl p-6 border-t border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 rounded-full bg-trebol-500" />
                        <span className="text-white font-heading font-bold tracking-tight">
                          {img.alt}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Carrocería de alta calidad fabricada con los mejores
                        materiales y tecnología de vanguardia. Cumplimiento
                        total con normativa CNTSV y AITA.
                      </p>
                      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
                        <div>
                          <div className="font-heading text-2xl font-bold text-trebol-400">
                            {img.stat}
                          </div>
                          <div className="text-gray-500 text-xs uppercase tracking-wider">
                            {img.statLabel}
                          </div>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div>
                          <div className="font-heading text-2xl font-bold text-white">
                            A+
                          </div>
                          <div className="text-gray-500 text-xs uppercase tracking-wider">
                            Calidad
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
