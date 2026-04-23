(function(){
  "use strict";

  const getLang = () => (localStorage.getItem("idioma") || "es").toLowerCase();
  
  const TEXTOS = {
    delta: {
      es: {
        h1: [
          "El impacto en los humedales del Delta del Paraná",
          "Qué hacemos en Renacer",
          "Objetivos del proyecto",
          "Acciones principales",
          "Cómo podés ayudar"
        ],
        p: [
          "Los incendios en el Delta del Paraná afectaron humedales, pastizales y bosques ribereños. La pérdida de vegetación altera la calidad del agua, la biodiversidad y la capacidad natural de amortiguar inundaciones y sequías.",
          "Trabajamos con restauración ecológica aplicada: reforestación con especies nativas, recuperación de bordes de cursos de agua, creación de “islas” de vegetación y monitoreo para asegurar la supervivencia.",
          "Recuperar cobertura vegetal nativa, estabilizar suelos, mejorar la conectividad del hábitat y fortalecer la resiliencia del humedal ante futuros eventos.",
          "Producción y plantación de nativas, control de invasoras, cercado/protección de áreas sensibles, y seguimiento con indicadores de regeneración.",
          "Sumate como voluntario, difundí el proyecto o colaborá con una donación para financiar plantines, mantenimiento y monitoreo."
        ]
      },
      en: {
        h1: [
          "The impact on the Paraná Delta wetlands",
          "What we do at Renacer",
          "Project goals",
          "Key actions",
          "How you can help"
        ],
        p: [
          "Wildfires in the Paraná Delta affected wetlands, grasslands and riparian forests. Vegetation loss impacts water quality, biodiversity and the Delta’s natural ability to buffer floods and droughts.",
          "We work with applied ecological restoration: native reforestation, riverbank recovery, creation of vegetation “islands”, and monitoring to ensure long-term survival.",
          "Restore native vegetation cover, stabilize soils, improve habitat connectivity, and strengthen wetland resilience to future events.",
          "Native seedling production and planting, invasive control, protection of sensitive areas, and follow-up using regeneration indicators.",
          "Join as a volunteer, share the project, or donate to fund seedlings, maintenance and monitoring."
        ]
      }
    },

    cordoba: {
      es: {
        h1: [
          "Incendios y degradación del bosque serrano",
          "Qué hacemos en Renacer",
          "Objetivos del proyecto",
          "Acciones principales",
          "Cómo podés ayudar"
        ],
        p: [
          "Las sierras de Córdoba sufren incendios recurrentes y pérdida de cobertura vegetal. Esto afecta cuencas, aumenta erosión y reduce la biodiversidad del bosque nativo.",
          "Restauramos áreas priorizadas con especies nativas, controlamos erosión, y trabajamos con comunidades para prevención y recuperación post-incendio.",
          "Recuperar el bosque serrano, proteger cuencas y suelos, y mejorar la resiliencia del ecosistema ante futuros incendios.",
          "Plantación de nativas, manejo de escorrentías, estabilización de suelos, monitoreo de regeneración y educación ambiental local.",
          "Podés colaborar como voluntario, participando en jornadas de plantación, o donando para sostener viveros, logística y monitoreo."
        ]
      },
      en: {
        h1: [
          "Wildfires and degradation of mountain forests",
          "What we do at Renacer",
          "Project goals",
          "Key actions",
          "How you can help"
        ],
        p: [
          "Córdoba’s hills face recurrent wildfires and native vegetation loss. This impacts watersheds, increases erosion, and reduces biodiversity in native forests.",
          "We restore priority areas with native species, control erosion, and work with local communities on prevention and post-fire recovery.",
          "Recover mountain forests, protect watersheds and soils, and improve ecosystem resilience to future wildfires.",
          "Native planting, runoff management, soil stabilization, regeneration monitoring, and local environmental education.",
          "You can volunteer in planting days or donate to support nurseries, logistics and monitoring."
        ]
      }
    },

    patagonia: {
      es: {
        h1: [
          "Restauración post-incendio en bosques andino-patagónicos",
          "Qué hacemos en Renacer",
          "Objetivos del proyecto",
          "Acciones principales",
          "Cómo podés ayudar"
        ],
        p: [
          "En Neuquén, Río Negro y Chubut, los incendios afectaron bosques andino-patagónicos y áreas de estepa. La pérdida de cobertura incrementa erosión, deteriora cuencas y retrasa la regeneración natural.",
          "Trabajamos con restauración y prevención: reforestación en zonas priorizadas, protección de suelos y cuencas, y acompañamiento comunitario para reducir riesgos.",
          "Acelerar la recuperación del bosque, reducir erosión, proteger cuencas y fortalecer corredores biológicos.",
          "Producción de plantines, plantación asistida, control de erosión, cierres temporales de áreas frágiles y monitoreo de regeneración.",
          "Sumate con voluntariado, difusión o donaciones para financiar plantines, mantenimiento y monitoreo."
        ]
      },
      en: {
        h1: [
          "Post-wildfire restoration in Andean-Patagonian forests",
          "What we do at Renacer",
          "Project goals",
          "Key actions",
          "How you can help"
        ],
        p: [
          "In Neuquén, Río Negro and Chubut, wildfires affected Andean-Patagonian forests and steppe areas. Vegetation loss increases erosion, damages watersheds and slows natural regeneration.",
          "We work on restoration and prevention: reforestation in priority zones, soil and watershed protection, and community engagement to reduce risk.",
          "Speed up forest recovery, reduce erosion, protect watersheds, and strengthen biological corridors.",
          "Seedling production, assisted planting, erosion control, temporary protection of fragile areas, and regeneration monitoring.",
          "Join through volunteering, sharing the project, or donating to fund seedlings, maintenance and monitoring."
        ]
      }
    },

    corrientes: {
      es: {
        h1: [
          "El valor de los Esteros y los humedales",
          "Qué hacemos en Renacer",
          "Objetivos del proyecto",
          "Acciones principales",
          "Cómo podés ayudar"
        ],
        p: [
          "Corrientes alberga algunos de los humedales más importantes del país, como el sistema de los Esteros del Iberá. Estos ambientes regulan el agua, amortiguan inundaciones, recargan acuíferos y sostienen una biodiversidad única. Son, además, una barrera natural frente a la erosión y un gran reservorio de carbono.",
          "Trabajamos con restauración ecológica aplicada y fortalecimiento de conectividad: reforestación con especies nativas en áreas priorizadas, recuperación de bordes de cursos de agua, creación de “islas” de vegetación y monitoreo para asegurar la supervivencia.",
          "Restaurar ambientes post-incendio, fortalecer la biodiversidad y mejorar la resiliencia del humedal.",
          "Plantación con nativas, recuperación de márgenes, control de invasoras y seguimiento de indicadores ecológicos.",
          "Podés ayudar sumándote como voluntario, difundiendo el proyecto o donando para financiar plantines, mantenimiento y monitoreo."
        ]
      },
      en: {
        h1: [
          "The value of the Iberá wetlands",
          "What we do at Renacer",
          "Project goals",
          "Key actions",
          "How you can help"
        ],
        p: [
          "Corrientes hosts some of Argentina’s most important wetlands, such as the Iberá system. These environments regulate water, buffer floods, recharge aquifers and sustain unique biodiversity. They are also a natural barrier against erosion and a major carbon reservoir.",
          "We work with applied ecological restoration and connectivity strengthening: native reforestation in priority areas, recovery of river edges, creation of vegetation “islands”, and monitoring to ensure survival.",
          "Restore post-wildfire habitats, strengthen biodiversity, and improve wetland resilience.",
          "Native planting, riverbank recovery, invasive control, and tracking ecological indicators.",
          "You can help by volunteering, sharing the project, or donating to fund seedlings, maintenance and monitoring."
        ]
      }
    },

    lapampa: {
      es: {
        h1: [
          "Recuperación del caldenal pampeano",
          "Qué hacemos en Renacer",
          "Objetivos del proyecto",
          "Acciones principales",
          "Cómo podés ayudar"
        ],
        p: [
          "El caldenal es un ecosistema clave del centro del país. La degradación por cambios de uso del suelo, incendios y presión productiva reduce la cobertura vegetal, aumenta erosión y afecta biodiversidad.",
          "Restauramos con especies nativas, manejamos la regeneración y fortalecemos corredores biológicos para recuperar el monte pampeano.",
          "Recuperar cobertura del caldenal, mejorar suelos y aumentar conectividad para favorecer la biodiversidad.",
          "Plantación de nativas, protección de renovales, manejo de regeneración, y monitoreo de avance del proyecto.",
          "Sumate con voluntariado o donaciones para financiar plantines, mantenimiento y monitoreo."
        ]
      },
      en: {
        h1: [
          "Recovery of the Pampas caldenal",
          "What we do at Renacer",
          "Project goals",
          "Key actions",
          "How you can help"
        ],
        p: [
          "The caldenal is a key ecosystem in central Argentina. Degradation from land-use change, wildfires and production pressure reduces vegetation cover, increases erosion and affects biodiversity.",
          "We restore with native species, manage regeneration and strengthen biological corridors to recover the Pampas woodland.",
          "Recover caldenal cover, improve soils, and increase connectivity to support biodiversity.",
          "Native planting, protection of young regrowth, regeneration management, and monitoring of project progress.",
          "Join through volunteering or donations to fund seedlings, maintenance and monitoring."
        ]
      }
    }
  };

  function aplicarTraduccion() {
    const lang = getLang();
    const proyecto = (document.body.dataset.proyecto || "").toLowerCase();
    if (!TEXTOS[proyecto]) return;

    const t = TEXTOS[proyecto][lang] || TEXTOS[proyecto].es;

    const scope = document.querySelector("main") || document.body;
    const h1s = scope.querySelectorAll("h1");
    const ps  = scope.querySelectorAll("p");

    if (t.h1 && t.h1.length) {
      t.h1.forEach((txt, i) => { if (h1s[i] && txt) h1s[i].textContent = txt; });
    }
    if (t.p && t.p.length) {
      t.p.forEach((txt, i) => { if (ps[i] && txt) ps[i].textContent = txt; });
    }

    document.documentElement.setAttribute("lang", lang);
  }

  function wireBotonesIdioma() {
    const botones = document.querySelectorAll("[data-lang]");
    if (!botones.length) return;

    botones.forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = (btn.getAttribute("data-lang") || "es").toLowerCase();
        localStorage.setItem("idioma", lang);
        window.dispatchEvent(new CustomEvent("idioma:cambio", { detail: { lang } }));
        // no preventDefault
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    wireBotonesIdioma();
    aplicarTraduccion();
  });

  window.addEventListener("idioma:cambio", aplicarTraduccion);
})();
