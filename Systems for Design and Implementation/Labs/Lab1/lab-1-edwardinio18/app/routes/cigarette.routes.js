module.exports = (app) => {
    var controller = require("../controllers/cigarette.controller.js")

    controller.gen()

    app.post('/add', controller.create)

    app.get('/get', controller.get)

    app.put('/update/:id', controller.update)

    app.delete('/delete/:id', controller.delete)
}