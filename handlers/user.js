//functions to handle routes
module.exports = {
    //function to handle the /user route
    getUser: (req, res) => {
      res.send("GET /user");
    },
    //function to handle the POST /user route
    postUser: (req, res) => {
      const data = req.body;
      console.log(data);
      res.send("POSTED user:");
    },
  };
  