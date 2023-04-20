import{
	ButtonGroup,
	Button,
	IconButton,
  VStack,
  Box
} from '@chakra-ui/react';
import {AiOutlineMail, AiOutlineInfoCircle} from 'react-icons/ai';
import ModalStamp from './modalStamp';
import ChangeStatus from './modalStatus';
import CreateDeliveryButton from '../../deliveryQuotes/CreateDeliveryButton';
import DeliveryNotesListButton from '../../deliveryQuotes/DeliveryNotesListButton';

const InvoicePanelButtons = ({invoice, payments, user, invoice_products, deliveries, windowWidth}) => {
     
    return(
        <>
					<VStack
            pl={'1vh'}
          	w={'13vw'}
          	display={'flex'}
          	flexDir={'column'}
          	alignItems={'flex-start'}
          	textColor={'web.text2'}
          	justifyContent={'space-between'}
            spacing={0}
          	>
              <ChangeStatus invoice={invoice} user={user} windowWidth={windowWidth}/>
              <CreateDeliveryButton invoice={invoice} user={user} invoice_products={invoice_products} windowWidth={windowWidth}payments={payments}/>
              <DeliveryNotesListButton user={user} invoice={invoice} deliveries={deliveries} windowWidth={windowWidth}/>
              <ButtonGroup
                h={'5vh'}
                size={'sm'}
                display={'flex'}
                spacing={0}
                _hover={{
                color: 'logo.orange'
                }}
                >
              <IconButton
                variant={'unstyled'}           
                fontSize={'1.5vw'}
                disabled={true}
                icon={<AiOutlineInfoCircle/>}/>
                {
                windowWidth > 1100 ? 
                <Button
                fontSize={'1vw'}
                variant={'unstyled'}           
                fontWeight={'normal'}
                disabled={true}
                >Customer Details</Button>
                 : null
                }        
              </ButtonGroup>
              <ButtonGroup
                h={'5vh'}
                size={'sm'}
              	display={'flex'}
              	spacing={0}
                  _hover={{
                  color: 'logo.orange'
                	}}>
              <IconButton
                variant={'unstyled'}           
                fontWeight={'normal'}
                fontSize={'1.5vw'}
                disabled={true}
                icon={<AiOutlineMail/>}/>
              {
                windowWidth > 1100 ? 
                <Button
                fontSize={'1vw'}
                display={'flex'}
                alignSelf={'flex-start'}
                variant={'unstyled'}           
                fontWeight={'normal'}
                disabled={true}
                >Contact Customer
              </Button>
                 : null
              }             
              </ButtonGroup>
            <ModalStamp invoice={invoice} payments={payments} windowWidth={windowWidth}/>
          </VStack>   
        </>
    )
}

export default InvoicePanelButtons