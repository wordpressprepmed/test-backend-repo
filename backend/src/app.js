require("dotenv").config()
const express = require("express")
const multer = require("multer")
const cors = require("cors")
const uploadFile = require("./services/storage.service")
const postModel = require("./models/post.model")


const app = express()
app.use(cors())
app.use(express.json())

const upload = multer({ storage: multer.memoryStorage() })


app.post("/create-post", upload.single("image"), async (req, res) => {

    const result = await uploadFile(req.file.buffer)

    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    return res.status(201).json({
        message: "Post created Successful",
        data: post
    })
})


app.get("/get-post", async(req, res) => {
    const response = await postModel.find({})

    res.status(200).json({
        message: "Post fetched Success",
        data: response
    })
})



module.exports = app