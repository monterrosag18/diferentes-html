# 📝 Blog Responsivo - Guía Rápida

## ¿Qué es este proyecto?

Un **blog moderno** con sidebar, búsqueda, filtros y estadísticas. Ejemplo avanzado de manipulación de datos.

---

## 📂 Archivos

| Archivo | Propósito |
|---------|-----------|
| `index.html` | Estructura con sidebar |
| `styles.css` | Layout responsivo (Grid 2 columnas) |
| `script.js` | Búsqueda, filtros, estadísticas |

---

## 🎯 Características

✅ **Grid de 2 columnas** (responsive a 1 en móvil)  
✅ **Búsqueda en tiempo real** de artículos  
✅ **Filtros por categoría** dinámicos  
✅ **Artículos populares** (por vistas)  
✅ **Sistema de etiquetas** en artículos  
✅ **Suscripción** con localStorage  
✅ **Sidebar dinámico** con widgets  
✅ **Formateo de fechas** legibles  
✅ **Estadísticas** en consola  

---

## 🏗️ Estructura HTML

```html
<header>                → Logo y buscador
  <input type="search">  → Campo de búsqueda

<div class="contenedor-principal">  <!-- Grid 2 col -->
  
  <main>                → Artículos
    .seccion-articulos
      .listado-articulos
        .articulo (dinámico)
  
  <aside class="sidebar-blog">  → Columna lateral
    .widget                      → Componentes reutilizables
      h3 Acerca del Blog
      h3 Populares
      h3 Categorías
      h3 Suscripción
```

---

## 🎨 Estilos CSS Principales

```css
/* Grid 2 columnas */
.contenedor-principal {
  display: grid;
  grid-template-columns: 1fr 300px;  /* Main 1fr, Sidebar 300px */
  gap: 30px;
}

/* Responsive: cambiar en móvil */
@media (max-width: 768px) {
  .contenedor-principal {
    grid-template-columns: 1fr;  /* 1 columna */
  }
  
  .sidebar-blog {
    order: -1;  /* Sidebar arriba */
  }
}

/* Artículos con borde decorativo */
.articulo {
  border-left: 4px solid #667eea;
  padding: 20px;
  transition: transform 0.3s;
}

.articulo:hover {
  transform: translateX(5px);  /* Se mueve al pasar mouse */
}

/* Etiquetas/tags */
.etiqueta {
  background-color: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;  /* Muy redondeado */
  font-size: 0.8rem;
}

/* Widgets (componentes sidebar) */
.widget {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.widget h3 {
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}
```

---

## ⚙️ JavaScript Avanzado

### 1. Base de Datos de Artículos
```javascript
const articulos = [
  {
    id: 1,
    titulo: 'Intro a HTML5',
    autor: 'Carlos López',
    fecha: '2024-12-03',
    categoria: 'HTML',
    contenido: '...',
    etiquetas: ['html5', 'semántico', 'seo'],
    vistas: 1250
  },
  // ... más artículos
];
```

### 2. Renderizar Artículos Dinámicamente
```javascript
function renderizarArticulos(articulosAMostrar) {
  listadoArticulos.innerHTML = '';
  
  articulosAMostrar.forEach(articulo => {
    // Formatear fecha
    const fecha = new Date(articulo.fecha).toLocaleDateString('es-ES');
    
    // Crear etiquetas HTML
    const etiquetasHTML = articulo.etiquetas
      .map(e => `<span class="etiqueta">${e}</span>`)
      .join('');
    
    const html = `
      <article class="articulo">
        <h2>${articulo.titulo}</h2>
        <div class="articulo-meta">
          <span>✍️ ${articulo.autor}</span>
          <span>📅 ${fecha}</span>
          <span>📂 ${articulo.categoria}</span>
          <span>👁️ ${articulo.vistas} vistas</span>
        </div>
        <p>${articulo.contenido}</p>
        <div>${etiquetasHTML}</div>
      </article>
    `;
    
    listadoArticulos.innerHTML += html;
  });
}
```

### 3. Búsqueda Avanzada
```javascript
function buscarArticulos(termino) {
  const terminoLimpio = termino.toLowerCase().trim();
  
  // Buscar en múltiples campos
  const resultados = articulos.filter(articulo => {
    return (
      articulo.titulo.toLowerCase().includes(terminoLimpio) ||
      articulo.contenido.toLowerCase().includes(terminoLimpio) ||
      articulo.categoria.toLowerCase().includes(terminoLimpio)
    );
  });
  
  renderizarArticulos(resultados);
}

// Escuchar búsqueda
inputBuscar.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    buscarArticulos(this.value);
  }
});
```

### 4. Obtener Categorías Únicas
```javascript
function obtenerCategorias() {
  // map: obtener solo categorías
  // Set: colección sin duplicados
  // [...set]: convertir Set a Array
  return [...new Set(
    articulos.map(articulo => articulo.categoria)
  )];
}

// Resultado: ['HTML', 'CSS', 'JavaScript']
```

