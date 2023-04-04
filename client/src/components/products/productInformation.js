import { Box, Text, HStack } from "@chakra-ui/react"

const ProductInformation = ({product}) => {

  return(
    <>
      <Box
        userSelect={'none'}
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
        <Box
          display={'flex'} 
          flexDir={'column'}
          justifyContent={'space-between'}
          >
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            w={'15vw'}
            >
            <Text 
              fontSize={'3vh'} 
              pt={'1vh'} 
              color={'logo.orange'}
              >
                {product.ProductName}</Text>
            </Box>
            <Box display={'flex'} flexDir={'row'} justifyContent={'space-around'} mt={'2vh'}>
            <Box
              h={'8vh'}
              display={'flex'} 
              flexDir={'column'} 
              w={'10vw'}
              justifyContent={'space-around'}
              alignContent={'center'}>
                <Text fontSize={'1.6vh'} color={'web.text2'}> Type </Text>
                <Text fontSize={'2.2vh'} fontWeight={'bold'}>{product.Material}</Text>
            </Box>
            <Box 
              h={'8vh'}
              w={'9vw'}
              display={'flex'}
              alignItems={'flex-start'} 
              flexDir={'column'}
              justifyContent={'space-around'}>
                <Text fontSize={'1.6vh'}color={'web.text2'}>Price</Text>
                <Text fontSize={'2.05vh'}fontWeight={'bold'} >$ {product.Price === null ? '-' : product.Price.toLocaleString('en-US')}</Text>
            </Box>
          </Box>
          <Box
            h={'8vh'} 
            display={'flex'} 
            flexDir={'column'} 
            justifyContent={'space-around'}
            mt={'1.5vh'}>
              <Text fontSize={'1.6vh'} color={'web.text2'}> Dimentions</Text>
              <HStack >
                <Text fontSize={'2.05vh'} fontWeight={'bold'}>{product.Size ? product.Size : 'N/A' }{' - '}{product.Thickness ? product.Thickness : 'N/A' }{' - '}{product.Finish ? product.Finish : 'N/A'}</Text>
              </HStack>
          </Box>
        </Box>
      </Box> 
    </>
  )
}

export default ProductInformation