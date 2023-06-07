import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
  } from '@chakra-ui/react';
import AddPayment from './addPayment';
import PaymentDeleteModal from './PaymentDeleteModal'

const ModelTr = ({p, totalAmount}) => {

    const per = (p.Amount * 100) / totalAmount

    return(
      <Tr
      h={'4vw'} 
        cursor={'pointer'}
        key={p.ProdID} 
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        >
        <Td textAlign={'match-parent'} fontSize={'1.6vh'}>{p.Date.split('T')[0]}</Td>
        <Td textAlign={'match-parent'} fontSize={'1.6vh'}>$ {p.Amount.toLocaleString('en-US')} </Td>
        <Td textAlign={'match-parent'} fontSize={'1.6vh'}>{p.Method}</Td>
        <Td w={'2vh'} textAlign={'center'} fontSize={'1.6vh'} >{Math.round(per.toFixed(2))} %</Td>
        <Td w={'2vh'}> <PaymentDeleteModal InvoiceID={p.InvoiceID} idPayments={p.idPayments}/>
        </Td>
      </Tr>
    )
}

const PaymentList = ({payments, totalAmount, invoice}) => {
  console.log(invoice)
  const pendingAmount = payments.paymentsMath.PendingAmount
  const handlePendig = () => {
    if(invoice[0].Status === 'Pending_Approval') return false
    else{
      if((totalAmount - pendingAmount) === totalAmount) return false
      else return true
    }
  }
  return(

    <>
      <Box
      display={'flex'}
      justifyContent={'center'}
      >
        <Box
        bg={'web.sideBar'}           
        >
        <Box 
        display={'flex'} 
        flexDir={'row'} 
        justifyContent={'space-between'} 
        >
          <Text
          mb={'1vh'} 
          alignSelf={'center'} 
          fontSize={'2.6vh'} 
          color={'web.text2'}
          >Payment Details</Text>

          {
            handlePendig() === true ? (
              <AddPayment totalAmount={totalAmount} pendingAmount={pendingAmount} percentage={payments.paymentsMath.PaymentPercentage} cardPaymentAmount={payments.paymentsMath.CardPaymentAmount}   />
            ):(
              null
            )
          }
        </Box>
        {
          payments.paymentData ? (
          <Box
            maxHeight={'27vh'}
            maxWidth={'50vw'}
            overflow={'auto'}
            css={{
              '&::-webkit-scrollbar': {
                width: '0.4vw',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#E47424',
                borderRadius: '5px',
              },
            }}>
          <TableContainer  w={'35vw'} >
            <Table mt={'2vh'} color={'web.text'} variant={'simple'} size={'sm'} >
              <Thead h={'5vh'}>
                <Tr>
                  <Th color={'web.text2'} textAlign={'center'} fontSize={'1.3vh'}>Payment Date</Th>
                  <Th color={'web.text2'} textAlign={'center'} fontSize={'1.3vh'}>Amount</Th>
                  <Th color={'web.text2'} textAlign={'center'} fontSize={'1.3vh'}>Method</Th>
                  <Th color={'web.text2'} textAlign={'center'} fontSize={'1.3vh'}>Percentage</Th>
                  <Th w={'2vh'} color={'web.text2'} textAlign={'center'} fontSize={'1.3vh'}></Th>
                </Tr>
              </Thead>
              <Tbody >
                { 
                  payments.paymentData.map((p, i) =>{
                    return(
                      <ModelTr p={p} key={i} totalAmount={totalAmount} invoice={invoice}/>
                      )})                   
                    }
                  </Tbody>
                </Table>
            </TableContainer>
            </Box> 
        ):(
          <Text mt={'3vh'} color={'web.text'}>No payments entered yet</Text>          
        )

      }
      </Box>
      </Box>
      </>
      )}
  

export default PaymentList;