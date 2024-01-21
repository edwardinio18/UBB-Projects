const repo = require("../repositories/brand.repository.js")
const repoCig = require("../repositories/cigarette.repository.js")

const db = require("../database/brand.database.js")
const dbCig = require("../database/cigarette.database.js")

const Validator = require("../validators/validator.validators.js")
const validator = new Validator()

db.main()
db.count().then((val) => {
    if (val == 0) {
        repo.genBrands()
    }
})

module.exports = {
    getBrands: async function (_, res) {
        const result = await repo.getBrands()
        res.send({
            status: 1,
            msg: "Brands fetched successfully",
            data: result
        })
    },

    getIDBrands: async function (req, res) {
        var id = parseInt(req.params.id)

        var result = await repo.getBrands()
        result = result.filter(e => e.id == id)

        try {
            validator.validateArrLen(1, result)

            const childCigs = await dbCig.getByType("brand", id)
            result[0]["cigarettesData"] = { noCigs: childCigs.length, cigs: childCigs }

            res.send({
                status: 1,
                msg: "Brand fetched successfully",
                data: result
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    },

    createBrands: async function (req, res) {
        var brands = await repo.getBrands()
        var name = req.body.name
        var origin = req.body.origin
        var description = req.body.description
        var noCountries = req.body.noCountries
        var photo = req.body.photo

        var maxID = Math.max.apply(Math, brands.map(function (o) { return o.id })) + 1

        var dataName = await db.getByType("name", name)

        try {
            validator.validateArrLen(2, dataName)
            validator.validateFields([
                [name, "string"],
                [origin, "string"],
                [description, "string"],
                [noCountries, "number"],
                [photo, "string"]
            ])

            repo.createBrands(maxID, name, origin, description, noCountries, photo)
            res.send({
                status: 1,
                msg: "Brand created successfully"
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    },

    updateBrands: async function (req, res) {
        var id = parseInt(req.params.id)
        var name = req.body.name
        var origin = req.body.origin
        var description = req.body.description
        var noCountries = req.body.noCountries
        var photo = req.body.photo

        var dataName = await db.getByType("name", name)

        try {
            validator.validateArrLen(2, dataName)
            validator.validateFields([
                [name, "string"],
                [origin, "string"],
                [description, "string"],
                [noCountries, "number"],
                [photo, "string"]
            ])

            repo.updateBrands(id, name, origin, description, noCountries, photo)
            res.send({
                status: 1,
                msg: "Brand updated successfully"
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    },

    deleteBrands: async function (req, res) {
        var id = parseInt(req.params.id)
        var newBrands = await repo.getBrands()
        newBrands = newBrands.filter(e => e.id != id)

        var deletedBrand = await repo.getBrands()
        var dataId = await db.getByType("id", id)

        try {
            validator.validateArrLen(1, dataId)

            deletedBrand = deletedBrand.filter(e => e.id == id)[0]

            repo.deleteBrands(deletedBrand.id)
            res.send({
                status: 1,
                msg: "Brand deleted successfully"
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    },

    statBrands1: async function (req, res) {
        var result = await db.report1()

        if (req === undefined || res === undefined) {
            return result
        } else {
            res.send({
                status: 1,
                msg: "Brands stats fetched successfully",
                data: result
            })
        }
    },

    statBrands2: async function (req, res) {
        var result = await db.report2()

        if (req === undefined || res === undefined) {
            return result
        } else {
            res.send({
                status: 1,
                msg: "Brands stats fetched successfully",
                data: result
            })
        }
    },

    addManyCigs: async function (req, res) {
        var cigsDb = await repoCig.getCigs()
        var bid = parseInt(req.params.id)
        var cigs = req.body.cigs
        var cigObj = []

        var maxID = Math.max.apply(Math, cigsDb.map(function (o) { return o.id })) + 1

        for (var i = 0; i < cigs.length; i++) {
            cigObj.push({
                id: maxID,
                name: cigs[i].name,
                price: cigs[i].price,
                origin: cigs[i].origin,
                photo: cigs[i].photo,
                description: cigs[i].description,
                brand: bid
            })
            ++maxID
        }

        var dataId = await db.getByType("id", bid)

        try {
            validator.validateArrLen(1, dataId)
            validator.validateArrLen(1, cigObj)

            var validCigs = []

            for (var i = 0; i < cigObj.length; i++) {
                validator.validateFields([
                    [cigObj[i].name, "string"],
                    [cigObj[i].price, "number"],
                    [cigObj[i].origin, "string"],
                    [cigObj[i].photo, "string"],
                    [cigObj[i].description, "string"],
                    [cigObj[i].brand, "number"]
                ])

                var dataName = await dbCig.getByType("name", cigObj[i].name)

                try {
                    validator.validateArrLen(2, dataName)
                    validCigs.push(cigObj[i])
                } catch (err) {}
            }

            validator.validateArrLen(1, validCigs)

            repo.addManyCigs(validCigs)
            res.send({
                status: 1,
                msg: "Cigarettes added successfully"
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    }
}