var repo = require("../repositories/cigarette.repository.js")

module.exports = {
    get: function (_, res) {
        res.send({
            success: 1,
            msg: "Cigarettes fetched successfully",
            data: repo.get()
        })
    },

    gen: function (_, _) {
        repo.gen()
    },

    create: function (req, res) {
        var id = repo.get().length + 1
        var name = req.body.name
        var price = req.body.price
        var brand = req.body.brand
        var origin = req.body.origin
        var photo = req.body.photo

        repo.create(id, name, price, brand, origin, photo)

        res.send({
            success: 1,
            msg: "Cigarette added successfully"
        })
    },

    update: function (req, res) {
        var id = req.params.id
        var name = req.body.name
        var price = req.body.price
        var brand = req.body.brand
        var origin = req.body.origin
        var photo = req.body.photo

        if (name) {
            repo.update(id, name, price, brand, origin, photo)

            res.send({
                success: 1,
                msg: "Cigarette updated successfully"
            })
        }
    },

    delete: function (req, res) {
        var id = req.params.id
        var newCigarettes = repo.get().filter(e => e.id != id)

        repo.delete(newCigarettes)

        res.send({
            success: 1,
            msg: "Cigarette deleted successfully"
        })
    }
}