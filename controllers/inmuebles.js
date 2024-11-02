const mysql = require("mysql2");
// Create the connection to database
// Una conexion a la base de datos es un vinculo entre nuestra aplicacion y nuestro servicio de base de datos
// para poder hacer operaciones mientras este activo
// Existe algo llamado connection pool, son conexiones que se mantienen abiertas para poder ser utilizadas
// en cualquier momento, y se cierran cuando ya no son necesarias
// Las conexiones a una base de datos no son infinitas, por lo que es importante cerrarlas cuando ya no se necesiten
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "",
  database: "urhomeCUU2",
};
module.exports = {
  getInmuebles: (req, res) => {
    let inmuebles = [];
    try {
      const connection = mysql.createConnection(connectionObject);
      connection.query("SELECT * FROM inmuebles", (err, results, fields) => {
        if (!err) {
          inmuebles = results;
          res.json(inmuebles);
        } else {
          res.json({ message: "Error al obtener los inmuebles" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error al obtener los inmuebles" });
    }
  },
    getInmueble: (req, res) => {
    const { id } = req.params;
    let query = "SELECT * FROM inmuebles";
    let queryParams = [];
    if (id) {
        query += " WHERE id_inmueble = ?"; // Suponiendo que el campo del ID en la tabla es 'id_inmueble'
        queryParams.push(id);
    }
    try {
        const connection = mysql.createConnection(connectionObject);
        connection.query(query, queryParams, (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                res.status(500).json({ message: "Error al obtener los inmuebles" });
            }
            connection.end();
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error al obtener los inmuebles" });
    }
},

};
