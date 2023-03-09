import {	Box, Icon, Flex, Avatar, HStack, Text   } from '@chakra-ui/react';
import { FaFileInvoiceDollar, FaHome, FaBoxOpen } from 'react-icons/fa'
import { IoMdBoat } from 'react-icons/io'
import { CgLogOut } from 'react-icons/cg'
import { BiError } from 'react-icons/bi'
import mitu from '../assets/mitutu.jpg';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/actions-employees';
import { useState } from 'react';


const LinkItems = [
  { name: 'Home', icon: FaHome },
  { name: 'Quotes', icon: FaFileInvoiceDollar },
  { name: 'Inventory', icon: FaBoxOpen },
  { name: 'Invoice Errors', icon: BiError },
  { name: 'Orders', icon: IoMdBoat },
  { name: 'Log Out', icon: CgLogOut },
  ];


const SideBar = ({user, focus, setFocus}) => {
	return (

	  <Box
      userSelect={'none'}
      top={'0vh'}
	    pos={'fixed'}
	    bg={'web.sideBar'}
      w={'20vw'}
      h={'100vh'}
      pl={'2vw'}
      borderRight={'1px solid'}
      borderColor={'web.border'}
	    > 
    <HStack mt={'10vh'} mb={'4vh'}>
      <Avatar
        size={'sm'}
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
    <Box  pr={'2vw'} pt={'9vh'}>
      
      {/* In here we need to add other SellerIDs whom will access to Orders View */}
      {
      user[0].Secction7Flag !== 1  
      ? LinkItems
      .filter(l => l.name !== 'Orders')
      .map((link) => (
        <NavItem
          focus={focus}
          setFocus={setFocus}
          textDecoration={'none'}
          link={link}
          key={link.name}
          icon={link.icon}
          mt={'4vh'}
        >
          {link.name}
        </NavItem>
        )) : 
        LinkItems.map((link) => (
        <NavItem
          focus={focus}
          setFocus={setFocus}
          textDecoration={'none'}
          link={link}
          key={link.name}
          icon={link.icon}
          mt={'4vh'}
          >
            {link.name}
        </NavItem>
        ))
      }
      </Box>
    </Box>
	  );
  }
  
  const NavItem = ({ focus, setFocus, icon, link, children, ...rest }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogOut = () => {
      dispatch(logOut())
      navigate('/login')
    }
    const handleClick = (e) => {
      setFocus(`${link.name}`)
      navigate(`/${link.name}`)
    }
    return (
      <Box
        color={focus === link.name ? '#E47424' : 'white'}
        bg={'none'}
        fontSize={'2.3vh'}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        onClick={link.name === 'Log Out' ? ()=> {handleLogOut()} : ()=>{handleClick()}}
        >
        <Flex
          align="center"
          p={'1vh'}
          mx={'2vh'}
          borderRadius={"md"}
          role={"group"}
          cursor={"pointer"}
          _hover={{
            border: '#E47424',
            color: '#E47424',
          }}
          {...rest}
          >
          {icon && (
            <Icon
              mr={'2vw'}
              fontSize={'3.5vh'}
              _groupHover={{
                color: '#E47424',
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