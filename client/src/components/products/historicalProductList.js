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
  import { useNavigate } from 'react-router-dom'
  import { useDispatch, useSelector } from 'react-redux'


const ModelTr = ({e}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = () => {
    // dispatch(getProductById(e.ProdID))
    // if(e.ProdID !== undefined)
    // navigate(`/products/${e.ProdID}`)
  }

  return(
    <Tr 
      onClick={() => handleClick()} 
      cursor={'pointer'} 
      key={e.ProdNameID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }} 
      >
      <Td textAlign={'match-parent'}>{e.ProductName}</Td>
      <Td textAlign={'match-parent'}>{e.Type}</Td>
      <Td textAlign={'match-parent'}>{e.Size}</Td>
      <Td textAlign={'center'}> {e.Thickness} </Td>
      <Td isNumeric>{e.Price}$</Td>
      <Td textAlign={'center'}>{e.Stock === null ? 0 : e.Stock}</Td>
      <Td textAlign={'center'}>{e.PendingPayment === null ? 0 : e.PendingPayment}</Td>
      <Td textAlign={'center'}>{e.NextArrival === null ? '-' : e.NextArrival}</Td>
    </Tr>
  )
}


const HistoricalProductList = () => {

  const allProducts = useSelector((state) => state.allProducts)

  return(
    <>
      <Box    
        className={'product-details'}
        mt={'3vh'}
        ml={'2vw'}
        mr={'1vw'}
        pl={'1vw'}
        pt={'1vw'}
        pr={'1vw'}
        pb={'1vw'}
        h={'26vh'}
        w={'50vw'}
        display={'flex'}
        flexDir={'column'}
        color={'web.text'}
        bg={'web.sideBar'}
        border={'1px solid'} 
        rounded={'md'} 
        borderColor={'web.border'}
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
        w={'48vw'}
        >
        <TableContainer >
          <Table color={'web.text'} variant={'simple'} size={'sm'} >
            <Thead>
              <Tr>
                <Th color={'web.text2'} w={'5vw'}>Lot number</Th>
                <Th color={'web.text2'} w={'5vw'}>Arrival date</Th>
                <Th color={'web.text2'} w={'5vw'}>Quantity</Th>
                <Th color={'web.text2'} w={'5vw'}>Remaining Stock</Th>
                <Th color={'web.text2'} w={'5vw'}>Reserved Stock</Th>
              </Tr>
            </Thead>
            <Tbody>
              { 
                  allProducts?.map((e, i) => {
                    return(
                      <ModelTr key={i} e={e} />
                    )
                  })
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>  
        </Box>
    </>
  )
}

export default HistoricalProductList