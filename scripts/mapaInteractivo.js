const RUTA_SVG = "../svg/country.svg";
const provinciasRojas = new Set(["ARE", "ARW", "ARX", "ARR", "ARQ", "ARU", "ARL"]);
const MENSAJE_SIN_PROYECTO = {
  es: "Aún no hay un proyecto, estamos trabajando en eso!",
  en: "There is no project yet — we're working on it!"
};

const getLang = () => localStorage.getItem("idioma") || "es";

const PROVINCIAS_I18N_EN = {
  ARA: {
    nombre: "Salta",
    problematica:
      "Expansion of the agricultural frontier and degradation of native forests: biodiversity loss, habitat fragmentation and soil erosion."
  },
  ARB: {
    nombre: "Buenos Aires",
    problematica:
      "Loss of native vegetation cover and urban/rural pressure on green corridors, causing soil degradation and reduced biodiversity."
  },
  ARC: {
    nombre: "Buenos Aires City",
    problematica:
      "Urban heat island and seasonal water stress impacting street trees and environmental quality in dense areas."
  },
  ARD: {
    nombre: "San Luis",
    problematica:
      "Wildfires in mountainous areas and localized desertification due to degradation of native woodland and land-use change."
  },

  ARE: {
    nombre: "Entre Ríos",
    resumen:
      "Paraná Delta restoration: native reforestation, recovery of riparian forests and wetlands, and post-wildfire actions with local participation."
  },

  ARF: {
    nombre: "La Rioja",
    problematica:
      "Degradation due to overgrazing and vegetation loss, increasing erosion, reducing water infiltration and affecting biodiversity."
  },
  ARG: {
    nombre: "Santiago del Estero",
    problematica:
      "Deforestation of the Dry Chaco and forest fragmentation, causing loss of ecosystem services and critical habitats."
  },
  ARH: {
    nombre: "Chaco",
    problematica:
      "Pressure on the Chaco woodland (fires and clearing) degrading soils and affecting native flora and fauna."
  },
  ARJ: {
    nombre: "San Juan",
    problematica:
      "Wind and water erosion in arid zones: lack of vegetation worsens soil stability and water retention."
  },
  ARK: {
    nombre: "Catamarca",
    problematica:
      "Vulnerable high-altitude ecosystems: vegetation loss directly impacting watersheds and water regulation."
  },

  ARL: {
    nombre: "La Pampa",
    resumen:
      "Caldenal recovery: native restoration, regeneration management, and strengthening biological corridors to halt degradation of the Pampas forest."
  },

  ARM: {
    nombre: "Mendoza",
    problematica:
      "Wildfire risk in foothills and desertification: more exposed soils, erosion and lower ecosystem resilience."
  },
  ARN: {
    nombre: "Misiones",
    problematica:
      "Fragmentation of the Atlantic Forest, reducing ecological connectivity and increasing pressure on native species."
  },
  ARP: {
    nombre: "Formosa",
    problematica:
      "Alterations in wetlands and riparian forests due to human pressure and hydrological changes affecting biodiversity."
  },

  ARQ: {
    nombre: "Neuquén",
    resumen:
      "Post-wildfire restoration in Andean-Patagonian forests: reforestation, erosion control and soil recovery with regeneration monitoring."
  },

  ARR: {
    nombre: "Río Negro",
    resumen:
      "Recovery of burned areas in the Andes: native restoration, watershed protection and management to favor natural regeneration."
  },

  ARS: {
    nombre: "Santa Fe",
    problematica:
      "Loss of vegetation cover and pressure on wetlands, increasing vulnerability to droughts and floods."
  },
  ART: {
    nombre: "Tucumán",
    problematica:
      "Retreat of Yungas forests due to wildfires and land-use change, degrading watersheds and biodiversity."
  },

  ARU: {
    nombre: "Chubut",
    resumen:
      "Post-wildfire restoration and degraded steppe management: soil recovery, reforestation in priority areas and community prevention."
  },

  ARV: {
    nombre: "Tierra del Fuego",
    problematica:
      "Fragile ecosystems under pressure on peatlands and subantarctic forests, affecting water, carbon and biodiversity."
  },

  ARW: {
    nombre: "Corrientes",
    resumen:
      "Post-wildfire restoration in Iberá wetlands: habitat recovery, biodiversity strengthening and ecosystem resilience."
  },

  ARX: {
    nombre: "Córdoba",
    resumen:
      "Recovery of mountain forests and watersheds: native restoration, erosion control and actions in fire-affected areas."
  },

  ARY: {
    nombre: "Jujuy",
    problematica:
      "Degradation of Yungas and Puna forests due to fires and human pressure, affecting biodiversity and water regulation."
  },
  ARZ: {
    nombre: "Santa Cruz",
    problematica:
      "Degradation of Patagonian steppe: exposed soils, vegetation loss and reduced recovery capacity."
  }
};


