module.exports = (app) => {
    const controller = require('../controllers/person.controller.js')

    app.post('/add_person', controller.createPeople, (req, res) => {
        // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
    })

    app.get('/get_people', (req, res) => {
        // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 2
        controller.getPeople(req, res, page, pageSize)
    })

    app.put('/update_person/:id', controller.updatePeople, (req, res) => {
        // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
    })

    app.delete('/delete_person/:id', controller.deletePeople, (req, res) => {
        // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
    })

    app.get('/get_person/:id', controller.getIDPeople, (req, res) => {
        // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
    })
}