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
import {
  useToast
} from '@chakra-ui/react';
import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
// import '../../../assets/styleSheet.css'
import { useDispatch } from "react-redux";

const CustomersEditModal2 = ({
  inputs,
  handleChange,
  handleCancel,
  handleCheck,
  errorsCustomer,
  USStates
}) => {

  const toast = useToast()
  const dispatch = useDispatch()

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
        <Card w={'46vw'} h={'55vh'} >
        <CardHeader mr={'20px'} textColor={'web.text'} fontSize={'xl'}>Edit Customer</CardHeader>
          <Text textColor={'web.text2'} mt={'5vh'} ml={'20px'} fontWeight={'bold'}>Billing Address</Text>
          <CardBody display={'flex'} flexDir={'row'} justifyContent={'space-around'} alignContent={'center'} mt={'5vh'}>
            <Stack divider={<StackDivider />} display={'flex'} flexDir={'column'}>
              <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> Address </Text>
                <Editable
                  value= {inputs?.Billing_Address ?? ''}
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
              <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> Address 2 </Text>
                <Editable
                  value= {inputs?.Billing_Address2 ?? ''}
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
                    name={'Billing_Address2'}
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
                  <EditableControls name={'Billing_Address2'} value={inputs.Billing_Address2}  />
                </Editable>
              </Box>
              <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} pt='1' fontSize='sm' fontWeight={'semibold'}> City </Text>
                <Editable
                  value= {inputs.Billing_City}
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
            <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} pt='1' fontSize='sm' fontWeight={'semibold'}> ZipCode </Text>
                <Editable
                  value= {inputs.Billing_ZipCode}
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
              <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
              <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> State </Text>
              <Select
                onChange={(e)=>handleChange(e)}
                // mb={'0.5vh'}
                w={'19vw'}
                maxW={'300px'}
                minH={'5vh'}
                pl={'2'}
                variant="unstyled"
                color={'web.text2'}
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
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
                size={"sm"}
                borderBottomWidth={"0"}
                value={inputs.Billing_State}
                cursor={'pointer'}
                name="Billing_State"
              >
                <option value='' className="options">Select state</option>
                {
                  USStates.map((e, i) => {
                      return(
                        <option key={i} className={'options'} value={e}>{e}</option>
                  )})
                }
            </Select>
          </Box>
              <StackDivider />
            </Stack>
          </CardBody>
        </Card>
    </Box>
  </>
)}

export default CustomersEditModal2
