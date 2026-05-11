const express = require("express");
const schoolRouter = express.Router();
const schoolControllers = require("../controllers/school.controller")

schoolRouter.post("/add-school",schoolControllers.addSchool)
schoolRouter.get("/list-schools",schoolControllers.listSchools)


module.exports = schoolRouter