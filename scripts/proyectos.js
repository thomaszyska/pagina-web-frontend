(function(){
  const proyectos = [
    {
      id: "delta-parana",
      nombre: "Delta del Paraná",
      region: "Entre Ríos / Corrientes",
      ecosistema: ["humedales", "incendios"],
      estado: "Activo",
      descripcion: "Restauración de humedales y reforestación con nativas en zonas afectadas por incendios y presión antrópica.",
      img: "../img/delta-intro.jpg",
      href: "../pages/proyects/delta.html"
    },
    {
      id: "cordoba",
      nombre: "Córdoba",
      region: "Sierras de Córdoba",
      ecosistema: ["bosque", "incendios"],
      estado: "Activo",
      descripcion: "Recuperación de bosque serrano con especies nativas y restauración de suelos en áreas degradadas.",
      img: "../img/cordoba-intro.jpeg",
      href: "../pages/proyects/cordoba.html"
    },
    {
      id: "patagonia",
      nombre: "Patagonia",
      region: "Chubut / Río Negro / Neuquen",
      ecosistema: ["bosque", "incendios"],
      estado: "Activo",
      descripcion: "Restauración post-incendio en bosques andino-patagónicos, control de erosión y reintroducción de nativas.",
      img: "../img/patagonia-intro.jpg",
      href: "../pages/proyects/patagonia.html"
    },
    {
      id: "corrientes",
      nombre: "Corrientes",
      region: "Esteros del Iberá",
      ecosistema: ["humedales"],
      estado: "Activo",
      descripcion: "Reforestación y corredores biológicos para recuperar biodiversidad, mejorar suelos y fortalecer humedales.",
      img: "../img/corrientes-intro.jpg",
      href: "../pages/proyects/corrientes.html"
    },
    {
      id: "la-pampa",
      nombre: "La Pampa",
      region: "Centro del país",
      ecosistema: ["pastizales", "estepa", "incendios"],
      estado: "Activo",
      descripcion: "Restauración de pastizales y cortinas forestales con nativos para recuperar biodiversidad y suelo.",
      img: "../img/lapampa-intro.jpg",
      href: "../pages/proyects/lapampa.html"
    }
  ];


  const $lista = document.getElementById("lista-proyectos");
  const $input = document.getElementById("buscador-proyectos");
  const $chips = Array.from(document.querySelectorAll(".chip"));
  const $contador = document.getElementById("contador-proyectos");
  const $sin = document.getElementById("sin-resultados");

  if(!$lista || !$input || !$contador) return;

  let filtroEco = "todos";
  const getLang = () => localStorage.getItem("idioma") || "es";

  const UI_I18N = {
    es: { ver: "Ver proyecto", donar: "Donar", activo: "Activo" },
    en: { ver: "View project", donar: "Donate", activo: "Active" }
  };

  const TAG_I18N = {
    es: {
      humedales: "humedales",
      bosque: "bosque",
      pastizales: "pastizales",
      estepa: "estepa",
      incendios: "incendios"
    },
    en: {
      humedales: "wetlands",
      bosque: "forest",
      pastizales: "grasslands",
      estepa: "steppe",
      incendios: "wildfires"
    }
  };

  const PROY_I18N = {
      es: {
      "delta-parana": {
        nombre: "Paraná Delta",
        region: "Entre Ríos / Corrientes",
        descripcion:
          "Restauración de humedales y reforestación nativa en áreas afectadas por incendios y presión humana."
      },
      "cordoba": {
        nombre: "Córdoba",
        region: "Sierras de Córdoba",
        descripcion:
          "Recuperación de bosques montañosos con especies nativas y restauración de suelos en áreas degradadas."
      },
      "patagonia": {
        nombre: "Patagonia",
        region: "Chubut / Río Negro / Neuquén",
        descripcion:
          "Restauración post-incendio en bosques andino-patagónicos, control de erosión y reintroducción de nativas."
      },
      "corrientes": {
        nombre: "Corrientes",
        region: "Esteros del Iberá",
        descripcion:
          "Reforestación y corredores biológicos para recuperar biodiversidad, mejorar suelos y fortalecer humedales."
      },
      "la-pampa": {
        nombre: "La Pampa",
        region: "Centro del país",
        descripcion:
          "Restauración de pastizales y cortinas forestales con nativos para recuperar biodiversidad y suelo."
      }
    }
    ,
    en: {
      "delta-parana": {
        nombre: "Paraná Delta",
        region: "Entre Ríos / Corrientes",
        descripcion:
          "Wetland restoration and native reforestation in areas affected by wildfires and human pressure."
      },
      "cordoba": {
        nombre: "Córdoba",
        region: "Córdoba Hills",
        descripcion:
          "Recovery of mountain forests with native species and soil restoration in degraded areas."
      },
      "patagonia": {
        nombre: "Patagonia",
        region: "Chubut / Río Negro / Neuquén",
        descripcion:
          "Post-wildfire restoration in Andean-Patagonian forests, erosion control and native reintroduction."
      },
      "corrientes": {
        nombre: "Corrientes",
        region: "Iberá Wetlands",
        descripcion:
          "Reforestation and biological corridors to restore biodiversity, improve soils and strengthen wetlands."
      },
      "la-pampa": {
        nombre: "La Pampa",
        region: "Central Argentina",
        descripcion:
          "Grassland restoration and native windbreaks to recover biodiversity and soil."
      }
    }
  };

  let query = "";

  function normalizar(str){
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function filtrar(){
    const q = normalizar(query);
    return proyectos.filter(p => {
      const matcheaEco = (filtroEco === "todos") || (p.ecosistema || []).includes(filtroEco);

      const texto = normalizar(
        `${p.nombre} ${p.region} ${(p.ecosistema || []).join(" ")} ${p.estado} ${p.descripcion}`
      );
      const matcheaBusqueda = !q || texto.includes(q);

      return matcheaEco && matcheaBusqueda;
    });
  }

function render(){
  const items = filtrar();

  const lang = getLang();
  const ui = UI_I18N[lang] || UI_I18N.es;
  const tagDic = TAG_I18N[lang] || TAG_I18N.es;

  $contador.textContent = items.length;

  if($sin){
    $sin.style.display = items.length ? "none" : "block";
  }

  $lista.innerHTML = items.map(p => {
    // Traducción por id (si existe)
    const tr = (PROY_I18N[lang] && PROY_I18N[lang][p.id]) ? PROY_I18N[lang][p.id] : {};

    const nombre = tr.nombre || p.nombre;
    const region = tr.region || p.region;
    const descripcion = tr.descripcion || p.descripcion;

    // Estado: solo traducimos "Activo" -> "Active" cuando corresponde
    const estado = (lang === "en" && String(p.estado).toLowerCase() === "activo")
      ? ui.activo
      : p.estado;

    const tags = (p.ecosistema || []).map(t => tagDic[t] || t);

    return `
      <article class="card-proyecto">
        <div class="card-proyecto__img">
          <img src="${p.img}" alt="${nombre}">
        </div>

        <div class="card-proyecto__body">
          <h3 class="card-proyecto__title">${nombre}</h3>

          <div class="card-proyecto__meta">
            <span class="badge">${region}</span>
            <span class="badge">${estado}</span>
          </div>

          <p class="card-proyecto__desc">${descripcion}</p>

          <div class="card-proyecto__tags">
            ${tags.map(t => `<span class="badge">${t}</span>`).join("")}
          </div>

          <div class="card-proyecto__actions">
            <a class="proy-btn small" href="${p.href}">${ui.ver}</a>
            <a class="proy-btn sec small" href="/pages/dona.html">${ui.donar}</a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}


  $input.addEventListener("input", () => {
    query = $input.value.trim();
    render();
  });

  $chips.forEach(btn => {
    btn.addEventListener("click", () => {
      filtroEco = btn.dataset.filtro || "todos";

      $chips.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");

      render();
    });
  });

  render();
})();

(function () {
  const STORAGE_KEY = 'renacer_donaciones_v1';

  const card = document.getElementById('acumCard');
  if (!card) return;

  const proyectoId = card.dataset.proyecto;

  const $acum = document.getElementById('acumValor');
  const $meta = document.getElementById('metaValor');
  const $pct = document.getElementById('pctValor');
  const $estado = document.getElementById('estadoValor');
  const $barra = document.getElementById('barraFill');

  const METAS = {
    'delta-parana': 12000000,
    'cordoba': 9000000,
    'patagonia': 15000000,
    'corrientes': 11000000,
    'la-pampa': 7000000
  };

  function formatARS(valor) {
    return Number(valor || 0).toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    });
  }

  function cargarTotales() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch {
      return {};
    }
  }

  function calcularAcumulado() {
    const totales = cargarTotales();
    return Number(totales[proyectoId] || 0);
  }

  function render() {
    const acumulado = calcularAcumulado();
    const meta = Number(METAS[proyectoId] || 0);

    const porcentaje = meta > 0
      ? Math.min((acumulado / meta) * 100, 100)
      : 0;

    if ($acum) $acum.textContent = formatARS(acumulado);
    if ($meta) $meta.textContent = meta > 0 ? formatARS(meta) : "—";
    if ($pct) $pct.textContent = meta > 0 ? `${Math.round(porcentaje)}%` : "—";
    if ($barra) $barra.style.width = `${porcentaje}%`;

    if ($estado) {
      $estado.textContent = (meta > 0 && acumulado >= meta) ? 'Meta alcanzada' : 'En curso';
    }
  }

  render();

  window.addEventListener('storage', (e) => {
    if (!e || e.key === STORAGE_KEY) render();
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) render();
  });
})();

(function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const botones = document.querySelectorAll(".galeria button[data-full]");

  if (!lightbox || !lightboxImg || !botones.length) return;

  function abrir(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.style.display = "flex"; 
    lightbox.classList.add("open");      
    document.body.style.overflow = "hidden";
  }

  function cerrar() {
    lightbox.classList.remove("open");
    lightbox.style.display = "none";
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  cerrar();

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-full");
      const img = btn.querySelector("img");
      if (src) abrir(src, img ? img.alt : "");
    });
  });

 lightbox.addEventListener("click", (e) => {
    if (e.target && e.target.closest('[data-close="true"]')) cerrar();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrar();
  });

  let imagenes = [];
let indiceActual = 0;

imagenes = Array.from(document.querySelectorAll(".galeria button[data-full]"));

function mostrarIndice(i) {
  if (i < 0) i = imagenes.length - 1;
  if (i >= imagenes.length) i = 0;

  indiceActual = i;
  const btn = imagenes[indiceActual];
  const src = btn.getAttribute("data-full");
  const img = btn.querySelector("img");

  lightboxImg.src = src;
  lightboxImg.alt = img ? img.alt : "";
}

botones.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    indiceActual = i;
    mostrarIndice(indiceActual);
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

document.getElementById("lightboxPrev").addEventListener("click", (e) => {
  e.stopPropagation();
  mostrarIndice(indiceActual - 1);
});

document.getElementById("lightboxNext").addEventListener("click", (e) => {
  e.stopPropagation();
  mostrarIndice(indiceActual + 1);
});

})();

if (typeof renderizarProyectos === "function") {
  window.renderizarProyectos = renderizarProyectos;
  window.addEventListener("idioma:cambio", () => renderizarProyectos());
}


