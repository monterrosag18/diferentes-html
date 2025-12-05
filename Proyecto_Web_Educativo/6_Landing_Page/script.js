/* 
  ===============================
  ARCHIVO: script.js
  CARPETA: 6_Landing_Page
  PROPÓSITO: Interactividad para landing page
  
  FUNCIONALIDADES:
  - Modal de registro
  - Validación de formulario
  - Envío de datos
  - Smooth scroll
  - Animaciones en scroll
  - Manejo de eventos
  
  ===============================
*/

// ========== VARIABLES GLOBALES ==========

// Elemento del modal
const modalFormulario = document.querySelector(".modal-formulario");

// Elemento del overlay
const overlayModal = document.querySelector(".overlay-modal");

// Elemento del formulario
const formularioRegistro = document.querySelector("#formulario-registro");

// Array de todos los botones CTA (Call To Action)
const botonesCTA = document.querySelectorAll(".btn-cta-navbar, .btn-primario");

// ========== INICIALIZACIÓN ==========

// Se ejecuta cuando la página está lista
document.addEventListener("DOMContentLoaded", function () {
  // Agregar event listeners a los botones
  agregarEventListeners();
});

// ========== AGREGAR EVENT LISTENERS ==========

function agregarEventListeners() {
  // ========== BOTONES ABRIR MODAL ==========

  // Seleccionar todos los botones que dicen "Comienza Ahora" o "Registrarse"
  const botonesAbrir = document.querySelectorAll(
    ".btn-cta-navbar, .hero .btn-primario, .cta-final .btn-primario"
  );

  // Para cada botón, agregar evento click
  botonesAbrir.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      abrirModal();
    });
  });

  // ========== BOTÓN CERRAR MODAL ==========

  const cerrarModalBtn = document.querySelector(".cerrar-modal-form");
  if (cerrarModalBtn) {
    cerrarModalBtn.addEventListener("click", cerrarModal);
  }

  // ========== OVERLAY - CLICK PARA CERRAR ==========

  if (overlayModal) {
    overlayModal.addEventListener("click", cerrarModal);
  }

  // ========== FORMULARIO SUBMIT ==========

  if (formularioRegistro) {
    formularioRegistro.addEventListener("submit", manejarSubmitFormulario);
  }

  // ========== SMOOTH SCROLL - LINKS INTERNOS ==========

  // Seleccionar todos los links de navegación
  const linksNavegacion = document.querySelectorAll("a[href^='#']");

  linksNavegacion.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Obtener el ID del destino
      const targetId = this.getAttribute("href");

      // Si es solo "#", no hacer nada
      if (targetId === "#") return;

      // Prevenir comportamiento por defecto
      e.preventDefault();

      // Encontrar el elemento destino
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // El scroll ya es suave por el CSS (scroll-behavior: smooth)
        // Simplemente es un ejemplo de cómo se haría manualmente
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ========== ABRIR MODAL ==========

function abrirModal() {
  // Mostrar modal y overlay
  modalFormulario.classList.add("activo");
  overlayModal.classList.add("activo");

  // Opcional: deshabilitar scroll del body
  document.body.style.overflow = "hidden";
}

// ========== CERRAR MODAL ==========

function cerrarModal() {
  // Ocultar modal y overlay
  modalFormulario.classList.remove("activo");
  overlayModal.classList.remove("activo");

  // Habilitar scroll del body nuevamente
  document.body.style.overflow = "auto";

  // Limpiar formulario (opcional)
  if (formularioRegistro) {
    formularioRegistro.reset();
  }
}

// ========== MANEJAR SUBMIT DEL FORMULARIO ==========

