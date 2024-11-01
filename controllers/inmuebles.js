const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "AlbedoLLL3",
  database: "urhomeCUU2",
};

module.exports = {
  getInmuebles: (req, res) => {
    const { tipo, categoria } = req.query;
    let query = `
      SELECT i.*, 
             t.nombre_tipo,
             c.nombre_categoria
      FROM inmuebles i
      LEFT JOIN tipos t ON i.fk_tipo = t.id_tipo
      LEFT JOIN categorias c ON i.fk_categoria = c.id_categoria
      WHERE 1=1
    `;
    let queryParams = [];

    // Agregar filtros si se proporcionaron
    if (tipo) {
      query += " AND i.fk_tipo = ?";
      queryParams.push(tipo);
    }
    if (categoria) {
      query += " AND i.fk_categoria = ?";
      queryParams.push(categoria);
    }

    try {
      const connection = mysql.createConnection(connectionObject);
      connection.query(query, queryParams, (err, results, fields) => {
        if (!err) {
          res.json(results);
        } else {
          console.error("Error en la consulta:", err);
          res.status(500).json({ 
            message: "Error al obtener los inmuebles",
            error: err.message 
          });
        }
        connection.end();
      });
    } catch (e) {
      console.error("Error en la conexión:", e);
      res.status(500).json({ 
        message: "Error al obtener los inmuebles",
        error: e.message 
      });
    }
  },

  getInmueble: (req, res) => {
    const { id } = req.params;
    const query = `
      SELECT i.*, 
             t.nombre_tipo,
             c.nombre_categoria
      FROM inmuebles i
      LEFT JOIN tipos t ON i.fk_tipo = t.id_tipo
      LEFT JOIN categorias c ON i.fk_categoria = c.id_categoria
      WHERE i.id_inmueble = ?
    `;

    try {
      const connection = mysql.createConnection(connectionObject);
      connection.query(query, [id], (err, results, fields) => {
        if (!err) {
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.status(404).json({ message: "Inmueble no encontrado" });
          }
        } else {
          console.error("Error en la consulta:", err);
          res.status(500).json({ 
            message: "Error al obtener el inmueble",
            error: err.message 
          });
        }
        connection.end();
      });
    } catch (e) {
      console.error("Error en la conexión:", e);
      res.status(500).json({ 
        message: "Error al obtener el inmueble",
        error: e.message 
      });
    }
  }
};
/*const mysql = require("mysql2");
// Create the connection to database
// Una conexion a la base de datos es un vinculo entre nuestra aplicacion y nuestro servicio de base de datos
// para poder hacer operaciones mientras este activo
// Existe algo llamado connection pool, son conexiones que se mantienen abiertas para poder ser utilizadas
// en cualquier momento, y se cierran cuando ya no son necesarias
// Las conexiones a una base de datos no son infinitas, por lo que es importante cerrarlas cuando ya no se necesiten
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "AlbedoLLL3",
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
*/