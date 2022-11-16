import "./styles/dashboard.css"
import NavBar from "./NavBar"
import ProductsArea from "./ProductsArea"
import { useState, useEffect } from "react"

const Dashboard = () => {
    const [products, setProducts] = useState()
    const fetchProducts = () => {
        //API Call
        const data = []

        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <NavBar />
            <ProductsArea products={products} />
        </>
    )
}

export default Dashboard
