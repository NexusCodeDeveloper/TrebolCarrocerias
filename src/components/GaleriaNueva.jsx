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
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);

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
      <div
        className="mx-auto max-w-7xl px-4 pt-32 pb-12 md:pt-48 md:pb-16"
        ref={sectionRef}
      >
        <span className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
          Nuestros Trabajos
        </span>
        <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
          Galería de
          <br />
          <span className="gradient-text">Proyectos</span>
        </h2>

        <div className="gallery-accordion">
          {galleryImages.map((img, index) => (
            <div
              key={img.id}
              className={`gallery-accordion-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleItemClick(index, img)}
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
