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
    } from "@chakra-ui/react"
import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import '../../../assets/styleSheet.css'
import { useState } from "react"
// import { validateCompletedInputs } from "../../../utils/validateForm"

const CreateSampleCustomerReview = ({setFormData, formData, setErrorsCustomer, errorsCustomer}) => {

 const [inputs, setInputs] = useState({
    Contact_Name: formData.customer.Contact_Name,
    Company: formData.customer.Company,
    Company_Position: formData.customer.Company_Position,
    Phone: formData.customer.Phone,
    Email: formData.customer.Email,
    DiscountID: formData.customer.DiscountID ==! "" ? formData.customer.DiscountID : 1,
    DiscountRate: formData.customer.DiscountRate ? formData.customer.DiscountRate : 0,
    CustomerID: formData.customer.CustomerID 
  }
 )

const handleCheck = (e) => {

const {name, value} = e
  setFormData({
    ...formData,
    customer: {
      ...formData.customer,
    [name]: value  
    }
  })
}

const handleCancel = (e) => {

  const {name} = e
    setInputs({
      ...inputs,
      [name]: formData.customer[name] 
      }
    )
  }

const handleChange = (e) =>{
  setErrorsCustomer({})
  const {name, value} = e.target
  setInputs({
    ...inputs,
    [name]: value})
  // setErrorsCustomer(
  //   validateCompletedInputs({
  //     ...inputs,
  //     [name]: value,
  //   })
  // );
}

function EditableControls(name, value) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  console.log(formData)
  return isEditing ? (

  <Flex justifyContent='center' alignItems={'center'}>
      <IconButton
        h={'4vh'}
        icon={<CloseIcon />} 
        variant={'unstyled'} 
        display={'flex'} 
        borderRadius={'sm'} 
        placeContent={'center'}
        alignItems={'center'}
        justifyItems={'center'}
        fontSize={'sm'}
        color={'web.text2'} 
        _hover={{
           color: 'logo.orange'
           }}
        _active={{
        }}
        {...getCancelButtonProps({ onClick: ()=>handleCancel(name, value) })} />
      </Flex>
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

  return(

<>
  <Box 
    color={'web.text2'} 
    display={'flex'} 
    flexDir={'column'}
    >
    <Box h={"6vh"}>
      <Text
        ml={"1vw"}
        fontSize={"lg"}
        color={"white"}
        >
        Customer review
      </Text>
    </Box>
    <Card w={'46vw'}>
      <CardBody display={'flex'} flexDir={'row'} justifyContent={'space-around'}  alignItems={'center'} mt={'1vh'}>
        <Stack divider={<StackDivider />}>
          <Box pt='2' w={'20vw'} h={'8vh'}>
            <Text fontSize='sm' fontWeight={'semisemibold'}> Name </Text>
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
              w={'19vw'}
              onBlur={() => handleCheck({ name: 'Contact_Name', value: inputs.Contact_Name })}
            >
              <EditablePreview/>
              <Input
                name={'Contact_Name'}
                value={inputs.Contact_Name}
                as={EditableInput}
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
              <EditableControls name={'Contact_Name'} value={inputs.Contact_Name} />
            </Editable>
            { errorsCustomer.Contact_Name && (
                <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errorsCustomer.Contact_Name}
                </Text>
            )}
          </Box>
          <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
            <Text fontSize='sm' fontWeight={'semibold'}> Email </Text>
            <Editable
              value={inputs.Email}
              fontSize='sm'
              fontWeight={'hairline'}
              isPreviewFocusable={false}
              display={'flex'}
              flexDir={'row'}
              pl='2'
              pt='1'
              justifyContent={'space-between'}
              w={'19vw'}
              onBlur={() => handleCheck({ name: 'Email', value: inputs.Email })}
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
            <Text fontSize='sm' fontWeight={'semibold'}> Phone </Text>
            <Editable
              value={inputs.Phone}
              fontSize='sm'
              fontWeight={'hairline'}
              isPreviewFocusable={false}
              display={'flex'}
              flexDir={'row'}
              pl='2'
              pt='1'
              justifyContent={'space-between'}
              w={'19vw'}
              onBlur={() => handleCheck({ name: 'Phone', value: inputs.Phone })}
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
            <Text fontSize='sm' fontWeight={'semibold'}> Company </Text>
            <Editable
              value={inputs.Company}
              fontSize='sm'
              fontWeight={'hairline'}
              isPreviewFocusable={false}
              display={'flex'}
              flexDir={'row'}
              pt='1'
              pl='2' 
              justifyContent={'space-between'}
              w={'19vw'}
              onBlur={() => handleCheck({ name: 'Company', value: inputs.Company })}
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
            <Text fontSize='sm' fontWeight={'semibold'}> Company position </Text>
            <Editable
              value={inputs.Company_Position}
              fontSize='sm'
              fontWeight={'hairline'}
              isPreviewFocusable={false}
              display={'flex'}
              flexDir={'row'}
              pt='1'
              pl='2' 
              justifyContent={'space-between'}
              w={'19vw'}
              onBlur={() => handleCheck({ name: 'Company_Position', value: inputs.Company_Position })}
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
            <Text fontSize='sm' fontWeight={'semibold'}> Discount </Text>
            <Editable
              value={inputs.DiscountRate}
              fontSize='sm'
              fontWeight={'hairline'}
              isPreviewFocusable={false}
              display={'flex'}
              flexDir={'row'}
              pt='1'
              pl='2' 
              justifyContent={'space-between'}
              w={'19vw'}
              onBlur={() => handleCheck({ name: 'DiscountRate', value: inputs.DiscountRate })}
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
    </Box>
  </>
)}

export default CreateSampleCustomerReview
