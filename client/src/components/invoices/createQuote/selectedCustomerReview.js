import { 
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    Text,
    ModalBody,
    Box,
    useDisclosure,
    Progress,
    Heading,
    Stack,
    StackDivider,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    useEditableControls,
    ButtonGroup,
    IconButton,
    Flex,
    Input,
    useToast
    } from "@chakra-ui/react"
import { Card, CardBody } from '@chakra-ui/card'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomerProjects } from "../../../redux/actions-projects"
import SelectProjectModal from "../../invoices/createQuote/customerProjects/selectProjectModal"
import '../../../assets/styleSheet.css'
import { cleanCustomerDetail, getCustomers, updateCustomer } from "../../../redux/actions-customers"
import { useState } from "react"

const SelectedCustomerModal = ({customer, isOpen2, onOpen2, onClose2, onClose1, setCustomer,  isOpen, onClose, setInputValue}) => {

const dispatch = useDispatch()
const toast = useToast()

const [disable, setDisable] = useState(false)

const idCustomer = customer.CustomerID
const id = 'test-toast'

const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure()

const rate = customer.DiscountRate?.toString()

const handleInputChange = (e) => {
  const enteredValue = e.target.value;
  const allowedValues = ['0', '5', '10', '15'];

  if (enteredValue) {
    if (allowedValues.includes(enteredValue)) {
      setCustomer({ ...customer, DiscountRate: enteredValue });
      setDisable(false);
    } else {
      toast({
        title: 'Incorrect Values',
        description: 'Only 0, 5, 10, 15 allowed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setDisable(true);
    }
  } else {
    setCustomer({ ...customer, DiscountRate: '0'});
    setDisable(false);
  }
};


const handlePrevious = () => {
  setCustomer('')
  setInputValue('')
  onClose2()
  dispatch(cleanCustomerDetail())
}

const handleNext = () => {
  dispatch(getCustomerProjects(customer.CustomerID))
  if(customer.Contact_Name != "undefined" 
    && customer.Email != "undefined" 
    && customer.City != "undefined" 
    && customer.State!= "undefined"
    // && customer.DiscountID != "undefined"
    && customer.DiscountRate != "undefined"
    && customer.ZipCode != "undefined"  
    && customer.Phone != "undefined" 
    && customer.Company != "undefined" 
    && customer.Company_Position != "undefined" 
    && customer.Address != "undefined"){
      dispatch(updateCustomer(idCustomer, customer))
      onOpen3()
      onClose2()
  } else {
    toast({
      title: 'Incorrect Values',
      description: 'All fields must be filled',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
}
const handleClose = () => {
  onClose2()
  onClose1()
  setInputValue('')
  setCustomer('')
  dispatch(getCustomers('', ''))
  dispatch(cleanCustomerDetail())
}

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent='center' alignItems={'center'} size='sm'h={'4vh'}>
      <IconButton icon={<CheckIcon />} 
                  variant={'unstyled'} 
                  display={'flex'} 
                  borderRadius={'sm'} 
                  placeContent={'center'}
                  alignItems={'center'}
                  color={'web.text2'} 
                  _hover={{
                     color: 'logo.orange'
                     }}
                  _active={{
                  }}
                  {...getSubmitButtonProps()}/>
      <IconButton icon={<CloseIcon />} 
                  variant={'unstyled'} 
                  display={'flex'} 
                  borderRadius={'sm'} 
                  placeContent={'center'}
                  alignItems={'center'}
                  color={'web.text2'} 
                  _hover={{
                     color: 'logo.orange'
                     }}
                  _active={{
                  }}
                  {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent='center' alignItems={'center'}>
      <IconButton size='xs' 
                  icon={<EditIcon />} 
                  variant={'unstyled'} 
                  display={'flex'} 
                  borderRadius={'sm'} 
                  placeContent={'center'}
                  alignItems={'center'}
                  justifyItems={'center'}
                  fontSize={'xl'}
                  color={'web.text2'} 
                  _hover={{
                     color: 'logo.orange'
                     }}
                  _active={{
                  }}
                  {...getEditButtonProps()} />
    </Flex>
  )
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
        <Text ml={'2vw'} mt={'2vh'} mb={'2vh'} fontSize={'lg'}w={'16vw'} color={'white'} alignSelf={'flex-start'}>Selected customer</Text>
        <Card h={'46vh'} w={'40vw'} mb={'2vh'}>
          <CardBody  h={'38vh'} display={'flex'} flexDir={'row'} justifyContent={'space-around'}>
            <Stack divider={<StackDivider />}>
              <Box pt='2' w={'18vw'} h={'10vh'}>
                <Text fontSize='sm' > Full Name </Text>
                <Editable
                  defaultValue={customer.Contact_Name ? customer.Contact_Name : "-"}
                  fontSize='sm'
                  fontWeight={'bold'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pl='2'
                  pt='1'
                  justifyContent={'space-between'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    w={'12vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                    size={"sm"}
                    type={"text"}
                    onChange={(e) =>{
                      if(e.target.value.length){
                      setCustomer({...customer, Contact_Name: e.target.value})
                    }else return
                  }}
                  /> 
                  <EditableControls />
                </Editable>
              </Box>
              <Box h={'10vh'}>
                <Text pt='1' fontSize='sm' > Phone </Text>
                <Editable
                  defaultValue={customer.Phone ? customer.Phone : "-"}
                  fontSize='sm'
                  fontWeight={'bold'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  justifyContent={'space-between'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    w={'12vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                    size={"sm"}
                    type={"text"}
                    onChange={(e) =>{
                      if(e.target.value.length){
                      setCustomer({...customer, Phone: e.target.value})
                    }else return
                  }}
                  /> 
                  <EditableControls />
                </Editable>
              </Box>
              <Box>
                <Text pt='1' fontSize='sm' > Email </Text>
                <Editable
                  defaultValue={customer.Email ? customer.Email : "-"}
                  fontSize='sm'
                  fontWeight={'bold'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  justifyContent={'space-between'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    w={'10vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{
                    if(e.target.value.length){
                    setCustomer({...customer, Email: e.target.value})
                  }else return
                }}
                  /> 
                  <EditableControls />
                </Editable>
              </Box>
              <Box>
                <Text pt='1' fontSize='sm' > Company </Text>
                <Editable
                  defaultValue={customer.Company ? customer.Company : "-"}
                  fontSize='sm'
                  fontWeight={'bold'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  justifyContent={'space-between'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    w={'10vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{
                    if(e.target.value.length){
                    setCustomer({...customer, Company: e.target.value})
                  }else return
                }}
                  /> 
                  <EditableControls />
                </Editable>
              </Box>
              <Box>
                <Text pt='1' fontSize='sm' > Company Position </Text>
                <Editable
                  defaultValue={customer.Company_Position ? customer.Company_Position : "-"}
                  fontSize='sm'
                  fontWeight={'bold'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  justifyContent={'space-between'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    w={'10vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{
                    if(e.target.value.length){
                    setCustomer({...customer, Company_Position: e.target.value})
                  }else return
                }}
                  /> 
                  <EditableControls />
                </Editable>
              </Box>
              <Box></Box>
            </Stack>
            <Stack divider={<StackDivider />}>
              <Box>
                <Text pt='2' fontSize='sm' > Discount </Text>
                <Editable
                  defaultValue={rate}
                  fontSize='sm'
                  fontWeight={'bold'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  justifyContent={'space-between'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    w={'4vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                    onChange={(e) => handleInputChange(e)}
                  />
                  <EditableControls />
                </Editable>
              </Box>
              <Box w={'18vw'}>
                <Text pt='1' fontSize='sm' > Address </Text>
                <Editable
                  defaultValue= {customer.Address ? customer.Address : "-"}
                  fontSize='sm'
                  fontWeight={'bold'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  justifyContent={'space-between'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    w={'10vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{
                    if(e.target.value.length){
                    setCustomer({...customer, Address: e.target.value})
                  }else return
                }}
                  /> 
                  <EditableControls />
                </Editable>
              </Box>
              <Box>
                <Text pt='1' fontSize='sm' > City </Text>
                <Editable
                  defaultValue= {customer.City ? customer.City : "-"}
                  fontSize='sm'
                  fontWeight={'bold'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  justifyContent={'space-between'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    w={'10vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{
                    if(e.target.value.length){
                    setCustomer({...customer, City: e.target.value})
                  }else return
                }}
                  /> 
                  <EditableControls />
                </Editable>
              </Box>
              <Box>
                <Text pt='1' fontSize='sm' > ZipCode </Text>
                <Editable
                  defaultValue= {customer.ZipCode ? customer.ZipCode : "-"}
                  fontSize='sm'
                  fontWeight={'bold'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  justifyContent={'space-between'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    w={'10vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{
                    if(e.target.value.length){
                    setCustomer({...customer, ZipCode: e.target.value})
                  }else return
                }}
                  /> 
                  <EditableControls />
                </Editable>
              </Box>
              <Box>
                <Text pt='1' fontSize='sm' > State </Text>
                <Editable
                  defaultValue= {customer.State ? customer.State : "-"}
                  fontSize='sm'
                  fontWeight={'bold'}
                  isPreviewFocusable={false}
                  display={'flex'}
                  flexDir={'row'}
                  pt='1'
                  pl='2' 
                  justifyContent={'space-between'}
                >
                  <EditablePreview />
                  <Input as={EditableInput}
                    w={'10vw'}
                    minH={'4vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    type={"text"}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                   }} 
                   onChange={(e) =>{
                    if(e.target.value.length){
                    setCustomer({...customer, State: e.target.value})
                  }else return
                }}
                  /> 
                  <EditableControls />
                </Editable>
              </Box>
              <Box></Box>
            </Stack>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter mb={'2vh'} mt={'4vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'2vw'} mr={'2vw'}>
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
          disabled={disable} 
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

