import { IconButton, 
    useDisclosure,
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    ModalCloseButton, 
    Button, 
    useToast,
    Box, 
    Progress } from "@chakra-ui/react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateOrderFactory from "./createOrderFactories";
import { getFactories } from "../../../redux/actions-factories";
// import { createCustomer } from '../../../redux/actions-customers'
// import { CustomerInfo } from "./customerInfo";
// import { BillingInfo } from "./billingInfo";
// import { AddressInfo } from "./addressInfo";
// import { CompanyInfo } from "./companyInfo";
// import { validateCompletedInputs, validateEmptyInputs } from "../../../utils/validateForm";

export function CreateOrderModal({orders}) {

const dispatch = useDispatch();
// const toastId = 'error-toast'
// const [errors, setErrors] = useState({})
useEffect(() => {
  dispatch(getFactories(''))
}, [])

const [ progress, setProgress ] = useState(25)
// const toast = useToast()
const { isOpen, onOpen, onClose } = useDisclosure()
// const [changeInput, setChangeInput] = useState(true)
const [formData, setFormData] = useState({
  factory: {
    FactoryID: '', 
    Reference: '', 
    Factory_Name: '', 
    Phone: '', 
    Email: '', 
    WebSite: '', 
    International_Flag: '',
  },
  products:{}
});
// const handleChange = (event) => {
// const { name, value } = event.target;
// setErrors({})
// // Actualizas solo la propiedad que cambió en el objeto de formData
// setFormData((prevFormData) => ({
//   ...prevFormData,
//   [name]: value,
// }));
// setErrors(
//   validateCompletedInputs({
//     ...formData,
//     [name]: value,
//   })
// );
// setChangeInput(true)
// };
  console.log({formData})
const handleSubmit = () => {
// setErrors({})
// let newErrors = validateEmptyInputs(formData, progress)
// setErrors(newErrors)

// if(Object.entries(newErrors).length){
//   if(!toast.isActive(toastId)){
//     return toast(({
//       id: toastId,
//       title: "Error",
//       description: 'All fields must be completed',
//       status: "error",
//       duration: 5000,
//       isClosable: true,
//       }))
// }}else{
//   dispatch(createCustomer(formData));
//   handleClose()
} 
// }
const handleClose = () => {
// setFormData({
//     Contact_Name: '',
//     City: '',
//     Address: '',
//     State: '',
//     ZipCode: '',
//     Phone: '',
//     Email: '',
//     Company: '',
//     Company_Position: '',
//     DiscountID: 1,
//     Billing_Address: '',
//     Billing_ZipCode: '',
//     Billing_State: '',
//     Billing_City: '',
    
//   })
// setChangeInput(false)
// setErrors({})
// setProgress(25)
// onClose()
}
const handleNextButton = () =>{
// setErrors({})
// let newErrors = validateEmptyInputs(formData, progress)
// setErrors(newErrors)
// console.log({errors})
// if(Object.entries(newErrors).length){
//   console.log({newErrors})
//   if(!toast.isActive(toastId)){
//     return toast(({
//       id: toastId,
//       title: "Error",
//       description: 'All fields must be completed',
//       status: "error",
//       duration: 5000,
//       isClosable: true,
//       }))
// }}else{
//   setProgress(progress + 25)
}

// }
const handlePreviousButton = () => {
// setProgress(progress - 25)
}
return (
  <>
    <Box w={'80vw'} mt={'2vh'} h={'6vh'} display="flex" justifyContent="flex-end">
      <IconButton
        size={'lg'}
        icon={<AiOutlineFileAdd />}
        variant={'unstyled'}
        display={'flex'}
        placeContent={'center'}
        alignItems={'center'}
        color={'web.text2'}
        _hover={{
          color: 'logo.orange'
        }}
        _active={{}}
        onClick={onOpen}
      />
    </Box>
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size={'5xl'}
      motionPreset='slideInRight'
      >
      <ModalOverlay />
      <ModalContent 
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}
        >
        <Progress value={progress} 
          colorScheme={"orange"} 
          mb={'2vh'} 
          background={'web.border'} 
          size={'sm'} 
          borderTopRightRadius={'md'}
          borderTopLeftRadius={'md'}
          />
        <ModalCloseButton color={'web.text2'} mt={'2vh'} mr={'0.5vw'} position={'absolute'}/>
        <ModalBody color={'web.text2'}>
          {
            progress === 25 && (
              <CreateOrderFactory formData={formData} setFormData={setFormData}/>
            )
          }
        </ModalBody>
        <ModalFooter display={'flex'} justifyContent={'space-between'} mt={'2vh'}>
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