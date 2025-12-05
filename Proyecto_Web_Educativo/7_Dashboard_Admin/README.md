# 7_Dashboard_Admin

## 📌 Descripción

Panel de control administrativo profesional con múltiples secciones y funcionalidades. Ideal para aprender:

- Layout sidebar + main content
- Gestión de múltiples secciones
- Tablas de datos interactivas
- Tarjetas de estadísticas
- Gráficos simples
- Formularios de configuración
- localStorage para persistencia
- Navegación entre secciones

## 🎯 Características Principales

### 1. **Sidebar Navegación**
```html
<!-- En index.html, línea 20-65 -->
- Logo del dashboard
- 6 menú items (Dashboard, Usuarios, Productos, Ventas, Reportes, Config)
- Información del usuario actual
- Botón logout
```

### 2. **Secciones del Dashboard**

#### a) **Inicio (Dashboard)**
```html
- 4 tarjetas de estadísticas (Usuarios, Ingresos, Órdenes, Conversión)
- Gráfico de ventas por mes (placeholder)
- Top 5 productos más vendidos
- Tabla de últimas transacciones
```

#### b) **Usuarios**
```html
- Tabla de usuarios del sistema
- Botón "Nuevo Usuario"
- Acciones: Editar, Eliminar
- Rol, Estado, Email visible
```

#### c) **Productos**
```html
- Grid de productos con tarjetas
- Imagen (emoji), nombre, precio, stock
- Botones de editar/eliminar
- Botón "Nuevo Producto"
```

#### d) **Ventas**
```html
- Filtros por fecha (desde/hasta)
- Tabla de ventas con comisión
- Datos: Orden, Cliente, Cantidad, Total, Comisión, Fecha
```

#### e) **Reportes**
```html
- Botones para descargar PDF/Excel
- Información sobre reportes disponibles
```

#### f) **Configuración**
```html
- Formulario para datos de empresa
- Campos: Nombre, Email, Teléfono
- Guardar cambios
```

### 3. **Header Interactivo**
```html
- Título dinámico por sección
- Buscador en tiempo real
- Icono de notificaciones con badge
- Botón para cambiar tema
```

### 4. **Tablas de Datos**
```css
- Encabezados destacados
- Hover en filas
- Badges para estados
- Botones de acción en cada fila
```

## 📁 Estructura de Archivos

```
7_Dashboard_Admin/
├── index.html        # Estructura HTML (700+ líneas comentadas)
├── styles.css        # Estilos profesionales (650+ líneas comentadas)
├── script.js         # Interactividad (400+ líneas comentadas)
└── README.md         # Este archivo
```

## 🚀 Cómo Usar

### 1. **Abrir en navegador**
```bash
# Solo abre index.html
# Completamente funcional sin servidor
```

### 2. **Cambiar entre secciones**
En `script.js`, línea 60-90:
```javascript
// Los clicks en menú items llaman a cambiarSeccion()
// Que muestra/oculta las secciones correspondientes
cambiarSeccion("usuarios") // Muestra sección de usuarios
cambiarSeccion("productos") // Muestra sección de productos
```

### 3. **Personalizar Datos**

En `script.js`, línea 20-35:
```javascript
const usuarios = [
  { id: 1, nombre: "Juan García", email: "juan@empresa.com", rol: "Admin" },
  // Edita o agrega más usuarios aquí
];

const productos = [
  { id: 1, nombre: "Laptop HP", precio: 650, stock: 5 },
  // Edita o agrega más productos aquí
];
```

### 4. **Cambiar Colores**
En `styles.css`:
```css
/* Línea 15 */
.sidebar {
  background-color: #2c3e50;  /* Cambia este color */
}

/* Línea 250 */
.btn-primario {
  background-color: #667eea;  /* Cambia este color */
}
```

### 5. **Agregar Nueva Sección**

1. En `index.html`, agregar nuevo menú item:
```html
<a href="#" class="menu-item" data-seccion="miSeccion">
  <span class="icono">📌</span>
  <span class="texto">Mi Sección</span>
</a>
```

2. En `index.html`, crear la sección:
```html
<section id="seccion-miSeccion" class="seccion">
  <h2 class="titulo-seccion">Mi Sección</h2>
  <!-- Tu contenido aquí -->
</section>
```

3. En `script.js`, agregar título:
```javascript
const mapaTitulos = {
  inicio: "Dashboard",
  // ...
  miSeccion: "Mi Nueva Sección",  // Agregar aquí
};
```

## 🎨 Personalizar Estilos

### Color del Sidebar
```css
/* En styles.css, línea 15 */
.sidebar {
  background-color: #2c3e50;  /* Tu color */
}
```

### Color de Botones
```css
/* En styles.css, línea 250 */
.btn-primario {
  background-color: #667eea;  /* Tu color */
}
```

### Ancho del Sidebar
```css
/* En styles.css, línea 10 */
.sidebar {
  width: 250px;  /* Aumenta o disminuye */
}
```

## 💾 Componentes Reutilizables

### 1. **Sistema de Navegación Tabs**
```javascript
// Copiar desde: script.js, línea 60-100
cambiarSeccion() - Cambia entre secciones
agregarEventListenersMenu() - Maneja clicks
// Úsalo para: dashboards multi-sección
```

