import{
	ButtonGroup,
	Button,
	IconButton,
  VStack,
  Text,
  Divider,
  Box,
  Modal,
  useDisclosure
} from '@chakra-ui/react';
import {AiOutlineMail, AiOutlineInfoCircle} from 'react-icons/ai';
import { MdOpenInNew } from 'react-icons/md'
import { BiAddToQueue } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalStamp from './modalStamp';
import CancelQuote from './modalStatus';
import CreateDeliveryButton from '../../deliveryQuotes/CreateDeliveryButton';
import DeliveryNotesListButton from '../../deliveryQuotes/DeliveryNotesListButton';
import ModalPDF from './modalPDF';
import { useNavigate } from 'react-router-dom';
import { AppearanceCharacteristics } from 'pdf-lib';
import ApproveQuote from './ApproveQuote';
import UpdateQuoteModal from '../updateQuote/updateQuoteModal';
import InvoiceSendEmail from './invoiceSendEmail';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerById } from '../../../redux/actions-customers';
import { useEffect } from 'react';

export const InvoiceDetailToolbar = ({invoice, payments, user, invoice_products, deliveries}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const customer = useSelector(state => state.customer_by_id)
  
  useEffect(() => {
    dispatch(getCustomerById(invoice[0].CustomerID))
  },[])

  return(
    <VStack mt={'3vh'} mb={'3vh'} w={'13vw'} alignItems={'flex-start'} pt={'2vh'}>
      <Text fontSize={'xs'} textColor={'web.text2'} w={'100%'}>Quote</Text>
      <Divider w={'100%'} textColor={'web.border'} />
      <Box pl={'1vh'} pb={'1vh'}>
        <ModalPDF invoice={invoice}/>
        <UpdateQuoteModal invoice={invoice} invoice_products={invoice_products}/>
        <ApproveQuote invoice={invoice} user={user}/>
        <ModalStamp invoice={invoice} payments={payments} />
        <CancelQuote invoice={invoice} user={user} />
      </Box>
      <Text fontSize={'xs'} textColor={'web.text2'} w={'100%'}>Customer</Text>
      <Divider w={'100%'} textColor={'web.border'}/>
      <Box pl={'1vh'}pb={'1vh'}>
        <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
         display={'flex'}
         spacing={0}
         _hover={{
         color: 'logo.orange'
         }}
         onClick={invoice && (()=>navigate(`/customers/${invoice[0].CustomerID}`))}
         >
        <IconButton
         variant={'unstyled'}           
         fontSize={'xl'}
         icon={<AiOutlineInfoCircle/>}/>
         <Button
         fontSize={'1vw'}
         variant={'unstyled'}           
         fontWeight={'normal'}

         >Customer Details</Button>       
        </ButtonGroup>
        <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
        	display={'flex'}
        	spacing={0}
           _hover={{
           color: 'logo.orange'
         	}}>
        <IconButton
         variant={'unstyled'}           
         fontWeight={'normal'}
         fontSize={'xl'}
         disabled={true}
         icon={<AiOutlineMail/>}/>
         <Button
         onClick={onOpen}
         fontSize={'1vw'}
         display={'flex'}
         alignSelf={'flex-start'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         disabled={false}
         >Contact Customer
        </Button>            
        </ButtonGroup>
         <InvoiceSendEmail isOpen={isOpen} onOpen={onOpen} onClose={onClose} customer={customer}/>
      </Box>
      <Text fontSize={'xs'} textColor={'web.text2'} w={'100%'}>Products</Text>
      <Divider w={'100%'}  textColor={'web.border'}/>
      <Box pl={'1vh'} pb={'1vh'}>
        <CreateDeliveryButton invoice={invoice} user={user} invoice_products={invoice_products} payments={payments}/>
        <DeliveryNotesListButton user={user} invoice={invoice} deliveries={deliveries} />
      </Box>
      <Text fontSize={'xs'} textColor={'web.text2'} w={'100%'}>Files</Text>
      <Divider w={'100%'} textColor={'web.border'}/>
      <Box pl={'1vh'} pb={'1vh'}>
      <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
         display={'flex'}
         spacing={0}
         _hover={{
         color: 'logo.orange'
         }}
         >
        <IconButton
         variant={'unstyled'}           
         fontSize={'xl'}
         disabled={true}
         icon={<MdOpenInNew/>}/>
         <Button
         fontSize={'1vw'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         disabled={true}
         >Open</Button>       
        </ButtonGroup>
        <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
         display={'flex'}
         spacing={0}
         _hover={{
         color: 'logo.orange'
         }}
         >
        <IconButton
         variant={'unstyled'}           
         fontSize={'xl'}
         disabled={true}
         icon={<BiAddToQueue/>}/>
         <Button
         fontSize={'1vw'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         disabled={true}
         >Add</Button>       
        </ButtonGroup>
        <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
         display={'flex'}
         spacing={0}
         _hover={{
         color: 'logo.orange'
         }}
         >
        <IconButton
         variant={'unstyled'}           
         fontSize={'xl'}
         disabled={true}
         icon={<AiOutlineDelete/>}/>
         <Button
         fontSize={'1vw'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         disabled={true}
         >Delete</Button>       
        </ButtonGroup>
      </Box>
    </VStack>
  )
}