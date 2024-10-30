//require,, palabra para utilizar librerias en nuestro proyecto
const publicacionesController = require("./controllers/publicaciones");
const userController = require("./controllers/user");
/*const ventaController = require("./controllers/venta");
const rentaController = require("./controllers/renta");*/
const vendedoresController = require("./controllers/vendedores");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const express = require("express");
const app = express();
//Crear un servidor, para escuchar peticiones en la ruta /, y devolver un mensaje
// CORS
// Cross origin request service, nos permite restringir de donde pueden venir las peticiones
// PLACEHOLDER ROUTES
app.get("/", (req, res) => {
  res.send("EN CONSTRUCCION");
});

//publicaciones
app.get("/publicaciones/:id", publicacionesController.getPublicacion);
app.get("/publicaciones", publicacionesController.getPublicaciones);
app.post("/publicacion", jsonParser, publicacionesController.postPublicacion);

//usuarios
app.get("/user/:id", userController.getUser);
app.get("/user", userController.getUsers);

//vendedores
app.get("/vendedores/:id", vendedoresController.getVendedor);
app.get("/vendedores", vendedoresController.getVendedores);

/*
//venta
app.get("/venta/:id", ventaController.getVenta)
app.get("/venta", ventaController.getVentas)

//renta
app.get("/renta/:id", rentaController.getRenta)
app.get("/renta", rentaController.getRentas)

*/


//Escuchar peticiones en el puerto 5500
app.listen(5500, () => {
  console.log("Servidor corriendo en el puerto 5500 para el area 51");
});

// INSTALAR
// instalar nodemon como dependencia de desarrollo, para salvarnos de tener que prender y apagar el server
// npm install nodemon -D
// agregar script de inicio en el package.json
// "start": "nodemon index.js"
// instalar body-parser para poder leer los datos que enviamos en el body de la peticion
// npm install body-parser
