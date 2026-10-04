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
      className="relative overflow-hidden py-32 md:py-25 px-4"
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
          <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl  tracking-tight text-white leading-[1.05]">
            Empresas que nos
            <br />
            <span className="gradient-text font-bold">eligen</span>
          </h2>
        </motion.div>

        {/* Logos de clientes: 2 por fila en mobile, 5 en PC */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-10">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="group flex items-center justify-center"
            >
              <img
                src={getLogoUrl(client.logo)}
                alt={client.name}
                className="max-h-10 w-auto max-w-[85%] object-contain opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 lg:max-h-12"
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
