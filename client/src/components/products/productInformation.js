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
        h={'26vh'}
        w={'21vw'}
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
            >
            Product Details
          </Text>
        </Box>
        <Box  
          display={'flex'} 
          flexDir={'column'}
          h={'20vh'}
          justifyContent={'space-around'}
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
          <Box>
            <Text 
              fontSize={'xs'} 
              color={'web.text2'}
              >
              Product Dimentions
            </Text>
            <HStack spacing={'2vw'}>
              <Text fontSize={'sm'} fontWeight={'semi-bold'}> Type: {product.Type}</Text>
              <Text fontSize={'sm'} fontWeight={'semi-bold'}> Size: {product.Size}</Text>
              <Text fontSize={'sm'} fontWeight={'semi-bold'}> Thickness: {product.Thickness}</Text>
            </HStack>
          </Box>
          <Box 
            display={'flex'} 
            w={'17vw'} 
            justifyContent={'space-between'} 
            flexDir={'row'}
            >
			      <Box>
              <Text 
                color={'web.text2'} 
                fontSize={'xs'}
                >
                Price
              </Text>
              <Text 
                fontSize={'sm'} 
                fontWeight={'bold'}
                >
                ${product.Price}
              </Text>
            </Box>
			      <Box>
              <Text 
                color={'web.text2'} 
                fontSize={'xs'}>
                  Stock
              </Text>
              <Text 
                fontSize={'sm'} 
                fontWeight={'bold'}
                >
                {
                product.Stock === null ? '--' : product.Stock
                }
              </Text>
            </Box>
			      <Box>
              <Text 
                color={'web.text2'} 
                fontSize={'xs'}>
                  Next Arrival
              </Text>
              <Text 
                fontSize={'sm'} 
                fontWeight={'bold'}
                >
                {
                product.NextArrival === null ? '--' : product.NextArrival
                }
              </Text>
            </Box>
          </Box>
        </Box>
      </Box> 
    </>
  )
}

export default ProductInformation