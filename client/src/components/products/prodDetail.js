import { Box, HStack } from "@chakra-ui/react"
import HistoricalProductList from "./historicalProductList";
import HotProducts from "./hotProducts";
import HistoricalPrices from "./historicalPrices";
import ProductInformation from "./productInformation";
import ProductInventory from "./productInventory"

const ProductDetail = ({product}) => {

return(
  <>     
    <Box 
      bg={'web.bg'}  
      ml={'20vw'} 
      h={'92vh'}
      display={'flex'}
      flexDir={'column'}
      >
      <Box 
        border={'2px solid red'}
        display={'flex'} 
        flexDir={'row'} 
        >
        <ProductInformation product={product}/>
        {/* <HistoricalPrices/> */}
      </Box>
      <Box 
        border={'2px solid blue'}
        display={'flex'} 
        flexDir={'row'} 
        h={'68vh'}
        >
        <Box
          display={'flex'}
          flexDir={'column'}  
          border={'2px solid green'}
          >

          <HStack>
            <ProductInventory product={product}/>
            {/* <HotProducts/> */}
          </HStack>
        </Box>
      </Box>
      
    </Box>        
  </>
)
}

export default ProductDetail;