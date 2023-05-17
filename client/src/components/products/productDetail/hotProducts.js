import { Box, Text, HStack } from "@chakra-ui/react";


const HotProducts = () => {
  
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
        w={'24vw'}
        display={'flex'}
        flexDir={'column'}
        color={'web.text'}
        bg={'web.sideBar'}
        border={'1px solid'} 
        rounded={'md'} 
        borderColor={'web.border'}
        >
        <HStack spacing={'2vw'}>
          <Text>Product name</Text>
          <Text>Dimentions</Text>
          <Text>Rank</Text>
        </HStack>

      </Box>
    </>
  )
}


export default HotProducts