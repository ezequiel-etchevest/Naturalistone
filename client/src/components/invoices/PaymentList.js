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
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
import { deletePayment } from '../../redux/actions-payments';
import { useDispatch } from 'react-redux';



const ModelTr = ({p, totalAmount}) => {
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
        <Td textAlign={'match-parent'}>{p.Date.split('T')[0]}</Td>
        <Td textAlign={'match-parent'}>${p.Amount} </Td>
        <Td textAlign={'match-parent'}>{p.Method}</Td>
        <Td textAlign={'match-parent'}>{per.toFixed(2)} %</Td>
        <Td>
          <IconButton size={'xs'}fontSize={'2.5vh'} variant={'unstyled'} icon={<AiOutlineDelete/>} onClick={()=>handleDelete()}/>
        </Td>
      </Tr>
    )
}

const PaymentList = ({payments, totalAmount, pendingAmount}) => {

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
              w={'41vw'} 
              display={'flex'} 
              flexDir={'row'} 
              justifyContent={'space-between'} 
              alignContent={'start'}>
            <Text
              mb={'1vh'} 
              alignSelf={'center'} 
              fontSize={'xl'} 
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
          <TableContainer  w={'44vw'} >
                <Table color={'web.text'} variant={'simple'} size={'sm'} >
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'}>Payment Date</Th>
                      <Th color={'web.text2'}>Amount</Th>
                      <Th color={'web.text2'}>Method</Th>
                      <Th color={'web.text2'}>Percentaje</Th>
                      <Th color={'web.text2'}></Th>
                    </Tr>
                  </Thead>
                  <Tbody >
                    { 
                        payments.paymentData.map((p, i) =>{
                          return(
                            <ModelTr p={p} key={i} totalAmount={totalAmount}/>
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