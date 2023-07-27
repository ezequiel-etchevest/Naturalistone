import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TableContainer,
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
        <Td textAlign={'-moz-initial'}>{p.ProductName}</Td>
        <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.Material}</Td>
        <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.Size}</Td>
        <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.Thickness}</Td>
        <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.Finish}</Td>
        <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.FactoryProductName}</Td>
        <Td textAlign={'center'} w={'6vw'}> {p.Quantity} </Td>
        <Td textAlign={'center'} w={'6vw'}> ${p.PurchasePrice}</Td>
        {/* <IconButton 
            display={'flex'}
            variant={'unstyled'}
            fontSize={'3vh'}           
            fontWeight={'normal'}
            icon={<BiEditAlt/>}
            /> */}
      </Tr>
    )
}


const TableOrderProducts = ({order_products}) => {
  
return(  
  <TableContainer w={'74vw'}>
    <Table mt={'2vh'} color={'web.text'} variant={'simple'} size={'sm'} >
      <Thead h={'6vh'} >
        <Tr>
          <Th color={'web.text2'} w={'14vw'}>Product Name</Th>
          <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Material</Th>
          <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Size</Th>
          <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Thickness</Th>
          <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Finish</Th>
          <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Factory Product Name</Th>
          <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Quantity</Th>
          <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Purchase Price</Th>
        </Tr>
      </Thead>
      <Tbody >
        { order_products.map((p, i) =>{
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


export default TableOrderProducts;