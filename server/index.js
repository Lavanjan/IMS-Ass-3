const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");

const ItemRoute = require("./src/routes/item.js");
const UserRoute = require("./src/routes/user.js");
const CalcRoutes = require("./src/routes/calc.js");

const app = express();
const server = http.createServer(app);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();
const PORT = process.env.PORT;
const CONNECTION = process.env.MONGO_URI;

mongoose
  .connect(CONNECTION)
  .then(() =>
    server.listen(PORT, () => console.log(`Listening at Port ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));

app.use("/item", ItemRoute);
app.use("/user", UserRoute);
app.use("/calc", CalcRoutes);
