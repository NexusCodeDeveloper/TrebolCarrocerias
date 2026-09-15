import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuienesSomos from "./components/QuienesSomos";
import Productos from "./components/Productos";
import Galeria from "./components/Galeria";
import ComoLoHacemos from "./components/ComoLoHacemos";
import Normas from "./components/Normas";
import Testimonios from "./components/Testimonios";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <QuienesSomos />
      <Productos />
      <Galeria />
      <ComoLoHacemos />
      <Normas />
      <Testimonios />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
