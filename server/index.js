require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const UserRoutes = require("./routes/UserRoutes");
const ProgramRoutes = require("./routes/ProgramRoutes");
const SectorRoutes = require("./routes/SectorRoutes");
const NewsRoutes = require("./routes/NewsRoutes");
const StoriesRoutes = require("./routes/StoriesRoutes");
const JobsRoutes = require("./routes/JobsRoutes");
const TendersRoutes = require("./routes/TendersRoutes");
const PartnersRoutes = require("./routes/PartnersRoutes");
const MessageRoutes = require("./routes/MessageRoutes");
const BeneficiaryRoutes = require("./routes/BeneficiaryRoutes");
const OfficeRoutes = require("./routes/OfficeRoutes");

const User = require("./models/UserModel");

// express app
const app = express();
app.use(cors());

// middleware
app.use(express.json());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const allowedOrigins = [""];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  credentials: true, // Allow cookies or authorization headers
};

// routes
app.use("/api/user", UserRoutes);
app.use("/api/program", ProgramRoutes);
app.use("/api/sector", SectorRoutes);
app.use("/api/news", NewsRoutes);
app.use("/api/stories", StoriesRoutes);
app.use("/api/jobs", JobsRoutes);
app.use("/api/tenders", TendersRoutes);
app.use("/api/partners", PartnersRoutes);
app.use("/api/message", MessageRoutes);
app.use("/api/beneficiary", BeneficiaryRoutes);
app.use("/api/office", OfficeRoutes);

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
