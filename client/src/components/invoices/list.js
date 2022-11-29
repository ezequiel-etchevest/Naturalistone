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
import { getInvoiceById, getInvoiceProducts } from '../../redux/actions-invoices';
import { cleanStatePayments, getPayments } from '../../redux/actions-payments';
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
        <Td>{e.Reference}</Td>
        <Td textAlign={'center'}>{e.InvoiceDate.split('T')[0]}</Td>
        <Td isNumeric>${e.Value} </Td>
        <Td textAlign={'center'} >{e.PaymentStatus === null ? 'Unpaid' : 'Paid'}</Td>
        <Td textAlign={'center'}>{e.PaymentDate}</Td>
      </Tr>
    )
}

const List = ({seller_invoices, filteredByCustomer}) => {
  const result = useSelector(state=> state.validate_result_quotes)
  const toast = useToast()
  const id = 'test-toast'
  
  const validateResults = () => {
    if(result === 'no_results'){
      if (!toast.isActive(id)) {
      toast({
        id,
        title: 'No results found',
        description: 'Reloading all the quotes',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }}
  }
  useEffect(()=>{
    validateResults()
  })

    return(
        <Box
        display={'flex'}
        justifyContent={'center'}
        h={'72vh'}
        w={'78.8vw'} 
        >
          <Box
            maxHeight={'69vh'}
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
            borderColor={'web.border'}
            bg={'web.sideBar'} 
            border={'1px solid'} 
            rounded={'md'} 
            p={'3vh'}
            w={'72vw'}
            
            >
            <TableContainer>
                <Table color={'web.text'} variant={'simple'} size={'sm'} >
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'}>Quote Number</Th>
                      <Th color={'web.text2'}>Customer Name</Th>
                      <Th color={'web.text2'}>Quote Date</Th>
                      <Th color={'web.text2'} isNumeric>Total</Th>
                      <Th color={'web.text2'} isNumeric>Payment %</Th>
                      <Th color={'web.text2'}>Last Payment Date </Th>
                    </Tr>
                  </Thead>
                  <Tbody >
                    { filteredByCustomer.length ? (
                      filteredByCustomer.map((e, i) =>{
                        return(
                          <ModelTr key={i} e={e}/>
                        )
                      })
                    ) : (
                      
                      seller_invoices.map((e, i) => (
                        <ModelTr key={i} e={e}/> 
                        ))
                        )}
                  </Tbody>
                </Table>
            </TableContainer> 
            </Box> 
        </Box>
    )
}
export default List;




// pago o no pago
// estamated delivery date

//se tiene que pdoer ordenar