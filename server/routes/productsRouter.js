const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require("../controller/products");

const {
    createProduct,
    getProductImage,
} = require("../controller/createProduct");

router.get("/", getAllProducts);

router.get("/:id", getProduct);

// router.post("/", multer().any(), createProduct, uploadImage); //Cant get image after getting the json contenet. Error: Unexpected end of form

router.post("/", createProduct);

router.get("/image/:productId", getProductImage);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
