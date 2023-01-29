import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useToast,
    Switch
  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/actions-products';
import { useEffect, useState } from 'react';
import{ TfiCheck } from 'react-icons/tfi';
import{ ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { patchDiscontinued } from '../../redux/actions-products';


const ModelTr = ({e, user}) => {

    const a = e.Discontinued_Flag === 'True' ? true : false 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [flag, setFlag] = useState(a)
    console.log({flag})

    const handleClickProduct = () => {
      dispatch(getProductById(e.ProdID))
      if(e.ProdID !== undefined)
      navigate(`/products/${e.ProdID}`)
    }
    const handleClickSwitch = () => {
      setFlag(flag === true ? false : true)
      dispatch(patchDiscontinued(e.ProdID, flag))
    }

    let validateSeller = () => {
      if(user[0].SellerID == 6 || user[0].SellerID == 3 || user[0].SellerID == 5 || user[0].SellerID == 15 ) return true
      else return false
    }

  return(
    <Tr       
      cursor={'pointer'} 
      key={e.ProdNameID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }} 
      >
      <Td onClick={() => handleClickProduct()} textAlign={'match-parent'}>{e.ProductName}</Td>
      <Td onClick={() => handleClickProduct()} textAlign={'match-parent'}>{e.Type}</Td>
      <Td onClick={() => handleClickProduct()} textAlign={'match-parent'}>{e.Size}</Td>
      <Td onClick={() => handleClickProduct()} textAlign={'center'}> {e.Thickness} </Td>
      <Td onClick={() => handleClickProduct()} isNumeric>{e.Price}$</Td>
      <Td onClick={() => handleClickProduct()} textAlign={'center'}>{e.InStock_Available === null ? 0 : e.InStock_Available}</Td>
      <Td onClick={() => handleClickProduct()} textAlign={'center'}>{e.Incoming_Available === null ? 0 : e.Incoming_Available}</Td>
      <Td onClick={() => handleClickProduct()} textAlign={'center'}>{e.NextArrival === undefined ? '-' : e.NextArrival}</Td>  {/*cambiar el origen de esta info */}
      <Td pl={'3.5vw'}>{ validateSeller() === false ? (e.Discontinued_Flag === 'True' ? <ImCheckboxChecked color='logo.orange'/> : <ImCheckboxUnchecked color='logo.orange'/> ) : (<Switch  onChange={() => handleClickSwitch()} isChecked={flag} colorScheme={'orange'} size={'sm'}/>) }</Td>
      </Tr>
  )
}

const ProductList = ({ allProducts, filteredProducts, user }) => {

  const productErrors = useSelector((state) => state.products_errors)
  const toast = useToast()

  const validateToast = () => {
    if(Object.entries(productErrors).length){
      toast({        
        title: `${productErrors.error}`,
        description: 'Displaying previous results',
        status: 'warning',
        duration: 1500,
        isClosable: true,})
    }
  }

  useEffect(() => {
    validateToast()
  },[filteredProducts, allProducts])

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
          <Table color={'web.text'} variant={'simple'} size={'sm'}>
            <Thead h={'6vh'}>
              <Tr>
                <Th color={'web.text2'} textAlign={'match-parent'}>Product Name</Th>
                <Th color={'web.text2'} w={'5vw'}>Type</Th>
                <Th color={'web.text2'} w={'5vw'}>Size</Th>
                <Th color={'web.text2'} w={'5vw'}>Thickness</Th>
                <Th color={'web.text2'} w={'5vw'}isNumeric>Price</Th>
                <Th color={'web.text2'} w={'5vw'}isNumeric>Stock</Th>
                <Th color={'web.text2'} w={'5vw'}isNumeric>Incoming Stock</Th>
                <Th color={'web.text2'} w={'5vw'}isNumeric>Next Arrival</Th>
                <Th color={'web.text2'} w={'5vw'}>Discontinued</Th>
              </Tr>
            </Thead>
            <Tbody>
              { 
                filteredProducts.length ? (
                  filteredProducts.map((e, i) => {
                    return(
                      <ModelTr key={i} e={e} user={user} filteredProducts={filteredProducts}/>
                    )
                  })
                ) : (
                  allProducts.map((e, i) => {
                    return(
                      <ModelTr key={i} e={e} user={user} allProducts={allProducts}/>
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