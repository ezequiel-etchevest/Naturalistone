import { IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useToast } from "@chakra-ui/react"
import { HiUserAdd } from "react-icons/hi";
import CreationCustomerForm from "./createCustomerForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from '../../redux/actions-customers'
import { USStates } from "./AutocompleteState";

  
const validate = (formData) =>{
  let errors = {}
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]*$/;
  const regexNumberAndPlus = /^[\d+()\[\]-\s]*$/;
  const regexNumber = /^[0-9]+$/;
  const discount = ['0%', '5%', '10%', '15%']
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if(!formData.Contact_Name){
      errors.Contact_Name = 'Please enter your email'
    } else if(!regexNoNumber.test(formData.Contact_Name)) {
      errors.Contact_Name = 'must be a valid name'
    } 
    if(!formData.Address){
      errors.Address = 'Please enter your address'
    }
    if(!formData.ZipCode){
      errors.ZipCode = 'Please enter your zip code'
    } else if(!regexNumber.test(formData.ZipCode)) {
      errors.ZipCode = 'Please enter a valid zip code'
    }
    if(!formData.Company){
      errors.Company = 'Please enter your company'
    }
    if(!formData.DiscountID){
      errors.DiscountID = 'Please enter a discountID'
    }
    if(!formData.Phone){
      errors.Phone = 'Please enter your phone'
    } else if(!regexNumberAndPlus.test(formData.Phone)) {
      errors.Phone = 'Please enter a valid Phone'
    }
    if(!formData.Email){
      errors.Email = 'Please enter your email'
    } else if(!regexEmail.test(formData.Email)){
      errors.Email = 'Please enter a valid email'
    }
    if(!formData.State) {
      errors.State = 'Please enter a state'
    } else if(!USStates.includes(formData.State)) {
      errors.State = 'Please enter a valid state'
    }
     return errors
}

export function CreateNewCustomer() {

  const [errors, setErrors] = useState({})

  const toast = useToast()
  const [isToastShowing, setIsToastShowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formData, setFormData] = useState({
    Contact_Name: '',
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
      event.preventDefault();
      if (Object.keys(errors).length > 0) {
      setIsToastShowing(true)
      return toast({
        title: 'Please complete de Info',
        description: `need Complete the info to create a customer`,
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
      Address: '',
      State: '',
      ZipCode: '',
      Company: '',
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