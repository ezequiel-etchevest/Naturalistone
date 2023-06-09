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
    } from "@chakra-ui/react"
import '../../../assets/styleSheet.css'

const CreateQuoteProductsReview = ({ formData, setFormData }) => {

  return(
<>
  <Box 
    color={'web.text2'} 
    display={'flex'} 
    justifyContent={'center'} 
    flexDir={'column'} 
    h={'58vh'}
    alignItems={'center'}>
    <Text ml={'2vw'} mt={'2vw'} fontSize={'lg'} w={'16vw'} color={'white'} alignSelf={'flex-start'}>Products review</Text>
    <TableContainer
      mt={'3vh'}
      mr={'0.5vw'}  
      ml={'0.5vw'}
      bg={'web.sideBar'} 
      rounded={'md'}
      maxHeight={'50vh'}
      minHeight={'50vh'}
      overflow={'auto'}
      css={{
        '&::-webkit-scrollbar': {
          width: '0.4vw',
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
            <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Quantities</Th>
            <Th color={'web.text2'} fontSize={'2xs'} >Product Name</Th>
            <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Type</Th>
            <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Size</Th>
            <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Thickness</Th>
            <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Price</Th>
            <Th color={'web.text2'} fontSize={'2xs'} w={'10vw'} textAlign={'center'}>Finish</Th>
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
              <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e[1].quantity}</Td>
              <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e[1].prodName}</Td>
              <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e[1].type}</Td>
              <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e[1].size}</Td>
              <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e[1].thickness}</Td>
              <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e[1].price}</Td>
              <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e[1].finish}</Td>
            </Tr>
          ))
        }
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
</>
)}

export default CreateQuoteProductsReview

