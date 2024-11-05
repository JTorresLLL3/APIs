const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "AlbedoLLL3",
  database: "urhomeCUU2",
};
module.exports = {
  getPublicaciones: (req, res) => {
    let publicaciones = [];
    try {
      const connection = mysql.createConnection(connectionObject);
      connection.query("SELECT * FROM publicaciones", (err, results, fields) => {
        if (!err) {
          publicaciones = results;
          res.json(publicaciones);
        } else {
          res.json({ message: "Error al obtener las publicaciones" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error al obtener las publicaciones" });
    }
  },
    getPublicacion: (req, res) => {
    const { id } = req.params;
    let query = "SELECT * FROM publicaciones";
    let queryParams = [];
    if (id) {
        query += " WHERE id_publicacion = ?"; // Suponiendo que el campo del ID en la tabla es 'id_inmueble'
        queryParams.push(id);
    }
    try {
        const connection = mysql.createConnection(connectionObject);
        connection.query(query, queryParams, (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                res.status(500).json({ message: "Error al obtener las publicaciones" });
            }
            connection.end();
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error al obtener las publicaciones" });
    }
},
postPublicacion: (req, res) => {
  try {
      const {
          titulo_publicacion,
          descripcion_publicacion,
          estado_publicacion,
          fk_vendedor,
          fk_inmueble
      } = req.body;

      if (!titulo_publicacion || !descripcion_publicacion || estado_publicacion === undefined || 
          !fk_vendedor || !fk_inmueble) {
          return res.status(400).json({ 
              message: "Todos los campos son requeridos",
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
              message: "El título no puede exceder los 100 caracteres" 
          });
      }

      if (descripcion_publicacion.length > 250) {
          return res.status(400).json({ 
              message: "La descripción no puede exceder los 250 caracteres" 
          });
      }

      const connection = mysql.createConnection(connectionObject);

      const query = `
          INSERT INTO publicaciones (
              titulo_publicacion,
              descripcion_publicacion,
              fecha_publicacion,
              estado_publicacion,
              fk_vendedor,
              fk_inmueble
          ) VALUES (?, ?, NOW(), ?, ?, ?)
      `;

      const values = [
          titulo_publicacion,
          descripcion_publicacion,
          estado_publicacion,
          fk_vendedor,
          fk_inmueble
      ];

      connection.query(query, values, (err, results) => {
          if (err) {
              console.error("Error al guardar la publicación:", err);
              if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                  return res.status(400).json({ 
                      message: "El vendedor o inmueble especificado no existe" 
                  });
              }
              return res.status(500).json({ 
                  message: "Error al guardar la publicación" 
              });
          }

          res.status(201).json({ 
              message: "Publicación guardada exitosamente",
              id: results.insertId,
              fecha_publicacion: new Date()
          });
          
          connection.end();
      });
  } catch (e) {
      console.error("Error al procesar la publicación:", e);
      res.status(500).json({ 
          message: "Error interno del servidor al procesar la publicación" 
      });
  }
},

};
/*module.exports = {
    getPublicaciones: (req, res) => {
      const placeholder = [
        {
          vendedor_id: 1,
          inmueble_id: 4,
          img_src: "https://example.com/images/casa_amplia.jpg",
          descripcion: "Espaciosa casa en una zona residencial tranquila, ideal para familias.",
          fecha_publicacion: "2024-09-05 10:00:00",
          titulo: "Casa amplia en zona residencial",
        },
        {
          vendedor_id: 2,
          inmueble_id: 3,
          img_src: "https://example.com/images/departamento_moderno.jpg",
          descripcion: "Departamento moderno ubicado en el corazón de la ciudad, cerca de todos los servicios.",
          fecha_publicacion: "2024-09-04 10:00:00",
          titulo: "Departamento moderno en el centro",
        },
        {
          vendedor_id: 3,
          inmueble_id: 2,
          img_src: "https://example.com/images/local_comercial.jpg",
          descripcion: "Local comercial en una zona de alto tráfico, perfecto para cualquier tipo de negocio.",
          fecha_publicacion: "2024-09-03 10:00:00",
          titulo: "Local comercial en zona de alto tráfico",
        },
        {
          vendedor_id: 4,
          inmueble_id: 5,
          img_src: "https://example.com/images/terreno_urbano.jpg",
          descripcion: "Terreno amplio en una excelente ubicación para desarrollo urbano.",
          fecha_publicacion: "2024-09-02 10:00:00",
          titulo: "Terreno ideal para desarrollo urbano",
        },
        {
          vendedor_id: 5,
          inmueble_id: 1,
          img_src: "https://example.com/images/casa_amplia_2.jpg",
          descripcion: "Casa espaciosa, con gran jardín y áreas comunes para disfrutar en familia.",
          fecha_publicacion: "2024-09-01 10:00:00",
          titulo: "Casa amplia",
        },
        {
          vendedor_id: 6,
          inmueble_id: 4,
          img_src: "https://example.com/images/penthouse_mar.jpg",
          descripcion: "Penthouse de lujo con vista al mar y acabados de primera, ideal para vivir de vacaciones.",
          fecha_publicacion: "2024-09-06 10:00:00",
          titulo: "Penthouse con vista al mar",
        },
        {
          vendedor_id: 7,
          inmueble_id: 3,
          img_src: "https://example.com/images/rancho_establo.jpg",
          descripcion: "Hermoso rancho con establo, lago privado y amplio terreno, perfecto para descansar.",
          fecha_publicacion: "2024-09-07 10:00:00",
          titulo: "Rancho con establo y lago privado",
        },
        {
          vendedor_id: 8,
          inmueble_id: 5,
          img_src: "https://example.com/images/oficina_corporativa.jpg",
          descripcion: "Oficina en edificio corporativo, con todas las comodidades para empresas y negocios.",
          fecha_publicacion: "2024-09-08 10:00:00",
          titulo: "Oficina en edificio corporativo",
        },
        {
          vendedor_id: 9,
          inmueble_id: 2,
          img_src: "https://example.com/images/apartamento_lujo.jpg",
          descripcion: "Apartamento de lujo con excelente ubicación y detalles modernos.",
          fecha_publicacion: "2024-09-09 10:00:00",
          titulo: "Apartamento de lujo",
        },
        {
          vendedor_id: 10,
          inmueble_id: 1,
          img_src: "https://example.com/images/terreno_rustico.jpg",
          descripcion: "Terreno rústico en las afueras, ideal para proyectos de campo o desarrollo personal.",
          fecha_publicacion: "2024-09-10 10:00:00",
          titulo: "Terreno rústico en las afueras",
        }
      ];
      res.json(placeholder);
    },
    getPublicacion: (req, res) => {
      const id = req.params.id;
      const publicaciones = {
        "1": {
          id: 1,
          vendedor_id: 1,
          inmueble_id: 4,
          img_src: "https://example.com/images/casa_amplia.jpg",
          descripcion: "Espaciosa casa en una zona residencial tranquila, ideal para familias.",
          fecha_publicacion: "2024-09-05 10:00:00",
          titulo: "Casa amplia en zona residencial",
        },
        "2": {
          id: 2,
          vendedor_id: 2,
          inmueble_id: 3,
          img_src: "https://example.com/images/departamento_moderno.jpg",
          descripcion: "Departamento moderno ubicado en el corazón de la ciudad, cerca de todos los servicios.",
          fecha_publicacion: "2024-09-04 10:00:00",
          titulo: "Departamento moderno en el centro",
        },
        "3": {
          id: 3,
          vendedor_id: 3,
          inmueble_id: 2,
          img_src: "https://example.com/images/local_comercial.jpg",
          descripcion: "Local comercial en una zona de alto tráfico, perfecto para cualquier tipo de negocio.",
          fecha_publicacion: "2024-09-03 10:00:00",
          titulo: "Local comercial en zona de alto tráfico",
        },
        "4": {
          id: 4,
          vendedor_id: 4,
          inmueble_id: 5,
          img_src: "https://example.com/images/terreno_urbano.jpg",
          descripcion: "Terreno amplio en una excelente ubicación para desarrollo urbano.",
          fecha_publicacion: "2024-09-02 10:00:00",
          titulo: "Terreno ideal para desarrollo urbano",
        },
        "5": {
          id: 5,
          vendedor_id: 5,
          inmueble_id: 1,
          img_src: "https://example.com/images/casa_amplia_2.jpg",
          descripcion: "Casa espaciosa, con gran jardín y áreas comunes para disfrutar en familia.",
          fecha_publicacion: "2024-09-01 10:00:00",
          titulo: "Casa amplia",
        },
        "6": {
          id: 6,
          vendedor_id: 6,
          inmueble_id: 4,
          img_src: "https://example.com/images/penthouse_mar.jpg",
          descripcion: "Penthouse de lujo con vista al mar y acabados de primera, ideal para vivir de vacaciones.",
          fecha_publicacion: "2024-09-06 10:00:00",
          titulo: "Penthouse con vista al mar",
        },
        "7": {
          id: 7,
          vendedor_id: 7,
          inmueble_id: 3,
          img_src: "https://example.com/images/rancho_establo.jpg",
          descripcion: "Hermoso rancho con establo, lago privado y amplio terreno, perfecto para descansar.",
          fecha_publicacion: "2024-09-07 10:00:00",
          titulo: "Rancho con establo y lago privado",
        },
        "8": {
          id: 8,
          vendedor_id: 8,
          inmueble_id: 5,
          img_src: "https://example.com/images/oficina_corporativa.jpg",
          descripcion: "Oficina en edificio corporativo, con todas las comodidades para empresas y negocios.",
          fecha_publicacion: "2024-09-08 10:00:00",
          titulo: "Oficina en edificio corporativo",
        },
        "9": {
          id: 9,
          vendedor_id: 9,
          inmueble_id: 2,
          img_src: "https://example.com/images/apartamento_lujo.jpg",
          descripcion: "Apartamento de lujo con excelente ubicación y detalles modernos.",
          fecha_publicacion: "2024-09-09 10:00:00",
          titulo: "Apartamento de lujo",
        },
        "10": {
          id: 10,
          vendedor_id: 10,
          inmueble_id: 1,
          img_src: "https://example.com/images/terreno_rustico.jpg",
          descripcion: "Terreno rústico en las afueras, ideal para proyectos de campo o desarrollo personal.",
          fecha_publicacion: "2024-09-10 10:00:00",
          titulo: "Terreno rústico en las afueras",
        }
      };
  
      if (publicaciones[id]) {
        res.json(publicaciones[id]);
      } else {
        res.status(404).json({ mensaje: "Publicación no encontrada" });
      }
    },
    postPublicacion: (req, res) => {
      try {
        const { vendedor_id, img_src, descripcion, titulo } = req.body;
        console.log(vendedor_id, img_src, descripcion, titulo);
        res.status(201).json({ message: "Publicacion guardada" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error al guardar la publicacion" });
      }
    },
    area: 7,
  };
  */