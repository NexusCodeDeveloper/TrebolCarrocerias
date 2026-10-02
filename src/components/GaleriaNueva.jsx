import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, useInView } from "framer-motion";
import "./GaleriaNueva.css";

/**
 * CONFIGURACIÓN DE IMÁGENES
 * Reemplaza este array con tus propias imágenes.
 * Cada objeto acepta:
 * - id: único (number|string)
 * - src: URL directa de la imagen (string)
 * - title: texto que aparece en overlay y lightbox
 * - size: "large" | "wide" | "small" (afecta ancho inicial en acordeón)
 * - logo: URL opcional de logo del proyecto
 * - logoClass: clase CSS extra para el logo (opcional)
 */
/** @type {{id: number, src: string, title: string, size: "large"|"wide"|"small", logo: string|null, logoClass?: string}[]} */
const galleryImages = [
  {
    id: 1,
    src: "/img/volcable-amarillo.jpg",
    title: "Volcable Amarillo",
    size: "large",
    logo: null,
    logoClass: "",
  },
  {
    id: 2,
    src: "/img/paquetero-azul.jpg",
    title: "Paquetero Azul",
    size: "wide",
    logo: null,
    logoClass: "",
  },
  {
    id: 3,
    src: "/img/volcable-blanco.jpg",
    title: "Volcable Blanco",
    size: "small",
    logo: null,
    logoClass: "",
  },
  {
    id: 4,
    src: "/img/semi-bajada-bonano.jpg",
    title: "Semi Bajada Bonano",
    size: "large",
    logo: null,
    logoClass: "",
  },
  {
    id: 5,
    src: "/img/paquetero-trasera.jpg",
    title: "Paquetero Trasera",
    size: "small",
    logo: null,
    logoClass: "",
  },
];

/* Config del efecto */
const PIN_SCROLL = 0.5; // × altura de viewport de scroll extra con la galería frenada
const PIN_TOP = 30; // px: altura a la que se frena la galería (0 = centrada; positivo = más abajo; negativo = más arriba)

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(
    /** @type {{id: number, src: string, title: string, size: "large"|"wide"|"small", logo: string|null, logoClass?: string}|null} */
    (null),
  );
  const [activeIndex, setActiveIndex] = useState(galleryImages.length - 1);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [areaHeight, setAreaHeight] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const areaRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const stageRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("lightbox-active");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("lightbox-active");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("lightbox-active");
    };
  }, [selectedImage]);

  /* prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (/** @type {MediaQueryListEvent} */ e) =>
      setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Altura del área de scroll (recalculada en resize) */
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      setAreaHeight(Math.round(vh * (1 + PIN_SCROLL)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Motor: frena la sección (pin) mientras el usuario abre/cierra imágenes */
  useEffect(() => {
    if (reducedMotion) return;

    const apply = () => {
      const area = areaRef.current;
      const stage = stageRef.current;
      if (!area || !stage) return;

      const viewportH = window.innerHeight;
      const areaH = area.offsetHeight;
      const pinStart =
        area.getBoundingClientRect().top + window.scrollY - PIN_TOP;
      const pinEnd = pinStart + areaH - viewportH;
      const scrollY = window.scrollY;

      /* Posición del stage: absolute → fixed → absolute (pin a mano) */
      if (scrollY < pinStart) {
        stage.style.position = "absolute";
        stage.style.top = "0px";
      } else if (scrollY <= pinEnd) {
        stage.style.position = "fixed";
        stage.style.top = `${PIN_TOP}px`;
      } else {
        stage.style.position = "absolute";
        stage.style.top = `${areaH - viewportH}px`;
      }
    };

    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    apply();
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, [reducedMotion]);

  /**
   * @param {number} index
   * @param {{id: number, src: string, title: string, size: "large"|"wide"|"small", logo: string|null, logoClass?: string}} img
   */
  const handleItemClick = (index, img) => {
    if (activeIndex === index) {
      setSelectedImage(img);
    } else {
      setActiveIndex(index);
    }
  };

  const accordion = (
    <div className="w-full px-4 md:px-6">
      <div className="gallery-accordion">
        {galleryImages.map((img, index) => {
          const isActive = activeIndex === index;
          const activeIsRight = activeIndex !== null && activeIndex > index;
          return (
            <div
              key={img.id}
              className={`gallery-accordion-item ${isActive ? "active" : ""}`}
              onClick={() => handleItemClick(index, img)}
            >
              {isActive ? (
                <>
                  <img src={img.src} alt={img.title} loading="lazy" />
                  <div className="gallery-overlay">
                    {img.logo && (
                      <img
                        src={img.logo}
                        alt="Logo Proyecto"
                        className={`gallery-project-logo ${img.logoClass || ""}`}
                      />
                    )}
                    <div className="gallery-text-content">
                      <p>{img.title}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="gallery-closed">
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    className="gallery-closed-img"
                  />
                  <div className="gallery-closed-bg" />
                  <div
                    className={`gallery-arrow ${activeIsRight ? "arrow-right" : "arrow-left"}`}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <div className="lightbox">
          <button
            className="close-btn"
            onClick={() => setSelectedImage(null)}
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            className="lightbox-main-img"
          />
          <p className="lightbox-caption">{selectedImage.title}</p>
          <img
            src="/img/volcable-amarillo.jpg"
            alt="Trébol Carrocerías"
            className="lightbox-watermark"
          />
        </div>
      )}
    </div>
  );

  return (
    <section
      id="galeria"
      className="relative overflow-hidden pt-32 md:pt-48 px-4"
    >
      {/* Background: negro con acento marca */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute -top-32 right-0 w-[30rem] h-[30rem] rounded-full bg-trebol-600/10 blur-[160px]" />
      <div className="absolute -bottom-32 left-0 w-[30rem] h-[30rem] rounded-full bg-trebol-700/10 blur-[160px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/20 to-transparent" />

      <div className="relative z-10 pt-16 md:pt-32" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div ref={headerRef} className="mb-12 md:mb-16">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block"
            >
              Nuestros Trabajos
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
            >
              Galería de
              <br />
              <span className="gradient-text">Proyectos</span>
            </motion.h2>
          </div>
        </div>
      </div>

      {reducedMotion ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="relative z-10 pb-16 md:pb-24"
        >
          {accordion}
        </motion.div>
      ) : (
        /* Pin: el área scrollea pero la galería queda frenada en pantalla */
        <div
          ref={areaRef}
          className="relative z-10"
          style={{ height: areaHeight || undefined }}
        >
          <div
            ref={stageRef}
            className="absolute inset-x-0 top-0 flex h-screen items-center"
          >
            {accordion}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
