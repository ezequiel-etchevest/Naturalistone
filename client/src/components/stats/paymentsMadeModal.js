import { 
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Text,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Input,
    Divider,
    HStack,
    Box,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { getInvoiceById, getInvoiceProducts } from "../../redux/actions-invoices"
import { cleanStatePayments } from "../../redux/actions-payments"
import { useNavigate } from 'react-router-dom'

const PaymentsMadeModal = ({isOpenModal, onCloseModal}) => {

  const stats = useSelector(state => state.stats);
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const handleClick = (e) => {
    dispatch(getInvoiceById(e.InvoiceID))
    dispatch(getInvoiceProducts(e.InvoiceID))
    dispatch(cleanStatePayments())
    navigate(`/quotes/${e.InvoiceID}`)
  }

    return (
        <>
          <Modal
          isOpen={isOpenModal}
          onClose={onCloseModal}
          size={'4xl'}
          >
            <ModalOverlay />
            <ModalContent 
              bg={'web.sideBar'}
              border={'1px solid'}
              borderColor={'web.border'}
              height={'600px'}
            >
              <ModalHeader 
              display={'flex'}
              justifyContent={'center'}
              color={'web.text2'}> 
                Invoices Payments from the stats 
              </ModalHeader>
              <ModalCloseButton
                color={'web.text2'}
                _hover={{
                color: 'web.text'
              }}
                onClick={onCloseModal} 
              />
            <ModalBody 
            color={'web.text2'}
            display={'flex'}
            justifyContent={'flex-start'}
            flexDir={'column'}
            maxH={'70vh'}
            >
            <Box
            maxHeight={'65vh'}
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
            >
              <TableContainer>
                  <Table color={'web.text'}variant={'simple'} size={'sm'}>
                      <Thead h={'6vh'}>
                          <Tr h={'6vh'}>
                            <Th color={'web.text2'} textAlign={'center'} px={6}>Nº Quote</Th>
                            <Th color={'web.text2'} textAlign={'center'} px={6}>Amount</Th>
                            <Th color={'web.text2'} textAlign={'center'} px={6}>Method</Th>
                            <Th color={'web.text2'} textAlign={'center'} px={6}>Date</Th>
                          </Tr>
                      </Thead>
                      <Tbody>
                          { 
                            stats.payments.map((e, i) => (
                              <Tr
                              onClick={() => handleClick(e)}
                              key={e.InvoiceID}
                              cursor={'pointer'} 
                              _hover={{
                                bg: 'web.navBar',
                                color: 'logo.orange'
                              }}>
                                <Th color={'web.text'} textAlign={'center'} fontWeight={'hairline'}>
                                  {e.InvoiceID}
                                </Th>
                                <Th color={'web.text'} textAlign={'center'} fontWeight={'hairline'}>
                                  {e.Amount}
                                </Th>
                                <Th color={'web.text'} textAlign={'center'} fontWeight={'hairline'}>
                                  {e.Method}
                                </Th>
                                <Th color={'web.text'} textAlign={'center'} fontWeight={'hairline'}>
                                  {e.Date.slice(0, 10)}
                                </Th>
                              </Tr>
                              ))
                          }
                        </Tbody>
                      </Table>
                  </TableContainer> 
            </Box>
            </ModalBody>
            </ModalContent>
          </Modal>
        </>
    )
}

export default PaymentsMadeModal;