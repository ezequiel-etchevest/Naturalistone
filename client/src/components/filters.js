import { Box, HStack, Icon, Text, Button, Input, IconButton } from "@chakra-ui/react";
import { BsCalendar4Week } from 'react-icons/bs';
import { SearchIcon } from '@chakra-ui/icons';



const Filters = () => {
    
  // const handleClickLastWeek = () => {

  // }

    return (
        <>
        <HStack m={'5vh'} spacing={'2vw'}>
        <Button
        variant={'unstyled'} 
        display={'flex'} 
        w={'17vw'}
        h={'10vh'}
        borderRadius={'sm'} 
        placeContent={'center'}
        alignItems={'center'}
        color={'gray.700'}
        _hover={{
            color: '#E47424'
            }}
        _active={{
          color: '#E47424'
        }}>
          <Text 
            pr={'1.5vh'} 
            fontFamily={'body'} 
            fontWeight={'hairline'} 
            >Last Week Invoices</Text>
            <BsCalendar4Week/>
        </Button>
        <Button
         variant={'unstyled'} 
         display={'flex'} 
         w={'17vw'}
         h={'10vh'}
         borderRadius={'sm'} 
         placeContent={'center'}
         alignItems={'center'}
         color={'gray.700'}
         _hover={{
             color: '#E47424'
             }}
         _active={{
           color: '#E47424'
         }}>
            <Text 
            fontFamily={'body'} 
            fontWeight={'hairline'}  
            pr={'1.5vh'}>Last Moth Invoices</Text>
            <BsCalendar4Week/>
        </Button>
        <Box
        display={'flex'}
        placeContent={'center'}
        alignItems={'center'} 
        w={'17vw'}
        h={'10vh'}>
          <Input
              w={'70%'}
              variant="unstyled"
              placeholder={'Company Name'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
              size="sm"
              borderBottomWidth="2px"
            />
            <IconButton
              borderRadius={2}
              aria-label="Search database"
              bgColor={'white'}
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
        placeContent={'center'}
        alignItems={'center'} 
        w={'17vw'}
        h={'10vh'}>
          <Input
              w={'70%'}
              variant="unstyled"
              placeholder={'Invoice number'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
              size="sm"
              borderBottomWidth="2px"
            />
            <IconButton
              borderRadius={2}
              aria-label="Search database"
              bgColor={'white'}
              ml={1}
              icon={<SearchIcon />}
              _hover={{
                color: 'orange',
              }}
              _active={{ color: 'gray.800'}}
            />
        </Box>
        </HStack>
        </>
    )
}

export default Filters