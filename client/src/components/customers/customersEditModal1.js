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
import {
  useToast
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi'
import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
// import '../../../assets/styleSheet.css'
import { useDispatch } from "react-redux";
import { updateCustomer } from "../../redux/actions-customers";

const CustomersEditModal1 = ({
  handleChange,
  inputs,
  setInputs,
  handleCheck,
  handleCancel,
  errorsCustomer,
  setErrorsCustomer
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
        <Card w={'46vw'} h={'46vh'} >
        <CardHeader mr={'20px'} textColor={'web.text'} fontSize={'xl'}>Edit Customer</CardHeader>
            <Text textColor={'web.text2'} mt={'5vh'} ml={'20px'}>Customer Shipping Address</Text>
          <CardBody display={'flex'} flexDir={'row'} justifyContent={'space-around'} alignContent={'center'} mt={'5vh'}>
            <Stack divider={<StackDivider />} display={'flex'} flexDir={'column'}>
            <Box w={'20vw'} mt={'0.5vh'}>
                <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> Address </Text>
                <Editable
                  value={inputs?.Address}
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
    </Box>
  </>
)}

export default CustomersEditModal1