### 2. **Búsqueda Dinámica**
```javascript
// Copiar desde: script.js, línea 140-170
realizarBusqueda() - Filtra datos
// Úsalo para: búsqueda en tablas/listas
```

### 3. **Validación de Datos**
```javascript
// Copiar desde: script.js, línea 210
validarEmail() - Valida email
// Úsalo para: validación de formularios
```

### 4. **Almacenamiento Local**
```javascript
// Copiar desde: script.js, línea 280+
localStorage.setItem()
localStorage.getItem()
// Úsalo para: guardar preferencias/datos
```

## 🔧 Conceptos JavaScript Utilizados

```javascript
// ✅ querySelector / querySelectorAll
const elemento = document.querySelector(".selector")
const elementos = document.querySelectorAll(".selector")

// ✅ addEventListener
elemento.addEventListener("click", handler)

// ✅ classList
elemento.classList.add("activo")
elemento.classList.remove("activo")

// ✅ dataset (atributos de datos)
elemento.dataset.seccion

// ✅ Array.prototype.filter()
usuarios.filter(u => u.nombre.includes(termino))

// ✅ localStorage
localStorage.setItem("clave", valor)
localStorage.getItem("clave")

// ✅ console.log()
console.log("Mensaje de debug")

// ✅ prompt()
const valor = prompt("Ingresa algo:")

// ✅ alert()
alert("Mensaje al usuario")

// ✅ setInterval()
const intervalo = setInterval(() => { }, 1000)

// ✅ RegExp validación
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

## 📱 Responsividad

- **Desktop** (>768px): Sidebar visible, grid normal
- **Tablet** (481-768px): Grid de 2 columnas, sidebar ajustado
- **Mobile** (<480px): Sidebar colapsado, tablas scrolleables, grid 1 columna

Media queries en `styles.css`, líneas 600-650.

## 🎓 Cómo Extender

### 1. **Conectar a Base de Datos Real**
```javascript
// En lugar de array local, usar fetch:
fetch('/api/usuarios')
  .then(res => res.json())
  .then(data => {
    usuarios = data
    renderizarTabla()
  })
```

### 2. **Agregar Filtros Avanzados**
```html
<!-- Agregar input de filtro -->
<input type="text" id="filtro-rol" placeholder="Filtrar por rol">
```

```javascript
// Implementar filtrado
document.querySelector("#filtro-rol").addEventListener("change", (e) => {
  usuarios = usuariosOriginales.filter(u => u.rol === e.target.value)
  renderizarTabla()
})
```

### 3. **Gráficos Reales**
```html
<!-- Usar Chart.js o similar -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

```javascript
const ctx = document.querySelector('#grafico')
const chart = new Chart(ctx, {
  type: 'bar',
  data: { /* datos */ }
})
```

### 4. **Exportar a Excel/PDF**
```javascript
// Usar SheetJS para Excel:
// https://sheetjs.com/

// Usar jsPDF para PDF:
// https://github.com/parallax/jsPDF
```

### 5. **Sistema de Permisos**
```javascript
// Verificar rol del usuario
if (usuario.rol === "Admin") {
  mostrarBotonEliminar()
}
```

## 📊 Estadísticas del Código

- **Líneas de HTML**: 700+ (100% comentado)
- **Líneas de CSS**: 650+ (100% comentado)
- **Líneas de JavaScript**: 400+ (100% comentado)
- **Secciones**: 6 (Dashboard, Usuarios, Productos, Ventas, Reportes, Config)
- **Tablas**: 3 (Transacciones, Usuarios, Ventas)
- **Tarjetas de estadística**: 4
- **Menú items**: 6
- **Usuarios en sistema**: 3
- **Productos en catálogo**: 4

## 🎯 Caso de Uso Real

```
Perfecto para:
✅ Dashboards administrativos
✅ Paneles de control SaaS
✅ Gestión de inventario
✅ Paneles de análisis
✅ Sistemas CRM
✅ Portales de administración
✅ Sistemas de reporte de datos
```

## ⚡ Mejoras Sugeridas

1. **Modo Oscuro**: Ya está el botón, agregar estilos CSS
2. **Búsqueda Global**: Buscar en usuarios, productos y ventas
3. **Paginación**: Agregar para tablas grandes
4. **Gráficos Interactivos**: Usar Chart.js
5. **Exportación de Datos**: PDF, Excel, CSV
6. **Sistema de Permisos**: Admin, Editor, Viewer
7. **Notificaciones en Tiempo Real**: Usar WebSockets
8. **Auditoría de Cambios**: Log de quién cambió qué

## 🔐 Consideraciones de Seguridad

- **Validar en servidor**: No confiar solo en cliente
- **Tokens de autenticación**: Usar JWT o similar
- **HTTPS**: Siempre en producción
- **Sanitización**: Limpiar inputs antes de guardar
- **Rate Limiting**: Proteger contra ataques de fuerza bruta
- **CORS**: Configurar correctamente

## 🐛 Debugging

```javascript
// Ver qué sección está activa
console.log(seccionActual)

// Ver usuarios cargados
console.log(usuarios)

// Ver productos cargados
console.log(productos)

// Ver en qué se gastó el localStorage
console.log(localStorage)
```

---

✅ **Listo para ser tu panel de control administrativo personalizado.**

**Tip**: Conecta a una base de datos real y tendrás un dashboard completamente funcional.
