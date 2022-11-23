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



const ModelTr = ({e, setSite}) => {
    
    return(
      <Tr 
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

const List = ({products}) => {

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
                      <Th color={'web.text2'}>Product Name</Th>
                      <Th color={'web.text2'}>Amount</Th>
                      <Th color={'web.text2'}>Stock Available</Th>
                      <Th color={'web.text2'}>Next Arrival</Th>
                    </Tr>
                  </Thead>
                  <Tbody >
                    { products.map((e, i) =>{
                        return(
                          <ModelTr p={p}/>
                        )
                      })
                    }
                  </Tbody>
                </Table>
            </TableContainer> 
            </Box> 
        </Box>
    )
}
export default List;