import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus, Wrench, X } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import { getImageUrl, getLogoUrl } from "../lib/cloudinary";

const PRODUCTOS_BG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791065116/fdo_trebol_f0lntj.png";

/**
 * @typedef {Object} Product
 * @property {import("lucide-react").LucideIcon} icon
 * @property {string} [iconImage]
 * @property {string} title
 * @property {string} subtitle
 * @property {string} description
 * @property {string} image
 * @property {string} [imageMobile]
 * @property {string} stat
 * @property {string} statLabel
 * @property {string[]} features
 * @property {{ title: string, text: string }[]} [details]
 * @property {string[]} gallery
 */

/** @type {Product[]} */
const products = [
  {
    icon: Wrench,
    iconImage: "",
    title: "3er Eje Neumático",
    subtitle: "",
    description:
      "Servicio de ingeniería y montaje para el añadido de un tercer eje neumático al chasis.",
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/c_crop,w_1915,h_1075/v1791584103/Recurso-58.jpg_zrcqbp.jpg",
    imageMobile:
      "https://res.cloudinary.com/da1hje3a1/image/upload/c_crop,w_602,h_1074/v1791584089/Recurso-57.jpg_lg5qet.jpg",
    stat: "",
    statLabel: "",
    features: [
      "Permite elevar la capacidad de carga del camión y optimizar la distribución del peso por eje",
      "Incluye sistema de elevación neumático para reducir el desgaste de neumáticos durante los trayectos sin carga",
    ],
    details: [],
    gallery: [
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791138551/3er-eje.jpg_g5af0k.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791586297/3erEje_vgr7kf.jpg",
    ],
  },
  {
    icon: Wrench,
    iconImage: "",
    title: "Vinculación de Grúas",
    subtitle: "",
    description:
      "En Trébol Carrocerías, nos especializamos en la venta, instalación profesional y servicio técnico especializado de grúas articuladas Hidro-Grubert Palfinger, garantizando el respaldo de repuestos originales",
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/c_crop,w_1915,h_1075/v1791584089/Recurso-56.jpg_wybrpt.jpg",
    imageMobile:
      "https://res.cloudinary.com/da1hje3a1/image/upload/c_crop,w_602,h_1075/v1791584089/Recurso-55.jpg_cwnfei.jpg",
    stat: "",
    statLabel: "",
    features: [
      "Brindamos asesoramiento experto para garantizar seguridad y durabilidad",
      "Servicio técnico especializado y mantenimiento preventivo",
      "Instalación profesional de equipos",
      "Equipos de alta calidad",
    ],
    details: [],
    gallery: [
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791586392/grua3_dliw2f.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791586391/grua2_v2dksh.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791586390/grua4_vsaeto.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791586390/grua1_ff3wiq.jpg",
    ],
  },
];

/**
 * Tarjeta fija de producto (sin motor de apilado/scroll).
 * @param {{ product: Product }} props
 */
