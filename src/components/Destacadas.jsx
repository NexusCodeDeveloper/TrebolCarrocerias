import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpToLine, Gauge, Package, Wrench } from "lucide-react";
import { getImageUrl } from "../lib/cloudinary";

const DESTACADAS_BG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791085360/Recurso_44_jelhfu.png";
const CARD_IMG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791061252/logo2_i8ovgm.svg";

const cards = [
  {
    icon: Gauge,
    front: "Inclinómetros",
    back: 'Somos representante oficial en el en el norte del país, de Inclinómetros ARBIP, "Descargas seguras”.',
    image: CARD_IMG,
  },
  {
    icon: Wrench,
    front: "kit hidráulico",
    back: "provision de kit hidráulico para bateas",
    image: CARD_IMG,
  },
  {
    icon: Package,
    front: "Repuestos",
    back: "Repuestos originales y alternativos para carrocerías y equipos. Entrega en el norte del país y asesoramiento para elegir el correcto.",
    image: CARD_IMG,
  },
  {
    icon: ArrowUpToLine,
    front: "Elementos de izaje",
    back: "Eslingas, grilletes, cadenas y accesorios certificados para operaciones de carga y descarga seguras.",
    image: CARD_IMG,
  },
];

/**
 * Tarjeta de catálogo: imagen con duotono + título + descripción siempre visibles.
 * @param {{ card: { icon: import("lucide-react").LucideIcon, front: string, back: string, image: string }, index: number, isInView: boolean }} props
 */
function CatalogCard({ card, index, isInView }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="overflow-hidden rounded-3xl bg-white/95 shadow-elevated ring-1 ring-white/40"
    >
      {/* Imagen 16:9: logo placeholder hasta las fotos reales */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-b from-white to-gray-100">
        <img
          src={card.image}
          alt={card.front}
          className="absolute inset-0 h-full w-full object-contain p-8 md:p-10"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Contenido */}
      <div className="p-5 md:p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-950 ring-1 ring-trebol-500/30">
            <card.icon className="h-5 w-5 text-green-400" />
          </span>
          <h3 className="font-heading text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
            {card.front}
          </h3>
        </div>
        <p className="text-sm leading-relaxed tracking-tight text-gray-700 md:text-base">
          {card.back}
        </p>
        <a
          href="#contacto"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-trebol-500/40 bg-trebol-500/5 px-4 py-2 text-xs font-bold tracking-tight text-trebol-700 transition-colors hover:border-trebol-500 hover:bg-trebol-500/15"
        >
          Consultar
        </a>
      </div>
    </motion.article>
  );
}

export default function Destacadas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="destacadas"
      className="relative overflow-hidden py-32 md:py-20 px-4"
    >
      {/* Background: imagen con patrón */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${getImageUrl(DESTACADAS_BG)})` }}
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight text-black leading-[1.05]">
            Repuestos /<span className=" font-bold text-white"> otros</span>
          </h2>
        </motion.div>

        {/* Tarjetas: 2 columnas en PC, 1 en mobile */}
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <CatalogCard
              key={card.front}
              card={card}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
