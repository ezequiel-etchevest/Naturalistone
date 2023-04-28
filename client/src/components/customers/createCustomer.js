import { IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react"
import { HiUserAdd } from "react-icons/hi";
import CreationCustomerForm from "./createCustomerForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from '../../redux/actions-customers'

export function CreateNewCustomer() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [formData, setFormData] = useState({
    Name: '',
    LastName: '',
    Address: '',
    State: '',
    ZipCode: '',
    Reference: '',
    Phone: '',
    Email: '',
    DiscountID: 1
  });
  console.log({formData})
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
      dispatch(createCustomer(formData));
      handleClose()
  };
  const handleClose = () => {
    setFormData({
      Name: '',
      LastName: '',
      Address: '',
      State: '',
      ZipCode: '',
      Reference: '',
      Phone: '',
      Email: '',
      DiscountID: 1
    })
    onClose()
  }

  return (
    <>
      <IconButton
      size={'lg'}
      icon={ <HiUserAdd/>}
      variant={'unstyled'} 
      display={'flex'} 
      placeContent={'center'}
      alignItems={'center'}
      color={'web.text2'} 
      _hover={{
         color: 'logo.orange'
        }}
      _active={{
        }}
      onClick={onOpen}
      />
      <Modal size={'2xl'} isOpen={isOpen} onClose={()=>handleClose()}>
        <ModalOverlay/>
        <ModalContent
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}>
          <ModalHeader color={'web.text'}>Add New Customer</ModalHeader>
          <ModalCloseButton onClick={()=>handleClose()} />
            <ModalBody >
              <CreationCustomerForm formData={formData} setFormData={setFormData}/>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='orange' mr={3} onClick={(e)=>handleSubmit(e)}>
                Submit
              </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
    }