function ProductoDestacado({ product }) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );
  const [detailsOpen, setDetailsOpen] = useState(false);

  /* Rotación/resize: alterna imagen mobile/desktop */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (/** @type {MediaQueryListEvent} */ e) =>
      setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Cerrar el panel de características con Escape */
  useEffect(() => {
    if (!detailsOpen) return;
    const onKey = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === "Escape") setDetailsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detailsOpen]);

  return (
    <div className="relative min-h-lvh w-full overflow-hidden max-md:rounded-3xl">
      {/* Imagen de fondo full-bleed */}
      <img
        src={getImageUrl(
          isMobile && product.imageMobile ? product.imageMobile : product.image,
        )}
        alt={product.title}
        className="absolute inset-0 w-full h-full "
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.currentTarget.src = `https://placehold.co/1600x900/0A0A0A/0D7C3E?text=${product.title}`;
        }}
      />

      {/* Overlay sutil de lectura */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/5" />

      {/* Contenido: texto + carrusel */}
      <div className="relative z-10 flex min-h-lvh flex-col justify-between gap-12 px-6 pb-8 pt-28 md:justify-center md:gap-8 md:px-12 md:pt-0 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pb-0 lg:px-16 xl:gap-12 xl:px-28">
        <div className="relative max-w-xl md:max-w-2xl lg:max-w-xl">
          <div>
            {/* Eyebrow: punto + línea decorativa */}
            <div className="flex items-center gap-4 mb-5 md:mb-6">
              <div className="w-3 h-3 rounded-full bg-trebol-500" />
              <div className="h-px flex-1 bg-gradient-to-r from-trebol-500/50 to-transparent" />
            </div>
            {/* Badge con ícono */}
            <div className="flex items-center gap-3 mb-2 md:mb-4">
              {product.iconImage ? (
                <img
                  src={getLogoUrl(product.iconImage)}
                  alt=""
                  aria-hidden="true"
                  className="w-12 h-12 md:w-18 md:h-18 "
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <product.icon className="hidden" />
              )}
              <span className="text-gray-400 text-xs md:text-sm tracking-[0.2em] uppercase">
                {product.subtitle}
              </span>
            </div>
            <h3 className="font-heading text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-4 md:mb-6">
              {product.title}
            </h3>
            <p className="text-gray-200 font-semibold md:text-xl leading-relaxed tracking-tight mb-6 md:mb-8 max-w-lg">
              {product.description}
            </p>
            {/* Características */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-7 md:mb-10">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-trebol-500  mt-0.5 shrink-0" />
                  <span className="text-white text-sm md:text-base leading-relaxed tracking-tight">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            {/* Estadística destacada / Características + Cotizar */}
            <div className="flex flex-wrap items-center gap-6">
              {product.details?.length ? (
                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  aria-expanded={detailsOpen}
                  className="inline-flex items-center gap-2 rounded-full border border-trebol-500/40 bg-trebol-500/50 px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-bold text-white tracking-tight transition-colors hover:border-trebol-500/70 hover:bg-trebol-500/20"
                >
                  <Plus className="h-4 w-4" />
                  Características
                </button>
              ) : (
                <div className="flex items-end gap-3 md:gap-4">
                  <span className="font-heading text-4xl md:text-6xl font-bold text-trebol-400 tracking-tight leading-none">
                    {product.stat}
                  </span>
                  <span className="text-gray-400 text-xs md:text-sm tracking-[0.15em] uppercase pb-1">
                    {product.statLabel}
                  </span>
                </div>
              )}
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-trebol-500/40 bg-trebol-500/50 px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-bold text-white tracking-tight transition-colors hover:border-trebol-500/70 hover:bg-trebol-500/20"
              >
                Cotizar
              </a>
            </div>
          </div>

          {/* Panel de características: se despliega hacia arriba sobre el texto */}
          <AnimatePresence>
            {detailsOpen && product.details?.length ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-x-0 bottom-0 z-20 overflow-hidden rounded-2xl border border-trebol-500/30 bg-black shadow-elevated"
                role="dialog"
                aria-label={`Características de ${product.title}`}
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
                  <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-trebol-400">
                    Características
                  </span>
                  <button
                    type="button"
                    onClick={() => setDetailsOpen(false)}
                    aria-label="Cerrar características"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-gray-300 transition hover:border-trebol-500 hover:bg-trebol-500/20 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <ul className="max-h-[55vh] space-y-4 overflow-y-auto px-5 py-4">
                  {product.details.map((detail) => (
                    <li key={detail.title}>
                      <p className="text-sm font-semibold text-trebol-300">
                        {detail.title}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {detail.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        {/* Carrusel: arriba y centrado en mobile/tablet, columna derecha en desktop */}
        <div className="order-first mx-auto w-80 max-w-full shrink-0 md:w-[26rem] lg:order-none lg:mx-0 lg:w-96 xl:w-[36rem]">
          <ImageCarousel images={product.gallery} alt={product.title} />
        </div>
      </div>
    </div>
  );
}

export default function ProductosDestacados() {
  return (
    <section
      id="productos-destacados"
      className="relative overflow-hidden bg-black"
    >
      {/* Fondo: patrón de trébol (igual que Productos) */}
      <div
        className="hidden md:block absolute inset-x-0 top-0 h-dvh scale-105 bg-cover bg-center blur-sm max-md:h-lvh md:scale-100 md:blur-0"
        style={{ backgroundImage: `url(${getImageUrl(PRODUCTOS_BG)})` }}
      />
      <div className="hidden md:block absolute inset-x-0 top-0 h-dvh bg-black/40 max-md:h-lvh" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/40 to-transparent" />

      {/* Tarjetas fijas: una debajo de la otra */}
      <div
        data-back-products
        className="relative z-10 max-md:px-3 max-md:space-y-4 max-md:py-4"
      >
        {products.map((product, i) => (
          <ProductoDestacado key={`destacado-${i}`} product={product} />
        ))}
      </div>
    </section>
  );
}
