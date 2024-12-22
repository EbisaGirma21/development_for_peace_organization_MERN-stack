require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserRoutes = require("./routes/UserRoutes");
const ProgramRoutes = require("./routes/ProgramRoutes");
const NewsRoutes = require("./routes/NewsRoutes");
const StoriesRoutes = require("./routes/StoriesRoutes");
const JobsRoutes = require("./routes/JobsRoutes");
const TendersRoutes = require("./routes/TendersRoutes");

const User = require("./models/UserModel");

// express app
const app = express();
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", UserRoutes);
app.use("/api/program", ProgramRoutes);
app.use("/api/news", NewsRoutes);
app.use("/api/stories", StoriesRoutes);
app.use("/api/jobs", JobsRoutes);
app.use("/api/tenders", TendersRoutes);

// MONGOOSE CONFIGURATION
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("connected to database");
    await User.initSuperAdmin();
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
