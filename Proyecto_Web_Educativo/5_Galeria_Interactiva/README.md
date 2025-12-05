# 5_Galeria_Interactiva

## 📌 Descripción

Galería de imágenes completamente interactiva con múltiples características profesionales. Ideal para aprender:

- Filtrado dinámico de elementos
- Cambio entre diferentes vistas (Grid vs Masonry)
- Modal lightbox con navegación
- Navegación por teclado (flechas + Escape)
- Transiciones y animaciones suaves
- Manipulación avanzada del DOM

## 🎯 Características Principales

### 1. **Dos Vistas de Galería**
```javascript
// En script.js, línea 200
Grid Normal: 
  - Layout uniforme
  - 3-4 imágenes por fila en desktop
  
Masonry:
  - Algunas imágenes ocupan más espacio (2x2)
  - Efecto Pinterest
  - Llena mejor el espacio disponible
```

### 2. **Filtrado por Categoría**
```javascript
// En script.js, línea 220-240
- Todos (12 imágenes)
- Naturaleza (3 imágenes)
- Urbano (3 imágenes)
- Arquitectura (3 imágenes)
- Personas (3 imágenes)
```

### 3. **Lightbox Modal Avanzado**
```javascript
// En script.js, línea 280-320
- Abre en modal centrado
- Navegación: anterior/siguiente
- Muestra posición actual (ej: 3 de 12)
- Información de la imagen
```

### 4. **Navegación por Teclado**
```javascript
// En script.js, línea 150-180
- Flecha ← : Imagen anterior
- Flecha → : Imagen siguiente
- Escape : Cerrar modal
```

### 5. **Efectos Visuales**
```css
/* En styles.css */
- Hover con zoom suave
- Overlay oscuro en hover
- Animación de apertura modal
- Transiciones de fade in/out
```

## 📁 Estructura de Archivos

```
5_Galeria_Interactiva/
├── index.html        # Estructura HTML
├── styles.css        # Estilos y animaciones (400+ líneas comentadas)
├── script.js         # Lógica interactiva (350+ líneas comentadas)
└── README.md         # Este archivo
```

## 🚀 Cómo Usar

### 1. **Abrir en navegador**
```bash
# Solo abre index.html
# No requiere servidor ni dependencias
```

### 2. **Estructura del Array de Imágenes**
En `script.js`, línea 12-60:

```javascript
const imagenes = [
  {
    id: 1,                              // ID único
    titulo: "Montaña Nevada",           // Título visible
    descripcion: "Paisaje alpino...",   // Descripción en modal
    categoria: "naturaleza",            // Categoría para filtrar
    emoji: "⛰️",                        // Emoji/Imagen (por ahora)
  },
  // Más imágenes...
];
```

### 3. **Agregar Nueva Imagen**
```javascript
const imagenes = [
  // ... imágenes existentes ...
  {
    id: 13,
    titulo: "Mi Foto Nueva",
    descripcion: "Descripción de mi foto",
    categoria: "naturaleza",  // o: urbano, arquitectura, personas
    emoji: "🌺",  // Elige un emoji representativo
  }
];

// También actualiza el contador en el botón de filtro:
// Naturaleza (3) → Naturaleza (4)
```

### 4. **Agregar Nueva Categoría**
En `index.html`, línea 30+:
```html
<button class="btn-filtro" data-categoria="deporte">
  Deporte (0)
</button>
```

Luego agrega imágenes con `categoria: "deporte"` en el array.

## 🎨 Personalizar Estilos

### Cambiar Colores Principales
```css
/* En styles.css, línea 15 */
.header-galeria {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Cambia estos colores */
}
```

### Ajustar Tamaño de Grid
```css
/* En styles.css, línea 130 */
.galeria-grid {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  /* 250px = tamaño mínimo de cada imagen */
  /* Menos = más imágenes por fila */
  /* Más = menos imágenes por fila */
}
```

### Cambiar Tamaño del Modal
```css
/* En styles.css, línea 200 */
.modal-lightbox {
  max-width: 900px;  /* Ancho máximo */
  max-height: 90vh;  /* Alto máximo */
}
```

## 💾 Componentes Reutilizables

Puedes copiar estas secciones para otros proyectos:

### 1. **Filtrado Dinámico**
```javascript
// Copiar desde: script.js, línea 220-250
filtrarPorCategoria() - Filtra array basado en categoría
// Úsalo para: cualquier filtro dinámico
```

