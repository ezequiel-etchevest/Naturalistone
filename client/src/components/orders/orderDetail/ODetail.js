import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import OrderDetailList from './OrderDetailList';
import OrderProductList from './OrderProductList'

const ODetail = ({order, order_products}) => {

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
            {
              Object.entries(order).length ? (
                <OrderDetailList order={order}/>
                ) : (
                <Center ml={'20vh'} bg={'web.bg'} h={'92vh'}>
                  <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
                </Center>
                )
            }
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
            w={'46vw'}>
            {
              order_products.length ? (
                <OrderProductList order_products={order_products}  />
              ) : (
                <Text color={'web.text'}> No products linked to this order</Text>
              )
            }
        </Box>
        </Box>
        <Box
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
            {/* <InvoicePanelButtons/> */}
            </Box> 
          </Box>
        </Box>	
      )
  }

export default ODetail;
