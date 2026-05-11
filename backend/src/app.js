const express = require("express");
const app = express();

app.use(express.json());

const schoolRouter = require("./routes/school.route");
app.use("/school", schoolRouter);



module.exports = app