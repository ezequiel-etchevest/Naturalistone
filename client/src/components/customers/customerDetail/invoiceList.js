import { Text, Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Center, border } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ModelTr = ({invoice}) => {

  const navigate = useNavigate()
  return(
    <Tr
      h={'5vh'} 
      cursor={'pointer'}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }}
      onClick={() => navigate(`/quotes/${invoice.Naturali_Invoice}`)}
      >
      <Td textAlign={'center'} fontSize={'1.6vh'}>{invoice.Naturali_Invoice}</Td>
      <Td textAlign={'center'} fontSize={'1.6vh'}>{invoice.Value}</Td>
    </Tr>
  )
}

const InvoiceList = () => {

  const project_invoices = useSelector(state => state.project_invoices)

    return(
      <>
        <Box
          p={'2vh'}
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
          }}> 
          { project_invoices.length ? (
              <TableContainer  w={'48vw'} >
                <Table color={'web.text'} variant={'simple'} size={'sm'} >
                  <Thead h={'4vh'}>
                    <Tr>
                      <Th h={'4vh'} color={'web.text2'} textAlign={'center'} fontSize={'1.6vh'}>Invoice Number</Th>
                      <Th h={'4vh'} color={'web.text2'} textAlign={'center'} fontSize={'1.6vh'}>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {
                    project_invoices?.map((invoice, i) => {
                    return(
                    <ModelTr key={i} invoice={invoice}/>
                    )})   
                  }                
                  </Tbody>
                </Table>
              </TableContainer>
            ):(
              <Center w={'40vw'} h={'22vh'} >
                <Text userSelect={'none'} fontSize={'1.5vh'}>To view the invoices, please choose a project.</Text>
              </Center>
            )}
        </Box> 
      </>
    )}


export default InvoiceList;