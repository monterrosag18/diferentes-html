/* 
  ===============================
  ARCHIVO: script.js
  CARPETA: 4_Ecommerce_Avanzado
  PROPÓSITO: Lógica completa del ecommerce
  
  FUNCIONALIDADES:
  - Array de productos con datos realistas
  - Filtrado por categoría, precio y rating
  - Ordenamiento (6 opciones)
  - Sistema de carrito completo
  - Sistema de wishlist (favoritos)
  - Modales interactivos
  - Persistencia en localStorage
  - Validaciones de cantidad y stock
  
  ===============================
*/

// ========== ARRAY DE PRODUCTOS ==========

// Este array contiene todos los productos. Cada producto es un objeto con:
// - id: identificador único
// - nombre: nombre del producto
// - categoria: categoría para filtrar
// - precio: precio original sin descuento
// - precioActual: precio con descuento (precio final)
// - descuento: porcentaje de descuento (0 si no hay)
// - rating: calificación promedio (0-5)
// - reviews: cantidad de reseñas
// - stock: cantidad disponible
// - emoji: emoji para representar el producto

const productos = [
  {
    id: 1,
    nombre: "Laptop HP Pavilion 15",
    categoria: "electrónica",
    precio: 800,
    precioActual: 650,
    descuento: 18,
    rating: 4.5,
    reviews: 128,
    stock: 5,
    emoji: "💻",
  },
  {
    id: 2,
    nombre: "Audífonos Wireless Sony",
    categoria: "accesorios",
    precio: 250,
    precioActual: 180,
    descuento: 28,
    rating: 4.8,
    reviews: 345,
    stock: 15,
    emoji: "🎧",
  },
  {
    id: 3,
    nombre: "Mouse Logitech MX Master",
    categoria: "accesorios",
    precio: 100,
    precioActual: 75,
    descuento: 25,
    rating: 4.6,
    reviews: 89,
    stock: 20,
    emoji: "🖱️",
  },
  {
    id: 4,
    nombre: "Monitor Dell 27\" 4K",
    categoria: "electrónica",
    precio: 400,
    precioActual: 350,
    descuento: 12,
    rating: 4.7,
    reviews: 203,
    stock: 8,
    emoji: "🖥️",
  },
  {
    id: 5,
    nombre: "Teclado Mecánico Razer",
    categoria: "accesorios",
    precio: 180,
    precioActual: 140,
    descuento: 22,
    rating: 4.4,
    reviews: 156,
    stock: 12,
    emoji: "⌨️",
  },
  {
    id: 6,
    nombre: "Webcam Logitech C922",
    categoria: "accesorios",
    precio: 120,
    precioActual: 95,
    descuento: 20,
    rating: 4.3,
    reviews: 67,
    stock: 18,
    emoji: "📷",
  },
  {
    id: 7,
    nombre: "Tablet Samsung Galaxy Tab",
    categoria: "electrónica",
    precio: 350,
    precioActual: 280,
    descuento: 20,
    rating: 4.6,
    reviews: 234,
    stock: 3,
    emoji: "📱",
  },
  {
    id: 8,
    nombre: "Cable USB-C Premium",
    categoria: "cables",
    precio: 30,
    precioActual: 20,
    descuento: 33,
    rating: 4.2,
    reviews: 45,
    stock: 50,
    emoji: "🔌",
  },
  {
    id: 9,
    nombre: "Funda Laptop Neopreno",
    categoria: "accesorios",
    precio: 50,
    precioActual: 35,
    descuento: 30,
    rating: 4.1,
    reviews: 88,
    stock: 25,
    emoji: "🎒",
  },
  {
    id: 10,
    nombre: "Cargador Rápido 65W",
    categoria: "accesorios",
    precio: 60,
    precioActual: 45,
    descuento: 25,
    rating: 4.4,
    reviews: 120,
    stock: 30,
    emoji: "⚡",
  },
  {
    id: 11,
    nombre: "Monitor Gaming 144Hz",
    categoria: "electrónica",
    precio: 450,
    precioActual: 380,
    descuento: 15,
    rating: 4.9,
    reviews: 290,
    stock: 4,
    emoji: "🎮",
  },
  {
    id: 12,
    nombre: "Hub USB Multi-puerto",
    categoria: "cables",
    precio: 70,
    precioActual: 55,
    descuento: 21,
    rating: 4.5,
    reviews: 102,
    stock: 22,
    emoji: "🔗",
  },
];

