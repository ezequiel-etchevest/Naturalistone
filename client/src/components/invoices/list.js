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
import { getInvoiceById, getInvoiceProducts } from '../../redux/actions-invoices';
import { cleanStatePayments } from '../../redux/actions-payments';
import { useEffect } from 'react';



const ModelTr = ({e, validateSeller}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
      dispatch(getInvoiceById(e.Naturali_Invoice))
      dispatch(getInvoiceProducts(e.Naturali_Invoice))
      dispatch( cleanStatePayments())
      navigate(`/quotes/${e.Naturali_Invoice}`)
    }

    return(
      <Tr 
        onClick={() => handleClick()} 
        cursor={'pointer'} 
        h={'5vh'}
        key={e.Naturali_Invoice}
        _hover={{
          bg: 'web.navBar',
          color: 'logo.orange'
        }}
        textColor={e.Status === 'Pending_Approval' ? 'logo.orange' : 'unset'}
        >
        <Td fontSize={'0.9rem'}  textAlign={'center'}>{e.Naturali_Invoice}</Td>
        {
          validateSeller() ? (
          <Td  fontSize={'0.9rem'} textAlign={'center'}>{e.SellerReference}</Td>
          ):(null)
        }
        <Td fontSize={'0.9rem'}>{e.ProjectName ? e.ProjectName : '-'}</Td>
        <Td fontSize={'0.9rem'}>{e.Company ? e.Company : e.Contact_Name}</Td>
        <Td fontSize={'0.9rem'} textAlign={'center'}>{e.InvoiceDate.split('T')[0]}</Td>
        <Td fontSize={'0.9rem'} textAlign={'center'}>{e.Status}</Td>
        <Td fontSize={'0.9rem'} isNumeric textAlign={'center'}>$ {e.Value.toLocaleString('en-US')} </Td>
        <Td fontSize={'0.9rem'} textAlign={'center'} >{ e.Percentaje ? Math.round(e.Percentaje) : 0 } % </Td>
        <Td fontSize={'0.9rem'} textAlign={'center'}>{ e.Payments?.length ? e.Payments[0][2] : '-'}</Td>
      </Tr>
    )
}

const List = ({seller_invoices, user}) => {

  const result = useSelector(state=> state.validate_result_quotes)
  const toast = useToast()
  const id = 'test-toast'
 
  const validateSeller = () => {
    if(user[0].Secction7Flag === 1) return true
    else return false
  }

  const validateResults = () => {
    if(result === 'no_results'){
      if (!toast.isActive(id)) {
      toast({
        id,
        title: 'No results found',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }}
  }

  useEffect(()=>{
    validateResults()
  })
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
                typeof seller_invoices[0] !== 'string' ? (
                  <TableContainer>
                      <Table color={'web.text'}variant={'simple'} size={'sm'}>
                        <Thead h={'6vh'}>
                          <Tr>
                            <Th color={'web.text2'} textAlign={'center'}>Nº</Th>
                            { validateSeller() ? (
                                <Th color={'web.text2'} textAlign={'center'} w={'1vw'}>Ref</Th>
                            ):(null) }
                            <Th color={'web.text2'}>Project</Th>
                            <Th color={'web.text2'}>Company or Customer</Th>
                            <Th color={'web.text2'} textAlign={'center'}>Date</Th>
                            <Th color={'web.text2'} textAlign={'center'}>Status</Th>
                            <Th color={'web.text2'} textAlign={'center'} isNumeric>Total</Th>
                            <Th color={'web.text2'} textAlign={'center'}>Paid</Th>
                            <Th color={'web.text2'} textAlign={'center'} >Last Payment</Th>
                          </Tr>
                        </Thead>
                        <Tbody >
                          { 
                            seller_invoices.map((e, i) => (
                              <ModelTr key={i} e={e} user={user} validateSeller={validateSeller}/> 
                              ))
                          }
                        </Tbody>
                      </Table>
                  </TableContainer> 
                ) : (
                  <Center w={'full'} h={'full'}>
                  <Text userSelect={'none'} fontSize={'2vh'}>No quotes found</Text>
                  </Center>
                )
              }
            </Box> 
        </Box>
    )
  
}
export default List;
