import { Box, Text, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import InvoiceProductList from '../invoices/invoiceProductList';
import InvoiceDetailList from './invoiceDetailsList';
import PaymentList from './PaymentList';
import { useDispatch } from 'react-redux';
import { getPayments } from '../../redux/actions-payments';
import { useEffect } from 'react';
import miniPDF from '../../assets/miniPDF.png'
import ModalPDF from './modalPDF';




const Detail = ({invoice}) => {

  const dispatch = useDispatch()
  const payments = useSelector(state => state.payments_by_id)
  const invoice_products = useSelector(state=> state.invoice_products)

  useEffect(()=>{
    if(Object.entries(payments).length <= 1){
      dispatch(getPayments(invoice[0].Naturali_Invoice))
    }
  },[payments])
    return(
      <Box
        bg={'web.bg'}  
        ml={'20vw'} 
        h={'92vh'}
        display={'flex'}
        flexDir={'column'}
        >
        <Box
          display={'flex'}
          flexDir={'row'}
          >
          <InvoiceDetailList invoice={invoice} payments={payments}/>
          <Box
            mt={'3vh'}
            ml={'1vw'}
            mr={'1vw'}
            pt={'1.5vw'}
            pb={'1.5vw'} 
            border={'1px solid'} 
            rounded={'md'} 
            borderColor={'web.border'} 
            bg={'web.sideBar'}
            h={'44vh'}
            w={'48vw'}>
            {
              invoice_products.length ? (
                <InvoiceProductList invoice_products={invoice_products} />
              ) : (
                <Text color={'web.text'}>No products linked to this invoice</Text>
              )
            }
             
        </Box>
        </Box>
        <Box
        display={'flex'}
        flexDir={'row'}
        w={'76vw'}
        justifyContent={'space-between'}
        >
          <Box
              mt={'3vh'}
              ml={'2vw'}
              mr={'1vw'}
              p={'2vw'} 
              border={'1px solid'} 
              rounded={'md'} 
              borderColor={'web.border'} 
              bg={'web.sideBar'}
              h={'39vh'}
              w={'46vw'}
              >
            {
             Object.entries(payments).length >= 1 ? (
                <PaymentList payments={payments} totalAmount={invoice[0].Value}/> 
              ) : (
                <Text>No payments done yet</Text>
              )
            }
          </Box>
          <Box 
            w={'15vw'} 
            h={'39vh'} 
            justifyContent={'center'} 
            display={'flex'}
            mt={'3vh'}
            ml={'2vw'}
            mr={'1vw'}
            >
            <ModalPDF/>
          </Box>
        </Box>
        </Box>	
      )
  }

export default Detail;