// ========== VARIABLES GLOBALES ==========

// Array que almacena los productos actualmente mostrados (filtrados/ordenados)
let productosActuales = [...productos];

// Objeto carrito: almacena los items que el usuario agregó
let carrito = {
  // items es un array donde cada item tiene: productoId, cantidad, precio
  items: [],
  // IVA es el impuesto aplicado (19% en Colombia)
  iva: 0.19,
  // Descuento especial si el usuario ingresa código
  descuentoAdicional: 0,
};

// Array wishlist: almacena los IDs de productos favoritos
let wishlist = [];

// ========== CARGAR DATOS AL INICIAR ==========

// Esta función se ejecuta cuando la página carga
document.addEventListener("DOMContentLoaded", function () {
  // Cargar carrito del localStorage si existe
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }

  // Cargar wishlist del localStorage si existe
  const wishlistGuardada = localStorage.getItem("wishlist");
  if (wishlistGuardada) {
    wishlist = JSON.parse(wishlistGuardada);
  }

  // Mostrar los productos en la página
  renderizarProductos();

  // Actualizar badges (números) de carrito y wishlist
  actualizarBadges();

  // Agregar event listeners a los elementos del DOM
  agregarEventListeners();
});

// ========== RENDERIZAR PRODUCTOS EN GRID ==========

function renderizarProductos() {
  // Obtener el contenedor donde irán los productos
  const grid = document.querySelector(".grid-productos-ecommerce");

  // Limpiar el grid anterior
  grid.innerHTML = "";

  // Si no hay productos después de filtrar, mostrar mensaje
  if (productosActuales.length === 0) {
    grid.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No se encontraron productos con esos filtros</p>';
    return;
  }

  // Para cada producto, crear su tarjeta HTML
  productosActuales.forEach((producto) => {
    // Verificar si el producto está en wishlist
    const enWishlist = wishlist.includes(producto.id);

    // Crear el HTML de la tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto-avanzada";
    tarjeta.innerHTML = `
      <!-- Badge de descuento (solo si hay descuento) -->
      ${
        producto.descuento > 0
          ? `<div class="badge-descuento">-${producto.descuento}%</div>`
          : ""
      }

      <!-- Imagen del producto (emoji por ahora) -->
      <div class="producto-imagen-contenedor">
        ${producto.emoji}
      </div>

      <!-- Contenido de la tarjeta -->
      <div class="tarjeta-contenido">
        <!-- Nombre del producto -->
        <h3 class="producto-nombre">${producto.nombre}</h3>

        <!-- Rating (estrellas y cantidad de reviews) -->
        <div class="producto-rating">
          <span class="estrellas">${generarEstrellas(producto.rating)}</span>
          <span class="cantidad-reviews">${producto.reviews} reseñas</span>
        </div>

        <!-- Precios (original y con descuento) -->
        <div class="producto-precios">
          ${
            producto.descuento > 0
              ? `<span class="precio-original">$${producto.precio.toLocaleString()}</span>`
              : ""
          }
          <span class="precio-actual">$${producto.precioActual.toLocaleString()}</span>
        </div>

        <!-- Stock disponible con color según cantidad -->
        <div class="producto-stock ${obtenerClaseStock(producto.stock)}">
          ${
            producto.stock > 0
              ? `${producto.stock} disponibles`
              : "Agotado"
          }
        </div>

        <!-- Botones de acción -->
        <div class="botones-tarjeta">
          <button class="btn-comprar-rapido" onclick="abrirDetalleProducto(${producto.id})">
            Ver detalles
          </button>
          <button class="btn-favorito ${enWishlist ? "activo" : ""}" onclick="toggleWishlist(${producto.id})">
            ❤️
          </button>
        </div>
      </div>
    `;

    // Agregar la tarjeta al grid
    grid.appendChild(tarjeta);
  });

  // Actualizar el texto que muestra "X productos encontrados"
  actualizarResultadoInfo();
}

// ========== GENERAR ESTRELLAS PARA RATING ==========

// Esta función crea un string visual de estrellas
// Por ejemplo: rating 4.5 = "⭐⭐⭐⭐" y media estrella
function generarEstrellas(rating) {
  // Redondear el rating a 0.5 más cercano
  const estrellas = Math.round(rating * 2) / 2;
  let resultado = "";

  // Crear estrellas completas
  for (let i = 0; i < Math.floor(estrellas); i++) {
    resultado += "⭐";
  }

  // Agregar media estrella si el rating tiene decimales
  if (estrellas % 1 !== 0) {
    resultado += "✨";
  }

  return resultado;
}

