const app = require("./src/app")
const DBConnection = require("./src/db/db")

const PORT = process.env.PORT || 3000

DBConnection()

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`)
})