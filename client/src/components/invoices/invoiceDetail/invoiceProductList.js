import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text
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
        <Td fontSize={'1.3vh'} textAlign={'match-parent'}>{p.ProductName}</Td>
        <Td fontSize={'1.3vh'} textAlign={'center'}>{p.Quantity}</Td>
        <Td fontSize={'1.3vh'} textAlign={'center'}>{p.Size}</Td>
        <Td fontSize={'1.3vh'} textAlign={'center'}>{p.Thickness}</Td>
        <Td fontSize={'1.3vh'} textAlign={'center'}>{p.Finish}</Td>
        <Td fontSize={'1.3vh'} textAlign={'center'} >$ {p.SalePrice.toLocaleString('en-US')}</Td>
        <Td fontSize={'1.3vh'} textAlign={'center'}>{(p.InStock_Reserved + p.InStock_PendingPayment) === null ? '0' : (p.InStock_Reserved + p.InStock_PendingPayment)}</Td>
        <Td fontSize={'1.3vh'} textAlign={'center'}>{(p.Incoming_Reserved + p.Incoming_PendingPayment) === null ? '0' : (p.Incoming_Reserved + p.Incoming_PendingPayment)}</Td>
        <Td fontSize={'1.3vh'} textAlign={'center'}>{(p.Order_PendingPayment + p.Order_PaymentCompleted) === null ? '0' : (p.Order_PendingPayment + p.Order_PaymentCompleted)}</Td>
        <Td fontSize={'1.3vh'} textAlign={'center'}>{p.Delivered}</Td>
      </Tr>
    )
}

const InvoiceProductList = ({invoice_products, invoice}) => {
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
            <Text fontSize={'1.6vw'} color={'web.text2'}>Products Details</Text>
            <TableContainer w={'60vw'} >
                <Table mt={'2vh'} color={'web.text'} variant={'simple'} size={'sm'} >
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th fontSize={'1.3vh'} color={'web.text2'}textAlign={'center'}>Product <br/> Name</Th>
                      <Th fontSize={'1.3vh'} color={'web.text2'}textAlign={'center'}>Quantity</Th>
                      <Th fontSize={'1.3vh'} color={'web.text2'}textAlign={'center'}>Size</Th>
                      <Th fontSize={'1.3vh'} color={'web.text2'}textAlign={'center'}>Thickness</Th>
                      <Th fontSize={'1.3vh'} color={'web.text2'}textAlign={'center'}>Finish</Th>
                      <Th fontSize={'1.3vh'} color={'web.text2'}textAlign={'center'}>Price</Th>
                      <Th fontSize={'1.3vh'} color={'web.text2'}textAlign={'center'}>Reserved <br/> Stock</Th>
                      <Th fontSize={'1.3vh'} color={'web.text2'}textAlign={'center'}>Incoming <br/> Reserved</Th>
                      <Th fontSize={'1.3vh'} color={'web.text2'}textAlign={'center'}>Back <br/> Order</Th>
                      <Th fontSize={'1.3vh'} color={'web.text2'}textAlign={'center'}>Delivered</Th>
                    </Tr>
                  </Thead>
                  <Tbody >
                    { 
                      invoice_products?.map((p, i) =>{
                            return(
                              <ModelTr p={p} key={i}/>
                            )})
                    }
                  </Tbody>
                </Table>
            </TableContainer> 
            </Box> 
        </Box>
    )
}
export default InvoiceProductList;