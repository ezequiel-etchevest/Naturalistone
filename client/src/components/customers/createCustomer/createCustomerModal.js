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
        Box,
        Text} from "@chakra-ui/react";
import { HiUserAdd } from "react-icons/hi";
import { useEffect, useState } from "react";
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
  const [ progress, setProgress ] = useState(33.33)
  const [ disabled, setDisabled ] = useState(false)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [changeInput, setChangeInput] = useState(true)
  const [formData, setFormData] = useState({
    Contact_Name: '',
    City: '',
    Address: '',
    Address2: '',
    State: '',
    ZipCode: '',
    Phone: '',
    Email: '',
    Nickname: '',
    Company: '',
    Company_Position: '',
    DiscountID: 1,
    Billing_Address: '',
    Billing_Address2: '',
    Billing_ZipCode: '',
    Billing_State: '',
    Billing_City: '',
    Billing_NickName: '',
    ShippingAddressInBilling: false
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
      validateEmptyInputs({
        ...formData,
        [name]: value,
      }, progress)
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
    setProgress(33.33)
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
        }
      return;
  }else{
      setProgress(progress + 33.33)
    }
    
  }
  const handlePreviousButton = () => {
    setProgress(progress - 33.33)
  }

  useEffect(() => {
    const newErrorsEmptyInputs = validateEmptyInputs(formData, progress)
    if (progress === 33.33) {
      if (formData?.Contact_Name === '' || formData?.Email === '' || formData?.Phone === '' || Object.entries(newErrorsEmptyInputs).length) setDisabled(true)
      else setDisabled(false)
    } else if (progress === 66.66) {
        // if (formData?.Address === '' || formData?.State === '' || formData?.City === '' || formData?.ZipCode === '' || Object.entries(newErrorsEmptyInputs).length) setDisabled(true)
        // else setDisabled(false)
    // } else if (progress === 75) {
        if ((formData?.Company_Position !== "Home Owner" && formData?.Company === '') || formData?.Company_Position === '' || Object.entries(newErrorsEmptyInputs).length) setDisabled(true)
        else setDisabled(false)
  } else {
        if (formData?.Billing_Address === '' || formData?.Billing_State === '' || formData?.Billing_City === '' || formData?.Billing_ZipCode === '' || Object.entries(newErrorsEmptyInputs).length) setDisabled(true)
        else setDisabled(false)
}
  }, [formData, progress])

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
      <Modal
      isOpen={isOpen}
      onClose={()=>handleClose()}
      >
        <ModalOverlay/>
        <ModalContent
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}
        minH={progress === 99.99 ? "60vh" : '50vh'}
        minW={progress === 99.99 ? '50vw' : '35vw'}
        maxH={progress === 99.99 ? "80vh" : ''}
        >
        <Progress
        value={progress} 
        colorScheme={"orange"} 
        mb={'2vh'} 
        background={'web.border'} 
        size={'sm'} 
        borderTopRightRadius={'md'}
        borderTopLeftRadius={'md'}/>
          {/* <ModalHeader color={'web.text'}>Create New Customer</ModalHeader> */}
            <Text ml={'3vw'} mt={"2vh"} mb={'4vh'} fontSize={'lg'} w={'14vw'} color={'white'} alignSelf={'flex-start'}>Customer review</Text> 
            <ModalBody >
              {
                progress === 33.33 && (
                  <CustomerInfo validate={validateCompletedInputs} formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleChange={handleChange} setChangeInput={setChangeInput}/>
                )

              }
              {/* {
                progress === 50 && (
                  <AddressInfo validate={validateCompletedInputs} formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleChange={handleChange} setChangeInput={setChangeInput} />
                )

              } */}
              {
                progress === 66.66 && (
                  <CompanyInfo validate={validateCompletedInputs} formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleChange={handleChange} setChangeInput={setChangeInput}/>
                )

              }
              {
                progress === 99.99 && (
                  <BillingInfo validate={validateCompletedInputs} formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleChange={handleChange} setChangeInput={setChangeInput}/>
                )

              }

            </ModalBody>
            <ModalFooter
              mb={"2vh"}
              mt={"2vh"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"space-between"}
              ml={"1vw"}
              mr={"0.5vw"}>
              <Button visibility={progress === 33.33 ? 'hidden' : 'unset'} colorScheme='orange' mr={3} onClick={()=>handlePreviousButton()}>
              Prev
              </Button>
              {
              progress === 99.99 ? (
                <Button colorScheme='orange' mr={3} onClick={(e)=>handleSubmit(e)} disabled={disabled}>
                  Submit
                </Button>
              ):(
                <Button colorScheme='orange' mr={3} onClick={()=>handleNextButton()} disabled={disabled}>
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