import { 
    Text,
    Box,
    Stack,
    StackDivider,
    Editable,
    EditableInput,
    EditablePreview,
    useEditableControls,
    ButtonGroup,
    IconButton,
    Flex,
    Input,
    Tooltip,
    useDisclosure,
    Button,
    Select,
    } from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi'
import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
// import '../../../assets/styleSheet.css'
import { useState } from "react"
import { validateCompletedInputs, validateEmptyInputsCreateQuote } from "../../utils/validateForm"
import { useDispatch } from "react-redux";
import { updateCustomer } from "../../redux/actions-customers";

const CustomersEdit = ({onOpen, onClose, isOpen, customer}) => {

  const toast = useToast()
  const [isToastShowing, setIsToastShowing] = useState(false)
  const dispatch = useDispatch()
  const [errorsCustomer, setErrorsCustomer] = useState({})
  const [inputs, setInputs] = useState({
    Contact_Name: customer.Contact_Name,
    City: customer.City,
    Address: customer.Address,
    State: customer.State,
    ZipCode: customer.ZipCode,
    Company: customer.Company,
    Company_Position: customer.Company_Position,
    Phone: customer.Phone,
    Email: customer.Email,
    DiscountID: customer.DiscountID,
    DiscountRate: customer.DiscountRate,
    Billing_Address:customer.Billing_Address | null,
    Billing_City:customer.Billing_City | null,
    Billing_ZipCode:customer.Billing_ZipCode | null,
    Billing_State:customer.Billing_State | null,
    CustomerID: customer.CustomerID
  }
 )

 console.log('customer', customer)

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
    validateEmptyInputsCreateQuote({
      ...inputs,
      [name]: value,
    })
  );
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
}

function EditableControls(name, value) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()
  
  return isEditing ? (
    <ButtonGroup justifyContent='center' alignItems={'center'} size='xs' h={'4vh'}>
      <IconButton 
        icon={<CheckIcon />} 
        variant={'unstyled'} 
        display={'flex'} 
        borderRadius={'sm'} 
        placeContent={'center'}
        alignItems={'center'}
        color={'web.text2'} 
        _hover={{
           color: 'logo.orange'
           }}
        _active={{
        }}
        {...getSubmitButtonProps({ onClick: ()=>handleCheck(name, value) })}
        />
      <IconButton
        icon={<CloseIcon />} 
        variant={'unstyled'} 
        display={'flex'} 
        borderRadius={'sm'} 
        placeContent={'center'}
        alignItems={'center'}
        color={'web.text2'} 
        _hover={{
           color: 'logo.orange'
           }}
        _active={{
        }}
        {...getCancelButtonProps({ onClick: ()=>handleCancel(name, value) })} 
        />
    </ButtonGroup>
  ) : (
    <Flex justifyContent='center' alignItems={'center'}>
      <IconButton  
        h={'4vh'}
        icon={<EditIcon />} 
        variant={'unstyled'} 
        display={'flex'} 
        borderRadius={'sm'} 
        placeContent={'center'}
        alignItems={'center'}
        justifyItems={'center'}
        fontSize={'md'}
        color={'web.text2'} 
        _hover={{
           color: 'logo.orange'
           }}
        _active={{
        }}
        {...getEditButtonProps()} />
    </Flex>
  )
}

