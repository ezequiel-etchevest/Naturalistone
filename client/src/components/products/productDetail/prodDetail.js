import { Box, HStack } from "@chakra-ui/react"
import HistoricalPrices from "./historicalPrices";
import ProductInformation from "./productInformation";
import ProductInventory from "./productInventory"
import ProductNotes from "./productNotes";
import ProductPicture from "./ProductPicture";
import ProductSale from "./ProductSale";

const ProductDetail = ({product, history_prices, user}) => {
return(
  <>     
    <Box 
    bg={'web.bg'}  
    ml={'16vw'} 
    h={'92vh'}
    display={'flex'} 
    >
      <Box 
      display={'flex'} 
      flexDir={'column'}
      mt={'3vh'}
      ml={'2vw'}
      >
      {/*Product info & notes */}
        <Box
        display={'flex'} 
        flexDir={'row'}>
          <ProductInformation product={product}/>
          <ProductNotes product={product} user={user}/>
        </Box>
      {/*Inventory & historical */}
        <Box
        display={'flex'} 
        flexDir={'row'}>
          <ProductInventory product={product}/>
          <ProductSale product={product} />
        </Box>
      </Box>
      {/*Inventory & historical */}
      <Box 
      ml={'1vw'} 
      mt={'3vh'} 
      display={'flex'} 
      flexDir={'column'} >
        <ProductPicture product={product}/>
        <HistoricalPrices history_prices={history_prices}/>
      </Box>          
    </Box>        
  </>
)
}

export default ProductDetail;