### 2. **Modal Lightbox**
```javascript
// Copiar desde: script.js, línea 280-320
abrirLightbox() - Abre modal
cerrarLightbox() - Cierra modal
imagenAnterior() / imagenSiguiente() - Navega
// Úsalo para: galerías, carruseles, presentaciones
```

### 3. **Navegación por Teclado**
```javascript
// Copiar desde: script.js, línea 150-180
document.addEventListener("keydown", ...) 
// Úsalo para: atajos de teclado en aplicaciones
```

### 4. **Cambio de Vista**
```javascript
// Copiar desde: script.js, línea 200-215
cambiarVista() - Cambia entre Grid y Masonry
// Úsalo para: opciones de visualización
```

## 🔧 Conceptos JavaScript Utilizados

```javascript
// ✅ Array.prototype.filter()
imagenes.filter(img => img.categoria === "naturaleza")

// ✅ Array.prototype.find()
imagenes.find(img => img.id === imagenId)

// ✅ Array.prototype.findIndex()
imagenes.findIndex(img => img.id === imagenId)

// ✅ Template literals
`Imagen ${indice + 1} de ${imagenes.length}`

// ✅ classList (add/remove/toggle)
modal.classList.add("activo")
modal.classList.remove("activo")

// ✅ dataset (atributos de datos)
element.dataset.id
element.dataset.categoria

// ✅ Event listeners
element.addEventListener("click", handler)
document.addEventListener("keydown", handler)

// ✅ querySelector / querySelectorAll
document.querySelector(".btn-filtro")
document.querySelectorAll(".btn-filtro")

// ✅ Ternarios y lógica condicional
const indiceAnterior = indiceActual === 0 ? imagenes.length - 1 : indiceActual - 1
```

## 📱 Responsividad

- **Desktop** (>768px): Grid responsivo, modales grandes
- **Tablet** (481-768px): Grid ajustado, botones más pequeños
- **Mobile** (<480px): Una columna, modal fullwidth, navegación táctil

## ⌨️ Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| **←** | Imagen anterior |
| **→** | Imagen siguiente |
| **Escape** | Cerrar modal |

## 🎓 Cómo Extender el Proyecto

### 1. **Cargar imágenes reales**
```javascript
// En lugar de emoji, usar URLs:
{
  id: 1,
  titulo: "Foto",
  descripcion: "Descripción",
  categoria: "naturaleza",
  url: "https://ejemplo.com/foto.jpg"
}

// Luego en renderizarGaleria():
item.innerHTML = `<img src="${imagen.url}" alt="${imagen.titulo}">`
```

### 2. **Agregar Like/Favoritos**
```javascript
// Agregar contador de likes
likes: 0

// En modal:
<button onclick="agregarLike(${imagen.id})">❤️ Like</button>

// En localStorage:
localStorage.setItem("favoritos", JSON.stringify(favoritos))
```

### 3. **Búsqueda de Imágenes**
```javascript
// Agregar input de búsqueda
<input type="text" id="buscar" placeholder="Buscar...">

// Filtrar por título/descripción
document.querySelector("#buscar").addEventListener("input", (e) => {
  imagenesActuales = imagenes.filter(img => 
    img.titulo.toLowerCase().includes(e.target.value.toLowerCase())
  )
  renderizarGaleria()
})
```

### 4. **Ordenar Imágenes**
```javascript
// Agregar select de ordenamiento
<select id="ordenar">
  <option value="fecha">Más recientes</option>
  <option value="nombre">Alfabético</option>
  <option value="likes">Más likes</option>
</select>

// Implementar lógica de ordenamiento similar al ecommerce
```

## 📊 Estadísticas del Código

- **Líneas de HTML**: 100+
- **Líneas de CSS**: 400+ (100% comentado)
- **Líneas de JavaScript**: 350+ (100% comentado)
- **Imágenes en galería**: 12
- **Categorías**: 5
- **Vistas disponibles**: 2 (Grid, Masonry)
- **Efectos visuales**: 5+
- **Atajos de teclado**: 3

## 🎓 Caso de Uso Real

```
Puedes usar esta galería para:
✅ Portafolio de fotografía
✅ Galería de productos ecommerce
✅ Exhibición de proyectos
✅ Portfolio profesional
✅ Blog de viajes/experiencias
✅ Galería de eventos
```

---

✅ **Listo para personalizar y extender con tus propias imágenes y categorías.**
