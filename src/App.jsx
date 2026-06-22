import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Productos from './components/Productos'
import Galeria from './components/Galeria'
import Tecnologia from './components/Tecnologia'
import Testimonios from './components/Testimonios'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Productos />
      <Galeria />
      <Tecnologia />
      <Testimonios />
      <Contacto />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
