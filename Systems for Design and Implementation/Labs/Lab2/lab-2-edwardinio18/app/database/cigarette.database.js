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
        return await client.db("SDI").collection("Cigarettes").find({}).toArray()
    },

    getByID: async function (id) {
        return await client.db("SDI").collection("Cigarettes").findOne({ id: id }).toArray()
    },

    add: async function (newCig) {
        await client.db("SDI").collection("Cigarettes").insertOne(newCig)
    },

    update: async function (id, newCig) {
        await client.db("SDI").collection("Cigarettes").updateOne({ id: id }, { $set: newCig })
    },

    delete: async function (id) {
        await client.db("SDI").collection("Cigarettes").deleteOne({ id: id })
    },

    count: async function () {
        return await client.db("SDI").collection("Cigarettes").countDocuments()
    },

    getByType: async function (typeName, type) {
        var query = {}
        query[typeName] = type
        return await client.db("SDI").collection("Cigarettes").find(query).toArray()
    }
}