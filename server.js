const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const obtenerRecomendaciones = require('./obtenerRecomendaciones');
const enfrentamientos = require('./enfrentamientos');
const buscarSinergia = require('./BuscarSinergia');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let storedData = {
  topCincoAspirantes: [],
  rivales: [],
  aspirantesOrdenados: [],
  aliados: []
};

// Configurar la conexión a SQLite
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the SQLite database.');
});

// Endpoint para obtener un campeón por nombre
app.get('/api/campeones/nombre/:nombre', (req, res) => {
  const { nombre } = req.params;
  const sql = 'SELECT * FROM campeones WHERE nombre = ?';
  db.get(sql, [nombre], (err, row) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(row);
  });
});

// Endpoint para autocompletar nombres de campeones
app.get('/api/campeones/autocompletar/:nombre', (req, res) => {
  const { nombre } = req.params;
  const sql = 'SELECT nombre FROM campeones WHERE nombre LIKE ? LIMIT 10';
  db.all(sql, [`%${nombre}%`], (err, rows) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(rows);
  });
});

let browser, page;

// Función para iniciar el navegador Puppeteer una vez
async function initBrowser() {
  if (!browser) {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    // Desactivar imágenes y otros recursos no esenciales
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });
  }
}

initBrowser();

// Endpoint para obtener recomendaciones usando Puppeteer
app.post('/api/recomendaciones', async (req, res) => {
  const { posicion } = req.body;
  console.log('Posición recibida:', posicion);

  try {
    const recomendaciones = await obtenerRecomendaciones(posicion, page);
    console.log('Recomendaciones obtenidas:', recomendaciones);
    res.json(recomendaciones);
  } catch (error) {
    console.error('Error obteniendo recomendaciones:', error);
    res.status(500).send('Error obteniendo recomendaciones');
  }
});

// Endpoint para almacenar datos
app.post('/api/storeData', (req, res) => {
  const { topCincoAspirantes, rivales } = req.body;
  storedData.topCincoAspirantes = topCincoAspirantes;
  storedData.rivales = rivales;
  res.status(200).send('Datos almacenados correctamente');
});

// Endpoint para almacenar resultados de enfrentamientos
app.post('/api/storeEnfrentamientos', (req, res) => {
  const { aspirantesOrdenados, aliados } = req.body;
  storedData.aspirantesOrdenados = aspirantesOrdenados;
  storedData.aliados = aliados;
  res.status(200).send('Resultados de enfrentamientos almacenados correctamente');
});

// Endpoint para obtener los datos almacenados
app.get('/api/getStoredData', (req, res) => {
  res.json(storedData);
});

// Endpoint para ejecutar enfrentamientos y devolver resultados
app.get('/api/enfrentamientos', async (req, res) => {
  try {
    if (!storedData.topCincoAspirantes.length || !storedData.rivales.length) {
      return res.status(400).send('No hay datos almacenados suficientes para realizar los enfrentamientos');
    }

    console.log('Datos para enfrentamientos:', { topCincoAspirantes: storedData.topCincoAspirantes, rivales: storedData.rivales });
    const resultados = await enfrentamientos(storedData.topCincoAspirantes, storedData.rivales);
    console.log('Resultados obtenidos:', resultados);
    res.json(resultados);
  } catch (error) {
    console.error('Error ejecutando enfrentamientos:', error);
    res.status(500).send('Error ejecutando enfrentamientos');
  }
});

// Endpoint para almacenar resultados de sinergias
app.post('/api/storeSinergias', (req, res) => {
  const { topDosAspirantesSinergia } = req.body;
  storedData.topDosAspirantesSinergia = topDosAspirantesSinergia;
  res.status(200).send('Resultados de sinergias almacenados correctamente');
});

// Endpoint para obtener los datos de sinergias almacenados
app.get('/api/getStoredSinergia', (req, res) => {
  res.json({ topDosAspirantesSinergia: storedData.topDosAspirantesSinergia });
});

// Endpoint para buscar sinergia
app.post('/api/buscarSinergia', async (req, res) => {
  const { aspirantes, aliados } = req.body;
  console.log('Datos recibidos para buscar sinergia:', { aspirantes, aliados }); // Añadir log
  try {
    const aspirantesOrdenados = await buscarSinergia(aspirantes, aliados);
    console.log('Aspirantes ordenados por sinergia:', aspirantesOrdenados); // Añadir log
    res.json(aspirantesOrdenados);
  } catch (error) {
    console.error('Error buscando sinergia:', error); // Añadir log
    res.status(500).send('Error buscando sinergia');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
