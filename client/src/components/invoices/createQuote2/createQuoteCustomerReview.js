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
    Center,
    Select,
    Divider,
    } from "@chakra-ui/react"
import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import '../../../assets/styleSheet.css'
import { useState } from "react"
import { validateCompletedInputs } from "../../../utils/validateForm"

const CreateQuoteCustomerReview = ({setFormData, formData, sellers, user, setErrorsCustomer, errorsCustomer, setUpdated}) => {

const initialState = {
  Contact_Name: formData.customer.Contact_Name,
  City: formData.customer.City,
  Address: formData.customer.Address,
  State: formData.customer.State,
  ZipCode: formData.customer.ZipCode,
  Company: formData.customer.Company,
  Company_Position: formData.customer.Company_Position,
  Phone: formData.customer.Phone,
  Email: formData.customer.Email,
  DiscountID: formData.customer.DiscountID,
  DiscountRate: formData.customer.DiscountRate,
  Billing_Address:formData.customer.Billing_Address,
  Billing_City:formData.customer.Billing_City,
  Billing_ZipCode:formData.customer.Billing_ZipCode,
  Billing_State:formData.customer.Billing_State,
  CustomerID: formData.customer.CustomerID,
  Seller:  formData.customer.Seller ? formData.customer.Seller : '',
}
const [inputs, setInputs] = useState(initialState)
const [originInput, setOriginInput] = useState(initialState)
const discountRates = [0, 5, 10, 15]

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
  setUpdated(true)
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
    <Box 
      color={'web.text2'} 
      display={'flex'} 
      flexDir={'column'}
      mt={'1vh'}
      h={'58vh'}
      >
      <Text ml={'2vw'} mb={'4vh'} fontSize={'lg'} w={'14vw'} color={'white'} alignSelf={'flex-start'}>Customer review</Text>          
      <Box display={'flex'} alignSelf={'center'} maxW={'900px'} minW={'920px'}> 
        <Card w={'100%'}>
          <CardBody  display={'flex'} flexDir={'row'} justifyContent={'space-between'}  alignItems={'center'} mt={'1vh'}>
            <Stack h={'44vh'} divider={<StackDivider />}>
              <Box pt='2' w={'16vw'} h={'8vh'} maxW={'276px'}>
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
                  w={'16vw'}
                  maxW={'280px'}
                  alignItems={'center'}
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
                    w={'16vw'}
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
              <Box pt='2' w={'16vw'} h={'8vh'} mt={'0.5vh'} maxW={'276px'}>
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
                  w={'16vw'}
                  maxW={'280px'}
                  alignItems={'center'}
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
                    w={'15vw'}
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
              <Box pt='2' w={'16vw'} h={'8vh'} mt={'0.5vh'} maxW={'276px'}>
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
                  w={'16vw'}
                  maxW={'280px'}
                  alignItems={'center'}
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
                    w={'15vw'}
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
              <Box></Box>
            </Stack>
            <Divider borderColor={'web.border'} orientation='vertical'/>
            <Stack h={'44vh'} divider={<StackDivider />}>
              <Box pt='2' w={'16vw'} h={'8vh'} maxW={'276px'}>
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
                  w={'16vw'}
                  maxW={'280px'}
                  alignItems={'center'}
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
              <Box pt='2' w={'16vw'} h={'8vh'} mt={'0.5vh'} maxW={'276px'}>
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
                  w={'16vw'}
                  maxW={'280px'}
                  alignItems={'center'}
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
              <Box pt='2' w={'16vw'}h={'8vh'} mt={'0.5vh'}  maxW={'276px'}>
                <Text fontSize='sm' fontWeight={'semibold'}> Discount </Text>
                <Select
                    onChange={(e)=>handleChange(e)}
                    mb={'0.5vh'}
                    w={'16vw'}
                    pl={'2'}
                    maxW={'280px'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"0"}
                    value={inputs.DiscountRate}
                    cursor={'pointer'}
                    name="DiscountRate"
                  >
                    {
                      discountRates.map((e, i) => {
                          return(
                            <option key={i} className={'options'} value={e}>{e}</option>
                      )})
                    }
                </Select>
              </Box>
              <Box pt='2' w={'16vw'}h={'8vh'} mt={'0.5vh'}  maxW={'276px'}>
                <Text fontSize='sm' fontWeight={'semibold'}> Seller reference </Text>
                <Select
                    onChange={(e)=>handleChange(e)}
                    mb={'0.5vh'}
                    pl={'2'}
                    w={'16vw'}
                    maxW={'280px'}
                    // disabled={ user[0].Secction7Flag === 1  || user[0].SellerID === 8 ? false : true}
                    minH={'4vh'}
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
            <Divider borderColor={'web.border'} orientation='vertical'/>
            <Stack h={'44vh'} divider={<StackDivider />}>
              <Box pt='2' w={'16vw'} h={'8vh'} maxW={'276px'}>
                <Text fontSize='sm' fontWeight={'semibold'}> Billing Adress </Text>
                <Editable
                  value={inputs.Billing_Address}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pl='2'
                  pt='1'
                  justifyContent={'space-between'}
                  w={'16vw'}
                  maxW={'280px'}
                  alignItems={'center'}
                >
                  <EditablePreview 
                    maxW={'280px'} 
                    css={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}/>
                  <Input
                    name={'Billing_Address'}
                    className="mailInputs"
                    value={inputs.Billing_Address}
                    as={EditableInput}
                    w={'15vw'}
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
                  <EditableControls name={'Billing_Address'} value={inputs.Billing_Address} />
                </Editable>
                { errorsCustomer.Billing_Address && (
                  <Text
                    h={'3.6vh'}
                    color={'web.error'}
                    fontSize={'xs'}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                  >
                    {errorsCustomer.Billing_Address}
                  </Text>
                )}
              </Box>
              <Box pt='2' w={'16vw'} h={'8vh'}  mt={'0.5vh'} maxW={'276px'}>
                <Text fontSize='sm' fontWeight={'semibold'}> Billing City</Text>
                <Editable
                  value={inputs.Billing_City}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pl='2'
                  pt='1'
                  justifyContent={'space-between'}
                  w={'16vw'}
                  maxW={'280px'}
                  alignItems={'center'}
                >
                  <EditablePreview 
                    maxW={'280px'} 
                    css={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}/>
                  <Input
                    name={'Billing_City'}
                    className="mailInputs"
                    value={inputs.Billing_City}
                    as={EditableInput}
                    w={'15vw'}
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
                  <EditableControls name={'Billing_City'} value={inputs.Billing_City} />
                </Editable>
                { errorsCustomer.Billing_City && (
                  <Text
                    h={'3.6vh'}
                    color={'web.error'}
                    fontSize={'xs'}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                  >
                    {errorsCustomer.Billing_City}
                  </Text>
                )}
              </Box>
              <Box pt='2' w={'16vw'} h={'8vh'}  mt={'0.5vh'} maxW={'276px'}>
                <Text fontSize='sm' fontWeight={'semibold'}> Billing ZipCode </Text>
                <Editable
                  value={inputs.Billing_ZipCode}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pl='2'
                  pt='1'
                  justifyContent={'space-between'}
                  w={'16vw'}
                  maxW={'280px'}
                  alignItems={'center'}
                >
                  <EditablePreview 
                    maxW={'280px'} 
                    css={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}/>
                  <Input
                    name={'Billing_ZipCode'}
                    className="mailInputs"
                    value={inputs.Billing_ZipCode}
                    as={EditableInput}
                    w={'15vw'}
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
                  <EditableControls name={'Billing_ZipCode'} value={inputs.Billing_ZipCode} />
                </Editable>
                { errorsCustomer.Billing_ZipCode && (
                  <Text
                    h={'3.6vh'}
                    color={'web.error'}
                    fontSize={'xs'}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                  >
                    {errorsCustomer.Billing_ZipCode}
                  </Text>
                )}
              </Box>
              <Box pt='2' w={'16vw'} h={'8vh'}  mt={'0.5vh'} maxW={'276px'}>
                <Text fontSize='sm' fontWeight={'semibold'}> Billing State </Text>
                <Editable
                  value={inputs.Billing_State}
                  fontSize='sm'
                  fontWeight={'hairline'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pl='2'
                  pt='1'
                  justifyContent={'space-between'}
                  w={'16vw'}
                  maxW={'280px'}
                  alignItems={'center'}
                >
                  <EditablePreview 
                    maxW={'280px'} 
                    css={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}/>
                  <Input
                    name={'Billing_State'}
                    className="mailInputs"
                    value={inputs.Billing_State}
                    as={EditableInput}
                    w={'15vw'}
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
                  <EditableControls name={'Billing_State'} value={inputs.Billing_State} />
                </Editable>
                { errorsCustomer.Billing_Address && (
                  <Text
                    h={'3.6vh'}
                    color={'web.error'}
                    fontSize={'xs'}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                  >
                    {errorsCustomer.Billing_State}
                  </Text>
                )}
              </Box>
              <Box></Box>
            </Stack>          
          </CardBody>
        </Card>
      </Box>
    </Box>
  </>
)}

export default CreateQuoteCustomerReview
