// ========== NAVEGACIÓN ENTRE SECCIONES ==========
document.querySelectorAll('.btn-nav').forEach(btn => {
    btn.addEventListener('click', () => {
        const seccionId = btn.getAttribute('data-seccion');
        
        // Remover clase activa de todos los botones
        document.querySelectorAll('.btn-nav').forEach(b => b.classList.remove('activo'));
        // Remover clase activa de todas las secciones
        document.querySelectorAll('.seccion').forEach(s => s.classList.remove('activa'));
        
        // Agregar clase activa al botón y sección clickeada
        btn.classList.add('activo');
        document.getElementById(seccionId).classList.add('activa');
    });
});

// ========== SCROLL SUAVE PARA LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        const destino = document.querySelector(enlace.getAttribute('href'));
        if (destino) {
            destino.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== INICIALIZAR LA PÁGINA ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Proyecto 9 - Réplica de Webs cargado correctamente');
    
    // Mostrar la primera sección por defecto
    document.getElementById('pasos').classList.add('activa');
});

// ========== VALIDADOR DE FORMULARIOS ==========
function validarFormulario(formulario) {
    const campos = formulario.querySelectorAll('input[required], textarea[required]');
    let valido = true;
    
    campos.forEach(campo => {
        if (campo.value.trim() === '') {
            campo.style.borderColor = '#ff6600';
            valido = false;
        } else {
            campo.style.borderColor = '#ddd';
        }
    });
    
    return valido;
}

// ========== CONTADOR ANIMADO ==========
function contarHasta(elemento, numeroFinal, duracion = 2000) {
    let numeroActual = 0;
    const incremento = numeroFinal / (duracion / 30);
    
    const intervalo = setInterval(() => {
        numeroActual += incremento;
        if (numeroActual >= numeroFinal) {
            elemento.textContent = numeroFinal;
            clearInterval(intervalo);
        } else {
            elemento.textContent = Math.floor(numeroActual);
        }
    }, 30);
}

// ========== MENÚ MÓVIL ==========
function crearMenuMovil() {
    const nav = document.querySelector('.nav-replica');
    
    // Crear botón hamburguesa
    const btnMenu = document.createElement('button');
    btnMenu.className = 'btn-menu-movil';
    btnMenu.innerHTML = '☰';
    btnMenu.style.display = 'none';
    
    // Insertar antes de la nav
    nav.parentElement.insertBefore(btnMenu, nav);
    
    // Mostrar/ocultar menú en móvil
    btnMenu.addEventListener('click', () => {
        nav.classList.toggle('abierto');
    });
    
    // Cerrar menú al hacer click en un botón
    document.querySelectorAll('.btn-nav').forEach(btn => {
        btn.addEventListener('click', () => {
            nav.classList.remove('abierto');
        });
    });
}

// ========== COPIAR CÓDIGO AL PORTAPAPELES ==========
function copiarCodigo(elemento) {
    const codigo = elemento.textContent;
    navigator.clipboard.writeText(codigo).then(() => {
        const btnAnterior = elemento.textContent;
        elemento.textContent = '✓ Copiado!';
        setTimeout(() => {
            elemento.textContent = btnAnterior;
        }, 2000);
    });
}

