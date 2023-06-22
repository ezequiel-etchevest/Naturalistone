import { ButtonGroup, IconButton, Button, useToast, useDisclosure, FormLabel, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Text, Box, Input, FormControl, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiLinkAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { linkItems } from "../../redux/actions-tasks";
import { getProjectById, getCustomerProjects } from "../../redux/actions-projects";
import AddTaskProject from "./CreateTask/AddTaskProject";
import { getInvoiceById, getInvoicesBySeller } from "../../redux/actions-invoices";
import AddTaskInvoice from "./CreateTask/AddTaskInvoice";

export const LinkInvoiceModal = ({task, user, activeCard, setActiveCard}) => {
  
  const dispatch = useDispatch();
  const toastId = 'error-toast'
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const invoices = useSelector(state => state.invoices)
  const [ formData, setFormData ] = useState({
    InvoiceID: null,
  })
  const handleClose = () => {
    onClose()
  }
  
  const handleSubmit = () => {
    dispatch(linkItems(formData, user[0].SellerID, activeCard.taskID))
    setActiveCard({...activeCard, InvoiceID: formData.InvoiceID})
    dispatch(getInvoiceById(formData.InvoiceID))
    setFormData({})
    onClose()
   }

  useEffect(()=>{
    if(activeCard && !invoices?.length){
    dispatch(getInvoicesBySeller(user[0].SellerID))
    }
  },[invoices])
  return(
    <>
      <ButtonGroup
      textColor={'web.text2'}
      h={'5vh'}
      display={'flex'}
      spacing={0}
      _hover={{
      color: 'logo.orange'
      }}
      disabled={activeCard ? activeCard.InvoiceID ? true : false : true }
      >
        <IconButton
        onClick={onOpen}
        variant={'unstyled'}           
        fontSize={'xl'}
        icon={<BiLinkAlt/>}
        disabled={activeCard ? activeCard.InvoiceID ? true : false : true }

        />
        <Button
        onClick={onOpen}
        fontSize={'md'}
        variant={'unstyled'}           
        fontWeight={'normal'}
        disabled={activeCard ? activeCard.InvoiceID ? true : false : true }
        >Link Invoice</Button>       
    </ButtonGroup>
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size={'3xl'}
      >
      <ModalOverlay/>
      <ModalContent 
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}
        >
        <ModalHeader
        color={'web.text'}>
          Link Invoice
        </ModalHeader>
        <ModalCloseButton
          color={'web.text2'}
          _hover={{
            color: 'web.text'
          }} />
        <ModalBody color={'web.text2'}>
          <AddTaskInvoice invoices={invoices} setFormData={setFormData} formData={formData} user={user}/>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={formData.InvoiceID ? false : true}
            colorScheme={'orange'} 
            mr={3} 
            onClick={handleSubmit}
            >
           Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
          </Modal>
    </>
    )
}

