import {	Box, Icon, Flex, Avatar, HStack, Text   } from '@chakra-ui/react';
import { FaFileInvoiceDollar, FaHome, FaBoxOpen, FaTasks } from 'react-icons/fa';
import { HiUsers} from 'react-icons/hi'
import { IoMdBoat } from 'react-icons/io'
import { CgLogOut } from 'react-icons/cg'
import { BiError } from 'react-icons/bi'
import { GiCargoShip } from 'react-icons/gi'
import naturalipic from '../assets/naturalistonefav.png'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/actions-employees';


const LinkItems = [
  { name: 'Home', icon: FaHome },
  { name: 'Quotes', icon: FaFileInvoiceDollar },
  { name: 'Inventory', icon: FaBoxOpen },
  { name: 'Invoice-errors', icon: BiError },
  { name: 'Orders', icon: IoMdBoat },
  { name: 'Customers', icon: HiUsers },
  { name: 'Task-Board', icon: FaTasks },
  { name: 'Freights', icon: GiCargoShip },
  { name: 'Log Out', icon: CgLogOut },
  ];


const SideBar = ({user, focus, setFocus}) => {
	return (
	  <Box
      userSelect={'none'}
      top={'0vh'}
	    pos={'fixed'}
	    bg={'web.sideBar'}
      w={'16vw'}
      h={'100vh'}
      pl={'1vw'}
      borderRightWidth={'0.2vh'}
      borderColor={'web.border'}
	    > 
    <Box w={'13vw'} display={'flex'} alignItems={'center'} justifyContent={'space-evenly'} mt={'10vh'} mb={'3vh'}>
      <Avatar
        boxSize={'2vw'}
        src={naturalipic}
        />
      <Text
      color={'web.text'} 
      fontSize={'1.1vw'}
      pl={'1vw'}> 
        {user[0].FirstName} {user[0].LastName}
      </Text>
    </Box>
    <Box pr={'2vw'} pt={'9vh'}>
      
      {/* In here we need to add other SellerIDs whom will access to Orders View */}
      {
      user[0].Secction7Flag !== 1  
      ? LinkItems
      .filter(l => l.name !== 'Orders' && l.name !== 'Freights')
      .map((link) => (
        <NavItem
          focus={focus}
          setFocus={setFocus}
          textDecoration={'none'}
          link={link}
          key={link.name}
          icon={link.icon}
          mt={'2vh'}
        >
          {link.name === 'Invoice-errors' ? 'Invoice Errors' : link.name}
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
          mt={'2vh'}
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
        fontSize={'1.05vw'}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        onClick={link.name === 'Log Out' ? ()=> {handleLogOut()} : ()=>{handleClick()}}
        >
        <Flex
          align="center"
          p={'1vh'}
          mr={'1vh'}
          ml={'2vh'}
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
              fontSize={'1.6vw'}
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