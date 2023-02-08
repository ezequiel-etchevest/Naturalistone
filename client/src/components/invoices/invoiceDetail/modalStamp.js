import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Button,
    Text,
    ButtonGroup,
    IconButton,
    ModalFooter,
    ModalHeader,
    ModalCloseButton,
    Tooltip
  } from '@chakra-ui/react'
import { TfiStamp } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import { stampInvoice } from '../../../redux/actions-invoices';
  
  export default function ModalStamp({invoice, payments}) {
    
  const { isOpen, onOpen, onClose } = useDisclosure()
  const id = invoice[0].Naturali_Invoice
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(stampInvoice(id))
    onClose()
  }
  
  if(invoice[0].Payment_Stamp == 0){

    return (
      <>
        <Tooltip label={payments.paymentsMath.PendingAmount === '0.00'? null : 'Pending amount should be 0'}>
        <ButtonGroup
          display={'flex'}
          spacing={0}
            _hover={{
            color: 'logo.orange'
          }}>
          <IconButton
            disabled={payments.paymentsMath.PendingAmount === '0.00' ? false : true}  
            variant={'unstyled'}           
            fontWeight={'normal'}
            icon={<TfiStamp/>}/>
          <Button
            disabled={payments.paymentsMath.PendingAmount === '0.00' ? false : true}  
            variant={'unstyled'}              
            fontWeight={'normal'}
            onClick={onOpen}
            >Stamp PDF
          </Button>
        </ButtonGroup>
        </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'} >
        <ModalOverlay />
        <ModalContent 
          rounded={'md'} 
          mt={'4vh'} 
          mb={'4vh'} 
          w={'60vw'}
          h={'44vh'} 
          bg={'web.sideBar'} 
          border={'1px solid'} 
          p={'3vh'} 
          pl={'3vw'}
          pr={'3vw'}
          borderColor={'web.border'}
          >
          <ModalHeader color={'web.text'}>Do you want to stamp quote n° {id} ? </ModalHeader>
          <ModalCloseButton color={'web.text'}/>
          <ModalBody>
            <Text
            color={'web.text2'}
            textAlign={'justify'}
            pt={'2vh'}
            >Once you confirm this set of payments, you wont be able to change it again. Please make sure to have all the correct information.</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='orange' 
              mr={3} 
              onClick={()=>handleSubmit()}>
                Confirm Payments</Button>
            <Button 
              variant='ghost' 
              color={'web.text'} 
              onClick={onClose}
              _hover={{
                color: 'logo.orange'
              }}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )}else{
    return(
    <>
      <Tooltip label={'Stamped quote'}>
      <ButtonGroup
        display={'flex'}
        spacing={0}
          _hover={{
          color: 'logo.orange'
        }}>
        <IconButton
          disabled={true}  
          variant={'unstyled'}           
          fontWeight={'normal'}
          icon={<TfiStamp/>}/>
        <Button
          disabled={true}  
          variant={'unstyled'}              
          fontWeight={'normal'}
          >Stamp PDF
        </Button>
      </ButtonGroup>
      </Tooltip>
    </>)
  }
}