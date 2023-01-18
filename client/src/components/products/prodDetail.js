import { Box, HStack } from "@chakra-ui/react"
import HistoricalPrices from "./historicalPrices";
import ProductInformation from "./productInformation";
import ProductInventory from "./productInventory"
import ProductNotes from "./productNotes";
import ProductPicture from "./ProductPicture";

const ProductDetail = ({product, history_prices, user}) => {

return(
  <>     
    <Box 
      bg={'web.bg'}  
      ml={'20vw'} 
      h={'92vh'}
      display={'flex'} 
      >
      <Box 
        display={'flex'} 
        flexDir={'column'}
        mt={'3vh'}
        ml={'2vw'}
        >
        <Box display={'flex'} flexDir={'row'}>
          <ProductInformation product={product}/>
          <ProductNotes product={product} user={user}/>
        </Box>
        <Box display={'flex'} flexDir={'row'}>
          <ProductInventory product={product}/>
          <HistoricalPrices history_prices={history_prices}/>
        </Box>
      </Box>
      <Box  ml={'1vw'} mt={'3vh'} display={'flex'} flexDir={'column'} >
      
      <ProductPicture/>
       
        </Box>          
    </Box>        
  </>
)
}

export default ProductDetail;