function manejarSubmitFormulario(e) {
  // Prevenir envío por defecto del formulario
  e.preventDefault();

  // Obtener valores del formulario
  const nombre = document.querySelector("#nombre").value.trim();
  const email = document.querySelector("#email").value.trim();
  const empresa = document.querySelector("#empresa").value.trim();
  const contrasena = document.querySelector("#contrasena").value;
  const terminos = document.querySelector("#terminos").checked;

  // ========== VALIDAR DATOS ==========

  // Validar que nombre no esté vacío
  if (nombre.length < 3) {
    mostrarMensajeValidacion("El nombre debe tener al menos 3 caracteres", "error");
    return;
  }

  // Validar formato de email
  if (!validarEmail(email)) {
    mostrarMensajeValidacion("Por favor ingresa un email válido", "error");
    return;
  }

  // Validar contraseña (mínimo 8 caracteres)
  if (contrasena.length < 8) {
    mostrarMensajeValidacion(
      "La contraseña debe tener al menos 8 caracteres",
      "error"
    );
    return;
  }

  // Validar que haya aceptado términos
  if (!terminos) {
    mostrarMensajeValidacion("Debes aceptar los términos y condiciones", "error");
    return;
  }

  // ========== Si todo es válido, procesar registro ==========

  // Mostrar mensaje de éxito
  mostrarMensajeValidacion("¡Registro exitoso! Te enviaremos un email.", "exito");

  // Aquí normalmente harías una petición AJAX/Fetch a un servidor
  // Por ejemplo:
  /*
  fetch('/api/registrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre: nombre,
      email: email,
      empresa: empresa,
      contrasena: contrasena
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      mostrarMensajeValidacion("Registro exitoso", "exito");
      setTimeout(() => {
        cerrarModal();
      }, 2000);
    } else {
      mostrarMensajeValidacion(data.mensaje, "error");
    }
  })
  */

  // Por ahora, solo simulamos el éxito
  // Guardar datos en localStorage para demostración
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push({
    nombre: nombre,
    email: email,
    empresa: empresa,
    fecha: new Date().toLocaleString(),
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Cerrar modal después de 2 segundos
  setTimeout(() => {
    cerrarModal();
  }, 2000);
}

// ========== VALIDAR EMAIL ==========

// Función para validar que un email tenga formato válido
function validarEmail(email) {
  // Expresión regular para validar email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ========== MOSTRAR MENSAJE DE VALIDACIÓN ==========

// Función para mostrar mensajes de error o éxito
function mostrarMensajeValidacion(mensaje, tipo = "error") {
  // Crear elemento para el mensaje
  const div = document.createElement("div");

  // Añadir clases según el tipo
  if (tipo === "error") {
    div.style.cssText = `
      padding: 12px 15px;
      margin-bottom: 15px;
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      border-radius: 5px;
      font-size: 0.9rem;
      animation: slideDown 0.3s ease;
    `;
  } else if (tipo === "exito") {
    div.style.cssText = `
      padding: 12px 15px;
      margin-bottom: 15px;
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
      border-radius: 5px;
      font-size: 0.9rem;
      animation: slideDown 0.3s ease;
    `;
  }

  // Establecer el texto del mensaje
  div.textContent = mensaje;

  // Encontrar el contenedor de contenido modal
  const contenidoModal = document.querySelector(".contenido-modal-form");

  // Insertar el mensaje al inicio del contenedor
  contenidoModal.insertBefore(div, contenidoModal.firstChild);

  // Eliminar el mensaje después de 5 segundos
  setTimeout(() => {
    div.remove();
  }, 5000);
}

// ========== ANIMACIÓN SCROLL ==========

// Opcional: Animar elementos cuando llegan a la vista
// Esto es avanzado pero muestra cómo hacer animaciones on-scroll

document.addEventListener("DOMContentLoaded", function () {
  // Crear un Intersection Observer para detectar cuándo los elementos entran a la vista
  const observador = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      // Si el elemento es visible en el viewport
      if (entry.isIntersecting) {
        // Agregar clase de animación
        entry.target.style.animation = "fadeInUp 0.6s ease forwards";

        // Opcional: dejar de observar después de animar
        observador.unobserve(entry.target);
      }
    });
  });

  // Observar todas las tarjetas de características
  const tarjetas = document.querySelectorAll(
    ".tarjeta-caracteristica, .tarjeta-precio, .tarjeta-testimonio"
  );

  tarjetas.forEach((tarjeta, index) => {
    // Agregar un pequeño delay para cada tarjeta
    tarjeta.style.opacity = "0";
    observador.observe(tarjeta);
  });
});

// ========== CERRAR MODAL CON ESCAPE ==========

// Permitir cerrar modal presionando la tecla Escape
document.addEventListener("keydown", function (e) {
  // Si presionó Escape
  if (e.key === "Escape") {
    // Si el modal está visible
    if (modalFormulario.classList.contains("activo")) {
      // Cerrar modal
      cerrarModal();
    }
  }
});

// ========== VALIDACIÓN EN TIEMPO REAL ==========

// Validar email mientras el usuario escribe (opcional)
const inputEmail = document.querySelector("#email");
if (inputEmail) {
  inputEmail.addEventListener("blur", function () {
    // Si el email no es válido cuando pierde el foco
    if (this.value && !validarEmail(this.value)) {
      this.style.borderColor = "#f8d7da";
      this.style.backgroundColor = "#fff5f5";
    } else {
      this.style.borderColor = "";
      this.style.backgroundColor = "";
    }
  });
}

// Validar contraseña mientras escribe
const inputContrasena = document.querySelector("#contrasena");
if (inputContrasena) {
  inputContrasena.addEventListener("input", function () {
    // Cambiar color según fortaleza de contraseña
    if (this.value.length < 6) {
      this.style.borderColor = "#f8d7da";
    } else if (this.value.length < 10) {
      this.style.borderColor = "#ffc107";
    } else {
      this.style.borderColor = "#28a745";
    }
  });
}

// ========== AGREGAR ANIMACIÓN CSS DINÁMICAMENTE ==========

// Crear estilos de animación si no existen
if (!document.querySelector("style[data-animaciones]")) {
  const style = document.createElement("style");
  style.setAttribute("data-animaciones", "true");
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}
