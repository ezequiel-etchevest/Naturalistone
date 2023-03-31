import {     
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  } from "@chakra-ui/react"


const ModelTr = ({e}) => {

  return(
    <Tr 
      cursor={'pointer'} 
      key={e.ProdNameID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }}
      color={'web.text'} 
      >
      <Td textAlign={'match-parent'}>{e.InvoiceDate.split('T')[0]}</Td>
      <Td textAlign={'center'}>$ {e.SalePrice.toLocaleString('en-US')}</Td>
    </Tr>
  )
}


const HistoricalProductList = ({history_prices}) => {

  return(
    <Box
    p={'1vh'}
    display={'flex'}
    justifyContent={'center'}
    
    >
      <Box
        overflow={'auto'}
        maxH={'50vh'}
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
                  <Th color={'web.text2'} fontSize={'1.5vh'} fontWeight={'medium'} textAlign={'center'} >Date</Th>
                  <Th color={'web.text2'} fontSize={'1.5vh'} fontWeight={'medium'} textAlign={'center'}>Value</Th>
                </Tr>
              </Thead>
              <Tbody >
                {
                  history_prices.length ? (
                    history_prices.map((e, i) => {
                      return(
                        <ModelTr key={i} e={e}/>
                      )})):(
                        null
                      )      
                  
                }
              </Tbody>
            </Table>
        </TableContainer> 
        </Box> 
    </Box>
)
}


export default HistoricalProductList