const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "AlbedoLLL3",
  database: "urhomeCUU_",
};
module.exports = {
  getUsuarios: (req, res) => {
    let usuarios = [];
    try {
      const connection = mysql.createConnection(connectionObject);
      connection.query("SELECT * FROM usuarios", (err, results, fields) => {
        if (!err) {
          usuarios = results;
          res.json(usuarios);
        } else {
          res.json({ message: "Error al obtener a los usuarios" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error al obtener a los usuarios" });
    }
  },
    getUsuario: (req, res) => {
    const { id } = req.params;
    let query = "SELECT * FROM usuarios";
    let queryParams = [];
    if (id) {
        query += " WHERE id_usuario = ?";
        queryParams.push(id);
    }
    try {
        const connection = mysql.createConnection(connectionObject);
        connection.query(query, queryParams, (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                res.status(500).json({ message: "Error al obtener los usuarios" });
            }
            connection.end();
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error al obtener a los usuarios" });
    }
},
getFavoritos: (req, res) => {
  const { id } = req.params;

  const query = `
SELECT 
    f.*,
    pv.*,
    pr.*
FROM 
    favoritos f
LEFT JOIN 
    venta_publicaciones pv ON f.fk_publicacion_venta = pv.id_publicacion_venta
LEFT JOIN 
    renta_publicaciones pr ON f.fk_publicacion_renta = pr.id_publicacion_renta
WHERE 
    f.fk_usuario = ?;
  `;
  
  try {
      const connection = mysql.createConnection(connectionObject);
      connection.query(query, [id], (err, results) => {
          if (!err) {
              res.json(results);
          } else {
              res.status(500).json({ message: "Error al obtener las publicaciones favoritas" });
          }
          connection.end();
      });
  } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Error al obtener las publicaciones favoritas" });
  }
},
postUsuario: (req, res) => {
  const {
    nombre_usuario,
    apellidoP_usuario,
    apellidoM_usuario,
    email_usuario,
    contraseña_usuario,
    edad_usuario,
    telefono_usuario
  } = req.body;

  const camposRequeridos = {
    nombre_usuario,
    apellidoP_usuario,
    apellidoM_usuario,
    email_usuario,
    contraseña_usuario,
    edad_usuario,
    telefono_usuario
  };

  const camposFaltantes = Object.entries(camposRequeridos)
    .filter(([_, value]) => value === undefined)
    .map(([key]) => key);

  if (camposFaltantes.length > 0) {
    return res.status(400).json({
      message: "Faltan campos requeridos",
      campos_faltantes: camposFaltantes
    });
  }

  const query = `
    INSERT INTO usuarios (
      nombre_usuario,
      apellidoP_usuario,
      apellidoM_usuario,
      email_usuario,
      contraseña_usuario,
      edad_usuario,
      telefono_usuario
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nombre_usuario,
    apellidoP_usuario,
    apellidoM_usuario,
    email_usuario,
    contraseña_usuario,
    edad_usuario,
    telefono_usuario
  ];

  const connection = mysql.createConnection(connectionObject);

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Error al crear el usuario:", err);
      return res.status(500).json({ message: "Error al crear el usuario", error: err });
    }

    res.status(201).json({
      message: "Usuario creado exitosamente",
      id_usuario: results.insertId,
      data: { ...req.body }
    });

    connection.end();
  });
},
putUsuario: (req, res) => {
  const {
    nombre_usuario,
    apellidoP_usuario,
    apellidoM_usuario,
    email_usuario,
    contraseña_usuario,
    edad_usuario,
    telefono_usuario,
    check_usuario,
    check_usuario2,
  } = req.body;

  const query = `
    UPDATE usuarios
    SET nombre_usuario = ?, 
        apellidoP_usuario = ?, 
        apellidoM_usuario = ?, 
        contraseña_usuario = ?, 
        edad_usuario = ?, 
        telefono_usuario = ?, 
        check_usuario = ?, 
        check_usuario2 = ?
    WHERE email_usuario = ?
  `;

  try {
    const connection = mysql.createConnection(connectionObject);
    connection.query(
      query,
      [
        nombre_usuario,
        apellidoP_usuario,
        apellidoM_usuario,
        contraseña_usuario,
        edad_usuario,
        telefono_usuario,
        check_usuario,
        check_usuario2,
        email_usuario,
      ],
      (err, results) => {
        if (!err) {
          res.status(200).json({
            message: "Usuario actualizado exitosamente",
            data: results,
          });
        } else {
          res.status(500).json({
            message: "Error al actualizar el usuario",
            error: err,
          });
        }
        connection.end();
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
},

};
