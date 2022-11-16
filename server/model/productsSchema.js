const mongoose = require("mongoose")

const productsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product Name must be provided."],
            trim: true,
            minLength: [3, "Product name must be at least 3 characters long."],
            maxLength: [20, "Product name must not exceed than 20 characters."],
        },
        price: {
            type: Number,
            required: [true, "Price must be provided."],
        },
        // image: {
        //     type: Buffer,
        //     required: [true, "The image of the product must be provided."],
        // },
        status: {
            type: String,
            enum: ["available", "out of stock"],
            default: "available",
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Must provide the User details."],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Products", productsSchema)