const provinciasInfo = {
  ARA: {
    nombre: "Salta",
    problematica:
      "Avance de la frontera agropecuaria y degradación del bosque nativo: pérdida de biodiversidad, fragmentación del hábitat y erosión del suelo."
  },
  ARB: {
    nombre: "Buenos Aires",
    problematica:
      "Pérdida de cobertura vegetal nativa y presión urbana/rural sobre corredores verdes, con degradación de suelos y menor biodiversidad."
  },
  ARC: {
    nombre: "Ciudad de Buenos Aires",
    problematica:
      "Isla de calor urbana y estrés hídrico estacional: impacta en el arbolado público y reduce calidad ambiental en zonas densas."
  },
  ARD: {
    nombre: "San Luis",
    problematica:
      "Incendios en áreas serranas y desertificación localizada por degradación del monte nativo y cambios de uso del suelo."
  },

  ARE: {
    nombre: "Entre Ríos",
    resumen:
      "Restauración del Delta del Paraná: reforestación con nativas, recuperación de bosques ribereños y humedales, y acciones post-incendios con participación local.",
    enlace: "proyects/delta.html",
    img: "../img/delta-intro.jpg"
  },

  ARF: {
    nombre: "La Rioja",
    problematica:
      "Degradación por sobrepastoreo y pérdida de cobertura vegetal: aumenta erosión, reduce infiltración de agua y afecta biodiversidad."
  },
  ARG: {
    nombre: "Santiago del Estero",
    problematica:
      "Deforestación del Chaco seco y fragmentación de bosques: pérdida de servicios ecosistémicos y hábitats críticos."
  },
  ARH: {
    nombre: "Chaco",
    problematica:
      "Presión sobre el monte chaqueño (incendios y desmontes) que degrada suelos y afecta fauna y flora nativas."
  },
  ARJ: {
    nombre: "San Juan",
    problematica:
      "Erosión eólica/hídrica en zonas áridas: la falta de vegetación empeora la estabilidad del suelo y la retención de agua."
  },
  ARK: {
    nombre: "Catamarca",
    problematica:
      "Ecosistemas de altura vulnerables: pérdida de cobertura vegetal con impacto directo en cuencas y regulación hídrica."
  },

  ARL: {
    nombre: "La Pampa",
    resumen:
      "Recuperación del caldenal: restauración con nativas, manejo de regeneración, y fortalecimiento de corredores biológicos para frenar la degradación del monte pampeano.",
    enlace: "proyects/lapampa.html",
    img: "../img/lapampa-intro.jpg"
  },

  ARM: {
    nombre: "Mendoza",
    problematica:
      "Riesgo de incendios en piedemonte y desertificación: suelos más expuestos, erosión y menor resiliencia ecosistémica."
  },
  ARN: {
    nombre: "Misiones",
    problematica:
      "Fragmentación de la selva paranaense: pérdida de conectividad ecológica y presión sobre especies nativas."
  },
  ARP: {
    nombre: "Formosa",
    problematica:
      "Alteraciones en humedales y bosques ribereños por presión antrópica y cambios hidrológicos, afectando biodiversidad."
  },

  ARQ: {
    nombre: "Neuquén",
    resumen:
      "Restauración en bosques andino-patagónicos post-incendio: reforestación, control de erosión y recuperación de suelos con monitoreo de regeneración.",
    enlace: "proyects/patagonia.html",
    img: "../img/patagonia/1.jpg"
  },

  ARR: {
    nombre: "Río Negro",
    resumen:
      "Recuperación de áreas incendiadas en la cordillera: restauración con nativas, protección de cuencas y manejo para favorecer la regeneración natural.",
    enlace: "proyects/patagonia.html",
    img: "../img/patagonia-intro.jpg"
  },

  ARS: {
    nombre: "Santa Fe",
    problematica:
      "Pérdida de cobertura vegetal y presión sobre humedales: aumenta vulnerabilidad ante extremos (sequías/inundaciones)."
  },
  ART: {
    nombre: "Tucumán",
    problematica:
      "Retroceso de yungas por incendios y cambios de uso del suelo, con degradación de cuencas y pérdida de biodiversidad."
  },

  ARU: {
    nombre: "Chubut",
    resumen:
      "Restauración post-incendios y manejo de estepa degradada: recuperación de suelos, reforestación en zonas priorizadas y prevención comunitaria.",
    enlace: "proyects/patagonia.html",
    img: "../img/patagonia/3.jpg"
  },

  ARV: {
    nombre: "Tierra del Fuego",
    problematica:
      "Ecosistemas frágiles: presión sobre turberas y bosques subantárticos, afectando agua, carbono y biodiversidad."
  },

  ARW: {
    nombre: "Corrientes",
    resumen:
      "Restauración en humedales e Iberá post-incendios: recuperación de ambientes, fortalecimiento de biodiversidad y resiliencia ecosistémica.",
    enlace: "proyects/corrientes.html",
    img: "../img/corrientes-intro.jpg"
  },

  ARX: {
    nombre: "Córdoba",
    resumen:
      "Recuperación del bosque serrano y cuencas: restauración con nativas, control de erosión y acciones en zonas afectadas por incendios recurrentes.",
    enlace: "proyects/cordoba.html",
    img: "../img/cordoba-intro.jpeg"
  },

  ARY: {
    nombre: "Jujuy",
    problematica:
      "Degradación de yungas y bosques puneños por incendios y presión antrópica, afectando biodiversidad y regulación hídrica."
  },
  ARZ: {
    nombre: "Santa Cruz",
    problematica:
      "Degradación de estepa patagónica: suelos expuestos, pérdida de cobertura vegetal y menor capacidad de recuperación."
  }
};

