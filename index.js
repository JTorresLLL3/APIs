const publicacionesController = require("./controllers/publicaciones");
const userController = require("./controllers/user");
/*const ventaController = require("./controllers/venta");
const rentaController = require("./controllers/renta");*/
const vendedoresController = require("./controllers/vendedores");
const inmueblesController = require("./controllers/inmuebles");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const express = require("express");
const app = express();

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

//inmuebles
app.get("/inmuebles", inmueblesController.getInmuebles);

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

*/