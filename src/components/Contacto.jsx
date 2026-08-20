import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "./Icons";

export default function Contacto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contacto"
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
            Contacto
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Encontranos en <span className="gradient-text">Salta</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Visitanos en nuestras instalaciones o contactanos por teléfono,
            email o WhatsApp.
          </p>
        </motion.div>

        {/* Map full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl overflow-hidden border border-white/[0.06] h-[50vh] md:h-[60vh] mb-12"
        >
          <iframe
            src="https://maps.google.com/maps?q=Ruta+Nacional+51+Km+6+El+Enc%C3%B3n+Salta&z=13&output=embed"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter:
                "invert(90%) hue-rotate(180deg) saturate(0.5) brightness(0.6)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Trébol Carrocerías"
          />
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Click to call */}
          <motion.a
            href="tel:+543875021303"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group flex items-center gap-4 p-6 rounded-3xl border border-white/[0.06] bg-dark-800 hover:border-trebol-500/30 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-2xl bg-trebol-500/10 flex items-center justify-center group-hover:bg-trebol-500/20 transition-colors flex-shrink-0">
              <Phone className="w-6 h-6 text-trebol-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-500 text-xs tracking-[0.15em] uppercase mb-1">
                Llamanos
              </div>
              <div className="text-white font-heading font-bold tracking-tight">
                (0387) 155 021 303
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-trebol-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/543875021303?text=Hola,%20me%20interesa%20una%20cotización%20para%20una%20carrocería."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group flex items-center gap-4 p-6 rounded-3xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/40 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <WhatsAppIcon className="w-6 h-6 fill-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-green-400 text-xs tracking-[0.15em] uppercase mb-1">
                WhatsApp
              </div>
              <div className="text-white font-heading font-bold tracking-tight">
                Chateá con nosotros
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-green-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:administracion@trebolcarrocerias.com.ar"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group flex items-center gap-4 p-6 rounded-3xl border border-white/[0.06] bg-dark-800 hover:border-trebol-500/30 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-2xl bg-trebol-500/10 flex items-center justify-center group-hover:bg-trebol-500/20 transition-colors flex-shrink-0">
              <Mail className="w-6 h-6 text-trebol-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-500 text-xs tracking-[0.15em] uppercase mb-1">
                Email
              </div>
              <div className="text-white font-heading font-bold text-xs tracking-tight truncate">
                admin@trebolcarrocerias.com.ar
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-trebol-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </motion.a>

          {/* Address / Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4 p-6 rounded-3xl border border-white/[0.06] bg-dark-800"
          >
            <div className="w-14 h-14 rounded-2xl bg-trebol-500/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-trebol-400" />
            </div>
            <div>
              <div className="text-gray-500 text-xs tracking-[0.15em] uppercase mb-1">
                Ubicación
              </div>
              <div className="text-white font-heading font-bold text-xs tracking-tight">
                Ruta 51 Km 6½ — El Encón, Salta
              </div>
              <div className="text-gray-500 text-xs mt-1">Lun - Vie: 8:00 – 18:00</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
