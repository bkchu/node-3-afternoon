const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Middleware
const checkForSession = require("./middlewares/checkForSession");

// Controllers
const swagCtrl = require("./controllers/swag_controller");
const authCtrl = require("./controllers/auth_controller");
const cartCtrl = require("./controllers/cart_controller");
const searchCtrl = require("./controllers/search_controller");

const app = express();

app.use(express.static(path.join(__dirname, "../build")));

app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);

// Swag
app.get("/api/swag", swagCtrl.getSwag);

// Auth
app.post("/api/login", authCtrl.login);
app.post("/api/register", authCtrl.register);
app.post("/api/signout", authCtrl.signout);
app.get("/api/user", authCtrl.getUser);

// Cart
app.post("/api/cart", cartCtrl.add);
app.post("/api/cart/checkout", cartCtrl.checkout);
app.delete("/api/cart", cartCtrl.delete);

// search
app.get("/api/search", searchCtrl.search);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
