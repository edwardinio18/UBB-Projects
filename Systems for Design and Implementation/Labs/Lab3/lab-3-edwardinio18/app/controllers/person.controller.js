const repo = require('../repositories/person.repository.js')
const db = require('../database/person.database.js')
const model = require('../models/person.model.js')

db.main()
db.count().then((val) => {
    if (val == 0) {
        repo.genPeople()
    }
})

module.exports = {
    getPeople: async function (_, res) {
        const result = await repo.getPeople()
        res.send({
            status: 1,
            msg: "People fetched successfully",
            data: result
        })
    },

    getIDPeople: async function (req, res) {
        var id = req.params.id

        var result = await repo.getPeople()
        result = result.filter(e => e.id == id)

        if (result.length == 0) {
            res.send({
                status: 0,
                msg: "Person not found"
            })
        } else {
            res.send({
                status: 1,
                msg: "Person fetched successfully",
                data: result
            })
        }
    },

    createPeople: async function (req, res) {
        var people = await repo.getPeople()
        var name = req.body.name
        var age = req.body.age
        var email = req.body.email
        var phone = req.body.phone
        var address = req.body.address

        var maxID = Math.max.apply(Math, people.map(function (o) { return o.id })) + 1

        var dataEmail = await db.getByType("email", email)
        dataEmail = dataEmail.length

        var dataPhone = await db.getByType("phone", phone)
        dataPhone = dataPhone.length

        if (name == "" || age == "" || email == "" || phone == "" || address == "" ||
        name == null || age == null || email == null || phone == null || address == null ||
        dataEmail != 0 || dataPhone != 0) {
            res.send({
                status: 0,
                msg: "Person already exists or invalid data"
            })
        } else {
            repo.createPeople(maxID, name, age, email, phone, address)
            res.send({
                status: 1,
                msg: "Person created successfully"
            })
        }
    },

    updatePeople: async function (req, res) {
        var id = req.params.id
        var name = req.body.name
        var age = req.body.age
        var email = req.body.email
        var phone = req.body.phone
        var address = req.body.address

        var dataEmail = await db.getByType("email", email)
        dataEmail = dataEmail.length

        var dataPhone = await db.getByType("phone", phone)
        dataPhone = dataPhone.length

        if (name == "" || age == "" || email == "" || phone == "" || address == "" ||
        name == null || age == null || email == null || phone == null || address == null ||
        dataEmail != 0 || dataPhone != 0) {
            res.send({
                status: 0,
                msg: "Person already exists or invalid data"
            })
        } else {
            repo.updatePeople(id, name, age, email, phone, address)
            res.send({
                status: 1,
                msg: "Person updated successfully"
            })
        }
    },

    deletePeople: async function (req, res) {
        var id = req.params.id
        var newPeople = await repo.getPeople()
        newPeople = newPeople.filter(e => e.id != id)

        var deletedPerson = await repo.getPeople()
        deletedPerson = deletedPerson.filter(e => e.id == id)[0]

        var dataId = await db.getByType("id", parseInt(id))
        dataId = dataId.length

        if (dataId == 0) {
            res.send({
                status: 0,
                msg: "Person doesn't exist",
            })
        } else {
            repo.deletePeople(deletedPerson.id)
            res.send({
                status: 1,
                msg: "Person deleted successfully"
            })
        }
    }
}