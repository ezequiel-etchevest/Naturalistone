import { 
    Button, 
    ButtonGroup, 
    IconButton,
    useDisclosure,
    } from "@chakra-ui/react"
import { BsTruck } from 'react-icons/bs';
import CreateDeliveryModal from "./CreateDeliveryModal";

const CreateDeliveryButton = ({invoice, user, invoice_products}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  
 //tambien tengo que ver el componente de las notas, xq hay un problema en la tabla con un child de tbody
 //falta hacer la logica para remaining pero todavia no estan las tablas
 //tengo que poner condiciones al input para que no supere ciertos valores segun lo que haya disponible

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
          <CreateDeliveryModal invoice={invoice} user={user} isOpen={isOpen} onClose={onClose} invoice_products={invoice_products}/> 
          </ButtonGroup>
        </>
    )
}

export default CreateDeliveryButton

