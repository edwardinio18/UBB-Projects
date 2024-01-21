const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
swaggerDocument = require("./swagger.json");

require("dotenv").config({ path: ".env.development.local" });

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

require("./app/routes/cigarette.routes.js")(app);
require("./app/routes/brand.routes.js")(app);
require("./app/routes/person.routes.js")(app);
require("./app/routes/cigarette_person.routes.js")(app);

app.get("/", (_, res) => {
  res.redirect("/api");
});

app.get("/api", (_, res) => {
  // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  res.json({ msg: "Welcome to CigsAPI" });
});

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
  (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://cigs.onrender.com");
  }
);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
