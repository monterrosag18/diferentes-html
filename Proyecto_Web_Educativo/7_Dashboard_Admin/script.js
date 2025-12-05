/* 
  ===============================
  ARCHIVO: script.js
  CARPETA: 7_Dashboard_Admin
  PROPÓSITO: Interactividad del dashboard
  
  FUNCIONALIDADES:
  - Cambio de secciones
  - Navegación del menú
  - Búsqueda de datos
  - Filtros de fecha
  - Modalidades de vista
  - Validación de formularios
  - Manejo de eventos
  
  ===============================
*/

// ========== VARIABLES GLOBALES ==========

// Array de usuarios del sistema
const usuarios = [
  { id: 1, nombre: "Juan García", email: "juan@empresa.com", rol: "Admin" },
  { id: 2, nombre: "María López", email: "maria@empresa.com", rol: "Editor" },
  { id: 3, nombre: "Carlos R.", email: "carlos@empresa.com", rol: "Visitante" },
];

// Array de productos del catálogo
const productos = [
  { id: 1, nombre: "Laptop HP", precio: 650, stock: 5 },
  { id: 2, nombre: "Monitor Dell", precio: 350, stock: 8 },
  { id: 3, nombre: "Audífonos Sony", precio: 180, stock: 15 },
  { id: 4, nombre: "Teclado Mecánico", precio: 140, stock: 12 },
];

// Sección actual visible
let seccionActual = "inicio";

// ========== INICIALIZACIÓN ==========

// Se ejecuta cuando la página carga
document.addEventListener("DOMContentLoaded", function () {
  // Agregar event listeners a los menú items
  agregarEventListenersMenu();

  // Agregar event listeners a los botones
  agregarEventListenersBotones();
});

// ========== AGREGAR EVENT LISTENERS AL MENÚ ========== 

function agregarEventListenersMenu() {
  // Seleccionar todos los items del menú
  const menuItems = document.querySelectorAll(".menu-item");

  // Para cada item, agregar evento click
  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Prevenir comportamiento por defecto
      e.preventDefault();

      // Obtener la sección a mostrar
      const seccion = this.dataset.seccion;

      // Cambiar sección
      cambiarSeccion(seccion);
    });
  });
}

// ========== CAMBIAR SECCIÓN ==========

// Cambia entre diferentes secciones del dashboard
function cambiarSeccion(seccion) {
  // Guardar sección actual
  seccionActual = seccion;

  // ========== REMOVER CLASE ACTIVO DE TODAS LAS SECCIONES ==========

  const secciones = document.querySelectorAll(".seccion");
  secciones.forEach((s) => {
    s.classList.remove("activa");
  });

  // ========== REMOVER CLASE ACTIVO DE TODOS LOS MENÚ ITEMS ==========

  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    item.classList.remove("activo");
  });

  // ========== AGREGAR CLASE ACTIVO A LA SECCIÓN SELECCIONADA ==========

  const seccionSeleccionada = document.querySelector(`#seccion-${seccion}`);
  if (seccionSeleccionada) {
    seccionSeleccionada.classList.add("activa");
  }

  // ========== AGREGAR CLASE ACTIVO AL MENÚ ITEM ==========

  const menuItemActivo = document.querySelector(
    `.menu-item[data-seccion="${seccion}"]`
  );
  if (menuItemActivo) {
    menuItemActivo.classList.add("activo");
  }

  // ========== ACTUALIZAR TÍTULO DE LA PÁGINA ==========

  const tituloPagina = document.querySelector(".titulo-pagina");
  const mapaTitulos = {
    inicio: "Dashboard",
    usuarios: "Gestión de Usuarios",
    productos: "Gestión de Productos",
    ventas: "Análisis de Ventas",
    reportes: "Reportes",
    config: "Configuración",
  };

  if (tituloPagina) {
    tituloPagina.textContent = mapaTitulos[seccion] || "Dashboard";
  }
}

// ========== AGREGAR EVENT LISTENERS A BOTONES ==========

