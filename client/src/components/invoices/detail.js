import {Box, Text} from '@chakra-ui/react';
import EditButtons from '../editButtons';
import { useState } from 'react';
import PdfVisual from '../pdf/pdfiVisual';


const Detail = ({invoice}) => {

	const [pdf, setPdf ] = useState('')

  return(
    <Box
      bg={'web.bg'}  
      ml={'20vw'} 
      h={'90vh'}
      display={'flex'}
      flexDir={'row'}
      >	
    	<Box
        display={'flex'}
        flexDir={'column'}
        border={'2px green solid'}
        h={'86vh'}
        pt={'4vh'}
        w={'50vw'}
        >
        <Box
          border={'2px blue solid'}
          h={'46vh'}
          w={'50vw'}
          display={'flex'}
          flexDir={'row'}
          >
          <Box w={'25vw'} >
            <Text fontSize={'xl'}>Invoice Details</Text>
				    <Text fontSize={'5xl'}>{invoice[0].Naturali_Invoice}</Text>  
          </Box>
          <Box w={'25vw'}>
            <Text fontSize={'md'}>Customer: {invoice[0].CustomerID}</Text>
				    <Text fontSize={'md'}>Amount: ${invoice[0].Value}</Text>
				    <Text fontSize={'md'}>Date: {invoice[0].InvoiceDate.split('T')[0]}</Text>
				    <Text fontSize={'md'}>Payment Status: {invoice[0].PaymentStatus === null ? 'Unpaid' : 'Paid'}</Text>
				    <Text fontSize={'md'}>Payment Method: {invoice[0].PaymentMethod === null ? '-' : invoice[0].PaymentMethod}</Text>
				    <Text fontSize={'md'}>Shipping Method: {invoice[0].ShippingMethod === null ? '-' : invoice[0].ShippingMethod}</Text>
          </Box>
        </Box>
        <Box w={'50vw'} h={'40vh'} border={'2px solid pink'}></Box>
      </Box>
      <Box
        border={'2px red solid'}
        w={'30vw'}
        h={'86vh'}
        pt={'4vh'}
        >
        <Box w={'30vw'} h={'71vh'} border={'2px solid yellow'}></Box> 
        <Box w={'30vw'} h={'11vh'} border={'2px solid green'} >
          </Box> 
      </Box>
    </Box>
    )}
	{/* <Box>
			  <EditButtons invoice={invoice} setPdf={setPdf}/>  
		</Box>  */}

export default Detail;