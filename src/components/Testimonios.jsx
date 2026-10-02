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
  {
    name: "andina",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868053/Recurso_19_yumvu9.png",
  },
  {
    name: "Gala ko",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868053/Recurso_20_votbqo.png",
  },
  {
    name: "smc",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868053/Recurso_26_w1odtm.png",
  },
  {
    name: "Control Andina",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868053/Recurso_21_wbffza.png",
  },
  {
    name: "RQ",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868053/Recurso_25_kii98f.png",
  },
  {
    name: "Cronec SRL",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868053/Recurso_18_mzpfxa.png",
  },
  {
    name: "Shamana",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868053/Recurso_27_ilok36.png",
  },
  {
    name: "Imeca",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868053/Recurso_23_ayxkmr.png",
  },
  {
    name: "Salta Perforaciones",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868054/Recurso_28_pwgc1a.png",
  },
  {
    name: "Geo Mix",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868053/Recurso_24_qks6jy.png",
  },
  {
    name: "Municipalidad",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868054/Recurso_29_kgzboa.png",
  },
  {
    name: "Noa Generación",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868053/Recurso_22_hymouz.png",
  },
  {
    name: "JMG",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868054/Recurso_30_qdfjda.png",
  },
  {
    name: "Mei",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868054/Recurso_32_ljzpgi.png",
  },
  {
    name: "Nubicom",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868054/Recurso_31_ajanbo.png",
  },
  {
    name: "Saltapor",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868055/Recurso_33_fqjxab.png",
  },
  {
    name: "Salta Municipalidad",
    logo: "https://res.cloudinary.com/da1hje3a1/image/upload/v1790868056/Recurso_34_n5xcvw.png",
  },
];

export default function Testimonios() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonios"
      className="relative overflow-hidden py-32 md:py-48 px-4"
    >
      {/* Background: verde esmeralda brillante - confianza/éxito */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031d12] via-[#06331e] to-[#031d12]" />
      <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-emerald-500/20 blur-[160px]" />
      <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-emerald-600/20 blur-[160px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <span className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Confianza
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Empresas que nos
            <br />
            <span className="gradient-text">eligen</span>
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
