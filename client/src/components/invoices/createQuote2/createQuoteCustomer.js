import { 
  Text,
  IconButton,
  Input,
  Divider,
  HStack,
  Box,
  Center,
  Spinner 
  } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {BiSearch} from 'react-icons/bi'
import '../../../assets/styleSheet.css'
import { CreateCustomerModal } from "../../customers/createCustomer/createCustomerModal";
import { getCustomers } from "../../../redux/actions-customers";
import CreateQuoteCustomerList from "./createQuoteCustomerList";

const CreateQuoteCustomer = ({customers, setFormData, formData, setDisable}) =>{


const dispatch = useDispatch()
const [inputValue, setInputValue] = useState('')
const [customer, setCustomer] = useState('')

    // useEffect(()=>{
      
    // },[customers])

// console.log(customers)
const handleInput = (e) =>  {
  if(e.target.value.length) {
    setInputValue(e.target.value)
    dispatch(getCustomers(e.target.value, e.target.value))
  } else {
    setInputValue('')
    dispatch(getCustomers('', ''))
  }
}

return(
  <>
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
        <CreateCustomerModal/>
        </Box>
      </HStack>
      { 
      customers ?
        Array.isArray(customers) ?
          <CreateQuoteCustomerList 
            customers={customers} 
            setInputValue={setInputValue}
            setFormData={setFormData}
            formData={formData}
            setDisable={setDisable}
            />
          :
          <Text maxH={'50vh'} minH={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>No customers match this filters</Text>
        :
        <Center maxH={'50vh'} minH={'50vh'}>
          <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
        </Center>
      }
  </>
  )
}

export default CreateQuoteCustomer