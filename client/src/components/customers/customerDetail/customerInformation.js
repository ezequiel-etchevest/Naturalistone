import { Box, Text, HStack, IconButton, useDisclosure } from "@chakra-ui/react"
import CustomerEdit from "../customerEdit"
import SendEmailModalCustomer from "./SendEmailModal";

const CustomerInformation = ({customer}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const normalizeValue = (value) => {
    return value === undefined || value === "undefined" || value === null || value === "null" || value === '' ? "-" : value;
  };

  return(
    <>
      <Box
        userSelect={'none'}
        px={'1.5vw'}
        py={'2vh'}
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
              #{normalizeValue(customer.CustomerID)}  
            </Text>
            <Text 
              fontSize={'2.5vh'} 
              pt={'1vh'} 
              color={'logo.text1'}
              >
              - {normalizeValue(customer.Contact_Name)}  
            </Text>
            <Box display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
          <CustomerEdit customer={customer} onOpen={onOpen} onClose={onClose} isOpen={isOpen}/>
          <SendEmailModalCustomer customer={customer}/>
            </Box>
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
                <Text fontSize={'2.2vh'} fontWeight={'bold'}>{normalizeValue(customer.Phone)}</Text>
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
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{normalizeValue(customer.Email)}</Text>
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
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{normalizeValue(customer.Company)}</Text>
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
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{normalizeValue(customer.Billing_Address)}</Text>
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
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{normalizeValue(customer.ZipCode)}</Text>
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
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{normalizeValue(customer.State)}</Text>
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
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{normalizeValue(customer.SellerName)}</Text>
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
              <Text fontSize={'2.05vh'} fontWeight={'bold'}>{`${normalizeValue(customer.DiscountRate)} %`}</Text>
            </Box>
          </Box>
        </Box>
      </Box> 
    </>
  )
}

export default CustomerInformation