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
    } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch } from "react-redux";
import SelectCustomerModalList from './selectCustomerModalList'
import { CreateCustomerModal } from "./createCustomerModal";
import { getCustomers } from "../../../redux/actions-customers";
import {BiSearch} from 'react-icons/bi'
import {HiUserAdd} from 'react-icons/hi'
import '../../../assets/styleSheet.css'

const SelectCustomerModal = ({userId, isOpen, onClose, customers}) => {
 
  const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure()

  const dispatch = useDispatch()
  const id = userId
  const [inputValue, setInputValue] = useState('')
  const [customer, setCustomer] = useState('')
  

  const handleInput = (e) =>  {
    if(e.target.value.length) {
      setInputValue(e.target.value)
      dispatch(getCustomers(e.target.value, e.target.value))
      
    } else {
      setInputValue('')
      dispatch(getCustomers('', ''))
    }
  }
//tengo que limpiar de alguna manera el estado de inputvalue, o poner un useeffect para uqe se actualize el componente.

  return(

<>
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
              placeholder={'Customer name'}
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              value={inputValue}
              onChange={(e)=> handleInput(e)}
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
          <CreateCustomerModal customer={customer} setCustomer={setCustomer} onSecondModalOpen={onSecondModalOpen}/>
          </Tooltip>
        </HStack>
        <SelectCustomerModalList customers={customers} customer={customer} setCustomer={setCustomer} isSecondModalOpen={isSecondModalOpen}onSecondModalOpen={onSecondModalOpen} onSecondModalClose={onSecondModalClose} />
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
          visibility={'hidden'} 
        //   onClick={()=>handleSubmit()}
        //   disabled={disabledConfirm}
          >
         Next
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
</>
)}

export default SelectCustomerModal