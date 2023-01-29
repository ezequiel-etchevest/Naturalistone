import { Box } from "@chakra-ui/react"
import ProductList from './productsList'
import ProductsFilters from './productsFilters'
import { useState } from "react"

const ProductsContainer = ({ allProducts, user }) => {

    const [filteredProducts, setFilteredProducts] = useState([])

    return(
        <Box
        ml={'20vw'}
        bg={'web.bg'}
        > 
        <Box>
            <ProductsFilters allProducts={allProducts} setFilteredProducts={setFilteredProducts} />
            <ProductList allProducts={allProducts} filteredProducts={filteredProducts} user={user} />
        </Box>
        </Box>
    )
}


export default ProductsContainer