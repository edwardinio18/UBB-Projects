const express = require("express")
const app = express()
app.use(express.json())

require("./app/routes/cigarette.routes.js")(app)

app.listen(8080, () => {
	console.log("Server is running on port 8080")
})