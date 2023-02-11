import { 
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
    } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDeliveryNote } from "../../redux/actions-deliveryNotes";
import CreateDeliveryNotePdf from "./CreateDeliveryNotePdf"
import DeliveryProductList from "./DeliveryProductsTable"
import '../../assets/styleSheet.css'


const CreateDeliveryModal = ({invoice, user, isOpen, onClose, invoice_products}) => {
 
  const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure()

  const dispatch = useDispatch()
  const id = invoice[0].Naturali_Invoice
 
  const [quantities, setQuantities] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState([])
  
  const deliveryID = useSelector(state => state.deliveryID)

  const handleSubmit = async () => {
      await dispatch(postDeliveryNote(id, quantities))
      onSecondModalOpen()
      onClose()
  }

  const handleSecondModalClose = () => {
    handleClear()
    onSecondModalClose()
  }
  const handleFirstModalClose = () => {
    handleClear()
    onClose()
  }
  const handleClear = () => {
    setQuantities([])
    setErrors([])
    setDisabled(true)
  }

  return(
<>
{/* Start Create delivery modal */}
  <Modal 
    isOpen={isOpen} 
    onClose={handleFirstModalClose}
    size={'6xl'}
    >
    <ModalOverlay />
    <ModalContent 
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      height={'80vh'}
      w={'66vw'}
      >
      <ModalHeader
      ml={'1vw'}
      mt={'3vh'}
      color={'web.text'}>
        Create delivery note for Invoice N° {`${invoice[0].Naturali_Invoice}`}
      </ModalHeader>
      <ModalCloseButton
        color={'web.text2'}
        _hover={{
          color: 'web.text'
        }} />
      <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'}>
        <DeliveryProductList 
        invoice_products={invoice_products} 
        setQuantities={setQuantities}
        quantities={quantities}
        errors={errors} 
        setErrors={setErrors}
        setDisabled={setDisabled}/>
      </ModalBody>
      <ModalFooter mb={'1vh'} mr={'1vw'}>
        <Button
          colorScheme={'orange'} 
          mr={3} 
          onClick={()=>handleSubmit()}
          disabled={disabled}
          >
         Confirm
        </Button>
        <Button variant='ghost' onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
{/* Finish Create delivery modal */}

{/* Start Render created delivery modal */}
  <Modal 
    isOpen={isSecondModalOpen} 
    onClose={handleSecondModalClose}
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
        <CreateDeliveryNotePdf quantities={quantities} deliveryID={deliveryID} id={id}/>
      </ModalBody>
      <ModalFooter/>
    </ModalContent>
  </Modal>
{/* Finish Render created delivery modal */}
</>
)}

export default CreateDeliveryModal