function agregarEventListenersBotones() {
  // ========== BÚSQUEDA ==========

  const inputBuscar = document.querySelector(".buscar-dashboard");
  if (inputBuscar) {
    inputBuscar.addEventListener("input", function () {
      realizarBusqueda(this.value);
    });
  }

  // ========== TEMA OSCURO/CLARO ==========

  const btnTema = document.querySelector(".btn-tema");
  if (btnTema) {
    btnTema.addEventListener("click", cambiarTema);
  }

  // ========== LOGOUT ==========

  const btnLogout = document.querySelector(".btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", function () {
      if (confirm("¿Deseas cerrar sesión?")) {
        alert("Sesión cerrada");
        // Aquí iría redirección a login
      }
    });
  }

  // ========== FILTRO DE FECHAS EN VENTAS ==========

  const inputFechas = document.querySelectorAll(".input-fecha");
  inputFechas.forEach((input) => {
    input.addEventListener("change", filtrarPorFecha);
  });
}

// ========== REALIZAR BÚSQUEDA ==========

function realizarBusqueda(termino) {
  // Convertir término a minúsculas para búsqueda sin diferencias de mayúsculas
  const terminoMinuscula = termino.toLowerCase();

  // Si el término está vacío, mostrar todo
  if (terminoMinuscula === "") {
    return;
  }

  console.log(`Buscando: ${terminoMinuscula}`);

  // Aquí se podría implementar búsqueda en tiempo real
  // Por ejemplo: filtrar usuarios, productos, etc.

  // Buscar en usuarios
  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(terminoMinuscula) ||
    usuario.email.toLowerCase().includes(terminoMinuscula)
  );

  // Buscar en productos
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminoMinuscula)
  );

  console.log(`Usuarios encontrados: ${usuariosFiltrados.length}`);
  console.log(`Productos encontrados: ${productosFiltrados.length}`);
}

// ========== CAMBIAR TEMA ==========

function cambiarTema() {
  // Verificar si el body tiene clase 'dark-mode'
  const temaActual = document.body.getAttribute("data-tema") || "claro";

  // Cambiar tema
  if (temaActual === "claro") {
    document.body.setAttribute("data-tema", "oscuro");
    localStorage.setItem("tema", "oscuro");
  } else {
    document.body.setAttribute("data-tema", "claro");
    localStorage.setItem("tema", "claro");
  }
}

// ========== AGREGAR USUARIO ==========

function agregarUsuario() {
  // Mostrar prompt para ingresar nombre del usuario
  const nombre = prompt("Ingresa el nombre del nuevo usuario:");

  if (!nombre) return; // Si canceló, no hacer nada

  // Mostrar prompt para email
  const email = prompt("Ingresa el email del usuario:");

  if (!email) return;

  // Validar email
  if (!validarEmail(email)) {
    alert("Email inválido");
    return;
  }

  // Crear nuevo usuario
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: nombre,
    email: email,
    rol: "Usuario",
  };

  // Agregar a array
  usuarios.push(nuevoUsuario);

  // Mostrar mensaje
  alert(`Usuario "${nombre}" agregado exitosamente`);

  // Recargar la vista de usuarios (opcional)
  // cambiarSeccion("usuarios");
}

// ========== AGREGAR PRODUCTO ==========

function agregarProducto() {
  // Mostrar prompt para nombre
  const nombre = prompt("Ingresa el nombre del nuevo producto:");

  if (!nombre) return;

  // Mostrar prompt para precio
  const precioStr = prompt("Ingresa el precio:");
  const precio = parseFloat(precioStr);

  if (isNaN(precio) || precio < 0) {
    alert("Precio inválido");
    return;
  }

  // Mostrar prompt para stock
  const stockStr = prompt("Ingresa la cantidad en stock:");
  const stock = parseInt(stockStr);

  if (isNaN(stock) || stock < 0) {
    alert("Stock inválido");
    return;
  }

  // Crear nuevo producto
  const nuevoProducto = {
    id: productos.length + 1,
    nombre: nombre,
    precio: precio,
    stock: stock,
  };

  // Agregar a array
  productos.push(nuevoProducto);

  // Mostrar mensaje
  alert(`Producto "${nombre}" agregado exitosamente`);
}

// ========== FILTRAR POR FECHA ==========

function filtrarPorFecha() {
  // Obtener valores de fechas
  const fechaDesde = document.querySelectorAll(".input-fecha")[0]?.value;
  const fechaHasta = document.querySelectorAll(".input-fecha")[1]?.value;

  if (fechaDesde && fechaHasta) {
    console.log(`Filtrando ventas desde ${fechaDesde} hasta ${fechaHasta}`);
    // Aquí se podría implementar filtrado de ventas por rango de fechas
  }
}

// ========== VALIDAR EMAIL ==========

// Función para validar formato de email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ========== CARGAR TEMA GUARDADO ==========

