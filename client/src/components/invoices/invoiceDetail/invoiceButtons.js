import{
	Box,
	ButtonGroup,
	Button,
	IconButton
} from '@chakra-ui/react';
import {AiOutlineMail, AiOutlineInfoCircle} from 'react-icons/ai';
import ModalStamp from './modalStamp';
import ChangeStatus from './modalStatus';
import CreateDeliveryButton from '../../deliveryQuotes/CreateDeliveryButton';
import DeliveryNotesListButton from '../../deliveryQuotes/DeliveryNotesListButton';

const InvoicePanelButtons = ({invoice, payments, user, invoice_products, deliveries}) => {
     
    return(
        <>
					<Box
          	w={'13vw'}
          	display={'flex'}
          	flexDir={'column'}
          	alignItems={'flex-start'}
          	textColor={'web.text2'}
          	rounded={'md'}
          	justifyContent={'space-between'}
          	>
            <Box>
              <ChangeStatus invoice={invoice} user={user}/>
              <CreateDeliveryButton invoice={invoice} user={user} invoice_products={invoice_products}/>
              <DeliveryNotesListButton user={user} invoice={invoice} deliveries={deliveries}/>
              <ButtonGroup
                display={'flex'}
                spacing={0}
                _hover={{
                color: 'logo.orange'
                }}
                >
              <IconButton
                variant={'unstyled'}           
                fontWeight={'normal'}
                disabled={true}
                icon={<AiOutlineInfoCircle/>}/>
              <Button
                variant={'unstyled'}           
                fontWeight={'normal'}
                disabled={true}
                >Customer Details</Button>
              </ButtonGroup>
              <ButtonGroup
              	display={'flex'}
              	spacing={0}
                  _hover={{
                  color: 'logo.orange'
                	}}>
              <IconButton
                variant={'unstyled'}           
                fontWeight={'normal'}
                disabled={true}
                icon={<AiOutlineMail/>}/>
              <Button
                display={'flex'}
                alignSelf={'flex-start'}
                variant={'unstyled'}           
                fontWeight={'normal'}
                disabled={true}
                >Contact Customer
              </Button>
              </ButtonGroup>
            <ModalStamp invoice={invoice} payments={payments}/>
          </Box>
          </Box>   
        </>
    )
}

export default InvoicePanelButtons