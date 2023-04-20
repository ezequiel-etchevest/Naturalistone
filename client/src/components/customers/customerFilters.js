import { 
  Box, 
  HStack, 
  Input, 
  IconButton,
  Divider,
  Tooltip,
  } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux'
import { useState } from "react";
import '../../assets/styleSheet.css';
import {AiOutlineClear} from 'react-icons/ai';
import { getCustomers } from "../../redux/actions-customers";

const CustomerFilters = () => {

  const dispatch = useDispatch()
  const [inputValues, setInputValues] = useState(
    {
      inputName: '',
      inputCompany: ''
    })

  const handleChangeCustomerName = (e) => {
    if(e.target.value.length){
      setInputValues({...inputValues, inputName: e.target.value})
      dispatch(getCustomers(e.target.value, inputValues.inputCompany))
    } else {
      setInputValues({...inputValues, inputName: ''})
      dispatch(getCustomers(e.target.value, inputValues.inputCompanyt))
    }
  }

  const handleChangeCompany = (e) => {
    if(e.target.value.length){
      setInputValues({...inputValues, inputCompany: e.target.value})
      dispatch(getCustomers(inputValues.inputName, e.target.value))
    } else {
      setInputValues({...inputValues, inputCompany: ''})
      dispatch(getCustomers(inputValues.inputName, e.target.value))
    }
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
          w={'15vw'}
          h={'10vh'}
          ml={'1vw'}
          >
            <Input
            mb={'0.5vh'}
            w={'80%'}
            minH={'4.5vh'}
            variant="unstyled"
            placeholder={'Name'}
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            value={inputValues.inputName}
            onChange={(e)=> handleChangeCustomerName(e)}
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
          <Box
          display={'flex'}
          alignItems={'center'} 
          w={'15vw'}
          h={'10vh'}
          ml={'1vw'}
          >
            <Input
            mb={'0.5vh'}
            w={'80%'}
            minH={'4.5vh'}
            variant="unstyled"
            placeholder={'Company'}
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            value={inputValues.inputCompany}
            onChange={(e)=> handleChangeCompany(e)}
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
          //onClick={(e) => handleClear(e)}
          >
          </IconButton>
        </Tooltip>     
      </HStack>
    </Box>
    )
}

export default CustomerFilters