import ProductCard from "./ProductCard"

const ProductsArea = ({ products }) => {
    const productsArray = products.map((product) => {
        return <ProductCard product={product} />
    })

    return <div className="productsStack">{productsArray}</div>
}

export default ProductsArea
