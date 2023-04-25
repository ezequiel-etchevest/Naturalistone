import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useToast,
    Text,
    Center,
    } from '@chakra-ui/react'
  import { useNavigate } from 'react-router-dom'
  import { useDispatch, useSelector } from 'react-redux'
  import { useEffect } from 'react';
  
  
  
  const ModelTr = ({e}) => {
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    // const handleClick = () => {
    //   dispatch(getInvoiceById(e.Naturali_Invoice))
    //   dispatch(getInvoiceProducts(e.Naturali_Invoice))
    //   dispatch( cleanStatePayments())
    //   navigate(`/quotes/${e.Naturali_Invoice}`)
    // }
  
    return(
      <Tr 
      //onClick={() => handleClick()} 
      cursor={'pointer'} 
      key={e.CustomerID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
      >
        <Td fontSize={'xs'}  w={'4vw'}>{e.CustomerID}</Td>
        <Td fontSize={'xs'} textAlign={'center'}>{e.LastName ?`${e.Name} ${e.LastName}` : '-'}</Td>
        <Td fontSize={'xs'}  w={'24vw'}>{e.Reference}</Td>

      </Tr>
    )
  }
  
  const CreateCustomerModalList = ({customers, user}) => {
  
    return(
    <Box
    display={'flex'}
    justifyContent={'center'}
    >
      <Box
      maxHeight={'50vh'}
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
      >
      {
        customers.length ? (
          <TableContainer w={'46vw'}>
            <Table color={'web.text'}variant={'simple'} size={'sm'}>
              <Thead h={'3vh'}>
                <Tr>
                    <Th color={'web.text2'} textAlign={'center'} w={'4vw'} fontSize={'x-small'}>IDs</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'}>Full Name</Th>
                    <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'} w={'24vw'}>Company</Th>
                  </Tr>
                </Thead>
                <Tbody >
                { 
                  customers.map((e, i) => (
                    <ModelTr key={i} e={e} user={user}/> 
                  ))
                }
                </Tbody>
              </Table>
            </TableContainer> 
            ) : (
            <Center w={'full'} h={'full'}>
              <Text userSelect={'none'} fontSize={'2vh'}>No customers found</Text>
            </Center>
            )
        }
      </Box> 
    </Box>
      )
  }
  export default CreateCustomerModalList;
  