const repo = require("../repositories/brand.repository.js")

const db = require("../database/brand.database.js")
const dbCig = require("../database/cigarette.database.js")

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
        var id = req.params.id

        var result = await repo.getBrands()
        result = result.filter(e => e.id == id)
        const childCigs = await dbCig.getByType("brand", parseInt(id))
        result[0]["cigarettesData"] = {noCigs: childCigs.length, cigs: childCigs}

        if (result.length == 0) {
            res.send({
                status: 0,
                msg: "Brand not found"
            })
        } else {
            res.send({
                status: 1,
                msg: "Brand fetched successfully",
                data: result
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
        dataName = dataName.length
        
        if (name == "" || origin == "" || description == "" || noCountries == "" || photo == "" || 
            name == null || origin == null || description == null || noCountries == null || photo == null || dataName != 0) {
            res.send({
                status: 0,
                msg: "Brand already exists or invalid data"
            })
        } else {
            repo.createBrands(maxID, name, origin, description, noCountries, photo)
            res.send({
                status: 1,
                msg: "Brand created successfully"
            })
        }
    },

    updateBrands: async function (req, res) {
        var id = req.params.id
        var name = req.body.name
        var origin = req.body.origin
        var description = req.body.description
        var noCountries = req.body.noCountries
        var photo = req.body.photo

        var dataName = await db.getByType("name", name)
        dataName = dataName.length

        if (name == "" || origin == "" || description == "" || noCountries == "" || photo == "" ||
            name == null || origin == null || description == null || noCountries == null || photo == null || dataName != 0) {
            res.send({
                status: 0,
                msg: "Brand already exists or invalid data"
            })
        } else {
            repo.updateBrands(id, name, origin, description, noCountries, photo)
            res.send({
                status: 1,
                msg: "Brand updated successfully"
            })
        }
    },

    deleteBrands: async function (req, res) {
        var id = req.params.id
        var newBrands = await repo.getBrands()
        newBrands = newBrands.filter(e => e.id != id)

        var deletedBrand = await repo.getBrands()
        deletedBrand = deletedBrand.filter(e => e.id == id)[0]

        var dataId = await db.getByType("id", parseInt(id))
        dataId = dataId.length

        if (dataId == 0) {
            res.send({
                status: 0,
                msg: "Brand doesn't exist"
            })
        } else {
            repo.deleteBrands(deletedBrand.id)
            res.send({
                status: 1,
                msg: "Brand deleted successfully"
            })
        }
    },

    statBrands1: async function (_, res) {
        var result = await db.report1()
        res.send({
            status: 1,
            msg: "Brands stats fetched successfully",
            data: result
        })
    },

    statBrands2: async function (_, res) {
        var result = await db.report2()
        res.send({
            status: 1,
            msg: "Brands stats fetched successfully",
            data: result
        })
    }
}