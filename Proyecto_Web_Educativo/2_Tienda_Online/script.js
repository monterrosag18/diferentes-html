/* 
  ===============================
  ARCHIVO: script.js
  CARPETA: 2_Tienda_Online
  PROPÓSITO: Lógica de tienda online (productos, carrito, filtros)
  
  CONCEPTOS AVANZADOS DE JAVASCRIPT:
  - Arrays y objetos
  - Métodos de array (map, filter, reduce)
  - Gestión de estado (carrito)
  - DOM manipulation
  - Event listeners
  - JSON
  ===============================
*/

/* 
  ========== 1. BASE DE DATOS DE PRODUCTOS ==========
  Array de objetos con información de productos
  
  Cada objeto tiene:
  - id: Identificador único (para buscar después)
  - nombre: Nombre del producto
  - categoria: Categoría para filtrado
  - precio: Precio en dólares
  - descripcion: Texto corto
  - imagen: URL de la imagen (emoji aquí, en real sería URL)
*/

const productos = [
  {
    id: 1,
    nombre: 'Laptop ProBook',
    categoria: 'laptops',
    precio: 1200,
    descripcion: 'Laptop de alto rendimiento para trabajo profesional',
    imagen: '💻'
  },
  {
    id: 2,
    nombre: 'iPhone 15 Pro',
    categoria: 'phones',
    precio: 1099,
    descripcion: 'Smartphone con cámara de 48MP',
    imagen: '📱'
  },
  {
    id: 3,
    nombre: 'Audífonos Inalámbricos',
    categoria: 'accesorios',
    precio: 299,
    descripcion: 'Audífonos noise cancelling con batería 30 horas',
    imagen: '🎧'
  },
  {
    id: 4,
    nombre: 'Samsung Galaxy S24',
    categoria: 'phones',
    precio: 999,
    descripcion: 'Pantalla AMOLED 120Hz, cámara de 200MP',
    imagen: '📱'
  },
  {
    id: 5,
    nombre: 'MacBook Air M3',
    categoria: 'laptops',
    precio: 1499,
    descripcion: 'Laptop ultraligera con chip M3 de Apple',
    imagen: '💻'
  },
  {
    id: 6,
    nombre: 'Cable USB-C',
    categoria: 'accesorios',
    precio: 29,
    descripcion: 'Cable de carga rápida 3 metros',
    imagen: '🔌'
  },
  {
    id: 7,
    nombre: 'Cargador Inalámbrico',
    categoria: 'accesorios',
    precio: 49,
    descripcion: 'Cargador rápido 15W',
    imagen: '⚡'
  },
  {
    id: 8,
    nombre: 'Dell XPS 13',
    categoria: 'laptops',
    precio: 1399,
    descripcion: 'Ultrabook con pantalla InfinityEdge',
    imagen: '💻'
  }
];

/* 
  ========== 2. ESTADO DEL CARRITO ==========
  Objeto global que mantiene el estado del carrito
  
  carrito.items: Array con los productos agregados
  carrito.actualizarTotal(): Función para recalcular totales
  
  Este es un ejemplo de PATRÓN STATE MANAGEMENT
*/

const carrito = {
  /* items: Array de objetos del carrito */
  items: [],
  
  /* 
    agregarProducto: Agrega un producto al carrito
    producto: El objeto producto a agregar
  */
  agregarProducto(producto) {
    /* 
      find: Busca el primer elemento que cumpla condición
      Aquí busca si el producto ya está en el carrito
    */
    const productoExistente = this.items.find(
      item => item.id === producto.id
    );
    
    if (productoExistente) {
      /* Si ya existe, aumentar cantidad */
      productoExistente.cantidad++;
    } else {
      /* Si no existe, agregar nuevo con cantidad 1 */
      this.items.push({
        ...producto, // Copiar propiedades del producto
        cantidad: 1
      });
    }
    
    /* Guardar en localStorage (almacenamiento local) */
    this.guardar();
  },
  
  /* 
    eliminarProducto: Quitar un producto del carrito
    id: ID del producto a eliminar
  */
  eliminarProducto(id) {
    /* 
      filter: Crea nuevo array sin el elemento que cumple condición
      Esto elimina el producto con ese ID
    */
    this.items = this.items.filter(item => item.id !== id);
    
    /* Guardar cambios */
    this.guardar();
  },
  
  /* 
    actualizarCantidad: Cambiar la cantidad de un producto
    id: ID del producto
    cantidad: Nueva cantidad
  */
  actualizarCantidad(id, cantidad) {
    const producto = this.items.find(item => item.id === id);
    
    if (producto) {
      if (cantidad <= 0) {
        /* Si cantidad es 0 o menor, eliminar */
        this.eliminarProducto(id);
      } else {
        /* Si no, actualizar cantidad */
        producto.cantidad = cantidad;
        this.guardar();
      }
    }
  },
  
  /* 
    vaciar: Quitar todos los productos del carrito
  */
  vaciar() {
    this.items = [];
    this.guardar();
  },
  
  /* 
    obtenerSubtotal: Sumar el precio de todos los productos
    
    reduce: Método que acumula un valor
    Recorre array y suma precios * cantidad de cada item
  */
  obtenerSubtotal() {
    /* 
      reduce(acumulador, item) 
      acumulador: Valor que se acumula
      item: Elemento actual del array
    */
    return this.items.reduce((total, item) => {
      return total + (item.precio * item.cantidad);
    }, 0); // 0: valor inicial del acumulador
  },
  
  /* 
    obtenerTotal: Subtotal + impuestos (10%)
  */
  obtenerTotal() {
    const subtotal = this.obtenerSubtotal();
    const impuesto = subtotal * 0.10; // 10% de impuesto
    return subtotal + impuesto;
  },
  
  /* 
    guardar: Guardar carrito en localStorage
    JSON.stringify: Convertir objeto a texto JSON
  */
  guardar() {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  },
  
  /* 
    cargar: Recuperar carrito del localStorage
    JSON.parse: Convertir texto JSON a objeto
  */
  cargar() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.items = JSON.parse(carritoGuardado);
    }
  }
};