// Cuando la página carga, verificar tema guardado en localStorage
document.addEventListener("DOMContentLoaded", function () {
  const temaSaved = localStorage.getItem("tema");
  if (temaSaved) {
    document.body.setAttribute("data-tema", temaSaved);
  }
});

// ========== ANIMACIÓN AL HACER HOVER EN TARJETAS ==========

// Agregar interactividad a tarjetas
document.addEventListener("DOMContentLoaded", function () {
  const tarjetas = document.querySelectorAll(".tarjeta-estadistica");

  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    tarjeta.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

// ========== HACER CLICKEABLE LAS FILAS DE TABLA ==========

// Permitir expandir/contraer filas de tabla
document.addEventListener("DOMContentLoaded", function () {
  const filasTabla = document.querySelectorAll(".tabla-dashboard tbody tr");

  filasTabla.forEach((fila) => {
    fila.style.cursor = "pointer";

    fila.addEventListener("click", function () {
      // Cambiar color de fondo para indicar selección
      if (this.style.backgroundColor === "rgb(240, 242, 245)") {
        this.style.backgroundColor = "";
      } else {
        this.style.backgroundColor = "#f0f2f5";
      }
    });
  });
});

// ========== EJEMPLO: ANIMACIÓN DE CONTADORES ==========

// Animar números cuando se cargan
function animarContadorHasta(elemento, numeroFinal, duracion = 1000) {
  // Obtener número inicial
  const numeroInicial = parseInt(elemento.textContent) || 0;

  // Calcular incremento por frame
  const incremento = (numeroFinal - numeroInicial) / (duracion / 50);

  // Número actual
  let numeroActual = numeroInicial;

  // Intervalor que actualiza cada 50ms
  const intervalo = setInterval(() => {
    numeroActual += incremento;

    // Si llegamos al final, detener
    if (numeroActual >= numeroFinal) {
      elemento.textContent = numeroFinal.toLocaleString();
      clearInterval(intervalo);
    } else {
      elemento.textContent = Math.floor(numeroActual).toLocaleString();
    }
  }, 50);
}

// ========== EXPORTAR DATOS ==========

// Función para exportar tabla a formato diferente
function exportarDatos(formato) {
  if (formato === "pdf") {
    alert("Descargando reporte en PDF...");
    // Aquí se podría usar una librería como jsPDF
  } else if (formato === "excel") {
    alert("Exportando a Excel...");
    // Aquí se podría usar una librería como SheetJS
  }
}

// Agregar listener a botones de exportar
document.addEventListener("DOMContentLoaded", function () {
  const botonesReporte = document.querySelectorAll(".botones-reporte .btn");

  botonesReporte.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.textContent.includes("PDF")) {
        exportarDatos("pdf");
      } else if (this.textContent.includes("Excel")) {
        exportarDatos("excel");
      }
    });
  });
});

// ========== GUARDAR CONFIGURACIÓN ==========

// Guardar cambios en configuración
document.addEventListener("DOMContentLoaded", function () {
  // Buscar botón guardar en sección de configuración
  const botonesGuardar = document.querySelectorAll(
    ".formulario-config .btn-primario"
  );

  botonesGuardar.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Obtener valores del formulario
      const empresa = document.querySelector(
        ".formulario-config .input-config"
      )?.value;

      if (empresa) {
        // Guardar en localStorage
        localStorage.setItem("nombreEmpresa", empresa);

        alert("Configuración guardada");
      }
    });
  });
});

// ========== CARGAR DATOS GUARDADOS ==========

// Al iniciar, cargar datos guardados
document.addEventListener("DOMContentLoaded", function () {
  const nombreEmpresa = localStorage.getItem("nombreEmpresa");

  if (nombreEmpresa) {
    const input = document.querySelector(".formulario-config .input-config");
    if (input) {
      input.value = nombreEmpresa;
    }
  }
});

// ========== NOTIFICACIONES ==========

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = "info") {
  // Crear elemento para notificación
  const notif = document.createElement("div");
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background-color: ${tipo === "exito" ? "#27ae60" : "#e74c3c"};
    color: white;
    border-radius: 5px;
    z-index: 2000;
    animation: slideIn 0.3s ease;
  `;

  notif.textContent = mensaje;

  document.body.appendChild(notif);

  // Remover después de 3 segundos
  setTimeout(() => {
    notif.remove();
  }, 3000);
}
