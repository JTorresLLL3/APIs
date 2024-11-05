const mysql = require("mysql2");
const connectionObject = {
  host: "localhost",
  user: "root",
  password: "AlbedoLLL3",
  database: "urhomeCUU2",
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
/*postVendedor: (req, res) => {
  const { nombre_vendedor, apellidoP_vendedor, apellidoM_vendedor, email_vendedor, contraseña_vendedor } = req.body;

  const query = `
      INSERT INTO vendedores (nombre_vendedor, apellidoP_vendedor, apellidoM_vendedor, email_vendedor, contraseña_vendedor)
      VALUES (?, ?, ?, ?, ?)
  `;
  
  try {
      const connection = mysql.createConnection(connectionObject);
      connection.query(query, [nombre_vendedor, apellidoP_vendedor, apellidoM_vendedor, email_vendedor, contraseña_vendedor], (err, results) => {
          if (!err) {
              res.status(201).json({ message: 'Vendedor creado exitosamente', data: results });
          } else {
              res.status(500).json({ message: 'Error al crear el vendedor' });
          }
          connection.end();
      });
  } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Error al crear el vendedor' });
  }

},*/

};
/*module.exports = {
    getVendedor: (req, res) => {
      const id = req.params.id;
      const vendedor = {
        "1": {
          id: 1,
          nombre: "Carlos",
          apellidoP: "López",
          apellidoM: "Hernández",
          email: "carlos.lopez@mail.com",
          telefono: "555-1234-111",
          fecha_registro: "28/10/2024",
        },
        "2": {
          id: 2,
          nombre: "María",
          apellidoP: "García",
          apellidoM: "Martínez",
          email: "maria.garcia@mail.com",
          telefono: "555-5678-222",
          fecha_registro: "28/10/2024",
        },
        "3": {
          id: 3,
          nombre: "Juan",
          apellidoP: "Pérez",
          apellidoM: "Rodríguez",
          email: "juan.perez@mail.com",
          telefono: "555-9101-333",
          fecha_registro: "28/10/2024",
        },
        "4": {
          id: 4,
          nombre: "Ana",
          apellidoP: "Fernández",
          apellidoM: "Sánchez",
          email: "ana.fernandez@mail.com",
          telefono: "555-1122-444",
          fecha_registro: "28/10/2024",
        },
        "5": {
          id: 5,
          nombre: "José",
          apellidoP: "Ramírez",
          apellidoM: "Gómez",
          email: "jose.ramirez@mail.com",
          telefono: "555-3344-555",
          fecha_registro: "28/10/2024",
        },
      };
  
      if (vendedor[id]) {
        res.json(vendedor[id]);
      } else {
        res.status(404).json({ mensaje: "Vendedor no encontrado" });
      }
    },
    getVendedores: (req, res) => {
      const vendors = [
      {
        id: 1,
        nombre: "Carlos",
        apellidoP: "López",
        apellidoM: "Hernández",
        email: "carlos.lopez@mail.com",
        telefono: "555-1234-111",
        fecha_registro: "28/10/2024",
      },
      {
        id: 2,
        nombre: "María",
        apellidoP: "García",
        apellidoM: "Martínez",
        email: "maria.garcia@mail.com",
        telefono: "555-5678-222",
        fecha_registro: "28/10/2024",
      },
      {
        id: 3,
        nombre: "Juan",
        apellidoP: "Pérez",
        apellidoM: "Rodríguez",
        email: "juan.perez@mail.com",
        telefono: "555-9101-333",
        fecha_registro: "28/10/2024",
      },
      {
        id: 4,
        nombre: "Ana",
        apellidoP: "Fernández",
        apellidoM: "Sánchez",
        email: "ana.fernandez@mail.com",
        telefono: "555-1122-444",
        fecha_registro: "28/10/2024",
      },
      {
        id: 5,
        nombre: "José",
        apellidoP: "Ramírez",
        apellidoM: "Gómez",
        email: "jose.ramirez@mail.com",
        telefono: "555-3344-555",
        fecha_registro: "28/10/2024",
      }
      ];
      res.json(vendors);
    }
  };
  */