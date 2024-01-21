const repo = require("../repositories/cigarette.repository.js")
const repoBrands = require("../repositories/brand.repository.js")

const db = require("../database/cigarette.database.js")
const dbBrands = require("../database/brand.database.js")

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
        var brand = await dbBrands.getByType("id", result[0].brand)
        result[0]["brandData"] = brand

        if (result.length == 0) {
            res.send({
                status: 0,
                msg: "Cigarette not found"
            })
        } else {
            res.send({
                status: 1,
                msg: "Cigarette fetched successfully",
                data: result
            })
        }
    },

    createCigs: async function (req, res) {
        var cigs = await repo.getCigs()
        var name = req.body.name
        var price = req.body.price
        var origin = req.body.origin
        var photo = req.body.photo
        var description = req.body.description
        var brand = req.body.brand

        var maxID = Math.max.apply(Math, cigs.map(function (o) { return o.id })) + 1

        var dataName = await db.getByType("name", name)
        dataName = dataName.length

        if (name == "" || price == "" || origin == "" || photo == "" || description == "" || brand == "" ||
            name == null || price == null || origin == null || photo == null || description == null || brand == null || dataName != 0) {
            res.send({
                status: 0,
                msg: "Cigarete already exists or invalid data"
            })
        } else {
            repo.createCigs(maxID, name, price, origin, photo, description, brand)
            res.send({
                status: 1,
                msg: "Cigarette created successfully"
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

        var dataBrand = await dbBrands.getByType("id", brand)
        dataBrand = dataBrand.length

        if (name == "" || price == "" || origin == "" || photo == "" || description == "" || brand == "" ||
            name == null || price == null || origin == null || photo == null || description == null || brand == null || dataName != 0 ||
            dataBrand != 0) {
            res.send({
                status: 0,
                msg: "Cigarette already exists or invalid data"
            })
        } else {
            repo.updateCigs(id, name, price, origin, photo, description, brand)
            res.send({
                status: 1,
                msg: "Cigarette updated successfully"
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
                msg: "Cigarette not found"
            })
        } else {
            repo.deleteCigs(deletedCig.id)
            res.send({
                status: 1,
                msg: "Cigarette deleted successfully"
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
    },

    updateBrandCigs: async function (req, res) {
        const id = req.params.id
        const cigs = req.body.cigs

        const brand = await dbBrands.getByType("id", parseInt(id))

        if (brand.length == 0 || cigs.length == 0) {
            res.send({
                status: 0,
                msg: "Brand or cigarettes not found or invalid data"
            })
        } else {
            const result = await repo.updateBrandCigsMany(parseInt(id), cigs)
            res.send({
                status: 1,
                msg: "Cigarettes updated successfully",
                data: result
            })
        }
    }
}