import { motion } from 'framer-motion'
import { ArrowUp, Phone, Mail, MapPin } from 'lucide-react'

const productLinks = [
  { name: 'Baranda Volcable', href: '#productos' },
  { name: 'Paqueteros', href: '#productos' },
  { name: 'Playos', href: '#productos' },
  { name: 'Volquetes', href: '#productos' },
  { name: 'Térmicos', href: '#productos' },
  { name: 'Extensión Chasis', href: '#productos' },
]

const companyLinks = [
  { name: 'Nuestra Empresa', href: '#tecnologia' },
  { name: 'Galería', href: '#galeria' },
  { name: 'Clientes', href: '#testimonios' },
  { name: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-dark-800 border-t border-white/[0.06]">
      {/* CTA band */}
      <div className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              ¿Listo para optimizar<br />tu <span className="gradient-text">flota de transporte</span>?
            </h2>
            <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto">
              Cotizaciones personalizadas, asesoramiento gratuito y soluciones a medida.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-trebol-500 hover:bg-trebol-600 text-white font-heading font-bold px-10 py-4 rounded-full text-lg tracking-tight shadow-glow-sm hover:shadow-glow transition-all flex items-center justify-center gap-3"
              >
                Solicitar cotización
                <ArrowUp className="w-5 h-5 -rotate-90" />
              </motion.a>
              <motion.a
                href="https://wa.me/543875021303?text=Hola,%20me%20interesa%20una%20cotización%20para%20una%20carrocería."
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border border-white/10 hover:border-trebol-500/30 bg-dark-700 text-white font-heading font-bold px-10 py-4 rounded-full text-lg tracking-tight transition-all flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-trebol-400"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer content */}
      <div className="border-t border-white/[0.06] py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-trebol-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xl">T</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-white tracking-tight">TREBOL</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-trebol-400 font-medium -mt-1">Carrocerías</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Fabricantes de carrocerías para camiones. Member CAPEMISA, homologación CNTSV, cumplimiento AITA.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-white tracking-tight mb-6">Productos</h4>
            <ul className="space-y-3">
              {productLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-trebol-400 transition-colors text-sm">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-white tracking-tight mb-6">Empresa</h4>
            <ul className="space-y-3">
              {companyLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-trebol-400 transition-colors text-sm">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white tracking-tight mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-trebol-400 flex-shrink-0" />
                <a href="tel:+543875021303" className="text-gray-500 hover:text-trebol-400 transition-colors text-sm">(0387) 155 021 303</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-trebol-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:administracion@trebolcarrocerias.com.ar" className="text-gray-500 hover:text-trebol-400 transition-colors text-sm break-all">administracion@trebolcarrocerias.com.ar</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-trebol-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-500 text-sm">Ruta 51 Km 6½ — El Encón, Salta (4407)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; 2025 Trébol Carrocerías. Todos los derechos reservados.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-dark-700 border border-white/[0.08] flex items-center justify-center hover:bg-trebol-500 hover:border-trebol-500 transition-all"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
