import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  { name: "Biotec", color: "from-blue-500 to-cyan-400" },
  { name: "Tripoli", color: "from-purple-500 to-pink-400" },
  { name: "Hidrotec", color: "from-amber-500 to-orange-400" },
  { name: "Serminca", color: "from-trebol-500 to-emerald-400" },
  { name: "Andina", color: "from-red-500 to-rose-400" },
  { name: "Hierronort", color: "from-sky-500 to-blue-400" },
];

export default function Testimonios() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonios"
      className="py-32 md:py-48 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dark-700" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/20 to-transparent" />

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

        {/* Client logos grid - large */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-[2/1] rounded-3xl border border-white/[0.06] bg-dark-800 hover:border-trebol-500/30 transition-all duration-500 overflow-hidden flex items-center justify-center"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-trebol-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Logo placeholder - replace with real logos */}
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${client.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}
              >
                <span className="text-white font-heading font-bold text-3xl">
                  {client.name[0]}
                </span>
              </div>

              {/* Client name */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="text-gray-500 text-sm font-heading font-bold tracking-tight">
                  {client.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Replace instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-600 text-sm mt-10 tracking-tight"
        ></motion.p>
      </div>
    </section>
  );
}