// ========== OBTENER CLASE CSS PARA STOCK ==========

// Esta función retorna la clase CSS según el stock disponible
// Sirve para colorear diferente si hay mucho, poco o nada de stock
function obtenerClaseStock(stock) {
  if (stock === 0) {
    return "stock-agotado";
  } else if (stock <= 5) {
    return "stock-bajo";
  } else {
    return "stock-disponible";
  }
}

// ========== ACTUALIZAR INFORMACIÓN DE RESULTADOS ==========

// Muestra cuántos productos se encontraron con los filtros actuales
function actualizarResultadoInfo() {
  const info = document.querySelector(".resultado-info");
  if (info) {
    info.textContent = `${productosActuales.length} productos encontrados`;
  }
}

// ========== AGREGAR EVENT LISTENERS ==========

function agregarEventListeners() {
  // Escuchar cambios en filtro de categoría
  const selectCategoria = document.querySelector("#filtro-categoria");
  if (selectCategoria) {
    selectCategoria.addEventListener("change", aplicarFiltros);
  }

  // Escuchar cambios en rango de precio MÍNIMO
  const precioMin = document.querySelector("#precio-min");
  if (precioMin) {
    precioMin.addEventListener("input", aplicarFiltros);
  }

  // Escuchar cambios en rango de precio MÁXIMO
  const precioMax = document.querySelector("#precio-max");
  if (precioMax) {
    precioMax.addEventListener("input", aplicarFiltros);
  }

  // Escuchar cambios en filtro de rating
  const selectRating = document.querySelector("#filtro-rating");
  if (selectRating) {
    selectRating.addEventListener("change", aplicarFiltros);
  }

  // Escuchar cambios en select de ordenamiento
  const selectOrden = document.querySelector("#ordenar-por");
  if (selectOrden) {
    selectOrden.addEventListener("change", ordenarProductos);
  }

  // Escuchar click en overlay para cerrar modales
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.addEventListener("click", cerrarModales);
  }

  // Escuchar click en botón cerrar del modal de producto
  const cerrarProducto = document.querySelector(".modal-producto .cerrar-modal-x");
  if (cerrarProducto) {
    cerrarProducto.addEventListener("click", cerrarModales);
  }

  // Escuchar click en botón cerrar del modal de carrito
  const cerrarCarrito = document.querySelector(".modal-carrito .cerrar-modal-x");
  if (cerrarCarrito) {
    cerrarCarrito.addEventListener("click", cerrarModales);
  }

  // Escuchar clicks en los botones de cantidad (+/-)
  const botonesAgregar = document.querySelectorAll(".btn-cantidad");
  botonesAgregar.forEach((btn) => {
    btn.addEventListener("click", cambiarCantidad);
  });

  // Escuchar clicks en botones de acción del modal
  const btnAgregarCarrito = document.querySelector("#btn-agregar-carrito-modal");
  if (btnAgregarCarrito) {
    btnAgregarCarrito.addEventListener("click", agregarAlCarritoDesdeModal);
  }

  const btnProcederPago = document.querySelector("#btn-proceder-pago");
  if (btnProcederPago) {
    btnProcederPago.addEventListener("click", procederAlPago);
  }
}

// ========== APLICAR FILTROS ==========

// Esta función aplica todos los filtros activos
function aplicarFiltros() {
  // Obtener valores de los filtros
  const categoria = document.querySelector("#filtro-categoria").value;
  const precioMin = parseFloat(document.querySelector("#precio-min").value) || 0;
  const precioMax =
    parseFloat(document.querySelector("#precio-max").value) || Infinity;
  const ratingMin = parseFloat(document.querySelector("#filtro-rating").value) || 0;

  // Filtrar el array de productos original
  productosActuales = productos.filter((producto) => {
    // Cumple si: categoría coincide O no hay filtro de categoría (vacío)
    const coincideCategoria =
      categoria === "" || producto.categoria === categoria;

    // Cumple si: precio está dentro del rango
    const coincidePrecio =
      producto.precioActual >= precioMin && producto.precioActual <= precioMax;

    // Cumple si: rating es >= al rating filtrado
    const coincideRating = producto.rating >= ratingMin;

    // Retorna true si cumple TODOS los filtros
    return coincideCategoria && coincidePrecio && coincideRating;
  });

  // Después de filtrar, aplicar el ordenamiento
  aplicarOrdenamiento();

  // Renderizar los productos filtrados
  renderizarProductos();
}

