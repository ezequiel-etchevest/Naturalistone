import { Box, Text, HStack } from "@chakra-ui/react";
import HistoricalProductList from "./historicalProductList";

const HistoricalPrices = ({history_prices}) => {
  
  return(
    <>
      <Box
        ml={'1vw'}
        mt={'1.5vh'}
        px={'1.5vw'}
        py={'2vh'}
        maxHeight={'53vh'}
        w={'18vw'}
        display={'flex'}
        flexDir={'column'}
        color={'web.text'}
        bg={'web.sideBar'}
        border={'1px solid'} 
        rounded={'md'} 
        borderColor={'web.border'}
        >
        <Text color={'web.text2'} fontSize={'2.2vh'} >Historical Prices</Text>
        <Box mt={'1.5vh'} justifyContent={'center'}>
          <HistoricalProductList history_prices={history_prices}/>
        </Box>
      </Box>
    </>
  )
}


export default HistoricalPrices