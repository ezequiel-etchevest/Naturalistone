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

const CustomersEditModal = ({
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
          <Card w={'46vw'} mb={'3vh'}>
            <CardHeader mr={'20px'} textColor={'web.text'} fontSize={'xl'}>Edit Customer</CardHeader>
            <Text textColor={'web.text2'} mt={'20px'} ml={'20px'}>Customer Info</Text>
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
    </Box>
  </>
)}

export default CustomersEditModal
