import {
	  Box,
    Image,
    Flex,
  } from '@chakra-ui/react';
import logo from '../assets/NaturalistoneLogo.png'

const NavBar = () => {
	return (
    <Flex	
      bg={'web.sideBar'}
      w={'100vw'}
      h={'8vh'}
      justifyContent={'flex-end'}
      pr={'2vw'}>
        <Box
          h={'8vh'}
          w={'16vw'}
          display={'flex'}
          >
          <Image src={logo}  objectFit={'contain'}/>
        </Box>

    </Flex>
	);
}

  export default NavBar;