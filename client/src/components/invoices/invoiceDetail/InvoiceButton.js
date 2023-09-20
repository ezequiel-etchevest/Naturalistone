import { 
    Button, 
    ButtonGroup, 
    IconButton,
    useDisclosure,
    } from "@chakra-ui/react"
import { MdOpenInNew } from 'react-icons/md'
import '../../../assets/styleSheet.css';
import { InvoiceModal } from "./InvoiceModal";

const InvoiceButton = ({invoice, user, handleDisabled}) => {

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
            variant={'unstyled'}           
            fontWeight={'normal'}
            icon={<MdOpenInNew/>}/>
              <Button
                variant={'unstyled'}           
                fontWeight={'normal'}
                fontSize={'1vw'}
                >Invoice</Button>   
          </ButtonGroup>
          <InvoiceModal isOpen={isOpen} onClose={onClose}/>
        </>
    )
}

export default InvoiceButton
