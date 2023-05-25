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
import { useSelector } from "react-redux"

const StatsModal = ({isOpenModal, onCloseModal, stat}) => {

  const stats = useSelector(state => state.stats)

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
            justifyContent={'center'}
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
                              cursor={'pointer'} 
                              _hover={{
                                bg: 'web.navBar',
                                color: 'logo.orange'
                              }}>
                                <Th color={'web.text2'} textAlign={'center'}>
                                  {e.Naturali_Invoice}
                                </Th>
                                <Th color={'web.text2'} textAlign={'center'}>
                                  {e.Value}
                                </Th>
                                <Th color={'web.text2'} textAlign={'center'}>
                                  {e.InvoiceDate.slice(0, 10)}
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

export default StatsModal;