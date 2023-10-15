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
    FormLabel,
    Textarea,
    FormControl,
    useToast,
    } from "@chakra-ui/react"
import '../../../assets/styleSheet.css'

const CreateQuoteProductsReview = ({ formData, setFormData }) => {
  const toast = useToast();
  const toastId = "error-toast";
  
  const handleChangeNotes = (e) => {

    const inputValue = e.target.value;

    if (inputValue.length <= 180) {
      setFormData({
        ...formData,
        quote: {
          ...formData.quote,
          notes: inputValue,
        },
      });
    } else if(!toast.isActive(toastId)) {
          toast({
            id: toastId,
            title: "Error",
            description: "Text field, up to 180 characters",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
  }}
  
  return(
<>
<Box display={"flex"} justifyContent={"center"} flexDir={'column'}>
  <Text h={'4vh'} mb={'1vh'} mt={'2vh'} ml={'2vw'} fontSize={'lg'} w={'16vw'} color={'white'} alignSelf={'flex-start'}>Products review</Text>
  <Box 
    color={'web.text2'} 
    maxHeight={'45vh'}
    minHeight={'45vh'}
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
    alignItems={'center'}>
    <TableContainer
      mr={'0.5vw'}  
      ml={'0.5vw'}
      bg={'web.sideBar'} 
      rounded={'md'}
      px={'3vh'}>
      <Table color={'web.text'} variant={'simple'} size={'sm'}>
        <Thead h={'6vh'}>
          <Tr>  
            <Th color={'web.text2'} fontSize={'sm'} textAlign={'center'}>Quantities</Th>
            <Th color={'web.text2'} fontSize={'sm'} w={'16vw'} >Product Name</Th>
            <Th color={'web.text2'} fontSize={'sm'} textAlign={'center'}>Type</Th>
            <Th color={'web.text2'} fontSize={'sm'} textAlign={'center'}>Size</Th>
            <Th color={'web.text2'} fontSize={'sm'} textAlign={'center'}>Thickness</Th>
            <Th color={'web.text2'} fontSize={'sm'} textAlign={'center'}>Price</Th>
            <Th color={'web.text2'} fontSize={'sm'} w={'10vw'} textAlign={'center'}>Finish</Th>
          </Tr>
        </Thead>
        <Tbody>
        {
        Object.entries(formData.products).length ?
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
          )) : null
        }
        {
        Object.entries(formData.specialProducts).length ?
          Object.entries(formData.specialProducts).map((e, i) => (
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
          )) : null
        }
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
    <FormControl mt={'3vh'} px={'2vw'}>
      <Box
        display={'flex'} 
        flexDirection={'row'}
        >
        <FormLabel color={'web.text'}>Notes:</FormLabel>
      </Box>
      <Textarea
        h={"50px"}
        variant="unstyled"
        textColor={'web.text'}
        placeholder="Write your comment here..."
        _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', fontStyle:'italic' }}
        size={"sm"}
        border={'1px solid'}
        borderColor={'web.border'}
        type={"text"}
        value={formData.quote.notes}
        onChange={(e)=> handleChangeNotes(e)}
        px={"1vw"}
        />
    </FormControl>
  </Box>
</>
)}

export default CreateQuoteProductsReview

