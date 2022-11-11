import {
	Box,Icon,Flex,
  } from '@chakra-ui/react';
import { FaUsers, FaFileInvoiceDollar, FaHome } from 'react-icons/fa'
import { CgLogOut } from 'react-icons/cg'
import SearchBar from './searchBar';

const LinkItems = [
  { name: 'Home', icon: FaHome },
  { name: 'Employees', icon: FaUsers },
  { name: 'Invoices', icon: FaFileInvoiceDollar },
  { name: 'Log Out', icon: CgLogOut },
];
  
 const SideBar = () => {

	return (

	<Box
	pos={'fixed'}
	bg={'whitesmoke'}
  w='20vw'
  h='100vh'
  zIndex={'10'}
  pl={5}
	>
  <SearchBar/>
  <Box mt={14} pr={12} pt={'18%'}>
          {LinkItems.map((link) => (
            <NavItem
              textDecoration={'none'}
              link={link}
              key={link.name}
              icon={link.icon}
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