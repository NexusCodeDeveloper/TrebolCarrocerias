import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { getLogoUrl } from "../lib/cloudinary";

const clients = [
  {
    name: "Hidrotec",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067543/Recurso_15_coulbk.png",
  },
  {
    name: "Serminca Servicios Mineros",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067547/Recurso_17_bzmqhj.png",
  },
  {
    name: "Hierronort",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067544/Recurso_14_bgw8qd.png",
  },
  {
    name: "Aramis Servicios Mineros",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067546/Recurso_11_kje7w3.png",
  },
  {
    name: "Kajai Ingeniería",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067545/Recurso_16_bcdl1f.png",
  },
  {
    name: "Siates S.A.",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067542/Recurso_10_v90cgt.png",
  },
  {
    name: "CN Grupo",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067541/Recurso_13_hpb84w.png",
  },
  {
    name: "La Estrella Catering y Hotelería",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067541/Recurso_12_j5ioti.png",
  },
];

export default function Testimonios() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonios"
      className="py-32 md:py-48 px-4 relative overflow-hidden"
    >
      {/* Fondo: degradado + grilla técnica + glows verdes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-800 to-black" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-trebol-500/10 blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-trebol-700/10 blur-[120px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-6 block">
            Confianza
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Empresas que nos <span className="gradient-text">eligen</span>
          </h2>
        </motion.div>

        {/* Logos de clientes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-[2/1] rounded-3xl border border-white/[0.06] bg-dark-800/60 backdrop-blur-sm hover:border-trebol-500/30 hover:bg-dark-800/80 transition-all duration-500 overflow-hidden flex items-center justify-center"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-trebol-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <img
                src={getLogoUrl(client.logo)}
                alt={client.name}
                className="relative z-10 max-h-16 md:max-h-20 max-w-[85%] object-contain opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/240x120/0A0A0A/0D7C3E?text=${client.name}`;
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
