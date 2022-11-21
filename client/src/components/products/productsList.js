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

     const navigate = useNavigate()
     const dispatch = useDispatch()

    const handleClick = () => {
    //   setSite('details')
      dispatch(getAllProducts())
      navigate(`/products/${e.ProdNameID}`)
    }
    
    return(
            <Tr onClick={() => handleClick()} cursor={'pointer'} key={e.ProdNameID} >
                <Td textAlign={'match-parent'} pl={'3vw'}>{e.ProdNameID}</Td>
                <Td>{e.Naturali_ProdName}</Td>
                <Td textAlign={'center'}>{e.CurrentlyAvailable}</Td>
                <Td isNumeric> {e.NextArrival} </Td>
            </Tr>
    )
}

const ProductList = ({ allProducts, filteredProducts }) => {

    return(
        <Box
        w={'78.5vw'} >
            <TableContainer >
                <Table variant='striped' colorScheme='orange'>
                  <Thead>
                    <Tr w={'78.5vw'}>
                      <Th> Product ID </Th>
                      <Th> Product Name </Th>
                      <Th isNumeric> Current Stock </Th>
                      <Th isNumeric> Next Arrival </Th>
                    </Tr>
                  </Thead>
                  <Tbody >
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
    )
}
export default ProductList;