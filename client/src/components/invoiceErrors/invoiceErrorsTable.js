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
        <Td textAlign={'center'} maxW={'0.5vw'}>{e.Invoice}</Td>
        {
          (user[0].Secction7Flag === 1 ) ? ( e.FirstName && e.LastName ?(<Td textAlign={'center'} maxW={'3vw'}>{e.FirstName[0]}{e.LastName[0]}</Td>):(null)) : (null)
        }
        {
          (user[0].Secction7Flag === 1) ? (<Td textAlign={'center'} maxW={'3vw'}>{e.Type}</Td> ) : (null)
        }
        <Td textAlign={'center'} maxW={'1vh'} border={'2px solid red'}>{e.Date?.split('T')[0]}</Td>
        <Td maxw={'12vw'}>{e.Error}</Td>
      </Tr>
    )
}

const InvoiceErrorsList = ({user, invoice_errors_by_filter, filteredInvoicesErrors, invoice_errors}) => {
 
    return(
        <Box
        display={'flex'}
        justifyContent={'center'}
        h={'74vh'}
        w={'84vw'}
        >
          <Box
            maxHeight={'70vh'}
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
            w={'80vw'}
            ml={'3vw'}
            mr={'3vw'}
            >
            <TableContainer>
                <Table color={'web.text'} variant={'simple'} size={'sm'}>
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'}>Invoice Nº</Th>
                      {
                      (user[0].Secction7Flag === 1 ) ?
                      <Th color={'web.text2'}>Seller</Th> : (null)
                      }
                      {
                      (user[0].Secction7Flag === 1 ) ?
                      <Th color={'web.text2'}>Type</Th> : (null)
                      }
                      <Th color={'web.text2'}>Date</Th>
                      <Th color={'web.text2'}>Error</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {
                    filteredInvoicesErrors.length ? 
                      filteredInvoicesErrors.map((e, i) =>{
                        return(
                          <ModelTr key={i} e={e} user={user}/>
                        )
                      })
                      : 
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
                  }
                  </Tbody>
                </Table>
            </TableContainer> 
            </Box> 
        </Box>
    )
}
export default InvoiceErrorsList;
