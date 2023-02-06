import { 
    Button, 
    ButtonGroup, 
    IconButton,
    useDisclosure,
    } from "@chakra-ui/react"
import { BsTruck } from 'react-icons/bs';
import DeliveryModal from "./DeliveryModal";

const DeliveryButton = ({invoice, user, invoice_products}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
 
    return(
        <>
          <ButtonGroup
            onClick={onOpen}
            display={'flex'}
            spacing={0}
            _hover={{
            color: 'logo.orange'
            }}
            >
            <IconButton
              disabled={(user.SellerID === 3 || user.SellerID === 5) ? false : true }
              variant={'unstyled'}           
              fontWeight={'normal'}
              icon={<BsTruck/>}/>
            <Button
              disabled={(user.SellerID === 3 || user.SellerID === 5) ? false : true }
              variant={'unstyled'}           
              fontWeight={'normal'}
              >New Delivery Note
            </Button>
          <DeliveryModal invoice={invoice} user={user} isOpen={isOpen} onClose={onClose} invoice_products={invoice_products}/> 
          </ButtonGroup>
        </>
    )
}

export default DeliveryButton

