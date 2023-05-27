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
import { useDispatch, useSelector } from "react-redux"
import { getInvoiceById, getInvoiceProducts } from "../../redux/actions-invoices"
import { cleanStatePayments } from "../../redux/actions-payments"
import { useNavigate } from "react-router-dom"

const StatsModal = ({isOpenModal, onCloseModal}) => {

  const stats = useSelector(state => state.stats)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleClick = (e) => {
    dispatch(getInvoiceById(e.Naturali_Invoice))
    dispatch(getInvoiceProducts(e.Naturali_Invoice))
    dispatch(cleanStatePayments())
    navigate(`/quotes/${e.Naturali_Invoice}`)
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
                Invoices derived from the stats 
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
                            <Th color={'web.text2'} textAlign={'center'} px={20}>Nº Quote</Th>
                            <Th color={'web.text2'} textAlign={'center'} px={20}>Value quote</Th>
                            <Th color={'web.text2'} textAlign={'center'} px={20}>Date</Th>
                          </Tr>
                      </Thead>
                      <Tbody>
                          { 
                            stats.invoices.map((e, i) => (
                              <Tr
                              onClick={() => handleClick(e)}
                              key={e.Naturali_Invoice}
                              cursor={'pointer'} 
                              _hover={{
                                bg: 'web.navBar',
                                color: 'logo.orange',
                              }}
                              borderBottom={'1px solid'}
                              fontSize={'sm'}
                              textAlign={'center'}
                              fontWeight={'hairline'}
                              h={'4.5vh'}
                              >
                                <td color={'web.text'} textAlign={'center'} fontWeight={'hairline'}>
                                  {e.Naturali_Invoice}
                                </td>
                                <td color={'web.text'} textAlign={'center'} fontWeight={'hairline'}>
                                  $ {e.Value.toLocaleString('en-US')}
                                </td>
                                <td color={'web.text'} textAlign={'center'} fontWeight={'hairline'}>
                                  {e.InvoiceDate.slice(0, 10)}
                                </td>
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

export default StatsModal;