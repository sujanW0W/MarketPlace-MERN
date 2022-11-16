//This index.js file is for making import easier and consistent. i.e. All kinds of error classes can be imported by this particular file.

const CustomError = require("./CustomError")
const BadRequest = require("./BadRequest")
const UnAuthenticated = require("./UnAuthenticated")
const NotFound = require("./NotFound")

module.exports = {
    CustomError,
    BadRequest,
    UnAuthenticated,
    NotFound,
}
