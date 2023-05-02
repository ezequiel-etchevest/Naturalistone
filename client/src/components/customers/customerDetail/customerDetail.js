import { Box, HStack, Text } from "@chakra-ui/react";
import CustomerInformation from './customerInformation';
import ProjectList from "./projectList";
import InvoiceList from "./invoiceList";
import { useState } from "react";

const CustomerDetail = ({user, customer, projects_by_customer_id}) => {


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
        flexDir={'row'}
        my={'3vh'}
        ml={'2vw'}
        >
        {/*Customer info & notes */}
          <Box
          display={'flex'} 
          flexDir={'row'}>
            <CustomerInformation customer={customer}/>
          </Box>
        {/*Boxes */}
          <Box
            mx={'1vw'}
            h={'41.5vh'}
            display={'flex'}
            userSelect={'none'}
            px={'1.5vw'}
            py={'3vh'}
            w={'60vw'}
            flexDir={'column'}
            color={'web.text'}
            bg={'web.sideBar'}
            border={'1px solid'} 
            rounded={'md'} 
            borderColor={'web.border'}
            >
              <Text
                alignItems={'baseline'}
                justifySelf={'flex-start'}
                mb={'1vh'} 
                fontSize={'2.6vh'} 
                color={'web.text2'}
                  >Projects & Invoices</Text> 
              <Box display={'flex'} flexDir={'row'}>
                <ProjectList projects_by_customer_id={projects_by_customer_id}/>
                <InvoiceList/> 

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
      </Box>        
    </>
  )
  }

  export default CustomerDetail;