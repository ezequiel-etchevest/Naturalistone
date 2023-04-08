import { 
    Button, 
    ButtonGroup, 
    IconButton,
    useDisclosure,
    Box
    } from "@chakra-ui/react"
import { BsTruck } from 'react-icons/bs';
import CreateDeliveryModal from "./CreateDeliveryModal";

const CreateDeliveryButton = ({invoice, user, invoice_products, payments, windowWidth}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

 //tambien tengo que ver el componente de las notas, xq hay un problema en la tabla con un child de tbody
 //falta hacer la logica para remaining pero todavia no estan las tablas
 //tengo que poner condiciones al input para que no supere ciertos valores segun lo que haya disponible

    const handleDisable = () => {
      if(user.Secction7Flag === 1){
        return false 
      } else {
        if(payments.paymentData.length > 0) return false
        else return true
      }
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
              disabled={handleDisable()}
              variant={'unstyled'}           
              fontWeight={'normal'}
              icon={<BsTruck/>}/>
            {
              windowWidth > 1100 ? 
              <Button
              disabled={handleDisable()}
              variant={'unstyled'}           
              fontWeight={'normal'}
              fontSize={'1vw'}
              >New Delivery Note
              </Button>
              : null
            }
          <CreateDeliveryModal invoice={invoice} user={user} isOpen={isOpen} onClose={onClose} invoice_products={invoice_products}/> 
          </ButtonGroup>
        </>
    )
}

export default CreateDeliveryButton

