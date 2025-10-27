// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar/quitar clase 'scrolled' basado en la posición del scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 3D Card Tilt Effect
const cards3D = document.querySelectorAll('.card-3d');

cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
    });
});

// Testimonials Slider - horizontal ribbon with scroll
let currentTestimonio = 0;
const testimonios = document.querySelectorAll('.testimonio-card');
const testimonialPrevBtn = document.querySelector('.slider-btn.prev');
const testimonialNextBtn = document.querySelector('.slider-btn.next');
const slider = document.querySelector('.testimonios-slider');
let testimonialsReady = false; // evita que scroll inicial cambie al 2do
// Crear contenedor de indicadores dinámicamente
let testimonialIndicators = null;
if (slider) {
    testimonialIndicators = document.createElement('div');
    testimonialIndicators.className = 'testimonial-indicators';
    // insertar inmediatamente después del slider, antes de los controles de flechas
    const controls = document.querySelector('.slider-controls');
    if (controls && controls.parentNode) {
        controls.parentNode.insertBefore(testimonialIndicators, controls);
    } else {
        slider.parentNode.appendChild(testimonialIndicators);
    }
}

function getGapPx(el) {
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.getPropertyValue('gap') || styles.getPropertyValue('column-gap') || '0');
    return isNaN(gap) ? 0 : gap;
}

function stepSize() {
    if (!testimonios || testimonios.length === 0) return 0;
    const card = testimonios[0];
    const rect = card.getBoundingClientRect();
    return rect.width + getGapPx(slider);
}

function updateUI() {
    testimonios.forEach((card, idx) => card.classList.toggle('active', idx === currentTestimonio));
    if (testimonialIndicators) {
        const dots = testimonialIndicators.querySelectorAll('.t-dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === currentTestimonio));
    }
    updateArrowState();
}

function goToIndex(idx) {
    if (!slider || !testimonios || testimonios.length === 0) return;
    const maxIdx = testimonios.length - 1;
    const clamped = Math.max(0, Math.min(idx, maxIdx));
    // Desplazar solo dentro del contenedor, sin mover la ventana
    const left = clamped * stepSize();
    slider.scrollTo({ left, behavior: 'smooth' });
    if (clamped === 0) slider.scrollLeft = 0; // asegurar inicio exacto
    currentTestimonio = clamped;
    updateUI();
}

function scrollByCard(dir = 1) {
    if (!testimonios || testimonios.length === 0) return;
    const n = testimonios.length;
    const target = (currentTestimonio + dir + n) % n; // navegación circular
    goToIndex(target);
}

// Espaciador final: permite que el último ítem alinee al inicio (mejor que padding)
function adjustEndPadding() {
    if (!slider || !testimonios || testimonios.length === 0) return;
    const last = testimonios[testimonios.length - 1];
    const lastWidth = last.getBoundingClientRect().width;
    const styles = getComputedStyle(slider);
    const gap = parseFloat(styles.getPropertyValue('gap') || styles.getPropertyValue('column-gap') || '0') || 0;
    // Espacio requerido para que el último pueda llegar a inline:start sin quedar cortado
    const extra = slider.clientWidth - lastWidth - gap;
    slider.style.setProperty('--end-spacer', `${Math.max(0, Math.floor(extra))}px`);
}

function updateActiveByScroll() {
    if (!testimonios || testimonios.length === 0 || !slider) return;
    // Elegir la tarjeta con MAYOR ancho visible dentro del slider (robusto para el último ítem)
    const srect = slider.getBoundingClientRect();
    let best = -1;
    let bestIdx = 0;
    testimonios.forEach((card, idx) => {
        const r = card.getBoundingClientRect();
        const left = Math.max(r.left, srect.left);
        const right = Math.min(r.right, srect.right);
        const visible = Math.max(0, right - left);
        if (visible > best) { best = visible; bestIdx = idx; }
    });
    currentTestimonio = bestIdx;
    updateUI();
}

function updateArrowState() {
    // Loop continuo: flechas siempre habilitadas
    if (testimonialPrevBtn) testimonialPrevBtn.disabled = false;
    if (testimonialNextBtn) testimonialNextBtn.disabled = false;
}

if (testimonialNextBtn) {
    testimonialNextBtn.addEventListener('click', () => scrollByCard(1));
}
if (testimonialPrevBtn) {
    testimonialPrevBtn.addEventListener('click', () => scrollByCard(-1));
}

// Crear indicadores según cantidad de testimonios
function renderTestimonialIndicators() {
    if (!testimonialIndicators) return;
    testimonialIndicators.innerHTML = '';
    for (let i = 0; i < testimonios.length; i++) {
        const dot = document.createElement('span');
        dot.className = 't-dot' + (i === currentTestimonio ? ' active' : '');
        dot.dataset.index = String(i);
        dot.addEventListener('click', () => goToIndex(i));
        testimonialIndicators.appendChild(dot);
    }
}

// Llamar al renderizado inicial de puntos
renderTestimonialIndicators();

// Estado inicial: seleccionar SIEMPRE el primero
function setInitialTestimonial() {
    currentTestimonio = 0;
    if (slider) slider.scrollLeft = 0;
    testimonios.forEach((card, idx) => card.classList.toggle('active', idx === 0));
    if (testimonialIndicators) {
        const dots = testimonialIndicators.querySelectorAll('.t-dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === 0));
    }
}
setInitialTestimonial();

// Desbloquear el handler tras estabilizar layout para no saltar al 2do
setTimeout(() => {
    testimonialsReady = true;
    updateActiveByScroll(); // sincroniza (seguirá en 0 porque scrollLeft=0)
}, 300);

let scrollTicking = false;
if (slider) {
    slider.addEventListener('scroll', () => {
        if (!testimonialsReady) return; // ignora scroll inicial
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                updateActiveByScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });
    // Initial state after layout
    window.addEventListener('load', () => {
        adjustEndPadding();
        updateActiveByScroll();
        goToIndex(currentTestimonio);
    });
    window.addEventListener('resize', () => {
        adjustEndPadding();
        // Mantener foco en el actual al cambiar tamaño
        goToIndex(currentTestimonio);
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll('.caso-card, .servicio-item, .testimonio-card, .ubicacion-info, .contact-form');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero section - DISABLED
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero-content');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//         hero.style.opacity = 1 - (scrolled / 700);
//     }
// });

// Form Validation and Submit
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        asunto: document.getElementById('asunto').value,
        mensaje: document.getElementById('mensaje').value
    };
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            contactForm.reset();
            
            // Show success message
            showNotification('¡Gracias por contactarnos! Te responderemos pronto.');
        }, 2000);
    }, 1500);
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Cursor Trail Effect
const cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
    
    drawCursorTrail();
});

