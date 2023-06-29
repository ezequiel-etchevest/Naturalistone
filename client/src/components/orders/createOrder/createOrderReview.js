import { 
    Text,
    Table,
    Thead,
    Tbody,
    Box,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    VStack,
    } from "@chakra-ui/react"
import '../../../assets/styleSheet.css'

const CreateOrderReview = ({ formData, setFormData }) => {
console.log(formData.factory)
  return(
<>
  <Box 
    color={'web.text2'} 
    display={'flex'} 
    justifyContent={'center'} 
    flexDir={'column'} 
    h={'60vh'}
    alignItems={'center'}>
    <Text ml={'2vw'} mt={'2vw'} fontSize={'lg'} w={'16vw'} color={'white'} alignSelf={'flex-start'}>Order review</Text>
    <Box      
      mr={'0.5vw'}  
      ml={'0.5vw'}
      bg={'web.sideBar'} 
      rounded={'md'}
      h={'28vh'}
      p={'3vh'}
    >
      <HStack w={'60vw'} display={'flex'} justifyContent={'space-between'} mt={'2vh'} border={'2px solid red'}>
        <VStack alignItems={'flex-start'} h={'25vh'}>
          <Text fontSize={'sm'} fontWeight={'bold'}>Factory name:</Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>Reference:</Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>Phone:</Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>Email:</Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>Website:</Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>Foreing:</Text>
        </VStack>
        <VStack alignItems={'flex-start'} h={'25vh'}>
          <Text fontSize={'sm'} visibility={formData.factory.Factory_Name ? 'visible' : 'hidden'}>{formData.factory.Factory_Name ? formData.factory.Factory_Name : " - "}</Text>
          <Text fontSize={'sm'} visibility={formData.factory.Reference ? 'visible' : 'hidden'}>{formData.factory.Reference ? formData.factory.Reference : " - "}</Text>
          <Text fontSize={'sm'} visibility={formData.factory.Phone ? 'visible' : 'hidden'}>{formData.factory.Phone ? formData.factory.Phone : " - "}</Text>
          <Text fontSize={'sm'} visibility={formData.factory.Email ? 'visible' : 'hidden'}>{formData.factory.Email ? formData.factory.Email : " - "}</Text>
          <Text fontSize={'sm'} visibility={formData.factory.WebSite ? 'visible' : 'hidden'}>{formData.factory.WebSite ? formData.factory.WebSite : " - "}</Text>
          <Text fontSize={'sm'}>
            {formData.factory.Factory_Name ? (formData.factory.International_Flag === 'Y' ? 'Yes' : 'No') : " "}
          </Text>
        </VStack>

        <VStack alignItems={'flex-start'} h={'25vh'}>
          <Text fontSize={'sm'} fontWeight={'bold'}>Order value:</Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>Order date:</Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>Payment:</Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>FreightInvoice:</Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>Order by:</Text>
          <Text fontSize={'sm'} fontWeight={'bold'}>Status:</Text>
        </VStack>
        <VStack alignItems={'flex-start'} h={'25vh'}>
          <Text fontSize={'sm'}>{formData.info.Value}</Text>
          <Text fontSize={'sm'}>{formData.info.InvoiceDate}</Text>
          <Text fontSize={'sm'}>{formData.info.Payment}</Text>
          <Text fontSize={'sm'}>{formData.info.idFreightInvoice}</Text>
          <Text fontSize={'sm'}>{formData.info.Order_By}</Text>
          <Text fontSize={'sm'}>{formData.info.Status}</Text>
        </VStack>
      </HStack>
    </Box>
    <TableContainer
      mr={'0.5vw'}  
      ml={'0.5vw'}
      mt={'3vh'}
      bg={'web.sideBar'} 
      rounded={'md'}
      maxHeight={'30vh'}
      minHeight={'30vh'}
      overflow={'auto'}
      css={{
        '&::-webkit-scrollbar': {
          width: '0.2vw',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#E47424',
          borderRadius: '5px',
        },
      }} 
      p={'3vh'}>
      <Table color={'web.text'} variant={'simple'} size={'sm'}>
        <Thead h={'6vh'}>
          <Tr>  
            <Th color={'web.text2'} fontSize={'xs'} textAlign={'center'}>Quantities</Th>
            <Th color={'web.text2'} fontSize={'xs'} w={'16vw'} >Product Name</Th>
            <Th color={'web.text2'} fontSize={'xs'} textAlign={'center'}>Type</Th>
            <Th color={'web.text2'} fontSize={'xs'} textAlign={'center'}>Size</Th>
            <Th color={'web.text2'} fontSize={'xs'} textAlign={'center'}>Thickness</Th>
            <Th color={'web.text2'} fontSize={'xs'} textAlign={'center'}>Price</Th>
            <Th color={'web.text2'} fontSize={'xs'} w={'10vw'} textAlign={'center'}>Finish</Th>
          </Tr>
        </Thead>
        <Tbody>
        {
          Object.entries(formData.products).map((e, i) => (
            <Tr
            cursor={'pointer'} 
            key={i}
            _hover={{
              bg: 'web.navBar',
              color: 'logo.orange'
            }}>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].quantity}</Td>
              <Td fontSize={'xs'} w={'16vw'} textAlign={'center'}>{e[1].prodName}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].type}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].size}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].thickness}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].price}</Td>
              <Td fontSize={'xs'} textAlign={'center'}>{e[1].finish}</Td>
            </Tr>
          ))
        }
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
</>
)}

export default CreateOrderReview





// si la fabrica existe ---> seleccion de todos los productos relacionados a la fabrica,
// primero select tabla prodNames, donde matcheo el factoryID. 