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
    Switch,
    Text,
    Center
  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/actions-products';
import { useEffect, useState } from 'react';
import{ ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { patchDiscontinued } from '../../redux/actions-products';


const ModelTr = ({e, user}) => {

  const a = e.Discontinued_Flag === 'True' ? true : false 
  const [flag, setFlag] = useState(a)

  const navigate = useNavigate()
  const dispatch = useDispatch()


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
      if(user[0].SellerID === 6 || user[0].SellerID === 3 || user[0].SellerID === 5 || user[0].SellerID === 15 ) return true
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
      <Td onClick={() => handleClickProduct()} fontSize={'1.7vh'} textAlign={'match-parent'}>{e.ProductName}</Td>
      <Td onClick={() => handleClickProduct()} fontSize={'1.7vh'} textAlign={'match-parent'}>{e.Material} - {e.Type}</Td>
      <Td onClick={() => handleClickProduct()} fontSize={'1.7vh'} textAlign={'match-parent'}>{e.Size}</Td>
      <Td onClick={() => handleClickProduct()} fontSize={'1.7vh'} textAlign={'center'}> {e.Thickness} </Td>
      <Td onClick={() => handleClickProduct()} fontSize={'1.7vh'} textAlign={'center'}> {e.Finish === null ? '-' : e.Finish} </Td>
      <Td onClick={() => handleClickProduct()} fontSize={'1.7vh'} isNumeric>${ e.Price ? e.Price.toLocaleString('en-US') : '.'}</Td>
      <Td onClick={() => handleClickProduct()} fontSize={'1.7vh'} textAlign={'center'}>{e.InStock_Available === null ? 0 : e.InStock_Available}</Td>
      <Td onClick={() => handleClickProduct()} fontSize={'1.7vh'} textAlign={'center'}>{e.Incoming_Available === null ? 0 : e.Incoming_Available}</Td>
      <Td onClick={() => handleClickProduct()} fontSize={'1.7vh'} textAlign={'center'}>{e.NextArrival === undefined ? '-' : e.NextArrival}</Td>
      <Td pl={'3.5vw'}>{ validateSeller() === false ? (e.Discontinued_Flag === 'True' ? <ImCheckboxChecked color='logo.orange'/> : <ImCheckboxUnchecked color='logo.orange'/> ) : (<Switch  onChange={() => handleClickSwitch()} isChecked={flag} colorScheme={'orange'} size={'sm'}/>) }</Td>
      </Tr>
  )
}

const ProductList = ({ allProducts, user }) => {

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
  },[allProducts])

  return(
    <Box
      display={'flex'}
      justifyContent={'center'}
      h={'69vh'}
      w={'78.8vw'}
      ml={'1vh'} 
      >
      <Box
        maxHeight={'67vh'}
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
        borderColor={'web.border'}
        bg={'web.sideBar'} 
        border={'1px solid'} 
        rounded={'md'} 
        p={'3vh'}
        w={'76vw'}
        >
        {allProducts.length && !Object.entries(productErrors).length ? 
        <TableContainer  mr={'1vw'}>
          <Table color={'web.text'} variant={'simple'} size={'sm'}>
            <Thead h={'6vh'}>
              <Tr>
                <Th color={'web.text2'} >Product Name</Th>
                <Th color={'web.text2'} textAlign={'center'} >Type</Th>
                <Th color={'web.text2'} textAlign={'center'}>Size</Th>
                <Th color={'web.text2'} >Thickness</Th>
                <Th color={'web.text2'}>Finish</Th>
                <Th color={'web.text2'} isNumeric>Price</Th>
                <Th color={'web.text2'} isNumeric>In Stock</Th>
                <Th color={'web.text2'} isNumeric>Incoming</Th>
                <Th color={'web.text2'} isNumeric>Next Arrival</Th>
                <Th color={'web.text2'} >Discontinued</Th>
              </Tr>
            </Thead>
            <Tbody>
              { 
                  allProducts.map((e, i) => {
                    return(
                      <ModelTr key={i} e={e} user={user}/>
                    )
                  })
              }
            </Tbody>
          </Table>
        </TableContainer>
        :
        (
          <Center w={'full'} h={'full'}>
          <Text userSelect={'none'} fontSize={'2vh'}>No products found</Text>
          </Center>
        )
        }
      </Box>  
    </Box>
  )
}
export default ProductList;