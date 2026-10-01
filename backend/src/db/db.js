const mongoose = require("mongoose")

async function DBConnection(){
    mongoose.connect(process.env.MONGOOSE_URI)

    console.log("DB connected Success")
}

module.exports = DBConnection