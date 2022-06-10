const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/stores", require("./routes/storeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is listening on PORT ${port}`));
