const express = require("express");
const app = express();
const unqmod = require("../../UNQfy/unqfy");
const fs = require('fs'); // necesitado para guardar/cargar unqfy

const  artistRouter = express.Router();


function getUNQfy(filename = '../../UNQfy/data.json') {
    let unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
      unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
  }
  
function saveUNQfy(unqfy, filename = 'data.json') {
unqfy.save(filename);
}
  
artistRouter.get('/2', function(req, res) {
    let u = new getUNQfy();
    console.log(u);
    // const artist = u.showArtist();
    
    res.send()
  });

app.use('/api/artists', artistRouter);


app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});