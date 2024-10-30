module.exports = {
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