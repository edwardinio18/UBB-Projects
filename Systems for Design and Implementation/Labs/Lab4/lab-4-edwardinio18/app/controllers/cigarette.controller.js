const repo = require("../repositories/cigarette.repository.js")
const repoBrands = require("../repositories/brand.repository.js")

const db = require("../database/cigarette.database.js")
const dbBrands = require("../database/brand.database.js")

const Validator = require("../validators/validator.validators.js")
const validator = new Validator()

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
        var id = parseInt(req.params.id)
        
        var result = await repo.getCigs()
        result = result.filter(e => e.id == id)

        try {
            validator.validateArrLen(1, result)

            var brand = await dbBrands.getByType("id", result[0].brand)
            result[0]["brandData"] = brand

            res.send({
                status: 1,
                msg: "Cigarette fetched successfully",
                data: result
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    },

    createCigs: async function (req, res) {
        var cigs = await repo.getCigs()
        var name = req.body.name
        var price = parseInt(req.body.price)
        var origin = req.body.origin
        var photo = req.body.photo
        var description = req.body.description
        var brand = parseInt(req.body.brand)

        var maxID = Math.max.apply(Math, cigs.map(function (o) { return o.id })) + 1

        var dataName = await db.getByType("name", name)

        try {
            validator.validateArrLen(2, dataName)
            validator.validateFields([[name, "string"], [price, "number"], [origin, "string"], [photo, "string"], [description, "string"], [brand, "number"]])

            repo.createCigs(maxID, name, price, origin, photo, description, brand)
            res.send({
                status: 1,
                msg: "Cigarette created successfully"
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    },

    updateCigs: async function (req, res) {
        var id = parseInt(req.params.id)
        var name = req.body.name
        var price = parseInt(req.body.price)
        var origin = req.body.origin
        var photo = req.body.photo
        var description = req.body.description
        var brand = parseInt(req.body.brand)

        var dataName = await db.getByType("name", name)
        var dataBrand = await dbBrands.getByType("id", brand)

        try {
            validator.validateArrLen(2, dataName)
            validator.validateArrLen(1, dataBrand)
            validator.validateFields([[name, "string"], [price, "number"], [origin, "string"], [photo, "string"], [description, "string"], [brand, "number"]])

            repo.updateCigs(id, name, price, origin, photo, description, brand)
            res.send({
                status: 1,
                msg: "Cigarette updated successfully"
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    },

    deleteCigs: async function (req, res) {
        var id = parseInt(req.params.id)
        var newCigs = await repo.getCigs()
        newCigs = newCigs.filter(e => e.id != id)

        var deletedCig = await repo.getCigs()
        var dataId = await db.getByType("id", parseInt(id))

        try {
            validator.validateArrLen(1, dataId)

            deletedCig = deletedCig.filter(e => e.id == id)[0]

            repo.deleteCigs(deletedCig.id)
            res.send({
                status: 1,
                msg: "Cigarette deleted successfully"
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    },

    filterCigs: async function (req, res) {
        var price

        if (res === undefined) {
            price = parseInt(req)
        } else {
            price = parseInt(req.params.price)
        }

        var result = await repo.getCigs()
        result = result.filter(e => e.price > price)

        if (res === undefined) {
            return result
        } else {
            res.send({
                status: 1,
                msg: "Cigarettes filtered successfully",
                data: result
            })
        }
    },

    updateBrandCigs: async function (req, res) {
        const id = parseInt(req.params.id)
        const cigs = req.body.cigs

        const brand = await dbBrands.getByType("id", id)

        try {
            validator.validateArrLen(1, brand)
            validator.validateArrLen(1, cigs)

            const result = await repo.updateBrandCigsMany(id, cigs)
            res.send({
                status: 1,
                msg: "Cigarettes updated successfully",
                data: result
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    }
}