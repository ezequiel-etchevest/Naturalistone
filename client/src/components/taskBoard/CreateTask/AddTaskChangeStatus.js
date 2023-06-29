import { ButtonGroup, IconButton, Button, useToast, useDisclosure, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Text} from "@chakra-ui/react";
import { BiCheckSquare } from 'react-icons/bi';
import { useDispatch } from 'react-redux'
import { changeTaskStatus } from "../../../redux/actions-tasks";

export const ChangeTaskStatusModal = ({user, activeCard, setActiveCard}) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const handleClose = () => {
    onClose()
  }

  const handleSubmit = () => {
    dispatch(changeTaskStatus(activeCard.taskID, user[0].SellerID, 'todo'))
    setActiveCard({...activeCard, Status: 'done'})
    onClose()
    }

  return(
    <>
      <ButtonGroup
      textColor={'web.text2'}
      h={'5vh'}
      display={'flex'}
      spacing={0}
      _hover={{
      color: 'logo.orange'
      }}
      disabled={ activeCard ? activeCard.Status === 'todo' ? false : true : true}
      >
        <IconButton
        onClick={onOpen}
        variant={'unstyled'}           
        fontSize={'xl'}
        icon={<BiCheckSquare/>}
        disabled={activeCard ? activeCard.Status === 'todo' ? false : true : true}/>
        <Button
        onClick={onOpen}
        fontSize={'md'}
        variant={'unstyled'}           
        fontWeight={'normal'}
        disabled={activeCard ? activeCard.Status === 'todo' ? false : true : true}
        >Check as Done</Button>       
    </ButtonGroup>
    {
      activeCard && (
        <Modal 
        isOpen={isOpen} 
        onClose={handleClose}
        size={'2xl'}
        >
        <ModalOverlay/>
        <ModalContent 
          bg={'web.sideBar'}
          border={'1px solid'}
          borderColor={'web.border'}
          p={'2vh'}
          >
         <ModalHeader color={'web.text'}>Do you want to mark this task as finished? </ModalHeader>
          <ModalCloseButton
            color={'web.text2'}
            _hover={{
              color: 'web.text'
            }} />
          <ModalBody color={'web.text2'}>
            <Text
              color={'web.text2'}
              textAlign={'justify'}
              pt={'2vh'}
              >Once you confirm, you wont be able to change it again. Please make sure you want to change the status of the task number {activeCard.taskID}.</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme='orange' 
                mr={3} 
                onClick={()=>handleSubmit()}>
                  Confirm</Button>
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
      )
    }
   
    </>
    )
}

