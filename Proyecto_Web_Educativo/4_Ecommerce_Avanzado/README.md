# 4_Ecommerce_Avanzado

## 📌 Descripción

Este proyecto es una **tienda online completa y funcional** con características avanzadas de un ecommerce profesional. Es ideal para aprender:

- Filtrado avanzado de productos (múltiples criterios)
- Ordenamiento dinámico (6 opciones)
- Sistema de carrito persistente (localStorage)
- Sistema de wishlist/favoritos
- Gestión de modalidad (ventanas emergentes)
- Validación de cantidades y stock
- Cálculo de impuestos

## 🎯 Características Principales

### 1. **Filtrado Múltiple**
```javascript
// En script.js, líneas 180-230
- Por categoría (Electrónica, Accesorios, Cables)
- Por rango de precio (mín y máx)
- Por rating mínimo (estrellas)
- Combinación de todos los filtros
```

### 2. **Ordenamiento (6 opciones)**
```javascript
// En script.js, línea 250
- Relevancia (orden original)
- Precio: menor a mayor
- Precio: mayor a menor
- Popularidad (cantidad de reviews)
- Más nuevo (ID más alto)
- Mejor rating (calificación)
```

### 3. **Carrito Completo**
```javascript
// En script.js, línea 26-30
- Agregar/eliminar productos
- Cambiar cantidades
- Validación de stock
- Cálculo automático de IVA (19%)
- Persistencia en localStorage
```

### 4. **Sistema de Wishlist**
```javascript
// En script.js, línea 400-430
- Agregar/remover favoritos
- Contador de favoritos
- Persistencia en localStorage
- Visual del corazón con estado
```

### 5. **Modalidad Interactiva**
```html
<!-- En index.html -->
- Modal de detalles del producto
- Modal del carrito
- Overlay oscuro de fondo
- Cerrar con botón X o click en overlay
```

## 📁 Estructura de Archivos

```
4_Ecommerce_Avanzado/
├── index.html        # Estructura HTML completa
├── styles.css        # Estilos responsive (500+ líneas comentadas)
├── script.js         # Lógica JavaScript (800+ líneas comentadas)
└── README.md         # Este archivo
```

## 🚀 Cómo Usar el Proyecto

### 1. **Abrir en el navegador**
```bash
# Simplemente abre index.html en tu navegador
# No requiere servidor, funciona completamente en cliente
```

### 2. **Estructura de datos - Productos**
En `script.js`, línea 12-100, está el array de productos:

```javascript
const productos = [
  {
    id: 1,
    nombre: "Laptop HP Pavilion 15",
    categoria: "electrónica",
    precio: 800,                    // Precio original
    precioActual: 650,              // Precio con descuento
    descuento: 18,                  // Porcentaje de descuento
    rating: 4.5,                    // Calificación (0-5)
    reviews: 128,                   // Cantidad de reseñas
    stock: 5,                       // Cantidad disponible
    emoji: "💻",                    // Icono visual
  },
  // Más productos...
];
```

### 3. **Agregar Nuevos Productos**
Para agregar un producto, simplemente agrega un objeto más al array:

```javascript
const productos = [
  // ... productos existentes ...
  {
    id: 13,  // ID único (mayor que los anteriores)
    nombre: "Tu Producto Aquí",
    categoria: "electrónica",
    precio: 300,
    precioActual: 250,
    descuento: 17,
    rating: 4.8,
    reviews: 50,
    stock: 10,
    emoji: "📱",  // Elige un emoji
  }
];
```

## 🎨 Personalizar Estilos

### Cambiar Colores Principales
En `styles.css`, busca estos valores y reemplaza:

```css
/* Línea 15 - Color primario (gradiente) */
.header-ecommerce {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Cambia #667eea y #764ba2 por tus colores */
}

/* Línea 210 - Color de botones */
.btn-primario {
  background-color: #667eea;  /* Tu color aquí */
}

/* Línea 234 - Color de acentos */
.precio-actual {
  color: #667eea;  /* Tu color aquí */
}
```

### Cambiar Tamaño de Grid
En `styles.css`, línea 243:

```css
.grid-productos-ecommerce {
  /* Actual: 4 columnas en desktop, auto en mobile */
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  
  /* Cambia 240px para más/menos productos por fila */
  /* 240px = ~4 productos en 1000px */
  /* 200px = ~5 productos en 1000px */
  /* 280px = ~3 productos en 1000px */
}
```

