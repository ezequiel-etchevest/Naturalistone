import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useToast,
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getInvoiceById, getInvoiceProducts } from '../../../redux/actions-invoices';
import { cleanStatePayments } from '../../../redux/actions-payments';
import { useEffect } from 'react';



const ModelTr = ({e}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
      dispatch(getInvoiceById(e.Naturali_Invoice))
      dispatch(getInvoiceProducts(e.Naturali_Invoice))
      dispatch( cleanStatePayments())
      navigate(`/quotes/${e.Naturali_Invoice}`)
    }
    
    return(
      <Tr 
        onClick={() => handleClick()} 
        cursor={'pointer'} 
        key={e.Naturali_Invoice}
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        >
        <Td textAlign={'center'}>{e.Naturali_Invoice}</Td>
        <Td>{e.ProjectName}</Td>
        <Td>{e.Reference}</Td>
        <Td textAlign={'center'}>{e.InvoiceDate.split('T')[0]}</Td>
        <Td textAlign={'center'}>{e.Status}</Td>
        <Td isNumeric textAlign={'center'}>${e.Value} </Td>
        <Td textAlign={'center'} >{ e.Percentaje ? e.Percentaje : 0 } % </Td>
        <Td textAlign={'center'}>{ e.Payments?.length ? e.Payments[0][2] : '-'}</Td>
      </Tr>
    )
}

const NextArrivalList = () => {
 
    return(
        <Box
        p={'1vh'}
        display={'flex'}
        justifyContent={'center'} 
        >
          <Box
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
            }}
            bg={'web.sideBar'} 
            rounded={'md'} 
            >
            <TableContainer color={'web.border'}>
                <Table w={'13vw'} variant={'simple'} size={'sm'} >
                  <Thead >
                    <Tr >
                      <Th color={'web.text'} fontSize={'1.5vh'} fontWeight={'medium'} textAlign={'center'} >Date</Th>
                      <Th color={'web.text'} fontSize={'1.5vh'} fontWeight={'medium'} textAlign={'center'}>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody >
                    
                  </Tbody>
                </Table>
            </TableContainer> 
            </Box> 
        </Box>
    )
}
export default NextArrivalList;
