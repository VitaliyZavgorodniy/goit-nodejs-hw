const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { createError } = require("./helpers");

const contactsRouter = require("./routes/api/contacts");

const { DB_HOST, PORT = 4000 } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
