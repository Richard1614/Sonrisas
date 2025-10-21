// 🗺️ Ejemplos de cómo cambiar ubicaciones del mapa

// ========================================
// MÉTODO 1: Cambiar coordenadas directamente
// ========================================

// Para cambiar a Mall del Sur:
// En map-config.js, cambia las coordenadas:
/*
location: {
    lat: -12.2000,  // Latitud del Mall del Sur
    lng: -76.9500   // Longitud del Mall del Sur
}
*/

// ========================================
// MÉTODO 2: Usar funciones JavaScript
// ========================================

// Ejemplo 1: Cambiar a Mall del Sur
// Abre la consola del navegador (F12) y ejecuta:
// changeLocation('Mall del Sur, Chorrillos, Lima, Perú');

// Ejemplo 2: Cambiar a Plaza Norte
// changeLocation('Plaza Norte, Independencia, Lima, Perú');

// Ejemplo 3: Cambiar a Jockey Plaza
// changeLocation('Jockey Plaza, Santiago de Surco, Lima, Perú');

// ========================================
// MÉTODO 3: Ubicaciones predefinidas
// ========================================

// Usar ubicaciones predefinidas:
// setPredefinedLocation('mall-del-sur');
// setPredefinedLocation('plaza-norte');
// setPredefinedLocation('jockey-plaza');
// setPredefinedLocation('real-plaza');
// setPredefinedLocation('centro-lima');

// ========================================
// MÉTODO 4: Coordenadas específicas
// ========================================

// Para ubicaciones específicas con coordenadas exactas:
// updateMapLocation(-12.2000, -76.9500, 'Mall del Sur');

// ========================================
// COORDENADAS DE LUGARES POPULARES EN LIMA
// ========================================

const COORDENADAS_LIMA = {
    'mall-del-sur': { lat: -12.2000, lng: -76.9500 },
    'plaza-norte': { lat: -11.9500, lng: -77.0500 },
    'jockey-plaza': { lat: -12.1000, lng: -77.0000 },
    'real-plaza': { lat: -12.0500, lng: -77.1000 },
    'centro-lima': { lat: -12.0464, lng: -77.0428 },
    'miraflores': { lat: -12.1200, lng: -77.0300 },
    'san-isidro': { lat: -12.1000, lng: -77.0300 },
    'la-molina': { lat: -12.0800, lng: -76.9500 },
    'ate': { lat: -12.0500, lng: -76.9000 },
    'callao': { lat: -12.0500, lng: -77.1000 }
};

// Función para usar coordenadas predefinidas
function usarCoordenadasPredefinidas(lugar) {
    if (COORDENADAS_LIMA[lugar]) {
        const coords = COORDENADAS_LIMA[lugar];
        updateMapLocation(coords.lat, coords.lng, lugar);
    } else {
        console.error('Lugar no encontrado:', lugar);
        console.log('Lugares disponibles:', Object.keys(COORDENADAS_LIMA));
    }
}

// ========================================
// INSTRUCCIONES DE USO
// ========================================

console.log(`
🗺️ INSTRUCCIONES PARA CAMBIAR UBICACIÓN:

1. MÉTODO FÁCIL - Usar consola del navegador (F12):
   changeLocation('Mall del Sur, Chorrillos, Lima, Perú');

2. MÉTODO RÁPIDO - Ubicaciones predefinidas:
   setPredefinedLocation('mall-del-sur');

3. MÉTODO DIRECTO - Coordenadas exactas:
   updateMapLocation(-12.2000, -76.9500, 'Mall del Sur');

4. MÉTODO CONFIGURACIÓN - Editar map-config.js:
   Cambiar las coordenadas en el archivo de configuración

Lugares disponibles:
- mall-del-sur
- plaza-norte  
- jockey-plaza
- real-plaza
- centro-lima
- miraflores
- san-isidro
- la-molina
- ate
- callao
`);

// ========================================
// FUNCIONES DE AYUDA
// ========================================

// Función para obtener coordenadas de cualquier dirección
function obtenerCoordenadas(direccion) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}&limit=1`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const result = data[0];
                console.log(`📍 Coordenadas de "${direccion}":`);
                console.log(`Latitud: ${result.lat}`);
                console.log(`Longitud: ${result.lon}`);
                console.log(`Para usar en map-config.js:`);
                console.log(`lat: ${result.lat},`);
                console.log(`lng: ${result.lon}`);
            } else {
                console.error('No se encontró la dirección:', direccion);
            }
        })
        .catch(error => {
            console.error('Error al buscar coordenadas:', error);
        });
}

// Ejemplo de uso:
// obtenerCoordenadas('Mall del Sur, Lima, Perú');
