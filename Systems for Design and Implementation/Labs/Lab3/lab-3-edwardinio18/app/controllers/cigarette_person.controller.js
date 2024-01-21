const repo = require("../repositories/cigarette_person.repository.js")
const repoCig = require("../repositories/cigarette.repository.js")
const repoPerson = require("../repositories/person.repository.js")

const db = require("../database/cigarette_person.database.js")
const dbCig = require("../database/cigarette.database.js")
const dbPerson = require("../database/person.database.js")

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
        var cid = req.params.cid
        var pid = req.params.pid

        var result = await repo.getCigPeople()
        result = result.filter((e) => {
            return e.cigarette == cid && e.person == pid
        })

        if (result.length == 0) {
            res.send({
                status: 0,
                msg: "Cigarette or person doesn't exist"
            })
        } else {
            res.send({
                status: 1,
                msg: "Cigarette-person fetched successfully",
                data: result
            })
        }
    },

    createCigPeople: async function (req, res) {
        var cid = req.body.cigarette
        var pid = req.body.person

        var dataCigPerson = await db.getBy2Types("cigarette", cid, "person", pid)

        if (cid = "" || pid == "" || cid == null || pid == null || dataCigPerson.length != 0) {
            res.send({
                status: 0,
                msg: "Cigarette-person exists or invalid data"
            })
        } else {
            cid = req.body.cigarette
            repo.createCigPeople(cid, pid)
            res.send({
                status: 1,
                msg: "Cigarette-person created successfully"
            })
        }
    },

    updateCigPeople: async function (req, res) {
        var cid = parseInt(req.params.cid)
        var pid = parseInt(req.params.pid)

        var cigId = req.body.cigarette
        var personId = req.body.person

        var dataCigPerson = await db.getBy2Types("cigarette", cid, "person", pid)
        dataCigPerson = dataCigPerson.length

        var newDataCig = await db.getBy2Types("cigarette", cigId, "person", personId)
        newDataCig = newDataCig.length

        if (dataCigPerson == 0 || newDataCig != 0) {
            res.send({
                status: 0,
                msg: "Cigarette-person exists or invalid data"
            })
        } else {
            repo.updateCigPeople(cid, pid, cigId, personId)
            res.send({
                status: 1,
                msg: "Cigarette-person updated successfully"
            })
        }
    },

    deleteCigPeople: async function (req, res) {
        var cid = parseInt(req.params.cid)
        var pid = parseInt(req.params.pid)

        var dataCigPerson = await db.getBy2Types("cigarette", cid, "person", pid)
        dataCigPerson = dataCigPerson.length

        if (dataCigPerson == 0) {
            res.send({
                status: 0,
                msg: "Cigarette-person doesn't exist"
            })
        } else {
            repo.deleteCigPeople(cid, pid)
            res.send({
                status: 1,
                msg: "Cigarette-person deleted successfully"
            })
        }
    }
}