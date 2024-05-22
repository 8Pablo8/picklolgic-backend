const puppeteer = require('puppeteer');

function normalizarNombreCampeon(nombre) {
  return nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function obtenerSinergias(browser, url) {
  const page = await browser.newPage();
  try {
    console.log(`Navegando a ${url}`); // Añadir log
    await page.goto(url, { waitUntil: ['domcontentloaded'] }); // Reducir el waitUntil para acelerar la carga

    const sinergias = await page.$$eval('#goodWith h4', elementos => 
      elementos.map(el => el.textContent.trim())
    );

    await page.close();
    console.log(`Sinergias obtenidas para ${url}:`, sinergias); // Añadir log
    return sinergias;
  } catch (error) {
    console.error(`Error obteniendo sinergias de la URL ${url}:`, error);
    await page.close();
    return [];
  }
}

async function buscarSinergia(aspirantes, aliados) {
  if (aspirantes.length < 2) {
    throw new Error('Se necesitan al menos dos aspirantes para buscar sinergias');
  }

  const browser = await puppeteer.launch({ headless: true });
  const topDosAspirantes = aspirantes.slice(0, 2).map(normalizarNombreCampeon);
  console.log('Top dos aspirantes normalizados:', topDosAspirantes); // Añadir log

  const sinergiasAspirante = await obtenerSinergias(browser, `https://www.championcounter.es/${topDosAspirantes[1]}`);

  await browser.close();

  let aspirantesOrdenados = [...aspirantes];

  if (aliados.some(aliado => sinergiasAspirante.includes(aliado))) {
    aspirantesOrdenados = [aspirantes[1], aspirantes[0], ...aspirantes.slice(2)];
  }

  console.log('Aspirantes ordenados después de buscar sinergias:', aspirantesOrdenados); // Añadir log
  return aspirantesOrdenados;
}

module.exports = buscarSinergia;
