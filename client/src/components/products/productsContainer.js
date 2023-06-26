import { Box } from "@chakra-ui/react"
import ProductList from './productsList'
import ProductsFilters from './productsFilters'
import { useState } from "react"
import { Center, Spinner } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

const ProductsContainer = ({ allProducts, user, values }) => {

    const [filteredProducts, setFilteredProducts] = useState([])
    const location = useLocation()
    const queryString = location.search;
    const url = new URLSearchParams(queryString);
    const getParamsPage = url.get('page')
    const [currentPage, setCurrentPage] = useState(getParamsPage ? getParamsPage : 1)

    if(Object.entries(values).length){
        return(
            <Box
            ml={'16vw'}
            bg={'web.bg'}
            > 
            <Box>
                <ProductsFilters
                allProducts={allProducts}
                setFilteredProducts={setFilteredProducts}
                values={values}
                setCurrentPage={setCurrentPage}
                />
                <ProductList 
                allProducts={allProducts}
                filteredProducts={filteredProducts}
                user={user}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
            </Box>
            </Box>
        )
    }else{
        return(
            <>
                <Center ml={'16vh'} bg={'web.bg'} h={'92vh'}>
                    <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
                </Center>
            
            </>
        )
    }
    
}


export default ProductsContainer