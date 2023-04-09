import { 
    Box, 
    HStack, 
    Text, 
    Input, 
    IconButton,
    Select,
    Divider,
    Tooltip,
    } from "@chakra-ui/react";
  import { SearchIcon } from '@chakra-ui/icons';
  import { useDispatch } from 'react-redux'
  import { useState } from "react";
  import '../../assets/styleSheet.css';
  import {AiOutlineClear} from 'react-icons/ai';
  
  const StatsFilters = () => {
  
    return (
      <Box>
        <HStack
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
          </Box>
        {/*Selects */}
          <Box 
          w={'28vw'} 
          display={'flex'}
          justifyContent={'flex-end'}
          > 
            <Select
            w={'15vw'}
            variant='outline' 
            h={'4.4vh'}
            fontSize={'xs'}            
            bg={'web.sideBar'}
            color={'web.text2'}
            borderColor={'web.border'}
            cursor={'pointer'}
            _focus={{
              borderColor: 'logo.orange',
              boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
            }}>
              <option value='' className="options">All seller</option>
                {/* {
                  validateSeller() === true ? (
                    matchedSellers?.map((e, i) => {
                        return(
                          <option key={i} className={'options'} value={e.sellerID}>{e.name}</option>
                    )})
                        
                    ): ( null)
                } */}
              </Select>
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
              >
              </IconButton>
            </Tooltip>   
        </HStack>
      </Box>
      )
  }
  
  export default StatsFilters