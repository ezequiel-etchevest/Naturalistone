import { Box, Text, VStack, HStack } from "@chakra-ui/react"

const ProductInformation = ({product}) => {

  return(
    <>
      <Box
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
            flexDirection={'column'}
            alignItems={'flex-start'}

            >
              <Text 
                color={'logo.orange'} 
                fontSize={'3.5vh'}
                >
                #{product.ProdID}
              </Text>
              <Text 
                fontSize={'2.1vh'} 
                fontWeight={'bold'}>
                {product.ProductName}
              </Text> 
          </Box>
          <Box 
            h={'8vh'}
            display={'flex'} 
            flexDir={'row'} 
            justifyContent={'space-between'}
            px={'1vh'}
            mt={'2vh'}>
            <Box mt={'1vh'} h={'8vh'}>
              <Text 
                fontSize={'1.5vh'} 
                color={'web.text2'}
                >
                Type
              </Text>
              <Text fontSize={'1.8vh'} fontWeight={'bold'}>Porcelain</Text>
            </Box>
            <Box mt={'1vh'} w={'8vh'}>
              <Text 
                color={'web.text2'} 
                fontSize={'1.5vh'}
                >
                Price
              </Text>
              <Text 
                fontSize={'1.8vh'} 
                fontWeight={'bold'}
                >
                ${product.Price}
              </Text>
            </Box>
          </Box>
          <Box 
            display={'flex'} 
            flexDir={'row'} 
            justifyContent={'space-between'}
            px={'1vh'}>
            <Box h={'8vh'}>
              <Text 
                fontSize={'1.5vh'} 
                color={'web.text2'}
                >
                Dimentions
              </Text>
              <HStack  spacing={'1vh'}>
                <Text fontSize={'1.8vh'} fontWeight={'bold'}> {product.Type}</Text>
                <Text fontSize={'1.8vh'} fontWeight={'bold'}> {product.Size}</Text>
                <Text fontSize={'1.8vh'} fontWeight={'bold'}> {product.Thickness}</Text>
              </HStack>
            </Box>
            <Box w={'8vh'}>
              <Text 
                color={'web.text2'} 
                fontSize={'1.5vh'}
                >
                Finish
              </Text>
              <Text 
                fontSize={'1.8vh'} 
                fontWeight={'bold'}
                >
                {product.Finish ? product.Finish : '-'}
              </Text>
            </Box>
            
          </Box>
        </Box>
      </Box> 
    </>
  )
}

export default ProductInformation