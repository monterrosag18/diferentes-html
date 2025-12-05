/* 
  ===============================
  ARCHIVO: script.js
  CARPETA: 5_Galeria_Interactiva
  PROPÓSITO: Lógica interactiva para galería
  
  FUNCIONALIDADES:
  - Array de imágenes con metadata
  - Filtrado por categoría
  - Dos vistas: Grid y Masonry
  - Modal lightbox con navegación
  - Soporte para teclado (flechas)
  - Transiciones suaves
  
  ===============================
*/

// ========== ARRAY DE IMÁGENES ==========

// Este array contiene todas las imágenes de la galería
// Cada imagen tiene: id, título, descripción, categoría y emoji (simulando imagen)
const imagenes = [
  {
    id: 1,
    titulo: "Montaña Nevada",
    descripcion: "Paisaje alpino con nieve y cielo azul",
    categoria: "naturaleza",
    emoji: "⛰️",
  },
  {
    id: 2,
    titulo: "Bosque Verde",
    descripcion: "Árboles altos en bosque tropical",
    categoria: "naturaleza",
    emoji: "🌲",
  },
  {
    id: 3,
    titulo: "Atardecer",
    descripcion: "Puesta de sol sobre el océano",
    categoria: "naturaleza",
    emoji: "🌅",
  },
  {
    id: 4,
    titulo: "Calle Urbana",
    descripcion: "Calles concurridas de la ciudad",
    categoria: "urbano",
    emoji: "🏙️",
  },
  {
    id: 5,
    titulo: "Tienda Nocturna",
    descripcion: "Comercio iluminado en la noche",
    categoria: "urbano",
    emoji: "🌆",
  },
  {
    id: 6,
    titulo: "Tráfico Vehicular",
    descripcion: "Avenida llena de automóviles",
    categoria: "urbano",
    emoji: "🚗",
  },
  {
    id: 7,
    titulo: "Torre Moderna",
    descripcion: "Rascacielos de vidrio y acero",
    categoria: "arquitectura",
    emoji: "🏢",
  },
  {
    id: 8,
    titulo: "Puente Colgante",
    descripcion: "Puente de cables sobre el río",
    categoria: "arquitectura",
    emoji: "🌉",
  },
  {
    id: 9,
    titulo: "Castillo Antiguo",
    descripcion: "Fortaleza medieval en la colina",
    categoria: "arquitectura",
    emoji: "🏰",
  },
  {
    id: 10,
    titulo: "Retrato Profesional",
    descripcion: "Fotografía de busto de ejecutivo",
    categoria: "personas",
    emoji: "👨‍💼",
  },
  {
    id: 11,
    titulo: "Grupo de Amigos",
    descripcion: "Personas riendo en reunión",
    categoria: "personas",
    emoji: "👥",
  },
  {
    id: 12,
    titulo: "Niño Sonriendo",
    descripcion: "Retrato infantil con expresión feliz",
    categoria: "personas",
    emoji: "👦",
  },
];

// ========== VARIABLES GLOBALES ==========

// Array que almacena las imágenes actualmente mostradas (después de filtrar)
let imagenesActuales = [...imagenes];

// ID de la imagen actualmente abierta en el lightbox
let imagenActualId = null;

// Vista actual: "grid" o "masonry"
let vistaActual = "grid";

// Categoría actual seleccionada
let categoriaActual = "todos";

// ========== INICIALIZACIÓN ==========

// Se ejecuta cuando la página está lista
document.addEventListener("DOMContentLoaded", function () {
  // Renderizar todas las imágenes
  renderizarGaleria();

  // Agregar event listeners a los botones
  agregarEventListeners();
});

// ========== RENDERIZAR GALERÍA ==========

