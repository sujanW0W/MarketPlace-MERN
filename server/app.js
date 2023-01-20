require("dotenv").config()
require("express-async-errors")

//extra security packages
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

const express = require("express")
const app = express()

//DB
const connectDB = require("./DB/connectDB")

const authentication = require("./middlewares/authentication")

//routers
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")

//error handling
const errorHandler = require("./middlewares/errorHandler")
const notFound = require("./middlewares/notFound")

//middlewares
app.set('trust proxy', 1)
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use("/api/v1/users", usersRouter)
app.use("/api/v1/products", authentication, productsRouter)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log("ERROR")
    }
}

start()
