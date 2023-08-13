import{
	ButtonGroup,
	Button,
	IconButton,
  VStack,
  Text,
  Divider,
  Box,
  Modal
} from '@chakra-ui/react';
import {AiOutlineMail, AiOutlineInfoCircle} from 'react-icons/ai';
import { MdOpenInNew } from 'react-icons/md'
import {  TbFileInvoice } from 'react-icons/tb'
import { BiAddToQueue, BiTask, BiLinkAlt } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import { AddCommentModal } from './AddComment';
import { AddTask } from './CreateTask/AddTask';
import { ChangeTaskStatusModal } from './CreateTask/AddTaskChangeStatus';
import { LinkCustomerModal } from './LinkCustomer';
import { useNavigate } from 'react-router-dom';
import { LinkProjectModal } from './LinkProject';
import { LinkInvoiceModal } from './LinkInvoice';




export const TaskBoardToolbar = ({activeCard, user, setActiveCard, setFilters, filters}) => {

  const navigate = useNavigate()


  return(
    <VStack mt={'1vh'} mb={'3vh'} w={'13vw'} alignItems={'flex-start'} pt={'2vh'} mr={'1.5vw'}>
      <Text fontSize={'xs'} textColor={'web.text2'} w={'100%'}>Tasks</Text>
      <Divider w={'100%'} textColor={'web.border'} />
      <Box pl={'1vh'} pb={'1vh'}>
        <AddCommentModal activeCard={activeCard} user={user}/>
        <AddTask user={user} setFilters={setFilters} filters={filters}/>
        <ChangeTaskStatusModal activeCard={activeCard} setActiveCard={setActiveCard} user={user} />
      </Box>
      <Text fontSize={'xs'} textColor={'web.text2'} w={'100%'}>Customer</Text>
      <Divider w={'100%'} textColor={'web.border'}/>
      <Box pl={'1vh'}pb={'1vh'}>
        <LinkCustomerModal activeCard={activeCard} user={user} setActiveCard={setActiveCard}/>
        <LinkProjectModal activeCard={activeCard} user={user} setActiveCard={setActiveCard}/>
        
        <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
         display={'flex'}
         spacing={0}
         _hover={{
         color: 'logo.orange'
         }}
         disabled={activeCard ? activeCard.CustomerID ? false : true : true}
         onClick={ ()=>navigate(`/customers/${activeCard.CustomerID}`)}
         >
        <IconButton
         variant={'unstyled'}           
         fontSize={'xl'}
         icon={<AiOutlineInfoCircle/>}
         disabled={activeCard ? activeCard.CustomerID ? false : true : true}
         onClick={()=> navigate(`/customers/${activeCard.CustomerID}`)}
         />
         <Button
         fontSize={'md'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         onClick={()=> navigate(`/customers/${activeCard.CustomerID}`)}
         disabled={activeCard ? activeCard.CustomerID ? false : true : true}
         >Customer Details</Button>       
        </ButtonGroup>
        <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
        	display={'flex'}
        	spacing={0}
           _hover={{
           color: 'logo.orange'
         	}}>
        <IconButton
         variant={'unstyled'}           
         fontWeight={'normal'}
         fontSize={'xl'}
         disabled={true}
         icon={<AiOutlineMail/>}/>
         <Button
         fontSize={'md'}
         display={'flex'}
         alignSelf={'flex-start'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         disabled={true}
         >Contact Customer
        </Button>            
        </ButtonGroup>
      </Box>
      <Text fontSize={'xs'} textColor={'web.text2'} w={'100%'}>Invoice</Text>
      <Divider w={'100%'}  textColor={'web.border'}/>
        <LinkInvoiceModal activeCard={activeCard} user={user} setActiveCard={setActiveCard}/>
        <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
        	display={'flex'}
        	spacing={0}
           _hover={{
           color: 'logo.orange'
         	}}
          disabled={activeCard?.InvoiceID ? false : true}
          onClick={()=> navigate(`/quotes/${activeCard.InvoiceID}`)}>
        <IconButton
         variant={'unstyled'}           
         fontWeight={'normal'}
         fontSize={'xl'}
         icon={<TbFileInvoice/>}
         disabled={activeCard?.InvoiceID ? false : true}
         onClick={()=> navigate(`/quotes/${activeCard.InvoiceID}`)}/>
         <Button
         fontSize={'md'}
         display={'flex'}
         alignSelf={'flex-start'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         disabled={activeCard?.InvoiceID ? false : true}
         onClick={()=> navigate(`/quotes/${activeCard.InvoiceID}`)}
         >Invoice Details
        </Button>            
        </ButtonGroup>

     
      <Box pl={'1vh'} pb={'1vh'}>
      </Box>
      <Text fontSize={'xs'} textColor={'web.text2'} w={'100%'}>Files</Text>
      <Divider w={'100%'} textColor={'web.border'}/>
      <Box pl={'1vh'} pb={'1vh'}>
      <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
         display={'flex'}
         spacing={0}
         _hover={{
         color: 'logo.orange'
         }}
         >
        <IconButton
         variant={'unstyled'}           
         fontSize={'xl'}
         disabled={true}
         icon={<MdOpenInNew/>}/>
         <Button
         fontSize={'md'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         disabled={true}
         >Open</Button>       
        </ButtonGroup>
        <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
         display={'flex'}
         spacing={0}
         _hover={{
         color: 'logo.orange'
         }}
         >
        <IconButton
         variant={'unstyled'}           
         fontSize={'xl'}
         disabled={true}
         icon={<BiAddToQueue/>}/>
         <Button
         fontSize={'md'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         disabled={true}
         >Add</Button>       
        </ButtonGroup>
        <ButtonGroup
         textColor={'web.text2'}
         h={'5vh'}
         display={'flex'}
         spacing={0}
         _hover={{
         color: 'logo.orange'
         }}
         >
        <IconButton
         variant={'unstyled'}           
         fontSize={'xl'}
         disabled={true}
         icon={<AiOutlineDelete/>}/>
         <Button
         fontSize={'md'}
         variant={'unstyled'}           
         fontWeight={'normal'}
         disabled={true}
         >Delete</Button>       
        </ButtonGroup>
      </Box>
    </VStack>
  )
}