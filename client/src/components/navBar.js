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
      pos={'fixed'}
      bg={'white'}
      w='100vw'
      h='8vh'
      zIndex={'1'}>

        <Spacer/>
        <Box
          h={'8vh'}
          w={'16vw'}
          display={'flex'}>
            <Image src={logo}  objectFit={'contain'}/>
        </Box>

    </Flex>
	);
}

  export default NavBar;