module.exports = (app) => {
    const controller = require("../controllers/cigarette_person.controller.js")

    app.post('/add_cig_person', controller.createCigPeople)

    app.get('/get_cig_person', controller.getCigPeople)

    app.put('/update_cig_person/:cid/:pid', controller.updateCigPeople)

    app.delete('/delete_cig_person/:cid/:pid', controller.deleteCigPeople)

    app.get('/get_cig_person/:cid/:pid', controller.getIDCigPeople)
}