const COLOR_VERDE_BASE   = "#1b5e20";
const COLOR_VERDE_HOVER  = "#4caf50";
const COLOR_VERDE_SELECT = "#2e7d32";

const COLOR_ROJO_BASE    = "#7b1c1c";
const COLOR_ROJO_HOVER   = "#c62828";
const COLOR_ROJO_SELECT  = "#8e0000";

document.addEventListener("DOMContentLoaded", () => {
  fetch(RUTA_SVG)
    .then(r => r.text())
    .then(svgContent => {
      document.getElementById("map").innerHTML = svgContent;
      inicializarMapa();
    })
    .catch(err => console.error("Error cargando SVG:", err));
});

const MAPA_UI = {
  es: {
    noDataTitle: "Provincia sin datos cargados",
    noDataText: "Todavía no cargamos la información de esta provincia.",
    fallbackProblematica: "Estamos relevando problemáticas locales para priorizar un proyecto.",
    fallbackResumen: "Estamos preparando el artículo completo del proyecto.",
    verProyecto: "Ver proyecto"
  },
  en: {
    noDataTitle: "No data for this province",
    noDataText: "We haven't uploaded information for this province yet.",
    fallbackProblematica: "We are assessing local issues to prioritize a project.",
    fallbackResumen: "We are preparing the full project article.",
    verProyecto: "View project"
  }
};

