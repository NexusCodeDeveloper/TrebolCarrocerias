import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Truck,
  Package,
  Box,
  ArrowUpDown,
  Thermometer,
  Wrench,
  Plus,
  X,
} from "lucide-react";

const products = [
  {
    icon: Truck,
    title: "Baranda Volcable",
    subtitle: "Sistema hidráulico",
    description:
      "Carrocerías baranda volcable para transporte de carga general. Sistema de volcado hidráulico con control preciso, estructura reforzada y mayor durabilidad.",
    image: "/img/volcable-amarillo.jpg",
    stat: "500+",
    statLabel: "Unidades fabricadas",
  },
  {
    icon: Package,
    title: "Paqueteros",
    subtitle: "Distribución",
    description:
      "Soluciones robustas para transporte de paquetes. Estructura reforzada con optimización de espacio, ideal para distribución urbana y larga distancia.",
    image: "/img/paquetero-azul.jpg",
    stat: "200+",
    statLabel: "Entregas realizadas",
  },
  {
    icon: Box,
    title: "Playos",
    subtitle: "Carga general",
    description:
      "Carrocerías playo para carga paletizada. Suelo reforzado con antideslizante, laterales desmontables y sistema de amarrado integrado.",
    image: "/img/playo-andina.jpg",
    stat: "300+",
    statLabel: "Proyectos completos",
  },
  {
    icon: ArrowUpDown,
    title: "Volquetes",
    subtitle: "Granel",
    description:
      "Volquetes industriales para materiales a granel. Descarga hidráulica optimizada, capacidad desde 5 hasta 20 metros cúbicos.",
    image: "/img/volcable-azul.jpg",
    stat: "150+",
    statLabel: "Volquetes activos",
  },
  {
    icon: Thermometer,
    title: "Térmicos",
    subtitle: "Temperatura",
    description:
      "Carrocerías térmicas con aislación de alta densidad y circulación forzada. Control de temperatura para cadena de frío.",
    image: "/img/paquetero-trasera.jpg",
    stat: "80+",
    statLabel: "Flotas equipadas",
  },
  {
    icon: Wrench,
    title: "Extensión Chasis",
    subtitle: "Norma AITA",
    description:
      "Extensión de chasis bajo norma AITA. Homologación completa incluida, cumplimiento total con la normativa vigente.",
    image: "/img/frame-hierronort.jpg",
    stat: "100%",
    statLabel: "Homologados",
  },
];
export default function Productos() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["start 200%", "end end"],
  });

  return (
    <section id="productos" ref={sectionRef} className="bg-black">
      {/* Header - scroll normal, NO sticky */}
      <div className="pt-32 pb-8 px-4 max-w-7xl mx-auto">
        <span className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
          Nuestros Productos
        </span>
        <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-12">
          Soluciones que
          <br />
          <span className="gradient-text">mueven al transporte</span>
        </h2>
      </div>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="relative px-4 md:px-8 max-w-7xl mx-auto"
        style={{ height: `${(products.length + 0.5) * 100}vh` }}
      >
        {products.map((product, i) => (
          <Card
            key={product.title}
            product={product}
            index={i}
            total={products.length}
            scrollProgress={scrollYProgress}
            isExpanded={expandedIndex === i}
            onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}

function Card({ product, index, total, scrollProgress, isExpanded, onToggle }) {
  const segment = 1 / total;
  const start = index * segment;

  const y = useTransform(
    scrollProgress,
    [start, start + segment],
    ["100vh", "0vh"],
  );
  const opacity = useTransform(
    scrollProgress,
    [start, start + segment * 0.3],
    [0, 1],
  );

  return (
    <motion.div
      style={{
        y,
        zIndex: index + 1,
        position: "sticky",
        top: "120px",
        willChange: "transform",
      }}
    >
      <motion.div
        style={{ opacity }}
        style={{
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.8)",
          backgroundColor: "#111",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 rounded-full bg-trebol-500" />
              <div className="h-px flex-1 bg-gradient-to-r from-trebol-500/50 to-transparent" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <product.icon className="w-6 h-6 text-trebol-400" />
              <span className="text-gray-500 text-sm tracking-[0.2em] uppercase">
                {product.subtitle}
              </span>
            </div>
            <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              {product.title}
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {product.description}
            </p>
            <div className="flex items-end gap-4">
              <span className="font-heading text-5xl md:text-6xl font-bold text-trebol-400 tracking-tight leading-none">
                {product.stat}
              </span>
              <span className="text-gray-500 text-sm tracking-[0.15em] uppercase pb-2">
                {product.statLabel}
              </span>
            </div>
          </div>

          <div className="relative h-[350px] md:h-[500px] order-1 md:order-2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = `https://placehold.co/800x700/0A0A0A/0D7C3E?text=${product.title}`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#111] hidden md:block" />
            <button className="product-card-btn" onClick={onToggle}>
              {isExpanded ? (
                <X size={20} color="white" />
              ) : (
                <Plus size={20} color="white" />
              )}
            </button>
            {isExpanded && (
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={
                  {
                    /* background: "linear-gradient(to top, #111)", */
                  }
                }
              >
                <div className="flex items-center gap-3 mb-3">
                  <product.icon className="w-5 h-5 text-trebol-400" />
                  <span className="text-white font-heading font-bold">
                    {product.title}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
