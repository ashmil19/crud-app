import 'dotenv/config'
import express from 'express'
import router from './routes/routes.js'
import db from './config/db.js'
import cors from 'cors'

const app = express()
db()

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api",router)

app.listen(process.env.PORT,()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`)
})