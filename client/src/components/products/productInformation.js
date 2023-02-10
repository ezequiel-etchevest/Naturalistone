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
            flexDirection={'row'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            
            w={'15vw'}
            >
            <Text fontSize={'3vh'} pt={'1vh'} color={'logo.orange'}>{product.ProductName}</Text>
          </Box>
          <Box display={'flex'} flexDir={'row'} justifyContent={'space-around'} mt={'2vh'}>
          <Box 
            h={'8vh'}
            display={'flex'} 
            flexDir={'column'} 
            w={'8vw'}
            px={'1vh'}
            justifyContent={'space-around'}
            alignContent={'center'}>
              <Text fontSize={'2vh'} color={'web.text2'}> Type </Text>
              <Text fontSize={'2.2vh'} fontWeight={'semi-bold'}>Porcelain {product.Type}</Text>
          </Box>
          <Box 
            h={'8vh'}
            w={'6vw'}
            display={'flex'} 
            flexDir={'column'}
            justifyContent={'space-around'}>
              <Text fontSize={'2vh'} textAlign={'center'}color={'web.text2'}>Price</Text>
              <Text fontSize={'2.2vh'} textAlign={'center'}fontWeight={'semi-bold'} fon>$ {product.Price}</Text>
          </Box>
          </Box>
          <Box
            h={'8vh'} 
            display={'flex'} 
            flexDir={'column'} 
            justifyContent={'space-around'}
            px={'1vh'}
            mt={'1.5vh'}>
              <Text fontSize={'2vh'} color={'web.text2'}> Dimentions</Text>
              <HStack  spacing={'2vw'}>
                <Text fontSize={'2.2vh'} fontWeight={'semi-bold'}> {product.Size}</Text>
                <Text fontSize={'2.2vh'} fontWeight={'semi-bold'}> {product.Thickness}</Text>
                <Text fontSize={'2.2vh'} fontWeight={'semi-bold'}>{product.Finish ? product.Finish : '-'}</Text>
              </HStack>
          </Box>
        </Box>
      </Box> 
    </>
  )
}

export default ProductInformation