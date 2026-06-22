import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react'

export default function Contacto() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contacto" className="py-32 md:py-48 px-4 relative overflow-hidden">
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
          <span className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-6 block">Contacto</span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Encontranos en <span className="gradient-text">Salta</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Visitanos en nuestras instalaciones o contactanos por teléfono, email o WhatsApp.
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3635.5!2d-65.5!3d-24.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sEl+Enc%C3%B3n%2C+Salta!5e0!3m2!1ses!2sar!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.5) brightness(0.6)' }}
            allowFullScreen=""
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
              <div className="text-gray-500 text-xs tracking-[0.15em] uppercase mb-1">Llamanos</div>
              <div className="text-white font-heading font-bold tracking-tight">(0387) 155 021 303</div>
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
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-green-400"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div className="flex-1">
              <div className="text-green-400 text-xs tracking-[0.15em] uppercase mb-1">WhatsApp</div>
              <div className="text-white font-heading font-bold tracking-tight">Chateá con nosotros</div>
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
              <div className="text-gray-500 text-xs tracking-[0.15em] uppercase mb-1">Email</div>
              <div className="text-white font-heading font-bold text-xs tracking-tight truncate">admin@trebolcarrocerias.com.ar</div>
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
              <div className="text-gray-500 text-xs tracking-[0.15em] uppercase mb-1">Ubicación</div>
              <div className="text-white font-heading font-bold text-xs tracking-tight">Ruta 51 Km 6½ — El Encón, Salta</div>
              <div className="text-gray-500 text-xs mt-1">Lun - Vie: 8:00 – 18:00</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