### 5. Renderizar Categorías
```javascript
function renderizarCategorias() {
  listaCategorias.innerHTML = '';
  
  const categorias = obtenerCategorias();
  
  categorias.forEach(categoria => {
    // Contar artículos de la categoría
    const cantidad = articulos.filter(
      a => a.categoria === categoria
    ).length;
    
    const html = `
      <li>
        <a href="#" class="enlace-categoria" 
           data-categoria="${categoria}">
          ${categoria} (${cantidad})
        </a>
      </li>
    `;
    
    listaCategorias.innerHTML += html;
  });
  
  // Agregar listeners
  document.querySelectorAll('.enlace-categoria').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      const cat = this.getAttribute('data-categoria');
      
      // Filtrar por categoría
      const filtrados = articulos.filter(a => a.categoria === cat);
      renderizarArticulos(filtrados);
    });
  });
}
```

### 6. Artículos Populares
```javascript
function renderizarPopulares() {
  // sort: ordenar por vistas descendente
  // slice(0, 5): tomar primeros 5
  const populares = [...articulos]
    .sort((a, b) => b.vistas - a.vistas)
    .slice(0, 5);
  
  populares.forEach(articulo => {
    const html = `
      <li>
        <a href="#">${articulo.titulo} 
           (${articulo.vistas} vistas)</a>
      </li>
    `;
    
    populares.innerHTML += html;
  });
}
```

### 7. Estadísticas en Consola
```javascript
function mostrarEstadisticas() {
  console.log('Total de artículos:', articulos.length);
  
  // Artículos por categoría
  const porCategoria = {};
  articulos.forEach(a => {
    porCategoria[a.categoria] = 
      (porCategoria[a.categoria] || 0) + 1;
  });
  console.log('Por categoría:', porCategoria);
  
  // Artículo más visto
  const masVisto = [...articulos]
    .sort((a, b) => b.vistas - a.vistas)[0];
  console.log('Más visto:', masVisto.titulo);
  
  // Autores únicos
  const autores = [...new Set(
    articulos.map(a => a.autor)
  )];
  console.log('Autores:', autores);
}
```

### 8. Suscripción
```javascript
formSuscripcion.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = this.querySelector('input[type="email"]').value;
  
  // Guardar en localStorage
  localStorage.setItem('suscriptor', email);
  
  alert(`✓ Suscrito a ${email}`);
  this.reset();
});

// Verificar si ya está suscrito
const emailGuardado = localStorage.getItem('suscriptor');
if (emailGuardado) {
  console.log('Usuario ya suscrito:', emailGuardado);
}
```

---

## 📊 Métodos de Array Avanzados

```javascript
// map: Transformar
const titulos = articulos.map(a => a.titulo);
// ['Intro a HTML5', 'Guía CSS Grid', ...]

// filter: Seleccionar
const htmlArticulos = articulos.filter(a => a.categoria === 'HTML');
// [...artículos de HTML]

// sort: Ordenar
const porVistas = articulos.sort((a, b) => b.vistas - a.vistas);
// Ordenado de más a menos vistas

// reduce: Acumular
const totalVistas = articulos.reduce((total, a) => total + a.vistas, 0);
// 15300 (suma de todas las vistas)

// find: Buscar UN elemento
const articulo = articulos.find(a => a.id === 1);
// {id: 1, titulo: '...', ...}

// some/every: Verificar condición
const tieneHTML = articulos.some(a => a.categoria === 'HTML');  // true
const todosConVistas = articulos.every(a => a.vistas > 0);     // true
```

---

## 🎨 Set: Colecciones Únicas

```javascript
// Array con duplicados
const tags = ['html', 'css', 'html', 'javascript', 'css'];

// Set elimina duplicados
const tagUnicos = new Set(tags);
// Set { 'html', 'css', 'javascript' }

// Convertir Set a Array
const array = [...tagUnicos];
// ['html', 'css', 'javascript']

// Uso real en nuestro blog
const categorias = [...new Set(
  articulos.map(a => a.categoria)
)];
// ['HTML', 'CSS', 'JavaScript']
```

---

## 🌍 Formateo de Fechas

```javascript
// Objeto de fecha
const fecha = new Date('2024-12-03');

// Formato español
fecha.toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
// "3 de diciembre de 2024"

// Formato corto
fecha.toLocaleDateString('es-ES');
// "3/12/2024"

// En nuestro código
const articulos.fecha.map(f => {
  return new Date(f).toLocaleDateString('es-ES');
});
```

---

## 🚀 Cómo Usar

1. **Abre en navegador**
2. **Escribe en buscador** para filtrar artículos
3. **Haz click en categorías** en sidebar
4. **Haz click en populares** para ver artículo
5. **Suscribirse** al blog
6. **Abre consola (F12)** para ver estadísticas

---

## 💡 Tips de Aprendizaje

- 📖 Entiende cada método de array
- 🔍 Abre F12 y manipula `articulos` en consola
- 📊 Prueba `console.table(articulos)` para tabla
- 🧪 Agrega nuevos artículos al array y actualiza
- 📱 Cambia tamaño de pantalla para ver responsive

---

## 🔗 Archivos Relacionados

- **README.md** (padre) - Guía general
- **1_Portfolio_Basico/** - Proyecto básico
- **2_Tienda_Online/** - Proyecto intermedio

---

**¡Este es el más avanzado!** Si dominas esto, dominas JavaScript 🚀
