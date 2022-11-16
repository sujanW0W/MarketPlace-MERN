const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be provided."],
        trim: true,
        minLength: [3, "Name must be at least 3 characters long."],
        maxLength: [15, "Name must not exceed than 15 characters"],
    },
    email: {
        type: String,
        required: [true, "Email must be provided."],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide Valid Email.",
        ],
    },
    password: {
        type: String,
        required: [true, "Password must be provided."],
        minLength: [6, "Password must be at least 6 characters long."],
    },
})

usersSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

usersSchema.methods.verifyPassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}

usersSchema.methods.getToken = function () {
    const token = jwt.sign(
        { userID: this._id, name: this.name },
        process.env.JWT_Secret,
        {
            expiresIn: process.env.JWT_LifeTime,
        }
    )
    return token
}

module.exports = mongoose.model("Users", usersSchema)
