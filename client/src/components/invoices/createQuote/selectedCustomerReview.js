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
    useDisclosure
    } from "@chakra-ui/react"
import { useDispatch } from 'react-redux'
import { getCustomerProjects } from "../../../redux/actions-projects"
import SelectProjectModal from "../../invoices/createQuote/customerProjects/selectProjectModal"
import '../../../assets/styleSheet.css'

const SelectedCustomerModal = ({customer, isSecondModalOpen, onSecondModalClose, setCustomer,  isOpen, onClose}) => {

const dispatch = useDispatch()
const { isOpen: isProjectModalOpen, onOpen: onProjectModalOpen, onClose: onProjectModalClose } = useDisclosure()

const handlePrevious = () => {
  setCustomer('')
  onSecondModalClose()
}

const handleNext = () => {
  dispatch(getCustomerProjects(customer.CustomerID))
  onProjectModalOpen()
  onSecondModalClose()

}

  return(

<>
  <Modal 
    isOpen={isSecondModalOpen} 
    onClose={onSecondModalClose}
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
      <Box color={'white'}>
      <Text ml={'3vw'} fontSize={'lg'}>Selected customer</Text>
      <ModalBody 
        color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'} alignItems={'center'}>
          {
            customer.CustomerID ?
            <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> ID: {customer.CustomerID}</Text>
            : null
          }
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Full Name: {customer.Contact_Name ? customer.Contact_Name : "-"}</Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Email: {customer.Email ? customer.Email : "-"}</Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Phone: {customer.Phone ? customer.Phone : "-"}</Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Company: {customer.Company ? customer.Company : "-"}</Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Discount: 
          { 
          customer.DiscountID === 4 || customer.DiscountID === 3 ? 
            customer.DiscountID === 4 ? '15 %' : '10 %'
          : 
          customer.DiscountID === 2 ?  '5 %' : "-"
          }
          </Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Address: {customer.Address ? customer.Address : "-"}</Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Zip Code: {customer.ZipCode ? customer.ZipCode : "-"}</Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> State: {customer.State ? customer.State : "-"}</Text>
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
          onClick={()=>handleNext()}
          >
         Next
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  <SelectProjectModal isProjectModalOpen={isProjectModalOpen} onProjectModalClose={onProjectModalClose} customer={customer}/>
</>
)}

export default SelectedCustomerModal

