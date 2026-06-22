import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, ArrowDown, Play } from 'lucide-react'

const phrases = ['Baranda Volcable', 'Paqueteros', 'Playos', 'Volquetes', 'Térmicos', 'Extensión Chasis']

export default function Hero() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const isInView = useInView(textRef)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -80])
  const textBlur = useTransform(scrollYProgress, [0, 0.2], [0, 8])
  const barsOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.55, 0.85])

  return (
    <section id="inicio" ref={sectionRef} className="relative h-[110vh]">
      {/* Video background */}
      <motion.div style={{ scale: videoScale, opacity: videoOpacity }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://placehold.co/1920x1080/0A0A0A/0D7C3E?text=Trébol+Carrocerías"
        >
          <source src="https://assets.mixkit.co/videos/4892/4892-720.mp4" type="video/mp4" />
        </video>
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black" />
        {/* Cinematic bars */}
        <motion.div style={{ opacity: barsOpacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[12vh] bg-gradient-to-b from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[12vh] bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-6 z-10">
        <motion.div style={{ y: textY, filter: useTransform(textBlur, (v) => `blur(${v}px)`) }} className="text-center max-w-5xl" ref={textRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-trebol-500/10 border border-trebol-500/20 text-trebol-400 text-sm font-medium tracking-[0.2em] uppercase">
              Fabricantes de Carrocerías
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9] mb-8"
          >
            CARROCERÍAS<br />
            <span className="gradient-text">TREBOL</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 tracking-tight"
          >
            Soluciones de alta calidad para el transporte de carga. Member CAPEMISA, homologación CNTSV.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-xs tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5 text-trebol-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
