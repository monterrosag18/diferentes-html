# 📚 Proyecto Web Educativo - Guía Completa

## 🎯 Objetivo

Este proyecto contiene **3 webs completamente funcionales** como ejemplos educativos para aprender **HTML5**, **CSS3** y **JavaScript**. Cada carpeta contiene un proyecto diferente con explicaciones detalladas línea por línea.

---

## 📁 Estructura del Proyecto

```
Proyecto_Web_Educativo/
├── 1_Portfolio_Basico/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── 2_Tienda_Online/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── 3_Blog_Responsivo/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── README.md (este archivo)
```

---

## 1️⃣ Portfolio Básico

### 📝 Descripción

Web de portfolio personal profesional con:
- **Encabezado** con nombre y profesión
- **Navegación sticky** que se queda en la pantalla
- **Secciones** sobre mí, proyectos y habilidades
- **Carrito flotante** para volver arriba
- **Efectos hover** interactivos

### 🎓 Aprenderás

#### HTML
- Etiquetas semánticas: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Estructuras jerárquicas: `<h1>` a `<h6>`
- Listas: `<ul>`, `<ol>`, `<li>`
- Atributos: `id`, `class`, `href`, `data-*`

#### CSS
- **Flexbox**: Alineación y distribución
- **Box Model**: Margen, relleno, bordes
- **Colores y Gradientes**: `color`, `background`, `linear-gradient`
- **Responsive Design**: Media queries `@media`
- **Transiciones y Animaciones**: `transition`, `@keyframes`
- **Unidades**: `px`, `rem`, `%`, `vh`

#### JavaScript
- **Event Listeners**: `click`, `scroll`
- **DOM Manipulation**: `querySelector`, `classList`, `textContent`
- **Validación**: Expresiones regulares
- **Local Storage**: Guardar datos en el navegador
- **Intersection Observer**: Detectar visibilidad de elementos

### 🚀 Cómo Usar

1. Abre `index.html` en tu navegador
2. Haz click en los enlaces de navegación para scroll suave
3. Observa cómo cambia el color de la navegación al hacer scroll
4. Haz click en los proyectos para ver efectos interactivos
5. Abre la consola (F12) para ver mensajes de depuración

---

## 2️⃣ Tienda Online

### 📝 Descripción

Tienda electrónica funcional con:
- **Grid de productos** dinámico
- **Sistema de carrito** completamente funcional
- **Filtros por categoría**
- **Modal emergente** para ver el carrito
- **Cálculo automático** de totales e impuestos
- **Local Storage** para persistencia

### 🎓 Aprenderás

#### HTML
- **Data attributes**: `data-id`, `data-filtro`
- **Tablas**: `<table>`, `<thead>`, `<tbody>`
- **Formularios**: `<form>`, `<input>`, `<button>`
- **Semántica avanzada**: `<article>`, `<aside>`

#### CSS
- **CSS Grid**: `grid-template-columns`, `gap`, `repeat()`
- **CSS Grid avanzado**: `auto-fit`, `minmax()`
- **Posicionamiento**: `position: fixed`, `position: absolute`
- **Overlay**: Fondos semi-transparentes
- **Box Shadow**: Sombras complejas

#### JavaScript (Avanzado)
- **Objetos y Arrays**: Estructuras complejas
- **Métodos de Array**: `map`, `filter`, `reduce`, `find`
- **Gestión de Estado**: Patrón de carrito persistente
- **JSON**: `stringify`, `parse`
- **Cálculos Dinámicos**: Sumar precios, aplicar impuestos
- **Template Strings**: Crear HTML dinámico

### 🚀 Cómo Usar

1. Abre `index.html` en el navegador
2. Usa los botones de filtro para ver categorías
3. Haz click en "Agregar al Carrito"
4. Haz click en el icono del carrito para ver productos
5. Cambia cantidades o elimina productos
6. Observa cómo se calculan automáticamente los totales
7. Cierra el navegador y vuelve a abrir: ¡el carrito se guarda!

### 💡 Conceptos Clave

```javascript
// Usar reduce para sumar precios
const total = carrito.items.reduce((suma, item) => {
  return suma + (item.precio * item.cantidad);
}, 0);
```

---

## 3️⃣ Blog Responsivo

### 📝 Descripción

Blog moderno con:
- **Artículos dinámicos** cargados desde JavaScript
- **Sistema de búsqueda** en tiempo real
- **Sidebar con widgets**: Populares, Categorías, Suscripción
- **Filtrado por categoría**
- **Layout responsivo**: 2 columnas en desktop, 1 en mobile
- **LocalStorage** para suscriptores

### 🎓 Aprenderás

#### HTML
- **Estructura semántica completa**: `<article>`, `<aside>`
- **Forms avanzados**: `<input type="email">`, validación HTML5
- **Metadatos complejos**

#### CSS
- **CSS Grid con 2 columnas**: Cambiar en responsive
- **Grid auto-fit**: Ajuste automático de ancho
- **Gradientes avanzados**: Ángulos y paradas de color
- **Dark mode**: Temas de color
- **Stacking Context**: `z-index`, `position: sticky`

#### JavaScript (Muy Avanzado)
- **Estructuras de Datos Complejas**: Array de objetos
- **Métodos Array Avanzados**: `sort`, `slice`, `map`
- **Set**: Colecciones sin duplicados
- **Búsqueda y Filtrado**: Múltiples criterios
- **Formateo de Fechas**: `toLocaleDateString`
- **Eventos Complejos**: `submit`, `keypress`, `input`

### 🚀 Cómo Usar

