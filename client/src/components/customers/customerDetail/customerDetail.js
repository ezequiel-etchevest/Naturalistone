import { Box, HStack } from "@chakra-ui/react";
import CustomerInformation from './customerInformation';

const CustomerDetail = ({user, customer}) => {

return(
  <>     
    <Box 
    bg={'web.bg'}  
    ml={'16vw'} 
    h={'92vh'}
    display={'flex'} 
    >
      <Box 
      display={'flex'} 
      flexDir={'column'}
      mt={'3vh'}
      ml={'2vw'}
      >
      {/*Customer info & notes */}
        <Box
        display={'flex'} 
        flexDir={'row'}>
          <CustomerInformation customer={customer}/>
          {/* <ProductNotes product={product} user={user}/> */}
        </Box>
      {/*Boxes */}
        <Box
        display={'flex'} 
        flexDir={'row'}>          
        </Box>
      </Box>
      {/*Boxes*/}
      <Box 
      ml={'1vw'} 
      mt={'3vh'} 
      display={'flex'} 
      flexDir={'column'} >
      </Box>          
    </Box>        
  </>
)
}

export default CustomerDetail;