import { IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useToast } from "@chakra-ui/react"
import { HiUserAdd } from "react-icons/hi";
import CreationCustomerForm from "./createCustomer/createCustomerForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from '../../redux/actions-customers'
import { validate } from "../../utils/validateForm";

export function CreateNewCustomer() {

  const [errors, setErrors] = useState({})
  const toast = useToast()
  const [isToastShowing, setIsToastShowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [changeInput, setChangeInput] = useState(false)
  const [formData, setFormData] = useState({
    Contact_Name: '',
    City: '',
    Address: '',
    State: '',
    ZipCode: '',
    Company: '',
    Phone: '',
    Email: '',
    DiscountID: 1
  });
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    if(!isToastShowing){
      if(!changeInput){
      setIsToastShowing(true)
      return toast({
        title: 'Please complete de Info',
        description: `Need Complete the info to create a customer`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        onCloseComplete: () => setIsToastShowing(false),
      });
    }
      event.preventDefault();
      if (Object.keys(errors).length > 0) {
      setIsToastShowing(true)
      return toast({
        title: 'Please complete de Info',
        description: `Need Complete the info to create a customer`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        onCloseComplete: () => setIsToastShowing(false),
      });
    }
    dispatch(createCustomer(formData));
    handleClose()
  }
};
  const handleClose = () => {
    setFormData({
      Contact_Name: '',
      City: '',
      Address: '',
      State: '',
      ZipCode: '',
      Company: '',
      Phone: '',
      Email: '',
      DiscountID: 1
    })
    setChangeInput(false)
    setErrors({})
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
        minW={'50vw'}
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}>
          <ModalHeader color={'web.text'}>Add New Customer</ModalHeader>
          <ModalCloseButton onClick={()=>handleClose()} />
            <ModalBody >
              <CreationCustomerForm
              formData={formData}
              setFormData={setFormData}
              validate={validate}
              errors={errors}
              setErrors={setErrors}
              setChangeInput={setChangeInput}
              />
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