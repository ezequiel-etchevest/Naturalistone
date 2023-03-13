import { Box, HStack, Text, Button, Input, IconButton } from "@chakra-ui/react";
import { BsCalendar4Week } from 'react-icons/bs';
import { SearchIcon } from '@chakra-ui/icons';
import { getInvoicesLastWeek, getInvoicesBySeller, getInvoicesLastMonth } from "../redux/actions-invoices";
import { useDispatch } from 'react-redux'

const Filters = ({userId}) => {

  const dispatch = useDispatch()

  const handleClickLastWeek = () => {
    dispatch(getInvoicesLastWeek(userId))
  }
  const handleClickAllInvoices = () => {
    dispatch(getInvoicesBySeller(userId))
  }
  const handleClickLastMonth = () => {
    dispatch(getInvoicesLastMonth(userId))
  }

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
            onClick={()=> handleClickAllInvoices()} 
            >All Invoices</Text>
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
            pr={'1.5vh'} 
            fontFamily={'body'} 
            fontWeight={'hairline'}
            onClick={()=> handleClickLastWeek()} 
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
            onClick={()=> handleClickLastMonth()}  
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