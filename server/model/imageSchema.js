const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    image: {
        data: Buffer,
        contentType: String,
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
    },
});

module.exports = mongoose.model("Image", imageSchema);