/* 
  ========== 3. VARIABLES GLOBALES ==========
  Variables que usamos en todo el script
*/

let productosFiltrados = [...productos]; // Copia de array

const gridProductos = document.getElementById('grid-productos');
const modalCarrito = document.getElementById('modal-carrito');
const overlay = document.getElementById('overlay');
const carritoIcon = document.querySelector('.carrito-icon');
const cantidadCarrito = document.getElementById('cantidad-carrito');
const btnCerrarModal = document.getElementById('cerrar-modal');
const btnVaciar = document.getElementById('vaciar-carrito');
const btnCheckout = document.getElementById('checkout');
const carritoItems = document.getElementById('carrito-items');

/* 
  ========== 4. FUNCIÓN: RENDERIZAR PRODUCTOS ==========
  Mostrar los productos en la página
  
  Usa innerHTML para insertar HTML dinámicamente
  (No es la forma más segura, pero es simple para este ejemplo)
*/

function renderizarProductos(productosAMostrar) {
  /* 
    Limpiar el grid
    innerHTML = '': Vaciar el contenido
  */
  gridProductos.innerHTML = '';
  
  /* 
    Recorrer cada producto
    forEach: Repetir para cada elemento
  */
  productosAMostrar.forEach(producto => {
    /* 
      Crear HTML de la tarjeta de producto
      Usar backticks (`) para template strings
      ${variable}: Insertar variable dentro de string
    */
    const html = `
      <div class="tarjeta-producto">
        <div class="producto-imagen">${producto.imagen}</div>
        <div class="producto-contenido">
          <h3 class="producto-nombre">${producto.nombre}</h3>
          <p class="producto-categoria">${producto.categoria}</p>
          <p class="producto-descripcion">${producto.descripcion}</p>
          <div class="producto-precio">$${producto.precio}</div>
          <button class="btn btn-primario btn-agregar-carrito" 
                  data-id="${producto.id}">
            Agregar al Carrito
          </button>
        </div>
      </div>
    `;
    
    /* Insertar HTML en el grid */
    gridProductos.innerHTML += html;
  });
  
  /* 
    Agregar listeners a los botones después de crearlos
    querySelectorAll: Seleccionar todos
  */
  const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', function() {
      /* 
        getAttribute: Obtener el valor del data-id
        parseInt: Convertir string a número
      */
      const productoId = parseInt(this.getAttribute('data-id'));
      
      /* Buscar el producto en el array */
      const producto = productos.find(p => p.id === productoId);
      
      if (producto) {
        carrito.agregarProducto(producto);
        actualizarIndicadorCarrito();
        
        /* Efecto visual: cambiar texto del botón */
        const textoOriginal = this.textContent;
        this.textContent = '✓ Agregado';
        this.disabled = true;
        
        /* Volver al texto original después de 1 segundo */
        setTimeout(() => {
          this.textContent = textoOriginal;
          this.disabled = false;
        }, 1000);
      }
    });
  });
}

/* 
  ========== 5. FUNCIÓN: ACTUALIZAR INDICADOR CARRITO ==========
  Mostrar la cantidad de productos en el badge del carrito
*/

function actualizarIndicadorCarrito() {
  /* 
    reduce: Sumar todas las cantidades
    Si tienes 2 productos con cantidad 3 y 1,
    el total es 4
  */
  const totalProductos = carrito.items.reduce(
    (total, item) => total + item.cantidad,
    0
  );
  
  cantidadCarrito.textContent = totalProductos;
}

/* 
  ========== 6. FUNCIÓN: RENDERIZAR CARRITO EN MODAL ==========
  Mostrar los productos del carrito en la tabla del modal
*/

