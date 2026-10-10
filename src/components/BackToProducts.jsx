import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Botón flotante "Volver a productos".
 * Se muestra mientras alguna sección marcada con `data-back-products`
 * está en la franja de lectura; oculto al volver arriba o salir.
 */
export default function BackToProducts() {
  const [show, setShow] = useState(false);
  const [isMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const targets = document.querySelectorAll("[data-back-products]");
    if (!targets.length) return;

    const visible = new Set();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setShow(visible.size > 0);
      },
      { rootMargin: "0px 0px -80% 0px" },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  const back = () => {
    const section = document.getElementById("productos");
    if (!section) return;
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY,
      behavior: isMobile ? "instant" : "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={back}
      aria-label="Volver a productos"
      className="fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/70 text-white shadow-elevated backdrop-blur transition-colors hover:bg-trebol-600 md:bottom-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:inline-flex md:h-auto md:w-auto md:gap-2 md:px-4 md:py-2.5"
    >
      <ArrowUp className="h-5 w-5 md:h-4 md:w-4" />
      <span className="hidden text-xs font-bold tracking-tight md:inline">
        Volver a productos
      </span>
    </button>
  );
}
