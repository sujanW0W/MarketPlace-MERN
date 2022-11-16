const jwt = require("jsonwebtoken")
const { BadRequest, NotFound, UnAuthenticated } = require("../errors/")
const { StatusCodes } = require("http-status-codes")

const authentication = async (req, res, next) => {
    const authString = req.headers.authorization

    if (!authString || !authString.startsWith("Bearer "))
        throw new UnAuthenticated("Authentication Error.")

    const token = authString.split(" ")[1]

    const payload = jwt.verify(token, process.env.JWT_Secret)
    //Forward the decoded payload to the products route
    req.user = { userID: payload.userID, name: payload.name }
    next()
}

module.exports = authentication
