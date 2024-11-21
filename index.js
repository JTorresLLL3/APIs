const usuariosController = require("./controllers/usuarios");
const ventaController = require("./controllers/venta_publicaciones");
const rentaController = require("./controllers/renta_publicaciones");
const vendedoresController = require("./controllers/vendedores");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 5500;

app.get("/", (req, res) => {
  res.send("EN CONSTRUCCION");
});

//usuarios
app.get("/usuarios/:id", usuariosController.getUsuario);
app.get("/usuarios", usuariosController.getUsuarios);
app.get("/usuarios/:id/favoritos", usuariosController.getFavoritos); 
app.post("/usuario", jsonParser, usuariosController.postUsuario);
app.put("/usuario/edit", jsonParser, usuariosController.putUsuario);
// app.post("/usuarios/:id/publicacion_venta", jsonParser, usuariosController.postPublicacion);

//vendedores
app.get("/vendedores/:id", vendedoresController.getVendedor);
app.get("/vendedores", vendedoresController.getVendedores);
app.post("/vendedor", jsonParser, vendedoresController.postVendedor);
app.put("/vendedor/edit", jsonParser, vendedoresController.putVendedor);


//venta_publicaciones
app.get("/venta_publicaciones/:id", ventaController.getVenta);
app.get("/venta_publicaciones", ventaController.getVentas);
app.post("/venta_publicacion", jsonParser, ventaController.postVenta);

//renta_publicaciones
app.get("/renta_publicaciones/:id", rentaController.getRenta);
app.get("/renta_publicaciones", rentaController.getRentas);
app.post("/renta_publicaciones", jsonParser, rentaController.postRenta);


//Escuchar peticiones en el puerto 5500
app.listen(port, () => {
  console.log("Servidor corriendo en el " + port + " para el area 51");
});

// INSTALAR
// instalar nodemon como dependencia de desarrollo, para salvarnos de tener que prender y apagar el server
// npm install nodemon -D
// agregar script de inicio en el package.json
// "start": "nodemon index.js"
// instalar body-parser para poder leer los datos que enviamos en el body de la peticion
// npm install body-parser


// Una aplicación puede/debe manejar una o varias APIs?
/*Cuando se hacen varias APIs?
API TWITTER INTERNA
Tenemos usuarios que solo entran a leer posts, siguen a muchas cuentas.
Tengo 10 millones de usuarios de este tipo
500k de usuarios que suben contenido.
El servidor soporta 8 millones
Si un servidor soporta 8, agrega otro.
Dividir los servicios por función. (Usuarios, creación, lectura, misc).
-- Buscar kubernetes y docker para los microservicios.
A los servicios les llama "pots".
Kubernetes agrega o quita servidores según la necesidad o la demanda de usuarios para aplicar servicios.
Es para empresas grandes o sistemas de mucha carga.
Para nosotros es preferente manejar todo en un solo servidor. Hacerlo simple.
*/

/*
¿Como conectarse a la base de datos?
Descargar MySQL2
Se tiene que instalar en el proyecto de express
npm install mysql2
Cadena de conexión. (Base de datos).
Programa dbeaver, squirrel
Se necesita la URL del localhost para indicar que la base de datos está en la computadora.
Poner atencion a mayusculas y minusculas cuando se mande llamar una tabla desde la base de datos.
!err = Si no hay error. El simbolo de admiración indica que debe pasar la acción contraria.

npm install cors
const cors = require("cors");

*/