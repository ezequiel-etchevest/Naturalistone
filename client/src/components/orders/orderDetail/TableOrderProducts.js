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
        <Td textAlign={'center'} fontSize={'1.6vh'}>{p.Type}</Td>
        <Td textAlign={'center'} fontSize={'1.6vh'}>{p.Size}</Td>
        <Td textAlign={'center'} fontSize={'1.6vh'}>{p.Thickness}</Td>
        <Td textAlign={'center'} fontSize={'1.6vh'}>{p.Finish}</Td>
        <Td textAlign={'center'} fontSize={'1.6vh'}>{p.FactoryProductName}</Td>
        <Td textAlign={'center'}>{p.Quantity} </Td>
        <Td textAlign={'center'} >${p.SalePrice}</Td>
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
      <Thead h={'6vh'}>
        <Tr>
          <Th color={'web.text2'}>Product Name</Th>
          <Th color={'web.text2'}>Type</Th>
          <Th color={'web.text2'}>Size</Th>
          <Th color={'web.text2'}>Thickness</Th>
          <Th color={'web.text2'}>Finish</Th>
          <Th color={'web.text2'}>Factory Product Name</Th>
          <Th color={'web.text2'}>Quantity</Th>
          <Th color={'web.text2'}>Purchase Price</Th>
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