Esta es una API que creamos para el proyecto integrador de "UrHomeCUU".
Las APIs que están añadidas en el documento son para el registro de un usuario, para obtener un usuario y para poder modificar un usuario. 
Tambíen tenemos una API que realiza lo mismo para los vendedores.
Adicionalmente contamos con una API que permite hacer el posteo de una publicación para la página.
El funcionamiento del programa es para meramente obtener, consultar e insertar datos en la base de datos de nuestro proyecto integrador, 
que es acerca de la venta y renta de inmuebles.

//usuarios
-app.get("/usuarios/:id", usuariosController.getUsuario);
El frontend realiza un fetch a esta ruta para mostrar la información detallada de un usuario específico en pantalla. 
La API recibe el ID del usuario como parámetro, y el controlador se encarga de buscar y retornar el registro correspondiente desde la base de datos.

-app.get("/usuarios", usuariosController.getUsuarios);
Cuando se necesita visualizar todos los usuarios del sistema, el frontend hace una petición a esta ruta. 
El controlador de la API consulta la base de datos y retorna la lista completa de usuarios registrados para su visualización en pantalla.

-app.get("/usuarios/:id/favoritos", usuariosController.getFavoritos);
Para acceder a las publicaciones favoritas de un usuario, el frontend utiliza esta ruta proporcionando el ID del usuario. 
El controlador procesa esta solicitud y recupera de la base de datos la colección de publicaciones que el usuario ha marcado como favoritas.

-app.post("/usuario", jsonParser, usuariosController.postUsuario);
Cuando un nuevo usuario completa el formulario de registro en el frontend, los datos son enviados a esta ruta. 
El controlador procesa la información recibida y crea un nuevo registro de usuario en la base de datos, 
estableciendo así una nueva cuenta en el sistema.

-app.put("/usuario/edit", jsonParser, usuariosController.putUsuario);
Los usuarios pueden modificar su información personal a través de un formulario en el frontend. Esta ruta recibe los datos actualizados, 
y el controlador se encarga de encontrar y actualizar el registro correspondiente en la base de datos.

-app.post("/usuarios/:id/publicacion_venta", jsonParser, usuariosController.postPublicacion);
Cuando un usuario desea crear una nueva publicación de venta, el frontend envía los datos del formulario a esta ruta junto con el ID del usuario. 
El controlador se encarga de validar la información y crear un nuevo registro de publicación en la base de datos, asociándolo al usuario correspondiente.


//vendedores
-app.get("/vendedores/:id", vendedoresController.getVendedor);
Esta ruta se encarga de consultar el id de un vendedor en específico, con el objetivo de consultar al vendedor que está 
vendiendo una casa en especifico, la api realiza una consulta en la base de datos, en la cual consulta a un vendedor en específico, 
con el fin de mostrarlo como el propietario de la propiedad que se está vendiendo.

-app.get("/vendedores", vendedoresController.getVendedores);
Esta ruta se encarga de consultar el id de todos los vendedores,con el objetivo de validar la existencia de un vendedor, 
ya sea utilizando en un inicio de sesión, con el fin de comprobar sus credenciales,etc. La api realiza una consulta en la base de datos, 
en la cual consulta a todos los vendedores registrados, con el fin de validar la existencia de un vendedor.

-app.post("/vendedor", jsonParser, vendedoresController.postVendedor);
Esta ruta se encarga de realizar un registro en la base de datos, cuando un vendedor publique una casa, se realiza un fetch con el frontend, 
para que la api obtenga los registros del formulario y los inserte en la base de datos en la tabla de “venta _ publicaciones”.

-app.put("/vendedor/edit", jsonParser, vendedoresController.putVendedor);
Esta ruta se encarga de hacer una actualización a la base de datos, en los datos del vendedor, se hace un fetch con el frontend, 
para que el usuario actualice sus datos en una pantalla, y el código de la api obtenga los datos del formulario. 
Y en base a eso la ruta se encarga de actualizar el registro en la base de datos.


//venta_publicaciones
-app.get("/venta_publicaciones/:id", ventaController.getVenta);
Obtiene la información completa de una publicación específica según su Id registrado en la base de datos.
Esta ruta es utilizada en el front-end para mostrar los detalles de una publicación en particular.

-app.get("/venta_publicaciones", ventaController.getVentas);
Devuelve todas las publicaciones de ventas disponibles en la base de datos.
Esta ruta es utilizada en el front-end para cargar las publicaciones visibles para los usuarios. 

-app.post("/venta_publicacion", jsonParser, ventaController.postVenta);
Registra una nueva publicación en la base de datos. Esta ruta es utilizada en el front-end cuando se llena el formulario de registro para crear una nueva publicación. 
La información ingresada por el usuario se ve reflejada en la base de datos.


//renta_publicaciones
-app.get("/renta_publicaciones/:id", rentaController.getRenta);
Esta ruta permite acceder a la información detallada de una publicación específica en la base de datos. 
Utilizando el ID proporcionado por el cliente, la API extrae los datos correspondientes y los muestra en pantalla a través de una solicitud desde el frontend. 
Esto le facilita al usuario visualizar los detalles precisos de esa publicación.

-app.get("/renta_publicaciones", rentaController.getRentas);
Con esta ruta, el sistema recupera y muestra una lista completa de todas las publicaciones de renta disponibles. 
A través de una solicitud al frontend, los usuarios pueden acceder a esta lista y explorar las opciones almacenadas en la base de datos. 
La API asegura que todos los registros se carguen correctamente para una navegación fluida.

-app.post("/renta_publicaciones", jsonParser, rentaController.postRenta);
Esta ruta facilita la creación de nuevas publicaciones de renta en la base de datos. Los datos ingresados en el formulario del frontend son procesados y enviados a través de esta API, 
asegurando que el nuevo registro quede almacenado correctamente. Esto permite a los usuarios agregar nuevas propiedades a la plataforma de forma eficiente.
