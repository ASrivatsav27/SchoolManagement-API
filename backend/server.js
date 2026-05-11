require("dotenv").config()

const app = require("./src/app")
const PORT = process.env.PORT || 8000;
require("./src/config/database")


app.listen(8000, () => {
    console.log("Server is running on port 8000")
})