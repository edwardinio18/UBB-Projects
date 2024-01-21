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

  getAll: async function (page, pageSize) {
    const projection = { _id: 0 };
    const cursor = client
      .db("SDI")
      .collection("People")
      .find({})
      .project(projection);

    const results = await cursor
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const promises = results.map(async (person) => {
      const count = await client
        .db("SDI")
        .collection("CigarettesPeople")
        .countDocuments({ person: person.id });
      person.noCigs = count;
      return person;
    });

    const modifiedResults = await Promise.all(promises);
    const total = await this.count();

    return {
      results: modifiedResults,
      pageInfo: {
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
        pageSize,
        totalResults: total,
      },
    };
  },

  getByID: async function (id) {
    const projection = { _id: 0 };
    return client
      .db("SDI")
      .collection("People")
      .findOne({ id: id }, { projection: projection });
  },

  add: async function (newPerson) {
    await client.db("SDI").collection("People").insertOne(newPerson);
  },

  update: async function (newPerson) {
    await client
      .db("SDI")
      .collection("People")
      .updateOne({ id: newPerson.id }, { $set: newPerson });
  },

  delete: async function (id) {
    await client
      .db("SDI")
      .collection("CigarettesPeople")
      .deleteMany({ person: id });
    await client.db("SDI").collection("People").deleteOne({ id: id });
  },

  count: async function () {
    return await client.db("SDI").collection("People").countDocuments();
  },

  getByType: async function (typeName, type) {
    const projection = { _id: 0 };
    var query = {};
    query[typeName] = type;
    return await client
      .db("SDI")
      .collection("People")
      .find(query)
      .project(projection)
      .toArray();
  },

  getMaxID: async function () {
    const projection = { _id: 0, id: 1 };
    const cursor = client
      .db("SDI")
      .collection("People")
      .find({})
      .project(projection)
      .sort({ id: -1 })
      .limit(1);

    const results = await cursor.toArray();
    return results[0].id;
  },
};
