# 6_Landing_Page

## 📌 Descripción

Landing page profesional completa para presentar un producto o servicio. Ideal para aprender:

- Estructura de página de marketing
- Navbar sticky y navegación
- Validación de formularios
- Modal interactivo
- Múltiples secciones (Hero, Features, Pricing, Testimonios)
- Smooth scroll
- Animaciones en scroll
- Footer con enlaces

## 🎯 Características Principales

### 1. **Navbar Sticky**
```html
<!-- En index.html, línea 20-45 -->
- Logo a la izquierda
- Menú de navegación con smooth scroll
- Botón CTA "Registrarse"
- Permanece visible al hacer scroll
```

### 2. **Hero Section**
```javascript
// En script.js
- Título principal impactante
- Descripción atractiva
- Botones CTA principales
- Estadísticas (500+ clientes, 99.9% uptime, 24/7 soporte)
- Imagen/ilustración lado derecho
```

### 3. **Sección Características**
```html
<!-- En index.html -->
- Grid de 6 características
- Iconos emoji
- Animación hover con elevación
- Descripción breve de cada una
```

### 4. **Tabla de Precios**
```html
<!-- En index.html -->
- 3 planes (Básico, Profesional*, Empresa)
- Plan destacado con "Más Popular"
- Lista de características por plan
- Botones de acción
```

### 5. **Testimonios**
```html
<!-- En index.html -->
- 3 testimonios de clientes reales
- Rating (5 estrellas)
- Foto/avatar del cliente
- Empresa del cliente
```

### 6. **Modal de Registro**
```javascript
// En script.js
- Validación completa de formulario
- Campos: Nombre, Email, Empresa, Contraseña
- Términos y condiciones
- Mensajes de error/éxito
- Guardado en localStorage
```

### 7. **CTA Final**
```html
<!-- En index.html -->
- Sección antes del footer
- Botones para convertir usuarios
- Último llamado a la acción
```

## 📁 Estructura de Archivos

```
6_Landing_Page/
├── index.html        # Estructura HTML (650+ líneas comentadas)
├── styles.css        # Estilos profesionales (700+ líneas comentadas)
├── script.js         # Interactividad (400+ líneas comentadas)
└── README.md         # Este archivo
```

## 🚀 Cómo Usar

### 1. **Personalizar Información Empresarial**

En `index.html`, reemplaza:
```html
<!-- Línea 22 -->
<h2>TechPro</h2>  <!-- Tu nombre de empresa/producto -->

<!-- Línea 33 -->
<h1>Transforma tu negocio con tecnología innovadora</h1>  <!-- Tu headline -->

<!-- Línea 37 -->
<p>Soluciones tecnológicas que escalan con tu empresa...</p>  <!-- Tu descripción -->
```

### 2. **Cambiar Características**

En `index.html`, línea 130-180:
```html
<div class="tarjeta-caracteristica">
  <div class="icono-caracteristica">⚡</div>
  <h3>Rápido y Eficiente</h3>
  <p>Optimizado para máximo rendimiento</p>
</div>
```

Modifica: emoji, título, descripción.

### 3. **Ajustar Planes de Precios**

En `index.html`, línea 210-280:
```html
<div class="tarjeta-precio">
  <h3>Plan Básico</h3>
  <div class="precio-plan">
    <span class="numero-precio">$29</span>  <!-- Precio -->
    <span class="duracion-precio">/mes</span>
  </div>
  <ul class="lista-caracteristicas">
    <li>✓ 5 Proyectos</li>  <!-- Características -->
    <li>✓ 5GB Almacenamiento</li>
    <!-- ... más características ... -->
  </ul>
</div>
```

### 4. **Agregar Testimonios**

En `index.html`, línea 310-360:
```html
<div class="tarjeta-testimonio">
  <div class="rating">⭐⭐⭐⭐⭐</div>
  <p class="texto-testimonio">
    "Tu cita del cliente"
  </p>
  <div class="info-cliente">
    <div class="avatar">👨‍💼</div>
    <div>
      <strong>Nombre Cliente</strong>
      <p>Cargo, Empresa</p>
    </div>
  </div>
</div>
```

## 🎨 Personalizar Estilos

### Cambiar Color Principal
```css
/* En styles.css */
/* Busca #667eea y reemplaza con tu color */

.navbar-logo h2 {
  color: #667eea;  /* Tu color aquí */
}

.btn-primario {
  background-color: #667eea;  /* Tu color aquí */
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Reemplaza estos colores */
}
```

### Cambiar Logo
```html
<!-- En index.html, línea 22 -->
<!-- De: -->
<h2>TechPro</h2>

<!-- A: -->
<img src="mi-logo.png" alt="Logo" style="height: 40px;">
```

### Cambiar Fuente
```css
/* En styles.css, línea 28 */
body {
  font-family: 'Tu Fuente', sans-serif;
}
```

## 💾 Componentes Reutilizables

### 1. **Validación de Formulario**
```javascript
// Copiar desde: script.js, línea 150-200
validarEmail() - Valida formato de email
manejarSubmitFormulario() - Procesa form
// Úsalo para: cualquier formulario
```

