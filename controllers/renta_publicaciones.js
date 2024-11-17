const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "",
  database: "urhomeCUU_",
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
postRenta: (req, res) => {
  const {
    titulo_publicacion,
    descripcion_publicacion,
    estado_publicacion,
    tipo_inmueble,
    fk_vendedor,
    fk_inmueble
  } = req.body;

  if (!titulo_publicacion || !descripcion_publicacion || estado_publicacion === undefined || !fk_vendedor || !fk_inmueble) {
    return res.status(400).json({
      message: "Todos los campos requeridos deben estar presentes",
      required_fields: [
        "titulo_publicacion",
        "descripcion_publicacion",
        "estado_publicacion",
        "fk_vendedor",
        "fk_inmueble"
      ]
    });
  }

  if (titulo_publicacion.length > 100) {
    return res.status(400).json({
      message: "El título de la publicación no puede exceder los 100 caracteres"
    });
  }

  if (descripcion_publicacion.length > 250) {
    return res.status(400).json({
      message: "La descripción de la publicación no puede exceder los 250 caracteres"
    });
  }

  const connection = mysql.createConnection(connectionObject);

  const query = `
    INSERT INTO renta_publicaciones (
      titulo_publicacion,
      descripcion_publicacion,
      estado_publicacion,
      tipo_inmueble,
      fk_vendedor,
      fk_inmueble
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    titulo_publicacion,
    descripcion_publicacion,
    estado_publicacion,
    tipo_inmueble,
    fk_vendedor,
    fk_inmueble
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Error al crear la publicación de venta:", err);
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
          message: "El vendedor o inmueble especificado no existe"
        });
      }
      return res.status(500).json({
        message: "Error al crear la publicación de venta"
      });
    }

    res.status(201).json({
      message: "Publicación de venta creada exitosamente",
      id: results.insertId,
      data: {
        ...req.body,
        id_publicacion_venta: results.insertId
      }
    });

    connection.end();
  });
},

};
