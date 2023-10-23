import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Button,
    Text,
    IconButton,
    ModalFooter,
    ModalHeader,
    ModalCloseButton
  } from '@chakra-ui/react'
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deletePayment } from '../../../redux/actions-payments';

export default function PaymentDeleteModal({InvoiceID, idPayments, deliveries}) {
    
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(deletePayment(InvoiceID,idPayments, user[0].SellerID))
    onClose()
  }

  const onDeliveries = () => {
    if (deliveries.length > 0) return true
    else return false
  }
  
    return (
      <>
      <IconButton
        w={'2vw'}
        variant={'unstyled'}           
        fontWeight={'normal'}
        boxSize={'3vh'}
        display={'flex'}
        icon={<AiOutlineDelete/>}
        disabled={onDeliveries()}
        onClick={onOpen}
        _hover={{
        color: 'logo.orange'
        }}
        color={'web.text2'}
      />
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        >
        <ModalOverlay/>
        <ModalContent 
          bg={'web.sideBar'}
          border={'1px solid'}
          borderColor={'web.border'}
          >
          <ModalHeader
          color={'web.text'}>
            Cancel Payment
          </ModalHeader>
          <ModalCloseButton
            color={'web.text2'}
            _hover={{
              color: 'web.text'
            }} />
          <ModalBody color={'web.text2'}>
            <Text>Are you sure you want to cancel this Payment?</Text>
            <Text> This action can't be undone</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={'orange'} 
              mr={3} 
              onClick={()=>handleSubmit()}
              >
             Confirm
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )}
