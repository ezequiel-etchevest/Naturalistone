import {
	Box, Icon, Flex, Avatar, HStack, Text
  } from '@chakra-ui/react';
import { FaFileInvoiceDollar, FaHome } from 'react-icons/fa'
import { CgLogOut } from 'react-icons/cg'
import { BiStats } from 'react-icons/bi'
import mitu from '../assets/mitutu.jpg';
import { useNavigate } from 'react-router';

const LinkItems = [
  { name: 'Home', icon: FaHome },
  // { name: 'Employees', icon: FaUsers },
  { name: 'Invoices', icon: FaFileInvoiceDollar },
  { name: 'Stats', icon: BiStats },
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
    const navigate = useNavigate()
    return (
      <Box
        bg={'none'}
        fontWeight={'normal'}
        fontSize={'md'}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        onClick={()=>navigate(`/${link.name}`)}
      >
        <Flex
          align="center"
          p="3"
          mx="2"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#E47424',
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