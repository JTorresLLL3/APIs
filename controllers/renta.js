const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "goldenstate777*",
  database: "urhomeCUU2",
};
module.exports = {
  getRentas: (req, res) => {
    let rentas = [];
    try {
      const connection = mysql.createConnection(connectionObject);
      connection.query("SELECT * FROM renta_publicaciones", (err, results, fields) => {
        if (!err) {
          rentas = results;
          res.json(rentas);
        } else {
          res.json({ message: "Error al obtener las rentas" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error al obtener las rentas" });
    }
  },
    getRenta: (req, res) => {
    const { id } = req.params;
    let query = "SELECT * FROM renta_publicaciones";
    let queryParams = [];
    if (id) {
        query += " WHERE id_publicacion_renta = ?";
        queryParams.push(id);
    }
    try {
        const connection = mysql.createConnection(connectionObject);
        connection.query(query, queryParams, (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                res.status(500).json({ message: "Error al obtener las rentas" });
            }
            connection.end();
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error al obtener las rentas" });
    }
},

};
