const { CustomError, BadRequest } = require("../errors")
const { StatusCodes } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
    const customErrorObject = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong. Try Again.",
    }
    // if (err instanceof CustomError)
    //     return res.status(err.statusCode).json({ msg: err.message })

    //Duplicate Error
    if (err.code && err.code === 11000) {
        customErrorObject.statusCode = StatusCodes.BAD_REQUEST
        customErrorObject.message = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field. Please enter another value.`
    }

    //Validation Error
    if (err.name === "ValidationError") {
        customErrorObject.statusCode = StatusCodes.BAD_REQUEST
        customErrorObject.message = Object.values(err.errors)
            .map((item) => {
                return item.message
            })
            .join(", ")
    }

    //Cast Error
    if (err.name === "CastError") {
        customErrorObject.statusCode = StatusCodes.NOT_FOUND
        customErrorObject.message = `Product with id: ${err.value._id} not Found.`
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

    res.status(customErrorObject.statusCode).json({
        msg: customErrorObject.message,
    })
}

module.exports = errorHandler
