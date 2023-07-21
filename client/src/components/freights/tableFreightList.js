import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    TableContainer,
  } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cleanOrderProducts, getOrderProducts, getOrdersByID } from '../../redux/actions-orders'
  
  
  
  
  const ModelTr = ({p}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
      dispatch(getOrdersByID(p.OrderID, p.FactoryID))
      dispatch(cleanOrderProducts())
      dispatch(getOrderProducts(p.OrderID, p.FactoryID))
      navigate(`/orders/${p.OrderID}/${p.FactoryID}`)
    }
      return(
        <Tr 
          cursor={'pointer'}
          key={p.OrderID} 
          _hover={{
            bg: 'web.navBar',
            color: 'logo.orange'
          }}
          onClick={() => handleClick()}
          >
          <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.Factory_Name}</Td>
          <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.OrderID}</Td>
          <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>$ {p.Value.toLocaleString('en-US')}</Td>
          <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.InvoiceDate.slice(0,10)}</Td>
          <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.Status}</Td>
          <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.Updated_Date.slice(0,10)}</Td>
        </Tr>
      )
  }
  
  
  const TableFreightList = ({freights_factory}) => {
    console.log('fregi', freights_factory)

  return(  
    <TableContainer w={'74vw'}>
      <Table mt={'2vh'} color={'web.text'} variant={'simple'} size={'sm'} >
        <Thead h={'6vh'} >
          <Tr>
            <Th color={'web.text2'} w={'6vw'} textAlign={'center'}>Factory Name</Th>
            <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Order</Th>
            <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Value</Th>
            <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Invoice Date</Th>
            <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Status</Th>
            <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Updated Date</Th>
          </Tr>
        </Thead>
        <Tbody >
          { freights_factory.map((p, i) =>{
              return(
                <ModelTr p={p} key={i}/>
              )
            })
          }
        </Tbody>
      </Table>
    </TableContainer>
    )
  }
  
  
  export default TableFreightList;