// ========== APLICAR ORDENAMIENTO ==========

// Obtiene el tipo de ordenamiento y reordena productosActuales
function aplicarOrdenamiento() {
  const ordenamiento = document.querySelector("#ordenar-por").value || "relevancia";

  // Crear copia para no modificar el orden de productosActuales
  const productosOrdenados = [...productosActuales];

  switch (ordenamiento) {
    case "precio-asc":
      // Menor a mayor precio
      productosOrdenados.sort((a, b) => a.precioActual - b.precioActual);
      break;

    case "precio-desc":
      // Mayor a menor precio
      productosOrdenados.sort((a, b) => b.precioActual - a.precioActual);
      break;

    case "popularidad":
      // Por cantidad de reviews (más reviews = más popular)
      productosOrdenados.sort((a, b) => b.reviews - a.reviews);
      break;

    case "más-nuevo":
      // Por ID (ID mayor = agregado más recientemente)
      productosOrdenados.sort((a, b) => b.id - a.id);
      break;

    case "mejor-rating":
      // Por rating de mayor a menor
      productosOrdenados.sort((a, b) => b.rating - a.rating);
      break;

    default:
      // "relevancia" - mantener orden original
      break;
  }

  productosActuales = productosOrdenados;
}

// ========== ORDENAR PRODUCTOS ==========

// Se ejecuta cuando el usuario cambia el select de ordenamiento
function ordenarProductos() {
  aplicarOrdenamiento();
  renderizarProductos();
}

// ========== ABRIR MODAL DEL PRODUCTO ==========

function abrirDetalleProducto(productoId) {
  // Buscar el producto en el array
  const producto = productos.find((p) => p.id === productoId);

  if (!producto) return; // Si no existe, no hacer nada

  // Obtener elementos del modal
  const modal = document.querySelector(".modal-producto");
  const overlay = document.querySelector(".overlay");

  // Llenar los datos en el modal
  modal.querySelector(".detalle-imagen").textContent = producto.emoji;
  modal.querySelector(".detalle-info h2").textContent = producto.nombre;

  // Mostrar rating
  const detalleRating = modal.querySelector(".detalle-rating");
  detalleRating.innerHTML = `
    <span class="estrellas">${generarEstrellas(producto.rating)}</span>
    <span>${producto.reviews} reseñas</span>
  `;

  // Mostrar precios
  const detallePrecio = modal.querySelector(".detalle-precio");
  detallePrecio.innerHTML = `
    ${
      producto.descuento > 0
        ? `<span style="text-decoration: line-through; color: #999;">$${producto.precio.toLocaleString()}</span>`
        : ""
    }
    <span style="color: #667eea;">$${producto.precioActual.toLocaleString()}</span>
  `;

  // Mostrar stock
  const stockInfo = modal.querySelector(".detalle-info .producto-stock");
  if (stockInfo) {
    stockInfo.className = `producto-stock ${obtenerClaseStock(producto.stock)}`;
    stockInfo.textContent =
      producto.stock > 0 ? `${producto.stock} disponibles` : "Agotado";
  }

  // Resetear cantidad a 1
  document.querySelector("#cantidad-detalle").value = 1;

  // Habilitar/deshabilitar botones según stock
  const btnAgregarCarrito = modal.querySelector("#btn-agregar-carrito-modal");
  if (producto.stock === 0) {
    btnAgregarCarrito.disabled = true;
    btnAgregarCarrito.textContent = "Agotado";
  } else {
    btnAgregarCarrito.disabled = false;
    btnAgregarCarrito.textContent = "Agregar al carrito";
  }

  // Guardar el ID del producto en el modal para referencia
  modal.dataset.productoId = productoId;

  // Mostrar modal y overlay
  modal.classList.add("activo");
  overlay.classList.add("activo");
}

// ========== CAMBIAR CANTIDAD EN MODAL ==========

function cambiarCantidad(event) {
  const btn = event.target;
  const input = btn.parentElement.querySelector("input");
  let valor = parseInt(input.value);

  // Si clickeó botón + sumar, si clickeó botón - restar
  if (btn.textContent === "+") {
    valor++;
  } else if (btn.textContent === "-" && valor > 1) {
    valor--;
  }

  input.value = valor;
}

// ========== AGREGAR AL CARRITO DESDE MODAL ==========