function drawCursorTrail() {
    const existingTrails = document.querySelectorAll('.cursor-trail');
    existingTrails.forEach(trail => trail.remove());
    
    cursorTrail.forEach((pos, index) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: ${20 - index * 2}px;
            height: ${20 - index * 2}px;
            background: radial-gradient(circle, rgba(102, 126, 234, ${0.5 - index * 0.05}) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${pos.x}px;
            top: ${pos.y}px;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
        `;
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 100);
    });
}

// Icon floating animation
const casoIcons = document.querySelectorAll('.caso-icon, .servicio-icon');

casoIcons.forEach(icon => {
    setInterval(() => {
        icon.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            icon.style.transform = 'translateY(0)';
        }, 500);
    }, 3000 + Math.random() * 2000);
});

// Loading screen (optional)
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.innerHTML = '<i class="fas fa-tooth" style="font-size: 4rem; color: white; animation: spin 2s linear infinite;"></i>';
    loader.appendChild(spinner);
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000);
});

// Easter egg: Konami code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    showNotification('🎉 ¡Has encontrado el easter egg! 🦷');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Galería de imágenes
let currentImageIndex = 0;
let imageWrappers = [];
let indicators = [];
let galleryPrevBtn = null;
let galleryNextBtn = null;
let autoPlayInterval = null;

function initGallery() {
    imageWrappers = document.querySelectorAll('.gallery-main .image-wrapper');
    indicators = document.querySelectorAll('.indicator');
    galleryPrevBtn = document.getElementById('prevBtn');
    galleryNextBtn = document.getElementById('nextBtn');
    
    console.log('Galería inicializada:', {
        imageWrappers: imageWrappers.length,
        indicators: indicators.length,
        galleryPrevBtn: !!galleryPrevBtn,
        galleryNextBtn: !!galleryNextBtn
    });
    
    if (imageWrappers.length === 0) {
        console.log('No se encontraron imágenes en la galería');
        return;
    }
    
    function showImage(index) {
        console.log('Mostrando imagen:', index);
        // Ocultar todas las imágenes
        imageWrappers.forEach(wrapper => wrapper.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Mostrar imagen actual
        if (imageWrappers[index]) {
            imageWrappers[index].classList.add('active');
            console.log('Imagen activada:', index);
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
            console.log('Indicador activado:', index);
        }
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % imageWrappers.length;
        showImage(currentImageIndex);
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + imageWrappers.length) % imageWrappers.length;
        showImage(currentImageIndex);
    }

    // Event listeners para botones
    if (galleryNextBtn) {
        galleryNextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Botón siguiente clickeado');
            nextImage();
        });
    } else {
        console.log('Botón siguiente no encontrado');
    }
    
    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Botón anterior clickeado');
            prevImage();
        });
    } else {
        console.log('Botón anterior no encontrado');
    }

    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentImageIndex = index;
            showImage(currentImageIndex);
        });
    });

    // Auto-play
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextImage, 4000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Iniciar auto-play
    startAutoPlay();

    // Pausar auto-play al hacer hover
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', stopAutoPlay);
        galleryContainer.addEventListener('mouseleave', startAutoPlay);
    }
}

// Inicializar galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando galería...');
    initGallery();
});

// También intentar inicializar después de un pequeño delay por si acaso
setTimeout(() => {
    if (imageWrappers.length === 0) {
        console.log('Reintentando inicializar galería...');
        initGallery();
    }
}, 1000);

// Image hover follow mouse effect (solo para imagen activa)
function initImageHover() {
    const allImageWrappers = document.querySelectorAll('.gallery-main .image-wrapper');
    
    allImageWrappers.forEach(wrapper => {
        const img = wrapper.querySelector('img');
        
        wrapper.addEventListener('mousemove', (e) => {
            if (!wrapper.classList.contains('active')) return;
            
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;
            
            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });
        
        wrapper.addEventListener('mouseleave', () => {
            img.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Inicializar hover effect cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initImageHover);

// Inicializar el mapa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Pequeño delay para asegurar que Leaflet esté cargado
    setTimeout(() => {
        if (typeof L !== 'undefined') {
            initMap();
        } else {
            console.log('Leaflet no está cargado, reintentando...');
            setTimeout(initMap, 1000);
        }
    }, 500);
});

// Leaflet Maps Configuration
let map;
let marker;

// Función para inicializar el mapa
function initMap() {
    // Obtener configuración del archivo de configuración
    const config = getMapConfig();
    const clinicLocation = [config.location.lat, config.location.lng];
    
    // Crear el mapa
    map = L.map('leafletMap').setView(clinicLocation, config.zoom);
    
    // Agregar capa de tiles según el tipo de mapa
    let tileLayer;
    switch(config.mapType) {
        case 'SATELLITE':
            tileLayer = L.tileLayer(config.mapStyles.layers.satellite, {
                attribution: '© Esri'
            });
            break;
        case 'TERRAIN':
            tileLayer = L.tileLayer(config.mapStyles.layers.terrain, {
                attribution: '© OpenTopoMap'
            });
            break;
        default: // OSM
            tileLayer = L.tileLayer(config.mapStyles.layers.osm, {
                attribution: '© OpenStreetMap contributors'
            });
    }
    
    tileLayer.addTo(map);
    
    // Crear icono personalizado
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
            background: ${config.mapStyles.marker.color};
            border: 3px solid white;
            border-radius: 50%;
            width: ${config.mapStyles.marker.size}px;
            height: ${config.mapStyles.marker.size}px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        ">${config.mapStyles.marker.icon}</div>`,
        iconSize: [config.mapStyles.marker.size, config.mapStyles.marker.size],
        iconAnchor: [config.mapStyles.marker.size/2, config.mapStyles.marker.size]
    });
    
    // Crear el marcador
    marker = L.marker(clinicLocation, { icon: customIcon }).addTo(map);
    
    // Crear el popup
    const popupContent = `
        <div style="padding: 10px; font-family: 'Segoe UI', sans-serif; min-width: 200px;">
            <h3 style="margin: 0 0 10px 0; color: ${config.mapStyles.marker.color}; font-size: 16px;">${config.clinicInfo.name}</h3>
            <p style="margin: 0 0 5px 0; color: #333; font-size: 14px;"><strong>${config.clinicInfo.doctor}</strong></p>
            <p style="margin: 0 0 5px 0; color: #666; font-size: 13px;">${config.clinicInfo.address}</p>
            <p style="margin: 0 0 5px 0; color: #666; font-size: 13px;">${config.clinicInfo.city}</p>
            <p style="margin: 0 0 5px 0; color: ${config.mapStyles.marker.color}; font-size: 13px;"><strong>${config.clinicInfo.phone}</strong></p>
            <p style="margin: 0; color: #666; font-size: 12px;">${config.clinicInfo.email}</p>
        </div>
    `;
    
    // Agregar popup al marcador
    marker.bindPopup(popupContent).openPopup();

    // Botón Google Maps en esquina inferior izquierda
    const gmapsUrl = `https://maps.app.goo.gl/yzm3XqWrjG7MHnET7`;
    const MapsControl = L.Control.extend({
        options: { position: 'bottomleft' },
        onAdd: function() {
            const container = L.DomUtil.create('div', 'gmaps-control leaflet-bar');
            container.innerHTML = `
                <a class="gmaps-btn" href="${gmapsUrl}" target="_blank" rel="noopener">
                    <i class="fas fa-directions" aria-hidden="true"></i>
                    <span>Ver en Google Maps</span>
                </a>
            `;
            L.DomEvent.disableClickPropagation(container);
            return container;
        }
    });
    map.addControl(new MapsControl());
    
    console.log(' Leaflet Map inicializado correctamente');
}

