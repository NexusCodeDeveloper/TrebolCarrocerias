import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { getImageUrl } from "../lib/cloudinary";

const DESTACADAS_BG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791085360/Recurso_44_jelhfu.png";
const CARD_IMG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077318/3d_fq961d.jpg";

const cards = [
  {
    front: "Inclinómetros",
    back: 'Somos representante oficial en el en el norte del país, de Inclinómetros ARBIP, "Descargas seguras”.',
    image: CARD_IMG,
  },
  {
    front: "kit hidráulico",
    back: "provision de kit hidráulico para bateas",
    image: CARD_IMG,
  },
  {
    front: "Repuestos",
    back: "Repuestos",
    image: CARD_IMG,
  },
  {
    front: "Elementos de izaje",
    back: "Elementos de izaje",
    image: CARD_IMG,
  },
];

/**
 * Tarjeta con volteo 3D: hover en PC, tap en mobile.
 * @param {{ card: { front: string, back: string, image: string } }} props
 */
function FlipCard({ card }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((v) => !v);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${card.front} — ver más`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className="group relative h-64 w-full cursor-pointer [perspective:1200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trebol-400 md:h-72"
    >
      <div
        className={`flip-anim relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        } group-hover:[transform:rotateY(180deg)]`}
      >
        {/* Frente: título sobre la foto */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-elevated [backface-visibility:hidden]">
          <img
            src={getImageUrl(card.image)}
            alt={card.front}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
          <h3 className="absolute inset-x-0 bottom-0 p-6 font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
            {card.front}
          </h3>
        </div>

        {/* Dorso: misma foto con blur + descripción */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-elevated [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img
            src={getImageUrl(card.image)}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/60" />
          <p className="relative grid h-full place-items-center p-6 text-center text-sm font-semibold leading-relaxed tracking-tight text-white md:text-base">
            {card.back}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Destacadas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="destacadas"
      className="relative overflow-hidden py-32 md:py-20 px-4"
    >
      {/* Background: imagen con patrón */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${getImageUrl(DESTACADAS_BG)})` }}
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight text-black leading-[1.05]">
            Repuestos /<span className=" font-bold text-white"> otros</span>
          </h2>
        </motion.div>

        {/* Tarjetas: 2 columnas en PC, 1 en mobile */}
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          {cards.map((card) => (
            <FlipCard key={card.front} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
