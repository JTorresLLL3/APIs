// const mysql = require("mysql2");
// Create the connection to database
// Una conexion a la base de datos es un vinculo entre nuestra aplicacion y nuestro servicio de base de datos
// para poder hacer operaciones mientras este activo
// Existe algo llamado connection pool, son conexiones que se mantienen abiertas para poder ser utilizadas
// en cualquier momento, y se cierran cuando ya no son necesarias
// Las conexiones a una base de datos no son infinitas, por lo que es importante cerrarlas cuando ya no se necesiten
// const connectionObject = {
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "urhomeCUU_",
// };
// module.exports = {
//   getInmuebles: (req, res) => {
//     let inmuebles = [];
//     try {
//       const connection = mysql.createConnection(connectionObject);
//       connection.query("SELECT * FROM inmuebles", (err, results, fields) => {
//         if (!err) {
//           inmuebles = results;
//           res.json(inmuebles);
//         } else {
//           res.json({ message: "Error al obtener los inmuebles" });
//         }
//         connection.end();
//       });
//     } catch (e) {
//       console.log(e);
//       res.json({ message: "Error al obtener los inmuebles" });
//     }
//   },
//     getInmueble: (req, res) => {
//     const { id } = req.params;
//     let query = "SELECT * FROM inmuebles";
//     let queryParams = [];
//     if (id) {
//         query += " WHERE id_inmueble = ?"; // Suponiendo que el campo del ID en la tabla es 'id_inmueble'
//         queryParams.push(id);
//     }
//     try {
//         const connection = mysql.createConnection(connectionObject);
//         connection.query(query, queryParams, (err, results, fields) => {
//             if (!err) {
//                 res.json(results);
//             } else {
//                 res.status(500).json({ message: "Error al obtener los inmuebles" });
//             }
//             connection.end();
//         });
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: "Error al obtener los inmuebles" });
//     }
// },
// postInmueble: (req, res) => {
//     try {
//         const {
//             precio_inmueble,
//             calle_inmueble,
//             colonia_inmueble,
//             cp_inmueble,
//             terreno_inmueble,
//             habitaciones,
//             baños_int,
//             garage,
//             pisos,
//             amueblado,
//             fk_vendedor
//         } = req.body;

//         const camposRequeridos = {
//             precio_inmueble,
//             calle_inmueble,
//             colonia_inmueble,
//             cp_inmueble,
//             terreno_inmueble,
//             baños_int,
//             garage,
//             pisos,
//             amueblado,
//             fk_vendedor
//         };

//         const camposFaltantes = Object.entries(camposRequeridos)
//             .filter(([_, value]) => value === undefined)
//             .map(([key]) => key);

//         if (camposFaltantes.length > 0) {
//             return res.status(400).json({
//                 message: "Faltan campos requeridos",
//                 campos_faltantes: camposFaltantes
//             });
//         }

//         // Validaciones específicas
//         if (precio_inmueble <= 0) {
//             return res.status(400).json({
//                 message: "El precio del inmueble debe ser mayor a 0"
//             });
//         }

//         if (terreno_inmueble <= 0) {
//             return res.status(400).json({
//                 message: "El terreno del inmueble debe ser mayor a 0"
//             });
//         }

//         if (cp_inmueble.length !== 5 || !/^\d+$/.test(cp_inmueble)) {
//             return res.status(400).json({
//                 message: "El código postal debe ser de 5 dígitos numéricos"
//             });
//         }

//         if (calle_inmueble.length > 50) {
//             return res.status(400).json({
//                 message: "La calle no puede exceder los 50 caracteres"
//             });
//         }

//         if (colonia_inmueble.length > 30) {
//             return res.status(400).json({
//                 message: "La colonia no puede exceder los 30 caracteres"
//             });
//         }

//         if (pisos <= 0) {
//             return res.status(400).json({
//                 message: "El número de pisos debe ser mayor a 0"
//             });
//         }

//         if (baños_int <= 0) {
//             return res.status(400).json({
//                 message: "El número de baños debe ser mayor a 0"
//             });
//         }

//         if (habitaciones !== undefined && habitaciones <= 0) {
//             return res.status(400).json({
//                 message: "El número de habitaciones debe ser mayor a 0"
//             });
//         }

//         const connection = mysql.createConnection(connectionObject);

//         const query = `
//             INSERT INTO inmuebles (
//                 precio_inmueble,
//                 calle_inmueble,
//                 colonia_inmueble,
//                 cp_inmueble,
//                 terreno_inmueble,
//                 habitaciones,
//                 baños_int,
//                 garage,
//                 pisos,
//                 amueblado,
//                 fk_vendedor
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         const values = [
//             precio_inmueble,
//             calle_inmueble,
//             colonia_inmueble,
//             cp_inmueble,
//             terreno_inmueble,
//             habitaciones,
//             baños_int,
//             garage,
//             pisos,
//             amueblado,
//             fk_vendedor
//         ];

//         connection.query(query, values, (err, results) => {
//             if (err) {
//                 console.error("Error al guardar el inmueble:", err);
//                 if (err.code === 'ER_NO_REFERENCED_ROW_2') {
//                     return res.status(400).json({
//                         message: "El vendedor especificado no existe"
//                     });
//                 }
//                 return res.status(500).json({
//                     message: "Error al guardar el inmueble"
//                 });
//             }

//             res.status(201).json({
//                 message: "Inmueble registrado exitosamente",
//                 id: results.insertId,
//                 data: {
//                     ...req.body,
//                     id_inmueble: results.insertId
//                 }
//             });

//             connection.end();
//         });
//     } catch (e) {
//         console.error("Error al procesar el inmueble:", e);
//         res.status(500).json({
//             message: "Error interno del servidor al procesar el inmueble"
//         });
//     }
// },

// };
