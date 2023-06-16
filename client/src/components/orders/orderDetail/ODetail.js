import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import OrderDetailList from './OrderDetailList';
import OrderProductList from './OrderProductList'
import ProformaList from "./orderProforma";

const ODetail = ({order, order_products, proformas}) => {

  return(
    <Box
      bg={'web.bg'}  
      ml={'16vw'} 
      h={'92vh'}
      display={'flex'}
      flexDir={'column'}
      >
      <Box
      display={'flex'}
      flexDir={'column'}
      >
        <Box
          display={'flex'}
          flexDir={'row'}
        >
          {
            Object.entries(order).length ? (
              <OrderDetailList order={order}/>
              ):(
              <Center ml={'16vh'} bg={'web.bg'} h={'92vh'}>
                <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
              </Center>
             )
            }
            <ProformaList proformas={proformas}/>
        </Box>
      <Box
        mt={'3vh'}
        ml={'2vw'}
        mr={'2vw'}
        pt={'1.5vw'}
        pb={'1.5vw'} 
        border={'1px solid'} 
        rounded={'md'} 
        borderColor={'web.border'} 
        bg={'web.sideBar'}
        h={'40vh'}
        w={'76vw'}>
        {
          order_products.length ? (
            <OrderProductList order_products={order_products}  />
          ) : (
            <Center w={'full'} h={'full'}>
            <Text userSelect={'none'} color={'web.border'} fontSize={'2.3vh'}>No products linked to this order</Text>
            </Center>
          )
        }
        </Box>
        </Box>
        {/* <Box
        display={'flex'}
        flexDir={'reverse'}
        w={'80vw'}
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
              w={'44vw'}
              >
          </Box> 
          <Box
            border={'1px solid'}
            bg={'web.sideBar'}
            borderColor={'web.border'}
            rounded={'md'}
            p={'2.5vh'}
            mr={'2vw'}
            mt={'3vh'}
            w={'30vw'} 
            h={'39vh'} 
            justifyContent={'space-between'} 
            display={'flex'}
            flexDir={'row-reverse'}
            ml={'1vw'}
            >
              {/* {
              Object.entries(payments).length ? (
                <ModalPDF invoice={invoice} payments={payments} />
                ):(
                  <Text>Loading</Text>
                )
              } */}
            {/* <InvoicePanelButtons/>
            </Box>  
          </Box>*/}
        </Box>	
      )
  }

export default ODetail;
