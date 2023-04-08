import { 
    Button, 
    ButtonGroup, 
    IconButton,
    useDisclosure,
    } from "@chakra-ui/react"
import { BsListUl } from 'react-icons/bs';
import DeliveryNotesListModal from "./DeliveryNotesListModal";


const DeliveryNotesListButton = ({user, invoice, deliveries}) => {

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
        disabled={false}
        variant={'unstyled'}           
        fontWeight={'normal'}
        icon={<BsListUl/>}/>
      <Button
        disabled={false}
        variant={'unstyled'}           
        fontWeight={'normal'}
        >Delivery Notes List
      </Button>
    <DeliveryNotesListModal isOpen={isOpen} onClose={onClose} invoice={invoice} deliveries={deliveries}/> 
    </ButtonGroup>
  </>
  )
}

export default DeliveryNotesListButton