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
        return await client.db("SDI").collection("People").find({}).project(projection).toArray()
    },

    add: async function (newPerson) {
        await client.db("SDI").collection("People").insertOne(newPerson)
    },

    update: async function (newPerson) {
        await client.db("SDI").collection("People").updateOne({ id: newPerson.id }, { $set: newPerson })
    },

    delete: async function (id) {
        await client.db("SDI").collection("People").deleteOne({ id: id })
    },

    count: async function () {
        return await client.db("SDI").collection("People").countDocuments()
    },

    getByType: async function (typeName, type) {
        const projection = { _id: 0 }
        var query = {}
        query[typeName] = type
        return await client.db("SDI").collection("People").find(query).project(projection).toArray()
    }
}