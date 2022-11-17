import {Box, Text} from '@chakra-ui/react';
import { useSelector } from 'react-redux';


const Detail = () => {
	
	const invoice = useSelector(state=>state.invoice)
	console.log(invoice)
    
    return(
      <Box
        ml={'20vw'} h={'92vh'} border={'2px solid red'}>
      	<Box ml={'4vw'} mt={'6vh'}>
        	<Text fontSize={'xl'}>Invoice Details</Text>
					<Text fontSize={'5xl'}>-{invoice[0].Naturali_Invoice}</Text>
        </Box>
				<Box ml={'4vw'} mt={'6vh'}>
        	<Text fontSize={'md'}>Customer: {invoice[0].CustomerID}</Text>
					<Text fontSize={'md'}>Amount: ${invoice[0].Value}</Text>
					<Text fontSize={'md'}>Date: {invoice[0].InvoiceDate.split('T')[0]}</Text>
					<Text fontSize={'md'}>Payment Status: {invoice[0].PaymentStatus === null ? 'Unpaid' : 'Paid'}</Text>
					<Text fontSize={'md'}>Payment Method: {invoice[0].PaymentStatus === null ? '-' : 'Cash'}</Text>
					<Text fontSize={'md'}>Shipping Method: {invoice[0].PaymentStatus === null ? '-' : 'Cash'}</Text>
					
					


					


        </Box>

        
        </Box>
    )
}
export default Detail;