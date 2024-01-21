module.exports = (app) => {
  const controller = require("../controllers/cigarette.controller.js");

  app.post("/add_cig", controller.createCigs, (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  });

  app.get("/get_cig", (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    controller.getCigs(req, res, page, pageSize);
  });

  app.put("/update_cig/:id", controller.updateCigs, (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  });

  app.delete("/delete_cig/:id", controller.deleteCigs, (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  });

  app.get("/get_cig/:id", controller.getIDCigs, (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  });

  app.get("/filter/:price", (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    controller.filterCigs(req, res, page, pageSize);
  });

  app.put("/brands/:id/cigs", controller.updateBrandCigs, (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  });
};
