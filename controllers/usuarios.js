const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "AlbedoLLL3",
  database: "urhomeCUU2",
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
  const { id } = req.params; // Cambia a 'id' si estás usando /usuarios/:id/favoritos
  const query = `
    SELECT p.*
    FROM favoritos f
    JOIN publicaciones p ON f.fk_publicacion = p.id_publicacion
    WHERE f.fk_usuario = ?
  `;
  
  try {
    const connection = mysql.createConnection(connectionObject);
    connection.query(query, [id], (err, results, fields) => {
      if (!err) {
        console.log("Resultados de favoritos:", results); // Verifica si hay datos en results
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

};
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