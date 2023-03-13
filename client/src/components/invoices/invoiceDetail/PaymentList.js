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
    IconButton
  } from '@chakra-ui/react';
import AddPayment from './addPayment';
import {AiOutlineDelete } from 'react-icons/ai'
import { deletePayment } from '../../../redux/actions-payments';
import { useDispatch } from 'react-redux';


const ModelTr = ({p, totalAmount, invoice}) => {
    const dispatch = useDispatch()
    const per = (p.Amount * 100) / totalAmount
    const handleDelete = ()  => {
      dispatch(deletePayment(p.InvoiceID, p.idPayments))
    }

    return(
      <Tr 
        cursor={'pointer'}
        key={p.ProdID} 
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        >
        <Td textAlign={'match-parent'} fontSize={'1.6vh'}>{p.Date.split('T')[0]}</Td>
        <Td textAlign={'match-parent'} fontSize={'1.6vh'}>${p.Amount.toLocaleString('en-US')} </Td>
        <Td textAlign={'match-parent'} fontSize={'1.6vh'}>{p.Method}</Td>
        <Td textAlign={'center'} fontSize={'1.6vh'} >{Math.round(per.toFixed(2))} %</Td>
        <Td>
          <IconButton
            disabled={invoice[0].Stamped === 1 ? true : false} 
            size={'xs'}
            fontSize={'2.5vh'} 
            variant={'unstyled'} 
            icon={<AiOutlineDelete/>} onClick={()=>handleDelete()}/>
        </Td>
      </Tr>
    )
}

const PaymentList = ({payments, totalAmount, invoice}) => {
  const pendingAmount = payments.paymentsMath.PendingAmount

  const handlePendig = () => {
    if((totalAmount - pendingAmount)=== totalAmount) return false
    else return true
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
                  <AddPayment pendingAmount={pendingAmount}/>
                ):(
                  null
                )
              }
            </Box>
      {
        payments.paymentData ? (
          <Box
            maxHeight={'27vh'}
            maxWidth={'42vw'}
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
          <TableContainer  w={'40vw'} >
                <Table color={'web.text'} variant={'simple'} size={'sm'} >
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'} fontSize={'1.6vh'}>Payment Date</Th>
                      <Th color={'web.text2'} fontSize={'1.6vh'}>Amount</Th>
                      <Th color={'web.text2'} fontSize={'1.6vh'}>Method</Th>
                      <Th color={'web.text2'} fontSize={'1.6vh'}>Percentaje</Th>
                      <Th color={'web.text2'} fontSize={'1.6vh'}></Th>
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