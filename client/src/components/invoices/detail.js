import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import InvoiceProductList from '../invoices/invoiceProductList';
import InvoiceDetailList from './invoiceDetailsList';
import PaymentList from './PaymentList';




const Detail = ({invoice}) => {
  const payments = useSelector(state => state.payments_by_id)
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
          pl={'2vw'}
          pt={'1.5vw'}
          pr={'1.5vw'}
          pb={'1.5vw'} 
          border={'1px solid'} 
          rounded={'md'} 
          borderColor={'web.border'} 
          bg={'web.sideBar'}
          h={'44vh'}
          w={'48vw'}>
          <InvoiceProductList/> 
      </Box>
      </Box>
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
          w={'46vw'}>
        <PaymentList payments={payments}/> 
        </Box>
      </Box>	
    )}

export default Detail;