import { 
    ButtonGroup, 
    IconButton,
    useDisclosure,
    Tooltip
    } from "@chakra-ui/react"
    import SelectCustomerModal from "../createQuote/selectCustomerModal";
    import {AiOutlineFileAdd} from 'react-icons/ai';


const CreateInvoiceButton = ({customers}) => {
  
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()

    return(
      <>
        <ButtonGroup
            onClick={() => {
              onOpen1()
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
              }}/>
          </Tooltip>
          <SelectCustomerModal isOpen1={isOpen1} onClose1={onClose1} customers={customers}/> 
        </ButtonGroup>
      </>
    )
}

export default CreateInvoiceButton