### 2. **Modal Personalizado**
```javascript
// Copiar desde: script.js, línea 100-130
abrirModal() / cerrarModal()
// Úsalo para: modales en otros proyectos
```

### 3. **Smooth Scroll**
```javascript
// Copiar desde: script.js, línea 60-80
document.addEventListener("DOMContentLoaded")
// Úsalo para: navegación en landing pages
```

### 4. **Animaciones On-Scroll**
```javascript
// Copiar desde: script.js, línea 220-250
new IntersectionObserver()
// Úsalo para: efectos de entrada de elementos
```

## 🔧 Conceptos JavaScript Utilizados

```javascript
// ✅ querySelectorAll() / querySelector()
const botones = document.querySelectorAll(".btn")
const modal = document.querySelector(".modal")

// ✅ addEventListener()
button.addEventListener("click", handleClick)
form.addEventListener("submit", handleSubmit)

// ✅ classList (add/remove)
element.classList.add("activo")
element.classList.remove("activo")

// ✅ Validación con RegExp
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
regex.test(email)

// ✅ localStorage
localStorage.setItem("usuarios", JSON.stringify(data))
JSON.parse(localStorage.getItem("usuarios"))

// ✅ preventDefault()
e.preventDefault()

// ✅ IntersectionObserver (animaciones en scroll)
new IntersectionObserver(callback).observe(element)

// ✅ setTimeout()
setTimeout(() => { cerrarModal() }, 2000)

// ✅ Template strings
`Hola ${nombre}, tu email es ${email}`
```

## 📱 Responsividad

- **Desktop** (>768px): Navbar normal, grid multi-columna
- **Tablet** (481-768px): Ajustes de espaciado y tamaños
- **Mobile** (<480px): Menú colapsado, stack vertical, botones fullwidth

Media queries están en `styles.css`, líneas 580-650.

## 🎓 Cómo Extender

### 1. **Conectar a Backend Real**
```javascript
// En script.js, línea 160, reemplazar:
fetch('/api/registrar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: nombre,
    email: email,
    empresa: empresa,
    contrasena: contrasena
  })
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    mostrarMensajeValidacion("¡Registrado!", "exito")
  }
})
```

### 2. **Agregar Newsletter**
```html
<!-- Agregar antes del footer -->
<section class="newsletter">
  <h2>Suscríbete a nuestro Newsletter</h2>
  <form>
    <input type="email" placeholder="tu@email.com" required>
    <button>Suscribirse</button>
  </form>
</section>
```

### 3. **Agregar FAQ**
```html
<!-- Nueva sección antes de testimonios -->
<section id="faq" class="faq">
  <h2>Preguntas Frecuentes</h2>
  <div class="acordeon">
    <div class="item-acordeon">
      <button class="pregunta">¿Cuál es el costo?</button>
      <div class="respuesta">Tenemos 3 planes...</div>
    </div>
  </div>
</section>
```

### 4. **Agregar Blog/Noticias**
```html
<!-- Nueva sección -->
<section class="blog">
  <h2>Últimas Noticias</h2>
  <div class="grid-blog">
    <article class="post">
      <h3>Artículo 1</h3>
      <p>Contenido...</p>
    </article>
  </div>
</section>
```

### 5. **Integración con Mailchimp**
```html
<!-- Newsletter form de Mailchimp -->
<form action="mailchimp-url" method="post">
  <input type="email" name="EMAIL" required>
  <button type="submit">Suscribirse</button>
</form>
```

## 📊 Estadísticas del Código

- **Líneas de HTML**: 650+ (100% comentado)
- **Líneas de CSS**: 700+ (100% comentado)
- **Líneas de JavaScript**: 400+ (100% comentado)
- **Secciones**: 8 (Navbar, Hero, Features, Pricing, Testimonios, CTA, Footer, Modal)
- **Características**: 6
- **Planes de precio**: 3
- **Testimonios**: 3
- **Validaciones**: 5 (nombre, email, contraseña, términos, etc)

## 🎯 Caso de Uso Real

```
Perfecta para:
✅ Landing pages de startups
✅ Presentación de SaaS
✅ Página de ventas de productos
✅ Páginas de servicios digitales
✅ Plataformas de cursos online
✅ Agencias creativas
✅ Portfolio profesional
```

## ⚡ Performance Tips

1. **Lazy Loading de Imágenes**
```html
<img src="imagen.jpg" loading="lazy" alt="">
```

2. **Minificar CSS/JS** en producción

3. **Usar CDN** para fuentes/iconos

4. **Compresión de imágenes** para web

## 🔐 Seguridad

- **Validar datos** en cliente Y en servidor
- **Usar HTTPS** en producción
- **Sanitizar inputs** antes de guardar
- **No guardar contraseñas** en plain text
- **CSRF tokens** en formularios

---

✅ **Listo para personalizar con tu propia información y marca.**

**Tip**: Cambia los colores, textos, imágenes y asegúrate de validar en el servidor también.
