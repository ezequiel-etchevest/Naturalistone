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


const ModelTr = (props) => {
    const { Naturali_Invoice, ProjectID, InvoiceDate, Value, PaymentStatus, PaymentDate } = props
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
      dispatch(getInvoiceById(Naturali_Invoice))
      navigate(`/invoices/${Naturali_Invoice}`)
    }

    return(
        <Tr onClick={() => handleClick()} cursor={'pointer'} key={Naturali_Invoice}>
                <Td>{Naturali_Invoice}</Td>
                <Td>{ProjectID}</Td>
                <Td>{InvoiceDate.split('T')[0]}</Td>
                <Td isNumeric>${Value} </Td>
                <Td>{PaymentStatus}</Td>
                <Td>{PaymentDate}</Td>
            </Tr>
    )
}

const List = ({seller_invoices}) => {

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
                    { seller_invoices.map(e => (
                        ModelTr(e)
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