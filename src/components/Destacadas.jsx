import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpToLine, Gauge, Package, Wrench } from "lucide-react";
import { getImageUrl } from "../lib/cloudinary";

const DESTACADAS_BG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791085360/Recurso_44_jelhfu.png";

/* Tiempo entre cambios del carrusel automático de cada tarjeta */
const CAROUSEL_DELAY = 3000;

const cards = [
  {
    icon: Gauge,
    front: "Inclinómetros",
    back: 'Somos representante oficial en el en el norte del país, de Inclinómetros ARBIP, "Descargas seguras”.',
    images: [
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791930834/WhatsApp_Image_2026-10-13_at_7.12.46_PM_mtaxbi.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791930871/WhatsApp_Image_2026-10-13_at_7.12.46_PM_1_fl1k9p.jpg",
    ],
  },
  {
    icon: Wrench,
    front: "kit hidráulico",
    back: "provision de kit hidráulico para bateas",
    images: [
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791928086/WhatsApp_Image_2026-10-13_at_6.45.08_PM_rwnjen.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791928113/WhatsApp_Image_2026-10-13_at_6.45.09_PM_ib834q.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791928128/WhatsApp_Image_2026-10-13_at_6.45.09_PM_1_rb26ay.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791928142/WhatsApp_Image_2026-10-13_at_6.45.09_PM_2_wda8j7.jpg",
    ],
  },
  {
    icon: Package,
    front: "Repuestos",
    back: "Repuestos originales y alternativos para carrocerías y equipos. Entrega en el norte del país y asesoramiento para elegir el correcto.",
    images: [
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791928691/WhatsApp_Image_2026-10-13_at_6.57.27_PM_gqyc1n.jpg",
    ],
  },
  {
    icon: ArrowUpToLine,
    front: "Elementos de izaje",
    back: "Elementos de sujeción e izaje de carga: eslinga de amarre con criquet traca y eslinga de izaje.",
    images: [
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791927498/WhatsApp_Image_2026-10-13_at_6.30.54_PM_2_cjlpaq.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791927480/WhatsApp_Image_2026-10-13_at_6.30.54_PM_1_yvta3y.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791927150/WhatsApp_Image_2026-10-13_at_6.30.54_PM_x6nblx.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791927513/WhatsApp_Image_2026-10-13_at_6.30.54_PM_3_wcwdgp.jpg",
    ],
  },
];

/**
 * Carrusel automático con fundido: pasa solo cada CAROUSEL_DELAY ms,
 * con desfase por tarjeta y pausado cuando la sección no está en pantalla.
 * @param {{ images: string[], alt: string, offset: number, active: boolean }} props
 */
function CardCarousel({ images, alt, offset, active }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!active || images.length < 2) return;

    let interval = 0;
    /* Desfase inicial: cada tarjeta arranca en un momento distinto */
    const first = window.setTimeout(
      () => {
        setIdx((i) => (i + 1) % images.length);
        interval = window.setInterval(
          () => setIdx((i) => (i + 1) % images.length),
          CAROUSEL_DELAY,
        );
      },
      1600 + offset * 900,
    );

    return () => {
      clearTimeout(first);
      if (interval) clearInterval(interval);
    };
  }, [active, images.length, offset]);

  return (
    <div className="relative aspect-video overflow-hidden bg-gray-100">
      {images.map((src, i) => (
        <img
          key={src}
          src={getImageUrl(src)}
          alt={i === idx ? alt : ""}
          aria-hidden={i !== idx}
          style={{ opacity: i === idx ? 1 : 0 }}
          className="carousel-fade absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}

/**
 * Tarjeta de catálogo: carrusel de imágenes 16:9 + título + descripción + CTA.
 * @param {{ card: { icon: import("lucide-react").LucideIcon, front: string, back: string, images: string[] }, index: number, isInView: boolean, active: boolean }} props
 */
function CatalogCard({ card, index, isInView, active }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="overflow-hidden rounded-3xl bg-white/95 shadow-elevated ring-1 ring-white/40"
    >
      <CardCarousel
        images={card.images}
        alt={card.front}
        offset={index}
        active={active}
      />

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
  const gridRef = useRef(null);
  /* Sin `once`: los carruseles solo corren mientras la grilla está en pantalla */
  const carouselsActive = useInView(gridRef, { amount: 0.2 });

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
        <div
          ref={gridRef}
          className="grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-8"
        >
          {cards.map((card, i) => (
            <CatalogCard
              key={card.front}
              card={card}
              index={i}
              isInView={isInView}
              active={carouselsActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
