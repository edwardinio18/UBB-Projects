module.exports = (app) => {
    const controller = require("../controllers/cigarette.controller.js")

    app.post('/add_cig', controller.createCigs)

    app.get('/get_cig', controller.getCigs)

    app.put('/update_cig/:id', controller.updateCigs)

    app.delete('/delete_cig/:id', controller.deleteCigs)

    app.get('/get_cig/:id', controller.getIDCigs)

    app.get('/filter/:price', controller.filterCigs)
}