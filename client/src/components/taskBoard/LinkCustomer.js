import { ButtonGroup, IconButton, Button, useToast, useDisclosure, FormLabel, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Text, Box, Input, FormControl, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiLinkAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { AddTask } from "./CreateTask/AddTask";
import AddTaskCustomer from "./CreateTask/AddTaskCustomer";
import { getCustomerById, getCustomers } from "../../redux/actions-customers";
import { linkItems } from "../../redux/actions-tasks";


export const LinkCustomerModal = ({task, user, activeCard, setActiveCard}) => {
  
  const dispatch = useDispatch();
  const toastId = 'error-toast'
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const customers = useSelector(state => state.customers)
  const [ formData, setFormData ] = useState({
    CustomerID: null,
  })
  
  const handleClose = () => {
    onClose()
  }
  
  const handleSubmit = () => {
    dispatch(linkItems(formData, user[0].SellerID, activeCard.taskID))
    setActiveCard({...activeCard, CustomerID: formData.CustomerID})
    dispatch(getCustomerById(formData.CustomerID))
    setFormData({})
    onClose()
   }

  useEffect(()=>{
    if(!customers.length)dispatch(getCustomers(''))
  },[customers])
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
      disabled={activeCard? activeCard.CustomerID ? true : false : true}
      >
        <IconButton
        onClick={onOpen}
        variant={'unstyled'}           
        fontSize={'xl'}
        icon={<BiLinkAlt/>}
        disabled={activeCard? activeCard.CustomerID ? true : false : true}
        />
        <Button
        onClick={onOpen}
        fontSize={'md'}
        variant={'unstyled'}           
        fontWeight={'normal'}
        disabled={activeCard? activeCard.CustomerID ? true : false : true}

        >Link Customer</Button>       
    </ButtonGroup>
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size={'2xl'}
      >
      <ModalOverlay/>
      <ModalContent 
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}
        >
        <ModalHeader
        color={'web.text'}>
          Link Customer
        </ModalHeader>
        <ModalCloseButton
          color={'web.text2'}
          _hover={{
            color: 'web.text'
          }} />
        <ModalBody color={'web.text2'}>
          <AddTaskCustomer customers={customers} setFormData={setFormData} formData={formData}/>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={formData.CustomerID ? false : true}
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