// Función que dibuja las imágenes en el HTML
function renderizarGaleria() {
  // Obtener el contenedor donde irán las imágenes
  const galeriaGrid = document.querySelector(".galeria-grid");

  // Limpiar imágenes anteriores
  galeriaGrid.innerHTML = "";

  // Para cada imagen, crear su elemento HTML
  imagenesActuales.forEach((imagen) => {
    // Crear contenedor del item
    const item = document.createElement("div");
    item.className = "item-galeria";
    item.dataset.id = imagen.id;
    item.dataset.categoria = imagen.categoria;

    // HTML del item con:
    // - Imagen (emoji por ahora)
    // - Overlay oscuro
    // - Información
    item.innerHTML = `
      <!-- Imagen -->
      <img src="" alt="${imagen.titulo}" class="imagen-galeria" style="font-size: 3rem; display: flex; align-items: center; justify-content: center;">
      
      <!-- Contenido de imagen (emoji) -->
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        ${imagen.emoji}
      </div>
      
      <!-- Overlay que aparece al hover -->
      <div class="overlay-item">
        <!-- Icono de zoom -->
        <span class="icono-zoom">🔍</span>
      </div>
      
      <!-- Información que aparece en overlay -->
      <div class="info-overlay">
        <h4>${imagen.titulo}</h4>
        <p>${imagen.descripcion}</p>
      </div>
    `;

    // Agregar evento click para abrir modal
    item.addEventListener("click", function () {
      abrirLightbox(imagen.id);
    });

    // Agregar item a la galería
    galeriaGrid.appendChild(item);
  });
}

// ========== AGREGAR EVENT LISTENERS ==========

function agregarEventListeners() {
  // ========== BOTONES DE VISTA ==========

  // Seleccionar todos los botones de vista (Grid/Masonry)
  const botonesVista = document.querySelectorAll(".btn-vista");

  botonesVista.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Obtener la vista seleccionada (grid o masonry)
      const vista = this.dataset.vista;

      // Remover clase "activo" de todos los botones
      botonesVista.forEach((b) => b.classList.remove("activo"));

      // Agregar clase "activo" al botón clickeado
      this.classList.add("activo");

      // Cambiar la vista
      cambiarVista(vista);
    });
  });

  // ========== BOTONES DE FILTRO ==========

  // Seleccionar todos los botones de filtro
  const botonesFiltro = document.querySelectorAll(".btn-filtro");

  botonesFiltro.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Obtener la categoría seleccionada
      const categoria = this.dataset.categoria;

      // Remover clase "activo" de todos los botones
      botonesFiltro.forEach((b) => b.classList.remove("activo"));

      // Agregar clase "activo" al botón clickeado
      this.classList.add("activo");

      // Filtrar la galería
      filtrarPorCategoria(categoria);
    });
  });

  // ========== BOTONES DE NAVEGACIÓN EN MODAL ==========

  // Botón "anterior" (flecha izquierda)
  const btnAnterior = document.querySelector(".btn-anterior");
  if (btnAnterior) {
    btnAnterior.addEventListener("click", function () {
      imagenAnterior();
    });
  }

  // Botón "siguiente" (flecha derecha)
  const btnSiguiente = document.querySelector(".btn-siguiente");
  if (btnSiguiente) {
    btnSiguiente.addEventListener("click", function () {
      imagenSiguiente();
    });
  }

  // ========== BOTÓN CERRAR MODAL ==========

  const cerrarModal = document.querySelector(".cerrar-modal");
  if (cerrarModal) {
    cerrarModal.addEventListener("click", cerrarLightbox);
  }

  // ========== OVERLAY - CLICK PARA CERRAR ==========

  const overlay = document.querySelector(".overlay-galeria");
  if (overlay) {
    overlay.addEventListener("click", cerrarLightbox);
  }

  // ========== TECLADO - NAVEGACIÓN ==========

  document.addEventListener("keydown", function (event) {
    // Si el modal está abierto, permitir navegación con flechas
    const modal = document.querySelector(".modal-lightbox");

    if (modal && modal.classList.contains("activo")) {
      // Flecha izquierda = imagen anterior
      if (event.key === "ArrowLeft") {
        imagenAnterior();
      }

      // Flecha derecha = imagen siguiente
      if (event.key === "ArrowRight") {
        imagenSiguiente();
      }

      // Escape = cerrar modal
      if (event.key === "Escape") {
        cerrarLightbox();
      }
    }
  });
}

