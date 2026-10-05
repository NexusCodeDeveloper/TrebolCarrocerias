import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Truck,
  Package,
  Box,
  ArrowUpDown,
  Thermometer,
  Wrench,
  Check,
  Plus,
  X,
} from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import { getImageUrl, getLogoUrl } from "../lib/cloudinary";

/**
 * @typedef {Object} Product
 * @property {import("lucide-react").LucideIcon} icon
 * @property {string} [iconImage]
 * @property {string} title
 * @property {string} subtitle
 * @property {string} description
 * @property {string} image
 * @property {string} [imageMobile]
 * @property {string} stat
 * @property {string} statLabel
 * @property {string[]} features
 * @property {{ title: string, text: string }[]} [details]
 * @property {string[]} gallery
 */

/** @type {Product[]} */
const products = [
  {
    icon: ArrowUpDown,
    iconImage:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791065245/1_fmo1ht.png",
    title: "Volquetes",
    subtitle: "Granel",
    description:
      "Diseñados para el transporte de materiales a granel en sectores exigentes como minería, construcción y obras viales. ",
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791069145/1_fg5zvp.jpg",
    imageMobile:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791230469/1_lmkfsp.jpg",
    stat: "150+",
    statLabel: "Volquetes activos",
    features: [
      "Volquete 8m3/10 toneladas",
      "Pickups playo baranda volcable",
      "Pickups volquete 1.0 TN",
      "Volcado hidráulico de alta precisión",
    ],
    details: [
      {
        title: "Uso especializado",
        text: "Diseñados para el transporte de materiales a granel en sectores exigentes como minería, construcción y obras viales.",
      },
      {
        title: "Estructura reforzada",
        text: "Fabricados con acero de alta resistencia que soporta cargas pesadas y la fricción constante del trabajo duro.",
      },
      {
        title: "Volcado hidráulico de alta precisión",
        text: "Incorporan un sistema hidráulico que garantiza una descarga rápida y segura del material.",
      },
      {
        title: "Rendimiento duradero",
        text: "Construidos para responder con durabilidad y alta exigencia en trabajos pesados.",
      },
    ],
    gallery: [
      "https://res.cloudinary.com/da1hje3a1/video/upload/v1791077311/1_i30ret.mp4",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077311/1a_evxx4o.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077312/1c_diozol.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077311/1b_mba2uo.jpg",
    ],
  },
  {
    icon: ArrowUpDown,
    iconImage:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791065246/2_mwaaub.png",
    title: "Bateas Rockeras",
    subtitle: "Robustez",
    description:
      "Diseño robusto orientado a la extracción y traslado de rocas, áridos y minerales de gran tamaño.",
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791069144/2_fsys74.jpg",
    imageMobile:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791230469/2_puefla.jpg",
    stat: "150+",
    statLabel: "Volquetes activos",
    features: [
      "Capacidad: 17 m³ / 28 toneladas ",
      "Estructura: Chapa antidesgaste de alta resistencia (Hardox 450)",
      "Tratamiento superficial: Limpieza y desengrase con fosfatizante",
      "Base y Acabado: Primer bicomponente y esmalte poliuretánico de alta adherencia",
    ],
    details: [
      {
        title: "Especialización en material pesado",
        text: "Diseño robusto orientado a la extracción y traslado de rocas, áridos y minerales de gran tamaño. ",
      },
      {
        title: "Resistencia a la abrasión",
        text: "Construidas con placas de acero de alta abrasión para resistir el desgaste constante de los materiales pesados. ",
      },
      {
        title: "Absorción de impactos",
        text: "Incorporan geometrías reforzadas diseñadas específicamente para absorber el impacto continuo durante el proceso de carga.",
      },
      {
        title: "Descarga eficiente en terrenos difíciles",
        text: "Cuentan con una caja basculante que asegura una descarga ágil e integral, incluso en los terrenos más hostiles.",
      },
    ],
    gallery: [
      "https://res.cloudinary.com/da1hje3a1/video/upload/v1791077313/2_mlxf72.mp4",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077314/2c_sk6fyw.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077314/2a_vxx8z3.jpg",
      "https://res.cloudinary.com/da1hje3a1/video/upload/v1791077315/2d_fvqt6k.mp4",
    ],
  },
  {
    icon: Truck,
    iconImage:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791065246/3_ma9hvw.png",
    title: "Baranda Volcable",
    subtitle: "abatimiento rápido",
    description:
      "Apta para transportar una amplia variedad de cargas, incluyendo carga general, granos a granel o productos paletizados.",
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791069145/3_vayvix.jpg",
    imageMobile:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791230468/3_uwmi7z.jpg",
    stat: "500+",
    statLabel: "Unidades fabricadas",
    features: [
      "Transporta distintos tipos de carga",
      "Barandas de abatimiento rápido y seguro",
      "Cierres de traba mecánica con resortes",
      "Estructura liviana que aumenta la carga útil",
    ],
    details: [
      {
        title: "Versatilidad de carga",
        text: "Apta para transportar una amplia variedad de cargas incluyendo carga general, granos a granel o productos paletizados. ",
      },
      {
        title: "Apertura lateral ágil y segura",
        text: "Posee un sistema de herrajes y cierres herméticos que facilitan el abatimiento rápido de las barandas para operar con comodidad.",
      },
      {
        title: "Resortes de traba mecánica",
        text: "Absorbe vibraciones, permite desmontar las puertas con más facilidad, cierre más firme.",
      },
      {
        title: "Eficiencia en capacidad de carga",
        text: "Cuenta con una estructura liviana que optimiza el peso tara, maximizando el volumen de carga útil en cada viaje.",
      },
      {
        title: "Alta resistencia estructural",
        text: "Diseñada con una construcción robusta que tolera las exigencias del transporte sin comprometer la integridad del chasis.",
      },
    ],
    gallery: [
      "https://res.cloudinary.com/da1hje3a1/video/upload/v1791077316/3_hw5w6p.mp4",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077318/3d_fq961d.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077317/3b_xsbarx.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077318/3c_wuf5zg.jpg",
      "https://res.cloudinary.com/da1hje3a1/video/upload/v1791077317/3a_apkdh8.mp4",
    ],
  },
  {
    icon: Package,
    iconImage:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791065246/4_jzzvnj.png",
    title: "Térmicos",
    subtitle: "Temperatura",
    description:
      "Cuentan con un aislamiento de alta densidad y paneles monolíticos que conservan la cadena de frío.",
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791069144/4_nt5sqr.jpg",
    imageMobile:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791230468/4_lsul3j.jpg",
    stat: "200+",
    statLabel: "Entregas realizadas",
    features: [
      "Conserva la cadena de frío de productos perecederos",
      "Sellado hermético que reduce el consumo del equipo de frío",
      "Materiales higiénicos y de fácil limpieza",
      "Concesión oficial de Industrias Bonano",
    ],
    details: [
      {
        title: "Aislamiento térmico superior",
        text: "Cuentan con un aislamiento de alta densidad y paneles monolíticos que conservan la cadena de frío para alimentos, carnes y productos perecederos (frío, congelados, supercongelados y carnicero). ",
      },
      {
        title: "Eficiencia energética",
        text: "Incorporan sellados herméticos que optimizan el rendimiento y reducen el consumo del equipo de frío. ",
      },
      {
        title: "Revestimientos sanitarios",
        text: "Fabricados con materiales higiénicos de fácil limpieza para cumplir con las exigencias del transporte alimentario. ",
      },
      {
        title: "Calidad de fabricación",
        text: "Carrocerías desarrolladas comercializadas bajo la concesión oficial de Industrias Bonano.",
      },
    ],
    gallery: [
      "https://res.cloudinary.com/da1hje3a1/video/upload/v1791077319/4_sdstkt.mp4",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077320/4a_ihfcfj.jpg",
      "https://res.cloudinary.com/da1hje3a1/video/upload/v1791077321/4c_az2xdj.mp4",
      "https://res.cloudinary.com/da1hje3a1/video/upload/v1791077320/4b_egmeah.mp4",
    ],
  },
  {
    icon: Box,
    iconImage:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791065246/5_okt5xy.png",
    title: "Playos",
    subtitle: "Carga y descarga",
    description:
      "Diseño sin barandas laterales que facilita la maniobra de carga y descarga de maquinaria, contenedores o cargas sobredimensionadas.",
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/c_fill,w_2000,h_800/v1791069144/5_bu8asr.jpg",
    imageMobile:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791230469/5_ncunbm.jpg",
    stat: "300+",
    statLabel: "Proyectos completos",
    features: [
      "Playo con tanque",
      "Playo Corralonero",
      "Cuenta con puntos de anclaje para asegurar la carga",
      "Ideal para abastecimiento en terrenos de difícil acceso",
    ],
    details: [
      {
        title: "Plataforma plana despejada",
        text: "Diseño sin barandas laterales que facilita la maniobra de carga y descarga de maquinaria, contenedores o cargas sobredimensionadas. ",
      },
      {
        title: "Sistemas de sujeción estratégicos",
        text: "Equipado con puntos de anclaje distribuidos para fijar de manera firme y segura mercancías paletizadas de gran volumen. ",
      },
      {
        title: "Funcionalidad mixta con tanque",
        text: "La versión con tanque combina la plataforma plana tradicional con una cisterna integrada para agua o combustible, optimizando el espacio del chasis ",
      },
      {
        title: "Ideal para operaciones en zonas remotas",
        text: "Su configuración versátil resulta idónea para tareas de apoyo logístico y abastecimiento en frentes de obra o terrenos de difícil acceso.",
      },
    ],
    gallery: [
      "https://res.cloudinary.com/da1hje3a1/video/upload/v1791134514/WhatsApp_Video_2026-10-04_at_1.36.16_PM_1_q8bdsh.mp4",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077322/5a_vtllxa.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077323/5b_jzme83.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077323/5c_wrchhy.jpg",
    ],
  },

  {
    icon: Thermometer,
    iconImage:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791065246/6_g5zmvs.png",
    title: "Sider",
    subtitle: "protección y versatilidad",
    description:
      "Unidades desarrolladas a medida sobre un chasis de alta elasticidad, suspensión balanceada y terminaciones en pintura Airmix de máxima durabilidad. ",
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791069144/6_mv21px.jpg",
    imageMobile:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791230469/6_qyescf.jpg",
    stat: "80+",
    statLabel: "Flotas equipadas",
    features: [
      "Sider / Sider con lona",
      "Permiten una apertura completa de los laterales",
      "Facilita las maniobras con cargas paletizadas",
      "Protege la mercadería del agua, polvo y viento",
    ],
    details: [
      {
        title: "Alta capacidad y durabilidad para largas distancias",
        text: "Unidades desarrolladas a medida sobre un chasis de alta elasticidad, suspensión balanceada y terminaciones en pintura Airmix de máxima durabilidad.",
      },
      {
        title: "Sistema de lonas laterales correderas",
        text: "La versión Sider incorpora lonas de alta resistencia que se desplazan sobre rieles superiores, lo que permite una apertura completa de los laterales.",
      },
      {
        title: "Carga y descarga rápida de paletizados",
        text: "La apertura total de los costados optimiza los tiempos operativos y simplifica las maniobras en logística urbana e interurbana.",
      },
      {
        title: "Protección hermética y versatilidad",
        text: "Ofrece acceso ágil combinándolo con la protección integral de la mercadería frente al agua, el polvo y el viento",
      },
    ],
    gallery: [
      "https://res.cloudinary.com/da1hje3a1/video/upload/v1791077324/6_mlfyfz.mp4",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077290/6c_oo3qdf.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077289/6b_bad5st.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077324/6a_tl2mr2.jpg",
    ],
  },
  {
    icon: Wrench,
    iconImage:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791065246/7_ymz3hp.png",
    title: "Paqueteros",
    subtitle: "transporte seguro",
    description:
      "Diseñados como furgones cerrados para el transporte seguro de paquetería, encomiendas y productos secos, resguardando la carga del clima y robos.",
    image:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791069145/7_ldcol6.jpg",
    imageMobile:
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791230469/7_ogmxgl.jpg",
    stat: "100%",
    statLabel: "Homologados",
    features: [
      "Protege la carga del clima",
      "Evita el desplazamiento de la mercadería",
      "Permiten asegurar y organizar los paquetes",
      "Portones de apertura ágil para facilitar la carga y descarga",
    ],
    details: [
      {
        title: "Estructura cerrada y protegida",
        text: "Diseñados como furgones cerrados para el transporte seguro de paquetería, encomiendas y productos secos, resguardando la carga del clima y robos.",
      },
      {
        title: "Seguridad en el piso",
        text: "Equipados con piso antideslizante para evitar el desplazamiento no deseado de la mercadería durante el trayecto.",
      },
      {
        title: "Sujeción interna eficiente",
        text: "Cuentan con rieles de sujeción interna para asegurar y organizar de forma óptima los paquetes dentro de la unidad. ",
      },
      {
        title: "Accesibilidad rápida",
        text: "Disponen de portones traseros (o laterales) de ágil apertura para agilizar las tareas de carga y descarga.",
      },
    ],
    gallery: [
      "https://res.cloudinary.com/da1hje3a1/video/upload/v1791134514/WhatsApp_Video_2026-10-04_at_1.36.16_PM_zueptr.mp4",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077310/7c_wtdmrk.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791134412/7b-OK.jpg_thpfa5.jpg",
      "https://res.cloudinary.com/da1hje3a1/image/upload/v1791134412/7a-OK.jpg_wr7igk.jpg",
    ],
  },
];

