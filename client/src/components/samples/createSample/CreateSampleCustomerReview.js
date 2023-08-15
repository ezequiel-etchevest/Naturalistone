import { 
    Text,
    Box,
    Stack,
    StackDivider,
    Editable,
    EditableInput,
    EditablePreview,
    useEditableControls,
    IconButton,
    Flex,
    Input,
    Center,
    Select,
    } from "@chakra-ui/react"
import { Card, CardBody } from '@chakra-ui/card'
import {  CloseIcon, EditIcon } from '@chakra-ui/icons'
import '../../../assets/styleSheet.css'
import { useState } from "react"
import { validateCompletedInputs } from "../../../utils/validateForm"

const CreateSampleCustomerReview = ({setFormData, formData, setErrorsCustomer, errorsCustomer, sellers, user}) => {

const initialState = {
  Contact_Name: formData.customer.Contact_Name,
  Company: formData.customer.Company,
  Company_Position: formData.customer.Company_Position,
  Phone: formData.customer.Phone,
  Email: formData.customer.Email,
  DiscountID: formData.customer.DiscountID !== "" ? formData.customer.DiscountID : 1,
  DiscountRate: formData.customer.DiscountRate !== null && formData.customer.DiscountRate !== "" ? formData.customer.DiscountRate : "0",
  CustomerID: formData.customer.CustomerID,
  Seller:  formData.customer.Seller ? formData.customer.Seller : '',
}
const [inputs, setInputs] = useState(initialState)
const [originInput, setOriginInput] = useState(initialState)

const handleCancel = (e) => {

  const {name} = e
    setInputs({
      ...inputs,
      [name]: originInput[name] 
      }
    )
    setFormData({
      ...formData,
      customer: {
        ...formData.customer,
      [name]: originInput[name] 
      }
    })
    setErrorsCustomer((prevErrors) => {
      const { [name]: removedError, ...restErrors } = prevErrors;
      return restErrors;
    });
  }

const handleChange = (e) =>{
  const {name, value} = e.target
  setInputs((prevInputs) => ({
    ...prevInputs,
    [name]: value,
  }));

  const updatedErrors = validateCompletedInputs({
    ...inputs,
    [name]: value,
  });

  setErrorsCustomer((prevErrors) => {
    const { [name]: removedError, ...restErrors } = prevErrors;
    return {
      ...restErrors,
      ...updatedErrors,
    };
  });
  setFormData({
    ...formData,
    customer: {
      ...formData.customer,
    [name]: value  
    }
  })
}

function EditableControls(name, value) {
  const {
    isEditing,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

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
  <Center 
    color={'web.text2'} 
    display={'flex'} 
    flexDir={'column'}
    >
    <Box h={"6vh"} display={'flex'} alignSelf={'flex-start'} ml={'1vw'} >
      <Text
        fontSize={"lg"}
        color={"white"}
        display={'flex'}
        textAlign={'left'}
        >
        Customer review
      </Text>
    </Box>
    <Card w={'46vw'}maxW={'700px'}>
      <CardBody display={'flex'} flexDir={'row'} justifyContent={'space-around'}  alignItems={'center'} mt={'1vh'}>
        <Stack h={'44vh'} divider={<StackDivider />}>
          <Box pt='2' w={'20vw'} h={'8vh'} maxW={'300px'}>
            <Text fontSize='sm' fontWeight={'semibold'}> Name </Text>
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
              maxW={'280px'}
              alignItems={'center'}
              // onBlur={() => handleCheck({ name: 'Contact_Name', value: inputs.Contact_Name })}
            >
              <EditablePreview 
                maxW={'280px'} 
                css={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}/>
              <Input
                name={'Contact_Name'}
                className="mailInputs"
                value={inputs.Contact_Name}
                as={EditableInput}
                w={'17vw'}
                maxW={'280px'}
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
              <Text
                h={'3.6vh'}
                color={'web.error'}
                fontSize={'xs'}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
              >
                {errorsCustomer.Contact_Name}
              </Text>
            )}
          </Box>
          <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'} maxW={'300px'}>
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
              maxW={'280px'}
              alignItems={'center'}
              // onBlur={() => handleCheck({ name: 'Email', value: inputs.Email })}
            >
              <EditablePreview 
              maxW={'280px'} css={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }} />
              <Input as={EditableInput}
                name={'Email'}
                className="mailInputs"
                w={'17vw'}
                maxW={'280px'}
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
              <Text
                h={'3.6vh'}
                color={'web.error'}
                fontSize={'xs'}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
              >
                {errorsCustomer.Email}
              </Text>
            )}
          </Box>
          <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'} maxW={'300px'}>
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
              maxW={'280px'}
              alignItems={'center'}
              // onBlur={() => handleCheck({ name: 'Phone', value: inputs.Phone })}
            >
              <EditablePreview 
                maxW={'280px'} 
                css={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}/>
              <Input as={EditableInput}
                name={'Phone'}
                className="mailInputs"
                w={'17vw'}
                maxW={'280px'}
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
              <Text
                  h={'3.6vh'}
                  color={'web.error'}
                  fontSize={'xs'}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                >
                {errorsCustomer.Phone}
              </Text>
            )}
          </Box>
          <Box pt='2' w={'20vw'}h={'8vh'} mt={'0.5vh'}  maxW={'300px'}>
          <Select
              onChange={(e)=>handleChange(e)}
              mb={'0.5vh'}
              w={'19vw'}
              maxW={'280px'}
              disabled={ user[0].Secction7Flag === 1 ? false : true}
              h={'8vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"0"}
              value={inputs.Seller}
              cursor={'pointer'}
              name="Seller"
            >
              <option value='' className="options">Select seller</option>
              {
                sellers.length ? (
                  sellers?.map((e, i) => {
                      return(
                        <option key={i} className={'options'} value={e.SellerID}>{e.FirstName} {e.LastName}</option>
                  )})
                      
                  ): ( null)
              }
            </Select>
          </Box>
          <Box></Box>
        </Stack>
        <Stack h={'44vh'} divider={<StackDivider />}>
          <Box pt='2' w={'20vw'} h={'8vh'} maxW={'300px'}>
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
              maxW={'280px'}
              alignItems={'center'}
              // onBlur={() => handleCheck({ name: 'Company', value: inputs.Company })}
            >
              <EditablePreview 
              maxW={'280px'} css={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }} />
              <Input as={EditableInput}
                name={'Company'}
                className="mailInputs"
                w={'15vw'}
                maxW={'260px'}
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
              <Text
                h={'3.6vh'}
                color={'web.error'}
                fontSize={'xs'}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                >
                {errorsCustomer.Company}
              </Text>
            )}
          </Box>
          <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'} maxW={'300px'}>
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
              maxW={'280px'}
              alignItems={'center'}
              // onBlur={() => handleCheck({ name: 'Company_Position', value: inputs.Company_Position })}
            >
              <EditablePreview 
              maxW={'280px'} css={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }} />
              <Input as={EditableInput}
                name={'Company_Position'}
                className="mailInputs"
                w={'15vw'}
                maxW={'280px'}
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
              <Text
                h={'3.6vh'}
                color={'web.error'}
                fontSize={'xs'}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                >
                {errorsCustomer.Company_Position}
              </Text>
            )}
          </Box>
          <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'} maxW={'300px'}>
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
              maxW={'280px'}
              alignItems={'center'}
              // onBlur={() => handleCheck({ name: 'DiscountRate', value: inputs.DiscountRate })}
            >
              <EditablePreview 
              maxW={'280px'} css={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }} />
              <Input as={EditableInput}
                name={'DiscountRate'}
                className="mailInputs"
                w={'15vw'}
                maxW={'280px'}
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
              <Text
                h={'3.6vh'}
                color={'web.error'}
                fontSize={'xs'}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                >
                {errorsCustomer.DiscountRate}
              </Text>
            )}
          </Box>
          <Box ></Box>
        </Stack>          
      </CardBody>
    </Card>
    </Center>
  </>
)}

export default CreateSampleCustomerReview
