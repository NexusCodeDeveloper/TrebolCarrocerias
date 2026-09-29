import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
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
  {
    id: 6,
    src: "/img/playo-andina.jpg",
    title: "Playo Andina",
    size: "wide",
    logo: null,
  },
  {
    id: 7,
    src: "/img/frame-hierronort.jpg",
    title: "Frame Norte",
    size: "large",
    logo: null,
  },
  {
    id: 8,
    src: "/img/paque-blanco.jpg",
    title: "Paquetero Blanco",
    size: "wide",
    logo: null,
  },
  {
    id: 9,
    src: "/img/signa-trebol.jpg",
    title: "Signa Trébol",
    size: "small",
    logo: null,
  },
  {
    id: 10,
    src: "/img/volcable-azul.jpg",
    title: "Volcable Azul",
    size: "large",
    logo: null,
  },
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedImage || isHovered || !isSectionVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedImage, isHovered, isSectionVisible]);

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

  return (
    <section id="galeria" className="gallery-section">
      <div className="gallery-container" ref={sectionRef}>
        <div className="gallery-header">
          <h2 className="gallery-title">
            Descubre <span>Nuestros Espacios</span>
          </h2>
        </div>

        <div
          className="gallery-accordion"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {galleryImages.map((img, index) => (
            <div
              key={img.id}
              className={`gallery-accordion-item ${activeIndex === index ? "active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setSelectedImage(img)}
            >
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
            </div>
          ))}
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
    </section>
  );
};

export default Gallery;
