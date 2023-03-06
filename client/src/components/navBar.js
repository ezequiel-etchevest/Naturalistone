import {
	  Box,
    Image,
    Flex,
    Spacer
  } from '@chakra-ui/react';
import logo from '../assets/NaturalistoneLogo.png'

const NavBar = () => {
	return (
    <Flex	
      //border={'2px solid red'}
      bg={'web.sideBar'}
      w={'100vw'}
      h={'8vh'}
      //zIndex={'1'}
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