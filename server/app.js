require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

const errorHandler = require("./middlewares/errorHandler")
const notFound = require("./middlewares/notFound")
const authentication = require("./middlewares/authentication")

//DB
const connectDB = require("./DB/connectDB")

//routes
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")

//middlewares
app.use(express.json())

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
