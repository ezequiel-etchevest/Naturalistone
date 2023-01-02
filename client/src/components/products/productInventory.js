import { Box, Text, HStack } from "@chakra-ui/react"


const ProductInventory = ({product}) => {

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
      h={'44vh'}
      w={'18vw'}
      display={'flex'}
      flexDir={'column'}
      color={'web.text'}
      bg={'web.sideBar'}
      border={'1px solid'} 
      rounded={'md'} 
      borderColor={'web.border'}
      >
      <Text color={'web.text2'} fontSize={'2.6vh'} ml={'1vh'}>Inventory</Text>
      <Box mt={'3vh'}>
        <HStack
          display={'flex'}
          justifyContent={'space-between'}
          w={'14vw'}
          mb={'2vh'}
          >
          <Text fontSize={'sm'} color={'web.text'} fontWeight={'semi-bold'}> Stock </Text>
          <Text fontSize={'sm'} fontWeight={'semi-bold'}> {product.InStock_Available}</Text>
        </HStack>
        <HStack
          display={'flex'}
          justifyContent={'space-between'}
          w={'14vw'}
          mb={'2vh'}
          >
          <Text fontSize={'sm'} color={'web.text'} fontWeight={'semi-bold'}> Pending Payment </Text>
          <Text fontSize={'sm'} fontWeight={'semi-bold'}> {product.InStock_PendingPayment}</Text>
        </HStack>
        <HStack
          display={'flex'}
          justifyContent={'space-between'}
          w={'14vw'}
          mb={'2vh'}
          >
          <Text fontSize={'sm'} color={'web.text'} fontWeight={'semi-bold'}> Reserved </Text>
          <Text fontSize={'sm'} fontWeight={'semi-bold'}> {product.InStock_Reserved}</Text>
        </HStack>
        <HStack
          display={'flex'}
          justifyContent={'space-between'}
          w={'14vw'}
          mb={'2vh'}
          >
          <Text fontSize={'sm'} color={'web.text'} fontWeight={'semi-bold'}> Incoming Available </Text>
          <Text fontSize={'sm'} fontWeight={'semi-bold'}> {product.Incoming_Available}</Text>
        </HStack>
        <HStack
          display={'flex'}
          justifyContent={'space-between'}
          w={'14vw'}   
          mb={'2vh'}          
          >
          <Text fontSize={'sm'} color={'web.text'} fontWeight={'semi-bold'} w={'10vw'}> Incoming Pending Payment </Text>
          <Text fontSize={'sm'} fontWeight={'semi-bold'}> {product.Incoming_PendingPayment}</Text>
        </HStack>
        <HStack
          display={'flex'}
          justifyContent={'space-between'}
          w={'14vw'}
          mb={'2vh'}
          >
          <Text fontSize={'sm'} color={'web.text'} fontWeight={'semi-bold'}> Incoming Reserved </Text>
          <Text fontSize={'sm'} fontWeight={'semi-bold'}> {product.Incoming_Reserved}</Text>
        </HStack>
      </Box>
    </Box>
  </>
  )
}


export default ProductInventory