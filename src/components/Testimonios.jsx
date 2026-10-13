import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

import hidrotec from "../assets/clientes/01-hidrotec.png";
import serminca from "../assets/clientes/02-serminca.png";
import hierronort from "../assets/clientes/03-hierronort.png";
import aramis from "../assets/clientes/04-aramis.png";
import kajai from "../assets/clientes/05-kajai.png";
import siates from "../assets/clientes/06-siates.png";
import cnGrupo from "../assets/clientes/07-cn-grupo.png";
import laEstrella from "../assets/clientes/08-la-estrella.png";
import andina from "../assets/clientes/09-andina.png";
import galaKo from "../assets/clientes/10-gala-ko.png";
import smc from "../assets/clientes/11-smc.png";
import controlAndina from "../assets/clientes/12-control-andina.png";
import rq from "../assets/clientes/13-rq.png";
import cronec from "../assets/clientes/14-cronec.png";
import shamana from "../assets/clientes/15-shamana.png";
import imeca from "../assets/clientes/16-imeca.png";
import saltaPerforaciones from "../assets/clientes/17-salta-perforaciones.png";
import geoMix from "../assets/clientes/18-geo-mix.png";
import municipalidad from "../assets/clientes/19-municipalidad.png";
import noaGeneracion from "../assets/clientes/20-noa-generacion.png";
import jmg from "../assets/clientes/21-jmg.png";
import mei from "../assets/clientes/22-mei.png";
import nubicom from "../assets/clientes/23-nubicom.png";
import saltapor from "../assets/clientes/24-saltapor.png";
import saltaMunicipalidad from "../assets/clientes/25-salta-municipalidad.png";

/** @typedef {{ name: string, logo: string }} Client */

/** @type {Client[]} */
const clients = [
  { name: "Hidrotec", logo: hidrotec },
  { name: "Serminca Servicios Mineros", logo: serminca },
  { name: "Hierronort", logo: hierronort },
  { name: "Aramis Servicios Mineros", logo: aramis },
  { name: "Kajai Ingeniería", logo: kajai },
  { name: "Siates S.A.", logo: siates },
  { name: "CN Grupo", logo: cnGrupo },
  { name: "La Estrella Catering y Hotelería", logo: laEstrella },
  { name: "andina", logo: andina },
  { name: "Gala ko", logo: galaKo },
  { name: "smc", logo: smc },
  { name: "Control Andina", logo: controlAndina },
  { name: "RQ", logo: rq },
  { name: "Cronec SRL", logo: cronec },
  { name: "Shamana", logo: shamana },
  { name: "Imeca", logo: imeca },
  { name: "Salta Perforaciones", logo: saltaPerforaciones },
  { name: "Geo Mix", logo: geoMix },
  { name: "Municipalidad", logo: municipalidad },
  { name: "Noa Generación", logo: noaGeneracion },
  { name: "JMG", logo: jmg },
  { name: "Mei", logo: mei },
  { name: "Nubicom", logo: nubicom },
  { name: "Saltapor", logo: saltapor },
  { name: "Salta Municipalidad", logo: saltaMunicipalidad },
];

export default function Testimonios() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );

  return (
    <section
      id="testimonios"
      className="relative overflow-hidden pt-12 pb-12 md:pt-32 md:pb-32 px-4"
    >
      {/* Background: verde esmeralda brillante - confianza/éxito */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031d12] via-[#06331e] to-[#031d12]" />
      <div className="hidden md:block absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-emerald-500/20 blur-[160px]" />
      <div className="hidden md:block absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-emerald-600/20 blur-[160px]" />
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

        {/* Logos de clientes: 2 por fila en mobile, 5 en PC.
            Se muestran tal cual vienen (lienzos cuadrados con su margen
            transparente, que genera la separación entre ellos). */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0 lg:gap-y-0">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={isMobile ? false : { opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="group flex items-center justify-center"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-[110px] w-[110px] object-contain opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 sm:h-24 sm:w-24 lg:h-40 lg:w-40"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
