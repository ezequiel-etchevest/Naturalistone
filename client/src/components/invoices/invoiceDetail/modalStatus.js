import { 
    Button, 
    ButtonGroup, 
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    } from "@chakra-ui/react"
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { MdOutlineCancel } from 'react-icons/md';
import { changeStatus } from "../../../redux/actions-invoices";
import '../../../assets/styleSheet.css';



const ChangeStatus = ({invoice, user}) => {

  const dispatch = useDispatch()
  const {id} = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleSubmit = () => {
    dispatch(changeStatus(id))
    onClose()
  }

    return(
        <>
          <ButtonGroup
            h={'5vh'}
            size={'sm'}
            onClick={onOpen}
            display={'flex'}
            spacing={0}
            _hover={{
            color: 'logo.orange'
            }}
            >
          <IconButton
            disabled={
              user.SellerID === 3 ? false :
              invoice[0].Payment_Stamp === 0 ? false : true 
            }
            variant={'unstyled'}           
            fontWeight={'normal'}
            icon={<MdOutlineCancel/>}/>
          <Button
            disabled={
              user.SellerID === 3 ? false :
              invoice[0].Payment_Stamp === 0 ? false : true 
            }
            variant={'unstyled'}           
            fontWeight={'normal'}
            >Cancel Quote</Button>
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
               <Text>Are you sure you want to cancel this Quote?</Text>
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
    )
}

export default ChangeStatus
