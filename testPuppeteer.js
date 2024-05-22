const obtenerRecomendaciones = require('./obtenerRecomendaciones');

async function testObtenerRecomendaciones() {
  const posicion = 'Middle'; // Cambia esto según la posición que quieras probar
  try {
    const recomendaciones = await obtenerRecomendaciones(posicion);
    console.log('Recomendaciones:', recomendaciones);
  } catch (error) {
    console.error('Error durante la prueba de obtenerRecomendaciones:', error);
  }
}

testObtenerRecomendaciones();
