const Users = require("../model/usersSchema")
const { BadRequest, NotFound, UnAuthenticated } = require("../errors/")
const { StatusCodes } = require("http-status-codes")

const register = async (req, res, next) => {
    const user = await Users.create(req.body)

    res.status(StatusCodes.OK).json({
        success: true,
        msg: `User ${user.name} created.`,
        token: user.getToken(),
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        throw new BadRequest("Please Provide Valid Email and Password.")

    const user = await Users.findOne({ email })
    if (!user) throw new NotFound(`User with email: ${email} not Found.`)

    const isMatch = await user.verifyPassword(password)
    if (!isMatch) throw new UnAuthenticated("Invalid Credentials.")

    const token = user.getToken()
    res.status(StatusCodes.OK).json({ name: user.name, token })
}

module.exports = { register, login }
