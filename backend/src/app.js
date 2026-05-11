const express = require("express");
const app = express();

app.use(express.json());

const schoolRouter = require("./routes/school.route");
app.use("/school", schoolRouter);
app.get("/", (req, res) => {
    res.json({
        message: "SchoolManagement API is running " });
});


module.exports = app