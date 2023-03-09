import { Box, Text } from '@chakra-ui/react';
import InvoiceProductList from './invoiceProductList';
import InvoiceDetailList from './invoiceDetailsList';
import PaymentList from './PaymentList';
import ModalPDF from './modalPDF';
import InvoicePanelButtons from './invoiceButtons';


const Detail = ({invoice, payments, invoice_products, user, deliveries}) => {
  
    return(
      <Box
        userSelect={'none'}
        bg={'web.bg'}  
        ml={'20vw'} 
        h={'92vh'}
        display={'flex'}
        flexDir={'column'}
        >
        {/*Quote Details & Product Details*/}
        <Box
          display={'flex'}
          flexDir={'row'}
          >
            {
              Object.entries(payments).length ? (
                <InvoiceDetailList invoice={invoice} payments={payments}/>
                ) : (
                  <Text>Loading</Text>
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
          w={'48vw'}>
          {
            invoice_products.length ? (
              <InvoiceProductList invoice_products={invoice_products}  />
            ) : (
              <Text color={'web.text'}> No products linked to this invoice</Text>
            )
          }
        </Box>
       </Box>
        {/*Payment Details & Buttons*/}
        <Box
          display={'flex'}
          flexDir={'reverse'}
          w={'80vw'}
          justifyContent={'space-between'}
          >
            {/*Payments Box*/}
            <Box
              mt={'3vh'}
              ml={'2vw'}
              mr={'1vw'}
              p={'1vw'} 
              border={'1px solid'} 
              rounded={'md'} 
              borderColor={'web.border'} 
              bg={'web.sideBar'}
              h={'39vh'}
              w={'44vw'}
              > 
              {
               Object.entries(payments).length >= 1 ? (
                  <PaymentList payments={payments} totalAmount={invoice[0].Value} invoice={invoice} /> 
                ) : (
                  <Text>No payments done yet</Text>
                )
              }
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
                {
                Object.entries(payments).length ? (
                  <ModalPDF invoice={invoice} payments={payments} />
                  ):(
                    <Text>Loading</Text>
                  )
                }
              <InvoicePanelButtons invoice={invoice} payments={payments} user={user} invoice_products={invoice_products} deliveries={deliveries}/>
            </Box>
        </Box>
      </Box>	
      )
  }

export default Detail;
