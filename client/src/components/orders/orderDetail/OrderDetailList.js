import { Box, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import CancerlOrderModal from './cancelOrderModal'

const OrderDetailList = ({order}) => {

  useEffect(()=>{},[order])

  return(
    <>
      <Box
        userSelect={'none'}
        className={'order-details'}
        mt={'3vh'}
        ml={'2vw'}
        mr={'1vw'}
        py={'2vw'}
        px={'2vw'}
        h={'44vh'}
        w={'24vw'}
        display={'flex'}
        flexDir={'column'}
        color={'web.text'}
        bg={'web.sideBar'}
        border={'1px solid'} 
        rounded={'md'} 
        borderColor={'web.border'} 
        > 
        {/*Title box*/}       
        <Box 
          display={'flex'} 
          flexDir={'row'} 
          alignItems={'center'}
          justifyContent={'space-between'}
          >
          <Box
           display={'flex'} 
           flexDir={'row'} 
           alignItems={'baseline'}>
            <Text 
            color={'logo.orange'} 
            fontSize={'3.2vh'}>
              {order[0].OrderID.includes('.') ? order[0].OrderID.split('.')[0] +'/'+ order[0].OrderID.split('.')[1] : order[0].OrderID}
            </Text>
            <Text
              fontSize={'2.3vh'} 
              color={'web.text2'} 
              ml={'1vh'}>
              Order Details
            </Text>
          </Box>
          <CancerlOrderModal order={order}/>  
        </Box>
        {/*Descriptions*/}
        <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} px={'1vh'}>
        <Box
          mt={'1vh'}
          w={'8vw'}
          h={'30vh'}
          display={'flex'}
          flexDir={'column'}
          justifyContent={'space-between'}>
          <Box>
            <Text 
            fontSize={'1.6vh'} 
            color={'web.text2'}> 
              Factory name
            </Text>
            <Text 
              fontSize={'2.05vh'} 
              fontWeight={'bold'}>
                {order[0].FactoryName}
            </Text>
          </Box>
          <Box>
            <Text 
              color={'web.text2'} 
              fontSize={'1.6vh'}>
                Date
            </Text>
            <Text 
              fontSize={'2.05vh'} 
              fontWeight={'bold'}>
                {order[0].InvoiceDate ? order[0].InvoiceDate.split('T')[0] : '-'}
            </Text>
          </Box>
          <Box>
            <Text 
              fontSize={'1.6vh'} 
              color={'web.text2'}>
                Freight Invoice
            </Text>
            <Text 
              fontSize={'2.05vh'}
              fontWeight={'bold'}>
                {order[0].idFreightInvoice == null ? '-' : order[0].idFreightInvoice}
            </Text>
          </Box>
          <Box>
            <Text 
                color={'web.text2'} 
                fontSize={'1.6vh'}>
                  Value
              </Text>
              <Text 
                fontSize={'2.05vh'} 
                fontWeight={'bold'}>
                  $ {order[0].Value.toLocaleString('en-US')}
              </Text>
          </Box>
        </Box>
        <Box
          mt={'1vh'}
          w={'8vw'}
          h={'30vh'}
          display={'flex'}
          flexDir={'column'}
          justifyContent={'space-between'}>
          <Box>
            <Text 
              fontSize={'1.6vh'}
              color={'web.sideBar'}
              >
              Ordered By
            </Text>
            <Text
              color={'web.sideBar'}
              fontSize={'2.05vh'}
              w={'12vw'} 
              fontWeight={'bold'}>
                {order[0].Order_By ? order[0].Order_By.split('@')[0] : '-'}
            </Text>
          </Box>       
          <Box>
          <Text 
            fontSize={'1.6vh'}
            color={'web.text2'}
            >
              Ordered By
          </Text>
          <Text
            fontSize={'2.05vh'}
            w={'12vw'} 
            fontWeight={'bold'}>
              {order[0].Order_By ? order[0].Order_By.split('@')[0] : '-'}
          </Text>
          </Box>
          <Box>
          <Text 
            fontSize={'1.6vh'} 
            color={'web.text2'}>
              Status
          </Text>
          <Text 
            fontSize={'2.05vh'} 
            fontWeight={'bold'}>
              {order[0].Status}
          </Text>
          </Box>
          <Box>
          <Text 
            color={'web.text2'} 
            fontSize={'1.6vh'}>
              Payment
          </Text>
          <Text 
            fontSize={'2.05vh'} 
            fontWeight={'bold'}>
              { order[0].Payment == null ? '-' : order[0].Payment }
          </Text>
          </Box>

        </Box> 
        </Box>
        </Box>

    </>
  )
}

export default OrderDetailList