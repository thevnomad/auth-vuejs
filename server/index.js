const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");

const app = express();

// Config DB and Mongoose
mongoose.set("useCreateIndex", true);
mongoose.connect(
  config.database,
  { userNewUrlParser: true, useUnifiedTopology: true },
  () => {
    try {
      console.log("Database connected!");
    } catch (error) {
      console.log({ database_error: err });
    }
  }
);

// Registering CORS
app.use(cors());
// Config Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Config morgan
app.use(morgan("dev"));

// Root Route
app.get("/", (req, res) => {
  console.log("MEVN Stack");
});

const userRoutes = require("./api/user/route/user");
app.use("/user", userRoutes);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("The MEVN App Has Started!");
});
