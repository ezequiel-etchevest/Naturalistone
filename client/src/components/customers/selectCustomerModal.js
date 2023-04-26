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
    Tooltip,
    Box,
    useToast
    } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../assets/styleSheet.css'
import {FiUserPlus} from 'react-icons/fi'
import {BiSearch} from 'react-icons/bi'
import CreateCustomerModalList from './createCustomerModalList'

const SelectCustomerModal = ({userId, isOpen, onClose, customers}) => {
 
  const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure()
  // const dispatch = useDispatch()
  const id = userId
  const [inputValues, setInputValues] = useState(
    {
      inputName: '',
      inputNumber: '',
      selectSeller: '',
      timeFilter: 'All'
    })
console.log(customers)
  return(
<>
{/* Start Create delivery modal */}
  <Modal 
    isOpen={isOpen} 
     onClose={onClose}
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
      <Text ml={'3vw'} fontSize={'lg'}>Select customer</Text>
      <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'}>
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
              placeholder={'Customer name'}
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              // value={inputValues.inputName}
              //onChange={(e)=> handleChangeCustomerName(e)}
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
          <Tooltip label={'Add customer'} fontWeight={'hairline'}>
            <IconButton
            display={'flex'}
            alignItems={'center'}
            variant={'unstyled'} 
            color={'web.text2'}
            _hover={{
              color: 'logo.orange'
            }}
            icon={<FiUserPlus/>} 
            size={'lg'}
            />
          </Tooltip>
        </HStack>
        <CreateCustomerModalList customers={customers}/>
      </ModalBody>
      </Box>
      <ModalFooter mb={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'2vw'} mr={'2vw'}>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          visibility={'hidden'}
        //   onClick={()=>handleSubmit()}
        //   disabled={disabledConfirm}
          >
         Previous
        </Button>
        <Button
          colorScheme={'orange'}
          size={'sm'} 
        //   onClick={()=>handleSubmit()}
        //   disabled={disabledConfirm}
          >
         Next
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
{/* Finish Create delivery modal */}

{/* Start Render created delivery modal */}
  {/* <Modal 
        // isOpen={isSecondModalOpen} 
    // onClose={handleSecondModalClose}
    size={'4xl'}
    >
    <ModalOverlay />
    <ModalContent 
      rounded={'md'} 
      mt={'2vh'} 
      mb={'2vh'} 
      w={'64vw'} 
      bg={'web.sideBar'} 
      border={'1px solid'} 
      borderColor={'web.border'}
      >
      <ModalHeader/>
      <ModalBody color={'web.text2'} w={'100%'} h={'100%'}>
      </ModalBody>
      <ModalFooter/>
    </ModalContent>
  </Modal> */}
{/* Finish Render created delivery modal */}
</>
)}

export default SelectCustomerModal