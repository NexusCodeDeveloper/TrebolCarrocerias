import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const barsOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.55, 0.85]);

  return (
    <section id="inicio" ref={sectionRef} className="relative h-[110vh]">
      {/* Video background */}
      <motion.div
        style={{ scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          poster="https://placehold.co/1920x1080/0A0A0A/0D7C3E?text=Trébol+Carrocería"
        >
          <source
            src="https://www.pexels.com/es-es/download/video/4079657/"
            type="video/mp4"
          />
        </video>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black"
        />
        {/* Cinematic bars */}
        <motion.div
          style={{ opacity: barsOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 left-0 right-0 h-[12vh] bg-gradient-to-b from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[12vh] bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Content: bloque izquierdo como referencia */}
      <div className="relative h-full flex items-center px-6 lg:px-10 z-10">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div style={{ y: textY }} className="max-w-3xl" ref={textRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="mb-6 md:mb-8"
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur border border-white/15 text-white text-xs font-medium tracking-[0.3em] uppercase rounded-full">
                <span className="w-2 h-2 rounded-full bg-trebol-200" />
                Fabricantes de Carrocerías
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.95] mb-6 md:mb-8"
            >
              CARROCERÍAS
              <br />
              <span className="gradient-text">TREBOL</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-xl md:max-w-2xl leading-relaxed mb-10 md:mb-12 tracking-tight"
            >
              Soluciones de alta calidad para el transporte de carga. Miembro
              CAPEMISA, homologación CNTSV.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-trebol-500 hover:bg-trebol-600 text-white font-heading font-bold px-10 py-4 rounded-full text-lg tracking-tight shadow-glow-sm hover:shadow-glow transition-all flex items-center justify-center gap-3"
              >
                Cotizar Ahora
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#productos"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border border-white/10 hover:border-trebol-500/30 bg-dark-700 text-white font-heading font-bold px-10 py-4 rounded-full text-lg tracking-tight transition-all flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5 text-trebol-400" />
                Ver Productos
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator: línea vertical izquierda como referencia */}
        <motion.div>
          <motion.div
            animate={{ scaleY: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-16 origin-top bg-gradient-to-b from-trebol-400 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
