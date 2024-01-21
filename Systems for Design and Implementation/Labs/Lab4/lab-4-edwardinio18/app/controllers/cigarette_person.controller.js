const repo = require("../repositories/cigarette_person.repository.js")
const repoCig = require("../repositories/cigarette.repository.js")
const repoPerson = require("../repositories/person.repository.js")

const db = require("../database/cigarette_person.database.js")
const dbCig = require("../database/cigarette.database.js")
const dbPerson = require("../database/person.database.js")

const Validator = require("../validators/validator.validators.js")
const validator = new Validator()

db.main()
db.count().then((val) => {
    if (val == 0) {
        repo.genCigPeople()
    }
})

module.exports = {
    getCigPeople: async function (_, res) {
        var result = await repo.getCigPeople()
        res.send({
            status: 1,
            msg: "Cigarette-person fetched successfully",
            data: result
        })
    },

    getIDCigPeople: async function (req, res) {
        var cid = parseInt(req.params.cid)
        var pid = parseInt(req.params.pid)

        var result = await repo.getCigPeople()
        result = result.filter((e) => {
            return e.cigarette == cid && e.person == pid
        })

        try {
            validator.validateArrLen(1, result)

            res.send({
                status: 1,
                msg: "Cigarette-person fetched successfully",
                data: result
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    },

    createCigPeople: async function (req, res) {
        var cid = parseInt(req.body.cigarette)
        var pid = parseInt(req.body.person)

        var dataCigPerson = await db.getBy2Types("cigarette", cid, "person", pid)

        try {
            validator.validateArrLen(2, dataCigPerson)
            validator.validateFields([[cid, "number"], [pid, "number"]])

            repo.createCigPeople(cid, pid)
            res.send({
                status: 1,
                msg: "Cigarette-person created successfully"
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    },

    updateCigPeople: async function (req, res) {
        var cid = parseInt(req.params.cid)
        var pid = parseInt(req.params.pid)

        var cigId = parseInt(req.body.cigarette)
        var personId = parseInt(req.body.person)

        var dataCigPerson = await db.getBy2Types("cigarette", cid, "person", pid)
        var newDataCig = await db.getBy2Types("cigarette", cigId, "person", personId)

        try {
            validator.validateArrLen(1, dataCigPerson)
            validator.validateArrLen(2, newDataCig)
            validator.validateFields([[cid, "number"], [pid, "number"]])
            validator.validateFields([[cigId, "number"], [personId, "number"]])

            repo.updateCigPeople(cid, pid, cigId, personId)
            res.send({
                status: 1,
                msg: "Cigarette-person updated successfully"
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    },

    deleteCigPeople: async function (req, res) {
        var cid = parseInt(req.params.cid)
        var pid = parseInt(req.params.pid)

        var dataCigPerson = await db.getBy2Types("cigarette", cid, "person", pid)

        try {
            validator.validateArrLen(1, dataCigPerson)
            validator.validateFields([[cid, "number"], [pid, "number"]])

            repo.deleteCigPeople(cid, pid)
            res.send({
                status: 1,
                msg: "Cigarette-person deleted successfully"
            })
        } catch (err) {
            res.send({
                status: 0,
                msg: err.message
            })
        }
    }
}