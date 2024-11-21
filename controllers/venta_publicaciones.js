const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "",
  database: "urhomeCUU_",
};
module.exports = {
  getVentas: (req, res) => {
    try {
      const connection = mysql.createConnection(connectionObject);
      const query = `
        SELECT 
          vp.* , GROUP_CONCAT(ip.img_ruta) AS imagenes
        FROM venta_publicaciones vp
        LEFT JOIN imagenes_publicacion ip
        ON vp.id_publicacion_venta = ip.fk_publicacion_venta
        GROUP BY vp.id_publicacion_venta
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

getVenta: (req, res) => {
  const { id } = req.params;
  let query = `
      SELECT 
          vp.* , GROUP_CONCAT(ip.img_ruta) AS imagenes
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

};
