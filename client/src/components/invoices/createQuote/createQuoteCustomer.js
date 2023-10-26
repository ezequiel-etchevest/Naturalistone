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
import { useState } from "react";
import { useDispatch } from "react-redux";
import {BiSearch} from 'react-icons/bi'
import '../../../assets/styleSheet.css'
import { CreateCustomerModal } from "../../customers/createCustomer/createCustomerModal";
import CreateQuoteCustomerList from "./createQuoteCustomerList";
import { filterCustomer } from "../../../utils/customerFilters";

const CreateQuoteCustomer = ({
  customers,
  setFormData,
  formData,
  setDisable,
  update,
  invoice,
  user,
  customersFilter,
  setCustomersFilter
}) =>{


const dispatch = useDispatch()
const [inputValue, setInputValue] = useState('')

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
    <HStack
      display={'flex'}
      justifyContent={'space-between'}
      h={'6vh'}
      mr={'1.2vw'}
      mt={'2vh'}
      mb={'2vh'}
      >
      
      {
        update === 'Update' ?
        <Box ml={'2vw'} mt={'2vh'} mb={'2vh'} display={'flex'}flexDir={'row'} w={'40vw'}>
          <Box>
              <Text fontSize={'md'} color={'white'} alignSelf={'flex-start'}>Previous customer </Text>
            <Box mt={'1vh'} display={'flex'} flexDir={'row'} w={'18vw'}>
              <Text fontSize={'sm'}>{invoice[0].CustomerID } </Text>
              <Text ml={'2vw'} fontSize={'sm'}> {invoice[0].Contact_Name != '-' && invoice[0].Contact_Name != null ? invoice[0].Contact_Name : ''}</Text>
            </Box>        
          </Box>
          <Box>
              <Text fontSize={'md'} color={'white'} alignSelf={'flex-start'}>New customer </Text>
            <Box mt={'1vh'} display={'flex'} flexDir={'row'}>
              <Text fontSize={'sm'}>
                {
                  formData.customer.CustomerID == invoice[0].CustomerID ? '' : formData.customer.CustomerID 
                } 
              </Text>
              <Text ml={'2vw'} fontSize={'sm'}> 
                { formData.customer.Contact_Name == invoice[0].Contact_Name ? ''
                  :
                  formData.customer.Contact_Name != '-' && formData.customer.Contact_Name != null ? formData.customer.Contact_Name : ''
                }
              </Text>
            </Box>        
          </Box>
        </Box>
        :
        <Text ml={'2vw'} fontSize={'lg'} w={'16vw'} color={'white'} alignSelf={'flex-start'}>Select customer</Text>
        
      }
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
      customersFilter ?
        Array.isArray(customersFilter) ?
          <CreateQuoteCustomerList 
            customers={customers} 
            setInputValue={setInputValue}
            setFormData={setFormData}
            formData={formData}
            setDisable={setDisable}
            user={user}
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

export default CreateQuoteCustomer