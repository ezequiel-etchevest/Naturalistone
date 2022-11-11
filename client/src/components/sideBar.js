import {
	Box, Icon, Flex, Avatar, HStack, VStack, Text
  } from '@chakra-ui/react';
import { FaUsers, FaFileInvoiceDollar, FaHome } from 'react-icons/fa'
import { CgLogOut } from 'react-icons/cg'
import SearchBar from './searchBar';
import mitu from '../assets/mitutu.jpg'

const LinkItems = [
  { name: 'Home', icon: FaHome },
  { name: 'Employees', icon: FaUsers },
  { name: 'Invoices', icon: FaFileInvoiceDollar },
  { name: 'Log Out', icon: CgLogOut },
];
  
 const SideBar = () => {

	return (

	<Box
  top={'0vh'}
	pos={'fixed'}
	bg={'whitesmoke'}
  w={'20vw'}
  h={'100vh'}
  zIndex={'10'}
  pl={5}
	>
 
  <HStack mt={'4vh'} mb={'4vh'}>
    <Avatar
      size={'md'}
      src={mitu}
    />
    <Text fontSize="s" pl={'1.5vh'}>Damian Etchevest </Text>
  </HStack>
  <SearchBar/>
  <Box  pr={12} pt={'6vh'}>
          {LinkItems.map((link) => (
            <NavItem
              textDecoration={'none'}
              link={link}
              key={link.name}
              icon={link.icon}
              mt={5}
            >
              {link.name}
            </NavItem>
          ))}
  </Box>
  </Box>
	);
  }
  
  const NavItem = ({ icon, link, children, ...rest }) => {
    return (
      <Box
        bg={'none'}
        fontWeight={'normal'}
        fontSize={'lg'}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        p={'1vh'}
      >
        <Flex
          align="center"
          p="3"
          mx="2"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#E2966A',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="20"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    );
  };

  export default SideBar;