## 💾 Funcionalidades Clave - Dónde Copiar

### Para tu propio proyecto, puedes copiar:

1. **Array de datos con estructura**
   - Ubicación: `script.js`, líneas 12-100
   - Úsalo para: Cualquier lista de productos/items

2. **Sistema de filtrado**
   - Ubicación: `script.js`, función `aplicarFiltros()` línea 180
   - Úsalo para: Buscar en bases de datos, catálogos

3. **Sistema de ordenamiento**
   - Ubicación: `script.js`, función `aplicarOrdenamiento()` línea 250
   - Úsalo para: Ordenar cualquier lista de datos

4. **Gestión de carrito**
   - Ubicación: `script.js`, función `agregarAlCarritoDesdeModal()` línea 360
   - Úsalo para: Cualquier sistema de "añadir a lista"

5. **Sistema localStorage**
   - Ubicación: `script.js`, línea 135 y función `guardarCarrito()` línea 545
   - Úsalo para: Persistencia de datos en el navegador

6. **Grid responsive**
   - Ubicación: `styles.css`, línea 243
   - Úsalo para: Layouts de grillas en cualquier proyecto

## 🔧 Conceptos JavaScript Utilizados

```javascript
// ✅ Array.prototype.map()
productosActuales.forEach(producto => { /* renderizar */ });

// ✅ Array.prototype.filter()
productos.filter(p => p.categoria === "electrónica")

// ✅ Array.prototype.find()
productos.find(p => p.id === productoId)

// ✅ Array.prototype.reduce()
carrito.items.reduce((total, item) => total + item.cantidad, 0)

// ✅ Array.prototype.sort()
productos.sort((a, b) => a.precio - b.precio)

// ✅ Template strings (backticks)
`Precio: $${producto.precioActual.toLocaleString()}`

// ✅ Destructuring en parámetros
const { id, nombre, precio } = producto

// ✅ localStorage
localStorage.setItem("carrito", JSON.stringify(carrito))
const carrito = JSON.parse(localStorage.getItem("carrito"))

// ✅ Event listeners
element.addEventListener("click", function() { /* ... */ })

// ✅ Manipulación del DOM
element.classList.add("activo")
element.classList.remove("activo")
element.innerHTML = "Nuevo contenido"
element.dataset.productoId = 5
```

## 📱 Responsividad

El proyecto es **100% responsive**:

- **Desktop** (>768px): Grid de 4 productos
- **Tablet** (481-768px): Grid de 2-3 productos
- **Mobile** (<480px): Grid de 1 producto (fullwidth)

Media queries están en `styles.css`, líneas 550-600.

## 🐛 Troubleshooting

### Los productos no se muestran
- Verifica que el HTML tiene `<div class="grid-productos-ecommerce"></div>`
- Revisa que `script.js` esté incluido en el HTML
- Abre la consola (F12) y busca errores

### El carrito no guarda datos
- Verifica que localStorage está habilitado en el navegador
- Los datos se guardan en `localStorage.carrito`

### Los filtros no funcionan
- Asegúrate que los select tienen los IDs correctos:
  - `#filtro-categoria`
  - `#filtro-rating`
  - `#precio-min` y `#precio-max`
  - `#ordenar-por`

## 🎓 Próximos Pasos para Aprender

1. Conectar a una API real (JSON Server, Firebase, etc)
2. Agregar sistema de autenticación
3. Implementar pasarela de pagos (Stripe, PayPal)
4. Agregar imágenes reales en lugar de emojis
5. Crear página de confirmación de pedido
6. Agregar reviews/comentarios de usuarios

## 📊 Estadísticas del Código

- **Líneas de HTML**: 350+
- **Líneas de CSS**: 500+ (100% comentado)
- **Líneas de JavaScript**: 800+ (100% comentado)
- **Productos en catálogo**: 12
- **Tipos de filtros**: 4 (categoría, precio, rating, ordenamiento)
- **Modales**: 2 (producto, carrito)
- **Funciones principales**: 15+

---

✅ **¡Listo para copiar y personalizar!** Toma lo que necesites y adáptalo a tu proyecto.