// Función para actualizar la ubicación del mapa
function updateMapLocation(lat, lng, address) {
    if (map && marker) {
        const newLocation = [lat, lng];
        
        // Actualizar posición del mapa
        map.setView(newLocation, map.getZoom());
        
        // Actualizar posición del marcador
        marker.setLatLng(newLocation);
        
        console.log('📍 Ubicación actualizada:', address);
    }
}

// Función para buscar una dirección usando Nominatim (gratuito)
function searchAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);
                updateMapLocation(lat, lng, address);
            } else {
                console.error('No se encontró la dirección:', address);
            }
        })
        .catch(error => {
            console.error('Error al buscar la dirección:', error);
        });
}

// Función para cambiar la ubicación del mapa fácilmente
function changeLocation(address) {
    console.log('🔍 Buscando ubicación:', address);
    searchAddress(address);
}

// Ejemplos de ubicaciones predefinidas
const LOCATIONS = {
    'mall-del-sur': 'Mall del Sur, Chorrillos, Lima, Perú',
    'plaza-norte': 'Plaza Norte, Independencia, Lima, Perú',
    'jockey-plaza': 'Jockey Plaza, Santiago de Surco, Lima, Perú',
    'real-plaza': 'Real Plaza, San Miguel, Lima, Perú',
    'centro-lima': 'Centro de Lima, Perú'
};

