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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomersEditModal from './customersEditModal';
import CustomersEditModal1 from './customersEditModal1';
import CustomersEditModal2 from './customerEditModal2';
import { FiEdit } from "react-icons/fi";
import { createAddressCustomer, getCustomerById, updateCustomer } from "../../redux/actions-customers";
import { validateCompletedInputsEditCustomer } from "../../utils/validateForm";
import { updateAddress } from "../../redux/actions-address";
import { USStates } from "../../utils/USStates"; 

export function CustomerEdit({user, customer, sellers}) {

const dispatch = useDispatch();
const [errorsCustomer, setErrorsCustomer] = useState({})
const [ progress, setProgress ] = useState(33.33)
const toast = useToast()
const { isOpen, onOpen, onClose } = useDisclosure()
const [isToastShowing, setIsToastShowing] = useState(false)
const [disabled, setDisabled] = useState(true)

const discount = (discountId) => {
  if(discountId === 4) return 15
  else if(discountId === 3) return 10
  else if(discountId === 2) return 5
  else return 0
}

const normalizeValue = (value) => {
  return value === null || value === "null" || value === '' || value === 'undefined' ? "" : value;
};

const [inputs, setInputs] = useState({
    Contact_Name: normalizeValue(customer.Contact_Name),
    City: normalizeValue(!customer.shipping_address_id ? customer.City : customer.shipping_city),
    Address: normalizeValue(!customer.shipping_address_id ? customer.Address : customer.shipping_address),
    Address2: normalizeValue(!customer.shipping_address_id ? '' : customer.shipping_address2),
    State: normalizeValue(!customer.shipping_address_id ? customer.State : customer.shipping_state),
    ZipCode: normalizeValue(!customer.shipping_address_id ? customer.ZipCode : customer.shipping_zip_code),
    Company: normalizeValue(customer.Company),
    Company_Position: normalizeValue(customer.Company_Position),
    Phone: normalizeValue(customer.Phone),
    Email: normalizeValue(customer.Email),
    DiscountID: normalizeValue(customer.DiscountID),
    DiscountRate: normalizeValue(customer.DiscountRate),
    Billing_Address: normalizeValue(!customer.billing_address_id ? customer.Billing_Address : customer.billing_address),
    Billing_Address2: normalizeValue(!customer.billing_address_id ? '' : customer.billing_address2),
    Billing_City: normalizeValue(!customer.billing_address_id ? customer.Billing_City : customer.billing_city),
    Billing_ZipCode: normalizeValue(!customer.billing_address_id ? customer.Billing_ZipCode : customer.billing_zip_code),
    Billing_State: normalizeValue(!customer.billing_address_id ? customer.Billing_State : customer.billing_state),
    CustomerID: normalizeValue(customer.CustomerID),
    Seller: normalizeValue(customer.SellerID)
  });

  function validateFields() {
  if(errorsCustomer?.Address?.length || errorsCustomer?.State?.length || errorsCustomer?.City?.length || errorsCustomer?.ZipCode?.length){
    return setDisabled(true)
  }
  if (inputs.State === '' && inputs.City === '' && inputs.ZipCode === '' && inputs.Address === '') {
    return setDisabled(false)
  } else if (inputs.State !== '' && inputs.City !== '' && inputs.ZipCode !== '' && inputs.Address !== '') {
    return setDisabled(false)
  } else {
    return setDisabled(true)
  }
}

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
      [name]: customer[name] === "undefined" || customer[name] === null ? '' : customer[name]
      }
    )
  }

const handleChangeCustomer = (e) => {
  const { name, value } = e.target;

  setInputs((prevInputs) => ({
    ...prevInputs,
    [name]: value,
  }));

  setErrorsCustomer(validateCompletedInputsEditCustomer({
    ...inputs,
    [name]: value,
  }));
};

const handleChange = (e) => {
  const { name, value } = e.target;

  setInputs((prevInputs) => ({
    ...prevInputs,
    [name]: value,
  }));

  const updatedErrors = validateCompletedInputsEditCustomer({
    ...inputs,
    [name]: value,
  });

  setErrorsCustomer((prevErrors) => ({
    ...prevErrors,
    [name]: updatedErrors[name],
  }));

};

const handleClose = () => {
setInputs({
  Contact_Name: normalizeValue(customer.Contact_Name),
  City: normalizeValue(!customer.shipping_address_id ? customer.City : customer.shipping_city),
  Address: normalizeValue(!customer.shipping_address_id ? customer.Address : customer.shipping_address),
  Address2: normalizeValue(!customer.shipping_address_id ? '' : customer.shipping_address2),
  State: normalizeValue(!customer.shipping_address_id ? customer.State : customer.shipping_state),
  ZipCode: normalizeValue(!customer.shipping_address_id ? customer.ZipCode : customer.shipping_zip_code),
  Company: normalizeValue(customer.Company),
  Company_Position: normalizeValue(customer.Company_Position),
  Phone: normalizeValue(customer.Phone),
  Email: normalizeValue(customer.Email),
  DiscountID: normalizeValue(customer.DiscountID),
  DiscountRate: normalizeValue(customer.DiscountRate),
  Billing_Address: normalizeValue(!customer.billing_address_id ? customer.Billing_Address : customer.billing_address),
  Billing_Address2: normalizeValue(!customer.billing_address_id ? '' : customer.billing_address2),
  Billing_City: normalizeValue(!customer.billing_address_id ? customer.Billing_City : customer.billing_city),
  Billing_ZipCode: normalizeValue(!customer.billing_address_id ? customer.Billing_ZipCode : customer.billing_zip_code),
  Billing_State: normalizeValue(!customer.billing_address_id ? customer.Billing_State : customer.billing_state),
  CustomerID: normalizeValue(customer.CustomerID),
  Seller: normalizeValue(customer.SellerID)
})
setErrorsCustomer({})
setProgress(33.33)
onClose()
}

