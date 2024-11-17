const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "",
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
    telefono_usuario,
    check_usuario,
    check_usuario2
  } = req.body;

  const camposRequeridos = {
    nombre_usuario,
    apellidoP_usuario,
    apellidoM_usuario,
    email_usuario,
    contraseña_usuario,
    edad_usuario,
    telefono_usuario,
    check_usuario,
    check_usuario2
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
      telefono_usuario,
      check_usuario,
      check_usuario2
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nombre_usuario,
    apellidoP_usuario,
    apellidoM_usuario,
    email_usuario,
    contraseña_usuario,
    edad_usuario,
    telefono_usuario,
    check_usuario,
    check_usuario2
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
  const { nombre_usuario, apellidoP, apellidoM, correo_usuario, telefono_usuario, img_usuario_perfil } = req.body;

  const query = `
      UPDATE usuarios
      SET nombre_usuario = ?, apellidoP = ?, apellidoM = ?, telefono_usuario = ?, img_usuario_perfil = ?
      WHERE correo_usuario = ?
  `;
  
  try {
      const connection = mysql.createConnection(connectionObject);
      connection.query(query, [nombre_usuario, apellidoP, apellidoM, telefono_usuario, img_usuario_perfil, correo_usuario], (err, results) => {
          if (!err) {
              res.status(200).json({ message: 'Usuario actualizado exitosamente', data: results });
          } else {
              res.status(500).json({ message: 'Error al actualizar el usuario' });
          }
          connection.end();
      });
  } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
},
postPublicacion: (req, res) => {
  try {
      const {
          titulo_publicacion,
          descripcion_publicacion,
          estado_publicacion,
          tipo_inmueble,
          fk_vendedor,
          fk_inmueble
      } = req.body;

      if (!titulo_publicacion || !descripcion_publicacion || estado_publicacion === undefined || 
          !tipo_inmueble || !fk_vendedor || !fk_inmueble) {
          return res.status(400).json({ 
              message: "Todos los campos son requeridos",
              required_fields: [
                  "titulo_publicacion",
                  "descripcion_publicacion",
                  "estado_publicacion",
                  "tipo_inmueble",
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

      const validTypes = ['Casa', 'Departamento', 'Local', 'Terreno'];
      if (!validTypes.includes(tipo_inmueble)) {
          return res.status(400).json({ 
              message: "El tipo de inmueble es inválido. Debe ser uno de los siguientes: Casa, Departamento, Local, Terreno" 
          });
      }

      const connection = mysql.createConnection(connectionObject);

      const query = `
          INSERT INTO renta_publicaciones (
              titulo_publicacion,
              descripcion_publicacion,
              fecha_publicacion,
              estado_publicacion,
              tipo_inmueble,
              fk_vendedor,
              fk_inmueble
          ) VALUES (?, ?, NOW(), ?, ?, ?, ?)
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

//POST USUARIO: nombre_usuario, apellidoP, apellidoM, correo_usuario, contraseña_usuario
//PUT USUARIO: nombre_usuario, apellidoP, apellidoM, correo_usuario, telefono_usuario, img_usuario_perfil

/*module.exports = {
    getUser: (req, res) => {
      const id = req.params.id;
      const users = {
        "1": {
          id: 1,
          nombre: "Ernesto",
          apellidoP: "Salgado",
          apellidoM: "Dozal",
          email: "ernesto.salgado@mail.com",
          telefono: "555-1111-222",
          fecha_registro: "28/10/2024",
        },
        "2": {
          id: 2,
          nombre: "Valeria",
          apellidoP: "Mendoza",
          apellidoM: "Burciaga",
          email: "valeria.mendoza@mail.com",
          telefono: "555-3333-444",
          fecha_registro: "28/10/2024",
        },
        "3": {
          id: 3,
          nombre: "Javier",
          apellidoP: "Ortega",
          apellidoM: "Beltrán",
          email: "javier.ortega@mail.com",
          telefono: "555-5555-667",
          fecha_registro: "28/10/2024",
        },
        "4": {
          id: 4,
          nombre: "Lorena",
          apellidoP: "Fernández",
          apellidoM: "Villalobos",
          email: "lorena.villalobos@mail.com",
          telefono: "555-7777-888",
          fecha_registro: "28/10/2024",
        },
        "5": {
          id: 5,
          nombre: "Ricardo",
          apellidoP: "Domínguez",
          apellidoM: "Murga",
          email: "ricardo.dominguez@mail.com",
          telefono: "555-9999-000",
          fecha_registro: "28/10/2024",
        },
      };
  
      if (users[id]) {
        res.json(users[id]);
      } else {
        res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
    },
    getUsers: (req, res) => {
      const user = [
      {
        id: 1,
          nombre: "Ernesto",
          apellidoP: "Salgado",
          apellidoM: "Dozal",
          email: "ernesto.salgado@mail.com",
          telefono: "555-1111-222",
          fecha_registro: "28/10/2024",
      },
      {
        id: 2,
          nombre: "Valeria",
          apellidoP: "Mendoza",
          apellidoM: "Burciaga",
          email: "valeria.mendoza@mail.com",
          telefono: "555-3333-444",
          fecha_registro: "28/10/2024",
      },
      {
        id: 3,
        nombre: "Javier",
        apellidoP: "Ortega",
        apellidoM: "Beltrán",
        email: "javier.ortega@mail.com",
        telefono: "555-5555-667",
        fecha_registro: "28/10/2024",
      },
      {
        id: 4,
          nombre: "Lorena",
          apellidoP: "Fernández",
          apellidoM: "Villalobos",
          email: "lorena.villalobos@mail.com",
          telefono: "555-7777-888",
          fecha_registro: "28/10/2024",
      },
      {
        id: 5,
        nombre: "Ricardo",
        apellidoP: "Domínguez",
        apellidoM: "Murga",
        email: "ricardo.dominguez@mail.com",
        telefono: "555-9999-000",
        fecha_registro: "28/10/2024",
      }
      ];
      res.json(user);
    }
  };
  */