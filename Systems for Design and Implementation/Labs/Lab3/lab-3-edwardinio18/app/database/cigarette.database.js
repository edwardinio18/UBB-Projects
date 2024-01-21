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
        return await client.db("SDI").collection("Cigarettes").find({}).project(projection).toArray()
    },

    add: async function (newCig) {
        await client.db("SDI").collection("Cigarettes").insertOne(newCig)
    },

    update: async function (newCig) {
        await client.db("SDI").collection("Cigarettes").updateOne({ id: newCig.id }, { $set: newCig })
    },

    delete: async function (id) {
        await client.db("SDI").collection("Cigarettes").deleteOne({ id: id })
    },

    count: async function () {
        return await client.db("SDI").collection("Cigarettes").countDocuments()
    },

    getByType: async function (typeName, type) {
        const projection = { _id: 0 }
        var query = {}
        query[typeName] = type
        return await client.db("SDI").collection("Cigarettes").find(query).project(projection).toArray()
    },

    updateMany: async function (id, cigs) {
        var result = []

        await client.db("SDI").collection("Cigarettes").updateMany({ id: { $in: cigs } }, { $set: { brand: id } })

        const dbCigs = await this.getAll()
        dbCigs.forEach(cig => {
            if (cigs.includes(cig.id)) {
                result.push(cig)
            }
        })

        return result
    }
}