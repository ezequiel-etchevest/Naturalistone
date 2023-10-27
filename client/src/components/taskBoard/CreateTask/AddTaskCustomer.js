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
  import { AddTaskCustomerList } from "./AddTaskCustomerList";
import { filterCustomer } from "../../../utils/customerFilters";

  const AddTaskCustomer = ({
    customers,
    setFormData,
    formData,
    setDisable,
    inputValue, 
    setInputValue,
    customersFilter,
    setCustomersFilter
  }) =>{
  
  const dispatch = useDispatch()
  const [customer, setCustomer] = useState('')
  
  const handleInput = (e) =>  {
    if(e.target.value.length) {
      setInputValue(e.target.value)
      setCustomersFilter(filterCustomer(customers, e.target.value))
    } else {
      setInputValue('')
      setCustomersFilter(customers)
    }
  }
  
  return(
    <>
      <Text fontWeight={'semibold'}  ml={'1vw'} fontSize={'lg'}  color={'web.text2'} alignSelf={'flex-start'}>If you want to link a customer, please select one from the list:</Text>
      <HStack
        display={'flex'}
        justifyContent={'flex-end'}
        h={'6vh'}
        mr={'1.2vw'}
        mt={'2vh'}
        mb={'2vh'}
        >
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
          <CreateCustomerModal customer={customer} setCustomer={setCustomer}/>
          </Box>
      </HStack>
        { 
        customersFilter.length ?
          Array.isArray(customers) ?
            <AddTaskCustomerList 
              customers={customers} 
              setInputValue={setInputValue}
              setFormData={setFormData}
              formData={formData}
              setDisable={setDisable}
              customersFilter={customersFilter}
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
  
  export default AddTaskCustomer