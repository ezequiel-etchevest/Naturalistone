import {Box, Divider, Text} from '@chakra-ui/react';
import ProductList from '../products/productsList';
import EditButtons from '../editButtons';



const Detail = ({invoice}) => {

  return(
    <Box
      bg={'web.bg'}  
      ml={'20vw'} 
      h={'92vh'}
      display={'flex'}
      flexDir={'row'}
      >
    	<Box
        display={'flex'}
        flexDir={'row'}
        >
        <Box
          className={'invoice-details'}
          mt={'3vh'}
          ml={'2vw'}
          mr={'1vw'}
          p={'2vw'}
          h={'46vh'}
          w={'28vw'}
          display={'flex'}
          flexDir={'column'}
          color={'web.text'}
          bg={'web.sideBar'}
          border={'1px solid'} 
          rounded={'md'} 
          borderColor={'web.border'} 
          >          
          <Text fontSize={'xl'}>Invoice Details</Text>
          <Box mt={'3vh'}>
				    <Text fontSize={'sm'}>Invoice number: {invoice[0].Naturali_Invoice}</Text>
            <Text fontSize={'sm'}>Customer name: {invoice[0].Reference} </Text>
            <Text fontSize={'sm'}>Customer email: {invoice[0].Email !== null ? invoice[0].Email : '-' } </Text>
				    <Text fontSize={'sm'}>Amount: ${invoice[0].Value}</Text>
				    <Text fontSize={'sm'}>Date: {invoice[0].InvoiceDate.split('T')[0]}</Text>
            <Text fontSize={'sm'}>Payment percentaje: % </Text>
            <Text fontSize={'sm'}>Pending amount: $</Text>
          </Box>
        </Box> 
        <Box
          mt={'3vh'}
          ml={'1vw'}
          mr={'1vw'}
          p={'2vw'} 
          border={'1px solid'} 
          rounded={'md'} 
          borderColor={'web.border'} 
          bg={'web.sideBar'}
          h={'46vh'}
          w={'46vw'}>
          {/* <ProductList/> */}
          
    <Box>
			  <EditButtons  />  
		</Box> 

      </Box>
      </Box>
      </Box>	
    )}

export default Detail;