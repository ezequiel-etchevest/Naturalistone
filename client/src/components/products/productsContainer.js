import { Box } from "@chakra-ui/react"
import ProductList from "./productsList"
import ProductsFilters from './productsFilters'
import { useState } from "react"

const ProductsContainer = ({ allProducts }) => {

    const [filteredProducts, setFilteredProducts] = useState([])

    return(
        <Box
        ml={'20vw'}
        > 
        <Box mt = {'7.4vh'}>
            <ProductsFilters allProducts={allProducts} setFilteredProducts={setFilteredProducts} />
            <ProductList allProducts={allProducts} filteredProducts={filteredProducts} />
        </Box>
        </Box>
    )
}


export default ProductsContainer