/* Config del efecto */
const SEGMENTS_SCROLL = 2; // × altura de viewport por transición (más alto = más lento)
const SEGMENT_HOLD = 0.45; // % del tramo con la card quieta para leer antes de transicionar
const FINAL_SCALE = 0.92; // escala del panel tapado
const FINAL_DIM = 0.35; // opacidad del overlay negro del panel tapado
const FINAL_OFFSET_Y = -30; // px, desplazamiento vertical del panel tapado
const PRODUCTOS_BG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791065116/fdo_trebol_f0lntj.png";

export default function Productos() {
  const areaRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const stageRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const panelsRef = useRef(/** @type {(HTMLDivElement | null)[]} */ ([]));
  const imgRefs = useRef(/** @type {(HTMLImageElement | null)[]} */ ([]));
  const dimRefs = useRef(/** @type {(HTMLDivElement | null)[]} */ ([]));
  const textRefs = useRef(/** @type {(HTMLDivElement | null)[]} */ ([]));
  const styleCache = useRef(/** @type {(string | undefined)[]} */ ([]));
  const jumpRef = useRef(/** @type {((p: number) => void) | null} */ (null));
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [areaHeight, setAreaHeight] = useState(0);
  const [selectedLogo, setSelectedLogo] = useState(
    /** @type {number | null} */ (null),
  );
  /* Mobile: productos en flujo normal (sin efecto de apilado) */
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );
  const flow = reducedMotion || isMobile;

  /* prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (/** @type {MediaQueryListEvent} */ e) =>
      setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Mobile: listener para rotación/resize */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (/** @type {MediaQueryListEvent} */ e) =>
      setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Altura del área de scroll (recalculada en resize). En mobile el tramo es más corto. */
  useEffect(() => {
    const update = () => {
      /* En mobile el flujo no usa el área de stack: evitamos re-renders en resize */
      if (window.matchMedia("(max-width: 767px)").matches) return;
      const vh = window.innerHeight;
      setAreaHeight(
        Math.round(vh * (1 + (products.length - 1) * SEGMENTS_SCROLL)),
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Mobile: imán de a un producto por deslizamiento (en PC no hace nada) */
  useEffect(() => {
    if (flow) return;

    let timer = /** @type {number | null} */ (null);
    let rafId = /** @type {number | null} */ (null);
    let touching = false;

    const cancelAnim = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };

    const animateTo = (/** @type {number} */ top) => {
      const startY = window.scrollY;
      const dist = top - startY;
      if (Math.abs(dist) < 1) return;
      const dur = Math.min(500, Math.max(220, Math.abs(dist) * 0.45));
      const t0 = performance.now();
      const ease = (/** @type {number} */ t) => 1 - Math.pow(1 - t, 3);
      const tick = (/** @type {number} */ now) => {
        const t = Math.min(1, (now - t0) / dur);
        /* behavior instant: evita que el scroll suave del CSS pelee con la animación */
        window.scrollTo({
          top: startY + dist * ease(t),
          left: 0,
          behavior: "instant",
        });
        rafId = t < 1 ? requestAnimationFrame(tick) : null;
      };
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (timer !== null) clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = null;
        if (rafId !== null) return;
        if (touching) return; // nunca acomodar con el dedo apoyado
        if (window.innerWidth >= 768) return;
        const area = areaRef.current;
        if (!area) return;
        const vh = window.innerHeight;
        const range = area.offsetHeight - vh;
        if (range <= 0) return;
        const pinStart = area.getBoundingClientRect().top + window.scrollY;
        const pinEnd = pinStart + range;
        const y = window.scrollY;
        if (y < pinStart - 2 || y > pinEnd + 2) return;
        const p = Math.min(1, Math.max(0, (y - pinStart) / range));
        const global = p * (products.length - 1);
        const nearest = Math.round(global);
        if (Math.abs(global - nearest) < 0.03) return;
        animateTo(pinStart + (nearest / (products.length - 1)) * range);
      }, 150);
    };

    const onTouchStart = () => {
      touching = true;
      cancelAnim();
    };
    const onTouchEnd = () => {
      touching = false;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      cancelAnim();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [flow]);

  /* Salto directo al producto desde los logos del header */
  const scrollToProduct = (/** @type {number} */ index) => {
    if (flow) {
      document
        .getElementById(`producto-${index}`)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }
    const area = areaRef.current;
    if (!area) return;
    const range = area.offsetHeight - window.innerHeight;
    if (range <= 0) return;
    const pinStart = area.getBoundingClientRect().top + window.scrollY;
    const p = products.length > 1 ? index / (products.length - 1) : 0;
    /* Salto seco: sin animación de scroll ni transición entre paneles */
    window.scrollTo({ top: pinStart + p * range, behavior: "instant" });
    jumpRef.current?.(p);
  };

  /* Motor del efecto: stage + paneles calculados a mano (sin sticky) */
  useEffect(() => {
    if (flow) return;
    const LERP = 0.5; // suavizado mínimo de notchs: pegado al scroll, sin retraso visible
    let rafId = /** @type {number | null} */ (null);
    let current = 0; // progreso suavizado
    let target = 0; // progreso real del scroll

    const getTarget = () => {
      const area = areaRef.current;
      if (!area) return 0;
      const viewportH = window.innerHeight;
      const areaH = area.offsetHeight;
      const range = areaH - viewportH;
      if (range <= 0) return 0;
      const pinStart = area.getBoundingClientRect().top + window.scrollY;
      return Math.min(1, Math.max(0, (window.scrollY - pinStart) / range));
    };

    const apply = (/** @type {number} */ p) => {
      const area = areaRef.current;
      const stage = stageRef.current;
      if (!area || !stage) return;

      const viewportH = window.innerHeight;
      const areaH = area.offsetHeight;
      const pinStart = area.getBoundingClientRect().top + window.scrollY;
      const pinEnd = pinStart + areaH - viewportH;
      const scrollY = window.scrollY;

      /* Posición del stage: absolute → fixed → absolute (sticky a mano) */
      if (scrollY < pinStart) {
        stage.style.position = "absolute";
        stage.style.top = "0px";
      } else if (scrollY <= pinEnd) {
        stage.style.position = "fixed";
        stage.style.top = "0px";
      } else {
        stage.style.position = "absolute";
        stage.style.top = `${areaH - viewportH}px`;
      }

      /* Progreso global 0..N-1 (con zona muerta de lectura al inicio de cada tramo) */
      const global = p * (products.length - 1);
      const floor = Math.floor(global);
      const raw = global - floor;
      const frac = Math.max(0, (raw - SEGMENT_HOLD) / (1 - SEGMENT_HOLD));

      /* Transformaciones por panel (solo transform/opacity = compositor, sin repintado) */
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        const img = imgRefs.current[i];
        const dim = dimRefs.current[i];
        const text = textRefs.current[i];
        let transform;
        let dimOpacity;
        let imgTransform;
        let textStyle;
        if (i < floor) {
          transform = `translateY(${FINAL_OFFSET_Y}px) scale(${FINAL_SCALE})`;
          dimOpacity = FINAL_DIM;
          imgTransform = "scale(1)";
          textStyle = "opacity:0;transform:translateY(0px)";
        } else if (i === floor) {
          transform = `translateY(${FINAL_OFFSET_Y * frac}px) scale(${
            1 - (1 - FINAL_SCALE) * frac
          })`;
          dimOpacity = (FINAL_DIM * frac).toFixed(3);
          imgTransform = `scale(${1 - 0.1 * frac})`;
          textStyle = `opacity:${(1 - 0.7 * frac).toFixed(
            3,
          )};transform:translateY(${(-24 * frac).toFixed(2)}px)`;
        } else if (i === floor + 1) {
          transform = `translateY(${(1 - frac) * 100}%)`;
          dimOpacity = "0";
          imgTransform = `scale(${1 + 0.12 * (1 - frac)})`;
          textStyle = `opacity:${Math.min(1, frac * 1.5).toFixed(
            3,
          )};transform:translateY(${((1 - frac) * 40).toFixed(2)}px)`;
        } else {
          transform = "translateY(100%)";
          dimOpacity = "0";
          imgTransform = "scale(1)";
          textStyle = "opacity:0;transform:translateY(0px)";
        }
        const key = `${transform}|${dimOpacity}|${imgTransform}|${textStyle}`;
        if (styleCache.current[i] === key) return;
        styleCache.current[i] = key;
        panel.style.transform = transform;
        if (dim) dim.style.opacity = String(dimOpacity);
        if (img) img.style.transform = imgTransform;
        if (text) text.style.cssText = textStyle;
      });
    };

    const loop = () => {
      current += (target - current) * LERP;
      const done = Math.abs(target - current) < 0.0005;
      if (done) current = target;
      apply(current);
      if (done) {
        rafId = null;
      } else {
        rafId = requestAnimationFrame(loop);
      }
    };

    const startLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const onScroll = () => {
      if (!active) return;
      target = getTarget();
      startLoop();
    };
    const onResize = () => {
      if (!active) return;
      target = getTarget();
      startLoop();
    };

    /* Salto seco: sincroniza el motor sin lerp (usado por los logos) */
    jumpRef.current = (p) => {
      target = p;
      current = p;
      apply(current);
    };

    /* Solo trabaja cuando el área está cerca/en pantalla:
       fuera de Productos no corre ningún rAF (scroll más fluido en el resto) */
    let active = false;
    const area = areaRef.current;
    const obs = area
      ? new IntersectionObserver(
          ([entry]) => {
            active = entry.isIntersecting;
            if (active) onScroll();
          },
          { rootMargin: "50% 0px 50% 0px" },
        )
      : null;
    if (area) obs?.observe(area);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      jumpRef.current = null;
      obs?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [flow]);

  return (
    <section
      id="productos"
      className="relative overflow-hidden pt-15 pb-0 md:pb-0 md:pt-20"
    >
      {/* Background: imagen con patrón de trébol (en mobile se suaviza con blur suave) */}
      <div
        className="absolute inset-x-0 top-0 h-dvh scale-105 bg-cover bg-center blur-sm max-md:h-lvh md:scale-100 md:blur-0"
        style={{ backgroundImage: `url(${getImageUrl(PRODUCTOS_BG)})` }}
      />
      <div className="absolute inset-x-0 top-0 h-dvh bg-black/40 max-md:h-lvh" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trebol-500/40 to-transparent" />

      {/* Header - scroll normal */}
      <div className="relative z-10 pt-16 pb-8 px-4 max-w-7xl mx-auto">
        <div ref={headerRef}>
          {/* <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-trebol-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block"
          >
            Nuestros Productos
          </motion.span> */}
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-heading font-medium text-4xl md:text-7xl lg:text-6xl  tracking-tight text-black mb-12"
          >
            Soluciones que
            <br />
            <span className="text-white font-bold">mueven al transporte</span>
          </motion.h2>
          {/* Accesos rápidos: logos clickeables de los 7 productos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:gap-4 md:justify-center md:gap-4 lg:gap-6 lg:overflow-visible lg:pb-0 xl:justify-between [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product, i) => (
              <button
                key={product.title}
                type="button"
                onClick={() => {
                  setSelectedLogo(i);
                  scrollToProduct(i);
                }}
                aria-label={`Ver ${product.title}`}
                aria-pressed={selectedLogo === i}
                title={product.title}
                className={`group shrink-0 rounded-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trebol-400 [perspective:1000px] ${
                  selectedLogo === i
                    ? "ring-1 ring-white/20 shadow-[0_0_45px_rgba(255,255,255,0.20)]"
                    : "hover:-translate-y-1"
                }`}
              >
                {/* Gira en hover o cuando queda seleccionado */}
                <span
                  className={`relative grid h-20 w-20 place-items-center transition-transform duration-500 [transform-style:preserve-3d] sm:h-16 sm:w-16 lg:h-24 lg:w-24 xl:h-36 xl:w-36 ${
                    selectedLogo === i
                      ? "[transform:rotateY(180deg)]"
                      : "group-hover:[transform:rotateY(180deg)]"
                  }`}
                >
                  {/* Frente: logo */}
                  <img
                    src={getLogoUrl(product.iconImage ?? "")}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-contain [backface-visibility:hidden]"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Dorso: nombre del producto (mantiene el blanco y el tamaño) */}
                  <span className="absolute inset-0 grid place-items-center overflow-hidden rounded-2xl bg-white p-2 text-center font-heading text-[10px] font-bold uppercase leading-tight tracking-tight text-trebol-800 [backface-visibility:hidden] [transform:rotateY(180deg)] lg:text-[15px]">
                    {product.title}
                  </span>
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {flow ? (
        /* Mobile / reduced motion: flujo normal, un producto debajo del otro */
        <div className="max-md:px-3 max-md:space-y-4 max-md:py-4">
          {products.map((product, i) => (
            <ProductPanel
              key={product.title}
              product={product}
              index={i}
              mode="flow"
              isMobile={isMobile}
            />
          ))}
        </div>
      ) : (
        /* Stacking cards: scroll-area → stage → paneles */
        <div
          id="scroll-area"
          ref={areaRef}
          className="relative bg-black"
          style={{ height: areaHeight || undefined }}
        >
          <div
            ref={stageRef}
            className="absolute inset-x-0 top-0 h-dvh overflow-hidden"
          >
            {products.map((product, i) => (
              <ProductPanel
                key={product.title}
                product={product}
                index={i}
                mode="stack"
                panelRef={(el) => {
                  panelsRef.current[i] = el;
                }}
                imgRef={(el) => {
                  imgRefs.current[i] = el;
                }}
                dimRef={(el) => {
                  dimRefs.current[i] = el;
                }}
                textRef={(el) => {
                  textRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * @param {Object} props
 * @param {Product} props.product
 * @param {number} props.index
 * @param {"flow" | "stack"} props.mode
 * @param {boolean} [props.isMobile]
 * @param {(el: HTMLDivElement | null) => void} [props.panelRef]
 * @param {(el: HTMLImageElement | null) => void} [props.imgRef]
 * @param {(el: HTMLDivElement | null) => void} [props.dimRef]
 * @param {(el: HTMLDivElement | null) => void} [props.textRef]
 */
function ProductPanel({
  product,
  index,
  mode,
  isMobile = false,
  panelRef,
  imgRef,
  dimRef,
  textRef,
}) {
  const ref = useRef(/** @type {HTMLDivElement | null} */ (null));
  const [detailsOpen, setDetailsOpen] = useState(false);

  /* Cerrar el panel de características con Escape */
  useEffect(() => {
    if (!detailsOpen) return;
    const onKey = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === "Escape") setDetailsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detailsOpen]);

  return (
    <div
      id={mode === "flow" ? `producto-${index}` : undefined}
      ref={(el) => {
        ref.current = el;
        if (panelRef) panelRef(el);
      }}
      className={
        mode === "flow"
          ? "relative min-h-lvh w-full overflow-hidden max-md:rounded-3xl"
          : "absolute inset-0 overflow-hidden"
      }
      style={{ zIndex: index + 1 }}
    >
      {/* Imagen de fondo full-bleed */}
      <img
        ref={(el) => {
          if (imgRef) imgRef(el);
        }}
        src={getImageUrl(
          isMobile && product.imageMobile ? product.imageMobile : product.image,
        )}
        alt={product.title}
        className="absolute inset-0 w-full h-full "
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.currentTarget.src = `https://placehold.co/1600x900/0A0A0A/0D7C3E?text=${product.title}`;
        }}
      />

      {/* Overlay opaco: nunca menos de 0.55; más fuerte del lado del texto */}
      {/*  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/55 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/70 lg:to-black/55" /> */}

      {/* Overlay sutil de lectura (solo mobile) */}
      <div className="pointer-events-none absolute inset-0 max-md:bg-gradient-to-b max-md:from-black/30 max-md:via-black/20 max-md:to-black/5" />

      {/* Overlay de oscurecimiento (opacity animada por JS, sin filter/repintado) */}
      <div
        ref={(el) => {
          if (dimRef) dimRef(el);
        }}
        className="absolute inset-0 bg-black"
        style={{ opacity: 0 }}
      />

      {/* Contenido: texto + carrusel */}
      <div
        className={`relative z-10 flex flex-col justify-between max-md:gap-12 px-6 pb-8 pt-28 md:justify-center md:gap-8 md:px-12 md:pt-0 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pb-0 lg:px-16 xl:gap-12 xl:px-28 ${
          mode === "flow" ? "min-h-lvh" : "h-full"
        }`}
      >
        <div className="relative max-w-xl md:max-w-2xl lg:max-w-xl">
          <div
            ref={(el) => {
              if (textRef) textRef(el);
            }}
          >
            {/* Eyebrow: punto + línea decorativa */}
            <div className="flex items-center gap-4 mb-5 md:mb-6">
              <div className="w-3 h-3 rounded-full bg-trebol-500" />
              <div className="h-px flex-1 bg-gradient-to-r from-trebol-500/50 to-transparent" />
            </div>
            {/* Badge con ícono */}
            <div className="flex items-center gap-3 mb-2 md:mb-4">
              {product.iconImage ? (
                <img
                  src={getLogoUrl(product.iconImage)}
                  alt=""
                  aria-hidden="true"
                  className="w-12 h-12 md:w-18 md:h-18 "
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <product.icon className="w-5 h-5 md:w-6 md:h-6 text-trebol-400" />
              )}
              <span className="text-gray-400 text-xs md:text-sm tracking-[0.2em] uppercase">
                {product.subtitle}
              </span>
            </div>
            <h3 className="font-heading text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-4 md:mb-6">
              {product.title}
            </h3>
            <p className="text-gray-200 font-semibold md:text-xl leading-relaxed tracking-tight mb-6 md:mb-8 max-w-lg">
              {product.description}
            </p>
            {/* Características */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-7 md:mb-10">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-trebol-500  mt-0.5 shrink-0" />
                  <span className="text-white text-sm md:text-base leading-relaxed tracking-tight">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            {/* Estadística destacada / Características + Cotizar */}
            <div className="flex flex-wrap items-center gap-6">
              {product.details?.length ? (
                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  aria-expanded={detailsOpen}
                  className="inline-flex items-center gap-2 rounded-full border border-trebol-500/40 bg-trebol-500/50 px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-bold text-white tracking-tight transition-colors hover:border-trebol-500/70 hover:bg-trebol-500/20"
                >
                  <Plus className="h-4 w-4" />
                  Características
                </button>
              ) : (
                <div className="flex items-end gap-3 md:gap-4">
                  <span className="font-heading text-4xl md:text-6xl font-bold text-trebol-400 tracking-tight leading-none">
                    {product.stat}
                  </span>
                  <span className="text-gray-400 text-xs md:text-sm tracking-[0.15em] uppercase pb-1">
                    {product.statLabel}
                  </span>
                </div>
              )}
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-trebol-500/40 bg-trebol-500/50 px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-bold text-white tracking-tight transition-colors hover:border-trebol-500/70 hover:bg-trebol-500/20"
              >
                Cotizar
              </a>
            </div>
          </div>

          {/* Panel de características: se despliega hacia arriba sobre el texto */}
          <AnimatePresence>
            {detailsOpen && product.details?.length ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-x-0 bottom-0 z-20 overflow-hidden rounded-2xl border border-trebol-500/30 bg-black shadow-elevated"
                role="dialog"
                aria-label={`Características de ${product.title}`}
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
                  <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-trebol-400">
                    Características
                  </span>
                  <button
                    type="button"
                    onClick={() => setDetailsOpen(false)}
                    aria-label="Cerrar características"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-gray-300 transition hover:border-trebol-500 hover:bg-trebol-500/20 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <ul className="max-h-[55vh] space-y-4 overflow-y-auto px-5 py-4">
                  {product.details.map((detail) => (
                    <li key={detail.title}>
                      <p className="text-sm font-semibold text-trebol-300">
                        {detail.title}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {detail.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        {/* Carrusel: arriba y centrado en mobile/tablet, columna derecha en desktop */}
        <div className="order-first mx-auto w-80 max-w-full shrink-0 md:w-[26rem] lg:order-none lg:mx-0 lg:w-96 xl:w-[36rem]">
          <ImageCarousel images={product.gallery} alt={product.title} />
        </div>
      </div>
    </div>
  );
}
