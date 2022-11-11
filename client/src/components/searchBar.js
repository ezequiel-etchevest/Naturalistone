import { useEffect, useState } from 'react';
import { Input, Box, IconButton, getDividerStyles } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = () => {

    return (
        <>
          <Box
            w={'18vw'}
            height={'8vh'}
            display="flex"
            flexDir="row"
            alignItems="center"
            justifyContent={'center'}
            border={'2px solid black'}
          >                                                                 
            <Input
              variant="unstyled"
              placeholder={'Search'}
              size="lg"
              borderRadius={'none'}
              borderBottomWidth="2px"
            />
            <IconButton
              borderRadius={2}
              aria-label="Search database"
              bgColor={'whitesmoke'}
              ml={1}
              w={10}
              h="80%"
              icon={<SearchIcon />}
              _hover={{
                color: 'orange',
              }}
              _active={{ color: 'gray.800'}}
            />
          </Box>
        </>
      );
    }

export default SearchBar;