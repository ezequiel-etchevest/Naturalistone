import {	Box, Icon, Flex, Avatar, HStack, Text   } from '@chakra-ui/react';
import { FaFileInvoiceDollar, FaHome, FaBoxOpen } from 'react-icons/fa'
import { CgLogOut } from 'react-icons/cg'
import mitu from '../assets/mitutu.jpg';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/actions-employees';


const LinkItems = [
  { name: 'Home', icon: FaHome },
  { name: 'Quotes', icon: FaFileInvoiceDollar },
  { name: 'Products', icon: FaBoxOpen },
  { name: 'Log Out', icon: CgLogOut },
  ];


const SideBar = ({user, site, setSite}) => {

	return (

	  <Box
      top={'0vh'}
	    pos={'fixed'}
	    bg={'web.sideBar'}
      w={'20vw'}
      h={'100vh'}
      zIndex={'10'}
      pl={'2vw'}
      borderRight={'1px solid'}
      borderColor={'web.border'}
	    > 
    <HStack mt={'4vh'} mb={'4vh'}>
      <Avatar
        size={'md'}
        src={mitu}
        />
      <Text
      color={'web.text'} 
      fontWeight={'normal'} 
      letterSpacing={'wide'} 
      fontSize={'2.9vh'} 
      pl={'1.5vh'}> 
        {user[0].FirstName} {user[0].LastName}
      </Text>
    </HStack>
    <Box  pr={12} pt={'9vh'}>
      {LinkItems.map((link) => (
        <NavItem
          setSite={setSite}
          site={site}
          textDecoration={'none'}
          link={link}
          key={link.name}
          icon={link.icon}
          mt={'4vh'}
        >
          {link.name}
        </NavItem>
          ))}
      </Box>
    </Box>
	  );
  }
  
  const NavItem = ({ site, setSite, icon, link, children, ...rest }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogOut = () => {
      dispatch(logOut())
      setSite('Home')
      navigate('/login')
    }
    
    const handleClick = () => {
        navigate('/home')
        setSite(link.name)
    }

    return (
      <Box
        color={'web.text2'}
        bg={'none'}
        fontSize={'lg'}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        onClick={link.name === 'Log Out' ? ()=> {handleLogOut()} : ()=>handleClick()}
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
              mr={'2vw'}
              fontSize={'3.5vh'}
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