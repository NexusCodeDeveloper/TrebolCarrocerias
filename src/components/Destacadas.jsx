import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Truck, Wrench, Plus } from "lucide-react";
import { getImageUrl } from "../lib/cloudinary";

const DESTACADAS_BG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791085360/Recurso_44_jelhfu.png";
const DESTACADAS_IMG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791085420/destacados_kdh9to.png";

const featured = [
  {
    icon: Truck,
    title: "Vinculación de 3er eje neumático",
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791138551/3er-eje.jpg_g5af0k.jpg",
    text: "Servicio de ingeniería y montaje para el añadido de un tercer eje neumático al chasis. Permite elevar la capacidad de carga del camión y optimizar la distribución del peso por eje. Incluye sistema de elevación neumático para reducir el desgaste de neumáticos durante los trayectos sin carga.",
  },
  {
    icon: Wrench,
    title: "Servicio integral de grúas y vinculación de grúas",
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791138481/WhatsApp_Image_2026-10-04_at_1.52.52_PM_xxdigj.jpg",
    text: "En Trébol Carrocerías brindamos soluciones integrales para potenciar la operatividad y rendimiento de sus equipos. Nos especializamos en la venta, instalación profesional y servicio técnico especializado de grúas articuladas Hidro-Grubert Palfinger, garantizando el respaldo de repuestos originales, asesoramiento experto y un mantenimiento adecuado para asegurar la máxima seguridad, durabilidad y eficiencia en cada trabajo de carga.",
  },
];

export default function Destacadas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, {
    once: true,
    margin: "-80px",
  });
  const [openFeatured, setOpenFeatured] = useState(
    /** @type {number | null} */ (null),
  );

  /* Precarga de las imágenes de las tarjetas: aparecen al instante al abrir el panel */
  useEffect(() => {
    featured.forEach((item) => {
      const img = new Image();
      img.src = getImageUrl(item.image);
    });
  }, []);

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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Columna izquierda: tarjetas destacadas */}
          <div ref={featuredRef} className="space-y-5">
            {featured.map((item, i) => {
              const open = openFeatured === i;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  animate={featuredInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 1 + i * 0.3,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/90 shadow-elevated md:backdrop-blur-md"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-trebol-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

                  <div className="relative z-10 p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-950 ring-1 ring-trebol-500/30">
                        <item.icon className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <span className="mb-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-trebol-600">
                          Destacado
                        </span>
                        <h3 className="font-heading text-lg font-bold tracking-tight text-gray-900 md:text-xl">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenFeatured(open ? null : i)}
                      aria-expanded={open}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-trebol-500/40 bg-trebol-500/5 px-4 py-2 text-xs font-bold tracking-tight text-trebol-700 transition-colors hover:border-trebol-500 hover:bg-trebol-500/15"
                    >
                      <Plus
                        className={`h-4 w-4 transition-transform duration-300 ${
                          open ? "rotate-45" : ""
                        }`}
                      />
                      Más información
                    </button>

                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.45,
                            ease: [0.25, 1, 0.5, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-start">
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.title}
                              className=" w-full rounded-2xl object-cover"
                            />
                            <p className="text-sm leading-relaxed tracking-tight text-gray-700">
                              {item.text}
                            </p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Columna derecha: imagen */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <img
              src={getImageUrl(DESTACADAS_IMG)}
              alt="Destacados Trébol Carrocerías"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
