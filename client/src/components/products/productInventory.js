import { Box, Text, HStack, Divider } from "@chakra-ui/react"
import NextArrivalList from "./nextArrivalList"


const ProductInventory = ({product}) => {
return(
  <>
    <Box
      mt={'1.5vh'}
      px={'1.5vw'}
      py={'2vh'}
      h={'53vh'}
      w={'18vw'}
      display={'flex'}
      flexDir={'column'}
      color={'web.text'}
      bg={'web.sideBar'}
      border={'1px solid'} 
      rounded={'md'} 
      borderColor={'web.border'}
      >
      <Text 
        color={'web.text2'} 
        fontSize={'2.2vh'} 
        >Inventory</Text>
      <Box h={'36vh'} mt={'1vh'} px={'1vh'} py={'2vh'} display={'flex'} flexDir={'column'} justifyContent={'space-between'}>
        <Divider borderColor={'web.text2'}/>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          mr={'1vh'}
          ml={'1vh'}
          >
          <Text fontSize={'1.6vh'} color={'web.text'} fontWeight={'semi-bold'}> In Stock Available </Text>
          <Text fontSize={'1.6vh'} fontWeight={'semi-bold'}> {product.InStock_Available}</Text>
        </Box>
        <Divider borderColor={'web.text2'}/>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          mr={'1vh'}
          ml={'1vh'}
          >
          <Text fontSize={'1.6vh'} color={'web.text'} fontWeight={'semi-bold'}> In Stock Pending Payment </Text>
          <Text fontSize={'1.6vh'} fontWeight={'semi-bold'}> {product.InStock_PendingPayment}</Text>
        </Box>
        <Divider borderColor={'web.text2'}/>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          mr={'1vh'}
          ml={'1vh'}
          >
          <Text fontSize={'1.6vh'} color={'web.text'} fontWeight={'semi-bold'}> In Stock Reserved </Text>
          <Text fontSize={'1.6vh'} fontWeight={'semi-bold'}> {product.InStock_Reserved}</Text>
        </Box>
        <Divider borderColor={'web.text2'}/>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          mr={'1vh'}
          ml={'1vh'}
          >
          <Text fontSize={'1.6vh'} color={'web.text'} fontWeight={'semi-bold'}> Incoming Available </Text>
          <Text fontSize={'1.6vh'} fontWeight={'semi-bold'}> {product.Incoming_Available}</Text>
        </Box>
        <Divider borderColor={'web.text2'}/>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          mr={'1vh'}
          ml={'1vh'}           
          >
          <Text fontSize={'1.6vh'} color={'web.text'} fontWeight={'semi-bold'} w={'10vw'}> Incoming Pending Payment </Text>
          <Text fontSize={'1.6vh'} fontWeight={'semi-bold'}> {product.Incoming_PendingPayment}</Text>
        </Box>
        <Divider borderColor={'web.text2'}/>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          mr={'1vh'}
          ml={'1vh'}
          >
          <Text fontSize={'1.6vh'} color={'web.text'} fontWeight={'semi-bold'}> Incoming Reserved </Text>
          <Text fontSize={'1.6vh'} fontWeight={'semi-bold'}> {product.Incoming_Reserved}</Text>
        </Box>
        <Divider borderColor={'web.text2'}/>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          mr={'1vh'}
          ml={'1vh'}
          >
          <Text fontSize={'1.6vh'} color={'web.text'} fontWeight={'semi-bold'}> Back Order Pending Payment </Text>
          <Text fontSize={'1.6vh'} fontWeight={'semi-bold'}> </Text>
        </Box>
        <Divider borderColor={'web.text2'}/>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          mr={'1vh'}
          ml={'1vh'}
          >
          <Text fontSize={'1.6vh'} color={'web.text'} fontWeight={'semi-bold'}> Back Order Paid </Text>
          <Text fontSize={'1.6vh'} fontWeight={'semi-bold'}></Text>
        </Box>
        <Divider borderColor={'web.text2'}/>
      </Box>
      <Box pt={'1vh'}>
          <Text 
          color={'web.text2'} 
          fontSize={'1.9vh'}
          >Next Arrivals</Text>
      </Box>
      
      
    </Box>
  </>
  )
}


export default ProductInventory