return (
<>
      <Box 
        display={'flex'} 
        flexDir={'column'} 
        alignItems={'center'}>
          <ButtonGroup
            onClick={onOpen}
            display={'flex'}
            spacing={0}
            ml={'80px'}
            >
            <Tooltip placement={'bottom-start'} label={'Edit Customer'} fontWeight={'hairline'}>      
              <IconButton
                icon={ <FiEdit/>}
                variant={'unstyled'} 
                display={'flex'} 
                borderRadius={'sm'} 
                placeContent={'center'}
                alignItems={'center'}
                fontSize={'xl'}
                color={'web.text2'} 
                _hover={{
                color: 'logo.orange'
              }}
                _active={{
                }}/>
          </Tooltip>
        </ButtonGroup>
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent
        mb={'20px'} 
        maxW={'770px'} 
        maxH={'900px'}
        bg={'web.sideBar'}
        scrollBehavior={'inside'}
        border={'1px solid'}
        borderColor={'web.border'}>
        <ModalCloseButton />
        <ModalBody>
        <Box
          maxWidth={'1000px'}
          maxHeight={'80vh'}
          minHeight={'50vh'}
          overflow={'auto'}
          css={{
            '&::-webkit-scrollbar': {
              width: '0.4vw',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#E47424',
              borderRadius: '5px',
            },
          }}
        >
          <Card w={'46vw'} mb={'3vh'}>
            <CardHeader ml={'1vw'} textColor={'web.text'} fontSize={'xl'}>Edit Customer</CardHeader>
            <CardBody display={'flex'} flexDir={'row'} justifyContent={'space-around'} mt={'1vh'}>
              <Stack divider={<StackDivider />}>
                <Box pt='2' w={'20vw'} h={'8vh'}>
                 <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semisemibold'}> Name </Text>
                  <Editable
                  value={inputs.Contact_Name}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pl='2'
                  pt='1'
                  justifyContent={'space-between'}
                  textColor={'web.text2'}
                  w={'19vw'}
                >
                  <EditablePreview/>
                  <Input
                    name={'Contact_Name'}
                    value={inputs.Contact_Name}
                    as={EditableInput}
                    w={'17vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                    size={"sm"}
                    type={"text"}
                    onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'Contact_Name'} value={inputs.Contact_Name} />
                </Editable>
                { errorsCustomer.Contact_Name && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.Contact_Name}
                    </Text>
                )}
              </Box>
              <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> Email </Text>
                <Editable
                  value={inputs.Email}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pl='2'
                  pt='1'
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    name={'Email'}
                    w={'17vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                    size={"sm"}
                    type={"text"}
                    onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'Email'} value={inputs.Email} />
                </Editable>
                { errorsCustomer.Email && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.Email}
                    </Text>
                )}
              </Box>
              <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> Phone </Text>
                <Editable
                  value={inputs.Phone}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pl='2'
                  pt='1'
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    name={'Phone'}
                    w={'17vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                    size={"sm"}
                    type={"text"}
                    onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'Phone'} value={inputs.Phone}   />
                </Editable>
                { errorsCustomer.Phone && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.Phone}
                    </Text>
                )}
              </Box>
              <Box></Box>
            </Stack>
            <Stack divider={<StackDivider />}>
              <Box pt='2' w={'20vw'} h={'8vh'}>
                <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> Company </Text>
                <Editable
                  value={inputs.Company}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    name={'Company'}
                    w={'15vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                    onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'Company'} value={inputs.Company}  />
                </Editable>
                { errorsCustomer.Company && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.Company}
                    </Text>
                )}
              </Box>
              <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> Company position </Text>
                <Editable
                  value={inputs.Company_Position}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    name={'Company_Position'}
                    w={'15vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                    onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'Company_Position'} value={inputs.Company_Position}  />
                </Editable>
                { errorsCustomer.Company_Position && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.Company_Position}
                    </Text>
                )}
              </Box>
              <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> Discount </Text>
                <Editable
                  value={inputs.DiscountRate}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    name={'DiscountRate'}
                    w={'15vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                    onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'DiscountRate'} value={inputs.DiscountRate}  />
                </Editable>
                { errorsCustomer.DiscountRate && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.DiscountRate}
                    </Text>
                )}
              </Box>
              <Box></Box>
            </Stack>          
          </CardBody>
        </Card>
        <Card w={'46vw'} >
        <CardHeader ml={'1vw'} textColor={'web.text'} fontSize={'xl'}>Edit Customer information</CardHeader>
          <CardBody display={'flex'} flexDir={'row'} justifyContent={'space-around'} alignContent={'center'} mt={'1vh'}>
            <Stack divider={<StackDivider />} display={'flex'} flexDir={'column'}>
            <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> Address </Text>
                <Editable
                  value={inputs.Address}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pl='2'
                  pt='1'
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    name={'Address'}
                    w={'17vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                    size={"sm"}
                    type={"text"}
                    onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'Address'} value={inputs.Address}   />
                </Editable>
                { errorsCustomer.Address && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.Address}
                    </Text>
                )}
              </Box>
              <Box w={'20vw'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} pt='1' fontSize='sm' fontWeight={'semibold'}> City </Text>
                <Editable
                  value= {inputs.City}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                  name={'City'}
                    w={'19vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'City'} value={inputs.City}  />
                </Editable>
                { errorsCustomer.City && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.City}
                    </Text>
                )}
              </Box>
              <Box></Box>
            </Stack>
            <Stack divider={<StackDivider />} display={'flex'} flexDir={'column'}>
            <Box w={'20vw'}>
                <Text textColor={'web.text2'} pt='1' fontSize='sm' fontWeight={'semibold'}> ZipCode </Text>
                <Editable
                  value= {inputs.ZipCode}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    name={'ZipCode'}
                    w={'15vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'ZipCode'} value={inputs.ZipCode}  />
                </Editable>
                { errorsCustomer.ZipCode && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.ZipCode}
                    </Text>
                )}
              </Box>
              <Box w={'20vw'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} pt='1' fontSize='sm' fontWeight={'semibold'}> State </Text>
                <Editable
                  value= {inputs.State}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    name={'State'}
                    w={'15vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'State'} value={inputs.State} />
                </Editable>
                { errorsCustomer.State && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.State}
                    </Text>
                )}
              </Box>
              <StackDivider />
            </Stack>
          </CardBody>
        </Card>
        <Card w={'46vw'} >
        <CardHeader ml={'1vw'} textColor={'web.text'} fontSize={'xl'}>Edit Billing information</CardHeader>
          <CardBody display={'flex'} flexDir={'row'} justifyContent={'space-around'} alignContent={'center'} mt={'1vh'}>
            <Stack divider={<StackDivider />} display={'flex'} flexDir={'column'}>
              <Box w={'20vw'}>
                <Text textColor={'web.text2'}pt='1' fontSize='sm' fontWeight={'semibold'}> Address </Text>
                <Editable
                  value= {inputs.Billing_Address}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    name={'Billing_Address'}
                    w={'19vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'Billing_Address'} value={inputs.Billing_Address}  />
                </Editable>
                { errorsCustomer.Billing_Address && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.Billing_Address}
                    </Text>
                )}
              </Box>
              <Box w={'20vw'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} pt='1' fontSize='sm' fontWeight={'semibold'}> City </Text>
                <Editable
                  value= {inputs.Billing_City}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                  name={'Billing_City'}
                    w={'19vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'Billing_City'} value={inputs.Billing_City}  />
                </Editable>
                { errorsCustomer.Billing_City && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.Billing_City}
                    </Text>
                )}
              </Box>
              <Box></Box>
            </Stack>
            <Stack divider={<StackDivider />} display={'flex'} flexDir={'column'}>
            <Box w={'20vw'}>
                <Text textColor={'web.text2'} pt='1' fontSize='sm' fontWeight={'semibold'}> ZipCode </Text>
                <Editable
                  value= {inputs.Billing_ZipCode}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    name={'Billing_ZipCode'}
                    w={'15vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'Billing_ZipCode'} value={inputs.Billing_ZipCode}  />
                </Editable>
                { errorsCustomer.Billing_ZipCode && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.Billing_ZipCode}
                    </Text>
                )}
              </Box>
              <Box w={'20vw'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} pt='1' fontSize='sm' fontWeight={'semibold'}> State </Text>
                <Editable
                  value= {inputs.Billing_State}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  textColor={'web.text2'}
                  justifyContent={'space-between'}
                  w={'19vw'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    name={'Billing_State'}
                    w={'15vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{handleChange(e)}}
                  /> 
                  <EditableControls name={'Billing_State'} value={inputs.Billing_State} />
                </Editable>
                { errorsCustomer.Billing_State && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.Billing_State}
                    </Text>
                )}
              </Box>
              <StackDivider />
            </Stack>
          </CardBody>
        </Card>
        <Flex mt={'20px'} minWidth='max-content' justifyContent={'flex-end'}>
          <Box>
            <Button
            size={'sm'}
            colorScheme='orange'
            onClick={handleSubmit}
            mr={'30px'}
            >
              Submit
            </Button>
          </Box>
        </Flex>
        </ Box>
        </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  </>
)}

export default CustomersEdit
