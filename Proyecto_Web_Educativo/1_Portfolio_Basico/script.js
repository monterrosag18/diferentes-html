/* 
  ===============================
  ARCHIVO: script.js
  CARPETA: 1_Portfolio_Basico
  PROPÓSITO: Interactividad y dinamismo con JavaScript
  
  QUÉ ES JAVASCRIPT:
  JavaScript es el lenguaje que da VIDA a las páginas.
  HTML = estructura
  CSS = apariencia
  JavaScript = comportamiento e interactividad
  
  CUANDO SE EJECUTA:
  JavaScript se ejecuta en el navegador del usuario
  Puede responder a clicks, movimiento del mouse, scroll, etc.
  ===============================
*/

/* 
  ========== ESPERAR A QUE CARGUE LA PÁGINA ==========
  document: Objeto principal que representa la página
  addEventListener: Escuchar un evento
  'DOMContentLoaded': Se dispara cuando HTML está completamente cargado
  
  POR QUÉ ESPERAR:
  Si ejecutamos código antes de que HTML cargue,
  los elementos pueden no existir aún y hay error
*/

document.addEventListener('DOMContentLoaded', function() {
  console.log('✓ Página cargada - JavaScript activado');
  
  // Aquí ponemos TODO el código que necesita la página cargada
  
  /* 
    ========== 1. FUNCIÓN: SCROLL SUAVE ==========
    Cuando haces click en un enlace de navegación,
    la página sube/baja suavemente en lugar de saltar
  */
  
  // Seleccionar todos los enlaces dentro de nav
  // querySelector: Busca elementos usando selectores CSS
  // querySelectorAll: Busca TODOS los que coincidan
  const enlaces = document.querySelectorAll('nav a');
  
  /* 
    forEach: Ciclo que repite para cada elemento
    Para cada enlace, ejecuta la función
  */
  enlaces.forEach(enlace => {
    // Escuchar cuando se haga click en el enlace
    enlace.addEventListener('click', function(evento) {
      // evento: Información del evento que pasó
      // preventDefault: Evita el comportamiento predeterminado del enlace
      evento.preventDefault();
      
      /* 
        getAttribute: Obtener el valor de un atributo
        En este caso, obtiene el valor de href
        Ejemplo: si href="#proyectos", obtiene "#proyectos"
      */
      const idDestino = this.getAttribute('href');
      
      /* 
        querySelector con idDestino: Busca el elemento con ese ID
        Ejemplo: si idDestino es "#proyectos", busca el elemento <section id="proyectos">
      */
      const elemento = document.querySelector(idDestino);
      
      /* 
        scrollIntoView: Hace scroll para que el elemento sea visible
        behavior: 'smooth': La animación es suave (no instantánea)
      */
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  /* 
    ========== 2. FUNCIÓN: CAMBIAR COLOR DE NAV AL HACER SCROLL ==========
    Cuando la página baja (scroll), la navegación cambia de color
    Es un efecto visual común en webs modernas
  */
  
  const nav = document.querySelector('nav');
  
  // Evento 'scroll': Se dispara cada vez que la página se mueve arriba/abajo
  window.addEventListener('scroll', function() {
    /* 
      window.scrollY: Cuántos píxeles hemos bajado desde arriba
      Si scrollY > 50, significa que bajamos más de 50px
    */
    if (window.scrollY > 50) {
      // Agregar clase que cambia el estilo (agregando en CSS)
      nav.style.backgroundColor = '#1a252f';
      
      // También se puede usar:
      // nav.classList.add('navbar-scroll');
    } else {
      // Volver al color original
      nav.style.backgroundColor = '#34495e';
    }
  });
  
  /* 
    ========== 3. FUNCIÓN: CONTAR PROYECTOS ==========
    Contar cuántos proyectos hay y mostrar en consola
    (Para verificar que JavaScript está funcionando)
  */
  
  // Seleccionar todos los elementos con clase 'proyecto'
  const proyectos = document.querySelectorAll('.proyecto');
  
  // .length: Propiedad que da la cantidad
  console.log('Total de proyectos: ' + proyectos.length);
  
  /* 
    ========== 4. FUNCIÓN: AGREGAR EVENTO CLICK A PROYECTOS ==========
    Cuando haces click en un proyecto, muestra información en consola
    (Útil para depuración)
  */
  
  // Recorrer cada proyecto
  proyectos.forEach((proyecto, indice) => {
    // indice: posición en la lista (0, 1, 2...)
    
    // Agregar cursor: pointer (parece clickeable)
    proyecto.style.cursor = 'pointer';
    
    // Escuchar click
    proyecto.addEventListener('click', function() {
      // Obtener el título del proyecto
      // querySelector dentro del elemento específico
      const titulo = this.querySelector('h3').textContent;
      
      // textContent: Obtiene solo el texto sin HTML
      console.log('Hiciste click en: ' + titulo);
      
      // Efecto visual: cambiar borde
      this.style.borderLeftColor = '#e74c3c'; // Rojo
      
      // Después de 1 segundo, volver al color original
      setTimeout(() => {
        this.style.borderLeftColor = '#1abc9c'; // Turquesa
      }, 1000);
    });
  });
  
  /* 
    ========== 5. FUNCIÓN: ANIMAR HABILIDADES AL VERLAS ==========
    Cuando el usuario scrollea y ve la sección de habilidades,
    las habilidades aparecen con animación
    
    Esto se llama "Scroll Reveal" o "Intersection Observer"
  */
  
  const habilidades = document.querySelectorAll('.lista-habilidades li');
  
  /* 
    IntersectionObserver: API moderna de JavaScript
    Detecta cuando un elemento entra o sale de la pantalla
    Es mejor que calcular scroll manual (más eficiente)
  */
  
  const observador = new IntersectionObserver((entries) => {
    /* 
      entries: Lista de elementos observados
      entries.forEach: Por cada elemento observable
    */
    entries.forEach((entry, indice) => {
      /* 
        entry.isIntersecting: true si el elemento es visible
      */
      if (entry.isIntersecting) {
        // Agregar animación
        entry.target.style.animation = `aparecer 0.6s ease forwards ${indice * 0.1}s`;
        
        // unobserve: Dejar de observar después de que aparezca
        observador.unobserve(entry.target);
      }
    });
  });
  
  // Empezar a observar cada habilidad
  habilidades.forEach(habilidad => {
    observador.observe(habilidad);
  });
  
  /* 
    ========== 6. FUNCIÓN: VALIDACIÓN DE FORMULARIO (si hubiera) ==========
    Aunque aquí no hay formulario, dejamos ejemplo
    de cómo validar entrada del usuario
  */
  
  // Ejemplo: validar que un email sea válido
  function validarEmail(email) {
    /* 
      Expresión regular: patrón para validar texto
      Este patrón valida formato básico de email
    */
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // .test(): Retorna true o false si cumple el patrón
    return patronEmail.test(email);
  }
  
  // Probar función
  console.log('¿juan@gmail.com es válido?', validarEmail('juan@gmail.com')); // true
  console.log('¿juangmail.com es válido?', validarEmail('juangmail.com')); // false
  
  /* 
    ========== 7. FUNCIÓN: GUARDAR EN LOCAL STORAGE ==========
    localStorage: Guardar datos en el navegador del usuario
    Los datos persisten incluso después de cerrar la página
  */
  
  // Guardar que el usuario visitó
  localStorage.setItem('ultimos-visitantes', new Date().toLocaleString());
  
  // Recuperar datos guardados
  const ultimaVisita = localStorage.getItem('ultimos-visitantes');
  console.log('Última visita:', ultimaVisita);
  
  /* 
    ========== 8. FUNCIÓN: CONTADOR DE CLICKS ==========
    Contar cuántas veces el usuario hace clic en la página
  */
  
  let contadorClicks = 0;
  
  // Escuchar clicks en TODO el documento
  document.addEventListener('click', function() {
    contadorClicks++;
    
    // Mostrar en consola (puedes quitar después)
    if (contadorClicks % 10 === 0) {
      // Si es múltiplo de 10, mostrar en consola
      console.log(`Total de clicks: ${contadorClicks}`);
    }
  });
  
  /* 
    ========== 9. FUNCIÓN: BOTÓN PARA VOLVER ARRIBA ==========
    Muchas webs tienen botón para volver al top rápidamente
  */
  
  // Crear el botón dinámicamente con JavaScript
  const botonArriba = document.createElement('button');
  
  // Agregar clases y atributos
  botonArriba.textContent = '↑ Volver Arriba';
  botonArriba.id = 'btn-arriba';
  
  // Estilos básicos (en una web real iría en CSS)
  botonArriba.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #1abc9c;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 99;
    width: 50px;
    height: 50px;
    font-size: 20px;
  `;
  
  // Agregar el botón al body
  document.body.appendChild(botonArriba);
  
  // Mostrar botón solo si scrolleamos hacia abajo
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      botonArriba.style.display = 'block';
    } else {
      botonArriba.style.display = 'none';
    }
  });
  
  // Click en el botón = volver arriba suavemente
  botonArriba.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  /* 
    ========== 10. FUNCIÓN: DETECTAR DISPOSITIVO ==========
    Saber si el usuario accede desde celular o desktop
  */
  
  function esMobile() {
    /* 
      Expresión regular para detectar navegadores mobile
      Si el user agent contiene estas palabras, es mobile
    */
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  
  if (esMobile()) {
    console.log('👤 Usuario en dispositivo móvil');
  } else {
    console.log('💻 Usuario en computadora');
  }
  
});

/* 
  ========== ANIMACIÓN CSS ==========
  Esta animación se define aquí pero se aplica con CSS
  @keyframes: Define pasos de una animación
*/

const estilo = document.createElement('style');
estilo.textContent = `
  @keyframes aparecer {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(estilo);

/* 
  ========== CONSOLE.LOG EDUCATIVO ==========
  Estos mensajes aparecen en consola del navegador
  Para verlos: Click derecho > Inspeccionar > Consola
  
  Son muy útiles para depuración (debugging)
*/

console.log('%c🎨 PORTFOLIO CARGADO CORRECTAMENTE', 'color: green; font-size: 16px; font-weight: bold;');
console.log('%cHTML: Estructura', 'color: #ff9800; font-weight: bold;');
console.log('%cCSS: Diseño visual', 'color: #2196f3; font-weight: bold;');
console.log('%cJavaScript: Interactividad', 'color: #f44336; font-weight: bold;');
console.log('Abre las herramientas de desarrollador (F12) para ver más detalles');
