const buscarSinergia = require('./buscarSinergia');

(async () => {
  // Ejemplo de aspirantes y rivales con algunas posiciones vacías
  const aspirantes = ['Vel\'Koz', 'Lee Sin', 'Nidalee', 'Skarner', 'Rek\'Sai'];
  const aliados = ['Illaoi', 'Ezreal', 'Evelynn', '', ''];

  // Ejecutar el enfrentamiento y obtener resultados
  const resultados = await buscarSinergia(aspirantes, aliados);

  // Mostrar los resultados
  console.log('Aspirantes ordenados por sinergia:', resultados);
})();