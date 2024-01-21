const CigarettePerson = require("../models/cigarette_person.model.js")
const db = require("../database/cigarette_person.database.js")

var cigPeople = []

module.exports = {
    genCigPeople: async function () {
        cigPeople = []

        let cp1 = new CigarettePerson({cigarette: 3, person: 1, createdAt: new Date(), updatedAt: new Date()})
        let cp2 = new CigarettePerson({cigarette: 6, person: 4, createdAt: new Date(), updatedAt: new Date()})
        let cp3 = new CigarettePerson({cigarette: 10, person: 8, createdAt: new Date(), updatedAt: new Date()})
        let cp4 = new CigarettePerson({cigarette: 5, person: 3, createdAt: new Date(), updatedAt: new Date()})
        let cp5 = new CigarettePerson({cigarette: 4, person: 2, createdAt: new Date(), updatedAt: new Date()})
        let cp6 = new CigarettePerson({cigarette: 2, person: 6, createdAt: new Date(), updatedAt: new Date()})
        let cp7 = new CigarettePerson({cigarette: 8, person: 9, createdAt: new Date(), updatedAt: new Date()})
        let cp8 = new CigarettePerson({cigarette: 9, person: 5, createdAt: new Date(), updatedAt: new Date()})
        let cp9 = new CigarettePerson({cigarette: 1, person: 7, createdAt: new Date(), updatedAt: new Date()})
        let cp10 = new CigarettePerson({cigarette: 7, person: 10, createdAt: new Date(), updatedAt: new Date()})

        cigPeople.push(cp1)
        cigPeople.push(cp2)
        cigPeople.push(cp3)
        cigPeople.push(cp4)
        cigPeople.push(cp5)
        cigPeople.push(cp6)
        cigPeople.push(cp7)
        cigPeople.push(cp8)
        cigPeople.push(cp9)
        cigPeople.push(cp10)

        cigPeople.forEach(cigper => {
            db.add(cigper)
        })
    },

    getCigPeople: async function () {
       var dbCigPeople = await db.getAll(-1, -1)
       cigPeople = dbCigPeople
       return cigPeople
    },

    createCigPeople: async function (cigarrete, person) {
        var dbCigPeople = await db.getAll(-1, -1)
        cigPeople = dbCigPeople

        let newCigPeople = new CigarettePerson({cigarette: cigarrete, person: person, createdAt: new Date(), updatedAt: new Date()})
        cigPeople.push(newCigPeople)
        db.add(newCigPeople)
    },

    updateCigPeople: async function (cid, pid, newCig, newPerson) {
        var dbCigPeople = await db.getAll(-1, -1)
        cigPeople = dbCigPeople


        let idx = cigPeople.findIndex((e) => {
            return e.cigarette == cid && e.person == pid
        })

        cigPeople[idx] = {
            cigarette: newCig,
            person: newPerson,
            createdAt: cigPeople[idx].createdAt,
            updatedAt: new Date()
        }

        db.update(cigPeople[idx])
    },

    deleteCigPeople: async function (cid, pid) {
        let idx = cigPeople.findIndex((e) => {
            return e.cigarette == cid && e.person == pid
        })

        cigPeople = cigPeople.splice(idx, 1)
        db.delete(cid, pid)

        var dbCigPeople = await db.getAll(-1, -1)
        cigPeople = dbCigPeople
    }
}