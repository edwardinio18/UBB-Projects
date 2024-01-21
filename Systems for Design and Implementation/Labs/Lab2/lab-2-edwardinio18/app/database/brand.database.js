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
        return await client.db("SDI").collection("Brands").find({}).toArray()
    },

    add: async function (newBrand) {
        await client.db("SDI").collection("Brands").insertOne(newBrand)
    },

    update: async function (id, newBrand) {
        await client.db("SDI").collection("Brands").updateOne({ id: id }, { $set: newBrand })
    },

    delete: async function (id) {
        await client.db("SDI").collection("Brands").deleteOne({ id: id })
    },

    count: async function () {
        return await client.db("SDI").collection("Brands").countDocuments()
    },

    getByType: async function (typeName, type) {
        var query = {}
        query[typeName] = type
        return await client.db("SDI").collection("Brands").find(query).toArray()
    }
}