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
  } from '@chakra-ui/react'
  import { useNavigate } from 'react-router-dom'


const ModelTr = ({p}) => {
  
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${p.ProdID}`)
  }
 

    return(
      <Tr 
        cursor={'pointer'}
        key={p.ProdID} 
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        onClick={() => handleClick()}
        >
        <Td textAlign={'center'}>{p.ProductName}</Td>
        <Td textAlign={'center'}>{p.Quantity} </Td>
        <Td textAlign={'center'} >${p.SalePrice.toLocaleString('en-US')}</Td>
        <Td textAlign={'center'}>{p.Stock === null ? '0' : p.Stock}</Td>
        <Td textAlign={'center'}>{p.NextArrival === null ? '-' : p.NextArrival}</Td>
      </Tr>
    )
}

const InvoiceProductList = ({invoice_products}) => {
  
    return(
        <Box
        display={'flex'}
        justifyContent={'center'}
        >
          <Box
            maxHeight={'38vh'}
            overflow={'auto'}
            css={{
              '&::-webkit-scrollbar': {
                width: '0.2vw',
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
            >
            <Text fontSize={'xl'} color={'web.text2'}>Products Details</Text>
            <TableContainer w={'44vw'} mr={'1vw'}>
                <Table mt={'2vh'} color={'web.text'} variant={'simple'} size={'sm'} >
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'}>Product Name</Th>
                      <Th color={'web.text2'}>Quantity</Th>
                      <Th color={'web.text2'}>Sale Price</Th>
                      <Th color={'web.text2'}>Stock</Th>
                      <Th color={'web.text2'}>Next Arrival</Th>
                    </Tr>
                  </Thead>
                  <Tbody >
                    { invoice_products.map((p, i) =>{
                        return(
                          <ModelTr p={p} key={i}/>
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
export default InvoiceProductList;