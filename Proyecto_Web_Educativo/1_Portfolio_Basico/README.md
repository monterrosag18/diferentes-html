# 📌 Portfolio Básico - Guía Rápida

## ¿Qué es este proyecto?

Un **portfolio personal** como ejemplo educativo con HTML semántico, CSS responsivo y JavaScript interactivo.

---

## 📂 Archivos

| Archivo | Propósito |
|---------|-----------|
| `index.html` | Estructura HTML5 semántica |
| `styles.css` | Estilos visuales y responsive |
| `script.js` | Interactividad con JavaScript |

---

## 🎯 Características

✅ **Encabezado** con navegación sticky  
✅ **Scroll suave** al hacer click en enlaces  
✅ **Efectos hover** interactivos  
✅ **Botón flotante** para volver arriba  
✅ **Responsive** en móvil, tablet y desktop  
✅ **Dark mode** en navegación al scroll  
✅ **Animaciones** suaves en elementos  
✅ **LocalStorage** para guardar visitas  

---

## 🏗️ Estructura HTML

```
<header>          → Encabezado principal
  <h1>Nombre     → Título principal (solo 1 por página)
  <p>Subtítulo   → Descripción
<nav>             → Navegación
  <ul><li><a>     → Enlaces
<main>            → Contenido principal
  <section>       → Secciones temáticas
    <article>     → Artículos independientes
<footer>          → Pie de página
```

---

## 🎨 Estilos CSS Principales

```css
/* Contenedor centrado y responsive */
.contenedor {
  max-width: 1200px;  /* Límite de ancho */
  margin: 0 auto;     /* Centrado */
  padding: 0 20px;    /* Márgenes internos */
}

/* Grid para distribuir elementos */
.lista-habilidades {
  display: grid;
  grid-template-columns: repeat(2, 1fr);  /* 2 columnas iguales */
}

/* Transición suave al cambiar propiedades */
.proyecto {
  transition: 0.3s;
}

.proyecto:hover {
  transform: scale(1.02);  /* Aumenta 2% al pasar mouse */
  box-shadow: ...          /* Sombra más pronunciada */
}

/* Responsive: cambiar layout en móvil */
@media (max-width: 768px) {
  .lista-habilidades {
    grid-template-columns: 1fr;  /* 1 columna */
  }
}
```

---

## ⚙️ Funcionalidades JavaScript

### 1. Scroll Suave
```javascript
enlace.addEventListener('click', function() {
  elemento.scrollIntoView({ behavior: 'smooth' });
});
```

### 2. Cambiar Navegación al Scroll
```javascript
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    nav.style.backgroundColor = '#1a252f';
  }
});
```

### 3. Intersection Observer (Scroll Reveal)
```javascript
const observador = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'aparecer 0.6s ease forwards';
    }
  });
});
```

### 4. LocalStorage
```javascript
localStorage.setItem('ultimos-visitantes', new Date());
const ultimaVisita = localStorage.getItem('ultimos-visitantes');
```

---

## 🎓 Qué Aprenderás

### HTML
- ✅ Etiquetas semánticas
- ✅ Estructura jerárquica
- ✅ Atributos data-*
- ✅ Forms básicos

### CSS
- ✅ Flexbox
- ✅ Grid
- ✅ Responsive design
- ✅ Transiciones
- ✅ Media queries

### JavaScript
- ✅ Event listeners
- ✅ DOM manipulation
- ✅ LocalStorage
- ✅ Expresiones regulares
- ✅ Intersection Observer

---

## 🚀 Cómo Usar

1. **Abre en navegador**: Click derecho → "Abrir con navegador"
2. **Inspecciona**: Presiona F12 para ver el código
3. **Experimenta**: Cambia valores en CSS y ve cómo cambia
4. **Lee comentarios**: Cada línea está explicada en el código

---

## 💡 Tips de Aprendizaje

- 📖 Lee TODOS los comentarios en el código
- ✍️ NO copies/pegas. Escribe el código tú mismo
- 🔍 Abre el inspector (F12) para entender la estructura
- 📊 Usa la consola (F12 → Consola) para ver mensajes
- 🎨 Cambia colores, tamaños y ve qué pasa
- 📱 Redimensiona la ventana para probar responsive

---

## 🔗 Archivos Relacionados

- **README.md** (padre) - Guía general del proyecto
- **2_Tienda_Online/** - Proyecto más complejo
- **3_Blog_Responsivo/** - Proyecto avanzado

---

**¿Listo para aprender?** ¡Empieza a leer el código ahora! 🚀
