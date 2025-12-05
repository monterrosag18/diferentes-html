/* 
  ===============================
  ARCHIVO: script.js
  CARPETA: 3_Blog_Responsivo
  PROPÓSITO: Lógica del blog (artículos, búsqueda, categorías)
  
  CONCEPTOS AVANZADOS:
  - Estructuras complejas de datos
  - Búsqueda y filtrado
  - Manipulación de arrays
  - Local Storage para favoritos
  ===============================
*/

/* 
  ========== 1. BASE DE DATOS DE ARTÍCULOS ==========
  Array de objetos con artículos del blog
*/

const articulos = [
  {
    id: 1,
    titulo: 'Introducción a HTML5 Semántico',
    autor: 'Carlos López',
    fecha: '2024-12-03',
    categoria: 'HTML',
    contenido: 'Aprende cómo usar correctamente las etiquetas semánticas de HTML5 para mejorar SEO y accesibilidad.',
    etiquetas: ['html5', 'semántico', 'seo'],
    vistas: 1250
  },
  {
    id: 2,
    titulo: 'Guía Completa de CSS Grid',
    autor: 'María García',
    fecha: '2024-12-01',
    categoria: 'CSS',
    contenido: 'Domina CSS Grid con ejemplos prácticos y entiende cómo crear layouts modernos y responsivos.',
    etiquetas: ['css', 'grid', 'layout'],
    vistas: 2100
  },
  {
    id: 3,
    titulo: 'JavaScript: Arrays y Métodos Útiles',
    autor: 'Juan Pérez',
    fecha: '2024-11-28',
    categoria: 'JavaScript',
    contenido: 'Descubre los métodos más poderosos de arrays: map, filter, reduce y muchos más.',
    etiquetas: ['javascript', 'arrays', 'métodos'],
    vistas: 1890
  },
  {
    id: 4,
    titulo: 'Responsive Design: Mobile First',
    autor: 'Carlos López',
    fecha: '2024-11-25',
    categoria: 'CSS',
    contenido: 'Estrategia de diseño mobile-first para crear webs que funcionen en cualquier dispositivo.',
    etiquetas: ['responsive', 'mobile', 'css'],
    vistas: 1540
  },
  {
    id: 5,
    titulo: 'DOM Manipulation con JavaScript',
    autor: 'María García',
    fecha: '2024-11-22',
    categoria: 'JavaScript',
    contenido: 'Aprende a manipular el DOM: seleccionar elementos, agregar/quitar clases, cambiar contenido.',
    etiquetas: ['javascript', 'dom', 'interactividad'],
    vistas: 2300
  },
  {
    id: 6,
    titulo: 'Flexbox vs Grid: Cuándo usar cada uno',
    autor: 'Juan Pérez',
    fecha: '2024-11-20',
    categoria: 'CSS',
    contenido: 'Comparación entre Flexbox y CSS Grid para entender cuándo usar cada una en tus proyectos.',
    etiquetas: ['css', 'flexbox', 'grid'],
    vistas: 1760
  }
];

/* 
  ========== 2. VARIABLES GLOBALES ==========
*/

let articulosFiltrados = [...articulos]; // Copia del array original
const listadoArticulos = document.getElementById('listado-articulos');
const inputBuscar = document.getElementById('input-buscar');
const btnBuscar = document.getElementById('btn-buscar');
const populares = document.getElementById('populares');
const listaCategorias = document.getElementById('lista-categorias');
const formSuscripcion = document.getElementById('form-suscripcion');

/* 
  ========== 3. FUNCIÓN: RENDERIZAR ARTÍCULOS ==========
  Mostrar artículos en la página
*/

