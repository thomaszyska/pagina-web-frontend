document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".ventana-proyectos .proyecto"));
  const btnPrev = document.querySelector(".flecha.prev");
  const btnNext = document.querySelector(".flecha.next");

  if (!slides.length || !btnPrev || !btnNext) return;

  let indice = 0;

  const actualizarClases = () => {
    slides.forEach(slide => {
      slide.classList.remove("activo", "prev", "next");
    });

    const total = slides.length;
    const actual = indice;
    const previo = (indice - 1 + total) % total;
    const siguiente = (indice + 1) % total;

    slides[actual].classList.add("activo");
    slides[previo].classList.add("prev");
    slides[siguiente].classList.add("next");
  };

  actualizarClases();

  btnNext.addEventListener("click", () => {
    indice = (indice + 1) % slides.length;
    actualizarClases();
  });

  btnPrev.addEventListener("click", () => {
    indice = (indice - 1 + slides.length) % slides.length;
    actualizarClases();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const valores = [
    {
      titulo: "Sostenibilidad",
      descripcion:
        "Trabajamos con una mirada de largo plazo, respetando los ciclos naturales y promoviendo acciones que permitan que los ecosistemas se recuperen y se mantengan sanos."
    },
    {
      titulo: "Colaboración",
      descripcion:
        "Creemos en la fuerza del trabajo conjunto entre comunidades, voluntarios, científicos, instituciones y organismos públicos. La restauración ambiental solo es posible cuando se construyen redes de apoyo y acción colectiva."
    },
    {
      titulo: "Respeto por la biodiversidad",
      descripcion:
        "Cada especie cumple un rol esencial en el equilibrio del ecosistema. Guiamos todas nuestras acciones por el respeto profundo a la flora, fauna y recursos naturales nativos."
    }
  ];

  const tituloEl = document.getElementById("valor-titulo");
  const descripcionEl = document.getElementById("valor-descripcion");
  const flechaIzq = document.getElementById("flecha-valores-izq");
  const flechaDer = document.getElementById("flecha-valores-der");

  if (!tituloEl || !descripcionEl || !flechaIzq || !flechaDer) return;

  let indice = 0;

  const mostrarValor = () => {
    tituloEl.textContent = valores[indice].titulo;
    descripcionEl.textContent = valores[indice].descripcion;
  };

  mostrarValor();

  flechaDer.addEventListener("click", () => {
    indice = (indice + 1) % valores.length;
    mostrarValor();
  });

  flechaIzq.addEventListener("click", () => {
    indice = (indice - 1 + valores.length) % valores.length;
    mostrarValor();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contacto-formulario form.form");
  if (!form) return;

  const btn = form.querySelector(".btn-enviar");

  const inputNombre = form.querySelector("#nombre-contacto");
  const inputApellido = form.querySelector("#apellido");
  const inputEmail = form.querySelector("#email");
  const selectMotivo = form.querySelector("#motivo");
  const textareaMensaje = form.querySelector("#mensaje");
  const check = form.querySelector(".check input[type='checkbox']");

  const campos = [
    inputNombre,
    inputApellido,
    inputEmail,
    selectMotivo,
    textareaMensaje,
    check
  ].filter(Boolean);

  const asegurarError = () => {
    const targets = form.querySelectorAll(".campo, .checks");
    targets.forEach(t => {
      if (!t.querySelector(".error")) {
        const s = document.createElement("small");
        s.className = "error";
        s.setAttribute("aria-live", "polite");
        t.appendChild(s);
      }
    });
  };

  const setEstado = (el, errorMsg) => {
    const cont = el.closest(".campo") || el.closest(".checks");
    const errorEl = cont ? cont.querySelector(".error") : null;

    const ok = !errorMsg;

    if (!(el.tagName === "INPUT" && el.type === "checkbox")) {
      el.classList.toggle("is-valid", ok);
      el.classList.toggle("is-invalid", !ok);
    }

    if (errorEl) errorEl.textContent = errorMsg || "";
    el.setAttribute("aria-invalid", String(!ok));

    return ok;
  };
  const obtenerIdioma = () => localStorage.getItem("idioma") || "es";

const mensajes = {
  es: {
    nombreObl: "El nombre es obligatorio.",
    nombreMin: "El nombre debe tener al menos 2 caracteres.",
    soloLetras: "Usá solo letras y espacios.",
    apeObl: "El apellido es obligatorio.",
    apeMin: "El apellido debe tener al menos 2 caracteres.",
    emailObl: "El email es obligatorio.",
    emailVal: "Ingresá un email válido.",
    motivoObl: "Elegí un motivo.",
    msgObl: "El mensaje es obligatorio.",
    msgMin: "Contanos un poco más (mínimo 20 caracteres).",
    checkObl: "Tenés que aceptar para que te contactemos."
  },
  en: {
    nombreObl: "First name is required.",
    nombreMin: "First name must be at least 2 characters.",
    soloLetras: "Use letters and spaces only.",
    apeObl: "Last name is required.",
    apeMin: "Last name must be at least 2 characters.",
    emailObl: "Email is required.",
    emailVal: "Please enter a valid email.",
    motivoObl: "Please choose a reason.",
    msgObl: "Message is required.",
    msgMin: "Please write a bit more (minimum 20 characters).",
    checkObl: "You must accept to be contacted."
  }
};

const t = (key) => mensajes[obtenerIdioma()]?.[key] || mensajes.es[key] || "";

    const reglas = {
    nombre: (v) => {
        const value = v.trim();
        if (!value) return t("nombreObl");
        if (value.length < 2) return t("nombreMin");
        const ok = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]+$/.test(value);
        if (!ok) return t("soloLetras");
        return "";
    },
    apellido: (v) => {
        const value = v.trim();
        if (!value) return t("apeObl");
        if (value.length < 2) return t("apeMin");
        const ok = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]+$/.test(value);
        if (!ok) return t("soloLetras");
        return "";
    },
    email: (v) => {
        const value = v.trim();
        if (!value) return t("emailObl");
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        if (!ok) return t("emailVal");
        return "";
    },
    motivo: (v) => (!v ? t("motivoObl") : ""),
    mensaje: (v) => {
        const value = v.trim();
        if (!value) return t("msgObl");
        if (value.length < 20) return t("msgMin");
        return "";
    },
    check: (checked) => (!checked ? t("checkObl") : "")
    };


  const validarUno = el => {
    if (el === inputNombre) return setEstado(el, reglas.nombre(el.value));
    if (el === inputApellido) return setEstado(el, reglas.apellido(el.value));
    if (el === inputEmail) return setEstado(el, reglas.email(el.value));
    if (el === selectMotivo) return setEstado(el, reglas.motivo(el.value));
    if (el === textareaMensaje) return setEstado(el, reglas.mensaje(el.value));
    if (el === check) return setEstado(el, reglas.check(el.checked));
    return true;
  };

  const validarTodo = () => campos.every(validarUno);

  const limpiarEstados = () => {
    form.querySelectorAll(".is-valid, .is-invalid").forEach(el => {
      el.classList.remove("is-valid", "is-invalid");
      el.setAttribute("aria-invalid", "false");
    });
    form.querySelectorAll(".error").forEach(e => (e.textContent = ""));
  };

  asegurarError();

  [inputNombre, inputApellido, inputEmail, textareaMensaje].forEach(el => {
    if (!el) return;
    el.addEventListener("input", () => validarUno(el));
    el.addEventListener("blur", () => validarUno(el));
  });

  if (selectMotivo) {
    selectMotivo.addEventListener("change", () => validarUno(selectMotivo));
    selectMotivo.addEventListener("blur", () => validarUno(selectMotivo));
  }

  if (check) {
    check.addEventListener("change", () => validarUno(check));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!validarTodo()) {
      const primeroMal =
        form.querySelector(".is-invalid") ||
        (!check?.checked ? check : null);
      if (primeroMal?.focus) primeroMal.focus();
      return;
    }

    if (btn) {
      btn.classList.add("enviando");
      btn.disabled = true;
    }

    setTimeout(() => {
      form.reset();
      limpiarEstados();

      if (btn) {
        btn.classList.remove("enviando");
        btn.classList.add("enviado");

        setTimeout(() => {
          btn.classList.remove("enviado");
          btn.disabled = false;
        }, 900);
      }
    }, 650);
});

