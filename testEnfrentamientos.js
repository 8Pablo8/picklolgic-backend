const enfrentamientos = require('./enfrentamientos');

(async () => {
  // Ejemplo de aspirantes y rivales con algunas posiciones vacías
  const topCincoAspirantes = ['Vel\'Koz', 'Lee Sin', 'Nidalee', 'Skarner', 'Rek\'Sai'];
  const rivales = ['Illaoi', 'Ezreal', 'Evelynn', '', ''];

  // Ejecutar el enfrentamiento y obtener resultados
  const resultados = await enfrentamientos(topCincoAspirantes, rivales);

  // Mostrar los resultados
  console.log('Resultados ordenados:', resultados);
})();
