module.exports = (app) => {
    const controller = require('../controllers/person.controller.js')

    app.post('/add_person', controller.createPeople)

    app.get('/get_people', controller.getPeople)

    app.put('/update_person/:id', controller.updatePeople)

    app.delete('/delete_person/:id', controller.deletePeople)

    app.get('/get_person/:id', controller.getIDPeople)
}