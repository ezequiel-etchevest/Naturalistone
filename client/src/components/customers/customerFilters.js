import { 
  Box, 
  HStack, 
  Input, 
  IconButton,
  Divider,
  Tooltip,
  } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from "react";
import '../../assets/styleSheet.css';
import {AiOutlineClear} from 'react-icons/ai';
import { CreateCustomerModal } from './createCustomer/createCustomerModal';
import { useLocation, useNavigate } from "react-router-dom";
import { filterCustomer } from "../../utils/customerFilters";

const CustomerFilters = ({ customers, customerFilters, setCustomerFilters }) => {

  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams();
  const queryString = location.search
  const url = new URLSearchParams(queryString);
  const getParamsCustomer = url.get('customer')
  const [inputValues, setInputValues] = useState(getParamsCustomer ? getParamsCustomer : '')

  const handleInput = (e) => {
    const customer = e.target.value
    if(customer.length){
      searchParams.set('customer', customer)
      navigate(`?${searchParams.toString()}`)
      setInputValues(customer)
      setCustomerFilters(filterCustomer(customers, customer))
    } else {
      searchParams.delete('customer')
      navigate(`?${searchParams.toString()}`)
      setInputValues('')
      setCustomerFilters(filterCustomer(customers, ''))

    }
  }

  const handleClear = () => {
    searchParams.delete('customer')
    navigate(`?${searchParams.toString()}`)
    setInputValues('')
    setCustomerFilters(customers);
  }
  
  return (
    <Box>
      <HStack
      pt={'2vh'}
      ml={'2vw'}
      mr={'2vw'} 
      h={'17vh'}
      w={'80vw'}
      justifyContent={'space-between'}
      >
      {/*Inputs*/}
        <Box
        display={'flex'}
        alignItems={'center'}
        w={'48vw'}
        >         
          <Box
          display={'flex'}
          alignItems={'center'} 
          w={'20vw'}
          h={'10vh'}
          ml={'1vw'}
          >
            <Input
            mb={'0.5vh'}
            w={'80%'}
            minH={'4.5vh'}
            variant="unstyled"
            placeholder={'Search by name/company'}
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            value={inputValues}
            onChange={(e)=> handleInput(e)}
            />
            <IconButton
            color={'web.text2'}
            borderRadius={2}
            aria-label="Search database"
            bgColor={'web.bg'}
            ml={1}
            icon={<SearchIcon />}
            _hover={{
              color: 'orange',
            }}
            _active={{ color: 'gray.800'}}
            />
          </Box>
        </Box>
        {/*Selects */}
        <Box 
        w={'28vw'} 
        display={'flex'} 
        justifyContent={'flex-end'}>  
            
        </Box>
        <CreateCustomerModal/>
        <Divider orientation={'vertical'} h={'5vh'}/>
        <Tooltip placement={'bottom-start'} label={'Clear all filters'} fontWeight={'hairline'}>      
          <IconButton
          icon={ <AiOutlineClear/>}
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
          onClick={(e) => handleClear(e)}
          >
          </IconButton>
        </Tooltip>     
      </HStack>
    </Box>
    )
}

export default CustomerFilters