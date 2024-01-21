const express = require("express")
const app = express()
app.use(express.json())

require("./app/routes/cigarette.routes.js")(app)
require("./app/routes/brand.routes.js")(app)
require("./app/routes/person.routes.js")(app)
require("./app/routes/cigarette_person.routes.js")(app)

app.get('/', (_, res) => {
	res.json({ "msg": "Welcome to the CigAPI" })
})

app.listen(8080, () => {
	console.log("Server is running on port 8080")
})