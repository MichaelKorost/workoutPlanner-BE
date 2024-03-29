const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { cors } = require("./middleware/corsMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");
connectDB();

const app = express();

//middleware that parses encoded data content-type: application/x-www-form-urlencoded, submitted by forms

app.use(cors);

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/exercises", require("./routes/exerciseRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/calendar", require("./routes/calendarRoutes"));

app.use(errorHandler);

const port = 80;
app.listen(port, async () =>
  console.log(`listening to port: ${port}`.white.underline.bgGreen)
);
