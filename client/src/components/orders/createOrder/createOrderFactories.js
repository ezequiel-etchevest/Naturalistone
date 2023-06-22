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
  import {BiSearch} from 'react-icons/bi'
  import '../../../assets/styleSheet.css'
  import { useDispatch, useSelector } from "react-redux";
import CreateOrderFactoryList from "./createOrderFactoriesList";
import { getFactories } from "../../../redux/actions-factories";
import { AddFactoryModal } from "./addNewFactoryForm";

  
  const CreateOrderFactories = ({ setFormData, formData, setDisable, progress, setProgress, factories}) =>{
  
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')

  
  const handleInput = (e) =>  {
    if(e.target.value.length) {
      setInputValue(e.target.value)
      dispatch(getFactories(e.target.value))
    } else {
      setInputValue('')
      dispatch(getFactories(''))
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
        <Text ml={'2vw'} fontSize={'lg'} w={'16vw'} color={'white'} alignSelf={'flex-start'}>Select factory</Text>
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
          <AddFactoryModal progress={progress} setProgress={setProgress}/>
          </Box>
        </HStack>
        { 
        factories ?
          Array.isArray(factories) ?
            <CreateOrderFactoryList 
              factories={factories} 
              setFormData={setFormData}
              formData={formData}
              setDisable={setDisable}
              />
            :
            <Text maxH={'50vh'} minH={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>No factories match this filters</Text>
          :
          <Center maxH={'50vh'} minH={'50vh'}>
            <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
          </Center>
        }
    </>
    )
  }
  
  export default CreateOrderFactories