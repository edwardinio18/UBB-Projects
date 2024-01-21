const Brand = require("../models/brand.model.js")
const db = require("../database/brand.database.js")

var brands = []

module.exports = {
    genBrands: async function () {
        brands = []

        let b1 = new Brand(1, "Sobranie", "Russia", "Sobranie is a brand of cigarettes produced by Imperial Tobacco in Russia. The brand was founded in 1879 by Pyotr A. Izmaylov, a Russian tobacco merchant, and was named after the Russian word for 'collection'.", 100, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sobranie_White_Russian.jpg/220px-Sobranie_White_Russian.jpg")
        let b2 = new Brand(2, "Winston", "USA", "Winston is a brand of cigarettes produced by R.J. Reynolds Tobacco Company. The brand was first introduced in 1954 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.", 65, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Winston.jpg/220px-Winston.jpg")
        let b3 = new Brand(3, "Marlboro", "USA", "Marlboro is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.", 80, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Marlboro.jpg/220px-Marlboro.jpg")
        let b4 = new Brand(4, "L&M", "USA", "L&M is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.", 75, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/L&M.jpg/220px-L&M.jpg")
        let b5 = new Brand(5, "Kent", "USA", "Kent is a brand of cigarettes produced by Imperial Tobacco in the United Kingdom. The brand was first introduced in 1902 and was the first cigarette brand to be advertised on television in 1955. The brand is currently owned by British American Tobacco.", 90, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kent.jpg/220px-Kent.jpg")

        brands.push(b1)
        brands.push(b2)
        brands.push(b3)
        brands.push(b4)
        brands.push(b5)

        brands.forEach(brand => {
            db.add(brand)
        })
    },

    getBrands: async function () {
        var dbBrands = await db.getAll()
        brands = dbBrands
        return brands
    },

    createBrands: function (id, name, origin, description, noCountries, photo) {
        let newBrand = new Brand(id, name, origin, description, noCountries, photo)

        brands.push(newBrand)
        db.add(newBrand)

        return newBrand
    },

    updateBrands: function (id, name, origin, description, noCountries, photo) {
        let idx = brands.findIndex(e => e.id == id)

        brands[idx] = {
            id: parseInt(id),
            name: name,
            origin: origin,
            description: description,
            noCountries: noCountries,
            photo: photo
		}

        db.update(parseInt(id), brands[idx])

        return brands[idx]
    },

    deleteBrands: function (deletedID, newBrands) {
        brands = newBrands
        db.delete(deletedID)
    }
}