1. Abre `index.html`
2. Usa la barra de búsqueda para encontrar artículos
3. Haz click en categorías en el sidebar
4. Haz click en artículos populares
5. Suscribirse al blog (se guarda en localStorage)
6. Abre consola para ver estadísticas

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|---|---|---|
| **HTML5** | 5 | Estructura y semántica |
| **CSS3** | 3 | Diseño y responsividad |
| **JavaScript** | ES6+ | Interactividad y lógica |
| **LocalStorage** | API Nativa | Persistencia de datos |
| **CSS Grid** | Moderno | Layouts avanzados |
| **Flexbox** | Moderno | Alineación flexible |

---

## 📚 Conceptos Clave Explicados

### 1. HTML Semántico

**¿Qué es?** Usar las etiquetas correctas para describir el contenido.

```html
<!-- ❌ No semántico -->
<div class="header">Mi Sitio</div>

<!-- ✅ Semántico -->
<header>
  <h1>Mi Sitio</h1>
</header>
```

**Beneficios:**
- Mejor SEO (buscadores entienden mejor)
- Accesibilidad para discapacitados
- Código más legible y mantenible

---

### 2. Responsive Design

**¿Qué es?** Que la web funcione bien en cualquier tamaño de pantalla.

```css
/* Desktop: 2 columnas */
@media (min-width: 768px) {
  .contenedor {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* Mobile: 1 columna */
@media (max-width: 767px) {
  .contenedor {
    display: block;
  }
}
```

---

### 3. Local Storage

**¿Qué es?** Guardar datos en el navegador del usuario.

```javascript
// Guardar
localStorage.setItem('carrito', JSON.stringify(items));

// Recuperar
const items = JSON.parse(localStorage.getItem('carrito'));

// Eliminar
localStorage.removeItem('carrito');
```

---

### 4. Métodos de Array

**map()**: Transformar cada elemento

```javascript
const numeros = [1, 2, 3];
const duplicados = numeros.map(n => n * 2);
// [2, 4, 6]
```

**filter()**: Obtener solo lo que cumple condición

```javascript
const numeros = [1, 2, 3, 4, 5];
const pares = numeros.filter(n => n % 2 === 0);
// [2, 4]
```

**reduce()**: Acumular un valor

```javascript
const numeros = [1, 2, 3, 4];
const suma = numeros.reduce((total, n) => total + n, 0);
// 10
```

---

## 🎨 Pautas de Diseño

### Colores Utilizados

- **Primario**: `#667eea` (Azul)
- **Secundario**: `#764ba2` (Púrpura)
- **Acento**: `#1abc9c` (Turquesa)
- **Oscuro**: `#2c3e50` (Gris Azulado)
- **Texto**: `#333` (Negro suave)

### Tipografía

- **Font**: Segoe UI, Tahoma, sans-serif
- **Tamaño base**: 16px
- **Line Height**: 1.6 (espaciado vertical)

### Espaciado

- **Contenedor máx**: 1200px
- **Padding standard**: 20px
- **Gap/Gap**: 20-30px

---

## 🐛 Depuración

### Abrir Consola del Navegador

**Chrome/Edge/Firefox**: Presiona `F12` o `Ctrl+Shift+I` (Windows/Linux) o `Cmd+Option+I` (Mac)

### Comandos Útiles

```javascript
// Ver qué hay seleccionado
console.log(document.querySelector('.elemento'));

// Ver los datos del carrito
console.table(carrito.items);

// Ver propiedades de un objeto
console.dir(objeto);
```

---

## 📋 Checklist de Aprendizaje

### HTML
- [ ] Entiendo etiquetas semánticas
- [ ] Puedo crear estructura básica
- [ ] Conozco atributos importantes
- [ ] Entiendo forms

### CSS
- [ ] Conozco Flexbox y Grid
- [ ] Puedo hacer diseños responsivos
- [ ] Entiendo box model
- [ ] Puedo usar transiciones/animaciones

### JavaScript
- [ ] Puedo seleccionar elementos del DOM
- [ ] Conozco event listeners
- [ ] Entiendo arrays y objetos
- [ ] Puedo usar métodos de array
- [ ] Comprendo localStorage

---

## 🚀 Próximos Pasos

Después de estudiar estos proyectos:

1. **Crea tu propio sitio**: Combina lo que aprendiste
2. **Estudia git**: Usa `git init`, `git add`, `git commit`
3. **Aprende Node.js**: Backend con JavaScript
4. **Domina async/await**: Llamadas a APIs
5. **Usa frameworks**: React, Vue, Angular

---

## 📞 Preguntas Frecuentes

### ¿Por qué está todo comentado?

Para que entiendas cada línea. En proyectos reales, los comentarios son menos densos.

### ¿Es seguro localStorage?

No para datos sensibles (contraseñas). Es seguro para preferencias, carrito, etc.

### ¿Funciona offline?

Sí, esta web es completamente offline. No necesita servidor.

### ¿Cómo subo a internet?

Servicios como **Netlify**, **GitHub Pages** o **Vercel** hosting gratis.

---

## 📄 Licencia

Estos ejemplos son educativos. Úsalos libremente para aprender.

---

## 🎓 Créditos

Ejemplos creados para fortalecer habilidades en:
- **HTML5 Semántico**
- **CSS3 Responsivo**
- **JavaScript ES6+**

Ideales para prepararse en:
- **Entrevistas técnicas**
- **Pruebas de desempeño**
- **Portafolios profesionales**

---

**¡Felicidades por empezar tu jornada en desarrollo web! 🚀**

Cada archivo está comentado línea por línea. Lee los comentarios mientras escribes el código para aprender de verdad.

**Recuerda**: No copies y pegas. Escribe el código tú mismo. Así es como se aprende.
