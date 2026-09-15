import { motion } from "framer-motion";
import {
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, XIcon } from "./Icons";
import { getImageUrl } from "../lib/cloudinary";

const socialLinks = [
  { name: "Facebook", href: "", icon: FacebookIcon },
  { name: "Instagram", href: "", icon: InstagramIcon },
  { name: "X", href: "", icon: XIcon },
];

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
  { name: "Proceso", href: "#como-lo-hacemos" },
  { name: "Normas", href: "#normas" },
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

      {/* Contacto */}
      <div id="contacto" className="relative py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto rounded-[2rem] p-px bg-gradient-to-b from-white/10 via-white/[0.04] to-transparent"
          >
            <div className="rounded-[calc(2rem-1px)] bg-dark-900/90 backdrop-blur-sm px-6 py-14 md:px-16 md:py-20 text-center">
              <span className="text-trebol-400 text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-5 block">
                Contacto
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

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {/* Click to call */}
            <motion.a
              href="tel:+543875021303"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
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
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
              href="mailto:ventas@trebolcarrocerias.com.ar"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
                  ventas@trebolcarrocerias.com.ar
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-trebol-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </motion.a>

            {/* Address / Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
                  Ruta Nacional 51 - Km 6,5 — El Encón, Salta
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  Lun - Vie: 8:00 – 18:00
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer content */}
      <div className="relative border-t border-white/[0.06] py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6 flex items-center justify-center gap-6 md:flex-col md:items-start md:justify-start">
              <img
                src={getImageUrl(
                  "https://res.cloudinary.com/da1hje3a1/image/upload/v1789067587/Recurso_5_ihwvie.png",
                )}
                alt="Trébol Carrocerías"
                className="h-16 md:h-40 w-auto"
              />
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href || undefined}
                    target={social.href ? "_blank" : undefined}
                    rel={social.href ? "noopener noreferrer" : undefined}
                    aria-label={social.name}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-dark-700 text-gray-500 transition-all duration-300 hover:border-trebol-500/30 hover:bg-trebol-500/10 hover:text-trebol-400"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-trebol-500 to-transparent mx-auto md:mx-0" />
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
                  href="mailto:ventas@trebolcarrocerias.com.ar"
                  className="text-gray-500 hover:text-trebol-400 transition-colors text-sm tracking-tight break-all"
                >
                  ventas@trebolcarrocerias.com.ar
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
                  Ruta Nacional 51 - Km 6,5 - El Encón, Salta
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
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="text-gray-600 text-sm tracking-tight text-center">
            <p>
              &copy; {new Date().getFullYear()} Trébol Carrocerías. Todos los
              derechos reservados.
            </p>
            <p>Desarrollo Web by NexusCode</p>
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
    </footer>
  );
}
