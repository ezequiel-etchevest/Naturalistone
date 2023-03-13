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
        <Td textAlign={'center'}>{e.Invoice}</Td>
        {
          (user[0].SellerID === 3 || user[0].SellerID === 5 || user[0].SellerID === 15 ) ?
          <Td textAlign={'center'}>{e.FirstName} {e.LastName}</Td>
          : null
        }
        {
          (user[0].SellerID === 3 || user[0].SellerID === 5 || user[0].SellerID === 15 ) ?
          <Td textAlign={'center'}>{e.Type}</Td> 
          : null
        }
        <Td textAlign={'center'}>{e.Date?.split('T')[0]}</Td>
        <Td maxW={'30vw'}>{e.Error}</Td>
      </Tr>
    )
}

const InvoiceErrorsList = ({user, invoice_errors_by_filter, filteredInvoicesErrors, invoice_errors}) => {
 


  // const result = useSelector(state=> state.validate_result_quotes)
  // const toast = useToast()
  // const id = 'test-toast'

//   const validateResults = () => {
//     if(result === 'no_results'){
//       if (!toast.isActive(id)) {
//       toast({
//         id,
//         title: 'No results found',
//         description: 'Reloading all the quotes',
//         status: 'warning',
//         duration: 2000,
//         isClosable: true,
//       });
//     }}
//   }

  // const noneSellerInvoices = () => {
  //   if(!seller_invoices.length){
  //     setTimeout(
  //       toast({
  //         id,
  //         title: 'No results found',
  //         description: 'Thers no invoices for this seller',
  //         status: 'warning',
  //         duration: 2000,
  //         isClosable: true,
  //       }), 2000
  //     )
  //     return ([])
  //   }
  //   else return seller_invoices
  // }

//   useEffect(()=>{
//     validateResults()
//   })

    return(
        <Box
        display={'flex'}
        justifyContent={'center'}
        h={'74vh'}
        w={'80vw'}
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
            w={'74vw'}
            ml={'3vw'}
            mr={'3vw'}
            >
            <TableContainer>
                <Table color={'web.text'} variant={'simple'} size={'sm'}>
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'} w={'5vw'} textAlign={'center'}>Invoice Nº</Th>
                      {
                      (user[0].SellerID === 3 || user[0].SellerID === 5 || user[0].SellerID === 15 ) ?
                      <Th w={'5vw'} color={'web.text2'} textAlign={'center'}>Seller</Th> :
                      null
                      }
                      {
                      (user[0].SellerID === 3 || user[0].SellerID === 5 || user[0].SellerID === 15 ) ?
                      <Th w={'5vw'} color={'web.text2'} textAlign={'center'}>Type</Th> :
                      null
                      }
                      <Th w={'5vw'} color={'web.text2'} textAlign={'center'}>Date</Th>
                      <Th color={'web.text2'} textAlign={'center'}>Error</Th>
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
