import {
	Box,Icon,Flex,
  } from '@chakra-ui/react';

import SearchBar from './searchBar';

const LinkItems = [
  { name: 'Home'},
  { name: 'Employees'},
  { name: 'Invoices'},
  { name: 'Log Out3'},
];
  
 const SideBar = () => {

	return (

	<Box
	pos={'fixed'}
	bg={'whitesmoke'}
  w='20vw'
  h='100vh'
  zIndex={'10'}
	>
  <SearchBar/>
  <Box mt={14}>
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
            bg: '#8ea26f',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
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