const MAPA_PROY_I18N = {
  en: {
    ARE: { // Entre Ríos (Delta)
      titulo: "Entre Ríos",
      resumen:
        "Paraná Delta restoration: native reforestation, recovery of riverside forests and wetlands, and post-wildfire actions with local participation."
    },
    ARX: { // Córdoba
      titulo: "Córdoba",
      resumen:
        "Córdoba hills restoration: native forest recovery, watershed protection, and soil restoration in fire-affected areas."
    },
    ARL: { // La Pampa
      titulo: "La Pampa",
      resumen:
        "Caldenal recovery: native restoration, regeneration management, and strengthening biological corridors to stop degradation of the Pampas forest."
    },
    ARW: { // Corrientes
      titulo: "Corrientes",
      resumen:
        "Iberá wetlands restoration: recovering habitats, strengthening biodiversity corridors, and improving ecosystem resilience."
    }
    // (si querés, después agregamos ARQ/ARR/ARU, etc.)
  }
};

function renderContenidoProvincia(codigo) {
  const lang = getLang();
  const ui = MAPA_UI[lang] || MAPA_UI.es;

  const datos = provinciasInfo[codigo];
  if (!datos) {
    return {
      titulo: ui.noDataTitle,
      html: `<p class="provincia-problematica">${ui.noDataText}</p>
             <div class="provincia-sinproyecto">${MENSAJE_SIN_PROYECTO[lang] || MENSAJE_SIN_PROYECTO.es}</div>`
    };
  }

  const datosTrad =
    (lang === "en" && PROVINCIAS_I18N_EN[codigo])
      ? { ...datos, ...PROVINCIAS_I18N_EN[codigo] }
      : datos;

  const esRoja = provinciasRojas.has(codigo);

  if (!esRoja) {
    const problematica = datosTrad.problematica || ui.fallbackProblematica;

    return {
      titulo: datosTrad.nombre,
      html: `<p class="provincia-problematica">${problematica}</p>
             <div class="provincia-sinproyecto">${MENSAJE_SIN_PROYECTO[lang] || MENSAJE_SIN_PROYECTO.es}</div>`
    };
  }

  const resumen = datosTrad.resumen || ui.fallbackResumen;

  const img = datosTrad.img
    ? `<div class="provincia-img-wrap">
         <img class="provincia-img" src="${datosTrad.img}" alt="Proyecto en ${datosTrad.nombre}">
       </div>`
    : "";

  const link = (datosTrad.enlace && datosTrad.enlace !== "#")
    ? `<a class="provincia-link" href="${datosTrad.enlace}">${ui.verProyecto}</a>`
    : "";

  return {
    titulo: datosTrad.nombre,
    html: `${img}
           <p class="provincia-resumen">${resumen}</p>
           ${link}`
  };
}


function inicializarMapa() {
  const svg = document.querySelector("#map svg");
  if (!svg) return;

  let x = 0, y = 0, w = 300, h = 300;
  svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  const tituloProvincia = document.getElementById("provincia-nombre");
  const textoProvincia  = document.getElementById("provincia-texto");

  let provinciaSeleccionada = null;
  let pathSeleccionado = null;

  const provinciasSVG = svg.querySelectorAll('path[class*="sm_state_"]');

  provinciasSVG.forEach(path => {
    const clases = path.getAttribute("class") || "";
    const matchCodigo = clases.match(/sm_state_([A-Z]+)/);
    if (!matchCodigo) return;

    const codigo = matchCodigo[1];

    const esRoja = provinciasRojas.has(codigo);
    const colorBase   = esRoja ? COLOR_ROJO_BASE   : COLOR_VERDE_BASE;
    const colorHover  = esRoja ? COLOR_ROJO_HOVER  : COLOR_VERDE_HOVER;
    const colorSelect = esRoja ? COLOR_ROJO_SELECT : COLOR_VERDE_SELECT;

    path.setAttribute("fill", colorBase);

    path.addEventListener("mouseenter", () => {
      path.classList.add("hover");
      if (path !== pathSeleccionado) path.setAttribute("fill", colorHover);

      if (!provinciaSeleccionada && provinciasInfo[codigo]) {
        tituloProvincia.textContent = provinciasInfo[codigo].nombre;
      }
    });

    path.addEventListener("mouseleave", () => {
      path.classList.remove("hover");
      if (path !== pathSeleccionado) path.setAttribute("fill", colorBase);

      if (!provinciaSeleccionada) {
        tituloProvincia.textContent = "Elegí una provincia";
        textoProvincia.textContent =
          "Pasá el mouse o hacé clic sobre una provincia para ver información.";
      }
    });

    path.addEventListener("click", () => {
      provinciaSeleccionada = codigo;

      // reset colores + estados
      provinciasSVG.forEach(p => {
        p.classList.remove("seleccionada");
        const clasesP = p.getAttribute("class") || "";
        const matchCodP = clasesP.match(/sm_state_([A-Z]+)/);
        if (!matchCodP) return;

        const codP = matchCodP[1];
        const esRojaP = provinciasRojas.has(codP);
        const baseP = esRojaP ? COLOR_ROJO_BASE : COLOR_VERDE_BASE;
        p.setAttribute("fill", baseP);
      });

      pathSeleccionado = path;
      path.classList.add("seleccionada");
      path.setAttribute("fill", colorSelect);

      const contenido = renderContenidoProvincia(codigo);
      tituloProvincia.textContent = contenido.titulo;
      textoProvincia.innerHTML = contenido.html;
      window.__provinciaActivaCodigo = codigo;

    });
  });

  const zoomController = crearZoomYPan(svg, { x, y, w, h });

  const btnMas   = document.getElementById("zoom-mas");
  const btnMenos = document.getElementById("zoom-menos");
  const btnReset = document.getElementById("zoom-reset");

  if (btnMas)   btnMas.addEventListener("click", () => zoomController.zoomIn());
  if (btnMenos) btnMenos.addEventListener("click", () => zoomController.zoomOut());
  if (btnReset) btnReset.addEventListener("click", () => zoomController.reset());
}

