import express from "express"
import { createClient } from "redis"

const client = createClient()
const app = express()
app.use(express.json())

async function startWorker() {

    try {
        await client.connect()

        while(1){
            const response = await client.brPop("submissions", 0)
            console.log("Received a submission: ", response)
            await new Promise((resolve)=> setTimeout(resolve,1000))
            console.log("Processed user submissions")
        }
        

    }catch(err){
        console.log("Some error occured ")
    }
}

startWorker()