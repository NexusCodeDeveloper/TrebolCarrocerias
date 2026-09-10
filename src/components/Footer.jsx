import { motion } from "framer-motion";
import {
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { WhatsAppIcon } from "./Icons";
import { getImageUrl } from "../lib/cloudinary";

const productLinks = [
  { name: "Baranda Volcable", href: "#productos" },
  { name: "Paqueteros", href: "#productos" },
  { name: "Playos", href: "#productos" },
  { name: "Volquetes", href: "#productos" },
  { name: "Térmicos", href: "#productos" },
  { name: "Extensión Chasis", href: "#productos" },
];

const companyLinks = [
  { name: "Quiénes Somos", href: "#quienes-somos" },
  { name: "Galería", href: "#galeria" },
  { name: "Clientes", href: "#testimonios" },
  { name: "Contacto", href: "#contacto" },
];

const MAPS_URL =
  "https://maps.google.com/?q=Ruta+Nacional+51+Km+6+El+Enc%C3%B3n+Salta";
const WHATSAPP_URL =
  "https://wa.me/543875021303?text=Hola,%20me%20interesa%20una%20cotización%20para%20una%20carrocería.";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Fondo: degradado + grilla técnica + glow verde */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-black to-black" />
      <div
        className="absolute inset-x-0 top-0 h-[40rem]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 70% at 50% 0%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 70% at 50% 0%, black, transparent)",
        }}
      />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-trebol-500/10 blur-[140px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/20 to-transparent" />

      {/* CTA band */}
      <div className="relative py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2rem] p-px bg-gradient-to-b from-white/10 via-white/[0.04] to-transparent"
          >
            <div className="rounded-[calc(2rem-1px)] bg-dark-900/90 backdrop-blur-sm px-6 py-14 md:px-16 md:py-20 text-center">
              <span className="text-trebol-400 text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-5 block">
                Cotizá tu proyecto
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                ¿Listo para optimizar
                <br />
                tu <span className="gradient-text">flota de transporte</span>?
              </h2>
              <p className="text-gray-400 text-lg md:text-xl tracking-tight mb-10 max-w-xl mx-auto">
                Cotizaciones personalizadas, asesoramiento gratuito y soluciones
                a medida.
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
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto border border-white/10 hover:border-trebol-500/30 bg-dark-700 text-white font-heading font-bold px-10 py-4 rounded-full text-lg tracking-tight transition-all flex items-center justify-center gap-3"
                >
                  <WhatsAppIcon className="w-5 h-5 text-trebol-400" />
                  WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer content */}
      <div className="relative border-t border-white/[0.06] py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src={getImageUrl(
                "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067587/Recurso_5_ihwvie.png",
              )}
              alt="Trébol Carrocerías"
              className="h-16 md:h-20 w-auto mb-6"
            />
            <p className="text-gray-400 text-sm leading-relaxed tracking-tight mb-6">
              Fabricantes de carrocerías para camiones. Miembro CAPEMISA,
              homologación CNTSV, cumplimiento AITA.
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-trebol-500 to-transparent" />
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-white tracking-tight mb-3">
              Productos
            </h4>
            <div className="h-px w-8 bg-gradient-to-r from-trebol-500 to-transparent mb-6" />
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group relative inline-block text-gray-500 hover:text-trebol-400 transition-colors text-sm tracking-tight"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-trebol-400 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-white tracking-tight mb-3">
              Empresa
            </h4>
            <div className="h-px w-8 bg-gradient-to-r from-trebol-500 to-transparent mb-6" />
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group relative inline-block text-gray-500 hover:text-trebol-400 transition-colors text-sm tracking-tight"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-trebol-400 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-heading font-bold text-white tracking-tight mb-3">
              Contacto
            </h4>
            <div className="h-px w-8 bg-gradient-to-r from-trebol-500 to-transparent mb-6" />
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-trebol-400 flex-shrink-0" />
                <a
                  href="tel:+543875021303"
                  className="text-gray-500 hover:text-trebol-400 transition-colors text-sm tracking-tight"
                >
                  (0387) 155 021 303
                </a>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="w-4 h-4 text-trebol-400 flex-shrink-0" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-trebol-400 transition-colors text-sm tracking-tight"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-trebol-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:administracion@trebolcarrocerias.com.ar"
                  className="text-gray-500 hover:text-trebol-400 transition-colors text-sm tracking-tight break-all"
                >
                  administracion@trebolcarrocerias.com.ar
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-trebol-400 flex-shrink-0 mt-0.5" />
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-trebol-400 transition-colors text-sm tracking-tight"
                >
                  Ruta 51 Km 6½ — El Encón, Salta (4407)
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-trebol-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-500 text-sm tracking-tight">
                  Lun - Vie: 8:00 – 18:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.06] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm tracking-tight">
            &copy; {new Date().getFullYear()} Trébol Carrocerías. Todos los
            derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-5">
              {companyLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-trebol-400 transition-colors text-xs tracking-tight"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Volver arriba"
              className="w-10 h-10 rounded-full bg-dark-700 border border-white/[0.08] flex items-center justify-center hover:bg-trebol-500 hover:border-trebol-500 transition-all"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
