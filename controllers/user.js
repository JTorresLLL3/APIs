module.exports = {
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