import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Center,
} from '@chakra-ui/react'



const ModelTr = ({e, user}) => {

  return(
    <Tr
      cursor={'pointer'} 
      key={e.Invoice}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }}
      >
      <Td fontSize={'xs'} textAlign={'center'}>{e.Invoice}</Td>
      {
        (user[0].Secction7Flag === 1 ) ? (
          e.FirstName && e.LastName ? <Td  fontSize={'xs'}textAlign={'center'}>{e.FirstName[0]}{e.LastName[0]}</Td> : null
        ):(null)
      }
      {
       (user[0].Secction7Flag === 1) ? ( <Td fontSize={'xs'}>{e.Type}</Td> ) : (null)
      }
      <Td fontSize={'xs'}>{e.Date?.split('T')[0]}</Td>
      <Td fontSize={'xs'} >{e.Error}</Td>
      </Tr>
    )}  
    
const  InvoiceErrorList = ({user, invoice_errors_by_filter, filteredInvoicesErrors, invoice_errors}) => {

  
  return(
    <Box
      isplay={'flex'}
      justifyContent={'center'}
      h={'74vh'}
      w={'82.5vw'}
      ml={'1.5vw'}
      >
      <Box
        maxHeight={'73vh'}
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
        w={'80vw'}
        >
          {
           // seller_invoices.length ? (
        <TableContainer>
          <Table color={'web.text'}variant={'simple'} size={'sm'}>
            <Thead h={'6vh'}>
              <Tr>
                <Th color={'web.text2'} textAlign={'center'}>Invoice Nº</Th>
                  { 
                    (user[0].Secction7Flag === 1 ) ? (
                      <Th color={'web.text2'} textAlign={'center'} w={'1vw'}>Seller</Th>):(null)
                  }
                  {
                     (user[0].Secction7Flag === 1 ) ? (
                      <Th color={'web.text2'} textAlign={'center'} w={'1vw'}>Type</Th>):(null)
                  }
                  <Th color={'web.text2'}>Date</Th>
                  <Th color={'web.text2'}>Error</Th>
                </Tr>
              </Thead>
              <Tbody>
                      { 
                        filteredInvoicesErrors.length ?(  
                        filteredInvoicesErrors.map((e, i) => (
                          <ModelTr key={i} e={e} user={user}/> 
                          ))):(
                        invoice_errors_by_filter.length ? 
                        invoice_errors_by_filter.map((e, i) =>{
                          return(
                            <ModelTr key={i} e={e} user={user}/>
                          )
                          })
                        :
                        invoice_errors.map((e, i) =>{
                          return(
                            <ModelTr key={i} e={e} user={user}/>
                          )
                        }
                        )
                          )
                      }
                    </Tbody>
                  </Table>
              </TableContainer> 
            // ) : (
            //   <Center w={'full'} h={'full'}>
            //   <Text userSelect={'none'} fontSize={'2vh'}>No quotes found</Text>
            //   </Center>
            // )
            }
          </Box> 
      </Box>
  )

}
export default InvoiceErrorList;
