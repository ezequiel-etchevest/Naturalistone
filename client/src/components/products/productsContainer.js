import { Box } from "@chakra-ui/react"
import ProductList from './productsList'
import ProductsFilters from './productsFilters'
import { useState } from "react"
import { Center, Spinner } from "@chakra-ui/react"

const ProductsContainer = ({ allProducts, user, values }) => {

    const [filteredProducts, setFilteredProducts] = useState([])
    if(values && allProducts.length){
        return(
            <Box
            ml={'20vw'}
            bg={'web.bg'}
            > 
            <Box>
                <ProductsFilters allProducts={allProducts} setFilteredProducts={setFilteredProducts} values={values}/>
                <ProductList allProducts={allProducts} filteredProducts={filteredProducts} user={user} />
            </Box>
            </Box>
        )
    }else{
        return(
            <>
                <Center ml={'20vh'} bg={'web.bg'} h={'92vh'}>
                    <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
                </Center>
            
            </>
        )
    }
    
}


export default ProductsContainer