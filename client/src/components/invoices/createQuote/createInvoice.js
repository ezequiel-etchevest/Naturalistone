import { 
    ButtonGroup, 
    IconButton,
    useDisclosure,
    Tooltip
    } from "@chakra-ui/react"
    import SelectCustomerModal from "../createQuote/selectCustomerModal";
    import {AiOutlineFileAdd} from 'react-icons/ai';


const CreateInvoiceButton = ({userId, customers}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
          <ButtonGroup
            onClick={() => {onOpen()
            }}
            display={'flex'}
            spacing={0}
            >
        <Tooltip placement={'bottom-start'} label={'Create new quote'} fontWeight={'hairline'}>      
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
          <SelectCustomerModal userId={userId} isOpen={isOpen} onClose={onClose} customers={customers}/> 
          </ButtonGroup>
        </>
    )
}

export default CreateInvoiceButton

