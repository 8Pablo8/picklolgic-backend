const puppeteer = require('puppeteer');

async function obtenerRecomendaciones(posicion, browser) {
  const urlBase = 'https://lolalytics.com/lol/tierlist/';
  const url = `${urlBase}?lane=${posicion.toLowerCase()}`;
  
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const recomendaciones = await page.evaluate(() => {
    const nombres = [];
    const elementos = document.querySelectorAll('div[class*="flex"][class*="h-"][class*="justify-between"][class*="text-"]');

    for (let i = 0; i < 5 && i < elementos.length; i++) {
      const elemento = elementos[i];
      const nombre = elemento.querySelector('a[q\\:key="SO_0"]')?.textContent.trim();
      if (nombre) {
        nombres.push(nombre);
      }
    }

    return nombres;
  });

  await page.close();
  return recomendaciones;
}

module.exports = obtenerRecomendaciones;
