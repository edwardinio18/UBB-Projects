const { MongoClient } = require("mongodb")

const uri = 'mongodb+srv://iakab:Edwardalex01@iakab.pmottpa.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri)

module.exports = {
    main: async function () {
        try {
            await client.connect()
        } catch (e) {
            console.error(e)
        }
    },

    getAll: async function () {
        const projection = { _id: 0 }
        return await client.db("SDI").collection("Brands").find({}).project(projection).toArray()
    },

    add: async function (newBrand) {
        await client.db("SDI").collection("Brands").insertOne(newBrand)
    },

    update: async function (newBrand) {
        await client.db("SDI").collection("Brands").updateOne({ id: newBrand.id }, { $set: newBrand })
    },

    delete: async function (id) {
        await client.db("SDI").collection("Brands").deleteOne({ id: id })
    },

    count: async function () {
        return await client.db("SDI").collection("Brands").countDocuments()
    },

    getByType: async function (typeName, type) {
        const projection = { _id: 0 }
        var query = {}
        query[typeName] = type
        return await client.db("SDI").collection("Brands").find(query).project(projection).toArray()
    },

    report1: async function () {
        return await client.db("SDI").collection("Cigarettes").aggregate([
            {
                $lookup: {
                    from: "Brands",
                    localField: "brand",
                    foreignField: "id",
                    as: "brand"
                }
            },
            {
                $project: {
                    "brand": {
                        "$arrayElemAt": ["$brand", 0]
                    },
                    "cigarette": "$$ROOT"
                }
            },
            {
                $group: {
                    _id: "$brand.id",
                    brand: { $first: "$brand" },
                    avgCigPrice: { $avg: "$cigarette.price" }
                }
            },
            {
                $sort: {
                    avgCigPrice: -1,
                    "brand.name": -1
                }
            },
            {
                $addFields: {
                    "brand.avgCigPrice": "$avgCigPrice"
                }
            },
            {
                $replaceRoot: {
                    newRoot: "$brand"
                }
            }
        ]).project({ _id: 0 }).toArray()
    },

    report2: async function () {
        return await client.db("SDI").collection("Cigarettes").aggregate([
            {
                $lookup: {
                    from: "Brands",
                    localField: "brand",
                    foreignField: "id",
                    as: "brand"
                }
            },
            {
                $project: {
                    "brand": {
                        "$arrayElemAt": ["$brand", 0]
                    },
                    "cigarette": "$$ROOT"
                }
            },
            {
                $lookup: {
                    from: "CigarettesPeople",
                    localField: "cigarette.id",
                    foreignField: "cigarette",
                    as: "cigarettePeople"
                }
            },
            {
                $project: {
                    "brand": 1,
                    "cigarette": 1,
                    "cigarettePeople": {
                        "$size": "$cigarettePeople"
                    }
                }
            },
            {
                $group: {
                    _id: "$brand.id",
                    brand: { $first: "$brand" },
                    avgCigSmoked: { $avg: "$cigarettePeople" }
                }
            },
            {
                $sort: {
                    avgCigSmoked: 1,
                    "brand.noCountries": 1
                }
            },
            {
                $addFields: {
                    "brand.avgCigSmoked": "$avgCigSmoked"
                }
            },
            {
                $replaceRoot: {
                    newRoot: "$brand"
                }
            }
        ]).project({ _id: 0 }).toArray()
    }
}