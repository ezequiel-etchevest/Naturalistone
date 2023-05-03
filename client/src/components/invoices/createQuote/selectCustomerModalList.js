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
  import { useState } from 'react';
  import SelectedCustomerModal from './selectedCustomerReview';
  
  
  
  const ModelTr = ({e, onSecondModalOpen, setCustomer}) => {
  


    const handleClick = (e) => {
      setCustomer(e)
      onSecondModalOpen()
    }

    return(
      <Tr 
      cursor={'pointer'} 
      key={e.CustomerID}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
        }}
        onClick={() => handleClick(e)}
      >
        <Td fontSize={'xs'}  w={'4vw'}>{e.CustomerID}</Td>
        <Td fontSize={'xs'} textAlign={'center'}>{e.Contact_Name ? e.Contact_Name : '-'}</Td>
        <Td fontSize={'xs'}  w={'24vw'}>{e.Company}</Td>

      </Tr>
    )
  }
  
  const SelectCustomerModalList = ({customers, onSecondModalOpen, onSecondModalClose, isSecondModalOpen}) => {
    console.log(customers)
    const [customer, setCustomer] = useState('')
  
  return(
<>
  <Box
    display={'flex'}
    justifyContent={'center'}
    >
      <Box
      maxHeight={'50vh'}
      minHeight={'50vh'}
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
                    <ModelTr key={i} e={e}  onSecondModalOpen={onSecondModalOpen} setCustomer={setCustomer} /> 
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
    <SelectedCustomerModal onSecondModalClose={onSecondModalClose} isSecondModalOpen={isSecondModalOpen} customer={customer} setCustomer={setCustomer}/>
  </>
  )
}
  export default SelectCustomerModalList;
  