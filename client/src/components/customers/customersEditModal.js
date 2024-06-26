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

    Select,
    } from "@chakra-ui/react"
import { useToast } from '@chakra-ui/react';
import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
// import '../../../assets/styleSheet.css'
import { useDispatch } from "react-redux";
import { companyRole } from "../../utils/arrayCompanyRole";

const CustomersEditModal = ({
  handleChange,
  inputs,
  handleCheck,
  handleCancel,
  errorsCustomer,
  sellers,
  user
}) => {

  const toast = useToast()
  const dispatch = useDispatch()
  const discountRates = [0, 5, 10, 15]

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
          <Card w={'46vw'} mb={'3vh'}>
            <CardHeader mr={'20px'} pt={"2"} textColor={'web.text'} fontSize={'xl'}>Edit Customer</CardHeader>
            <Text textColor={'web.text2'} mt={'4vh'} ml={'20px'} fontWeight={'bold'}>Customer Info</Text>
            <CardBody display={'flex'} flexDir={'row'} justifyContent={'space-around'} mt={'5vh'}>
              <Stack divider={<StackDivider />}>
                <Box pt='2' w={'20vw'} h={'8vh'}>
                 <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semisemibold'}> Name </Text>
                  <Editable
                  value={inputs.Contact_Name}
                  fontSize='sm'
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
          <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}  maxW={'300px'}>
          <Text fontSize='sm' fontWeight={'semibold'} textColor={'web.text2'} > Seller reference </Text>
            <Select
              onChange={(e)=>handleChange(e)}
              w={'19vw'}
              maxW={'300px'}
              pl={'2'}
              disabled={ user.Secction7Flag === 1 ? false : true}
              minH={'5vh'}
              variant="unstyled"
              color= {'web.text2'}
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
            <Stack divider={<StackDivider />}>
              <Box pt='2' w={'20vw'} h={'8vh'}>
                <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> Company </Text>
                <Editable
                  value={inputs.Company}
                  fontSize='sm'
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
                  <Select
                    onChange={(e)=>handleChange(e)}
                    mb={'0.5vh'}
                    pl={'2'}
                    h={'5vh'}
                    w={'19vw'}
                    maxW={'300px'}
                    variant="unstyled"
                    color={'web.text2'}
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                    size={"sm"}
                    value={inputs.Company_Position}
                    cursor={'pointer'}
                    name="Company_Position"
                  >
                <option value='' className="options" disabled>Select Role</option>
                {
                  companyRole.length ? (
                    companyRole?.map((role, i) => {
                      return(
                        <option key={i} className={'options'} value={role}>{role}</option>
                  )})
                      
                  ): ( null)
              }
                </Select>
                { errorsCustomer.Company_Position && (
                    <Text mt={'1vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errorsCustomer.Company_Position}
                    </Text>
                )}
              </Box>
              <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
              <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> Discount </Text>
              <Select
                onChange={(e)=>handleChange(e)}
                mb={'0.5vh'}
                w={'19vw'}
                maxW={'300px'}
                minH={'5vh'}
                pl={'2'}
                variant="unstyled"
                color={'web.text2'}
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                size={"sm"}
                borderBottomWidth={"0"}
                value={inputs.DiscountRate}
                cursor={'pointer'}
                name="DiscountRate"
              >
                <option value='' className="options">Select discount</option>
                {
                  discountRates.map((e, i) => {
                      return(
                        <option key={i} className={'options'} value={e}>{e}</option>
                  )})
                }
            </Select>
          </Box>
              <Box></Box>
            </Stack>       
          </CardBody>
        </Card>
    </Box>
  </>
)}

export default CustomersEditModal
