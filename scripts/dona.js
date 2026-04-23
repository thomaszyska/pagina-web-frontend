const DONA_I18N = {
  es: {
    acumulado: "Acumulado",
    meta: "Meta",
    progreso: "Progreso",
    donarProyecto: "Donar a este proyecto",
    barraLabel: "Progreso del proyecto",
    proyectoPlaceholder: "Elegí un proyecto…",
    wizardBase: "Donación (3 pasos)",

    errProyecto: "Elegí un proyecto para continuar.",
    errMonto: "Elegí un monto (o ingresá otro).",
    errNombre: "Completá tu nombre completo.",
    errFecha: "Completá tu fecha de nacimiento.",
    errResidencia: "Completá tu lugar de residencia.",
    errEmail: "Completá un email válido.",
    errMetodo: "Seleccioná un método de pago.",
    errTarjeta16: "El número de tarjeta debe tener 16 dígitos.",
    errTarjetaLuhn: "El número de tarjeta no parece válido (control de dígito).",
    errNomTarjeta: "Completá el nombre que figura en la tarjeta.",
    errVenc: "Vencimiento inválido. Usá MM/AA (por ejemplo 08/27).",
    errCvv3: "El código de seguridad debe tener 3 dígitos.",
    errTransfer: "Para la demo, marcá “Ya realicé la transferencia”.",


    metodoTC: "Tarjeta",
    metodoTransf: "Transferencia",
    resumenProyecto: "Proyecto",
    resumenMonto: "Monto",
    resumenNombre: "Nombre",
    resumenFecha: "Fecha de nacimiento",
    resumenResidencia: "Residencia",
    resumenEmail: "Email",
    resumenMetodo: "Método",
    resumenTarjeta: "Tarjeta",
    resumenCBU: "CBU",

    // OK
    ok: "✅ Donación confirmada (demo). El acumulador del proyecto se actualizó."
  },
  en: {
    acumulado: "Raised",
    meta: "Goal",
    progreso: "Progress",
    donarProyecto: "Donate to this project",
    barraLabel: "Project progress",
    proyectoPlaceholder: "Choose a project…",
    wizardBase: "Donation (3 step)
    errProyecto: "Choose a project to continue.",
    errMonto: "Choose an amount (or type another one).",
    errNombre: "Enter your full name.",
    errFecha: "Enter your date of birth.",
    errResidencia: "Enter your place of residence.",
    errEmail: "Enter a valid email.",

    errMetodo: "Choose a payment method.",
    errTarjeta16: "Card number must be 16 digits.",
    errTarjetaLuhn: "Card number doesn't look valid (check digit).",
    errNomTarjeta: "Enter the name shown on the card.",
    errVenc: "Invalid expiry. Use MM/YY (e.g. 08/27).",
    errCvv3: "Security code must be 3 digits.",
    errTransfer: "For the demo, tick “I already made the transfer”.",

    metodoTC: "Card",
    metodoTransf: "Bank transfer",
    resumenProyecto: "Project",
    resumenMonto: "Amount",
    resumenNombre: "Name",
    resumenFecha: "Date of birth",
    resumenResidencia: "Residence",
    resumenEmail: "Email",
    resumenMetodo: "Method",
    resumenTarjeta: "Card",
    resumenCBU: "CBU",

    // OK
    ok: "✅ Donation confirmed (demo). The project total was updated."
  }
};

const getLang = () => localStorage.getItem("idioma") || "es";
const tDona = (key) => DONA_I18N[getLang()]?.[key] || DONA_I18N.es[key] || "";

