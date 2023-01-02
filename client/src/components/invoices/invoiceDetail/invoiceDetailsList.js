import { Box, Text } from "@chakra-ui/react"

const InvoiceDetailList = ({invoice, payments}) => {
    console.log('invoice', {invoice})
    return(
        <>
        <Box
          className={'invoice-details'}
          mt={'3vh'}
          ml={'2vw'}
          mr={'1vw'}
          pl={'2vw'}
          pt={'1.5vw'}
          pr={'1.5vw'}
          pb={'1.5vw'}
          h={'44vh'}
          w={'26vw'}
          display={'flex'}
          flexDir={'column'}
          color={'web.text'}
          bg={'web.sideBar'}
          border={'1px solid'} 
          rounded={'md'} 
          borderColor={'web.border'} 
          >          
          <Box 
          display={'flex'} 
          flexDir={'row'} 
          alignItems={'baseline'}
          >
            <Text 
            color={'logo.orange'} 
            fontSize={'xl'}>
              {invoice[0].Naturali_Invoice}
             </Text>
            <Text 
              color={'web.text2'} 
              ml={'1vh'}>
              Quote Details
            </Text>
          </Box>
          <Box 
            mt={'1vh'} 
            display={'flex'} 
            flexDir={'row'} 
            justifyContent={'space-around'} 
            h={'42vh'}
            >
            <Box
              display={'flex'}
              flexDir={'column'}
              justifyContent={'space-around'}
              w={'10vw'}>
              <Box>
              <Text 
                fontSize={'xs'} 
                color={'web.text2'}>
                  Customer name
              </Text>
              <Text 
                fontSize={'sm'} 
                fontWeight={'bold'}>
                  {invoice[0].Reference}
              </Text>
              </Box>
              <Box>
                <Text 
                  fontSize={'xs'} 
                  color={'web.text2'}>
                  Shipping Method
                </Text>
                <Text 
                  fontSize={'sm'} 
                  fontWeight={'bold'}>
                    {invoice[0].ShippingMethod}
                </Text>
              </Box>
              <Box>
              <Text 
                color={'web.text2'} 
                fontSize={'xs'}>
                  Amount
                </Text>
                <Text 
                fontSize={'sm'} 
                fontWeight={'bold'}>
                  ${invoice[0].Value}
                  </Text>
              </Box>
              <Box>
                <Text 
                  color={'web.text2'} 
                  fontSize={'xs'}>
                  Payment percentaje
                </Text>
                <Text 
                  fontSize={'sm'} 
                  fontWeight={'bold'}>
                  { payments.paymentsMath ? (
                    payments.paymentsMath.PaymentPercentaje                  
                    ):(
                    0
                    )
                  } %
              </Text>
              </Box>
            </Box>
            <Box
              display={'flex'}
              flexDir={'column'}
              justifyContent={'space-around'}
              w={'10vw'}>
              <Box>
                <Text 
                  fontSize={'xs'} 
                  color={'web.text2'}>
                  Project name
                </Text>
                <Text 
                  fontSize={'sm'} 
                  fontWeight={'bold'}>
                  {invoice[0].ProjectName}
                </Text>
              </Box>
              <Box>
              <Text 
                  fontSize={'xs'} 
                  color={'web.text2'}>
                  Status
                </Text>
                <Text 
                  fontSize={'sm'} 
                  fontWeight={'bold'}>
                  {invoice[0].Status}
                </Text>
              </Box>
              <Box>
              <Text 
                color={'web.text2'} 
                fontSize={'xs'}>
                  Date
              </Text>
              <Text 
              fontSize={'sm'} 
              fontWeight={'bold'}>
                {invoice[0].InvoiceDate.split('T')[0]}
                </Text>
              </Box>
              <Box>
                <Text 
                  color={'web.text2'} 
                  fontSize={'xs'}>
                    Pending amount
                </Text>
                <Text 
                  fontSize={'sm'} 
                  fontWeight={'bold'}>
                  ${payments.paymentsMath  ? (
                   payments.paymentsMath.PendingAmount
                  ):(
                    invoice[0].Value
                    )
                 }</Text>
              </Box>
            </Box>
            
          </Box>
        </Box> 
        </>
    )
}

export default InvoiceDetailList