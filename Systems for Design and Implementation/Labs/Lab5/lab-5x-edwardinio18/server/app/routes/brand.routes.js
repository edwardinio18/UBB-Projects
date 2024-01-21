module.exports = (app) => {
  const controller = require("../controllers/brand.controller.js");

  app.post("/add_brand", controller.createBrands, (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  });

  app.get("/get_brand", (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    controller.getBrands(req, res, page, pageSize);
  });

  app.put("/update_brand/:id", controller.updateBrands, (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  });

  app.delete("/delete_brand/:id", controller.deleteBrands, (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  });

  app.get("/get_brand/:id", controller.getIDBrands, (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  });

  app.get("/stats_brand", (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    controller.statBrands1(req, res, page, pageSize);
  });

  app.get("/stats_brand_2", (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    controller.statBrands2(req, res, page, pageSize);
  });

  app.post("/add_many/:id/cigs", controller.addManyCigs, (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  });
};
