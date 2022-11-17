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
import { getInvoiceById } from '../redux/actions'


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
                <Td>{e.Naturali_Invoice}</Td>
                <Td>{e.ProjectID}</Td>
                <Td>{e.InvoiceDate.split('T')[0]}</Td>
                <Td isNumeric>${e.Value} </Td>
                <Td>{e.PaymentStatus}</Td>
                <Td>{e.PaymentDate}</Td>
            </Tr>
    )
}

const List = ({seller_invoices, setSite}) => {

    return(
        <Box
        h={'72vh'}
        w={'80vw'} >
            <TableContainer>
                <Table variant='striped' colorScheme='orange'>
                  <Thead>
                    <Tr>
                      <Th > Invoice Number </Th>
                      <Th> Project Name </Th>
                      <Th > Invoice Date </Th>
                      <Th isNumeric> Value </Th>
                      <Th isNumeric> Payment Status</Th>
                      <Th> Payment Date </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    { seller_invoices.map((e, i) => (
                        <ModelTr key={i} e={e} setSite={setSite}/> 
                        ))
                    }
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