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
    Tooltip} from "@chakra-ui/react";
import { HiUserAdd } from "react-icons/hi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomersEditModal from './customersEditModal';
import CustomersEditModal1 from './customersEditModal1';
import CustomersEditModal2 from './customerEditModal2';
import { FiEdit } from "react-icons/fi";
import { updateCustomer } from "../../redux/actions-customers";
import { validateCompletedInputsEditCustomer, validateEmptyInputsEditCustomer } from "../../utils/validateForm";

export function CustomerEdit({customer}) {

const dispatch = useDispatch();
const [errorsCustomer, setErrorsCustomer] = useState({})
const [errors, setErrors] = useState({})
const [ progress, setProgress ] = useState(33.33)
const toast = useToast()
const { isOpen, onOpen, onClose } = useDisclosure()
const [isToastShowing, setIsToastShowing] = useState(false)
const discount = (discountId) => {
  if(discountId === 4) return 15
  else if(discountId === 3) return 10
  else if(discountId === 2) return 5
  else return 0
}

const normalizeValue = (value) => {
  return value === null || value === "null" || value === '' ? "" : value;
};

const [inputs, setInputs] = useState({
    Contact_Name: normalizeValue(customer.Contact_Name),
    City: normalizeValue(customer.City),
    Address: normalizeValue(customer.Address),
    State: normalizeValue(customer.State),
    ZipCode: normalizeValue(customer.ZipCode),
    Company: normalizeValue(customer.Company),
    Company_Position: normalizeValue(customer.Company_Position),
    Phone: normalizeValue(customer.Phone),
    Email: normalizeValue(customer.Email),
    DiscountID: normalizeValue(customer.DiscountID),
    DiscountRate: discount(normalizeValue(customer.DiscountRate)),
    Billing_Address: normalizeValue(customer.Billing_Address),
    Billing_City: normalizeValue(customer.Billing_City),
    Billing_ZipCode: normalizeValue(customer.Billing_ZipCode),
    Billing_State: normalizeValue(customer.Billing_State),
    CustomerID: normalizeValue(customer.CustomerID)
  });
  
const handleCheck = (e) => {
  const {name, value} = e
    setInputs({
      ...inputs,
      [name]: value
    })
  }
    
const handleCancel = (e) => {
  const {name} = e
    setInputs({
      ...inputs,
      [name]: customer[name] 
      }
    )
  }

const handleChange = (e) =>{
  setErrorsCustomer({})
  const {name, value} = e.target
  setInputs({
    ...inputs,
    [name]: value})
  setErrorsCustomer(
    validateCompletedInputsEditCustomer({
      ...inputs,
      [name]: value,
    }, progress)
  );
}

const handleClose = () => {
setInputs({
  Contact_Name: normalizeValue(customer.Contact_Name),
  City: normalizeValue(customer.City),
  Address: normalizeValue(customer.Address),
  State: normalizeValue(customer.State),
  ZipCode: normalizeValue(customer.ZipCode),
  Company: normalizeValue(customer.Company),
  Company_Position: normalizeValue(customer.Company_Position),
  Phone: normalizeValue(customer.Phone),
  Email: normalizeValue(customer.Email),
  DiscountID: normalizeValue(customer.DiscountID),
  DiscountRate: discount(normalizeValue(customer.DiscountRate)),
  Billing_Address: normalizeValue(customer.Billing_Address),
  Billing_City: normalizeValue(customer.Billing_City),
  Billing_ZipCode: normalizeValue(customer.Billing_ZipCode),
  Billing_State: normalizeValue(customer.Billing_State),
  CustomerID: normalizeValue(customer.CustomerID)})
setErrors({})
setProgress(33.33)
onClose()
}

const handleNextButton = () =>{
  setProgress(progress + 33.33)
}

const handlePreviousButton = () => {
  if(progress === 33.33) {
    return
  }
setProgress(progress - 33.33)
}

const handleSubmit = () => {
  if(!isToastShowing){
    dispatch(updateCustomer(customer.CustomerID, inputs))
    setIsToastShowing(true)
    toast({
      title: 'Update Successful',
      description: "The update was successful",
      status: 'success',
      duration: 9000,
      isClosable: true,
      onCloseComplete:() => setIsToastShowing(false)
    })
  }
  onClose()
  handleClose()
} 

return (
<>
  <Tooltip label={"Edit Customer"} placement={'bottom-start'} fontWeight={'hairline'}>
  <IconButton
  size={'lg'}
  icon={ <FiEdit/>}
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
  </ Tooltip>
  <Modal size={'xl'} isOpen={isOpen} onClose={()=>handleClose()} >
    <ModalOverlay/>
    <ModalContent
    bg={'web.sideBar'}
    border={'1px solid'}
    maxW={'52vw'}
    borderColor={'web.border'}>
    <Progress
    value={progress} 
    colorScheme={"orange"} 
    mb={'2vh'} 
    background={'web.border'} 
    size={'sm'} 
    borderTopRightRadius={'md'}
    borderTopLeftRadius={'md'}/>
      {/* <ModalHeader color={'web.text'}>Edit Customer</ModalHeader> */}
        <ModalBody >
          {
            progress === 33.33 && (
              <CustomersEditModal
              inputs={inputs}
              setInputs={setInputs}
              updateCustomer={updateCustomer}
              isToastShowing={isToastShowing}
              setIsToastShowing={setIsToastShowing}
              handleCheck={handleCheck}
              handleCancel={handleCancel}
              handleChange={handleChange}
              errorsCustomer={errorsCustomer}
              setErrorsCustomer={setErrorsCustomer}
              />
            )

          }
                    {
            progress === 66.66 && (
              <CustomersEditModal1
              inputs={inputs}
              setInputs={setInputs}
              updateCustomer={updateCustomer}
              isToastShowing={isToastShowing}
              setIsToastShowing={setIsToastShowing}
              handleCheck={handleCheck}
              handleCancel={handleCancel}
              handleChange={handleChange}
              errorsCustomer={errorsCustomer}
              setErrorsCustomer={setErrorsCustomer}
              />
            )

          }
          {
            progress === 99.99 && (
              <CustomersEditModal2
              inputs={inputs}
              setInputs={setInputs}
              updateCustomer={updateCustomer}
              isToastShowing={isToastShowing}
              setIsToastShowing={setIsToastShowing}
              handleCheck={handleCheck}
              handleCancel={handleCancel}
              handleChange={handleChange}
              errorsCustomer={errorsCustomer}
              setErrorsCustomer={setErrorsCustomer}
              />
            )

          }

        </ModalBody>
        <ModalFooter display={'flex'} justifyContent={'space-between'}>
          <Button visibility={progress === 33.33 ? 'hidden' : 'unset'} colorScheme='orange' mr={3} onClick={()=>handlePreviousButton()}>
          Prev
          </Button>
          {
          progress === 99.99 ? (
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

export default CustomerEdit