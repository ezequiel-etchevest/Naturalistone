import { IconButton, 
        useDisclosure,
        Modal, 
        ModalOverlay, 
        ModalContent, 
        ModalHeader, 
        ModalBody, 
        ModalFooter, 
        Button, 
        useToast, 
        Progress, 
        Box} from "@chakra-ui/react";
import { HiUserAdd } from "react-icons/hi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from '../../../redux/actions-customers'
import { CustomerInfo } from "./customerInfo";
import { BillingInfo } from "./billingInfo";
import { AddressInfo } from "./addressInfo";
import { CompanyInfo } from "./companyInfo";
import { validateCompletedInputs, validateEmptyInputs } from "../../../utils/validateForm";

export function CreateCustomerModal() {

  const dispatch = useDispatch();
  const toastId = 'error-toast'
  const [errors, setErrors] = useState({})
  const [ progress, setProgress ] = useState(25)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [changeInput, setChangeInput] = useState(true)
  const [formData, setFormData] = useState({
    Contact_Name: '',
    City: '',
    Address: '',
    State: '',
    ZipCode: '',
    Phone: '',
    Email: '',
    Company: '',
    Company_Position: '',
    DiscountID: 1,
    Billing_Address: '',
    Billing_ZipCode: '',
    Billing_State: '',
    Billing_City: '',  
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors({})
    // Actualizas solo la propiedad que cambió en el objeto de formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors(
      validateCompletedInputs({
        ...formData,
        [name]: value,
      })
    );
    setChangeInput(true)
  };

  const handleSubmit = () => {
    setErrors({})
    let newErrors = validateEmptyInputs(formData, progress)
    setErrors(newErrors)
    
    if(Object.entries(newErrors).length){
      if(!toast.isActive(toastId)){
        return toast(({
          id: toastId,
          title: "Error",
          description: 'All fields must be completed',
          status: "error",
          duration: 5000,
          isClosable: true,
          }))
    }}else{
      dispatch(createCustomer(formData));
      handleClose()
    } 
  }
  const handleClose = () => {
    setFormData({
        Contact_Name: '',
        City: '',
        Address: '',
        State: '',
        ZipCode: '',
        Phone: '',
        Email: '',
        Company: '',
        Company_Position: '',
        DiscountID: 1,
        Billing_Address: '',
        Billing_ZipCode: '',
        Billing_State: '',
        Billing_City: '',
        
      })
    setChangeInput(false)
    setErrors({})
    setProgress(25)
    onClose()
  }
  const handleNextButton = () =>{
    setErrors({})
    let newErrors = validateEmptyInputs(formData, progress)
    setErrors(newErrors)

    if(Object.entries(newErrors).length){
      console.log({newErrors})
      if(!toast.isActive(toastId)){
        return toast(({
          id: toastId,
          title: "Error",
          description: 'All fields must be completed',
          status: "error",
          duration: 5000,
          isClosable: true,
          }))
    }}else{
      setProgress(progress + 25)
    }
    
  }
  const handlePreviousButton = () => {
    setProgress(progress - 25)
  }
  return (
    <>
      <IconButton
       h={'6vh'}
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
      <Modal size={'xl'} isOpen={isOpen} onClose={()=>handleClose()} >
        <ModalOverlay/>
        <ModalContent
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}>
        <Progress
        value={progress} 
        colorScheme={"orange"} 
        mb={'2vh'} 
        background={'web.border'} 
        size={'sm'} 
        borderTopRightRadius={'md'}
        borderTopLeftRadius={'md'}/>
          <ModalHeader color={'web.text'}>Create New Customer</ModalHeader>
            <ModalBody >
              {
                progress === 25 && (
                  <CustomerInfo validate={validateCompletedInputs} formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleChange={handleChange} setChangeInput={setChangeInput}/>
                )

              }
              {
                progress === 50 && (
                  <AddressInfo validate={validateCompletedInputs} formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleChange={handleChange} setChangeInput={setChangeInput} />
                )

              }
              {
                progress === 75 && (
                  <CompanyInfo validate={validateCompletedInputs} formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleChange={handleChange} setChangeInput={setChangeInput}/>
                )

              }
              {
                progress === 100 && (
                  <BillingInfo validate={validateCompletedInputs} formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleChange={handleChange} setChangeInput={setChangeInput}/>
                )

              }

            </ModalBody>
            <ModalFooter display={'flex'} justifyContent={'space-between'}>
              <Button visibility={progress === 25 ? 'hidden' : 'unset'} colorScheme='orange' mr={3} onClick={()=>handlePreviousButton()}>
              Prev
              </Button>
              {
              progress === 100 ? (
                <Button colorScheme='orange' mr={3} onClick={(e)=>handleSubmit(e)}>
                  Submit
                </Button>
              ):(
                <Button colorScheme='orange' mr={3} onClick={()=>handleNextButton()}>
                  Next
                </Button>
              )
              }
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      )
    }