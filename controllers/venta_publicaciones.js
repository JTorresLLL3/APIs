const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "mysql123",
  database: "urhomeCUU_",
};
module.exports = {
  // getVentas: (req, res) => {
  //   let ventas = [];
  //   try {
  //     const connection = mysql.createConnection(connectionObject);
  //     connection.query("SELECT * FROM venta_publicaciones", (err, results, fields) => {
  //       if (!err) {
  //         ventas = results;
  //         res.json(ventas);
  //       } else {
  //         res.json({ message: "Error al obtener las ventas" });
  //       }
  //       connection.end();
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     res.json({ message: "Error al obtener las ventas" });
  //   }
  // },
  getVentas: (req, res) => {
    try {
      const connection = mysql.createConnection(connectionObject);
      const query = `
        SELECT 
          vp.id_publicacion_venta,
          vp.titulo_publicacion,
          vp.precio_inmueble,
          vp.calle_inmueble,
          vp.colonia_inmueble,
          vp.cp_inmueble,
          vp.terreno_inmueble,
          vp.habitaciones,
          vp.baños_int,
          vp.pisos,
          vp.garage,
          vp.amueblado,
          vp.descripcion_publicacion,
          vp.fecha_publicacion,
          vp.estado_publicacion,
          vp.tipo_inmueble,
          vp.fk_vendedor,
          GROUP_CONCAT(ip.img_ruta) AS imagenes
        FROM 
          venta_publicaciones vp
        LEFT JOIN 
          imagenes_publicacion ip
        ON 
          vp.id_publicacion_venta = ip.fk_publicacion_venta
        GROUP BY 
          vp.id_publicacion_venta
      `;

      connection.query(query, (err, results, fields) => {
        if (err) {
          console.error("Error al ejecutar la consulta:", err);
          res.status(500).json({ message: "Error al obtener las ventas" });
        } else {
          // Formatear las imágenes para cada publicación
          const ventas = results.map((venta) => ({
            ...venta,
            imagenes: venta.imagenes ? venta.imagenes.split(",") : [],
          }));
          res.json(ventas);
        }
        connection.end();
      });
    } catch (e) {
      console.error("Error en el controlador:", e);
      res.status(500).json({ message: "Error al obtener las ventas" });
    }
  },
//     getVenta: (req, res) => {
//     const { id } = req.params;
//     let query = "SELECT * FROM venta_publicaciones";
//     let queryParams = [];
//     if (id) {
//         query += " WHERE id_publicacion_venta = ?";
//         queryParams.push(id);
//     }
//     try {
//         const connection = mysql.createConnection(connectionObject);
//         connection.query(query, queryParams, (err, results, fields) => {
//             if (!err) {
//                 res.json(results);
//             } else {
//                 res.status(500).json({ message: "Error al obtener las ventas" });
//             }
//             connection.end();
//         });
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: "Error al obtener las ventas" });
//     }
// },
getVenta: (req, res) => {
  const { id } = req.params;
  let query = `
      SELECT 
          vp.id_publicacion_venta, 
          vp.titulo_publicacion, 
          vp.precio_inmueble, 
          vp.calle_inmueble, 
          vp.colonia_inmueble, 
          vp.cp_inmueble, 
          vp.terreno_inmueble, 
          vp.habitaciones, 
          vp.baños_int, 
          vp.pisos, 
          vp.garage, 
          vp.amueblado, 
          vp.descripcion_publicacion, 
          vp.fecha_publicacion, 
          vp.estado_publicacion, 
          vp.tipo_inmueble, 
          vp.fk_vendedor, 
          GROUP_CONCAT(ip.img_ruta) AS imagenes
      FROM venta_publicaciones vp
      LEFT JOIN imagenes_publicacion ip ON vp.id_publicacion_venta = ip.fk_publicacion_venta`;
  let queryParams = [];
  
  // Si se proporciona un ID, filtrar la consulta
  if (id) {
      query += " WHERE vp.id_publicacion_venta = ?";
      queryParams.push(id);
  }

  // Agrupar por la publicación para manejar las imágenes relacionadas
  query += " GROUP BY vp.id_publicacion_venta";

  try {
      const connection = mysql.createConnection(connectionObject);
      connection.query(query, queryParams, (err, results, fields) => {
          if (!err) {
              if (results.length > 0) {
                  // Transformar las imágenes de BLOB a base64 y separarlas en un array
                  const formattedResults = results.map(result => ({
                      ...result,
                      imagenes: result.imagenes 
                          ? result.imagenes.split(',').map(img => Buffer.from(img, 'binary').toString('base64')) 
                          : []
                  }));
                  res.json(formattedResults);
              } else {
                  res.status(404).json({ message: "No se encontró la publicación de venta con el ID proporcionado" });
              }
          } else {
              console.error("Error al ejecutar la consulta:", err);
              res.status(500).json({ message: "Error al obtener las ventas" });
          }
          connection.end();
      });
  } catch (e) {
      console.error("Error al procesar la solicitud:", e);
      res.status(500).json({ message: "Error al obtener las ventas" });
  }
},


postVenta: (req, res) => {
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
    INSERT INTO venta_publicaciones (
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