function crearZoomYPan(svg, inicial) {
  let { x, y, w, h } = inicial;
  const original = { ...inicial };
  const zoomFactor = 1.2;
  let isPanning = false;
  let startX = 0;
  let startY = 0;

  function aplicarViewBox() {
    svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
  }

  svg.addEventListener("wheel", e => {
    e.preventDefault();
    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const px = x + (mouseX / rect.width) * w;
    const py = y + (mouseY / rect.height) * h;

    if (e.deltaY < 0) {
      w /= zoomFactor;
      h /= zoomFactor;
    } else {
      w *= zoomFactor;
      h *= zoomFactor;
    }

    x = px - (mouseX / rect.width) * w;
    y = py - (mouseY / rect.height) * h;

    aplicarViewBox();
  });

  svg.addEventListener("mousedown", e => {
    isPanning = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener("mousemove", e => {
    if (!isPanning) return;
    const rect = svg.getBoundingClientRect();
    const dx = ((e.clientX - startX) / rect.width) * w;
    const dy = ((e.clientY - startY) / rect.height) * h;
    x -= dx;
    y -= dy;
    startX = e.clientX;
    startY = e.clientY;
    aplicarViewBox();
  });

  window.addEventListener("mouseup", () => {
    isPanning = false;
  });

  return {
    zoomIn() {
      const cx = x + w / 2;
      const cy = y + h / 2;
      w /= zoomFactor;
      h /= zoomFactor;
      x = cx - w / 2;
      y = cy - h / 2;
      aplicarViewBox();
    },
    zoomOut() {
      const cx = x + w / 2;
      const cy = y + h / 2;
      w *= zoomFactor;
      h *= zoomFactor;
      x = cx - w / 2;
      y = cy - h / 2;
      aplicarViewBox();
    },
    reset() {
      x = original.x;
      y = original.y;
      w = original.w;
      h = original.h;
      aplicarViewBox();
    }
  };
}

window.addEventListener("idioma:cambio", () => {
  if (!window.__provinciaActivaCodigo) return;

  const codigo = window.__provinciaActivaCodigo;
  const contenido = renderContenidoProvincia(codigo);

  const tituloProvincia = document.getElementById("provincia-nombre");
  const textoProvincia  = document.getElementById("provincia-texto");

  if (tituloProvincia) tituloProvincia.textContent = contenido.titulo;
  if (textoProvincia)  textoProvincia.innerHTML = contenido.html;
});


