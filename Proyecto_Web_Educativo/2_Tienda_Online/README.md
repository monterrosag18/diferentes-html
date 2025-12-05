# 🛒 Tienda Online - Guía Rápida

## ¿Qué es este proyecto?

Una **tienda electrónica funcional** como ejemplo educativo. Incluye carrito dinámico, filtros y cálculo de totales.

---

## 📂 Archivos

| Archivo | Propósito |
|---------|-----------|
| `index.html` | Estructura con modal y tabla |
| `styles.css` | Estilos modernos y responsive |
| `script.js` | Lógica del carrito (AVANZADO) |

---

## 🎯 Características

✅ **Grid de productos** dinámico  
✅ **Filtros por categoría** funcionales  
✅ **Carrito completamente funcional**  
✅ **Modal emergente** para ver carrito  
✅ **Tabla interactiva** con cambio de cantidades  
✅ **Cálculo automático** de subtotal e impuestos  
✅ **LocalStorage** para persistencia  
✅ **Responsive** perfecto en móvil  
✅ **Badge** con cantidad de productos  

---

## 🏗️ Estructura HTML

```html
<header>                  → Logo y carrito
  .carrito-icon           → Icono con badge
    <span class="cantidad"> → Número de productos

<main>
  .seccion-catalogo       → Catálogo con filtros
    .filtros              → Botones de categoría
    .grid-productos       → Tarjetas dinámicas

<div class="modal">       → Modal del carrito
  <table>                 → Tabla con items
    <thead>               → Encabezados
    <tbody>               → Filas dinámicas
```

---

## 🎨 Estilos CSS Principales

```css
/* Grid responsivo de productos */
.grid-productos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* Modal centrado y fijo */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

/* Overlay (fondo oscuro) */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Mostrar modal con clase JavaScript */
.modal.activo,
.overlay.activo {
  display: block;
}

/* Tarjeta con efecto hover */
.tarjeta-producto {
  transition: transform 0.3s, box-shadow 0.3s;
}

.tarjeta-producto:hover {
  transform: translateY(-5px);  /* Sube al pasar mouse */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
```

---

## ⚙️ Lógica JavaScript (AVANZADO)

### 1. Objeto Carrito (Patrón State Management)
```javascript
const carrito = {
  items: [],
  
  agregarProducto(producto) {
    const existente = this.items.find(i => i.id === producto.id);
    if (existente) {
      existente.cantidad++;
    } else {
      this.items.push({...producto, cantidad: 1});
    }
    this.guardar();  // Persistir en localStorage
  },
  
  obtenerTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.precio * item.cantidad);
    }, 0);
  }
};
```

### 2. Array de Productos
```javascript
const productos = [
  {
    id: 1,
    nombre: 'Laptop',
    categoria: 'laptops',
    precio: 1200,
    imagen: '💻'
  },
  // ... más productos
];
```

### 3. Renderizar Productos Dinámicamente
```javascript
function renderizarProductos(productosAMostrar) {
  gridProductos.innerHTML = '';
  
  productosAMostrar.forEach(producto => {
    const html = `
      <div class="tarjeta-producto">
        <img src="${producto.imagen}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button data-id="${producto.id}">Agregar</button>
      </div>
    `;
    gridProductos.innerHTML += html;
  });
}
```

### 4. Filtrar Productos
```javascript
function filtrarProductos(categoria) {
  const productosFiltrados = productos.filter(
    p => p.categoria === categoria
  );
  renderizarProductos(productosFiltrados);
}
```

### 5. Abrir/Cerrar Modal
```javascript
function abrirModal() {
  modal.classList.add('activo');
  overlay.classList.add('activo');
}

function cerrarModal() {
  modal.classList.remove('activo');
  overlay.classList.remove('activo');
}
```

### 6. Renderizar Tabla del Carrito
```javascript
function renderizarCarrito() {
  carritoItems.innerHTML = '';
  
  carrito.items.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    const html = `
      <tr>
        <td>${item.nombre}</td>
        <td>$${item.precio}</td>
        <td><input type="number" value="${item.cantidad}"></td>
        <td>$${subtotal}</td>
        <td><button>Eliminar</button></td>
      </tr>
    `;
    carritoItems.innerHTML += html;
  });
  
  actualizarTotales();
}
```

### 7. Calcular Totales
```javascript
function actualizarTotalesCarrito() {
  const subtotal = carrito.obtenerSubtotal();
  const impuesto = subtotal * 0.10;
  const total = carrito.obtenerTotal();
  
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('impuesto').textContent = `$${impuesto.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}
```

### 8. LocalStorage (Persistencia)
```javascript
// Guardar carrito en localStorage
carrito.guardar = function() {
  localStorage.setItem('carrito', JSON.stringify(this.items));
};

// Cargar carrito al iniciar
carrito.cargar = function() {
  const guardado = localStorage.getItem('carrito');
  if (guardado) {
    this.items = JSON.parse(guardado);
  }
};

// Ejecutar al cargar página
carrito.cargar();
```

---

## 🎓 Conceptos Avanzados

### Métodos de Array

```javascript
// map: Transformar elementos
const nombres = productos.map(p => p.nombre);

// filter: Seleccionar elementos
const baratos = productos.filter(p => p.precio < 100);

// find: Buscar UN elemento
const producto = productos.find(p => p.id === 1);

// reduce: Acumular valor
const total = carrito.items.reduce(
  (suma, item) => suma + item.precio * item.cantidad,
  0
);
```

### Data Attributes

```html
<!-- Guardar datos en HTML -->
<button data-id="123" data-categoria="laptops">
  Botón
</button>

<!-- Acceder en JavaScript -->
const id = this.getAttribute('data-id');
const categoria = this.dataset.categoria;
```

### Template Strings (Backticks)

```javascript
// Antes (concatenación)
const html = '<div>' + producto.nombre + '</div>';

// Ahora (template strings)
const html = `<div>${producto.nombre}</div>`;

// Con expresiones
const html = `<p>Total: $${precio * cantidad}</p>`;
```

---

## 🚀 Cómo Usar

1. **Abre en navegador**
2. **Haz click en filtros** para ver categorías
3. **Agrega productos** al carrito
4. **Haz click en carrito** para ver modal
5. **Cambia cantidades** o elimina productos
6. **Cierra navegador** y reabre: ¡carrito sigue ahí!

---

## 🔄 Flujo de Datos

```
Usuario hace click → Event Listener
                  ↓
            Función JavaScript
                  ↓
           Modifica array carrito
                  ↓
           Guarda en localStorage
                  ↓
         Re-renderiza HTML (DOM)
                  ↓
            Usuario ve cambios
```

---

## 💡 Tips de Aprendizaje

- 📖 Lee cada comentario en `script.js`
- 🔍 Abre F12 y ve la pestaña **Network** (se guarda en localStorage)
- 📊 Usa `console.log()` para entender flujo
- 🧪 Prueba agregar/quitar productos
- 📱 Redimensiona para ver responsive

---

## ⚠️ Puntos Importantes

- **No hay servidor**: Todo es en el navegador
- **Datos se pierden**: Si limpias localStorage
- **En producción**: Necesitarías backend para procesar pagos
- **Seguridad**: Los precios están en cliente (maleable), agregar validación en servidor

---

## 🔗 Archivos Relacionados

- **README.md** (padre) - Guía general
- **1_Portfolio_Basico/** - Proyecto básico
- **3_Blog_Responsivo/** - Proyecto avanzado

---

**¡Este es el proyecto más completo!** Domina esto y estás listo. 🚀