window.addEventListener("idioma:cambio", () => {
campos.forEach((c) => validarUno(c));
});
});



document.addEventListener("DOMContentLoaded", () => {
  const hasKeys = document.querySelector("[data-i18n], [data-i18n-placeholder], [data-i18n-html]");
  const hasButtons = document.querySelector("[data-lang]");
  if (!hasKeys && !hasButtons) return;

  const i18n = {
    es: {
      titleHome: "Home - Renacer",
      titleProyectos: "Proyectos - Renacer",
      titleDona: "Doná - Renacer",
      titleNosotros: "Nosotros - Renacer",
      titleMapa: "Mapa - Renacer",
      titleContacto: "Contacto - Renacer",

      navProyectos: "PROYECTOS",
      navNosotros: "NOSOTROS",
      navMapa: "MAPA",
      navContacto: "CONTACTO",
      navDona: "DONÁ",

      footerHtml:
        "© 2024 Renacer. Todos los derechos reservados.<br>Trabajo realizado por Thomas Zyska (1226459) - UADE - Desarrollo Web<br>Profesor: Bellanti Emanuel",

      heroTitulo: "Contacto",
      heroTexto:
        "¿Querés sumarte como voluntario, proponer un proyecto o hacer una consulta? Escribinos y te respondemos lo antes posible.",

      asideTitulo: "¡Hablemos!",
      asideEmail: "Email",
      asideTelefono: "Teléfono",
      asideUbicacion: "Ubicación",
      asideCiudad: "Buenos Aires, Argentina",
      asideRedes: "Redes",
      asideHorarios: "Horarios",
      asideHorarioTexto: "Lunes a viernes: 9:00 a 18:00",

      formTitulo: "Enviá tu mensaje",
      lblNombre: "Nombre",
      lblApellido: "Apellido",
      lblEmail: "Email",
      lblMotivo: "Motivo",
      lblMensaje: "Mensaje",
      phNombre: "Tu nombre",
      phApellido: "Tu apellido",
      phEmail: "tu@mail.com",
      phMensaje: "Contanos en qué podemos ayudarte...",
      optElegi: "Elegí una opción",
      optVoluntariado: "Voluntariado",
      optDonaciones: "Donaciones",
      optAlianzas: "Alianzas / Prensa",
      optProyectos: "Proponer un proyecto",
      optOtro: "Otro",
      chkTexto: "Acepto que me contacten para responder esta consulta.",
      btnEnviar: "Enviar",
      nota: "También podés escribirnos directo a",
      mapaTitulo: "Encontranos",

      homeHeroH1: "JUNTOS PODEMOS RENACER",
      homeHeroP: "Recontruiremos todos juntos los ecosistemas arboreos del país",
      homeQueHacemosH3: "¿Que hacemos?",
      homeQueHacemosP:
        'En <span>Renacer</span> trabajamos para devolverle vida a los bosques y ecosistemas de Argentina que han sido afectados por incendios, deforestación y degradación ambiental. Nuestro compromiso es restaurar lo que se perdió, proteger lo que permanece y educar para construir un futuro más verde y sostenible.<br>A través de proyectos de reforestación con especies nativas, programas comunitarios y acciones de conservación, buscamos que cada espacio herido pueda <span>renacer</span>. Porque cuidar la tierra es cuidar nuestro hogar, y juntos podemos volver a darle aire, equilibrio y esperanza al país.',
      homeDestacadosH3: "Nuestros proyectos destacados:",
      homeSobreH3: "Sobre nosotros",
      homeSobreP:
        '<span>Renacer</span> nació como una iniciativa independiente de un pequeño grupo de biólogos, brigadistas forestales y voluntarios que, tras presenciar de cerca los incendios más devastadores del país, decidió convertir la preocupación en <span>acción</span> concreta. Lo que empezó como jornadas de recolección de semillas y plantaciones comunitarias se transformó, con el tiempo, en una organización formal comprometida con la restauración ambiental en todo el territorio argentino.<br>Creemos en el trabajo colaborativo, en la ciencia aplicada y en la fuerza de las comunidades locales para proteger y recuperar los ecosistemas nativos. Nuestro enfoque combina investigación ecológica, educación, participación ciudadana y alianzas con especialistas que comparten la misma visión: devolverle vida a los lugares que alguna vez la perdieron.<br>En <span>Renacer</span> no solo restauramos naturaleza: también impulsamos un cambio cultural. Promovemos una nueva relación con la tierra, más consciente, más respetuosa y más sostenible. Porque para nosotros, cada árbol y cada bosque recuperado es una oportunidad de volver a empezar.',
      homeLeerMas: "LEER MÁS...",
      homeNewsH3: "Suscribite<br>a nuestro Newsletter",
      homeNewsP:
        "Recibí las últimas novedades sobre nuestros proyectos, eventos y formas de colaborar directamente en tu correo electrónico.",
      homeNewsPh: "Ingresa tu email",
      homeNewsBtn: "Suscribirme",
      homeDonH3: "Donaciones",
      homeDonP:
        "Recibí las últimas novedades sobre nuestros proyectos, eventos y formas de colaborar directamente en tu correo electrónico.",
      homeDonLink: "Enterate más",

      homeCard_delta_h4: "Delta del Paraná",
      homeCard_delta_p:
        "Los incendios en el Delta del Paraná devastaron miles de hectáreas de humedales. En este artículo contamos qué ocurrió y cómo Renacer trabajará para recuperar este ecosistema.",
      homeCard_delta_a: "Leer Más",

      homeCard_cordoba_h4: "Córdoba",
      homeCard_cordoba_p:
        "Los incendios en el Delta del Paraná devastaron miles de hectáreas de humedales. En este artículo contamos qué ocurrió y cómo Renacer trabajará para recuperar este ecosistema.",
      homeCard_cordoba_a: "Leer Más",

      homeCard_patagonia_h4: "Patagonia",
      homeCard_patagonia_p:
        "Los incendios en el Delta del Paraná devastaron miles de hectáreas de humedales. En este artículo contamos qué ocurrió y cómo Renacer trabajará para recuperar este ecosistema.",
      homeCard_patagonia_a: "Leer Más",

      homeCard_corrientes_h4: "Corrientes",
      homeCard_corrientes_p:
        "Los incendios en el Delta del Paraná devastaron miles de hectáreas de humedales. En este artículo contamos qué ocurrió y cómo Renacer trabajará para recuperar este ecosistema.",
      homeCard_corrientes_a: "Leer Más",

      homeCard_lapampa_h4: "La Pampa",
      homeCard_lapampa_p:
        "Los incendios en el Delta del Paraná devastaron miles de hectáreas de humedales. En este artículo contamos qué ocurrió y cómo Renacer trabajará para recuperar este ecosistema.",
      homeCard_lapampa_a: "Leer Más",

      proyTag: "Renacer · Proyectos",
      proyH1: "Proyectos activos",
      proyBajada:
        "Explorá los proyectos de restauración ecológica en Argentina. Podés buscar por nombre, región o ecosistema.",
      proyBuscarLabel: "Buscar",
      proyBuscarPh: "Ej: Delta, Patagonia, humedales, Córdoba…",
      proyDisponibles: "proyectos disponibles",
      chipTodos: "Todos",
      chipHumedales: "Humedales",
      chipBosque: "Bosque nativo",
      chipPastizales: "Pastizales",
      chipEstepa: "Estepa",
      chipIncendios: "Incendios",
      proyCtaDonar: "Donar",
      proyCtaMapa: "Ver en el mapa",
      proyListaH2: "Lista de proyectos",
      proyListaP: "Abrí cada proyecto para ver objetivos, acciones, avances y cómo colaborar.",
      proySinResultados:
        "No encontramos proyectos con esos filtros. Probá con otra búsqueda o volvé a “Todos”.",
      proyComoH2: "¿Cómo elegimos dónde intervenir?",
      proyComoP:
        "Priorizamos sitios con alto valor ecológico y presión ambiental (incendios, pérdida de cobertura, invasoras), y donde sea posible trabajar con comunidades, instituciones y voluntariado para sostener el impacto en el tiempo.",
      proyPunto1: "Diagnóstico del área y plan de restauración.",
      proyPunto2: "Recolección/producción de plantines nativos.",
      proyPunto3: "Monitoreo, mantenimiento y transparencia de resultados.",

      nosQuienesH3: "Quiénes somos",
      nosQuienesP:
        '<span>Renacer</span> es una organización argentina dedicada a la restauración de bosques nativos, humedales y ecosistemas degradados por incendios y deforestación. Trabajamos con ciencia, compromiso social y una visión clara: reconstruir los paisajes naturales del país para que las futuras generaciones hereden un territorio sano y vivo.',
      nosHistoriaH3: "Nuestra historia",
      nosHistoriaP:
        'La ONG <span>Renacer</span> nació como respuesta a algunos de los incendios más devastadores ocurridos en distintas provincias del país. Frente a paisajes arrasados y comunidades afectadas, un grupo de biólogos, brigadistas forestales y voluntarios decidió unirse con un objetivo claro: no limitarse a apagar el fuego, sino trabajar activamente para <span>recuperar lo que se había perdido.</span><br><br>Los primeros pasos fueron modestos pero significativos. Comenzamos organizando pequeñas jornadas de plantación comunitaria, recolección de semillas nativas y acciones de concientización ambiental en zonas afectadas. Con el tiempo, estas iniciativas crecieron y se consolidaron gracias al compromiso de personas, instituciones y comunidades que compartían la misma preocupación por el futuro de los ecosistemas.<br><br>Hoy, Renacer coordina proyectos de restauración ecológica en diferentes regiones del país, impulsa alianzas con organizaciones públicas y privadas, y desarrolla programas de educación ambiental orientados a fortalecer el vínculo entre las personas y su entorno natural. Nuestra historia está marcada por la convicción de que <span>la regeneración es posible</span> cuando el conocimiento, la acción colectiva y el compromiso a largo plazo se encuentran.',
      nosMisionH3: "Misión",
      nosMisionP:
        'Trabajamos para restaurar y proteger los ecosistemas nativos de Argentina afectados por incendios y deforestación, mediante reforestación con especies autóctonas, investigación ambiental, educación comunitaria y acciones de prevención.<br><br>Promovemos el cuidado responsable de la tierra y el desarrollo de proyectos sostenibles que permitan que la naturaleza vuelva a <span>renacer</span>.',
      nosVisionH3: "Visión",
      nosVisionP:
        "Ser una organización líder en la regeneración ecológica del país, reconocida por impulsar la recuperación de bosques y humedales, fortalecer la conciencia ambiental y construir comunidades que vivan en equilibrio con su entorno.<br><br>Aspiramos a un futuro en el que cada ecosistema dañado pueda recuperar su vitalidad y biodiversidad.",
      nosValoresH3: "Valores",
      nosEquipoH3: "Nuestro equipo",
      nosEquipoP:
        'El equipo de <span>Renacer</span> está conformado por profesionales de la biología, la ingeniería forestal, la comunicación, el trabajo social y el voluntariado, junto a comunidades locales que se suman activamente en cada proyecto. Creemos en el valor del conocimiento técnico aplicado con sensibilidad social y compromiso territorial.<br><br>Trabajamos de manera interdisciplinaria, combinando ciencia, planificación y acción en territorio para garantizar que cada proceso de restauración tenga un impacto real y sostenible en el tiempo. Desde el diagnóstico ambiental hasta la reforestación y el seguimiento de los ecosistemas, cada etapa es pensada de forma responsable y participativa.<br><br>Entendemos que la restauración ambiental es un trabajo colectivo: cada persona involucrada, cada árbol plantado y cada acción cuenta. Por eso promovemos la participación activa de voluntarios, organizaciones y comunidades, fortaleciendo redes de cooperación que permiten que los ecosistemas del país puedan <span>volver a vivir y proyectarse hacia el futuro.</span>',
      nosTranspH3: "Transparencia",
      nosTranspP:
        'En <span>Renacer</span> creemos que la confianza se construye con información clara y accesible. Por eso trabajamos con un fuerte compromiso con la transparencia en cada una de nuestras acciones.<br><br>Comunicamos de manera abierta el origen y destino de nuestros recursos, los proyectos que desarrollamos y los resultados que obtenemos. Entendemos la rendición de cuentas como una responsabilidad fundamental hacia las comunidades con las que trabajamos, las personas que nos apoyan y el entorno que buscamos proteger.<br><br>Nuestro objetivo es que cada aporte, cada decisión y cada proyecto puedan ser comprendidos y acompañados por quienes confían en nuestro trabajo.',

      mapProvTitulo: "Elegí una provincia",
      mapProvTexto: "Pasá el mouse y hacé clic sobre una provincia para ver el proyecto asociado.",
      mapAclaratorio: 'En <span>ROJO</span>, se encuentran las provincias en las que actualmente operamos.',

      donaHeroH1: "<span>Doná</span> a Renacer",
      donaHeroP:
        "Tu aporte se transforma en árboles, mantenimiento y recuperación de ecosistemas.<br>Elegí un proyecto, seleccioná el monto y completá los 3 pasos.<br>Luego le enviaremos un email a su correo con el comprobante de donación y los detalles de utilizacion de los fondos.",
      donaAcumH2: "Acumulado por proyecto",
      donaAcumSub: "Los fondos recaudados se destinan íntegramente a los proyectos seleccionados.",
      donaWizardTitulo: "Donación (3 pasos)",
      donaStepInfo: "Información",
      donaStepPago: "Pago",
      donaStepConf: "Confirmación",
      donaP1H3: "1) Elegí el proyecto",
      donaP1Mini: "Seleccioná uno de los paneles de arriba (o elegilo acá).",
      donaProyectoLbl: "Proyecto",
      donaProyectoOpt: "Elegí un proyecto…",
      donaP2H3: "2) ¿Cuánto querés donar?",
      donaP2Mini: "Usamos pesos argentinos (ARS).",
      donaOtroMontoLbl: "Otro monto",
      donaOtroMontoPh: "Ej: 7500",
      donaP3H3: "3) Datos del donante",
      donaNombreLbl: "Nombre completo",
      donaNombrePh: "Nombre y apellido",
      donaFechaLbl: "Fecha de nacimiento",
      donaResidLbl: "Lugar de residencia",
      donaResidPh: "Ej: Palermo, CABA",
      donaEmailLbl: "Email",
      donaEmailPh: "tu@mail.com",
      donaBtnContinuar: "Continuar",
      donaPagoH3: "Información de pago",
      donaPagoMini: "Validación de formato (demo). No se envía nada: es solo frontend.",
      donaMetodoLbl: "Método",
      donaMetodoOpt: "Seleccioná un método…",
      donaMetodoTc: "Tarjeta",
      donaMetodoTransf: "Transferencia",
      donaNumTarjetaLbl: "Número de tarjeta",
      donaNumTarjetaPh: "16 dígitos",
      donaNombreTarjetaLbl: "Nombre en la tarjeta",
      donaNombreTarjetaPh: "Como figura en la tarjeta",
      donaVencLbl: "Vencimiento",
      donaVencPh: "MM/AA",
      donaCvvLbl: "Código de seguridad",
      donaCvvPh: "3 dígitos",
      donaDemoTarjeta:
        'Demo: si completás <strong>todo con ceros</strong> (0000… en tarjeta, 00/00, 000) deja pasar.',
      donaTransfP: "Transferí al siguiente CBU (generado para demo):",
      donaTransfCheck: "Ya realicé la transferencia (demo)",
      donaBtnAtras: "Atrás",
      donaBtnRevisar: "Revisar",
      donaConfH3: "Confirmación",
      donaConfMini: "Revisá el resumen. El botón final es “simulado”.",
      donaBtnConfirmar: "Confirmar donación"
    },

    en: {
      titleHome: "Home - Renacer",
      titleProyectos: "Projects - Renacer",
      titleDona: "Donate - Renacer",
      titleNosotros: "About - Renacer",
      titleMapa: "Map - Renacer",
      titleContacto: "Contact - Renacer",

      navProyectos: "PROJECTS",
      navNosotros: "ABOUT US",
      navMapa: "MAP",
      navContacto: "CONTACT",
      navDona: "DONATE",

      footerHtml:
        "© 2024 Renacer. All rights reserved.<br>Project by Thomas Zyska (1226459) - UADE - Web Development<br>Professor: Bellanti Emanuel",

      heroTitulo: "Contact",
      heroTexto:
        "Do you want to volunteer, propose a project, or ask a question? Write to us and we’ll get back to you as soon as possible.",

      asideTitulo: "Let’s talk!",
      asideEmail: "Email",
      asideTelefono: "Phone",
      asideUbicacion: "Location",
      asideCiudad: "Buenos Aires, Argentina",
      asideRedes: "Social",
      asideHorarios: "Hours",
      asideHorarioTexto: "Monday to Friday: 9:00 to 18:00",

      formTitulo: "Send your message",
      lblNombre: "First name",
      lblApellido: "Last name",
      lblEmail: "Email",
      lblMotivo: "Reason",
      lblMensaje: "Message",
      phNombre: "Your first name",
      phApellido: "Your last name",
      phEmail: "you@mail.com",
      phMensaje: "Tell us how we can help...",
      optElegi: "Choose an option",
      optVoluntariado: "Volunteering",
      optDonaciones: "Donations",
      optAlianzas: "Partnerships / Press",
      optProyectos: "Propose a project",
      optOtro: "Other",
      chkTexto: "I agree to be contacted to reply to this request.",
      btnEnviar: "Send",
      nota: "You can also email us at",
      mapaTitulo: "Find us",

      homeHeroH1: "TOGETHER, WE CAN RISE AGAIN",
      homeHeroP: "Together we will restore Argentina’s forest ecosystems",
      homeQueHacemosH3: "What do we do?",
      homeQueHacemosP:
        'At <span>Renacer</span>, we work to bring life back to Argentina’s forests and ecosystems affected by wildfires, deforestation, and environmental degradation. Our commitment is to restore what was lost, protect what remains, and educate to build a greener and more sustainable future.<br>Through native reforestation projects, community programs, and conservation actions, we help every wounded place <span>rise again</span>. Caring for the land is caring for our home—and together we can bring back air, balance, and hope.',
      homeDestacadosH3: "Featured projects:",
      homeSobreH3: "About us",
      homeSobreP:
        '<span>Renacer</span> began as an independent initiative by a small group of biologists, forest brigadiers, and volunteers who, after witnessing the country’s most devastating fires, decided to turn concern into concrete <span>action</span>. What started as community planting and native seed collection became, over time, a formal organization committed to environmental restoration across Argentina.<br>We believe in collaborative work, applied science, and the strength of local communities to protect and recover native ecosystems. Our approach combines ecological research, education, citizen participation, and partnerships with specialists who share the same vision: bringing life back to places that once lost it.<br>At <span>Renacer</span>, we don’t just restore nature—we also promote a cultural shift toward a more conscious, respectful, and sustainable relationship with the land.',
      homeLeerMas: "READ MORE...",
      homeNewsH3: "Subscribe<br>to our Newsletter",
      homeNewsP:
        "Get the latest updates on our projects, events, and ways to collaborate—delivered to your inbox.",
      homeNewsPh: "Enter your email",
      homeNewsBtn: "Subscribe",
      homeDonH3: "Donations",
      homeDonP:
        "Get the latest updates on our projects, events, and ways to collaborate—delivered to your inbox.",
      homeDonLink: "Learn more",

      homeCard_delta_h4: "Paraná Delta",
      homeCard_delta_p:
        "Fires in the Paraná Delta devastated thousands of hectares of wetlands. In this article we explain what happened and how Renacer will help restore this ecosystem.",
      homeCard_delta_a: "Read more",

      homeCard_cordoba_h4: "Córdoba",
      homeCard_cordoba_p:
        "Wildfires have severely impacted Córdoba’s native ecosystems. In this article we explain what happened and how Renacer will work on restoration.",
      homeCard_cordoba_a: "Read more",

      homeCard_patagonia_h4: "Patagonia",
      homeCard_patagonia_p:
        "Recent fires affected vast areas of Patagonia. In this article we explain what happened and how Renacer will support ecological recovery.",
      homeCard_patagonia_a: "Read more",

      homeCard_corrientes_h4: "Corrientes",
      homeCard_corrientes_p:
        "Fires and drought conditions impacted Corrientes’ ecosystems. In this article we explain what happened and how Renacer will help restore them.",
      homeCard_corrientes_a: "Read more",

      homeCard_lapampa_h4: "La Pampa",
      homeCard_lapampa_p:
        "Environmental pressure has affected areas of La Pampa. In this article we explain what happened and how Renacer will contribute to restoration.",
      homeCard_lapampa_a: "Read more",

      proyTag: "Renacer · Projects",
      proyH1: "Active projects",
      proyBajada:
        "Explore ecological restoration projects across Argentina. You can search by name, region, or ecosystem.",
      proyBuscarLabel: "Search",
      proyBuscarPh: "E.g.: Delta, Patagonia, wetlands, Córdoba…",
      proyDisponibles: "available projects",
      chipTodos: "All",
      chipHumedales: "Wetlands",
      chipBosque: "Native forest",
      chipPastizales: "Grasslands",
      chipEstepa: "Steppe",
      chipIncendios: "Wildfires",
      proyCtaDonar: "Donate",
      proyCtaMapa: "View on the map",
      proyListaH2: "Project list",
      proyListaP: "Open each project to see goals, actions, progress, and how to help.",
      proySinResultados:
        "No projects found for those filters. Try another search or go back to “All”.",
      proyComoH2: "How do we choose where to act?",
      proyComoP:
        "We prioritize areas with high ecological value and environmental pressure (wildfires, loss of cover, invasive species), and where we can work with communities, institutions, and volunteers to sustain long-term impact.",
      proyPunto1: "Area assessment and restoration plan.",
      proyPunto2: "Collecting/producing native seedlings.",
      proyPunto3: "Monitoring, maintenance, and transparent reporting.",

      nosQuienesH3: "Who we are",
      nosQuienesP:
        "<span>Renacer</span> is an Argentine organization dedicated to restoring native forests, wetlands, and ecosystems degraded by wildfires and deforestation. We work with science, social commitment, and a clear vision: rebuilding natural landscapes so future generations inherit a healthy, living territory.",
      nosHistoriaH3: "Our story",
      nosHistoriaP:
        'The NGO <span>Renacer</span> was born in response to some of the most devastating wildfires across the country. Faced with scorched landscapes and affected communities, a group of biologists, forest brigadiers, and volunteers united with a clear goal: not only to fight fires, but to actively <span>recover what was lost.</span><br><br>Our first steps were modest but meaningful—community planting days, native seed collection, and awareness actions in impacted areas. Over time, these initiatives grew through the support of people, institutions, and communities concerned about the future of ecosystems.<br><br>Today, Renacer coordinates restoration projects across different regions, builds partnerships with public and private organizations, and develops environmental education programs to strengthen the bond between people and nature.',
      nosMisionH3: "Mission",
      nosMisionP:
        "We work to restore and protect Argentina’s native ecosystems affected by wildfires and deforestation through native reforestation, environmental research, community education, and prevention actions.<br><br>We promote responsible land stewardship and sustainable projects so nature can <span>rise again</span>.",
      nosVisionH3: "Vision",
      nosVisionP:
        "To be a leading organization in ecological regeneration, recognized for restoring forests and wetlands, strengthening environmental awareness, and building communities that live in balance with their surroundings.<br><br>We envision a future where every damaged ecosystem can recover its vitality and biodiversity.",
      nosValoresH3: "Values",
      nosEquipoH3: "Our team",
      nosEquipoP:
        "The <span>Renacer</span> team includes professionals in biology, forest engineering, communication, social work, and volunteers—along with local communities that actively join each project.<br><br>We work interdisciplinarily, combining science, planning, and field action to ensure each restoration process creates real, lasting impact.<br><br>Restoration is collective work: every person involved, every tree planted, and every action matters.",
      nosTranspH3: "Transparency",
      nosTranspP:
        "At <span>Renacer</span>, we believe trust is built with clear, accessible information. That’s why transparency is central to everything we do.<br><br>We communicate openly how resources are obtained and used, which projects we develop, and the results we achieve.<br><br>Our goal is that every contribution, decision, and project can be understood and supported by those who trust our work.",

      mapProvTitulo: "Choose a province",
      mapProvTexto: "Hover and click a province to see the associated project.",
      mapAclaratorio: 'In <span>RED</span> you can see the provinces where we currently operate.',

      donaHeroH1: "<span>Donate</span> to Renacer",
      donaHeroP:
        "Your contribution becomes trees, maintenance, and ecosystem recovery.<br>Choose a project, select an amount, and complete the 3 steps.<br>Then we will email you a donation receipt and details on how funds are used.",
      donaAcumH2: "Raised by project",
      donaAcumSub: "Funds raised are allocated entirely to the selected projects.",
      donaWizardTitulo: "Donation (3 steps)",
      donaStepInfo: "Info",
      donaStepPago: "Payment",
      donaStepConf: "Confirmation",
      donaP1H3: "1) Choose the project",
      donaP1Mini: "Select one of the panels above (or choose it here).",
      donaProyectoLbl: "Project",
      donaProyectoOpt: "Choose a project…",
      donaP2H3: "2) How much would you like to donate?",
      donaP2Mini: "We use Argentine pesos (ARS).",
      donaOtroMontoLbl: "Other amount",
      donaOtroMontoPh: "E.g.: 7500",
      donaP3H3: "3) Donor details",
      donaNombreLbl: "Full name",
      donaNombrePh: "First and last name",
      donaFechaLbl: "Date of birth",
      donaResidLbl: "Place of residence",
      donaResidPh: "E.g.: Palermo, CABA",
      donaEmailLbl: "Email",
      donaEmailPh: "you@mail.com",
      donaBtnContinuar: "Continue",
      donaPagoH3: "Payment info",
      donaPagoMini: "Format validation (demo). Nothing is sent: frontend only.",
      donaMetodoLbl: "Method",
      donaMetodoOpt: "Choose a method…",
      donaMetodoTc: "Card",
      donaMetodoTransf: "Bank transfer",
      donaNumTarjetaLbl: "Card number",
      donaNumTarjetaPh: "16 digits",
      donaNombreTarjetaLbl: "Name on card",
      donaNombreTarjetaPh: "As shown on the card",
      donaVencLbl: "Expiry",
      donaVencPh: "MM/YY",
      donaCvvLbl: "Security code",
      donaCvvPh: "3 digits",
      donaDemoTarjeta:
        'Demo: if you fill <strong>everything with zeros</strong> (0000… card, 00/00, 000) it will pass.',
      donaTransfP: "Transfer to the following CBU (demo-generated):",
      donaTransfCheck: "I already made the transfer (demo)",
      donaBtnAtras: "Back",
      donaBtnRevisar: "Review",
      donaConfH3: "Confirmation",
      donaConfMini: "Review the summary. The final button is “simulated”.",
      donaBtnConfirmar: "Confirm donation"
    }
  };

  const aplicarIdioma = (lang) => {
    const dic = i18n[lang] || i18n.es;

    document.documentElement.setAttribute("lang", lang);

    // data-i18n -> text
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dic[key] != null) el.textContent = dic[key];
    });

    // data-i18n-placeholder -> placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dic[key] != null) el.setAttribute("placeholder", dic[key]);
    });

    // data-i18n-html -> html
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (dic[key] != null) el.innerHTML = dic[key];
    });

    // botones
    document.querySelectorAll(".idioma-btn[data-lang]").forEach((b) => {
      const activo = b.getAttribute("data-lang") === lang;
      b.setAttribute("aria-pressed", activo ? "true" : "false");
      b.classList.toggle("activo", activo);
    });

    localStorage.setItem("idioma", lang);

    // avisa a otros módulos (ej: validaciones)
    window.dispatchEvent(new CustomEvent("idioma:cambio", { detail: { lang } }));

    window.renderizarProyectos = renderizarProyectos;

  };

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => aplicarIdioma(btn.getAttribute("data-lang")));
  });

  aplicarIdioma(localStorage.getItem("idioma") || "es");
});

window.addEventListener("idioma:cambio", () => {
  if (typeof window.renderizarProyectos === "function") {
    window.renderizarProyectos();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburguesa');
  const nav = document.getElementById('menu-principal');
  const overlay = document.querySelector('[data-menu-overlay]');
  const cerrarBtn = document.querySelector('.menu-cerrar');

  // Si la página no tiene menú hamburguesa, no rompe nada
  if (!btn || !nav || !overlay) return;

  const abrir = () => {
    nav.classList.add('abierto');
    overlay.classList.add('visible');
    btn.classList.add('abierto');
    btn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  const cerrar = () => {
    nav.classList.remove('abierto');
    overlay.classList.remove('visible');
    btn.classList.remove('abierto');
    btn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', () => {
    nav.classList.contains('abierto') ? cerrar() : abrir();
  });

  overlay.addEventListener('click', cerrar);

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrar));

  if (cerrarBtn) cerrarBtn.addEventListener('click', cerrar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrar();
  });
});

