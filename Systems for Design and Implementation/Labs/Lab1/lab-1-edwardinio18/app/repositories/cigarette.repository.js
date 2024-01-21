const Cigarette = require("../models/cigarette.model.js")

var cigarettes = []

module.exports = {
    gen: function () {
        cigarettes = []

        let c1 = new Cigarette(1, "Sobranie Blue", 25, "Sobranie", "Russia", "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg")
        let c2 = new Cigarette(2, "Winston Caster", 20, "Winston", "USA", "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg")
        let c3 = new Cigarette(3, "Marlboro Red", 21, "Marlboro", "USA", "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg")
        let c4 = new Cigarette(4, "L&M", 22, "L&M", "USA", "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg")
        let c5 = new Cigarette(5, "Kent", 23, "Kent", "USA", "https://www.cigarettesshop.net/images/2018/11/13/20181113100001-1.jpg")

        cigarettes.push(c1)
        cigarettes.push(c2)
        cigarettes.push(c3)
        cigarettes.push(c4)
        cigarettes.push(c5)
    },

    get: function () {
        return cigarettes
    },

    create: function (id, name, price, brand, origin, photo) {
        let newCig = new Cigarette(id, name, price, brand, origin, photo)

        cigarettes.push(newCig)
    },

    update: function (id, name, price, brand, origin, photo) {
        let idx = cigarettes.findIndex(e => e.id == id)

        cigarettes[idx] = {
			...cigarettes[idx],
			name: name,
			price: price,
			brand: brand,
			origin: origin,
			photo: photo
		}
    },

    delete: function (newCigarettes) {
        cigarettes = newCigarettes
    }
}