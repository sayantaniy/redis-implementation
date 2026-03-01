import express from "express"
import { createClient } from "redis"

const client = createClient()
const app = express()
app.use(express.json())

app.post("/submit", async (req, res) => {
    const { problemId, userId, code, language } = req.body
    try {
        await client.lPush("submissions", JSON.stringify({ problemId, userId, code, language }))
        res.json({
            message: "Submission received and added to the queue"
        })
    } catch (err) {
        console.log("An error occurred: ", err)
        res.status(500).json({
            message: "An error occurred while processing your submission"
        })
    }


})

async function startServer() {

    try {

        await client.connect()
        console.log("Connected to Redis : Success")

        app.listen(3000, () => {
            console.log("Server is running on port 3000")
        })



    } catch (err) {
        console.log("An error occurred: ", err)
    }

}

startServer()