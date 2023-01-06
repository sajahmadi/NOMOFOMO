const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("./models");
const authRoute = require("./routes/auth-route");
const eventRoute = require("./routes/event-route");

const app = express();

// PORT configuration
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(express.static(path.join(__dirname, "build")));
app.use("/api/auth", authRoute);
app.use("/api/dashboard", eventRoute);

const connectDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
