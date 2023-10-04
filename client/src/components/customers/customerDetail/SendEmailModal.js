import React, { useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Tooltip,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import '../../../assets/styleSheet.css'
import { AiOutlineMail } from 'react-icons/ai';
import EmailTemplateCustomer from './EmailToolBarCustomer';
import { sendEmailCustomer } from '../../../api/sendEmai';
import { createCustomerRelationship, getCustomerRelationship } from '../../../redux/actions-customers';

const SendEmailModalCustomer = ({ customer }) => {

  const { onClose, onOpen, isOpen } = useDisclosure()
  const user = useSelector((state) => state.user)
  const [isToastShowing, setIsToastShowing] = useState(false)
  const dispatch = useDispatch();

  const [ input, setInput ] = useState({
    subject: '',
    htmlBody: '',
    ccEmail: '',
    plainTextBody: ''
  })
  
  const toast = useToast()

  const showSuccessToast = (message) => {
    toast({
      title: 'Success',
      description: message,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const showErrorToast = (message) => {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value
    })
  }
  const handleSendEmail = async () => {
    if (!isToastShowing) {
      const email = {
        sellerEmail: user[0].Username,
        htmlBody: input.htmlBody,
        subject: input.subject,
        clientEmail: customer.Email,
        ccEmail: input.ccEmail,
      };

      const relationShip = {
        Action: "Email",
        Comment: input.plainTextBody 
      }
      
      try {
        const response = await sendEmailCustomer(email);
        const responseRelationShip = await dispatch(createCustomerRelationship(relationShip, user[0].SellerID, customer.CustomerID))
        if (!response.success || !responseRelationShip.success) {
          showErrorToast(response.msg ?? responseRelationShip.msg);
        } else {
          dispatch(getCustomerRelationship(customer.CustomerID))
          showSuccessToast('The email was sent correctly');
          setInput({
            subject: '',
            htmlBody: '',
            ccEmail: '',
          });
          handleClose();
        }
      } catch (error) {
        showErrorToast(error.message);
      } finally {
        setIsToastShowing(false);
      }
    }
  };

  const handleClose = () => {
    setInput({
      subject: '',
      htmlBody: '',
      ccEmail: ''
    })
    onClose()
  }
  // const image = 'C:\Users\Keki\Desktop\Naturalistone\Naturalistone\client\src\assets\NaturalistoneLogo.png'

  return (
  <>
  <Tooltip label={"Contact Customer"} placement={'bottom-start'} fontWeight={'hairline'}>
    <IconButton
      fontSize={'xl'}
      icon={ <AiOutlineMail/>}
      variant={'unstyled'} 
      label={"Contact Customer"}
      display={'flex'} 
      placeContent={'center'}
      alignItems={'center'}
      fontWeight={'normal'}
      color={'web.text2'} 
      _hover={{
        color: 'logo.orange'
      }}
      _active={{
      }}
      onClick={onOpen}
      />
    </Tooltip>
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size={'3xl'}
      motionPreset="slideInRight"
      isCentered
      >
      <ModalOverlay />
      <ModalContent
        bg={"web.sideBar"}
        border={"1px solid"}
        // maxHeight={'82%'}
        height={'82vh'}
        overflow={'auto'}
        css={{
          '&::-webkit-scrollbar': {
            width: '0.2vw',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#E47424',
            borderRadius: '5px',
          },
        }}
        borderColor={"web.border"}
      >
      <ModalCloseButton
        color={"web.text2"}
        position={"absolute"}
      />
      <ModalBody
        color={"web.text2"}
        >
        <Box ml={'15px'} mr={'12px'} mb={'10px'} display={'flex'} flexDir={'column'} justifyContent={'space-between'} alignContent={'flex-start'} mt={'30px'}>
          <Flex flexDir={'row'} justifyContent={'flex-start'} alignItems={'center'} h={'5vh'}>
            <Text color={'web.text2'} w={'8%'} fontSize={'sm'}>From:</Text>
            <Input w={'92%'} maxW={'300px'} fontSize={'sm'} color={'web.text'} readOnly={true} value={user[0].Username} className='mailInputs' border={'none'} />
          </Flex>
          <Divider borderColor={'web.border'} w={'100%'} />
          <Flex flexDir={'row'} justifyContent={'flex-start'} alignItems={'center'} h={'5vh'}>
            <Text color={'web.text2'} w={'8%'} fontSize={'sm'}>To:</Text>
            <Input w={'92%'} maxW={'300px'} fontSize={'sm'} border={'none'} type="text" readOnly={true} name={'clientEmail'} className='mailInputs' defaultValue={customer.Email} />
          </Flex>
          <Divider borderColor={'web.border'} w={'100%'} />
          <Flex flexDir={'row'} justifyContent={'flex-start'} alignItems={'center'} h={'5vh'}>
            <Text color={'web.text2'} w={'8%'} fontSize={'sm'}>CC:</Text>
            <Input h={'4vh'} fontSize={'sm'} color={'web.text'} onChange={handleChange} name={'ccEmail'} className='mailInputs' border={'none'} />
          </Flex>
          <Divider borderColor={'web.border'} w={'100%'} />
          <Flex flexDir={'row'} justifyContent={'flex-start'} alignItems={'center'} h={'5vh'}>
            <Text color={'web.text2'} w={'8%'} fontSize={'sm'}>Subject:</Text>
            <Input
              w={'92%'}
              h={'4vh'}
              fontSize={'sm'}
              className='mailInputs'
              color={'web.text'}
              border={'none'}
              type='text'
              name='subject'
              onChange={handleChange}
              value={input.subject}
            />
          </Flex>
          <Divider borderColor={'web.border'} w={'100%'}/>
        </Box>
        <EmailTemplateCustomer
          handleSendEmail={handleSendEmail}
          setInput={setInput}
          input={input}
          />
      </ModalBody>
      </ModalContent>
    </Modal>
  </>
  )
  };


export default SendEmailModalCustomer