function renderizarCarrito() {
  /* Limpiar tabla */
  carritoItems.innerHTML = '';
  
  /* Si carrito está vacío, mostrar mensaje */
  if (carrito.items.length === 0) {
    carritoItems.innerHTML = '<tr><td colspan="5">Carrito vacío</td></tr>';
    actualizarTotalesCarrito();
    return;
  }
  
  /* Recorrer items del carrito */
  carrito.items.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    
    const html = `
      <tr>
        <td>${item.nombre}</td>
        <td>$${item.precio}</td>
        <td>
          <input type="number" min="1" value="${item.cantidad}"
                 data-id="${item.id}" class="cantidad-input">
        </td>
        <td>$${subtotal.toFixed(2)}</td>
        <td>
          <button class="btn-eliminar" data-id="${item.id}">
            Eliminar
          </button>
        </td>
      </tr>
    `;
    
    carritoItems.innerHTML += html;
  });
  
  /* Listeners para cambiar cantidad */
  const inputsCantidad = document.querySelectorAll('.cantidad-input');
  inputsCantidad.forEach(input => {
    input.addEventListener('change', function() {
      const id = parseInt(this.getAttribute('data-id'));
      const cantidad = parseInt(this.value);
      
      carrito.actualizarCantidad(id, cantidad);
      renderizarCarrito();
      actualizarIndicadorCarrito();
    });
  });
  
  /* Listeners para eliminar productos */
  const botonesEliminar = document.querySelectorAll('.btn-eliminar');
  botonesEliminar.forEach(boton => {
    boton.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      carrito.eliminarProducto(id);
      renderizarCarrito();
      actualizarIndicadorCarrito();
    });
  });
  
  /* Actualizar totales */
  actualizarTotalesCarrito();
}

/* 
  ========== 7. FUNCIÓN: ACTUALIZAR TOTALES ==========
  Mostrar subtotal, impuestos y total
*/

function actualizarTotalesCarrito() {
  const subtotal = carrito.obtenerSubtotal();
  const impuesto = subtotal * 0.10;
  const total = carrito.obtenerTotal();
  
  /* 
    toFixed(2): Mostrar 2 decimales
    1234.5 → "1234.50"
  */
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('impuesto').textContent = `$${impuesto.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

/* 
  ========== 8. FUNCIÓN: FILTRAR PRODUCTOS ==========
  Mostrar solo productos de una categoría
*/

function filtrarProductos(categoria) {
  if (categoria === 'todos') {
    /* Si es "todos", mostrar todos */
    productosFiltrados = [...productos];
  } else {
    /* 
      filter: Crear nuevo array solo con productos de la categoría
      Condición: item.categoria === categoria
    */
    productosFiltrados = productos.filter(
      item => item.categoria === categoria
    );
  }
  
  /* Renderizar los filtrados */
  renderizarProductos(productosFiltrados);
}

/* 
  ========== 9. GESTIÓN DEL MODAL ==========
  Abrir y cerrar el modal del carrito
*/

function abrirModal() {
  /* Agregar clase para mostrar */
  modalCarrito.classList.add('activo');
  overlay.classList.add('activo');
  
  /* Renderizar contenido del carrito */
  renderizarCarrito();
}

function cerrarModal() {
  /* Quitar clase para ocultar */
  modalCarrito.classList.remove('activo');
  overlay.classList.remove('activo');
}

/* 
  ========== 10. EVENT LISTENERS PRINCIPALES ==========
  Escuchadores de eventos para la interacción
*/

/* Carrito: Click para abrir modal */
carritoIcon.addEventListener('click', abrirModal);

/* Botón cerrar modal */
btnCerrarModal.addEventListener('click', cerrarModal);

/* Overlay: Click para cerrar modal */
overlay.addEventListener('click', cerrarModal);

/* Botón vaciar carrito */
btnVaciar.addEventListener('click', function() {
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    carrito.vaciar();
    renderizarCarrito();
    actualizarIndicadorCarrito();
  }
});

/* Botón checkout (ir a pagar) */
btnCheckout.addEventListener('click', function() {
  if (carrito.items.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  /* Aquí normalmente iría a pasarela de pago */
  const total = carrito.obtenerTotal().toFixed(2);
  alert(`Total a pagar: $${total}\n\nEn una app real, aquí iría a PayPal/Stripe`);
});

/* Botones de filtro */
const botonesFiltero = document.querySelectorAll('.btn-filtro');
botonesFiltero.forEach(boton => {
  boton.addEventListener('click', function() {
    /* 
      Remover clase activo de todos
      Agregar solo a este
    */
    botonesFiltero.forEach(b => b.classList.remove('activo'));
    this.classList.add('activo');
    
    /* Obtener categoría del data-filtro */
    const categoria = this.getAttribute('data-filtro');
    filtrarProductos(categoria);
  });
});

/* 
  ========== 11. INICIALIZACIÓN ==========
  Código que se ejecuta cuando carga la página
*/

document.addEventListener('DOMContentLoaded', function() {
  console.log('✓ Tienda Online Cargada');
  
  /* Cargar carrito guardado */
  carrito.cargar();
  
  /* Mostrar productos inicialmente */
  renderizarProductos(productos);
  
  /* Actualizar indicador del carrito */
  actualizarIndicadorCarrito();
  
  console.log('📦 Productos cargados:', productos.length);
  console.log('🛒 Items en carrito:', carrito.items.length);
});
