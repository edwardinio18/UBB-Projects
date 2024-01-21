module.exports = (app) => {
    const controller = require("../controllers/brand.controller.js")

    app.post('/add_brand', controller.createBrands)

    app.get('/get_brand', controller.getBrands)

    app.put('/update_brand/:id', controller.updateBrands)

    app.delete('/delete_brand/:id', controller.deleteBrands)

    app.get('/get_brand/:id', controller.getIDBrands)

    app.get('/stats_brand', controller.statBrands1)

    app.get('/stats_brand_2', controller.statBrands2)

    app.post('/add_many/:id/cigs', controller.addManyCigs)
}