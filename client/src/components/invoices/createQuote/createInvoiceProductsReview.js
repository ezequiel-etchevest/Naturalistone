import { 
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Text,
    ModalBody,
    ModalCloseButton,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useDisclosure
    } from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import QuotePdfModal from "./quotePdfModal"
import { createQuote } from "../../../redux/actions-invoices"
import '../../../assets/styleSheet.css'

const ReviewProductsModal = ({variables, setVariables, setCustomer, customer,  isOpen5, onClose5, onOpen4, project, products, setProducts, isOpen, onClose, onClose4, onClose3, onClose2, onClose1}) => {

const dispatch = useDispatch()
const user = useSelector(state => state.user)

const { isOpen: isOpen6, onOpen: onOpen6, onClose: onClose6 } = useDisclosure()

const handlePrevious = () => {
  setProducts({})
  onClose5()
  onOpen4()
}

const handleConfirm = () => {
  dispatch(createQuote(user[0].SellerID, {customer, project, products, variables}))
  // dispatch(getCustomerProjects(customer.CustomerID))
  onOpen6()
}

  return(
<>
  <Modal 
    isOpen={isOpen5} 
    onClose={onClose5}
    size={'3xl'}
    >
    <ModalOverlay />
    <ModalContent 
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      >
      <ModalHeader></ModalHeader>
      <ModalCloseButton
        color={'web.text2'}
        _hover={{
          color: 'web.text'
        }}
        onClick={onClose5} 
        />
      <Box color={'white'}
      >
      <Text ml={'3vw'} fontSize={'lg'}>Selected products</Text>
      <ModalBody 
        color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'} alignItems={'center'}>
        <TableContainer  mr={'0.5vw'}  ml={'0.5vw'}
          borderColor={'web.border'}
          bg={'web.sideBar'} 
          border={'1px solid'} 
          rounded={'md'}
          maxHeight={'45vh'}
          minHeight={'45vh'}
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
              Object.entries(products).map((e, i) => (
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

      </ModalBody>
      </Box>
      <ModalFooter mb={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'2vw'} mr={'2vw'}>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          onClick={()=>handlePrevious()}
          >
         Previous
        </Button>
        <Button
          colorScheme={'orange'}
          size={'sm'} 
          onClick={()=>handleConfirm()}
          >
         Confirm
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  <QuotePdfModal 
    variables={variables} 
    user={user} 
    customer={customer} 
    project={project} 
    products={products}
    onOpen6={onOpen6} 
    isOpen6={isOpen6} 
    onClose6={onClose6}
    onClose5={onClose5} 
    onClose4={onClose4}
    onClose3={onClose3}
    onClose2={onClose2}
    onClose1={onClose1} 
  />
</>
)}

export default ReviewProductsModal
