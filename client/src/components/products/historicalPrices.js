import { Box, Text, HStack } from "@chakra-ui/react";


const HistoricalPrices = () => {
  
  return(
    <>
      <Box    
        className={'product-details'}
        mt={'3vh'}
        ml={'2vw'}
        mr={'1vw'}
        pl={'2vw'}
        pt={'1.5vw'}
        pr={'1.5vw'}
        pb={'1.5vw'}
        h={'26vh'}
        w={'14vw'}
        display={'flex'}
        flexDir={'column'}
        color={'web.text'}
        bg={'web.sideBar'}
        border={'1px solid'} 
        rounded={'md'} 
        borderColor={'web.border'}
        >
        <Text color={'web.text2'}>Historical Prices</Text>
        <HStack spacing={'55%'} mt={'1.5vh'} justifyContent={'center'}>
          <Text>Date</Text>
          <Text>Price</Text>
        </HStack>
      </Box>
    </>
  )
}


export default HistoricalPrices