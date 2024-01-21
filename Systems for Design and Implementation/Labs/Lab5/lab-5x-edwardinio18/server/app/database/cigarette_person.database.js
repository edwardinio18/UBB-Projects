const { MongoClient } = require("mongodb");

const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";
const client = new MongoClient(uri);

module.exports = {
  main: async function () {
    try {
      await client.connect();
    } catch (e) {
      console.error(e);
    }
  },

  getAll: async function () {
    const projection = { _id: 0 };
    return await client
      .db("SDI")
      .collection("CigarettesPeople")
      .find({})
      .project(projection)
      .toArray();
  },

  add: async function (newCigPeople) {
    await client
      .db("SDI")
      .collection("CigarettesPeople")
      .insertOne(newCigPeople);
  },

  update: async function (newCigPeople) {
    await client
      .db("SDI")
      .collection("CigarettesPeople")
      .updateOne(
        { cigarette: newCigPeople.cigarette, person: newCigPeople.person },
        { $set: newCigPeople }
      );
  },

  delete: async function (cid, pid) {
    await client
      .db("SDI")
      .collection("CigarettesPeople")
      .deleteOne({ cigarette: cid, person: pid });
  },

  count: async function () {
    return await client
      .db("SDI")
      .collection("CigarettesPeople")
      .countDocuments();
  },

  getByType: async function (typeName, type) {
    const projection = { _id: 0 };
    var query = {};
    query[typeName] = type;
    return await client
      .db("SDI")
      .collection("CigarettesPeople")
      .find(query)
      .project(projection)
      .toArray();
  },

  getBy2Types: async function (typeName1, type1, typeName2, type2) {
    const projection = { _id: 0 };
    var query = {};
    query[typeName1] = type1;
    query[typeName2] = type2;
    return await client
      .db("SDI")
      .collection("CigarettesPeople")
      .find(query)
      .project(projection)
      .toArray();
  },
};