function agregarAlCarritoDesdeModal() {
  const modal = document.querySelector(".modal-producto");
  const productoId = parseInt(modal.dataset.productoId);
  const cantidad = parseInt(document.querySelector("#cantidad-detalle").value);

  // Buscar producto
  const producto = productos.find((p) => p.id === productoId);
  if (!producto || producto.stock === 0) return;

  // Validar que cantidad no exceda stock
  if (cantidad > producto.stock) {
    mostrarNotificacion(
      "La cantidad excede el stock disponible",
      "error"
    );
    return;
  }

  // Buscar si el producto ya existe en el carrito
  const itemExistente = carrito.items.find((item) => item.productoId === productoId);

  if (itemExistente) {
    // Si existe, aumentar la cantidad
    itemExistente.cantidad += cantidad;
  } else {
    // Si no existe, crear nuevo item en el carrito
    carrito.items.push({
      productoId: productoId,
      cantidad: cantidad,
      precio: producto.precioActual,
    });
  }

  // Guardar carrito en localStorage
  guardarCarrito();

  // Actualizar badges
  actualizarBadges();

  // Mostrar notificación de éxito
  mostrarNotificacion(
    `${producto.nombre} agregado al carrito`,
    "exito"
  );

  // Cerrar modal
  cerrarModales();
}

// ========== TOGGLE WISHLIST (FAVORITOS) ==========

function toggleWishlist(productoId) {
  // Buscar si el producto ya está en wishlist
  const indice = wishlist.indexOf(productoId);

  if (indice > -1) {
    // Si está, remover
    wishlist.splice(indice, 1);
  } else {
    // Si no está, agregar
    wishlist.push(productoId);
  }

  // Guardar wishlist en localStorage
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  // Actualizar badges y renderizar
  actualizarBadges();
  renderizarProductos();

  // Mostrar notificación
  const producto = productos.find((p) => p.id === productoId);
  if (indice > -1) {
    mostrarNotificacion(`${producto.nombre} eliminado de favoritos`, "exito");
  } else {
    mostrarNotificacion(`${producto.nombre} agregado a favoritos`, "exito");
  }
}

// ========== ACTUALIZAR BADGES (NÚMEROS) ==========

// Actualiza los números que aparecen en los iconos de carrito y wishlist
function actualizarBadges() {
  // Badge de carrito
  const badgeCarrito = document.querySelector(".carrito-icon .badge");
  if (badgeCarrito) {
    const totalItems = carrito.items.reduce(
      (total, item) => total + item.cantidad,
      0
    );
    badgeCarrito.textContent = totalItems;
  }

  // Badge de wishlist
  const badgeWishlist = document.querySelector(".wishlist-icon .badge");
  if (badgeWishlist) {
    badgeWishlist.textContent = wishlist.length;
  }
}

// ========== ABRIR CARRITO ==========

