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
      .collection("Brands")
      .find({})
      .project(projection);

    const results = await cursor
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const promises = results.map(async (brand) => {
      const count = await client
        .db("SDI")
        .collection("Cigarettes")
        .countDocuments({ brand: brand.id });
      brand.noCigs = count;
      return brand;
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
      .collection("Brands")
      .findOne({ id: id }, { projection: projection });
  },

  add: async function (newBrand) {
    await client.db("SDI").collection("Brands").insertOne(newBrand);
  },

  update: async function (newBrand) {
    await client
      .db("SDI")
      .collection("Brands")
      .updateOne({ id: newBrand.id }, { $set: newBrand });
  },

  delete: async function (id) {
    await client.db("SDI").collection("Cigarettes").deleteMany({ brand: id });
    await client.db("SDI").collection("Brands").deleteOne({ id: id });
  },

  count: async function () {
    return await client.db("SDI").collection("Brands").countDocuments();
  },

  getByType: async function (typeName, type) {
    const projection = { _id: 0 };
    var query = {};
    query[typeName] = type;
    return await client
      .db("SDI")
      .collection("Brands")
      .find(query)
      .project(projection)
      .toArray();
  },

  report1: async function (page, pageSize) {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const data = client
      .db("SDI")
      .collection("Cigarettes")
      .aggregate(
        [
          {
            $group: {
              _id: "$brand",
              avgCigPrice: { $avg: "$price" },
            },
          },
          {
            $lookup: {
              from: "Brands",
              localField: "_id",
              foreignField: "id",
              as: "brand",
            },
          },
          {
            $match: {
              "brand.0": { $exists: true },
            },
          },
          {
            $project: {
              _id: 0,
              "brand.id": 1,
              "brand.name": 1,
              "brand.origin": 1,
              "brand.description": 1,
              "brand.noCountries": 1,
              "brand.photo": 1,
              avgCigPrice: 1,
            },
          },
          {
            $sort: {
              avgCigPrice: -1,
              "brand.name": -1,
            },
          },
        ],
        { allowDiskUse: true }
      );

    const brands = await data.skip(skip).limit(limit).toArray();

    var count = client
      .db("SDI")
      .collection("Cigarettes")
      .aggregate([
        {
          $group: {
            _id: "$brand",
          },
        },
        {
          $match: {
            _id: { $ne: null },
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

    count = await count.toArray();
    count = count[0].count;

    const totalPages = Math.ceil(count / pageSize);

    return {
      brands,
      pageInfo: {
        currentPage: page,
        totalPages,
        pageSize,
        totalResults: count,
      },
    };
  },

  report2: async function (page, pageSize) {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const pipeline = [
      {
        $group: {
          _id: "$brand",
          mostExpensive: { $max: "$price" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "Brands",
          localField: "_id",
          foreignField: "id",
          as: "brand",
        },
      },
      {
        $unwind: "$brand",
      },
      {
        $lookup: {
          from: "Cigarettes",
          localField: "_id",
          foreignField: "brand",
          as: "cigarette",
        },
      },
      { $unwind: "$cigarette" },
      { $match: { $expr: { $eq: ["$cigarette.price", "$mostExpensive"] } } },
      {
        $project: {
          _id: 0,
          "brand.id": 1,
          "brand.name": 1,
          mostExpensive: 1,
          count: 1,
          cigarette: 1,
        },
      },
    ];

    const data = client.db("SDI").collection("Cigarettes").aggregate(pipeline);

    const brands = await data.skip(skip).limit(limit).toArray();
    brands.sort((a, b) => {
      if (a.mostExpensive > b.mostExpensive) return -1;
    });

    var count = client
      .db("SDI")
      .collection("Cigarettes")
      .aggregate([
        {
          $group: {
            _id: "$brand",
          },
        },
        {
          $match: {
            _id: { $ne: null },
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

    count = await count.toArray();
    count = count[0].count;

    const totalPages = Math.ceil(count / pageSize);

    return {
      brands,
      pageInfo: {
        currentPage: page,
        totalPages,
        pageSize,
        totalResults: count,
      },
    };
  },

  getMaxID: async function () {
    const projection = { _id: 0, id: 1 };
    const cursor = client
      .db("SDI")
      .collection("Brands")
      .find({})
      .project(projection)
      .sort({ id: -1 })
      .limit(1);

    const results = await cursor.toArray();
    return results[0].id;
  },
};
