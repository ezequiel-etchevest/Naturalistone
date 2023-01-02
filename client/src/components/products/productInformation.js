import { Box, Text, HStack } from "@chakra-ui/react"

const ProductInformation = ({product}) => {

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
        h={'24vh'}
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
          flexDir={'row'} 
          alignItems={'baseline'}
          >
          <Text 
            color={'web.text2'} 
            ml={'1vh'}
            fontSize={'2.4vh'}
            >
            Product Details
          </Text>
        </Box>
        <Box  
          display={'flex'} 
          flexDir={'column'}
          mt={'2vh'}
          justifyContent={'space-between'}
          >
          <HStack>
            <Text 
              color={'logo.orange'} 
              fontSize={'xl'}
              >
              #{product.ProdID}
            </Text>
            <Text 
              fontSize={'sm'} 
              fontWeight={'bold'}>
                {product.ProductName}
            </Text>
          </HStack>
          <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
            <Box mt={'1vh'} h={'8vh'}>
              <Text 
                fontSize={'xs'} 
                color={'web.text2'}
                >
                Product Dimentions
              </Text>
              <HStack mt ={'1vh'} spacing={'1.2vw'}>
                <Text fontSize={'sm'} fontWeight={'semi-bold'}> {product.Type}</Text>
                <Text fontSize={'sm'} fontWeight={'semi-bold'}> {product.Size}</Text>
                <Text fontSize={'sm'} fontWeight={'semi-bold'}> {product.Thickness}</Text>
              </HStack>
            </Box>
            <Box mt={'1vh'}>
              <Text 
                color={'web.text2'} 
                fontSize={'xs'}
                >
                Price
              </Text>
              <Text 
                fontSize={'sm'} 
                fontWeight={'semi-bold'}
                mt={'1vh'}
                >
                ${product.Price}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box> 
    </>
  )
}

export default ProductInformation