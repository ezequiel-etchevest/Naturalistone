import { Box, Text } from '@chakra-ui/react';
import InvoiceProductList from './invoiceProductList';
import InvoiceDetailList from './invoiceDetailsList';
import PaymentList from './PaymentList';
import ModalPDF from './modalPDF';
import InvoicePanelButtons from './invoiceButtons';


const Detail = ({invoice, payments, invoice_products, user, deliveries, windowWidth}) => {

    return(
      <Box
        userSelect={'none'}
        bg={'web.bg'}  
        ml={'16vw'} 
        h={'92vh'}
        display={'flex'}
        flexDir={'column'}
        >
        {/*Quote Details & Product Details*/}
        <Box mx={'1.5vw'} display={'flex'} justifyContent={'space-between'}>
          {
            Object.entries(payments).length ? (
            <InvoiceDetailList invoice={invoice} payments={payments}/>
              ):(
            <Text>Loading</Text>
              )
          }
        <Box
          mt={'3vh'}
          pt={'1.5vw'}
          pb={'1.5vw'} 
          border={'1px solid'} 
          rounded={'md'} 
          borderColor={'web.border'} 
          bg={'web.sideBar'}
          h={'44vh'}
          w={'55vw'}>
          {
            invoice_products.length ? (
              <InvoiceProductList invoice_products={invoice_products} invoice={invoice} />
            ) : (
              <Text color={'web.text'}> No products linked to this invoice</Text>
            )
          }
        </Box>
       </Box>
        {/*Payment Details & Buttons*/}
        <Box display={'flex'} mx={'1.5vw'} justifyContent={'space-between'} >
        {/*Payments Box*/}
          <Box
            mt={'3vh'}
            p={'1vw'} 
            border={'1px solid'} 
            rounded={'md'} 
            borderColor={'web.border'} 
            bg={'web.sideBar'}
            h={'39vh'}
            w={ windowWidth > 1100 ? ('54vw') : ('64vw')}
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
              mt={'3vh'}
              w={ windowWidth > 1100 ? '30w' : '22vw'}
              minW={'230px'} 
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
              <InvoicePanelButtons
                windowWidth={windowWidth} 
                invoice={invoice} 
                payments={payments} 
                user={user} 
                invoice_products={invoice_products} 
                deliveries={deliveries}/>
            </Box>
        </Box>
      </Box>	
      )
  }

export default Detail;
