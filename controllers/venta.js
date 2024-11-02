const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "goldenstate777*",
  database: "urhomeCUU2",
};
module.exports = {
  getVentas: (req, res) => {
    let ventas = [];
    try {
      const connection = mysql.createConnection(connectionObject);
      connection.query("SELECT * FROM venta_publicaciones", (err, results, fields) => {
        if (!err) {
          ventas = results;
          res.json(ventas);
        } else {
          res.json({ message: "Error al obtener las ventas" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error al obtener las ventas" });
    }
  },
    getVenta: (req, res) => {
    const { id } = req.params;
    let query = "SELECT * FROM venta_publicaciones";
    let queryParams = [];
    if (id) {
        query += " WHERE id_publicacion_venta = ?";
        queryParams.push(id);
    }
    try {
        const connection = mysql.createConnection(connectionObject);
        connection.query(query, queryParams, (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                res.status(500).json({ message: "Error al obtener las ventas" });
            }
            connection.end();
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error al obtener las ventas" });
    }
},

};
