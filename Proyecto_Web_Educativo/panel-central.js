/* 
  ===============================
  ARCHIVO: panel-central.js
  PROPÓSITO: Funcionalidad del Panel Central
  ===============================
*/

document.addEventListener('DOMContentLoaded', function() {
  console.log('✓ Panel Central Cargado');

  // ========== BASE DE DATOS DE BÚSQUEDA ==========
  const baseBusqueda = [
    // Proyectos
    {
      id: 1,
      titulo: 'Portfolio Básico',
      tipo: 'proyecto',
      url: '1_Portfolio_Basico/index.html',
      descripcion: 'Portfolio personal - Nivel Principiante',
      nivel: '⭐',
      etiquetas: ['html', 'css', 'javascript', 'flexbox', 'responsive']
    },
    {
      id: 2,
      titulo: 'Tienda Online',
      tipo: 'proyecto',
      url: '2_Tienda_Online/index.html',
      descripcion: 'Tienda con carrito - Nivel Intermedio',
      nivel: '⭐⭐',
      etiquetas: ['grid', 'modal', 'carrito', 'localstorage', 'arrays']
    },
    {
      id: 3,
      titulo: 'Blog Responsivo',
      tipo: 'proyecto',
      url: '3_Blog_Responsivo/index.html',
      descripcion: 'Blog con búsqueda - Nivel Intermedio',
      nivel: '⭐⭐',
      etiquetas: ['blog', 'grid', 'busqueda', 'filtros', 'set']
    },
    {
      id: 4,
      titulo: 'Ecommerce Avanzado',
      tipo: 'proyecto',
      url: '4_Ecommerce_Avanzado/index.html',
      descripcion: 'Tienda profesional - Nivel Avanzado',
      nivel: '⭐⭐⭐',
      etiquetas: ['ecommerce', 'filtros', 'wishlist', 'sorting', 'notificaciones']
    },
    {
      id: 5,
      titulo: 'Galería Interactiva',
      tipo: 'proyecto',
      url: '5_Galeria_Interactiva/index.html',
      descripcion: 'Galería con lightbox - Nivel Avanzado',
      nivel: '⭐⭐⭐',
      etiquetas: ['galeria', 'lightbox', 'masonry', 'keyboard', 'filtros']
    },
    {
      id: 6,
      titulo: 'Landing Page',
      tipo: 'proyecto',
      url: '6_Landing_Page/index.html',
      descripcion: 'Landing page profesional - Nivel Intermedio',
      nivel: '⭐⭐',
      etiquetas: ['landing', 'navbar', 'hero', 'formulario', 'validacion']
    },
    {
      id: 7,
      titulo: 'Dashboard Admin',
      tipo: 'proyecto',
      url: '7_Dashboard_Admin/index.html',
      descripcion: 'Dashboard administrativo - Nivel Avanzado',
      nivel: '⭐⭐⭐',
      etiquetas: ['dashboard', 'sidebar', 'admin', 'multi-seccion', 'graficos']
    },
    {
      id: 8,
      titulo: 'Referencia Completa',
      tipo: 'proyecto',
      url: '8_Referencia_Completa/index.html',
      descripcion: 'Referencia interactiva de HTML, CSS, JS',
      nivel: '📚',
      etiquetas: ['referencia', 'html', 'css', 'javascript', 'ejemplos']
    },
    {
      id: 9,
      titulo: 'Réplica de Webs',
      tipo: 'proyecto',
      url: '9_Replica_Webs/index.html',
      descripcion: 'Aprende a replicar cualquier web paso a paso',
      nivel: '⭐⭐',
      etiquetas: ['replica', 'webs', 'evaluacion', 'metodologia', 'pasos', 'checklist', 'practica']
    },

    // Referencias
    {
      id: 101,
      titulo: 'HTML5 Referencia',
      tipo: 'referencia',
      url: '8_Referencia_Completa/html_referencia.html',
      descripcion: '30+ etiquetas HTML con ejemplos',
      nivel: 'HTML',
      etiquetas: ['html', 'etiquetas', 'estructura', 'formularios']
    },
    {
      id: 102,
      titulo: 'CSS3 Referencia',
      tipo: 'referencia',
      url: '8_Referencia_Completa/css_referencia.html',
      descripcion: '50+ propiedades CSS interactivas',
      nivel: 'CSS',
      etiquetas: ['css', 'flexbox', 'grid', 'animaciones', 'responsive']
    },
    {
      id: 103,
      titulo: 'JavaScript Referencia',
      tipo: 'referencia',
      url: '8_Referencia_Completa/javascript_referencia.html',
      descripcion: '25+ conceptos JavaScript con ejemplos',
      nivel: 'JS',
      etiquetas: ['javascript', 'dom', 'arrays', 'async', 'es6']
    },

    // Componentes
    {
      id: 201,
      titulo: 'Sistema de Filtrado',
      tipo: 'componente',
      url: '4_Ecommerce_Avanzado/index.html',
      descripcion: 'Filtros multi-criterio dinámicos',
      nivel: '⭐⭐',
      etiquetas: ['filtrado', 'array', 'filter', 'dinamico']
    },
    {
      id: 202,
      titulo: 'Modal Lightbox',
      tipo: 'componente',
      url: '5_Galeria_Interactiva/index.html',
      descripcion: 'Modal con navegación y teclado',
      nivel: '⭐⭐',
      etiquetas: ['modal', 'lightbox', 'overlay', 'keyboard']
    },
    {
      id: 203,
      titulo: 'Validación Formulario',
      tipo: 'componente',
      url: '6_Landing_Page/index.html',
      descripcion: 'Validación de formularios HTML',
      nivel: '⭐',
      etiquetas: ['validacion', 'formulario', 'regex', 'input']
    },
    {
      id: 204,
      titulo: 'Navegación Pestañas',
      tipo: 'componente',
      url: '7_Dashboard_Admin/index.html',
      descripcion: 'Sistema de pestañas y secciones',
      nivel: '⭐⭐',
      etiquetas: ['pestañas', 'tabs', 'navegacion', 'dashboard']
    },
    {
      id: 205,
      titulo: 'Sistema Carrito',
      tipo: 'componente',
      url: '2_Tienda_Online/index.html',
      descripcion: 'Carrito de compras completamente funcional',
      nivel: '⭐⭐⭐',
      etiquetas: ['carrito', 'shopping', 'localstorage', 'calculo']
    },
    {
      id: 206,
      titulo: 'Scroll Suave',
      tipo: 'componente',
      url: '1_Portfolio_Basico/index.html',
      descripcion: 'Scroll automático suave entre secciones',
      nivel: '⭐',
      etiquetas: ['scroll', 'smooth', 'navegacion', 'animacion']
    },
    {
      id: 207,
      titulo: 'Búsqueda Avanzada',
      tipo: 'componente',
      url: '3_Blog_Responsivo/index.html',
      descripcion: 'Sistema de búsqueda y filtros',
      nivel: '⭐⭐',
      etiquetas: ['busqueda', 'search', 'filtros', 'javascript']
    }
  ];

  // ========== BUSCADOR GLOBAL ==========
  const inputBuscador = document.getElementById('buscador-principal');
  const contenedorResultados = document.getElementById('resultados-busqueda');

  inputBuscador.addEventListener('input', function(e) {
    const termino = e.target.value.toLowerCase().trim();

    if (termino.length === 0) {
      contenedorResultados.classList.remove('activo');
      return;
    }

    // Filtrar resultados
    const resultados = baseBusqueda.filter(item => {
      const coincideTitulo = item.titulo.toLowerCase().includes(termino);
      const coincideDescripcion = item.descripcion.toLowerCase().includes(termino);
      const coincideEtiqueta = item.etiquetas.some(tag => tag.includes(termino));

      return coincideTitulo || coincideDescripcion || coincideEtiqueta;
    });

    // Mostrar resultados
    if (resultados.length > 0) {
      mostrarResultados(resultados);
      contenedorResultados.classList.add('activo');
    } else {
      contenedorResultados.innerHTML = '<div class="resultado-item">No se encontraron resultados</div>';
      contenedorResultados.classList.add('activo');
    }
  });

  function mostrarResultados(resultados) {
    contenedorResultados.innerHTML = '';

    resultados.slice(0, 8).forEach(resultado => {
      const div = document.createElement('div');
      div.className = 'resultado-item';
      div.innerHTML = `
        <div class="resultado-titulo">${resultado.titulo}</div>
        <div class="resultado-subtitulo">${resultado.descripcion}</div>
      `;

      div.addEventListener('click', () => {
        window.location.href = resultado.url;
      });

      contenedorResultados.appendChild(div);
    });
  }

  // Cerrar resultados al hacer click fuera
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.buscador-global')) {
      contenedorResultados.classList.remove('activo');
    }
  });

  // ========== NAVEGACIÓN DE SECCIONES ==========
  const botnesNav = document.querySelectorAll('.btn-nav');
  const secciones = document.querySelectorAll('.seccion');

  botnesNav.forEach(boton => {
    boton.addEventListener('click', function() {
      const seccionId = this.getAttribute('data-seccion');

      // Remover clase activa
      botnesNav.forEach(btn => btn.classList.remove('activo'));
      secciones.forEach(sec => sec.classList.remove('activa'));

      // Agregar clase activa
      this.classList.add('activo');
      document.getElementById(seccionId).classList.add('activa');

      // Scroll al inicio de la sección
      window.scrollTo({ top: 200, behavior: 'smooth' });
    });
  });

  // ========== ACCESOS RÁPIDOS ==========
  const accesosRapidos = document.querySelectorAll('.acceso-rapido');

  accesosRapidos.forEach(acceso => {
    acceso.addEventListener('click', function(e) {
      e.preventDefault();
      const tipo = this.getAttribute('data-tipo');
      const id = this.getAttribute('data-id');

      if (tipo === 'proyecto') {
        const proyecto = document.querySelector(`[data-proyecto="${id}"]`);
        if (proyecto) {
          const enlace = proyecto.querySelector('.btn-proyecto');
          window.location.href = enlace.href;
        }
      }
    });
  });

  // ========== TARJETAS DE DOCUMENTACIÓN ==========
  const cardsDocs = document.querySelectorAll('.card-doc');

  cardsDocs.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      // Aquí se puede agregar lógica para mostrar el contenido del archivo
      console.log('Se hizo click en:', this.getAttribute('data-archivo'));
    });
  });

  // ========== TECLA ENTER EN BUSCADOR ==========
  inputBuscador.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const items = contenedorResultados.querySelectorAll('.resultado-item');
      if (items.length > 0) {
        items[0].click();
      }
    }
  });

  // ========== DARK MODE (OPCIONAL) ==========
  function crearBotonDarkMode() {
    const btnDarkMode = document.createElement('button');
    btnDarkMode.innerHTML = '🌙';
    btnDarkMode.id = 'btn-dark-mode';
    btnDarkMode.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;
      cursor: pointer;
      font-size: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: all 0.3s ease;
      z-index: 50;
    `;

    btnDarkMode.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
    });

    btnDarkMode.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });

    document.body.appendChild(btnDarkMode);
  }

  crearBotonDarkMode();

  // ========== ANALYTICS SIMPLE ==========
  console.log('📊 Panel Central Inicializado Correctamente');
  console.log('🔍 Búsqueda Global: Activa');
  console.log('🧭 Navegación: Activa');
  console.log('🚀 Todos los proyectos enlazados');
});
