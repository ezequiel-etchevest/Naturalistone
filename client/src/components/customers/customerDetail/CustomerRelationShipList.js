import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
  Center,
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
    <Td textAlign={'center'} maxW={"6vw"} fontSize={'0.8rem'}>{relationship.Date.split('T')[0]}</Td>
    {/* <Td textAlign={'center'} fontSize={'0.8rem'}>{relationship.Type}</Td> */}
    <Td textAlign={'-moz-initial'} maxW={"20vw"}fontSize={'0.8rem'} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{relationship.Description}</Td>
    <Td textAlign={'center'} fontSize={'0.8rem'}>{relationship.ProjectName}</Td>
    <Td textAlign={'center'} fontSize={'0.8rem'}>{relationship.User}</Td>
    {/* <Td textAlign={'center'} fontSize={'0.8rem'}>{relationship.Comment}</Td> */}

  </Tr>
)
}

const CustomerRelationShipList = ({customer_relationship}) => {

return(
<>
  <Box w={'full'}>
      <Box
          maxHeight={'27vh'}
          overflow={'auto'}
          overflowX={'auto'}
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
          }}> 
        <TableContainer w={'full'}>
        {typeof customer_relationship !== 'string' && customer_relationship.length ?
          <Table color={'web.text'} variant={'simple'} size={'sm'} >
            <Thead h={'4vh'}>
              <Tr>
                <Th h={'4vh'} color={'web.text2'} textAlign={'center'} fontSize={'0.8rem'}>Date</Th>
                {/* <Th h={'4vh'} color={'web.text2'} textAlign={'center'} fontSize={'0.8rem'}>Type</Th> */}
                <Th h={'4vh'} maxW={'6vw'} color={'web.text2'} textAlign={'center'} fontSize={'0.8rem'}>Description</Th>
                <Th h={'4vh'} color={'web.text2'} textAlign={'center'} fontSize={'0.8rem'}>Project</Th>
                <Th h={'4vh'} color={'web.text2'} textAlign={'center'} fontSize={'0.8rem'}>Seller</Th>
              </Tr>
            </Thead>
            <Tbody>
              {typeof customer_relationship !== 'string' && 
                customer_relationship.map((relationship, i) => {
                return(
                  <ModelTr key={i} relationship={relationship}/>
                )})   
              }    
            </Tbody>
          </Table>
          : 
          <Center display={'flex'} alignContent={'center'} justifyContent={'center'} h={'20vh'}>
            <Text color={'web.border'} fontSize={'1rem'}>No entries registered yet</Text>
          </Center>
          }
        </TableContainer>
    </Box> 
      </Box>
    </>
    )}


export default CustomerRelationShipList;
