import { Box, Text, HStack } from "@chakra-ui/react";


const HistoricalPrices = () => {
  
  return(
    <>
      <Box
        ml={'1vw'}
        mt={'1.5vh'}
        px={'1.5vw'}
        py={'2vh'}
        h={'30vh'}
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
          <Text>Date</Text>
          <Text>Price</Text>
        </Box>
      </Box>
    </>
  )
}


export default HistoricalPrices