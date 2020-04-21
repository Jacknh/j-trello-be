const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const auth = require("./routes/auth");
const board = require("./routes/board");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./db");

dotenv.config();

connectDB();

const app = express();

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/board", board);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`The server running on port ${process.env.PORT}`)
);
