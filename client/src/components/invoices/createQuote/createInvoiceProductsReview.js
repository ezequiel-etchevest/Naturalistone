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

const ReviewProductsModal = ({ isReviewModalOpen, onReviewModalClose, onQuotesModalOpen, setCustomer, customer, project, products, setProducts, isOpen, onClose, onProjectModalClose}) => {

const dispatch = useDispatch()
const user = useSelector(state => state.user)
const posted_quote = useSelector(state => state.posted_quote)
const { isOpen: isPdfModalOpen, onOpen: onPdfModalOpen, onClose: onPdfModalClose } = useDisclosure()

const handlePrevious = () => {
  setProducts([])
  onReviewModalClose()
  onQuotesModalOpen()
}

const handleConfirm = () => {
  dispatch(createQuote(user[0].SellerID, {customer, project, products}))
  // dispatch(getCustomerProjects(customer.CustomerID))
  onReviewModalClose()
  // onProjectModalClose()
  onPdfModalOpen()
}

  return(
<>
  <Modal 
    isOpen={isReviewModalOpen} 
    onClose={onReviewModalClose}
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
        onClick={onClose} 
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
          p={'3vh'}>
          <Table color={'web.text'} variant={'simple'} size={'sm'}>
            <Thead h={'6vh'}>
              <Tr>  
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Quantities</Th>
                <Th color={'web.text2'} fontSize={'2xs'} >Product Name</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Type</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Size</Th>
                <Th color={'web.text2'} fontSize={'2xs'} textAlign={'center'}>Thickness</Th>
                <Th color={'web.text2'} fontSize={'2xs'} w={'10vw'} textAlign={'center'}>Finish</Th>
              </Tr>
            </Thead>
            <Tbody>
            {
              products.map((e, i) => (
                <Tr
                cursor={'pointer'} 
                key={i}
                _hover={{
                  bg: 'web.navBar',
                  color: 'logo.orange'
                }}>
                  <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e.quantity}</Td>
                  <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e.prodName}</Td>
                  <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e.type}</Td>
                  <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e.size}</Td>
                  <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e.thickness}</Td>
                  <Td maxW={'2vw'} fontSize={'2xs'} textAlign={'center'}>{e.finish}</Td>
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
  <QuotePdfModal user={user} onPdfModalOpen={onPdfModalOpen} isPdfModalOpen={isPdfModalOpen} onPdfModalClose={onPdfModalClose} customer={customer} project={project} products={products}/>
</>
)}

export default ReviewProductsModal

