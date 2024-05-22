const puppeteer = require('puppeteer');

// Función para normalizar los nombres de los campeones
function normalizarNombreCampeon(nombre) {
  return nombre.toLowerCase().replace(/[^a-z0-9]/g, ''); // Eliminar caracteres no alfanuméricos
}

async function obtenerPuntuacion(browser, url) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: ['domcontentloaded'] }); // Reducir el waitUntil para acelerar la carga

    const valorEncontrado = await page.$eval('.mb-1.font-bold', el => {
      const texto = el.textContent.trim();
      return parseFloat(texto);
    });

    await page.close();
    return valorEncontrado;
  } catch (error) {
    console.error(`Error obteniendo la puntuación de la URL ${url}:`, error);
    await page.close();
    return null;
  }
}

async function enfrentamientos(aspirantes, rivales) {
  const browser = await puppeteer.launch({ headless: true });
  
  const tareas = [];

  for (const aspirante of aspirantes) {
    if (!aspirante) continue; // Saltar si el aspirante está vacío

    const nombreAspirante = normalizarNombreCampeon(aspirante);
    for (const rival of rivales) {
      if (!rival) continue; // Saltar si el rival está vacío

      const nombreRival = normalizarNombreCampeon(rival);
      const url = `https://lolalytics.com/lol/${nombreAspirante}/vs/${nombreRival}/build/`;
      console.log(`Navegando a ${url}`);
      
      tareas.push(obtenerPuntuacion(browser, url).then(puntuacion => ({ aspirante, puntuacion })));
    }
  }

  const resultados = await Promise.all(tareas);

  await browser.close();

  const medias = aspirantes.map(aspirante => {
    const puntuaciones = resultados
      .filter(resultado => resultado.aspirante === aspirante && resultado.puntuacion !== null)
      .map(resultado => resultado.puntuacion);

    if (puntuaciones.length > 0) {
      const media = puntuaciones.reduce((a, b) => a + b, 0) / puntuaciones.length;
      return { aspirante, media };
    }
    return null;
  }).filter(resultado => resultado !== null);

  // Ordenar los aspirantes según las medias
  medias.sort((a, b) => b.media - a.media);

  return medias;
}

module.exports = enfrentamientos;
