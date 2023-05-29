import { 
  IconButton, 
  useDisclosure, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  Box, 
  Text, 
  ModalCloseButton,
  ModalBody, 
  ModalFooter, 
  Button,
  Tooltip } from "@chakra-ui/react"
import { HiUserAdd } from "react-icons/hi";
import CreationCustomerForm from "../../customers/createCustomerForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from '../../../redux/actions-customers'

export function CreateCustomerModal({ user, setCustomer, onOpen2}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    Contact_Name: '',
    Address: '',
    State: '',
    ZipCode: '',
    Company: '',
    Phone: '',
    Email: '',
    DiscountID: 1
  });

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
      dispatch(createCustomer(formData));
      setCustomer(formData)
      handleClose()
      onOpen2()
  };
  const handleClose = () => {
    setFormData({
      Contact_Name: '',
      Address: '',
      State: '',
      ZipCode: '',
      Company: '',
      Phone: '',
      Email: '',
      DiscountID: 1
    })
    onClose()
  }

  return (
    <>
     <Tooltip label={'Add customer'} fontWeight={'hairline'}>
      <IconButton
      size={'lg'}
      icon={ <HiUserAdd/>}
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
      </Tooltip>
      <Modal size={'3xl'} isOpen={isOpen} onClose={()=>handleClose()}>
        <ModalOverlay/>
        <ModalContent
        minW={'50vw'}
        h={'78.2vh'}
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton
            color={'web.text2'}
            _hover={{
              color: 'web.text'
            }}
            onClick={()=>handleClose()}/>
          <Box color={'white'}>
            <Text ml={'3vw'} fontSize={'lg'}>Add New Customer</Text>
              <ModalBody mt={'10vh'}>
                <CreationCustomerForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors}/>
              </ModalBody>
          </Box>
            <ModalFooter mt={'11vh'} mb={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'2vw'} mr={'2vw'}>
              <Button
                colorScheme={'orange'}
                size={'sm'}
                visibility={'none'}
                onClick={()=>handleClose()}
                >
               Previous
              </Button>
              <Button
                colorScheme={'orange'}
                size={'sm'}
                visibility={'none'} 
                onClick={(e)=>handleSubmit(e)}
                >
               Submit
              </Button>
            </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
    }