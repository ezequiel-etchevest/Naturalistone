import { Box } from "@chakra-ui/react"
import ProductList from './productsList'
import ProductsFilters from './productsFilters'
import { useEffect, useState } from "react"
import { Center, Spinner } from "@chakra-ui/react"
import { getProductImage } from "../../redux/actions-products"
import { useSelector, useDispatch } from "react-redux"

const ProductsContainer = ({ allProducts, user, values }) => {

    const [filteredProducts, setFilteredProducts] = useState([])
    const dispatch = useDispatch()
    const product_image = useSelector(state => state.product_image)
    console.log(product_image)
    useEffect(()=>{
        dispatch(getProductImage())
    })
    if(Object.entries(values).length && allProducts.length){
        return(
            <Box
            ml={'16vw'}
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
                <Center ml={'16vh'} bg={'web.bg'} h={'92vh'}>
                    <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
                </Center>
            
            </>
        )
    }
    
}


export default ProductsContainer