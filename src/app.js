const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const noteRouter = require("./routes/note.router");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/notes", noteRouter);

module.exports = app;
