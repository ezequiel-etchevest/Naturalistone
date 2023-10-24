import { Box, Text, HStack, IconButton, useDisclosure } from "@chakra-ui/react"
import CustomerEdit from "../customerEdit"
import SendEmailModalCustomer from "./SendEmailModal";
import AddFiles from "../../products/productDetail/addNewImagesModal";

const CustomerInformation = ({user, customer, sellers}) => {

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
        w={'22vw'}
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
            flexDirection={'column'}
            // justifyContent={'flex-start'}
            w={'20vw'}
            h={'10vh'}
            justifyContent={'space-between'}
            columnGap={'2vh'}
            >
            <Box display={"flex"} flexDir={"row"} gap={'2vw'} w={'20vw'}>
            <Text
              fontSize={'1.5rem'} 
              pt={'1vh'} 
              color={'logo.orange'}
              >
              #{normalizeValue(customer.CustomerID)}  
            </Text>
            <Text 
              fontSize={'1.4rem'} 
              pt={'1vh'} 
              color={'logo.text1'}
              > {normalizeValue(customer.Contact_Name)}  
            </Text>
            </Box>
                        {/* Botones extras */}
            <Box display={"flex"} flexDir={"row"} justifyContent={"center"} alignItems={"center"} h={"3vh"} gap={"2vw"}>
              <CustomerEdit customer={customer} onOpen={onOpen} onClose={onClose} isOpen={isOpen} sellers={sellers} user={user}/>
              <SendEmailModalCustomer customer={customer}/>
              <AddFiles
                allowedFileTypes={['application/pdf']}
                fieldName={'pdf'}
                url={`/upload/customer/${customer.CustomerID}`}
                pxButton={"1vw"}
                tooltip={"Add files"}
                />
            </Box>
                        {/* Botones extras */}
          </Box>
          {/*Phone */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'} mt={'1.5vh'} >
            <Box
              h={'7.5vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
                <Text fontSize={'0.9rem'} color={'web.text2'}> Phone </Text>
                <Text fontSize={'1.rem'} fontWeight={'bold'}>{normalizeValue(customer.Phone)}</Text>
            </Box>
          </Box>
          {/*Email */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'} mt={'1.5vh'}>
            <Box 
              h={'7.5vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'0.9rem'} color={'web.text2'}>E-mail</Text>
              <Text fontSize={'1.rem'} fontWeight={'bold'}>{normalizeValue(customer.Email)}</Text>
            </Box>
          </Box>
          {/*Company */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'7.5vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'0.9rem'} color={'web.text2'}>Company</Text>
              <Text fontSize={'1.rem'} fontWeight={'bold'}>{normalizeValue(customer.Company)}</Text>
            </Box>
          </Box>
          {/*Billing Address */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'7.5vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'0.9rem'} color={'web.text2'}>Billing Address</Text>
              <Text fontSize={'1.rem'} fontWeight={'bold'}>
                {normalizeValue(customer.billing_address_id ? customer.billing_address : customer.Billing_Address)}
              </Text>
            </Box>
          </Box>
          {/*ZipCode */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'7.5vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'0.9rem'} color={'web.text2'}>Zip Code</Text>
              <Text fontSize={'1.rem'} fontWeight={'bold'}>
                {normalizeValue(customer.billing_address_id ? customer.billing_zip_code : customer.ZipCode)}
              </Text>
            </Box>
          </Box>
          {/*State */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'7.5vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'0.9rem'} color={'web.text2'}>State</Text>
              <Text fontSize={'1.rem'} fontWeight={'bold'}>
                {normalizeValue(customer.billing_address_id ? customer.billing_state : customer.State)}
              </Text>
            </Box>
          </Box>
          {/*Seller ID */} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'7.5vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'0.9rem'} color={'web.text2'}>Seller</Text>
              <Text fontSize={'1.rem'} fontWeight={'bold'}>{normalizeValue(customer.SellerName)}</Text>
            </Box>
          </Box>
          {/*Discount*/} 
          <Box display={'flex'} flexDir={'row'} px={'1vw'}  mt={'1.5vh'}>
            <Box 
              h={'7.5vh'}
              display={'flex'} 
              flexDir={'column'} 
              justifyContent={'space-around'}
              alignContent={'center'}>
              <Text fontSize={'0.9rem'} color={'web.text2'}>Discount</Text>
              <Text fontSize={'1.rem'} fontWeight={'bold'}>{`${normalizeValue(customer.DiscountRate)} %`}</Text>
            </Box>
          </Box>
        </Box>
      </Box> 
    </>
  )
}

export default CustomerInformation