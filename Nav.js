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

// Testimonials Slider
let currentTestimonio = 0;
const testimonios = document.querySelectorAll('.testimonio-card');
const testimonialPrevBtn = document.querySelector('.slider-btn.prev');
const testimonialNextBtn = document.querySelector('.slider-btn.next');
const slider = document.querySelector('.testimonios-slider');

function updateTestimonios() {
    testimonios.forEach((testimonio, index) => {
        testimonio.classList.remove('active');
        if (index === currentTestimonio) {
            testimonio.classList.add('active');
            // Removed automatic scroll to prevent unwanted navigation
            // testimonio.scrollIntoView({
            //     behavior: 'smooth',
            //     block: 'nearest',
            //     inline: 'center'
            // });
        }
    });
}

testimonialNextBtn.addEventListener('click', () => {
    currentTestimonio = (currentTestimonio + 1) % testimonios.length;
    updateTestimonios();
});

testimonialPrevBtn.addEventListener('click', () => {
    currentTestimonio = (currentTestimonio - 1 + testimonios.length) % testimonios.length;
    updateTestimonios();
});

// Auto-slide testimonials - DISABLED
// setInterval(() => {
//     currentTestimonio = (currentTestimonio + 1) % testimonios.length;
//     updateTestimonios();
// }, 5000);

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
    
    console.log('🗺️ Leaflet Map inicializado correctamente');
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

// Cinta horizontal profesional de servicios
class ServiciosCarousel {
    constructor() {
        this.grid = document.getElementById('serviciosGrid');
        this.prevBtn = document.getElementById('prevServices');
        this.nextBtn = document.getElementById('nextServices');
        this.indicators = document.querySelectorAll('.indicator-dot');
        this.carousel = document.querySelector('.servicios-carousel');
        
        this.currentPosition = 0;
        this.slideWidth = 320; // Ancho de cada carta + gap
        this.totalSlides = 6; // Total de servicios
        this.isInfinite = false; // Activar modo infinito
        
        this.init();
    }
    
    init() {
        if (!this.grid || !this.prevBtn || !this.nextBtn) return;
        
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-play
        this.startAutoPlay();
        
        // Pausar en hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Actualizar estado inicial
        this.updateControls();
    }
    
    prevSlide() {
        this.currentPosition -= this.slideWidth;
        this.updatePosition();
    }
    
    nextSlide() {
        this.currentPosition += this.slideWidth;
        this.updatePosition();
    }
    
    goToSlide(slideIndex) {
        this.currentPosition = slideIndex * this.slideWidth;
        this.updatePosition();
    }
    
    updatePosition() {
        // Aplicar transición suave
        this.grid.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        this.grid.style.transform = `translateX(-${this.currentPosition}px)`;
        
        this.updateControls();
        this.updateIndicators();
    }
    
    updateControls() {
        // En modo infinito, nunca deshabilitar los botones
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
    }
    
    updateIndicators() {
        const currentSlide = Math.round(this.currentPosition / this.slideWidth);
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = 4;
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.grid.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.grid.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide(); // Swipe left - next
            } else {
                this.prevSlide(); // Swipe right - prev
            }
        }
    }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ServiciosCarousel();
});

console.log('🦷 Dra. Maritza Alcedo - Website loaded successfully!');
console.log('💡 Tip: Try the Konami code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');