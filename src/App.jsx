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
  return (
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
  );
}
