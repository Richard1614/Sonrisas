// Configuración del mapa de OpenStreetMap con Leaflet
// Puedes cambiar estos valores para personalizar el mapa

const MAP_CONFIG = {
    // Coordenadas de la clínica (latitud, longitud)
    // Mall del Sur, Lima, Perú
    location: {
        lat: -12.10989738647015,  // Latitud del Mall del Sur
        lng: -76.9827451170958   // Longitud del Mall del Sur
    },
    
    // Configuración del mapa
    zoom: 16,
    mapType: 'OSM', // OSM, SATELLITE, TERRAIN
    
    // Información de la clínica
    clinicInfo: {
        name: 'Club Sonrisa',
        doctor: 'Especialistas en salud dental',
        address: 'Av. Primavera 903 oficina 504',
        city: 'Chacarilla, San Borja',
        phone: '+51 970 800 813',
        email: 'info@draalcedo.com'
    },
    
    // Estilo del marcador personalizado
    marker: {
        color: '#2E6FA3',
        size: 40,
        animation: 'DROP' // DROP, BOUNCE
    },
    
    // Estilos personalizados del mapa
    mapStyles: {
        // Estilo personalizado para el marcador
        marker: {
            color: '#2E6FA3',
            size: 30,
            icon: '🦷'
        },
        // Configuración de capas
        layers: {
            osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
        }
    }
};

// Función para obtener la configuración
function getMapConfig() {
    return MAP_CONFIG;
}

// Función para actualizar la ubicación
function updateClinicLocation(lat, lng, address) {
    MAP_CONFIG.location.lat = lat;
    MAP_CONFIG.location.lng = lng;
    
    if (address) {
        MAP_CONFIG.clinicInfo.address = address;
    }
    
    console.log('📍 Ubicación de la clínica actualizada:', { lat, lng, address });
}

// Función para actualizar información de contacto
function updateClinicInfo(info) {
    Object.assign(MAP_CONFIG.clinicInfo, info);
    console.log('📞 Información de contacto actualizada:', info);
}
