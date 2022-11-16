const notFound = (req, res) => {
    res.status(404).json({ msg: "Route is not Found." })
}

module.exports = notFound
