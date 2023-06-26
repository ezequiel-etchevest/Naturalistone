import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    TableContainer,
  } from '@chakra-ui/react'
  
  
  
  
  const ModelTr = ({p}) => {
    
      return(
        <Tr 
          cursor={'pointer'}
          key={p.OrderID} 
          _hover={{
            bg: 'web.navBar',
            color: 'logo.orange'
          }}
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