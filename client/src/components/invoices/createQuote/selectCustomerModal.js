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
    Progress,
    Center,
    Spinner 
    } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SelectCustomerModalList from './selectCustomerModalList'
import { CreateCustomer } from "./createCustomerModal";
import { getCustomers } from "../../../redux/actions-customers";
import {BiSearch} from 'react-icons/bi'
import '../../../assets/styleSheet.css'
import { CreateCustomerModal } from "../../customers/createCustomer/createCustomerModal";

const SelectCustomerModal = ({userId, isOpen1, onClose1, customers}) => {
 
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()

  const dispatch = useDispatch()
  const id = userId
  const [inputValue, setInputValue] = useState('')
  const [customer, setCustomer] = useState('')
console.log(customers)

  // useEffect(() => {
  //   // dispatch(getCustomers('', ''))
  // }, [customers]);

//limpiar estado customers de redux, cuando se cierra el modal.
// error, al updatear se queda el spinner. Hay un error con el estado de redux customers.

  const handleInput = (e) =>  {
    if(e.target.value.length) {
      setInputValue(e.target.value)
      dispatch(getCustomers(e.target.value, e.target.value))
    } else {
      setInputValue('')
      dispatch(getCustomers('', ''))
    }
  }

  const handleClose = () => {
    onClose1()
    setInputValue('')
    setCustomer('')
  }
  console.log({customers})

  return(
<>
  <Modal 
    isOpen={isOpen1} 
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
      <Progress value={20} 
        colorScheme={"orange"} 
        mb={'2vh'} 
        background={'web.border'} 
        size={'sm'} 
        borderTopRightRadius={'md'}
        borderTopLeftRadius={'md'}
        />
      <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'}>
      <HStack
        display={'flex'}
        justifyContent={'space-between'}
        h={'6vh'}
        mr={'1.2vw'}
        mt={'2vh'}
        mb={'2vh'}
        >
        <Text ml={'2vw'} fontSize={'lg'} w={'16vw'} color={'white'} alignSelf={'flex-start'}>Select customer</Text>
        <Box display={'flex'} flexDir={'row'} h={'6vh'} w={'18vw'} justifyContent={'space-around'}>
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
              aria-label="Search database"
              bgColor={'web.sideBar'}
              ml={'-0.5vw'}
              icon={<BiSearch />}
              size={'lg'}
              _hover={{
                color: 'orange.500',
              }}
              boxSize={'auto'}
              mt={'1.5vh'}
              _active={{ color: 'gray.800'}}
            />
          </Box>
          <Divider orientation={'vertical'} h={'6vh'} />
          {/* <CreateCustomer customer={customer} setCustomer={setCustomer} onOpen2={onOpen2}/> */}
          <CreateCustomerModal customer={customer} setCustomer={setCustomer} onOpen2={onOpen2}/>
          </Box>
        </HStack>
        { customers.length ?
          Array.isArray(customers) ?
            <SelectCustomerModalList 
              customers={customers} 
              customer={customer} 
              setCustomer={setCustomer} 
              isOpen2={isOpen2}
              onOpen2={onOpen2} 
              onClose2={onClose2}
              onClose1={onClose1}
              setInputValue={setInputValue}
              />
            :
            <Text maxH={'50vh'} minH={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>No customers match this filters</Text>
          :
          <Center maxH={'50vh'} minH={'50vh'}>
            <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
          </Center>
        }
      </ModalBody>
      <ModalFooter mb={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'2vw'} mr={'2vw'}>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          visibility={'hidden'}
          >
         Previous
        </Button>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          visibility={'hidden'} 
          >
         Next
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
</>
)}

export default SelectCustomerModal