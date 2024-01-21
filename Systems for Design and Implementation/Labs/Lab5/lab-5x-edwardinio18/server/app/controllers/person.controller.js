const repo = require("../repositories/person.repository.js");

const db = require("../database/person.database.js");

const Validator = require("../validators/validator.validators.js");
const validator = new Validator();

db.main();
db.count().then((val) => {
  if (val == 0) {
    repo.genPeople();
  }
});

module.exports = {
  getPeople: async function (req, res, page, pageSize) {
    const result = await repo.getPeople(page, pageSize);
    res.send({
      status: 1,
      msg: "People fetched successfully",
      data: result,
    });
  },

  getIDPeople: async function (req, res) {
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

    var result = await repo.getIDPeople(id);
    if (result == null) {
      res.send({
        status: 0,
        msg: "Person not found",
      });
      return;
    }

    try {
      res.send({
        status: 1,
        msg: "Person fetched successfully",
        data: result,
      });
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
    }
  },

  createPeople: async function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;

    try {
      validator.isNumeric(age);
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
      return;
    }

    age = parseInt(age);

    const maxID = (await repo.getMaxID()) + 1;

    var dataEmail = await db.getByType("email", email);
    var dataPhone = await db.getByType("phone", phone);

    try {
      validator.validateArrLen(2, dataEmail);
      validator.validateArrLen(2, dataPhone);
      validator.validateFields([
        [name, "string"],
        [age, "number"],
        [email, "string"],
        [phone, "string"],
        [address, "string"],
      ]);

      repo.createPeople(maxID, name, age, email, phone, address);
      res.send({
        status: 1,
        msg: "Person created successfully",
      });
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
    }
  },

  updatePeople: async function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;

    try {
      validator.isNumeric(id);
      validator.isNumeric(age);
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
      return;
    }

    id = parseInt(id);
    age = parseInt(age);

    var dataEmail = await db.getByType("email", email);
    var dataPhone = await db.getByType("phone", phone);

    try {
      validator.validateArrLen(2, dataEmail);
      validator.validateArrLen(2, dataPhone);
      validator.validateFields([
        [name, "string"],
        [age, "number"],
        [email, "string"],
        [phone, "string"],
        [address, "string"],
      ]);

      repo.updatePeople(id, name, age, email, phone, address);
      res.send({
        status: 1,
        msg: "Person updated successfully",
      });
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
    }
  },

  deletePeople: async function (req, res) {
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

      repo.deletePeople(id);
      res.send({
        status: 1,
        msg: "Person deleted successfully",
      });
    } catch (err) {
      res.send({
        status: 0,
        msg: err.message,
      });
    }
  },
};