// Función para cambiar a ubicación predefinida
function setPredefinedLocation(locationKey) {
    if (LOCATIONS[locationKey]) {
        changeLocation(LOCATIONS[locationKey]);
    } else {
        console.error('Ubicación no encontrada:', locationKey);
    }
}

// Cinta de servicios: modo centrado, loop infinito y avance por ítem
class ServiciosCarousel {
    constructor() {
        this.grid = document.getElementById('serviciosGrid');
        this.carousel = document.querySelector('.servicios-carousel');
        this.prevBtn = document.getElementById('prevServices');
        this.nextBtn = document.getElementById('nextServices');
        this.indicatorsWrapper = document.getElementById('carouselIndicators');

        this.items = [];
        this.itemWidth = 0;
        this.gap = 0;
        this.index = 0; // índice actual incluyendo clones
        this.cloneBlock = 0; // cantidad de items reales clonados a cada lado (bloque completo)
        this.transitionMs = 600;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        if (!this.grid || !this.carousel || !this.prevBtn || !this.nextBtn || !this.indicatorsWrapper) return;
        this.setup();
        this.bind();
        this.startAutoPlay();
    }

    setup() {
        this.stopAutoPlay();
        this.grid.classList.add('no-transition');
        this.grid.style.transform = 'translateX(0)';

        // Eliminar clones previos
        this.grid.querySelectorAll('[data-clone="true"]').forEach(el => el.remove());

        // Medidas y elementos
        const first = this.grid.querySelector('.servicio-item');
        if (!first) return;
        const gridStyles = getComputedStyle(this.grid);
        const gapStr = gridStyles.getPropertyValue('gap') || gridStyles.getPropertyValue('column-gap') || '0px';
        this.gap = parseFloat(gapStr) || 0;
        this.itemWidth = first.getBoundingClientRect().width;
        this.items = Array.from(this.grid.querySelectorAll('.servicio-item'));

        // Clonar bloque completo a ambos lados para loop perfecto
        this.cloneBlock = this.items.length;
        const headClones = this.items.map(n => this.cloneItem(n));
        const tailClones = this.items.map(n => this.cloneItem(n));
        // Prepend head clones
        headClones.forEach(n => this.grid.insertBefore(n, this.grid.firstChild));
        // Append tail clones
        tailClones.forEach(n => this.grid.appendChild(n));

        // Iniciar en la primera carta real alineada a la izquierda
        this.index = this.cloneBlock; // apunta al primer real
        this.jumpToIndex(this.index);

        // Indicadores por ítem
        this.renderIndicators();
        this.updateActiveItem(true); // arranque: ocultar previo para que se vea natural a la izquierda
        this.updateIndicators();

        requestAnimationFrame(() => this.grid.classList.remove('no-transition'));
    }

