import { Box, Text, HStack } from "@chakra-ui/react"

const CustomerInformation = ({customer}) => {
  console.log({customer})
  return(
    <>
      <Box
        userSelect={'none'}
        px={'1.5vw'}
        py={'2vh'}
        w={'20vw'}
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
          {/*CustomerID & fullname */}  
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            w={'15vw'}
            alignItems={'baseline'}
            >
            <Text
              fontSize={'3vh'} 
              pt={'1vh'} 
              color={'logo.orange'}
              >
              #{customer.CustomerID}  
            </Text>
            <Text 
              fontSize={'2.5vh'} 
              pt={'1vh'} 
              color={'logo.text1'}
              >
              - {customer.Contact_Name}  
            </Text>
          </Box>
          {/*Phone */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'} mt={'1.5vh'}>
            <Box
              h={'8vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
                <Text fontSize={'1.6vh'} color={'web.text2'}> Phone </Text>
                <Text fontSize={'2.2vh'} fontWeight={'bold'}>{customer.Phone}</Text>
            </Box>
          </Box>
          {/*Email */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'} mt={'1.5vh'}>
            <Box 
              h={'8vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'1.6vh'} color={'web.text2'}>E-mail</Text>
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{customer.Email}</Text>
            </Box>
          </Box>
          {/*Company */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'8vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'1.6vh'} color={'web.text2'}>Company</Text>
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{customer.Company}</Text>
            </Box>
          </Box>
          {/*Billing Address */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'8vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'1.6vh'} color={'web.text2'}>Billing Address</Text>
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{customer.Billing_Address}</Text>
            </Box>
          </Box>
          {/*ZipCode */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'8vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'1.6vh'} color={'web.text2'}>Zip Code</Text>
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{customer.ZipCode}</Text>
            </Box>
          </Box>
          {/*State */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'8vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'1.6vh'} color={'web.text2'}>State</Text>
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{customer.State}</Text>
            </Box>
          </Box>
          {/*Seller ID */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'8vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'1.6vh'} color={'web.text2'}>Seller</Text>
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{customer.SellerID}</Text>
            </Box>
          </Box>
          {/*Discount*/} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'8vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'1.6vh'} color={'web.text2'}>Discount</Text>
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{customer.DiscountID}</Text>
            </Box>
          </Box>
        </Box>
      </Box> 
    </>
  )
}

export default CustomerInformation