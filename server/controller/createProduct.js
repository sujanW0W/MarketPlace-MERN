const multer = require("multer");
const Image = require("../model/imageSchema");
const path = require("path");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const Products = require("../model/productsSchema");

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        const suffix = Date.now() + "-" + Math.floor(Math.random() * 10000);
        cb(null, `${suffix}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single("productImage");

const writeProductContent = async (productData, userData) => {
    productData = JSON.parse(productData);
    productData.createdBy = userData.userID;

    const product = await Products.create(productData);

    return product._id.toString();
};

const createProduct = (req, res) => {
    upload(req, res, async (err) => {
        if (err) console.log(err);
        else {
            const productId = await writeProductContent(
                req.body.data,
                req.user
            );

            const newImage = new Image({
                productId,
                name: req.file.filename,
                desc: req.body.desc,
                image: {
                    data: fs.readFileSync(
                        __dirname + "/../" + "uploads/" + req.file.filename
                    ),
                    contentType: "image/png",
                },
            });

            newImage
                .save()
                .then(() => {
                    const filePath = path.join(
                        __dirname + "/../" + "uploads",
                        req.file.filename
                    );

                    res.status(StatusCodes.CREATED).json({
                        msg: "Product is added successfully.",
                        image: filePath,
                    });
                })
                .catch((err) => console.log(err));
        }
    });
};

const getProductImage = async (req, res) => {
    const { productId } = req.params;
    const imageDetails = await Image.findOne({ productId });
    res.json(imageDetails);
    // res.setHeader("content-type", "image/png");
    // res.download("./uploads/" + imageDetails.name);
};

module.exports = { createProduct, getProductImage };
