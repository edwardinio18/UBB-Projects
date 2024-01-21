const { MongoClient } = require("mongodb");
const cigaretteModel = require("../models/cigarette.model");

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
      .collection("Cigarettes")
      .find({})
      .project(projection);

    const results = await cursor
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const promises = results.map(async (cigarette) => {
      const count = await client
        .db("SDI")
        .collection("CigarettesPeople")
        .countDocuments({ cigarette: cigarette.id });
      cigarette.smokers = count;
      return cigarette;
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
      .collection("Cigarettes")
      .findOne({ id: id }, { projection: projection });
  },

  add: async function (newCig) {
    await client.db("SDI").collection("Cigarettes").insertOne(newCig);
  },

  update: async function (newCig) {
    await client
      .db("SDI")
      .collection("Cigarettes")
      .updateOne(
        { id: newCig.id },
        {
          $set: {
            name: newCig.name,
            price: newCig.price,
            origin: newCig.origin,
            photo: newCig.photo,
            description: newCig.description,
            brand: newCig.brand,
          },
        }
      );
  },

  delete: async function (id) {
    await client
      .db("SDI")
      .collection("CigarettesPeople")
      .deleteMany({ cigarette: id });
    await client.db("SDI").collection("Cigarettes").deleteOne({ id: id });
  },

  count: async function () {
    return await client.db("SDI").collection("Cigarettes").countDocuments();
  },

  getByType: async function (typeName, type) {
    const projection = { _id: 0 };
    var query = {};
    query[typeName] = type;
    return await client
      .db("SDI")
      .collection("Cigarettes")
      .find(query)
      .project(projection)
      .toArray();
  },

  updateMany: async function (id, cigs) {
    var result = [];

    await client
      .db("SDI")
      .collection("Cigarettes")
      .updateMany({ id: { $in: cigs } }, { $set: { brand: id } });

    const dbCigs = await this.getAll(-1, -1);
    dbCigs.results.forEach((cig) => {
      if (cigs.includes(cig.id)) {
        result.push(cig);
      }
    });

    return result;
  },

  addMany: async function (cigs) {
    await client.db("SDI").collection("Cigarettes").insertMany(cigs);
  },

  filter: async function (price, page, pageSize) {
    const projection = { _id: 0 };
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const results = await client
      .db("SDI")
      .collection("Cigarettes")
      .find({ price: { $gte: price } })
      .project(projection)
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalResults = await client
      .db("SDI")
      .collection("Cigarettes")
      .countDocuments({ price: { $gte: price } });
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageInfo = {
      currentPage: page,
      pageSize: pageSize,
      totalResults: totalResults,
      totalPages: totalPages,
    };

    return { results, pageInfo };
  },

  getMaxID: async function () {
    const projection = { _id: 0, id: 1 };
    const cursor = client
      .db("SDI")
      .collection("Cigarettes")
      .find({})
      .project(projection)
      .sort({ id: -1 })
      .limit(1);

    const results = await cursor.toArray();
    return results[0].id;
  },
};