function renderizarArticulos(articulosAMostrar) {
  /* Limpiar listado */
  listadoArticulos.innerHTML = '';
  
  if (articulosAMostrar.length === 0) {
    listadoArticulos.innerHTML = '<p>No se encontraron artículos</p>';
    return;
  }
  
  /* Recorrer y crear HTML para cada artículo */
  articulosAMostrar.forEach(articulo => {
    /* 
      Formatear fecha
      new Date: Crear objeto de fecha
      toLocaleDateString: Convertir a formato legible
    */
    const fechaFormato = new Date(articulo.fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    /* 
      Crear etiquetas HTML
      map: Convertir array de etiquetas a HTML
      join: Unir todo en un string
    */
    const etiquetasHTML = articulo.etiquetas
      .map(etiqueta => `<span class="etiqueta">${etiqueta}</span>`)
      .join('');
    
    /* HTML del artículo */
    const html = `
      <article class="articulo">
        <h2 class="articulo-titulo">${articulo.titulo}</h2>
        
        <div class="articulo-meta">
          <span class="meta-item">✍️ ${articulo.autor}</span>
          <span class="meta-item">📅 ${fechaFormato}</span>
          <span class="meta-item">📂 ${articulo.categoria}</span>
          <span class="meta-item">👁️ ${articulo.vistas} vistas</span>
        </div>
        
        <p class="articulo-contenido">${articulo.contenido}</p>
        
        <div class="articulo-etiquetas">
          ${etiquetasHTML}
        </div>
        
        <a href="#" class="btn-leer-mas">Leer más →</a>
      </article>
    `;
    
    /* Insertar en la página */
    listadoArticulos.innerHTML += html;
  });
}

/* 
  ========== 4. FUNCIÓN: BUSCAR ARTÍCULOS ==========
  Filtrar artículos por título o contenido
*/

function buscarArticulos(termino) {
  /* 
    .toLowerCase(): Convertir a minúsculas para comparación
    .trim(): Quitar espacios al inicio y final
  */
  const terminoLimpio = termino.toLowerCase().trim();
  
  if (terminoLimpio === '') {
    /* Si está vacío, mostrar todos */
    articulosFiltrados = [...articulos];
  } else {
    /* 
      filter: Obtener solo artículos que coincidan
      includes: Busca si un string contiene otro
    */
    articulosFiltrados = articulos.filter(articulo => {
      return (
        articulo.titulo.toLowerCase().includes(terminoLimpio) ||
        articulo.contenido.toLowerCase().includes(terminoLimpio) ||
        articulo.categoria.toLowerCase().includes(terminoLimpio)
      );
    });
  }
  
  /* Renderizar resultados */
  renderizarArticulos(articulosFiltrados);
}

/* 
  ========== 5. FUNCIÓN: OBTENER CATEGORÍAS ÚNICAS ==========
  Extraer todas las categorías diferentes del array
*/

function obtenerCategorias() {
  /* 
    map: Obtener solo el campo categoria de cada articulo
    Set: Crear colección de valores únicos (sin duplicados)
    [...set]: Convertir Set a Array
  */
  return [...new Set(articulos.map(articulo => articulo.categoria))];
}

/* 
  ========== 6. FUNCIÓN: RENDERIZAR CATEGORÍAS ==========
  Mostrar categorías en el sidebar
*/

function renderizarCategorias() {
  listaCategorias.innerHTML = '';
  
  const categorias = obtenerCategorias();
  
  categorias.forEach(categoria => {
    /* 
      Contar cuántos artículos hay en cada categoría
      filter: Obtener artículos de la categoría
      .length: Contar cuántos son
    */
    const cantidad = articulos.filter(
      a => a.categoria === categoria
    ).length;
    
    const html = `
      <li>
        <a href="#" class="enlace-categoria" data-categoria="${categoria}">
          ${categoria} (${cantidad})
        </a>
      </li>
    `;
    
    listaCategorias.innerHTML += html;
  });
  
  /* Agregar listeners a las categorías */
  const enlacesCategorias = document.querySelectorAll('.enlace-categoria');
  enlacesCategorias.forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      
      const categoria = this.getAttribute('data-categoria');
      
      /* Filtrar por categoría */
      articulosFiltrados = articulos.filter(
        a => a.categoria === categoria
      );
      
      renderizarArticulos(articulosFiltrados);
    });
  });
}

/* 
  ========== 7. FUNCIÓN: RENDERIZAR ARTÍCULOS POPULARES ==========
  Mostrar los artículos más vistos
*/

function renderizarPopulares() {
  populares.innerHTML = '';
  
  /* 
    sort: Ordenar array
    (a, b) => b.vistas - a.vistas: Ordenar por vistas descendente
    slice(0, 5): Tomar solo los primeros 5
  */
  const articulosPopulares = [...articulos]
    .sort((a, b) => b.vistas - a.vistas)
    .slice(0, 5);
  
  articulosPopulares.forEach(articulo => {
    const html = `
      <li>
        <a href="#" class="enlace-articulo" data-id="${articulo.id}">
          ${articulo.titulo} (${articulo.vistas} vistas)
        </a>
      </li>
    `;
    
    populares.innerHTML += html;
  });
  
  /* Listeners para los populares */
  const enlacesArticulos = document.querySelectorAll('.enlace-articulo');
  enlacesArticulos.forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      
      const id = parseInt(this.getAttribute('data-id'));
      
      /* Buscar y mostrar solo ese artículo */
      const articulo = articulos.find(a => a.id === id);
      if (articulo) {
        renderizarArticulos([articulo]);
      }
    });
  });
}

