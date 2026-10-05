import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuienesSomos from "./components/QuienesSomos";
import Productos from "./components/Productos";
import ComoLoHacemos from "./components/ComoLoHacemos";
import Normas from "./components/Normas";
import Destacadas from "./components/Destacadas";
import Testimonios from "./components/Testimonios";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
/* import Gallery from "./components/GaleriaNueva";
import { lazy, Suspense } from "react"; */

/* const Gallery = lazy(() =>
  import("./components/GaleriaNueva").then((m) => ({ default: m.Gallery })),
); */

export default function App() {
  /* En mobile no hay animaciones (los transform de framer-motion se aplican al instante) */
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (/** @type {MediaQueryListEvent} */ e) =>
      setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <MotionConfig
      reducedMotion={isMobile ? "always" : "user"}
      skipAnimations={isMobile}
    >
      <div className="min-h-screen bg-black">
        <Navbar />
        <Hero />
        <QuienesSomos />
        <Productos />
        {/* <Galeria /> */}
        {/* <Suspense fallback={<div style={{ minHeight: "50vh" }} />}>
          <Gallery />
        </Suspense> */}
        <ComoLoHacemos />
        <Normas />
        <Destacadas />
        <Testimonios />
        <Footer />
        <WhatsAppButton />
      </div>
    </MotionConfig>
  );
}
