const express = require("express")
const router = express.Router()

const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controller/products")

router.get("/", getAllProducts)

router.get("/:id", getProduct)

router.post("/", createProduct)

router.patch("/:id", updateProduct)

router.delete("/:id", deleteProduct)

module.exports = router
