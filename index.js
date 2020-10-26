const express = require("express");
const app = express();
const unqmod = require("../unqfy/unqfy");
const fs = require('fs'); // necesitado para guardar/cargar unqfy

const  artistRouter = express.Router();
const  albumesRouter = express.Router();
const  tracksRouter = express.Router();
const  playlistRouter = express.Router();

let UNQFY = new getUNQfy();

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
    const artistJSON = UNQFY.getArtistById(req.params.id);
    artistJSON.albumes = artistJSON.albumes.map((a)=>a.name);
    res.json(artistJSON);
});

// get all artist
artistRouter.get('/', function(req, res) {
  const artistas = UNQFY.showArtist();
  artistas.forEach(artistJSON => {
    artistJSON.albumes = artistJSON.albumes.map((a)=>a.name);  
  });
  res.json(artistas);
});

// get album by ID
albumesRouter.get('/:id', function(req, res) {
  const albumJSON = UNQFY.getAlbumById(req.params.id);
  albumJSON.autor = albumJSON.autor.name; 
  res.json(albumJSON);
});

// get all albums
albumesRouter.get('/', function(req, res) {
  let albumes = UNQFY.showAlbumes();
  albumes.forEach((albumJson)=>{
    albumJson.tracks.map((track)=>track.name);
  });
  res.json(albumes);
});


app.use('/api/artists', artistRouter);
app.use('/api/albums', albumesRouter);
app.use('/api/tracks', tracksRouter);
app.use('/api/playlists', playlistRouter);


app.listen(5000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});