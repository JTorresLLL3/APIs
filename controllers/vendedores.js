const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: " ",
  database: "urhomeCUU_",
};
module.exports = {
  getVendedores: (req, res) => {
    let vendedores = [];
    try {
      const connection = mysql.createConnection(connectionObject);
      connection.query("SELECT * FROM vendedores", (err, results, fields) => {
        if (!err) {
          vendedores = results;
          res.json(vendedores);
        } else {
          res.json({ message: "Error al obtener a los vendedores" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error al obtener a los vendedores" });
    }
  },
    getVendedor: (req, res) => {
    const { id } = req.params;
    let query = "SELECT * FROM vendedores";
    let queryParams = [];
    if (id) {
        query += " WHERE id_vendedor = ?";
        queryParams.push(id);
    }
    try {
        const connection = mysql.createConnection(connectionObject);
        connection.query(query, queryParams, (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                res.status(500).json({ message: "Error al obtener los vendedores" });
            }
            connection.end();
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error al obtener a los vendedores" });
    }
},
postVendedor: (req, res) => {
  const {
    nombre_vendedor,
    apellidoP_vendedor,
    apellidoM_vendedor,
    contraseña_vendedor,
    edad_vendedor,
    telefono_vendedor,
    email_vendedor,
    check_vendedor,
    check_vendedor2,
    fk_suscripcion
  } = req.body;

  const camposRequeridos = {
    nombre_vendedor,
    apellidoP_vendedor,
    apellidoM_vendedor,
    contraseña_vendedor,
    edad_vendedor,
    telefono_vendedor,
    email_vendedor,
    check_vendedor,
    check_vendedor2,
    fk_suscripcion
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
    INSERT INTO vendedores (
    nombre_vendedor,
    apellidoP_vendedor,
    apellidoM_vendedor,
    contraseña_vendedor,
    edad_vendedor,
    telefono_vendedor,
    email_vendedor,
    check_vendedor,
    check_vendedor2,
    fk_suscripcion
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nombre_vendedor,
    apellidoP_vendedor,
    apellidoM_vendedor,
    contraseña_vendedor,
    edad_vendedor,
    telefono_vendedor,
    email_vendedor,
    check_vendedor,
    check_vendedor2,
    fk_suscripcion
  ];

  const connection = mysql.createConnection(connectionObject);

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Error al crear el vendedor:", err);
      return res.status(500).json({ message: "Error al crear el vendedor", error: err });
    }

    res.status(201).json({
      message: "Vendedor creado exitosamente",
      id_vendedor: results.insertId,
      data: { ...req.body }
    });

    connection.end();
  });
},
putVendedor: (req, res) => {
  const {
    nombre_vendedor,
    apellidoP_vendedor,
    apellidoM_vendedor,
    email_vendedor,
    contraseña_vendedor,
    edad_vendedor,
    telefono_vendedor,
    check_vendedor,
    check_vendedor2,
  } = req.body;

  const query = `
    UPDATE vendedores
    SET nombre_vendedor = ?, 
        apellidoP_vendedor = ?, 
        apellidoM_vendedor = ?, 
        contraseña_vendedor = ?, 
        edad_vendedor = ?, 
        telefono_vendedor = ?, 
        check_vendedor = ?, 
        check_vendedor2 = ?
    WHERE email_vendedor = ?
  `;

  try {
    const connection = mysql.createConnection(connectionObject);
    connection.query(
      query,
      [
        nombre_vendedor,
        apellidoP_vendedor,
        apellidoM_vendedor,
        contraseña_vendedor,
        edad_vendedor,
        telefono_vendedor,
        check_vendedor,
        check_vendedor2,
        email_vendedor,
      ],
      (err, results) => {
        if (!err) {
          res.status(200).json({
            message: "Vendedor actualizado exitosamente",
            data: results,
          });
        } else {
          res.status(500).json({
            message: "Error al actualizar el vendedor",
            error: err,
          });
        }
        connection.end();
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al actualizar el vendedor" });
  }
},


};