// ========== CAMBIAR VISTA ==========

// Cambia entre vista Grid normal y Masonry
function cambiarVista(vista) {
  // Guardar la vista actual
  vistaActual = vista;

  // Obtener el elemento de la galería
  const galeriaGrid = document.querySelector(".galeria-grid");

  // Remover clases de vista
  galeriaGrid.classList.remove("grid-activo", "masonry-activo");

  // Agregar la nueva clase según la vista
  if (vista === "grid") {
    galeriaGrid.classList.add("grid-activo");
  } else if (vista === "masonry") {
    galeriaGrid.classList.add("masonry-activo");
  }
}

// ========== FILTRAR POR CATEGORÍA ==========

function filtrarPorCategoria(categoria) {
  // Guardar categoría actual
  categoriaActual = categoria;

  // Si categoría es "todos", mostrar todas las imágenes
  if (categoria === "todos") {
    imagenesActuales = [...imagenes];
  } else {
    // Si no, filtrar por la categoría seleccionada
    imagenesActuales = imagenes.filter((img) => img.categoria === categoria);
  }

  // Renderizar con las imágenes filtradas
  renderizarGaleria();
}

// ========== ABRIR LIGHTBOX (MODAL) ==========

function abrirLightbox(imagenId) {
  // Buscar la imagen con ese ID
  const imagen = imagenes.find((img) => img.id === imagenId);

  if (!imagen) return; // Si no existe, no hacer nada

  // Guardar el ID de imagen actual
  imagenActualId = imagenId;

  // Obtener elementos del modal
  const modal = document.querySelector(".modal-lightbox");
  const overlay = document.querySelector(".overlay-galeria");

  // Actualizar contenido del modal
  modal.querySelector(".imagen-modal").textContent = imagen.emoji;
  modal.querySelector(".imagen-modal").style.fontSize = "6rem";

  modal.querySelector(".titulo-imagen").textContent = imagen.titulo;
  modal.querySelector(".descripcion-imagen").textContent = imagen.descripcion;

  // Calcular posición (ej: 3 de 12)
  const indice = imagenes.findIndex((img) => img.id === imagenId);
  modal.querySelector(".posicion-imagen").textContent =
    `${indice + 1} de ${imagenes.length}`;

  // Mostrar modal y overlay
  modal.classList.add("activo");
  overlay.classList.add("activo");
}

// ========== CERRAR LIGHTBOX ==========

function cerrarLightbox() {
  // Remover clase "activo" de modal y overlay
  document.querySelector(".modal-lightbox").classList.remove("activo");
  document.querySelector(".overlay-galeria").classList.remove("activo");

  // Resetear ID
  imagenActualId = null;
}

// ========== IMAGEN ANTERIOR ==========

// Navega a la imagen anterior en el array
function imagenAnterior() {
  // Encontrar el índice de la imagen actual
  const indiceActual = imagenes.findIndex((img) => img.id === imagenActualId);

  // Calcular el índice anterior (si es 0, ir al final)
  const indiceAnterior = indiceActual === 0 ? imagenes.length - 1 : indiceActual - 1;

  // Abrir la imagen anterior
  abrirLightbox(imagenes[indiceAnterior].id);
}

// ========== IMAGEN SIGUIENTE ==========

// Navega a la imagen siguiente en el array
function imagenSiguiente() {
  // Encontrar el índice de la imagen actual
  const indiceActual = imagenes.findIndex((img) => img.id === imagenActualId);

  // Calcular el índice siguiente (si es el último, ir al primero)
  const indiceSiguiente =
    indiceActual === imagenes.length - 1 ? 0 : indiceActual + 1;

  // Abrir la imagen siguiente
  abrirLightbox(imagenes[indiceSiguiente].id);
}
