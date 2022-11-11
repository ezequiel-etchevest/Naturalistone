import {
    Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import invoices from '../assets/fakeInvArray'
import { useNavigate } from 'react-router-dom'

const ModelTr = (props) => {
    const { id, projectName, paid, total, deliveryDate, ShipVia } = props
    const navigate = useNavigate()

    return(
        <Tr onClick={()=> {navigate(`/invoices/${id}`)}} cursor={'pointer'}>
                <Td>{id}</Td>
                <Td>{projectName} </Td>
                <Td>{paid}</Td>
                <Td isNumeric>{total}</Td>
                <Td isNumeric>{deliveryDate}</Td>
                <Td>{ShipVia}</Td>
            </Tr>
    )
}

const List = () => {

    return(
        <Box
        h={'72vh'}
        w={'80vw'}
        mt={'20vh'} 
        border={'2px solid green'}>
            <TableContainer>
                <Table variant='striped' colorScheme='orange'>
                  <TableCaption>Imperial to metric conversion factors</TableCaption>
                  <Thead>
                    <Tr>
                      <Th > Quote Number </Th>
                      <Th> Project Name </Th>
                      <Th > Paid </Th>
                      <Th isNumeric> Total </Th>
                      <Th isNumeric> Est Delivery Date </Th>
                      <Th> Ship Via </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    { invoices.map(e => (
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