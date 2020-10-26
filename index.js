const express = require("express");
const app = express();
const unqmod = require("../unqfy/unqfy");
const fs = require('fs'); // necesitado para guardar/cargar unqfy

const  artistRouter = express.Router();


function getUNQfy(filename = '../unqfy/data.json') {
    let unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
      unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
  }
  
function saveUNQfy(unqfy, filename = 'data.json') {
unqfy.save(filename);
}

// get artist by ID
artistRouter.get('/:id', function(req, res) {
    let unq = new getUNQfy();
    const artistJSON = unq.getArtistById(req.params.id);
    artistJSON.albumes = artistJSON.albumes.map((a)=>a.name);
    res.json(artistJSON);
  });

// get all artist
artistRouter.get('/', function(req, res) {
  let unq = new getUNQfy();
  const artistas = unq.showArtist();
  artistas.forEach(artistJSON => {
    artistJSON.albumes = artistJSON.albumes.map((a)=>a.name);  
  });
  res.json(artistas);
});


app.use('/api/artists', artistRouter);


app.listen(5000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});