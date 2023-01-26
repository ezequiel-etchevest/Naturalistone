import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  useDisclosure,
  IconButton,
  TableContainer,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { BiEditAlt } from 'react-icons/bi';




const ModelTr = ({p}) => {
  
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
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
        <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.Type}</Td>
        <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.Size}</Td>
        <Td textAlign={'center'} w={'6vw'} ontSize={'1.6vh'}>{p.Thickness}</Td>
        <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.Finish}</Td>
        <Td textAlign={'center'} w={'6vw'} fontSize={'1.6vh'}>{p.FactoryProductName}</Td>
        <Td textAlign={'center'} w={'6vw'}> {p.Quantity} </Td>
        <Td textAlign={'center'} w={'6vw'}>${p.SalePrice}</Td>
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
          <Th color={'web.text2'} w={'6vw'} textAlign={'center'} >Type</Th>
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