function abrirCarrito() {
  const modal = document.querySelector(".modal-carrito");
  const overlay = document.querySelector(".overlay");

  // Obtener tabla del carrito
  const tabla = document.querySelector(".tabla-carrito-avanzada tbody");
  tabla.innerHTML = "";

  // Si el carrito está vacío
  if (carrito.items.length === 0) {
    tabla.innerHTML =
      '<tr><td colspan="5" style="text-align: center; padding: 20px;">Tu carrito está vacío</td></tr>';
  } else {
    // Para cada item, crear una fila en la tabla
    carrito.items.forEach((item) => {
      const producto = productos.find((p) => p.id === item.productoId);
      const subtotal = item.precio * item.cantidad;

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>$${item.precio.toLocaleString()}</td>
        <td>
          <input type="number" value="${item.cantidad}" min="1" class="cantidad-carrito" data-producto-id="${item.productoId}">
        </td>
        <td>$${subtotal.toLocaleString()}</td>
        <td>
          <button class="btn-eliminar-carrito" onclick="eliminarDelCarrito(${item.productoId})">
            Eliminar
          </button>
        </td>
      `;

      tabla.appendChild(fila);
    });

    // Agregar event listeners a inputs de cantidad
    document.querySelectorAll(".cantidad-carrito").forEach((input) => {
      input.addEventListener("change", actualizarCantidadCarrito);
    });
  }

  // Actualizar resumen (subtotal, IVA, total)
  actualizarResumenCarrito();

  // Mostrar modal y overlay
  modal.classList.add("activo");
  overlay.classList.add("activo");
}

// ========== ACTUALIZAR CANTIDAD EN CARRITO ==========

function actualizarCantidadCarrito(event) {
  const input = event.target;
  const productoId = parseInt(input.dataset.productoId);
  const nuevaCantidad = parseInt(input.value);

  const producto = productos.find((p) => p.id === productoId);

  // Validar cantidad
  if (nuevaCantidad < 1) {
    input.value = 1;
    return;
  }

  if (nuevaCantidad > producto.stock) {
    mostrarNotificacion(
      "Cantidad excede el stock disponible",
      "error"
    );
    input.value = carrito.items.find((item) => item.productoId === productoId)
      .cantidad;
    return;
  }

  // Actualizar carrito
  const item = carrito.items.find((item) => item.productoId === productoId);
  item.cantidad = nuevaCantidad;

  guardarCarrito();
  actualizarResumenCarrito();
}

// ========== ACTUALIZAR RESUMEN DEL CARRITO ==========

// Calcula y muestra el subtotal, IVA y total
function actualizarResumenCarrito() {
  // Calcular subtotal (suma de todos los items)
  const subtotal = carrito.items.reduce((total, item) => {
    return total + item.precio * item.cantidad;
  }, 0);

  // Calcular IVA (19%)
  const iva = subtotal * carrito.iva;

  // Calcular total
  const total = subtotal + iva;

  // Actualizar HTML del resumen
  document.querySelector(".resumen-carrito-avanzado").innerHTML = `
    <div class="fila-resumen">
      <span>Subtotal:</span>
      <span>$${subtotal.toLocaleString()}</span>
    </div>
    <div class="fila-resumen">
      <span>IVA (19%):</span>
      <span>$${iva.toLocaleString()}</span>
    </div>
    <div class="fila-resumen total">
      <span>Total:</span>
      <span>$${total.toLocaleString()}</span>
    </div>
  `;
}

// ========== ELIMINAR DEL CARRITO ==========

function eliminarDelCarrito(productoId) {
  // Filtrar el array para remover el producto
  carrito.items = carrito.items.filter((item) => item.productoId !== productoId);

  guardarCarrito();
  actualizarBadges();

  // Volver a abrir carrito para actualizar vista
  abrirCarrito();

  mostrarNotificacion("Producto eliminado del carrito", "exito");
}

// ========== PROCEDER AL PAGO ==========

function procederAlPago() {
  if (carrito.items.length === 0) {
    mostrarNotificacion("Tu carrito está vacío", "error");
    return;
  }

  // Calcular total
  const subtotal = carrito.items.reduce((total, item) => {
    return total + item.precio * item.cantidad;
  }, 0);
  const total = subtotal * (1 + carrito.iva);

  // Mostrar confirmación
  const mensaje = `
Resumen del pedido:
- ${carrito.items.length} producto(s)
- Subtotal: $${subtotal.toLocaleString()}
- Total con IVA: $${total.toLocaleString()}

¿Deseas continuar al pago?
  `;

  if (confirm(mensaje)) {
    // Vaciar carrito después del pago
    carrito.items = [];
    guardarCarrito();
    actualizarBadges();

    // Cerrar modales
    cerrarModales();

    // Mostrar notificación de éxito
    mostrarNotificacion("¡Pedido realizado con éxito!", "exito");
  }
}

// ========== CERRAR MODALES ==========

function cerrarModales() {
  // Remover clase "activo" de todos los modales y overlay
  document.querySelector(".modal-producto").classList.remove("activo");
  document.querySelector(".modal-carrito").classList.remove("activo");
  document.querySelector(".overlay").classList.remove("activo");
}

// ========== GUARDAR CARRITO EN LOCALSTORAGE ==========

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ========== MOSTRAR NOTIFICACIÓN ==========

// Muestra mensajes temporales al usuario (éxito, error, etc)
function mostrarNotificacion(mensaje, tipo = "exito") {
  const notificacion = document.querySelector(".notificacion");

  // Configurar tipo (color)
  notificacion.className = `notificacion activo ${tipo}`;

  // Establecer mensaje
  notificacion.textContent = mensaje;

  // Mostrar notificación por 3 segundos
  setTimeout(() => {
    notificacion.classList.remove("activo");
  }, 3000);
}

// ========== EVENTO CLICK ICONOS HEADER ==========

// Agregar listeners para los iconos de carrito y wishlist en el header
document.addEventListener("DOMContentLoaded", function () {
  const carritoIcon = document.querySelector(".carrito-icon");
  if (carritoIcon) {
    carritoIcon.addEventListener("click", abrirCarrito);
  }
});