const handleNextButton = () =>{
  setErrorsCustomer({})
  setProgress(progress + 33.33)
}

const handlePreviousButton = () => {
  if(progress === 33.33) {
    return
  }
  setProgress(progress - 33.33)
}

const handleSubmit = async () => {
  if(!isToastShowing){
    await dispatch(updateCustomer(customer.CustomerID, inputs))
    if(customer.shipping_address_id) {
      await dispatch(updateAddress(customer.shipping_address_id, 
        {
          address: inputs.Address, city: inputs.City, state: inputs.State, zip_code: inputs.ZipCode, address2: inputs.Address2
        }
      ))
    } else {
      await dispatch(createAddressCustomer(customer.CustomerID, 
        {
          Address: inputs.Address, City: inputs.City, State: inputs.State, ZipCode: inputs.ZipCode, AddressInShipping: true, Address2: inputs.Address2
        }
        ))
    }
    if(customer.billing_address_id) {
      await dispatch(updateAddress(customer.billing_address_id, 
        {
          address: inputs.Billing_Address, city: inputs.Billing_City, state: inputs.Billing_State, zip_code: inputs.Billing_ZipCode, address2: inputs.Billing_Address2
        }
      ))
    } else {
      await dispatch(createAddressCustomer(customer.CustomerID, 
        {
          Address: inputs.Billing_Address, City: inputs.Billing_City, State: inputs.Billing_State, ZipCode: inputs.Billing_ZipCode, AddressInShipping: false, Address2: inputs.Billing_Address2
        }
        ))
    }
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
  await dispatch(getCustomerById(customer.CustomerID))
  onClose()
  setErrorsCustomer({})
  setProgress(33.33)
}

useEffect(() => {
    if(progress === 33.33) {
    if(
      (inputs.Contact_Name.length &&
      inputs.Email.length &&
      inputs.Company_Position.length &&
      inputs.Company_Position === 'Home Owner' &&
      (inputs.Company !== '' ||
      inputs.Company === '')) ||
      (inputs.Contact_Name.length &&
      inputs.Email.length &&
      inputs.Company_Position.length &&
      inputs.Company_Position !== 'Home Owner' &&
      inputs.Company !== '')
      ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
    if(errorsCustomer?.Contact_Name?.length || errorsCustomer?.Email?.length || errorsCustomer?.Company_Position?.length || errorsCustomer?.DiscountRate?.length){
      setDisabled(true)
    }
  }
  if(progress === 66.66) {
    setDisabled(true)
    if(inputs.Billing_Address.length > 0 && inputs.Billing_City.length > 0 && inputs.Billing_State.length > 0 && inputs.Billing_ZipCode.length > 0) {
      setDisabled(false)
    }
    if(errorsCustomer?.Billing_Address?.length || errorsCustomer?.Billing_City?.length || errorsCustomer?.Billing_ZipCode?.length || errorsCustomer?.Billing_State?.length){
      setDisabled(true)
    }
  }
  if (progress === 99.99) {
    validateFields();
  }
},[inputs, errorsCustomer, progress]);

useEffect(() => {
  setInputs({
  Contact_Name: normalizeValue(customer.Contact_Name),
  City: normalizeValue(!customer.shipping_address_id ? customer.City : customer.shipping_city),
  Address: normalizeValue(!customer.shipping_address_id ? customer.Address : customer.shipping_address),
  Address2: normalizeValue(!customer.shipping_address_id ? '' : customer.shipping_address2),
  State: normalizeValue(!customer.shipping_address_id ? customer.State : customer.shipping_state),
  ZipCode: normalizeValue(!customer.shipping_address_id ? customer.ZipCode : customer.shipping_zip_code),
  Company: normalizeValue(customer.Company),
  Company_Position: normalizeValue(customer.Company_Position),
  Phone: normalizeValue(customer.Phone),
  Email: normalizeValue(customer.Email),
  DiscountID: normalizeValue(customer.DiscountID),
  DiscountRate: normalizeValue(customer.DiscountRate),
  Billing_Address: normalizeValue(!customer.billing_address_id ? customer.Billing_Address : customer.billing_address),
  Billing_Address2: normalizeValue(!customer.billing_address_id ? '' : customer.billing_address2),
  Billing_City: normalizeValue(!customer.billing_address_id ? customer.Billing_City : customer.billing_city),
  Billing_ZipCode: normalizeValue(!customer.billing_address_id ? customer.Billing_ZipCode : customer.billing_zip_code),
  Billing_State: normalizeValue(!customer.billing_address_id ? customer.Billing_State : customer.billing_state),
  CustomerID: normalizeValue(customer.CustomerID),
  Seller: normalizeValue(customer.SellerID)
})
},[customer])


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
    borderColor={'web.border'}
    minH={"50vh"}
    >
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
              handleChange={handleChangeCustomer}
              errorsCustomer={errorsCustomer}
              setErrorsCustomer={setErrorsCustomer}
              sellers={sellers}
              user={user}
              />
            )
          }
          {
            progress === 66.66 && (
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
              USStates={USStates}
              validateCompletedInputsEditCustomer={validateCompletedInputsEditCustomer}
              />
            )

          }
          {
            progress === 99.99 && (
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
              USStates={USStates}
              />
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

export default CustomerEdit