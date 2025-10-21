# 🗺️ Configuración del Mapa con OpenStreetMap (Leaflet)

## ✅ **Ventajas de OpenStreetMap:**
- **100% Gratuito** - No requiere API Key
- **Sin límites de uso** - Sin restricciones de cuota
- **Código abierto** - Completamente libre
- **Rápido y confiable** - Carga instantánea
- **Múltiples estilos** - OSM, Satélite, Terreno

## 📋 Pasos para configurar el mapa

### 1. ¡No necesitas API Key! 🎉
El mapa funciona inmediatamente sin configuración adicional.

### 2. Configurar la ubicación
En el archivo `map-config.js`, actualiza las coordenadas:

```javascript
location: {
    lat: -12.0464,  // Cambia por la latitud real de tu clínica
    lng: -77.0428   // Cambia por la longitud real de tu clínica
}
```

### 3. Personalizar información de la clínica
En el archivo `map-config.js`, actualiza la información:

```javascript
clinicInfo: {
    name: 'Club Sonrisas',
    doctor: 'Dra. Maritza Alcedo',
    address: 'Tu dirección real aquí',
    city: 'Tu ciudad, País',
    phone: 'Tu teléfono real',
    email: 'tu-email@ejemplo.com'
}
```

## 🎨 Personalización del mapa

### Cambiar el estilo del marcador
```javascript
marker: {
    color: '#2E6FA3',  // Color del marcador
    size: 30,          // Tamaño del marcador
    icon: '🦷'         // Emoji o icono personalizado
}
```

### Cambiar el tipo de mapa
```javascript
mapType: 'OSM'  // OSM, SATELLITE, TERRAIN
```

### Cambiar el zoom
```javascript
zoom: 16  // Número entre 1 (mundo) y 20 (muy cerca)
```

## 🔧 Funciones disponibles

### Cambiar ubicación fácilmente
```javascript
// Método 1: Buscar por dirección
changeLocation('Mall del Sur, Chorrillos, Lima, Perú');

// Método 2: Ubicaciones predefinidas
setPredefinedLocation('mall-del-sur');

// Método 3: Coordenadas exactas
updateMapLocation(-12.2000, -76.9500, 'Mall del Sur');
```

### Ubicaciones predefinidas disponibles
```javascript
setPredefinedLocation('mall-del-sur');     // Mall del Sur
setPredefinedLocation('plaza-norte');      // Plaza Norte
setPredefinedLocation('jockey-plaza');     // Jockey Plaza
setPredefinedLocation('real-plaza');       // Real Plaza
setPredefinedLocation('centro-lima');      // Centro de Lima
```

### Actualizar información de contacto
```javascript
updateClinicInfo({
    name: 'Nuevo nombre',
    phone: '+51 999 888 777',
    email: 'nuevo@email.com'
});
```

## 📍 Cómo obtener coordenadas

1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca tu dirección
3. Haz clic derecho en el marcador
4. Selecciona las coordenadas que aparecen
5. Copia latitud y longitud

## 🚀 Características del mapa

- ✅ Mapa interactivo de OpenStreetMap
- ✅ Marcador personalizado con emoji 🦷
- ✅ Popup con información de contacto
- ✅ Múltiples estilos de mapa (OSM, Satélite, Terreno)
- ✅ Configuración fácil sin API Key
- ✅ Responsive design
- ✅ 100% Gratuito y sin límites

## ✅ Ventajas sobre Google Maps

- **Sin API Key**: Funciona inmediatamente
- **Sin costos**: Completamente gratuito
- **Sin límites**: Sin restricciones de uso
- **Código abierto**: Transparente y confiable
- **Rápido**: Carga instantánea
- **Flexible**: Fácil personalización

## 🆘 Solución de problemas

### El mapa no aparece
- Verifica que Leaflet esté cargado correctamente
- Revisa la consola del navegador para errores
- Asegúrate de que el elemento `#leafletMap` exista en el HTML

### El marcador no aparece
- Verifica que las coordenadas sean correctas
- Asegúrate de que el elemento `#leafletMap` exista en el HTML
- Revisa que la configuración en `map-config.js` sea correcta

### Problemas de carga
- Verifica tu conexión a internet
- Asegúrate de que los CDN de Leaflet estén disponibles
- Revisa la consola para errores de red
