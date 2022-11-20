import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getInvoiceById } from '../../redux/actions'


const ModelTr = ({e, setSite}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
      setSite('details')
      dispatch(getInvoiceById(e.Naturali_Invoice))
      navigate(`/invoices/${e.Naturali_Invoice}`)
    }
    
    return(
        <Tr onClick={() => handleClick()} cursor={'pointer'} key={e.Naturali_Invoice}>
                <Td textAlign={'center'}>{e.Naturali_Invoice}</Td>
                <Td>{e.Reference}</Td>
                <Td textAlign={'center'}>{e.InvoiceDate.split('T')[0]}</Td>
                <Td isNumeric>${e.Value} </Td>
                <Td textAlign={'center'} >{e.PaymentStatus === null ? 'Unpaid' : 'Paid'}</Td>
                <Td textAlign={'center'}>{e.PaymentDate}</Td>
            </Tr>
    )
}

const List = ({seller_invoices, setSite, filteredByCustomer}) => {

    return(
        <Box
        h={'72vh'}
        w={'78.8vw'} 
        >
            <TableContainer>
                <Table variant='striped' colorScheme='orange' >
                  <Thead>
                    <Tr>
                      <Th > Invoice Number </Th>
                      <Th> Customer Name </Th>
                      <Th > Invoice Date </Th>
                      <Th isNumeric> Value </Th>
                      <Th isNumeric> Payment Status</Th>
                      <Th> Payment Date </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    { filteredByCustomer.length ? (
                      filteredByCustomer.map((e, i) =>{
                        return(
                          <ModelTr key={i} e={e} setSite={setSite}/>
                        )
                      })
                    ) : (
                      seller_invoices.map((e, i) => (
                        <ModelTr key={i} e={e} setSite={setSite}/> 
                        ))
                        )}
                  </Tbody>
                </Table>
            </TableContainer>  
        </Box>
    )
}
export default List;




// pago o no pago
// estamated delivery date

//se tiene que pdoer ordenar