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
const galleryImages = [
  {
    id: 1,
    src: "/img/volcable-amarillo.jpg",
    title: "Volcable Amarillo",
    size: "large",
    logo: null,
  },
  {
    id: 2,
    src: "/img/paquetero-azul.jpg",
    title: "Paquetero Azul",
    size: "wide",
    logo: null,
  },
  {
    id: 3,
    src: "/img/volcable-blanco.jpg",
    title: "Volcable Blanco",
    size: "small",
    logo: null,
  },
  {
    id: 4,
    src: "/img/semi-bajada-bonano.jpg",
    title: "Semi Bajada Bonano",
    size: "large",
    logo: null,
  },
  {
    id: 5,
    src: "/img/paquetero-trasera.jpg",
    title: "Paquetero Trasera",
    size: "small",
    logo: null,
  },
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(galleryImages.length - 1);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
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

  const handleItemClick = (index, img) => {
    if (activeIndex === index) {
      setSelectedImage(img);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section id="galeria" className="bg-black">
      <div className="pt-32 pb-12 md:pt-48 md:pb-16" ref={sectionRef}>
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
                    <div className={`gallery-arrow ${activeIsRight ? "arrow-right" : "arrow-left"}`}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
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
      </div>
    </section>
  );
};

export default Gallery;
