const Cigarette = require("../models/cigarette.model.js")
const db = require("../database/cigarette.database.js")

var cigarettes = []

module.exports = {
    genCigs: function () {
        cigarettes = []

        let c1 = new Cigarette(1, "Sobranie Blue", 25, "Russia", "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg", "Sobranie Blue is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.", 5)
        let c2 = new Cigarette(2, "Winston Caster", 20, "USA", "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg", "Winston Caster is a brand of cigarettes produced by R.J. Reynolds Tobacco Company. The brand was first introduced in 1954 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.", 3)
        let c3 = new Cigarette(3, "Marlboro Red", 21, "USA", "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg", "Marlboro Red is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.", 3)
        let c4 = new Cigarette(4, "L&M Blue Label Box", 22, "L&M", "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg", "L&M is a brand of cigarettes produced by R.J. Reynolds Tobacco Company. The brand was first introduced in 1954 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.", 2)
        let c5 = new Cigarette(5, "Kent Core Short", 23, "Kent", "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg", "Kent is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.", 6)

        cigarettes.push(c1)
        cigarettes.push(c2)
        cigarettes.push(c3)
        cigarettes.push(c4)
        cigarettes.push(c5)

        cigarettes.forEach(cig => {
            db.add(cig)
        })
    },

    getCigs: async function () {
        var dbCigs = await db.getAll()
        cigarettes = dbCigs
        return cigarettes
    },

    createCigs: function (id, name, price, origin, photo, description, brand) {
        let newCig = new Cigarette(id, name, price, origin, photo, description, brand)

        cigarettes.push(newCig)
        db.add(newCig)

        return newCig
    },

    updateCigs: function (id, name, price, origin, photo, description, brand) {
        let idx = cigarettes.findIndex(e => e.id == id)

        cigarettes[idx] = {
            id: parseInt(id),
			name: name,
			price: price,
			origin: origin,
			photo: photo,
            description: description,
            brand: brand
		}

        db.update(parseInt(id), cigarettes[idx])

        return cigarettes[idx]
    },

    deleteCigs: function (deletedID, newCigarettes) {
        cigarettes = newCigarettes
        db.delete(deletedID)
    }
}