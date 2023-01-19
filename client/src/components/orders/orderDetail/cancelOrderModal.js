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
import { MdOutlineCancel } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { cancelOrderStatus } from '../../../redux/actions-orders';

export default function CancerlOrderModal({order}) {
    
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const dispatch = useDispatch()

  const id = order[0].OrderID

  const handleSubmit = (id) => {
    dispatch(cancelOrderStatus(id))
    onClose()
  }
  
    return (
      <>
      <ButtonGroup
            onClick={onOpen}
            display={'flex'}
            spacing={'1vw'}
            _hover={{
            color: 'logo.orange'
            }}
            w={'10vw'}
            >
          <Button
            variant={'unstyled'}           
            fontWeight={'normal'}
            >Cancel Order
          </Button>
          <IconButton
            variant={'unstyled'}           
            fontWeight={'normal'}
            fontSize={'lg'}
            icon={<MdOutlineCancel/>}
          />
          </ButtonGroup>
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
            Cancel Quote
          </ModalHeader>
          <ModalCloseButton
            color={'web.text2'}
            _hover={{
              color: 'web.text'
            }} />
          <ModalBody color={'web.text2'}>
            <Text>Are you sure you want to cancel this Order?</Text>
            <Text> This action can't be undone</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={'orange'} 
              mr={3} 
              onClick={()=>handleSubmit(id)}
              >
             Confirm
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )}
