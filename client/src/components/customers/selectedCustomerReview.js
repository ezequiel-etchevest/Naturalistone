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
import '../../assets/styleSheet.css'
import { getCustomerProjects } from "../../redux/actions-projects"
import SelectProjectModal from "../customerProjects/selectProjectModal"

const SelectedCustomerModal = ({customer, isSecondModalOpen, onSecondModalClose, setCustomer,  isOpen, onClose}) => {

const dispatch = useDispatch()
const { isOpen: isThirthModalOpen, onOpen: onThirthModalOpen, onClose: onThirthModalClose } = useDisclosure()

const handlePrevious = () => {
  setCustomer('')
  onSecondModalClose()
}

const handleNext = () => {
  dispatch(getCustomerProjects(customer.CustomerID))
  onThirthModalOpen()
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
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> ID: {customer.CustomerID}</Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Full Name: {customer.Name ? customer.Name : "-"} {customer.LastName ? customer.LastName : "-"}</Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Email: {customer.Email ? customer.Email : "-"}</Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Phone: {customer.Phone ? customer.Phone : "-"}</Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Reference: {customer.Reference ? customer.Reference : "-"}</Text>
          <Text border={'1px'} borderRadius={'md'} w={'25vw'} mb={'1.5vh'}> Discount %: {customer.DiscountID ? customer.DiscountID : "-"}</Text>
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
  <SelectProjectModal isThirthModalOpen={isThirthModalOpen} onThirthModalClose={onThirthModalClose} customer={customer}/>
</>
)}

export default SelectedCustomerModal

{/* <Modal 
// isOpen={isSecondModalOpen} 
// onClose={handleSecondModalClose}
size={'4xl'}
>
<ModalOverlay />
<ModalContent 
rounded={'md'} 
mt={'2vh'} 
mb={'2vh'} 
w={'64vw'} 
bg={'web.sideBar'} 
border={'1px solid'} 
borderColor={'web.border'}
>
<ModalHeader/>
<ModalBody color={'web.text2'} w={'100%'} h={'100%'}>
{/* <CreateDeliveryNotePdf quantities={quantities} deliveryID={deliveryID} id={id}/> */}
// </ModalBody>
// <ModalFooter/>
// </ModalContent>
// </Modal>
// Finish Render created delivery modal */}