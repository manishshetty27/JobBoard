import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import ConnectDB from "./utils/db.js"
import UserRoute from "./routes/userRoute.js"
import companyRoute from "./routes/companyRoute.js"
import jobRoute from "./routes/jobRoute.js"
import applicationRoute from "./routes/applicationRoute.js"

dotenv.config({})

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const corsOptions = {
    origin:"http://localhost:5173",
    Credentials: true
}
app.use(cors(corsOptions))
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", UserRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)



ConnectDB()
app.listen(PORT, ()=> {
    console.log(`App running on port ${PORT}`)
})
