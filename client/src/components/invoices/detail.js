import {Box, Divider, Text} from '@chakra-ui/react';



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
          w={'22vw'}
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
				    <Text fontSize={'md'}>Invoice number: {invoice[0].Naturali_Invoice}</Text>
            <Text fontSize={'md'}>Customer name: {invoice[0].Reference} </Text>
            <Text fontSize={'md'}>Customer email: {invoice[0].Email !== null ? invoice[0].Email : '-' } </Text>
				    <Text fontSize={'md'}>Amount: ${invoice[0].Value}</Text>
				    <Text fontSize={'md'}>Date: {invoice[0].InvoiceDate.split('T')[0]}</Text>
            <Text fontSize={'md'}>Payment percentaje: % </Text>
            <Text fontSize={'md'}>Pending amount: $</Text>
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
          w={'53vw'}>
          

      </Box>
      </Box>
      </Box>	
    )}
	{/* <Box>
			  <EditButtons invoice={invoice} setPdf={setPdf}/>  
		</Box>  */}

export default Detail;