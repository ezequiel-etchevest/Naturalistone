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
    HStack,
    Input,
    IconButton,
    Tooltip,
    Divider,
    } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import '../../assets/styleSheet.css'
import { TbPlaylistAdd } from 'react-icons/tb'
import {BiSearch} from 'react-icons/bi'
import SelectProjectModalList from "./selectProjectModalList";


const SelectProjectModal = ({customer, isThirthModalOpen, onThirthModalClose, isOpen, onClose}) => {
 
  const { isOpen: isQuotesModalOpen, onOpen: onQuotesModalOpen, onClose: onQuotesModalClose } = useDisclosure()

  const projects = useSelector(state => state.projects_by_customer_id)

  const handlePrevious = () => {
    onThirthModalClose()
  }
  
  // const handleNext = () => {
  //   onQuotesModalOpen()
  // }

  return(

<>
  <Modal 
    isOpen={isThirthModalOpen} 
    onClose={onThirthModalClose}
    size={'3xl'}
    >
    <ModalOverlay />
    <ModalContent 
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      >
      <ModalHeader></ModalHeader>
      <ModalCloseButton
        color={'web.text2'}
        _hover={{
          color: 'web.text'
        }}
        onClick={onClose} />
      <Box color={'white'}>
      <Text ml={'3vw'} fontSize={'lg'}>Select project</Text>
      <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'}>
      <HStack
        display={'flex'}
        justifyContent={'flex-end'}
        h={'6vh'}
        mb={'2vh'}
        mr={'1.2vw'}
        spacing={'0.5vw'}
        >
          <Box>
            <Input
              mb={'0.5vh'}
              w={'10vw'}
              minH={'4.5vh'}
              variant="unstyled"
              placeholder={'Project name'}
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              // value={inputValue}
              // onChange={(e)=> handleInput(e)}
              />
            <IconButton
              color={'web.text2'}
              borderRadius={2}
              aria-label="Search database"
              bgColor={'web.sideBar'}
              ml={'-0.5vw'}
              icon={<BiSearch />}
              size={'lg'}
              _hover={{
                color: 'orange.500',
              }}
              _active={{ color: 'gray.800'}}
            />
          </Box>
          <Divider orientation={'vertical'} h={'5vh'}/>
          <Tooltip label={'Add project'} fontWeight={'hairline'}>
            <IconButton
            display={'flex'}
            alignItems={'center'}
            variant={'unstyled'} 
            color={'web.text2'}
            _hover={{
              color: 'logo.orange'
            }}
            icon={<TbPlaylistAdd/>} 
            size={'lg'}
            />
          </Tooltip>
        </HStack>
        <SelectProjectModalList customer={customer} projects={projects}/>
      </ModalBody>
      </Box>
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
          >
         Next
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
</>
)}

export default SelectProjectModal