    cloneItem(node) {
        const c = node.cloneNode(true);
        c.setAttribute('data-clone', 'true');
        return c;
    }

    bind() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        this.addTouchSupport();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.setup(), 200);
        });

        this.grid.addEventListener('transitionend', () => this.onTransitionEnd());
    }

    // Posición para alinear el item en índice actual
    currentTranslate() {
        const step = this.itemWidth + this.gap;
        const styles = getComputedStyle(this.carousel);
        const paddingLeft = parseFloat(styles.getPropertyValue('padding-left')) || 0;
        // Alinear el ítem activo al borde izquierdo interno (respeta padding-left)
        return paddingLeft - this.index * step;
    }

    applyTransform() {
        this.grid.style.transition = `transform ${this.transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        this.grid.style.transform = `translateX(${this.currentTranslate()}px)`;
    }

    jumpToIndex(i) {
        this.grid.classList.add('no-transition');
        this.index = i;
        this.grid.style.transform = `translateX(${this.currentTranslate()}px)`;
        void this.grid.offsetHeight; // reflow
        this.grid.classList.remove('no-transition');
    }

    next() {
        this.index += 1; // avanzar por ítem
        this.applyTransform();
        this.updateActiveItem();
        this.updateIndicators();
    }

    prev() {
        this.index -= 1; // retroceder por ítem
        this.applyTransform();
        this.updateActiveItem();
        this.updateIndicators();
    }

    onTransitionEnd() {
        const totalItems = this.grid.querySelectorAll('.servicio-item').length; // con clones
        const realCount = this.items.length;
        // Si pasamos del bloque real al final clonado, saltar al real equivalente
        if (this.index >= this.cloneBlock + realCount) {
            this.jumpToIndex(this.cloneBlock + (this.index - (this.cloneBlock + realCount)));
        }
        // Si pasamos antes del bloque real hacia clones del inicio, saltar al real equivalente
        if (this.index < this.cloneBlock) {
            this.jumpToIndex(this.cloneBlock + realCount + (this.index - this.cloneBlock));
        }
    }

    // Dots por ítem real
    renderIndicators() {
        this.indicatorsWrapper.innerHTML = ''; /* this.items.length; i++ */ /* esa es la formula para automatiizar */
        for (let i = 0; i < this.items.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'indicator-dot' + (i === 0 ? ' active' : '');
            dot.dataset.slide = String(i);
            dot.addEventListener('click', () => this.goToRealIndex(i));
            this.indicatorsWrapper.appendChild(dot);
        }
    }

    goToRealIndex(realIdx) {
        const currentReal = this.realIndex();
        const diff = realIdx - currentReal;
        this.index += diff; // mover respecto al índice actual
        this.applyTransform();
        this.updateActiveItem();
        this.updateIndicators();
    }

    realIndex() {
        // índice dentro del bloque real 0..n-1
        const realCount = this.items.length;
        let r = (this.index - this.cloneBlock) % realCount;
        if (r < 0) r += realCount;
        return r;
    }

    updateIndicators() {
        const active = this.realIndex();
        const dots = this.indicatorsWrapper.querySelectorAll('.indicator-dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === active));
    }

    updateActiveItem(hidePrevOnce = false) {
        const all = this.grid.querySelectorAll('.servicio-item');
        // Marcar todo como oculto inicialmente
        all.forEach(el => el.classList.remove('active', 'prev', 'next'));
        all.forEach(el => el.classList.add('hidden'));

        const current = all[this.index];
        if (current) {
            current.classList.add('active');
            current.classList.remove('hidden');
            let prevEl = all[this.index - 1];
            let nextEl = all[this.index + 1];
            if (!prevEl) prevEl = all[all.length - 1];
            if (!nextEl) nextEl = all[0];
            // En el arranque podemos ocultar el previo una sola vez para que la primera se vea pegada a la izquierda
            if (!hidePrevOnce && prevEl) { prevEl.classList.add('prev'); prevEl.classList.remove('hidden'); }
            if (nextEl) { nextEl.classList.add('next'); nextEl.classList.remove('hidden'); }
        }
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), 4000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    addTouchSupport() {
        let startX = 0;
        let dragging = false;
        this.grid.addEventListener('touchstart', (e) => {
            if (!e.touches || e.touches.length === 0) return;
            startX = e.touches[0].clientX;
            dragging = true;
            this.stopAutoPlay();
        }, { passive: true });
        this.grid.addEventListener('touchend', (e) => {
            if (!dragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            const threshold = 30;
            if (Math.abs(diff) > threshold) {
                diff > 0 ? this.next() : this.prev();
            }
            dragging = false;
            this.startAutoPlay();
        });
    }
}

// --- Preloader & media readiness ---
function waitForVideoReady(video) {
    return new Promise((resolve) => {
        if (!video) return resolve();
        const onReady = () => resolve();
        video.addEventListener('canplaythrough', onReady, { once: true });
        // Intentar autoplay con mute y playsinline
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        const tryPlay = video.play();
        if (tryPlay && typeof tryPlay.then === 'function') {
            tryPlay.then(() => resolve()).catch(() => resolve());
        }
        // Fallback por si no dispara evento
        setTimeout(() => resolve(), 1500);
    });
}

// Refuerzo de loop infinito y reintentos en móviles/hosting estático
function ensureVideoLooping(video) {
    if (!video) return;
    // Asegurar atributos de compatibilidad
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const safePlay = () => {
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    // Reiniciar al finalizar (por si el atributo loop falla)
    video.addEventListener('ended', () => {
        try { video.currentTime = 0; } catch {}
        safePlay();
    });

    // Si se queda esperando o se suspende la descarga, reintentar
    ['stalled','suspend','waiting','error'].forEach(evt => {
        video.addEventListener(evt, () => {
            // pequeño delay para evitar bucles agresivos
            setTimeout(safePlay, 200);
        });
    });

    // Cerca del final, forzar wrap para evitar un frame congelado
    video.addEventListener('timeupdate', () => {
        if (!isFinite(video.duration) || video.duration === 0) return;
        if (video.duration - video.currentTime < 0.15) {
            try { video.currentTime = 0; } catch {}
        }
    });

    // Al recuperar la visibilidad, reintentar play
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) safePlay();
    });

    // Primer arranque asegurado
    safePlay();
}

function waitForServiceMedia() {
    const mediaBlocks = document.querySelectorAll('.servicio-media');
    if (mediaBlocks.length === 0) return Promise.resolve();

    const promises = Array.from(mediaBlocks).map(block => {
        const img = block.querySelector('img');
        if (!img) return Promise.resolve();
        // Lazy: si hay data-src, asignar a src
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) img.src = dataSrc;
        return new Promise(res => {
            if (img.complete && img.naturalWidth > 0) {
                block.classList.add('loaded');
                return res();
            }
            img.addEventListener('load', () => { block.classList.add('loaded'); res(); }, { once: true });
            img.addEventListener('error', () => { block.classList.add('loaded'); res(); }, { once: true });
            // Fallback si no hay src definido
            setTimeout(() => { block.classList.add('loaded'); res(); }, 1200);
        });
    });
    return Promise.all(promises);
}

function hidePreloader() {
    const pre = document.getElementById('preloader');
    if (pre) pre.classList.add('hidden');
    document.body.classList.remove('loading');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Marcar estado de carga
    document.body.classList.add('loading');

    const video = document.getElementById('autoVideo');
    const ready = Promise.all([
        waitForVideoReady(video),
        waitForServiceMedia(),
    ]);

    // Timeout de seguridad para no bloquear
    const timeout = new Promise(res => setTimeout(res, 3000));

    Promise.race([ready, timeout]).finally(() => {
        hidePreloader();
        // Asegurar play del video y loop infinito tras mostrar
        if (video) {
            ensureVideoLooping(video);
        }
    });

    // Iniciar carrusel
    new ServiciosCarousel();
});

console.log('🦷 Dra. Maritza Alcedo - Website loaded successfully!');
console.log('💡 Tip: Try the Konami code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');