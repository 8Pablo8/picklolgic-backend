const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta del archivo de la base de datos
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Conectar a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
    return;
  }
  console.log('Conectado a la base de datos SQLite.');
});

// Array con los nombres de los campeones y sus fotos
const campeones = [
    { nombre: 'Ahri', foto: 'fotos/ahri.png' },
    { nombre: 'Akali', foto: 'fotos/akali.png' },
    { nombre: 'Alistar', foto: 'fotos/alistar.png' },
    { nombre: 'Amumu', foto: 'fotos/amumu.png' },
    { nombre: 'Anivia', foto: 'fotos/anivia.png' },
    { nombre: 'Annie', foto: 'fotos/annie.png' },
    { nombre: 'Aphelios', foto: 'fotos/aphelios.png' },
    { nombre: 'Ashe', foto: 'fotos/ashe.png' },
    { nombre: 'Aurelion Sol', foto: 'fotos/aurelionsol.png' },
    { nombre: 'Azir', foto: 'fotos/azir.png' },
    { nombre: 'Bard', foto: 'fotos/bard.png' },
    { nombre: 'Blitzcrank', foto: 'fotos/blitzcrank.png' },
    { nombre: 'Brand', foto: 'fotos/brand.png' },
    { nombre: 'Braum', foto: 'fotos/braum.png' },
    { nombre: 'Caitlyn', foto: 'fotos/caitlyn.png' },
    { nombre: 'Camille', foto: 'fotos/camille.png' },
    { nombre: 'Cassiopeia', foto: 'fotos/cassiopeia.png' },
    { nombre: "Cho'Gath", foto: 'fotos/chogath.png' },
    { nombre: 'Corki', foto: 'fotos/corki.png' },
    { nombre: 'Darius', foto: 'fotos/darius.png' },
    { nombre: 'Diana', foto: 'fotos/diana.png' },
    { nombre: 'Dr. Mundo', foto: 'fotos/drmundo.png' },
    { nombre: 'Draven', foto: 'fotos/draven.png' },
    { nombre: 'Ekko', foto: 'fotos/ekko.png' },
    { nombre: 'Elise', foto: 'fotos/elise.png' },
    { nombre: 'Evelynn', foto: 'fotos/evelynn.png' },
    { nombre: 'Ezreal', foto: 'fotos/ezreal.png' },
    { nombre: 'Fiddlesticks', foto: 'fotos/fiddlesticks.png' },
    { nombre: 'Fiora', foto: 'fotos/fiora.png' },
    { nombre: 'Fizz', foto: 'fotos/fizz.png' },
    { nombre: 'Galio', foto: 'fotos/galio.png' },
    { nombre: 'Gangplank', foto: 'fotos/gangplank.png' },
    { nombre: 'Garen', foto: 'fotos/garen.png' },
    { nombre: 'Gnar', foto: 'fotos/gnar.png' },
    { nombre: 'Gragas', foto: 'fotos/gragas.png' },
    { nombre: 'Graves', foto: 'fotos/graves.png' },
    { nombre: 'Gwen', foto: 'fotos/gwen.png' },
    { nombre: 'Hecarim', foto: 'fotos/hecarim.png' },
    { nombre: 'Heimerdinger', foto: 'fotos/heimerdinger.png' },
    { nombre: 'Hwei', foto: 'fotos/hwei.png' },
    { nombre: 'Illaoi', foto: 'fotos/illaoi.png' },
    { nombre: 'Irelia', foto: 'fotos/irelia.png' },
    { nombre: 'Ivern', foto: 'fotos/ivern.png' },
    { nombre: 'Janna', foto: 'fotos/janna.png' },
    { nombre: 'Jarvan IV', foto: 'fotos/jarvaniv.png' },
    { nombre: 'Jax', foto: 'fotos/jax.png' },
    { nombre: 'Jayce', foto: 'fotos/jayce.png' },
    { nombre: 'Jhin', foto: 'fotos/jhin.png' },
    { nombre: 'Jinx', foto: 'fotos/jinx.png' },
    { nombre: "Kai'Sa", foto: 'fotos/kaisa.png' },
    { nombre: 'Kalista', foto: 'fotos/kalista.png' },
    { nombre: 'Karma', foto: 'fotos/karma.png' },
    { nombre: 'Karthus', foto: 'fotos/karthus.png' },
    { nombre: 'Kassadin', foto: 'fotos/kassadin.png' },
    { nombre: 'Katarina', foto: 'fotos/katarina.png' },
    { nombre: 'Kayle', foto: 'fotos/kayle.png' },
    { nombre: 'Kayn', foto: 'fotos/kayn.png' },
    { nombre: 'Kennen', foto: 'fotos/kennen.png' },
    { nombre: "Kha'Zix", foto: 'fotos/khazix.png' },
    { nombre: 'Kindred', foto: 'fotos/kindred.png' },
    { nombre: 'Kled', foto: 'fotos/kled.png' },
    { nombre: "Kog'Maw", foto: 'fotos/kogmaw.png' },
    { nombre: 'LeBlanc', foto: 'fotos/leblanc.png' },
    { nombre: 'Lee Sin', foto: 'fotos/leesin.png' },
    { nombre: 'Leona', foto: 'fotos/leona.png' },
    { nombre: 'Lillia', foto: 'fotos/lillia.png' },
    { nombre: 'Lissandra', foto: 'fotos/lissandra.png' },
    { nombre: 'Lucian', foto: 'fotos/lucian.png' },
    { nombre: 'Lulu', foto: 'fotos/lulu.png' },
    { nombre: 'Lux', foto: 'fotos/lux.png' },
    { nombre: 'Malphite', foto: 'fotos/malphite.png' },
    { nombre: 'Malzahar', foto: 'fotos/malzahar.png' },
    { nombre: 'Maokai', foto: 'fotos/maokai.png' },
    { nombre: 'Master Yi', foto: 'fotos/masteryi.png' },
    { nombre: 'Miss Fortune', foto: 'fotos/missfortune.png' },
    { nombre: 'Mordekaiser', foto: 'fotos/mordekaiser.png' },
    { nombre: 'Morgana', foto: 'fotos/morgana.png' },
    { nombre: 'Nami', foto: 'fotos/nami.png' },
    { nombre: 'Nasus', foto: 'fotos/nasus.png' },
    { nombre: 'Nautilus', foto: 'fotos/nautilus.png' },
    { nombre: 'Neeko', foto: 'fotos/neeko.png' },
    { nombre: 'Nidalee', foto: 'fotos/nidalee.png' },
    { nombre: 'Nocturne', foto: 'fotos/nocturne.png' },
    { nombre: 'Nunu & Willump', foto: 'fotos/nunu.png' },
    { nombre: 'Olaf', foto: 'fotos/olaf.png' },
    { nombre: 'Orianna', foto: 'fotos/orianna.png' },
    { nombre: 'Ornn', foto: 'fotos/ornn.png' },
    { nombre: 'Pantheon', foto: 'fotos/pantheon.png' },
    { nombre: 'Poppy', foto: 'fotos/poppy.png' },
    { nombre: 'Pyke', foto: 'fotos/pyke.png' },
    { nombre: 'Qiyana', foto: 'fotos/qiyana.png' },
    { nombre: 'Quinn', foto: 'fotos/quinn.png' },
    { nombre: 'Rakan', foto: 'fotos/rakan.png' },
    { nombre: 'Rammus', foto: 'fotos/rammus.png' },
    { nombre: "Rek'Sai", foto: 'fotos/reksai.png' },
    { nombre: 'Rell', foto: 'fotos/rell.png' },
    { nombre: 'Renekton', foto: 'fotos/renekton.png' },
    { nombre: 'Rengar', foto: 'fotos/rengar.png' },
    { nombre: 'Riven', foto: 'fotos/riven.png' },
    { nombre: 'Rumble', foto: 'fotos/rumble.png' },
    { nombre: 'Ryze', foto: 'fotos/ryze.png' },
    { nombre: 'Samira', foto: 'fotos/samira.png' },
    { nombre: 'Sejuani', foto: 'fotos/sejuani.png' },
    { nombre: 'Senna', foto: 'fotos/senna.png' },
    { nombre: 'Seraphine', foto: 'fotos/seraphine.png' },
    { nombre: 'Sett', foto: 'fotos/sett.png' },
    { nombre: 'Shaco', foto: 'fotos/shaco.png' },
    { nombre: 'Shen', foto: 'fotos/shen.png' },
    { nombre: 'Shyvana', foto: 'fotos/shyvana.png' },
    { nombre: 'Singed', foto: 'fotos/singed.png' },
    { nombre: 'Sion', foto: 'fotos/sion.png' },
    { nombre: 'Sivir', foto: 'fotos/sivir.png' },
    { nombre: 'Skarner', foto: 'fotos/skarner.png' },
    { nombre: 'Sona', foto: 'fotos/sona.png' },
    { nombre: 'Soraka', foto: 'fotos/soraka.png' },
    { nombre: 'Swain', foto: 'fotos/swain.png' },
    { nombre: 'Sylas', foto: 'fotos/sylas.png' },
    { nombre: 'Syndra', foto: 'fotos/syndra.png' },
    { nombre: 'Tahm Kench', foto: 'fotos/tahmkench.png' },
    { nombre: 'Taliyah', foto: 'fotos/taliyah.png' },
    { nombre: 'Talon', foto: 'fotos/talon.png' },
    { nombre: 'Taric', foto: 'fotos/taric.png' },
    { nombre: 'Teemo', foto: 'fotos/teemo.png' },
    { nombre: 'Thresh', foto: 'fotos/thresh.png' },
    { nombre: 'Tristana', foto: 'fotos/tristana.png' },
    { nombre: 'Trundle', foto: 'fotos/trundle.png' },
    { nombre: 'Tryndamere', foto: 'fotos/tryndamere.png' },
    { nombre: 'Twisted Fate', foto: 'fotos/twistedfate.png' },
    { nombre: 'Twitch', foto: 'fotos/twitch.png' },
    { nombre: 'Udyr', foto: 'fotos/udyr.png' },
    { nombre: 'Urgot', foto: 'fotos/urgot.png' },
    { nombre: 'Varus', foto: 'fotos/varus.png' },
    { nombre: 'Vayne', foto: 'fotos/vayne.png' },
    { nombre: 'Veigar', foto: 'fotos/veigar.png' },
    { nombre: "Vel'Koz", foto: 'fotos/velkoz.png' },
    { nombre: 'Vex', foto: 'fotos/vex.png' },
    { nombre: 'Vi', foto: 'fotos/vi.png' },
    { nombre: 'Viego', foto: 'fotos/viego.png' },
    { nombre: 'Viktor', foto: 'fotos/viktor.png' },
    { nombre: 'Vladimir', foto: 'fotos/vladimir.png' },
    { nombre: 'Volibear', foto: 'fotos/volibear.png' },
    { nombre: 'Warwick', foto: 'fotos/warwick.png' },
    { nombre: 'Wukong', foto: 'fotos/wukong.png' },
    { nombre: 'Xayah', foto: 'fotos/xayah.png' },
    { nombre: 'Xerath', foto: 'fotos/xerath.png' },
    { nombre: 'Xin Zhao', foto: 'fotos/xinzhao.png' },
    { nombre: 'Yasuo', foto: 'fotos/yasuo.png' },
    { nombre: 'Yone', foto: 'fotos/yone.png' },
    { nombre: 'Yorick', foto: 'fotos/yorick.png' },
    { nombre: 'Yuumi', foto: 'fotos/yuumi.png' },
    { nombre: 'Zac', foto: 'fotos/zac.png' },
    { nombre: 'Zed', foto: 'fotos/zed.png' },
    { nombre: 'Ziggs', foto: 'fotos/ziggs.png' },
    { nombre: 'Zilean', foto: 'fotos/zilean.png' },
    { nombre: 'Zoe', foto: 'fotos/zoe.png' },
    { nombre: 'Zyra', foto: 'fotos/zyra.png' }
];


// Insertar datos en la tabla
const sqlInsert = 'INSERT INTO campeones (nombre, foto) VALUES (?, ?)';

db.serialize(() => {
  const stmt = db.prepare(sqlInsert);

  campeones.forEach(campeon => {
    stmt.run(campeon.nombre, campeon.foto, (err) => {
      if (err) {
        console.error('Error al insertar datos:', err.message);
      }
    });
  });

  stmt.finalize((err) => {
    if (err) {
      console.error('Error al finalizar la sentencia:', err.message);
    } else {
      console.log('Datos insertados correctamente.');
    }
  });
});

// Cerrar la conexión a la base de datos
db.close((err) => {
  if (err) {
    console.error('Error al cerrar la conexión:', err.message);
  } else {
    console.log('Conexión a la base de datos cerrada.');
  }
});
