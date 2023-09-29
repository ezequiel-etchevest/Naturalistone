import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

const ModelTr = ({relationship}) => {


return(
  <Tr
    h={'5vh'} 
    cursor={'pointer'}
    _hover={{
      bg: 'web.navBar',
      color: 'logo.orange'
    }}
    >
    <Td textAlign={'center'} fontSize={'1.6vh'}>{relationship.Insert_Date.split('T')[0]}</Td>
    <Td textAlign={'center'} fontSize={'1.6vh'}>{relationship.Action}</Td>
    <Td textAlign={'center'} fontSize={'1.6vh'}>{relationship.SellerName}</Td>
    <Td textAlign={'center'} fontSize={'1.6vh'}>{relationship.Comment}</Td>

  </Tr>
)
}

const CustomerRelationShipList = ({customer_relationship}) => {
return(
<>
  <Box w={'full'}>
      <Box 
      display={'flex'} 
      justifyContent={'space-between'}
      p={'1vh'}
      >
      </Box> 
        <Box
          maxHeight={'27vh'}
          overflow={'auto'}
          overflowX={'auto'}
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
          }}> 
        <TableContainer  w={'full'} >
          <Table color={'web.text'} variant={'simple'} size={'sm'} >
            <Thead h={'4vh'}>
              <Tr>
                <Th h={'4vh'} w={"10%"} color={'web.text2'} textAlign={'center'} fontSize={'1.6vh'}>Date</Th>
                <Th h={'4vh'} w={"10%"} color={'web.text2'} textAlign={'center'} fontSize={'1.6vh'}>Action</Th>
                <Th h={'4vh'} w={"10%"} color={'web.text2'} textAlign={'center'} fontSize={'1.6vh'}>Seller</Th>
                <Th h={'4vh'} w={"60%"} color={'web.text2'} textAlign={'center'} fontSize={'1.6vh'}>Comment</Th>
              </Tr>
            </Thead>
            <Tbody >
              {customer_relationship && customer_relationship?.map((relationship, i) => {
                return(
                  <ModelTr key={i} relationship={relationship}/>
                )})   
              }    
            </Tbody>
              </Table>
          </TableContainer>
    </Box> 
      </Box>
    </>
    )}


export default CustomerRelationShipList;
