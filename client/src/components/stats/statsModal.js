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
    Td,
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
          size={'3xl'}
          >
            <ModalOverlay />
            <ModalContent 
              bg={'web.sideBar'}
              border={'1px solid'}
              borderColor={'web.border'}
              h={'76vh'}
            >
              <ModalHeader 
                display={'flex'}
                justifyContent={'center'}
                color={'web.text'}
                mt={'3vh'}
                h={'7vh'}
                > 
                  Invoices from the stats 
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
              maxHeight={'59vh'}
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
              bg={'web.sideBar'} 
              rounded={'md'} 
              p={'3vh'}
              >
              <TableContainer>
                  <Table color={'web.text'}variant={'simple'} size={'sm'}>
                      <Thead h={'6vh'}>
                          <Tr h={'6vh'}>
                            <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'}>Nº Quote</Th>
                            <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'}>Value quote</Th>
                            <Th color={'web.text2'} textAlign={'center'} fontSize={'x-small'}>Date</Th>
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
                                fontSize={'xs'}
                                textAlign={'center'}
                                fontWeight={'hairline'}
                                h={'4.5vh'}
                                >
                                <Td textAlign={'center'}>{e.Naturali_Invoice}</Td>
                                <Td textAlign={'center'}>$ {e.Value.toLocaleString('en-US')}</Td>
                                <Td textAlign={'center'}>{e.InvoiceDate.slice(0, 10)}</Td>
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