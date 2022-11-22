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
import { getAllProducts } from '../../redux/actions'

const ModelTr = ({e}) => {

    // const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
      dispatch(getAllProducts())
      // if(e.ProductName !== und)
      // navigate(`/products/${e.ProductName}`)
    }
    console.log(e)
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

const ProductList = ({ allProducts, filteredProducts }) => {

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
        <TableContainer >
          <Table color={'web.text'} variant={'simple'} size={'sm'} >
            <Thead h={'6vh'}>
              <Tr>
                <Th color={'web.text2'} textAlign={'match-parent'}>Product Name</Th>
                <Th color={'web.text2'} w={'5vw'}>Type</Th>
                <Th color={'web.text2'} w={'5vw'}>Size</Th>
                <Th color={'web.text2'} w={'5vw'}>Thickness</Th>
                <Th color={'web.text2'} w={'5vw'}isNumeric>Price</Th>
                <Th color={'web.text2'} w={'5vw'}isNumeric>Stock</Th>
                <Th color={'web.text2'} w={'5vw'}isNumeric>Reserved Stock</Th>
                <Th color={'web.text2'} w={'5vw'}isNumeric>Next Arrival</Th>
              </Tr>
            </Thead>
            <Tbody>
              { 
                filteredProducts.length ? (
                  filteredProducts.map((e, i) => {
                    return(
                      <ModelTr key={i} e={e} />
                    )
                  })
                ) : (
                  allProducts.map((e, i) => {
                    return(
                      <ModelTr key={i} e={e} />
                    )
                  }
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>  
    </Box>
  )
}
export default ProductList;