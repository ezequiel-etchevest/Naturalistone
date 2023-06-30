import { Box, Text } from "@chakra-ui/react"

const InvoiceDetailList = ({invoice, payments}) => {

    return(
        <>
        <Box
          userSelect={'none'}
          className={'invoice-details'}
          mt={'3vh'}
          mr={'1vw'}
          pl={'2vw'}
          pt={'1.5vw'}
          pb={'1.5vw'}
          h={'44vh'}
          w={'33vw'}
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
          justifyContent={'space-between'}
          w={'19vw'}
          fontSize={'2.6vh'}
          mb={'1vh'}
          >
            <Text 
              color={'web.text2'} 
              ml={'1vh'}>
              Quote Details
            </Text>
            <Text 
            ml={'2vw'}
            color={'logo.orange'} 
            >
              {invoice[0].Naturali_Invoice}
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
              w={'12vw'}
              >
              <Box >
              <Text 
                fontSize={'xs'} 
                color={'web.text2'}
                mb={'0.5vh'}>
                  Customer
              </Text>
              <Text 
                fontSize={'sm'} 
                fontWeight={'bold'}>
                  {invoice[0].Contact_Name ? invoice[0].Contact_Name : invoice[0].Company}
              </Text>
              </Box>
              <Box>
                <Text 
                  fontSize={'xs'}  
                  color={'web.text2'}
                  mb={'0.5vh'}>
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
                fontSize={'xs'} 
                mb={'0.5vh'}>
                  Amount
                </Text>
                <Text 
                fontSize={'sm'} 
                fontWeight={'bold'}>
                  $ {invoice[0].Value.toLocaleString('en-US')}
                  </Text>
              </Box>
              <Box>
                <Text 
                  color={'web.text2'} 
                  fontSize={'xs'} 
                  mb={'0.5vh'}>
                  Payment percentage
                </Text>
                <Text 
                  fontSize={'sm'} 
                  fontWeight={'bold'}>
                  { payments.paymentsMath ? (
                    Math.round(payments.paymentsMath.PaymentPercentage)                  
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
              w={'10vw'}
             >
              <Box>
                <Text 
                  fontSize={'xs'}  
                  color={'web.text2'}
                  mb={'0.5vh'}>
                  Project name
                </Text>
                <Text 
                  fontSize={'sm'}  
                  fontWeight={'bold'}
                  // mb={
                  //   invoice[0].Contact_Name?.length ? 
                  //   invoice[0].Contact_Name?.length > 16 ? '2.6vh' : '0.5vh'
                  //   :
                  //   invoice[0].Company?.length > 16 ? '2.6vh' : '0.5vh'
                  // }
                  mb={'0.5vh'}>
                  {invoice[0].ProjectName}
                </Text>
              </Box>
              <Box>
              <Text 
                  fontSize={'xs'}  
                  color={'web.text2'}
                  mb={'0.5vh'}>
                  Status
                </Text>
                <Text 
                  fontSize={'sm'}
                  textColor={invoice[0].Status === 'Pending_Approval' ? 'logo.orange' : 'unset'} 
                  fontWeight={'bold'}>
                  {invoice[0].Status}
                </Text>
              </Box>
              <Box>
              <Text 
                color={'web.text2'} 
                fontSize={'xs'} 
                mb={'0.5vh'}>
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
                  fontSize={'xs'} 
                  mb={'0.5vh'}>
                    Pending amount
                </Text>
                <Text 
                  fontSize={'sm'} 
                  fontWeight={'bold'}>
                  $ {payments.paymentsMath  ? (
                   Number(payments?.paymentsMath?.PendingAmount).toLocaleString('en-US')
                  ):(
                    invoice[0].Value.toLocaleString('en-US')
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