import { Box, Text, Tooltip } from "@chakra-ui/react"
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
          w={'20vw'}
          >
          <Text 
            color={'logo.orange'}
            ml={'0.5vw'} 
            fontSize={'xl'}>
            {order[0].OrderID.includes('.') ? order[0].OrderID.split('.')[0] +'/'+ order[0].OrderID.split('.')[1] : order[0].OrderID}
          </Text>
          <CancerlOrderModal order={order}/>  
        </Box>
        {/*Descriptions*/}
        <Box display={'flex'} flexDir={'column'} justifyContent={'space-between'} px={'1vh'} h={'30vh'} w={'20vw'} mt={'2vh'}>
          <Box w={'20vw'}>
            <Text 
            fontSize={'0.8rem'} 
            color={'web.text2'}> 
              Factory name
            </Text>
            <Text 
              fontSize={'0.95rem'} 
              fontWeight={'bold'}>
                {order[0].FactoryName}
            </Text>
          </Box>
          <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} w={'20vw'}>
            <Box w={'11vw'}>
              <Text 
                color={'web.text2'} 
                fontSize={'0.8rem'}>
                  Date
              </Text>
              <Text 
                fontSize={'0.95rem'}
                pl={ order[0].InvoiceDate == null ? '2vw' : null}
                fontWeight={'bold'}>
                  { order[0].InvoiceDate ? order[0].InvoiceDate.split('T')[0] : '-' }
              </Text>
            </Box>
            <Box w={'7vw'}>
              <Text 
                fontSize={'0.8rem'}
                color={'web.text2'}
                >
                Ordered by
              </Text>
              <Text
                color={'web.text'}
                fontSize={'0.95rem'}
                pl={ order[0].Order_By == null ? '1vw' : null}
                fontWeight={'bold'}>
                  { order[0].Order_By ? order[0].Order_By.split('@')[0] : '-' }
              </Text>
            </Box>
          </Box>
          <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} w={'20vw'}>
            <Box w={'11vw'}>
              <Text 
                fontSize={'0.8rem'} 
                color={'web.text2'}>
                  Freight Invoice
              </Text>
              <Text 
                color={'web.text'}
                fontSize={'0.95rem'}
                pl={ order[0].idFreightInvoice == null ? '1vw' : null}
                fontWeight={'bold'}>
                { order[0].idFreightInvoice == null ? '-' : order[0].idFreightInvoice }
              </Text>
            </Box>
            <Box w={'7vw'}>
              <Text 
                fontSize={'0.8rem'} 
                color={'web.text2'}>
                  Status
              </Text>
              <Text 
                color={'web.text'}
                fontSize={'0.95rem'} 
                fontWeight={'bold'}>
                  {order[0].Status}
              </Text>
            </Box>
          </Box>
          <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} w={'20vw'}>
            <Box w={'11vw'}>
              <Text 
                  color={'web.text2'} 
                  fontSize={'0.8rem'}>
                    Value
                </Text>
                <Text 
                  fontSize={'0.95rem'} 
                  fontWeight={'bold'}>
                    {order[0].EURUSD_Flag === 'Y' ? '€' : '$'} {order[0].Value.toLocaleString('en-US')}
                </Text>
            </Box>
            <Box w={'7vw'}>
              <Text 
                color={'web.text2'} 
                fontSize={'0.8rem'}>
                  Payment
              </Text>
              <Text 
                fontSize={'0.95rem'}
                pl={ order[0].Payment == null ? '1vw' : null} 
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