(() => {
  const moneda = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  });

  const STORAGE_KEY = "renacer_donaciones_v1";

  const proyectosBase = [
    { id: "delta-parana", nombre: "Delta del Paraná", etiqueta: "Humedales", etiqueta_en: "Wetlands", meta: 12000000 },
    { id: "cordoba", nombre: "Córdoba", etiqueta: "Bosque nativo", etiqueta_en: "Native forest", meta: 9000000 },
    { id: "patagonia", nombre: "Patagonia", etiqueta: "Bosque andino", etiqueta_en: "Andean forest", meta: 15000000 },
    { id: "corrientes", nombre: "Corrientes", etiqueta: "Restauración", etiqueta_en: "Restoration", meta: 11000000 },
    { id: "la-pampa", nombre: "La Pampa", etiqueta: "Monte", etiqueta_en: "Woodland", meta: 7000000 }
  ];

  const grid = document.getElementById("gridProyectos");
  const selectProyecto = document.getElementById("proyectoSelect");
  const wizardTitulo = document.getElementById("wizardTitulo");

  const montoBtns = Array.from(document.querySelectorAll(".monto"));
  const montoOtro = document.getElementById("montoOtro");
  const montoFinal = document.getElementById("montoFinal");

  const pasos = Array.from(document.querySelectorAll(".paso"));
  const stepDots = Array.from(document.querySelectorAll(".step"));

  const errorPaso1 = document.getElementById("errorPaso1");
  const errorPaso2 = document.getElementById("errorPaso2");

  const btnSiguiente1 = document.getElementById("btnSiguiente1");
  const btnSiguiente2 = document.getElementById("btnSiguiente2");
  const btnAtras2 = document.getElementById("btnAtras2");
  const btnAtras3 = document.getElementById("btnAtras3");

  const resumenFinal = document.getElementById("resumenFinal");
  const okMsg = document.getElementById("okMsg");
  const form = document.getElementById("formDona");

  const metodoPago = document.getElementById("metodoPago");

  const nombreDonante = document.getElementById("nombreDonante");
  const fechaNacimiento = document.getElementById("fechaNacimiento");
  const residencia = document.getElementById("residencia");
  const emailDonante = document.getElementById("emailDonante");

  const panelTarjeta = document.getElementById("panelTarjeta");
  const panelTransf = document.getElementById("panelTransf");

  const numeroTarjeta = document.getElementById("numeroTarjeta");
  const nombreTarjeta = document.getElementById("nombreTarjeta");
  const vencimiento = document.getElementById("vencimiento");
  const cvv = document.getElementById("cvv");

  const cbuValor = document.getElementById("cbuValor");
  const aliasValor = document.getElementById("aliasValor");
  const checkTransfer = document.getElementById("checkTransfer");

  let proyectos = [];
  let cbuActual = "";

  let paso1Intentado = false;
  let paso2Intentado = false;

  function clampPct(x) {
    return Math.max(0, Math.min(100, x));
  }

  function limpiarDigitos(str) {
    return String(str || "").replace(/[^0-9]/g, "");
  }

  function formatoCBU(cbu) {
    return String(cbu).replace(/\s+/g, "");
  }

  function generarCBUDemo() {
    let out = "";
    for (let i = 0; i < 22; i++) out += String(Math.floor(Math.random() * 10));
    return out;
  }

  function loadTotales() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function saveTotales(map) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch (_) {}
  }

  function initProyectos() {
    const totales = loadTotales();
    proyectos = proyectosBase.map((p) => ({
      ...p,
      acumulado: Number(totales[p.id] || 0)
    }));
  }

  function actualizarCardProyecto(id) {
    const p = proyectos.find((x) => x.id === id);
    if (!p || !grid) return;

    const card = grid.querySelector(`.proy-card[data-id="${CSS.escape(id)}"]`);
    if (!card) return;

    const pct = clampPct((p.acumulado / p.meta) * 100);

    const acumuladoEl = card.querySelector('[data-role="acumulado"]');
    const metaEl = card.querySelector('[data-role="meta"]');
    const pctEl = card.querySelector('[data-role="pct"]');
    const barraEl = card.querySelector(".barra > div");

    if (acumuladoEl) acumuladoEl.textContent = moneda.format(p.acumulado);
    if (metaEl) metaEl.textContent = moneda.format(p.meta);
    if (pctEl) pctEl.textContent = `${pct.toFixed(0)}%`;
    if (barraEl) barraEl.style.width = `${pct}%`;
  }

  function renderProyectos() {
    if (!grid || !selectProyecto) return;

    selectProyecto.innerHTML = "";
    const opt0 = document.createElement("option");
    opt0.value = "";
    opt0.selected = true;
    opt0.disabled = true;
    opt0.textContent = tDona("proyectoPlaceholder");
    selectProyecto.appendChild(opt0);

    for (const p of proyectos) {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.nombre;
      selectProyecto.appendChild(opt);
    }

    grid.innerHTML = "";
    const lang = getLang();

    for (const p of proyectos) {
      const pct = clampPct((p.acumulado / p.meta) * 100);

      const card = document.createElement("article");
      card.className = "proy-card";
      card.dataset.id = p.id;

      const etiqueta = lang === "en" ? (p.etiqueta_en || p.etiqueta) : p.etiqueta;

      card.innerHTML = `
        <div class="proy-top">
          <h3>${p.nombre}</h3>
          <span class="tag">${etiqueta}</span>
        </div>

        <div class="proy-numeros">
          <div><strong>${tDona("acumulado")}:</strong> <span data-role="acumulado">${moneda.format(p.acumulado)}</span></div>
          <div><strong>${tDona("meta")}:</strong> <span data-role="meta">${moneda.format(p.meta)}</span></div>
          <div><strong>${tDona("progreso")}:</strong> <span data-role="pct">${pct.toFixed(0)}%</span></div>
        </div>

        <div class="barra" aria-label="${tDona("barraLabel")}">
          <div style="width:${pct}%;"></div>
        </div>

        <div class="proy-acciones">
          <button type="button" class="btn-mini">${tDona("donarProyecto")}</button>
        </div>
      `;

      card.querySelector(".btn-mini")?.addEventListener("click", () => seleccionarProyecto(p.id, true));
      card.addEventListener("click", (e) => {
        if (e.target && e.target.classList && e.target.classList.contains("btn-mini")) return;
        seleccionarProyecto(p.id, false);
      });

      grid.appendChild(card);
    }

    if (selectProyecto.value) {
      seleccionarProyecto(selectProyecto.value, false);
    } else {
      actualizarTituloWizard(null);
    }
  }

  function actualizarTituloWizard(proyecto) {
    if (!wizardTitulo) return;
    const base = tDona("wizardBase");
    wizardTitulo.textContent = proyecto ? `${base} · ${proyecto.nombre}` : base;
  }

  function seleccionarProyecto(id, scrollear) {
    selectProyecto.value = id;

    document.querySelectorAll(".proy-card").forEach((c) => {
      c.classList.toggle("seleccionado", c.dataset.id === id);
    });

    const p = proyectos.find((x) => x.id === id);
    actualizarTituloWizard(p);

    if (scrollear) {
      document.querySelector(".wizard-wrap")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    validarPaso1({ silent: !paso1Intentado });
    actualizarEstadoBotones();
  }

  function setMonto(valor) {
    const num = Number(valor);
    if (!Number.isFinite(num) || num <= 0) {
      montoFinal.value = "";
      return;
    }
    montoFinal.value = String(Math.round(num));
  }

  function irA(step) {
    pasos.forEach((p) => p.classList.toggle("activo", p.dataset.step === String(step)));
    stepDots.forEach((d) => d.classList.toggle("activo", d.dataset.step === String(step)));
    okMsg.textContent = "";
    actualizarEstadoBotones();
  }

  function esDemoCerosTarjeta() {
    const n = limpiarDigitos(numeroTarjeta.value);
    const v = limpiarDigitos(vencimiento.value);
    const c = limpiarDigitos(cvv.value);
    const nom = String(nombreTarjeta.value || "").trim();

    return (
      n.length === 16 && /^0{16}$/.test(n) &&
      v.length === 4 && /^0{4}$/.test(v) &&
      c.length === 3 && /^0{3}$/.test(c) &&
      nom.length > 0 && /^0+$/.test(nom)
    );
  }

  function luhnValido(num16) {
    let sum = 0;
    let doubleIt = false;

    for (let i = num16.length - 1; i >= 0; i--) {
      let d = Number(num16[i]);
      if (doubleIt) {
        d = d * 2;
        if (d > 9) d = d - 9;
      }
      sum += d;
      doubleIt = !doubleIt;
    }

    return sum % 10 === 0;
  }

  function vencimientoValido(mmYY) {
    const clean = limpiarDigitos(mmYY);
    if (clean.length !== 4) return false;

    const mm = Number(clean.slice(0, 2));
    const yy = Number(clean.slice(2, 4));

    if (mm < 1 || mm > 12) return false;

    const now = new Date();
    const year = now.getFullYear() % 100;
    const month = now.getMonth() + 1;

    if (yy < year) return false;
    if (yy === year && mm < month) return false;

    return true;
  }

  function mostrarPanelPago() {
    if (panelTarjeta) panelTarjeta.hidden = true;
    if (panelTransf) panelTransf.hidden = true;

    if (metodoPago.value === "tc") panelTarjeta.hidden = false;

    if (metodoPago.value === "transf") {
      panelTransf.hidden = false;
      if (!cbuActual) cbuActual = generarCBUDemo();
      cbuValor.textContent = formatoCBU(cbuActual);
      aliasValor.textContent = "renacer.dona";
    }
  }

  function setErrorPaso(el, msg) {
    if (!el) return;
    el.textContent = msg || "";
    el.style.display = msg ? "block" : "none";
  }

  function validarPaso1(opts = {}) {
    const silent = Boolean(opts.silent);

    if (!selectProyecto.value) {
      if (!silent) setErrorPaso(errorPaso1, tDona("errProyecto"));
      return false;
    }
    if (!montoFinal.value) {
      if (!silent) setErrorPaso(errorPaso1, tDona("errMonto"));
      return false;
    }
    if (!String(nombreDonante.value || "").trim()) {
      if (!silent) setErrorPaso(errorPaso1, tDona("errNombre"));
      return false;
    }
    if (!fechaNacimiento.value) {
      if (!silent) setErrorPaso(errorPaso1, tDona("errFecha"));
      return false;
    }
    if (!String(residencia.value || "").trim()) {
      if (!silent) setErrorPaso(errorPaso1, tDona("errResidencia"));
      return false;
    }
    if (!String(emailDonante.value || "").trim() || !emailDonante.checkValidity()) {
      if (!silent) setErrorPaso(errorPaso1, tDona("errEmail"));
      return false;
    }

    if (!silent) setErrorPaso(errorPaso1, "");
    return true;
  }

  function validarPaso2(opts = {}) {
    const silent = Boolean(opts.silent);

    if (!metodoPago.value) {
      if (!silent) setErrorPaso(errorPaso2, tDona("errMetodo"));
      return false;
    }

    if (metodoPago.value === "tc") {
      const n = limpiarDigitos(numeroTarjeta.value);
      const c = limpiarDigitos(cvv.value);

      numeroTarjeta.value = n;
      cvv.value = c;

      const vClean = limpiarDigitos(vencimiento.value);
      if (vClean.length <= 4) {
        let vShow = vClean;
        if (vClean.length >= 3) vShow = `${vClean.slice(0, 2)}/${vClean.slice(2)}`;
        vencimiento.value = vShow;
      }

      if (esDemoCerosTarjeta()) {
        if (!silent) setErrorPaso(errorPaso2, "");
        return true;
      }

      if (n.length !== 16) {
        if (!silent) setErrorPaso(errorPaso2, tDona("errTarjeta16"));
        return false;
      }
      if (!luhnValido(n)) {
        if (!silent) setErrorPaso(errorPaso2, tDona("errTarjetaLuhn"));
        return false;
      }
      if (!String(nombreTarjeta.value || "").trim()) {
        if (!silent) setErrorPaso(errorPaso2, tDona("errNomTarjeta"));
        return false;
      }
      if (!vencimientoValido(vencimiento.value)) {
        if (!silent) setErrorPaso(errorPaso2, tDona("errVenc"));
        return false;
      }
      if (c.length !== 3) {
        if (!silent) setErrorPaso(errorPaso2, tDona("errCvv3"));
        return false;
      }

      if (!silent) setErrorPaso(errorPaso2, "");
      return true;
    }

    if (metodoPago.value === "transf") {
      if (!checkTransfer.checked) {
        if (!silent) setErrorPaso(errorPaso2, tDona("errTransfer"));
        return false;
      }
      if (!silent) setErrorPaso(errorPaso2, "");
      return true;
    }

    if (!silent) setErrorPaso(errorPaso2, "");
    return true;
  }

  function armarResumen() {
    const p = proyectos.find((x) => x.id === selectProyecto.value);
    const monto = Number(montoFinal.value);

    const metodoTxt =
      ({ tc: tDona("metodoTC"), transf: tDona("metodoTransf") }[metodoPago.value]) || "—";

    let extraPago = "";
    if (metodoPago.value === "tc") {
      const n = limpiarDigitos(numeroTarjeta.value);
      const ult4 = n.slice(-4);
      extraPago = `<div class="item"><span><strong>${tDona("resumenTarjeta")}</strong></span><span>•••• ${ult4}</span></div>`;
    }
    if (metodoPago.value === "transf") {
      extraPago = `<div class="item"><span><strong>${tDona("resumenCBU")}</strong></span><span>${formatoCBU(cbuActual || "")}</span></div>`;
    }

    resumenFinal.innerHTML = `
      <div class="item"><span><strong>${tDona("resumenProyecto")}</strong></span><span>${p ? p.nombre : "—"}</span></div>
      <div class="item"><span><strong>${tDona("resumenMonto")}</strong></span><span>${moneda.format(monto)}</span></div>
      <div class="item"><span><strong>${tDona("resumenNombre")}</strong></span><span>${String(nombreDonante.value || "").trim()}</span></div>
      <div class="item"><span><strong>${tDona("resumenFecha")}</strong></span><span>${fechaNacimiento.value || "—"}</span></div>
      <div class="item"><span><strong>${tDona("resumenResidencia")}</strong></span><span>${String(residencia.value || "").trim()}</span></div>
      <div class="item"><span><strong>${tDona("resumenEmail")}</strong></span><span>${String(emailDonante.value || "").trim()}</span></div>
      <div class="item"><span><strong>${tDona("resumenMetodo")}</strong></span><span>${metodoTxt}</span></div>
      ${extraPago}
    `;
  }

  function aplicarDonacion() {
    const id = selectProyecto.value;
    const monto = Number(montoFinal.value);
    if (!id || !Number.isFinite(monto) || monto <= 0) return;

    const p = proyectos.find((x) => x.id === id);
    if (!p) return;

    p.acumulado = Number(p.acumulado) + Math.round(monto);

    const totales = loadTotales();
    totales[id] = p.acumulado;
    saveTotales(totales);

    actualizarCardProyecto(id);
  }

  function resetWizard() {
    form.reset();
    montoBtns.forEach((b) => b.classList.remove("activo"));
    montoFinal.value = "";
    cbuActual = "";

    document.querySelectorAll(".proy-card").forEach((c) => c.classList.remove("seleccionado"));
    actualizarTituloWizard(null);

    panelTarjeta.hidden = true;
    panelTransf.hidden = true;

    paso1Intentado = false;
    paso2Intentado = false;

    setErrorPaso(errorPaso1, "");
    setErrorPaso(errorPaso2, "");

    irA(1);
  }

  function actualizarEstadoBotones() {
    const stepActivo = pasos.find((p) => p.classList.contains("activo"))?.dataset.step;

    if (btnSiguiente1) {
      const ok1 = validarPaso1({ silent: true });
      btnSiguiente1.disabled = stepActivo !== "1" ? false : !ok1;
    }

    if (btnSiguiente2) {
      const ok2 = validarPaso2({ silent: true });
      btnSiguiente2.disabled = stepActivo !== "2" ? false : !ok2;
    }
  }

  montoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      montoBtns.forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");

      montoOtro.value = "";
      setMonto(btn.dataset.monto);

      if (paso1Intentado) validarPaso1({ silent: false });
      actualizarEstadoBotones();
    });
  });

  montoOtro.addEventListener("input", () => {
    montoBtns.forEach((b) => b.classList.remove("activo"));
    const clean = limpiarDigitos(montoOtro.value);
    montoOtro.value = clean;
    setMonto(clean);

    if (paso1Intentado) validarPaso1({ silent: false });
    actualizarEstadoBotones();
  });

  // Paso 1 realtime
  selectProyecto.addEventListener("change", () => seleccionarProyecto(selectProyecto.value, false));
  [nombreDonante, fechaNacimiento, residencia, emailDonante].forEach((el) => {
    el?.addEventListener("input", () => {
      if (paso1Intentado) validarPaso1({ silent: false });
      actualizarEstadoBotones();
    });
    el?.addEventListener("blur", () => {
      if (paso1Intentado) validarPaso1({ silent: false });
      actualizarEstadoBotones();
    });
  });

  metodoPago.addEventListener("change", () => {
    paso2Intentado = true;

    setErrorPaso(errorPaso2, "");
    cbuActual = "";
    checkTransfer.checked = false;

    numeroTarjeta.value = "";
    nombreTarjeta.value = "";
    vencimiento.value = "";
    cvv.value = "";

    mostrarPanelPago();
    validarPaso2({ silent: false });
    actualizarEstadoBotones();
  });

  [numeroTarjeta, nombreTarjeta, vencimiento, cvv].forEach((el) => {
    el?.addEventListener("input", () => {
      if (paso2Intentado) validarPaso2({ silent: false });
      actualizarEstadoBotones();
    });
    el?.addEventListener("blur", () => {
      if (paso2Intentado) validarPaso2({ silent: false });
      actualizarEstadoBotones();
    });
  });

  checkTransfer?.addEventListener("change", () => {
    if (paso2Intentado) validarPaso2({ silent: false });
    actualizarEstadoBotones();
  });

  btnSiguiente1.addEventListener("click", () => {
    paso1Intentado = true;
    if (!validarPaso1({ silent: false })) {
      actualizarEstadoBotones();
      return;
    }
    irA(2);
  });

  btnAtras2.addEventListener("click", () => irA(1));

  btnSiguiente2.addEventListener("click", () => {
    paso2Intentado = true;
    if (!validarPaso2({ silent: false })) {
      actualizarEstadoBotones();
      return;
    }
    armarResumen();
    irA(3);
  });

  btnAtras3.addEventListener("click", () => irA(2));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    paso1Intentado = true;
    paso2Intentado = true;

    if (!validarPaso1({ silent: false })) {
      irA(1);
      return;
    }
    if (!validarPaso2({ silent: false })) {
      irA(2);
      return;
    }

    aplicarDonacion();
    okMsg.textContent = tDona("ok");

    resetWizard();
  });

  initProyectos();
  renderProyectos();
  irA(1);
  actualizarEstadoBotones();

  // Exponer para que lo refresque el cambio de idioma
  window.__renderProyectosDona = renderProyectos;
})();

window.addEventListener("idioma:cambio", () => {
  if (typeof window.__renderProyectosDona === "function") {
    window.__renderProyectosDona();
  }
});