/* 
  ========== 8. FUNCIÓN: BÚSQUEDA EN TIEMPO REAL ==========
  Buscar mientras el usuario escribe
*/

function configurarBusqueda() {
  /* Búsqueda al presionar Enter */
  inputBuscar.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      buscarArticulos(this.value);
    }
  });
  
  /* Búsqueda al hacer click en botón */
  btnBuscar.addEventListener('click', function() {
    buscarArticulos(inputBuscar.value);
  });
  
  /* Búsqueda mientras escribe (opcional - comentado para no ser invasivo) */
  /*
  inputBuscar.addEventListener('input', function() {
    buscarArticulos(this.value);
  });
  */
}

/* 
  ========== 9. FUNCIÓN: SUSCRIPCIÓN ==========
  Manejar formulario de suscripción
*/

function configurarSuscripcion() {
  formSuscripcion.addEventListener('submit', function(e) {
    /* 
      preventDefault: Evitar que se envíe por defecto
      En una app real, aquí iría a un servidor
    */
    e.preventDefault();
    
    /* Obtener el email */
    const email = this.querySelector('input[type="email"]').value;
    
    /* Guardar en localStorage */
    localStorage.setItem('suscriptor', email);
    
    /* Mostrar confirmación */
    alert(`✓ ¡Gracias por suscribirse! Confirma en ${email}`);
    
    /* Limpiar formulario */
    this.reset();
  });
  
  /* Verificar si ya está suscrito */
  const emailGuardado = localStorage.getItem('suscriptor');
  if (emailGuardado) {
    console.log('El usuario ya está suscrito:', emailGuardado);
  }
}

/* 
  ========== 10. FUNCIÓN: SCROLL SUAVE ==========
  Enlaces navegación con scroll suave
*/

function configurarScrollSuave() {
  const enlaces = document.querySelectorAll('a[href^="#"]');
  
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      /* Si es solo #, no hacer nada especial */
      if (href === '#') {
        return;
      }
      
      const elemento = document.querySelector(href);
      
      if (elemento) {
        e.preventDefault();
        elemento.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* 
  ========== 11. FUNCIÓN: EFECTOS Y ANIMACIONES ==========
  Agregar interactividad visual
*/

function configurarEfectos() {
  /* Cuando se hace click en un artículo, highlighting */
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('articulo-titulo')) {
      e.preventDefault();
      
      /* Resaltar el artículo */
      const articulo = e.target.closest('.articulo');
      articulo.style.backgroundColor = '#fff8dc';
      
      /* Volver al original después */
      setTimeout(() => {
        articulo.style.backgroundColor = '#f9f9f9';
      }, 1500);
    }
  });
}

/* 
  ========== 12. FUNCIÓN: ESTADÍSTICAS ==========
  Mostrar información útil en consola
*/

function mostrarEstadisticas() {
  console.log('%c=== DEVBLOG ESTADÍSTICAS ===', 'color: #667eea; font-weight: bold; font-size: 14px;');
  console.log('Total de artículos:', articulos.length);
  
  /* Artículos por categoría */
  const porCategoria = {};
  articulos.forEach(a => {
    porCategoria[a.categoria] = (porCategoria[a.categoria] || 0) + 1;
  });
  console.log('Por categoría:', porCategoria);
  
  /* Artículo más visto */
  const masVisto = [...articulos].sort((a, b) => b.vistas - a.vistas)[0];
  console.log('Artículo más visto:', masVisto.titulo, `(${masVisto.vistas} vistas)`);
  
  /* Todos los autores */
  const autores = [...new Set(articulos.map(a => a.autor))];
  console.log('Autores:', autores);
}

/* 
  ========== INICIALIZACIÓN ==========
  Código que se ejecuta cuando carga la página
*/

document.addEventListener('DOMContentLoaded', function() {
  console.log('✓ Blog Cargado');
  
  /* Renderizar contenido inicial */
  renderizarArticulos(articulos);
  renderizarCategorias();
  renderizarPopulares();
  
  /* Configurar funcionalidades */
  configurarBusqueda();
  configurarSuscripcion();
  configurarScrollSuave();
  configurarEfectos();
  
  /* Mostrar estadísticas */
  mostrarEstadisticas();
  
  console.log('✓ Todas las funciones cargadas correctamente');
});
