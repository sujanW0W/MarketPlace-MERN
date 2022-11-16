const Products = require("../model/productsSchema")
const { BadRequest, NotFound, UnAuthenticated } = require("../errors/")
const { StatusCodes } = require("http-status-codes")

const getAllProducts = async (req, res) => {
    const products = await Products.find({ createdBy: req.user.userID }).sort(
        "-price"
    )
    if (products.length === 0) throw new NotFound("No products Found.")

    res.status(StatusCodes.OK).json({ noHits: products.length, products })
}

const getProduct = async (req, res) => {
    const {
        user: { userID },
        params: { id: productID },
    } = req

    const product = await Products.findById({
        _id: productID,
        createdBy: userID,
    })
    if (!product) throw new NotFound(`Product with id: ${productID} not Found.`)

    res.status(StatusCodes.OK).json(product)
}

const createProduct = async (req, res) => {
    req.body.createdBy = req.user.userID
    const product = await Products.create(req.body)
    res.status(StatusCodes.CREATED).json(product)
}

const updateProduct = async (req, res) => {
    const {
        user: { userID },
        params: { id: productID },
        body: { name, price, status },
    } = req

    if (!name || !price || !status) throw new BadRequest("Invalid Credentials.")

    const product = await Products.findOneAndUpdate(
        { _id: productID, createdBy: userID },
        req.body,
        {
            new: true,
        }
    )

    if (!product) throw new NotFound(`Product with id: ${productID} not Found.`)

    res.status(StatusCodes.OK).json(product)
}

const deleteProduct = async (req, res) => {
    const {
        user: { userID },
        params: { id: productID },
    } = req

    const product = await Products.findOneAndDelete({
        _id: productID,
        createdBy: userID,
    })
    if (!product) throw new NotFound(`Product with id: ${productID} not Found.`)

    res.status(StatusCodes.OK).json(product)
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}