// ========== AGREGAR BOTÓN COPIAR A BLOQUES DE CÓDIGO ==========
function agregarBotonesCopiar() {
    document.querySelectorAll('.codigo-bloque').forEach((bloque, index) => {
        const contenedor = bloque.parentElement;
        const btnCopiar = document.createElement('button');
        btnCopiar.className = 'btn-copiar';
        btnCopiar.textContent = '📋 Copiar';
        btnCopiar.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 8px 12px;
            background: #333;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.3s;
        `;
        
        btnCopiar.addEventListener('click', () => copiarCodigo(bloque));
        btnCopiar.addEventListener('mouseenter', () => {
            btnCopiar.style.background = '#0066cc';
        });
        btnCopiar.addEventListener('mouseleave', () => {
            btnCopiar.style.background = '#333';
        });
        
        contenedor.style.position = 'relative';
        contenedor.appendChild(btnCopiar);
    });
}

// ========== DETECTOR DE SCROLL PARA EFECTOS ==========
function efectosAlScroll() {
    const secciones = document.querySelectorAll('.seccion');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('activa');
            }
        });
    }, { threshold: 0.1 });
    
    secciones.forEach(seccion => {
        observer.observe(seccion);
    });
}

// ========== BÚSQUEDA DE CONTENIDO EN PASOS ==========
function agregarBuscador() {
    const header = document.querySelector('.header-replica');
    
    const contenedorBuscador = document.createElement('div');
    contenedorBuscador.style.cssText = `
        max-width: 1200px;
        margin: 30px auto 0;
        padding: 0 20px;
    `;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Busca en los pasos (ej: "header", "grid", "javascript")...';
    input.style.cssText = `
        width: 100%;
        padding: 12px 15px;
        border: 2px solid white;
        border-radius: 5px;
        font-size: 16px;
        margin-bottom: 20px;
    `;
    
    contenedorBuscador.appendChild(input);
    header.appendChild(contenedorBuscador);
    
    input.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        const tarjetas = document.querySelectorAll('.tarjeta-paso');
        
        tarjetas.forEach(tarjeta => {
            const texto = tarjeta.textContent.toLowerCase();
            tarjeta.style.display = texto.includes(termino) ? 'flex' : 'none';
        });
    });
}

// ========== CONTADOR DE PROGRESO ==========
function mostrarProgreso() {
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const marcados = document.querySelectorAll('.checkbox-item input[type="checkbox"]:checked').length;
            const total = checkboxes.length;
            const porcentaje = Math.round((marcados / total) * 100);
            
            console.log(`Progreso: ${marcados}/${total} (${porcentaje}%)`);
        });
    });
}

// ========== DESTACAR ELEMENTOS AL PASAR ==========
function efectosInteractivos() {
    document.querySelectorAll('.tarjeta-paso').forEach(tarjeta => {
        tarjeta.addEventListener('mouseenter', () => {
            tarjeta.style.boxShadow = '0 8px 16px rgba(0, 102, 204, 0.2)';
            tarjeta.style.transform = 'translateX(10px)';
        });
        
        tarjeta.addEventListener('mouseleave', () => {
            tarjeta.style.boxShadow = '';
            tarjeta.style.transform = 'translateX(0)';
        });
    });
}

// ========== KEYBOARD SHORTCUTS ==========
function agregarAtajosTeclado() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + 1-4 para cambiar entre secciones
        const tecla = parseInt(e.key);
        if ((e.ctrlKey || e.metaKey) && tecla >= 1 && tecla <= 4) {
            const secciones = ['pasos', 'ejemplos', 'checklist', 'practica'];
            const botones = document.querySelectorAll('.btn-nav');
            botones[tecla - 1].click();
        }
    });
}

// ========== GENERAR TABLA DE CONTENIDOS ==========
function generarIndice() {
    const seccion = document.querySelector('#pasos');
    const h3s = seccion.querySelectorAll('h3');
    
    const indice = document.createElement('div');
    indice.className = 'indice-contenidos';
    indice.style.cssText = `
        background: #f0f8ff;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
        border-left: 4px solid #0066cc;
    `;
    
    const titulo = document.createElement('h3');
    titulo.textContent = '📑 Contenidos de esta sección';
    titulo.style.marginBottom = '15px';
    indice.appendChild(titulo);
    
    const lista = document.createElement('ul');
    lista.style.listStyle = 'none';
    lista.style.paddingLeft = '0';
    
    h3s.forEach((h3, index) => {
        const li = document.createElement('li');
        li.style.padding = '8px 0';
        li.innerHTML = `<strong>Paso ${index + 1}:</strong> ${h3.textContent}`;
        lista.appendChild(li);
    });
    
    indice.appendChild(lista);
    seccion.insertBefore(indice, seccion.firstChild.nextSibling.nextSibling);
}

// ========== ESTADÍSTICAS DE LECTURA ==========
function calcularTiempoLectura() {
    const contenido = document.querySelector('.contenedor-principal').textContent;
    const palabras = contenido.split(/\s+/).length;
    const tiempoMinutos = Math.ceil(palabras / 200); // 200 palabras por minuto promedio
    
    const elemento = document.createElement('div');
    elemento.style.cssText = `
        text-align: center;
        padding: 20px;
        background: #f0f8ff;
        border-radius: 5px;
        margin-bottom: 20px;
        font-size: 14px;
        color: #0066cc;
    `;
    elemento.textContent = `⏱️ Tiempo estimado de lectura: ${tiempoMinutos} minutos`;
    
    const nav = document.querySelector('.nav-replica');
    nav.parentElement.insertBefore(elemento, nav.nextSibling);
}

// ========== EXPORTAR CONTENIDO A PDF/TEXTO ==========
function agregarExportacion() {
    const footer = document.querySelector('.footer-replica .contenedor');
    
    const btnExportar = document.createElement('button');
    btnExportar.textContent = '📥 Exportar Contenido';
    btnExportar.style.cssText = `
        padding: 10px 20px;
        background: rgba(255,255,255,0.2);
        color: white;
        border: 1px solid white;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
        margin: 10px;
    `;
    
    btnExportar.addEventListener('click', () => {
        const contenido = document.querySelector('.contenedor-principal').innerText;
        const elemento = document.createElement('a');
        elemento.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenido));
        elemento.setAttribute('download', 'Proyecto_9_Replica_Webs.txt');
        elemento.style.display = 'none';
        document.body.appendChild(elemento);
        elemento.click();
        document.body.removeChild(elemento);
    });
    
    footer.appendChild(btnExportar);
}

// ========== INICIALIZACIÓN PRINCIPAL ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando Proyecto 9 - Réplica de Webs...');
    
    // Ejecutar todas las funciones
    agregarBotonesCopiar();
    mostrarProgreso();
    efectosInteractivos();
    agregarAtajosTeclado();
    calcularTiempoLectura();
    generarIndice();
    agregarExportacion();
    
    console.log('✅ Proyecto 9 completamente cargado y funcional');
    console.log('💡 Tip: Usa Ctrl/Cmd + 1-4 para cambiar entre secciones');
});
