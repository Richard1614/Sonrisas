
// Usar ubicaciones predefinidas:
// setPredefinedLocation('mall-del-sur');
// setPredefinedLocation('plaza-norte');
// setPredefinedLocation('jockey-plaza');
// setPredefinedLocation('real-plaza');
// setPredefinedLocation('centro-lima');
// ========================================
// COORDENADAS DE LUGARES POPULARES EN LIMAS
// ========================================
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
