require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const employeeRoutes = require("./routes/employee.routes");

const app = express();

// middleware
app.use(cors());
app.use(helmet());

// access to body property of req object
app.use(express.json());

// routes
app.use("/api/v1", authRoutes);

// employee routing
app.use("/api/v1/employees", employeeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
