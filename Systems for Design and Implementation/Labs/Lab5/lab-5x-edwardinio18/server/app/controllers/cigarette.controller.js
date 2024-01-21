const repo = require("../repositories/cigarette.repository.js");
const repoBrands = require("../repositories/brand.repository.js");

const db = require("../database/cigarette.database.js");
const dbBrands = require("../database/brand.database.js");

const Validator = require("../validators/validator.validators.js");
const validator = new Validator();

db.main();
db.count().then((val) => {
  if (val == 0) {
    repo.genCigs();
  }
});

module.exports = {
  getCigs: async function (req, res, page, pageSize) {
    const result = await repo.getCigs(page, pageSize);
    res.send({
      status: 1,
      msg: "Cigarettes fetched successfully",
      data: result,
    });
  },

  getIDCigs: async function (req, res) {
    var id = req.params.id;

    try {
      validator.isNumeric(id);
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
      return;
    }

    id = parseInt(id);

    var result = await repo.getIDCigs(id);
    if (result == null) {
      res.send({
        status: 0,
        msg: "No data found",
      });
      return;
    }

    try {
      var brand = await dbBrands.getByType("id", result.brand);
      result["brandData"] = brand;

      res.send({
        status: 1,
        msg: "Cigarette fetched successfully",
        data: result,
      });
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
    }
  },

  createCigs: async function (req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var origin = req.body.origin;
    var photo = req.body.photo;
    var description = req.body.description;
    var brand = req.body.brand;

    try {
      validator.isNumeric(price);
      validator.isNumeric(brand);
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
      return;
    }

    price = parseInt(price);
    brand = parseInt(brand);

    const maxID = (await repo.getMaxID()) + 1;

    var dataName = await db.getByType("name", name);
    var dataBrand = await dbBrands.getByType("id", brand);

    try {
      validator.validateArrLen(2, dataName);
      validator.validateArrLen(1, dataBrand);
      validator.validateFields([
        [name, "string"],
        [price, "number"],
        [origin, "string"],
        [photo, "string"],
        [description, "string"],
        [brand, "number"],
      ]);

      repo.createCigs(maxID, name, price, origin, photo, description, brand);
      res.send({
        status: 1,
        msg: "Cigarette created successfully",
      });
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
    }
  },

  updateCigs: async function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var price = req.body.price;
    var origin = req.body.origin;
    var photo = req.body.photo;
    var description = req.body.description;
    var brand = req.body.brand;

    try {
      validator.isNumeric(id);
      validator.isNumeric(price);
      validator.isNumeric(brand);
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
      return;
    }

    id = parseInt(id);
    price = parseInt(price);
    brand = parseInt(brand);

    var dataName = await db.getByType("name", name);
    var dataBrand = await dbBrands.getByType("id", brand);
    var dataId = await db.getByType("id", id);

    try {
      validator.validateArrLen(2, dataName);
      validator.validateArrLen(1, dataBrand);
      validator.validateArrLen(1, dataId);
      validator.validateFields([
        [id, "number"],
        [name, "string"],
        [price, "number"],
        [origin, "string"],
        [photo, "string"],
        [description, "string"],
        [brand, "number"],
      ]);

      repo.updateCigs(id, name, price, origin, photo, description, brand);
      res.send({
        status: 1,
        msg: "Cigarette updated successfully",
      });
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
    }
  },

  deleteCigs: async function (req, res) {
    var id = req.params.id;

    try {
      validator.isNumeric(id);
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
      return;
    }

    id = parseInt(id);

    var dataId = await db.getByType("id", id);

    try {
      validator.validateArrLen(1, dataId);

      repo.deleteCigs(id);
      res.send({
        status: 1,
        msg: "Cigarette deleted successfully",
      });
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
    }
  },

  filterCigs: async function (req, res, page, pageSize) {
    var price;

    try {
      if (res === undefined) {
        price = parseInt(req);
      } else {
        price = parseInt(req.params.price);
      }
      if (price < 0) {
        throw new Error();
      }
    } catch (err) {
      if (res === undefined) {
        return {
          status: 0,
          msg: "No data found",
        };
      } else {
        res.send({
          status: 0,
          msg: "No data found",
        });
        return;
      }
    }

    var result = await repo.filter(price, page, pageSize);
    var cigarettes = result.cigarettes;
    var pageInfo = result.pageInfo;

    try {
      validator.validateArrLen(1, cigarettes);

      if (res === undefined) {
        return {
          status: 1,
          msg: "Cigarettes filtered successfully",
          data: {
            cigarettes: cigarettes,
            pageInfo: pageInfo,
          },
        };
      } else {
        res.send({
          status: 1,
          msg: "Cigarettes filtered successfully",
          data: {
            cigarettes: cigarettes,
            pageInfo: pageInfo,
          },
        });
      }
    } catch (err) {
      if (res === undefined) {
        return {
          status: 0,
          msg: err.message,
        };
      } else {
        res.send({
          status: 0,
          msg: err.message,
        });
      }
    }
  },

  updateBrandCigs: async function (req, res) {
    var id = req.params.id;
    const cigs = req.body.cigs;

    try {
      validator.isNumeric(id);
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
      return;
    }

    id = parseInt(id);

    const brand = await dbBrands.getByType("id", id);

    try {
      validator.validateArrLen(1, brand);
      validator.validateArrLen(1, cigs);
      validator.validateArrLen(3, cigs);

      const result = await repo.updateBrandCigsMany(id, cigs);
      res.send({
        status: 1,
        msg: "Cigarettes updated successfully",
        data: result,
      });
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
    }
  },
};
