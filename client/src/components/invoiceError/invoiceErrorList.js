import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Text
} from '@chakra-ui/react'



const ModelTr = ({e, user}) => {

  return(
    <Tr
      cursor={'pointer'} 
      key={e.Invoice}
      h={'5vh'}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }}
      overflowX={'auto'}
      css={{
        '&::-webkit-scrollbar': {
          height: '0.2vw',
          overflowX: 'scroll'
        },
        '&::-webkit-scrollbar-track': {
          height: '6px',
          overflowX: 'scroll'
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#E47424',
          borderRadius: '5px',
        },        
      }}
      >
      <Td fontSize={'0.9rem'} textAlign={'center'} maxW={'7vw'}>{e.Invoice}</Td>
      
      {
        (user[0].Secction7Flag === 1 ) ? (
          e.FirstName ? (
          <Td fontSize={'0.9rem'}textAlign={'center'}>{e.FirstName[0]}{e.LastName[0]}</Td>
          ):(
          <Td fontSize={'0.9rem'}textAlign={'center'} maxW={'7vw'}>{'-'}</Td>)
        ):(null)
      }
      {/*Cuando la tabla Orders este cargada, agregar BY*/}
      {
        
       (user[0].Secction7Flag === 1) ? ( <Td fontSize={'0.9rem'} textAlign={'center'}>{e.Type}</Td> ) : (null)
      }
      <Td fontSize={'0.9rem'}>{e.Date?.split('T')[0]}</Td>
      <Td fontSize={'0.9rem'} >{e.Error}</Td>
      </Tr>
    )}  
    
const  InvoiceErrorList = ({user, invoice_errors}) => {

  
  return(
    <Box
      display={'flex'}
      justifyContent={'center'}
      ml={'1vh'}
      h={'75vh'}
      w={'82.8vw'} 
      >
      <Box
        maxHeight={'73vh'}
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
        >
          {
            invoice_errors.length ? (
              <TableContainer> 
                <Table color={'web.text'} variant={'simple'} size={'sm'}>
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'} w={'7vw'} textAlign={'center'}>Nº</Th>
                        {
                          (user[0].Secction7Flag === 1) ?
                            <Th w={'7vw'} color={'web.text2'}  textAlign={'center'}>By</Th> : null
                        }
                        {
                          (user[0].Secction7Flag === 1) ? <Th w={'5vw'} color={'web.text2'} textAlign={'center'}>Type</Th> :  null
                        }
                      <Th w={'5vw'} color={'web.text2'} textAlign={'center'}>Date</Th>
                      <Th color={'web.text2'}>Error</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    { 
                      invoice_errors.map((e, i) =>{
                        return(
                          <ModelTr key={i} e={e} user={user}/>
                              )
                        }) 
                          
                    }
                    </Tbody>
                  </Table>
              </TableContainer>):(
              <Center w={'full'} h={'full'} minH={'full'}>
                <Text userSelect={'none'} fontSize={'2vh'}>No quotes found</Text>
              </Center>
              ) 
            }
          </Box> 
      </Box>
  )

}
export default InvoiceErrorList;
