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
      textColor={'web.text2'}
      h={'5vh'}
      onClick={onOpen}
      display={'flex'}
      spacing={0}
      _hover={{
      color: 'logo.orange'
      }}
      >
      <IconButton
        fontSize={'xl'}
        disabled={false}
        variant={'unstyled'}           
        fontWeight={'normal'}
        icon={<BsListUl/>}/>
          <Button
            fontSize={'1vw'}
            disabled={false}
            variant={'unstyled'}           
            fontWeight={'normal'}
            >Delivery Notes List</Button>
      <DeliveryNotesListModal isOpen={isOpen} onClose={onClose} invoice={invoice} deliveries={deliveries}/> 
    </ButtonGroup>
  </>
  )
}

export default DeliveryNotesListButton