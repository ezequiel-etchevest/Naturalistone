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
import {AiOutlineInfoCircle} from 'react-icons/ai';
import { MdOpenInNew } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalStamp from './modalStamp';
import CancelQuote from './modalStatus';
import CreateDeliveryButton from '../../deliveryQuotes/CreateDeliveryButton';
import DeliveryNotesListButton from '../../deliveryQuotes/DeliveryNotesListButton';
import ModalPDF from './modalPDF';
import { useNavigate } from 'react-router-dom';
import ApproveQuote from './ApproveQuote';
import UpdateQuoteModal from '../updateQuote/updateQuoteModal';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerById } from '../../../redux/actions-customers';
import { useEffect, useState } from 'react';
import { getInvoiceById } from '../../../redux/actions-invoices';
import InvoiceButton from './InvoiceButton';
import AddFiles from '../../products/productDetail/addNewImagesModal';
import SendEmailModalQuote from './sendEmailQuote';

export const InvoiceDetailToolbar = ({invoice, payments, user, invoice_products, deliveries}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const customer = useSelector(state => state.customer_by_id)
  const invoiceStatus = invoice[0].Status === 'Pending_Approval' ? false : true
  const [invoiceButton, setInvoiceButton] = useState(invoiceStatus);

  const handleDisabled = () => {
      if(!invoiceButton && user.Secction7Flag === 1) return false
      else return true
  }

  useEffect(() => {
    dispatch(getCustomerById(invoice[0].CustomerID))
    dispatch(getInvoiceById(invoice[0].Naturali_Invoice))
  },[])
  
  useEffect(() => {
    invoice[0].Status === 'Pending_Approval' ? setInvoiceButton(false) : setInvoiceButton(true)
  },[invoice])
  
  handleDisabled()

  return(
    <VStack mt={'3vh'} mb={'3vh'} w={'13vw'} alignItems={'flex-start'} pt={'2vh'}>
      <Text fontSize={'xs'} textColor={'web.text2'} w={'100%'}>Quote</Text>
      <Divider w={'100%'} textColor={'web.border'} />
      <Box pl={'1vh'} pb={'1vh'}>
        <ModalPDF invoice={invoice}/>
        <UpdateQuoteModal invoice={invoice} invoice_products={invoice_products}/>
        {
          invoiceButton
          ? <InvoiceButton invoice={invoice} user={user} handleDisabled={handleDisabled}/>
          : <ApproveQuote invoice={invoice} user={user} handleDisabled={handleDisabled}/>
        }
        <ModalStamp invoice={invoice} payments={payments} />
        <CancelQuote invoice={invoice} user={user} payments={payments}/>
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
         <SendEmailModalQuote customer={customer} isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
         <Button
         onClick={onOpen}
         fontSize={'1vw'}
         display={'flex'}
         alignSelf={'flex-start'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         >Contact Customer
        </Button>            
        </ButtonGroup>
         {/* <InvoiceSendEmail isOpen={isOpen} onOpen={onOpen} onClose={onClose} customer={customer}/> */}
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
        <AddFiles
        allowedFileTypes={['application/pdf']}
        fieldName={'pdf'}
        title={'Add'}
        url={`/upload/quote/${invoice[0].Naturali_Invoice}`}
        pxButton={""}
        />
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