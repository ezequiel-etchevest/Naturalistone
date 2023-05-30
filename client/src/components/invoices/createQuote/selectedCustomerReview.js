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
    Box,
    useDisclosure,
    Progress,
    Heading,
    Stack,
    StackDivider
    } from "@chakra-ui/react"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/card'
import { useDispatch } from 'react-redux'
import { getCustomerProjects } from "../../../redux/actions-projects"
import SelectProjectModal from "../../invoices/createQuote/customerProjects/selectProjectModal"
import '../../../assets/styleSheet.css'
import { getCustomers } from "../../../redux/actions-customers"

const SelectedCustomerModal = ({customer, isOpen2, onOpen2, onClose2, onClose1, setCustomer,  isOpen, onClose, setInputValue}) => {

const dispatch = useDispatch()
const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure()

const handlePrevious = () => {
  setCustomer('')
  onClose2()
}

const handleNext = () => {
  dispatch(getCustomerProjects(customer.CustomerID))
  onOpen3()
  onClose2()
}

const handleClose = () => {
  onClose2()
  onClose1()
  setInputValue('')
  setCustomer('')
  dispatch(getCustomers('', ''))
}
  return(

<>
  <Modal 
    isOpen={isOpen2} 
    onClose={handleClose}
    size={'3xl'}
    motionPreset='slideInRight'
    >
    <ModalOverlay />
    <ModalContent 
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      >
      <Progress value={40} 
        colorScheme={"orange"} 
        mb={'2vh'} 
        background={'web.border'} 
        size={'sm'}
        borderTopRightRadius={'md'}
        borderTopLeftRadius={'md'}
        />
      <ModalBody 
        color={'web.text2'} 
        display={'flex'} 
        flexDir={'column'} 
        h={'58vh'} 
        alignItems={'center'}>
        <Text ml={'2vw'} mt={'2vh'} mb={'6vh'} fontSize={'lg'}w={'16vw'} color={'white'} alignSelf={'flex-start'}>Selected customer</Text>
        <Card h={'46vh'} w={'40vw'} mb={'2vh'}>
          <CardBody  h={'38vh'} display={'flex'} flexDir={'row'} justifyContent={'space-around'}>
            <Stack divider={<StackDivider />}>
              <Box w={'18vw'}>
                <Text pt='2' fontSize='sm' > Full Name </Text>
                <Heading size='xs'><Text pt='2'pl='2' fontSize='sm'>{customer.Contact_Name ? customer.Contact_Name : "-"}</Text></Heading>
              </Box>
              <Box>
                <Text pt='2' fontSize='sm' > Phone </Text>
                <Heading size='xs'><Text pt='2'pl='2' fontSize='sm'>{customer.Phone ? customer.Phone : "-"}</Text></Heading>
              </Box>
              <Box>
                <Text pt='2' fontSize='sm' > Email </Text>
                <Heading size='xs'><Text pt='2'pl='2' fontSize='sm'>{customer.Email ? customer.Email : "-"}</Text></Heading>
              </Box>
              <Box>
                <Text pt='2' fontSize='sm' > Company </Text>
                <Heading size='xs'><Text pt='2'pl='2' fontSize='sm'>{customer.Company ? customer.Company : "-"}</Text></Heading>
              </Box>
              <Box>
                <Text pt='2' fontSize='sm' > Company Position </Text>
                <Heading size='xs'><Text pt='2'pl='2' fontSize='sm'>{customer.Company_Position ? customer.Company_Position : "-"}</Text></Heading>
              </Box>
            </Stack>
            <Stack divider={<StackDivider />}>
              <Box>
                <Text pt='2' fontSize='sm' > Discount </Text>
                <Heading size='xs'>
                  <Text pt='2'pl='2' fontSize='sm'>
                    { 
                      customer.DiscountID === 4 || customer.DiscountID === 3 ? 
                        customer.DiscountID === 4 ? '15 %' : '10 %'
                      : 
                      customer.DiscountID === 2 ?  '5 %' : "-"
                    }
                  </Text>
                </Heading>
              </Box>
              <Box w={'18vw'}>
                <Text pt='2' fontSize='sm' > Address </Text>
                <Heading size='xs'><Text pt='2'pl='2' fontSize='sm'>{customer.Address ? customer.Address : "-"}</Text></Heading>
              </Box>
              <Box>
                <Text pt='2' fontSize='sm' > City </Text>
                <Heading size='xs'><Text pt='2'pl='2' fontSize='sm'>{customer.ZipCode ? customer.ZipCode : "-"}</Text></Heading>
              </Box>
              <Box>
                <Text pt='2' fontSize='sm' > ZipCode </Text>
                <Heading size='xs'><Text pt='2'pl='2' fontSize='sm'>{customer.ZipCode ? customer.ZipCode : "-"}</Text></Heading>
              </Box>
              <Box>
                <Text pt='2' fontSize='sm' > State </Text>
                <Heading size='xs'><Text pt='2'pl='2' fontSize='sm'>{customer.State ? customer.State : "-"}</Text></Heading>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter mb={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'2vw'} mr={'2vw'}>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          onClick={()=>handlePrevious()}
          >
         Previous
        </Button>
        <Button
          colorScheme={'orange'}
          size={'sm'} 
          onClick={()=>handleNext()}
          >
         Next
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  <SelectProjectModal isOpen3={isOpen3} onOpen2={onOpen2} onClose3={onClose3} onClose2={onClose2} onClose1={onClose1} customer={customer} setCustomer={setCustomer} setInputValue={setInputValue}/>
</>
)}

export default SelectedCustomerModal

