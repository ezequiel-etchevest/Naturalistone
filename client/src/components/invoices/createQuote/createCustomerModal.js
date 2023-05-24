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
  Progress,
  Tooltip } from "@chakra-ui/react"
import { HiUserAdd } from "react-icons/hi";
import CreationCustomerForm from "../../customers/createCustomerForm";
import { useState, useEffect } from "react";
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
  const [disable, setDisable] = useState(true)

  useEffect(() => {
    if(formData.Contact_Name.length && formData.Address.length && formData.State.length && formData.ZipCode.length && formData. Company.length && formData.Phone.length && formData.Email.length){
      setDisable(false)
    } else { 
      setDisable(true)}
}, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(formData.Contact_Name.length && formData.Address.length && formData.State.length && formData.ZipCode.length && formData.Company.length && formData.Phone.length && formData.Email.length){
      dispatch(createCustomer(formData));
      setCustomer(formData)
      handleClose()
      onOpen2()
    }
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
      <Modal size={'3xl'} isOpen={isOpen} onClose={()=>handleClose()} motionPreset='slideInRight'>
        <ModalOverlay/>
        <ModalContent
           bg={'web.sideBar'}
           border={'1px solid'}
           borderColor={'web.border'}>
            <Progress value={20} colorScheme={"orange"} mb={'2vh'} background={'web.border'} size={'sm'}/>
                <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'} mb={'4vh'}>
                <Text ml={'2vw'} mb={'6vh'} mt={'2vh'} fontSize={'lg'} w={'16vw'} color={'white'} alignSelf={'flex-start'}>Add New Customer</Text>
                <CreationCustomerForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors}/>
              </ModalBody>
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
                disabled={disable}
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