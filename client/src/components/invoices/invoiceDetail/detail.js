import { Box, Text } from '@chakra-ui/react';
import InvoiceProductList from './invoiceProductList';
import InvoiceDetailList from './invoiceDetailsList';
import PaymentList from './PaymentList';
import ModalPDF from './modalPDF';
import { InvoiceDetailToolbar } from './invoiceDetailToolbar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPayments  } from '../../../redux/actions-payments';
import { useParams } from "react-router-dom";



const Detail = ({invoice, payments, invoice_products, user, deliveries, windowWidth}) => {

  const { id } = useParams()
  const dispatch = useDispatch()
    useEffect(()=>{
      if(Object.entries(payments).length === 0) dispatch(getPayments(id))
    },[payments])

    return(
      <Box
        userSelect={'none'}
        bg={'web.bg'}
        ml={'16vw'}
        h={'92vh'}
        display={'flex'}
        flexDir={'row'}
        >
        <Box h={'92vh'} w={'69vw'} >
{/*Quote Details & Product Details*/}
        <Box mx={'2vw'} display={'flex'} >
          {
            Object.entries(payments).length ? (
            <InvoiceDetailList invoice={invoice} payments={payments}/>
              ):(
            <Text>Loading</Text>
              )
          }
{/*Payments Box*/}
       <Box
        mt={'3vh'}
        py={'1.5vw'}
        border={'1px solid'}
        rounded={'md'}
        borderColor={'web.border'}
        bg={'web.sideBar'}
        w={'41vw'}
        >
          {
           Object.entries(payments).length >= 1 ? (
              <PaymentList payments={payments} totalAmount={invoice[0].Value} invoice={invoice}/>
            ) : (
              <Text>No payments done yet</Text>
            )
          }
        </Box>
       </Box>
{/*ProductDetail Box*/}
        <Box
          mt={'1.5vh'}
          mb={'2vh'}
          ml={'2vw'}
          p={'1.5vw'}
          border={'1px solid'}
          rounded={'md'}
          borderColor={'web.border'}
          bg={'web.sideBar'}
          h={'40vh'}
          w={'65vw'}
          >
          {
            invoice_products.length ? (
              <InvoiceProductList invoice_products={invoice_products} invoice={invoice} />
            ) : (
              <Text color={'web.text'}> No products linked to this invoice</Text>
            )
          }
        </Box>
        </Box>
        <Box>
          <InvoiceDetailToolbar invoice={invoice} payments={payments
          } user={user} invoice_products={invoice_products} deliveries={deliveries}/>
        </Box>
      </Box>
      )
  }

export default Detail;







        // {/*Payment Details & Buttons*/}
        // <Box display={'flex'} mx={'1.5vw'} justifyContent={'space-between'} >

        //     <Box
        //       border={'1px solid'}
        //       bg={'web.sideBar'}
        //       borderColor={'web.border'}
        //       rounded={'md'}
        //       p={'2.5vh'}
        //       mt={'3vh'}
        //       w={ windowWidth > 1100 ? '30w' : '22vw'}
        //       minW={'230px'}
        //       h={'39vh'}
        //       justifyContent={'space-between'}
        //       display={'flex'}
        //       flexDir={'row-reverse'}
        //       ml={'1vw'}
        //       >
        //         {
        //         Object.entries(payments).length ? (
        //           <ModalPDF invoice={invoice} payments={payments} />
        //           ):(
        //             <Text>Loading</Text>
        //           )
        //         }
        //       <InvoicePanelButtons
        //         windowWidth={windowWidth}
        //         invoice={invoice}
        //         payments={payments}
        //         user={user}
        //         invoice_products={invoice_products}
        //         deliveries={deliveries}/>
        //     </Box>
        // </Box>
