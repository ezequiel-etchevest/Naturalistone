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
    } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DeliveryForm from "./DeliveryForm";
import { postDeliveryNote } from "../../redux/actions-deliveryNotes";
import LoadPdfDelivery from "../deliveryQuotes/deliveryNotePdf"

const DeliveryModal = ({invoice, user, isOpen, onClose, invoice_products}) => {
 
  const dispatch = useDispatch()
  const id = invoice[0].Naturali_Invoice
 
  const [quantities, setQuantities] = useState([])
 
  
  const handleSubmit = () => {
    dispatch(postDeliveryNote(id, quantities))
    onClose()
  }

  return(

  <Modal 
    isOpen={isOpen} 
    onClose={onClose}
    size={'8xl'}
    >
    <ModalOverlay />
    <ModalContent 
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      height={'82vh'}
      w={'62vw'}
      >
      <ModalHeader
      ml={'1vw'}
      mt={'3vh'}
      color={'web.text'}>
        Creating a delivery note for Invoice N° {`${invoice[0].Naturali_Invoice}`}
      </ModalHeader>
      <ModalCloseButton
        color={'web.text2'}
        _hover={{
          color: 'web.text'
        }} />
      <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'}>
        <DeliveryForm 
          invoice={invoice} 
          user={user} 
          invoice_products={invoice_products} 
          setQuantities={setQuantities} 
          quantities={quantities}/>
      </ModalBody>
      <ModalFooter mb={'1vh'} mr={'1vw'}>
        <Button
          colorScheme={'orange'} 
          mr={3} 
          onClick={()=>handleSubmit()}
          >
         Confirm
        </Button>
        <Button variant='ghost' onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)}

export default DeliveryModal