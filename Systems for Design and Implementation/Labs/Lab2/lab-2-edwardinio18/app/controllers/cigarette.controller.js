const repo = require("../repositories/cigarette.repository.js")
const db = require("../database/cigarette.database.js")

db.main()
db.count().then((val) => {
    if (val == 0) {
        repo.genCigs()
    }
})

module.exports = {
    getCigs: async function (_, res) {
        const result = await repo.getCigs()
        res.send({
            status: 1,
            msg: "Cigarettes fetched successfully",
            data: result
        })
    },

    getIDCigs: async function (req, res) {
        var id = req.params.id
        
        var result = await repo.getCigs()
        result = result.filter(e => e.id == id)

        if (result.length == 0) {
            res.send({
                status: 0,
                msg: "Cigarette not found",
                data: []
            })
        } else {
            res.send({
                status: 1,
                msg: "Cigarette fetched successfully",
                data: result
            })
        }
    },

    genCigs: function (_, _) {
        repo.genCigs()
    },

    createCigs: async function (req, res) {
        var cigs = await repo.getCigs()
        var name = req.body.name
        var price = req.body.price
        var origin = req.body.origin
        var photo = req.body.photo
        var description = req.body.description
        var brand = req.body.brand

        var maxID = Math.max.apply(Math, cigs.map(function (o) { return o.id; })) + 1

        dataName = await db.getByType("name", name)
        console.log(dataName)
        dataName = dataName.length

        if (name == "" || price == "" || origin == "" || photo == "" || description == "" || brand == "" ||
            name == null || price == null || origin == null || photo == null || description == null || brand == null || dataName != 0) {
            res.send({
                status: 0,
                msg: "Cigarete already exists or invalid data",
                data: []
            })
        } else {
            const newCig = repo.createCigs(maxID, name, price, origin, photo, description, brand)

            res.send({
                status: 1,
                msg: "Cigarette created successfully",
                data: newCig
            })
        }
    },

    updateCigs: async function (req, res) {
        var id = req.params.id
        var name = req.body.name
        var price = req.body.price
        var origin = req.body.origin
        var photo = req.body.photo
        var description = req.body.description
        var brand = req.body.brand

        var dataName = await db.getByType("name", name)
        dataName = dataName.length

        if (name == "" || price == "" || origin == "" || photo == "" || description == "" || brand == "" ||
            name == null || price == null || origin == null || photo == null || description == null || brand == null || dataName != 0) {
            res.send({
                status: 0,
                msg: "Cigarette already exists or invalid data",
                data: []
            })
        } else {
            const newCig = repo.updateCigs(id, name, price, origin, photo, description, brand)

            res.send({
                status: 1,
                msg: "Cigarette updated successfully",
                data: newCig
            })
        }
    },

    deleteCigs: async function (req, res) {
        var id = req.params.id
        var newCigs = await repo.getCigs()
        newCigs = newCigs.filter(e => e.id != id)

        var deletedCig = await repo.getCigs()
        deletedCig = deletedCig.filter(e => e.id == id)[0]

        var dataId = await db.getByType("id", parseInt(id))
        dataId = dataId.length

        if (dataId == 0) {
            res.send({
                status: 0,
                msg: "Cigarette not found",
                data: []
            })
        } else {
            repo.deleteCigs(deletedCig.id, newCigs)

            res.send({
                status: 1,
                msg: "Cigarette deleted successfully",
                data: deletedCig
            })
        }
    },

    filterCigs: async function (req, res) {
        var price = req.params.price

        var result = await repo.getCigs()
        result = result.filter(e => e.price > price)

        res.send({
            status: 1,
            msg: "Cigarettes filtered successfully",
            data: result
        })
    }
}