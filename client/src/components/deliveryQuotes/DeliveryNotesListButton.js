import { 
    Button, 
    ButtonGroup, 
    IconButton,
    useDisclosure,
    Box
    } from "@chakra-ui/react"
import { BsListUl } from 'react-icons/bs';
import DeliveryNotesListModal from "./DeliveryNotesListModal";


const DeliveryNotesListButton = ({user, invoice, deliveries, windowWidth}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
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
        fontSize={'1.5vw'}
        disabled={false}
        variant={'unstyled'}           
        fontWeight={'normal'}
        icon={<BsListUl/>}/>
      {
        windowWidth > 1100 ? 
          <Button
            fontSize={'1vw'}
            disabled={false}
            variant={'unstyled'}           
            fontWeight={'normal'}
            >Delivery Notes List</Button>
         : null
      }        
      <DeliveryNotesListModal isOpen={isOpen} onClose={onClose} invoice={invoice} deliveries={deliveries}/> 
    </ButtonGroup>
  </>
  )
}

export default DeliveryNotesListButton