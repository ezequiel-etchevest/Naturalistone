import { 
    Button, 
    ButtonGroup, 
    IconButton,
    useDisclosure,
    Box,
    Tooltip
    } from "@chakra-ui/react"
import {AiOutlineFileAdd} from 'react-icons/ai';
import CreateCustomerModal from "../customers/createCustomerModal";


const CreateInvoiceButton = ({userId}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
          <ButtonGroup
            onClick={() => {onOpen()
            }}
            display={'flex'}
            spacing={0}
            >
        <Tooltip placement={'bottom-start'} label={'Clear all filters'} fontWeight={'hairline'}>      
        <IconButton
            icon={ <AiOutlineFileAdd/>}
            variant={'unstyled'} 
            display={'flex'} 
            borderRadius={'sm'} 
            placeContent={'center'}
            alignItems={'center'}
            fontSize={'xl'}
            color={'web.text2'} 
            _hover={{
               color: 'logo.orange'
               }}
            _active={{
            }}
            >
            </IconButton>
          </Tooltip>
          <CreateCustomerModal userId={userId} isOpen={isOpen} onClose={onClose}/> 
          </ButtonGroup>
        </>
    )
}

export default CreateInvoiceButton

