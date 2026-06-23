import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Productos", href: "#productos" },
  { name: "Galería", href: "#galeria" },
  { name: "Tecnología", href: "#tecnologia" },
  { name: "Clientes", href: "#testimonios" },
  { name: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="#inicio"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <img
              src="/img/logo-trebol.png"
              alt="Trébol Carrocerías"
              className="h-10 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold text-white tracking-tight">
                TREBOL
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-trebol-400 font-medium -mt-1">
                Carrocerías
              </span>
            </div>
          </motion.a>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-tight relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-trebol-500 group-hover:w-3/4 transition-all duration-300" />
              </motion.a>
            ))}
            <motion.a
              href="#contacto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 flex items-center gap-2 bg-trebol-500 hover:bg-trebol-600 px-6 py-2.5 rounded-full font-bold text-white text-sm tracking-tight shadow-glow-sm hover:shadow-glow transition-all"
            >
              Cotizar
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Abrir menú"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X /> : <Menu />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all text-lg tracking-tight"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block mt-6 bg-trebol-500 px-6 py-4 rounded-xl font-bold text-white text-center tracking-tight"
              >
                Cotizar Ahora
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
