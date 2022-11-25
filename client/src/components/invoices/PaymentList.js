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
  } from '@chakra-ui/react'



const ModelTr = ({p, totalAmount}) => {

    const per = (p.Amount * 100) / totalAmount
    
    return(
      <Tr 
        cursor={'pointer'}
        key={p.ProdID} 
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        >
        <Td textAlign={'match-parent'}>{p.Date.split('T')[0]}</Td>
        <Td textAlign={'match-parent'}>${p.Amount} </Td>
        <Td textAlign={'match-parent'}>{p.Method}</Td>
        <Td textAlign={'match-parent'}>{per.toFixed(2)} %</Td>
      </Tr>
    )
}

const PaymentList = ({payments, totalAmount}) => {

  if(payments.paymentData){
    return(
        <Box
        display={'flex'}
        justifyContent={'center'}
        >
          <Box
            maxHeight={'46vh'}
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
            bg={'web.sideBar'}           
            >
            <Text fontSize={'xl'} color={'web.text2'}>Payment Details</Text>
            <TableContainer  w={'44vw'}>
                <Table mt={'2vh'} color={'web.text'} variant={'simple'} size={'sm'} >
                  <Thead h={'6vh'}>
                    <Tr>
                      <Th color={'web.text2'}>Payment Date</Th>
                      <Th color={'web.text2'}>Amount</Th>
                      <Th color={'web.text2'}>Method</Th>
                      <Th color={'web.text2'}>Percentaje</Th>
                    </Tr>
                  </Thead>
                  <Tbody >
                    { 
                        payments.paymentData.map((p, i) =>{
                          return(
                            <ModelTr p={p} key={i} totalAmount={totalAmount}/>
                          )})
                          
                          
                    
                    }
                  </Tbody>
                </Table>
            </TableContainer> 
            </Box> 
        </Box>)
  }else {
    return(
      <Text color={'web.text'}>No payments done yet</Text>
    )
  }
    
  
  }

export default PaymentList;