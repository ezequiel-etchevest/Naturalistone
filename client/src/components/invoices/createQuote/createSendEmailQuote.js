import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Divider,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useToast
} from '@chakra-ui/react';
import '../../../assets/styleSheet.css'
import EmailTemplateCustomer from '../../customers/customerDetail/EmailToolBarCustomer';
import { sendEmailCustomer } from '../../../api/sendEmai';
import { createCustomerRelationship, getCustomerRelationship } from '../../../redux/actions-customers';

const SendEmailModal = ({ customer, pdf, handleChangeEmail, isOpen}) => {

  const user = useSelector((state) => state.user)
  const [isToastShowing, setIsToastShowing] = useState(false)
  const dispatch = useDispatch();

  const [ input, setInput ] = useState({
    subject: '',
    htmlBody: '',
    ccEmail: '',
    plainTextBody: '',
    attachments: [pdf]
  })
  
  const toast = useToast()
  console.log({pdf})
  console.log('inputs', input.attachments)
  const showSuccessToast = (message) => {
    toast({
      title: 'Success',
      description: message,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const showErrorToast = (message) => {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 2000,
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
      const email = {
        sellerEmail: user[0].Username,
        htmlBody: input.htmlBody,
        subject: input.subject,
        clientEmail: customer.Email,
        ccEmail: input.ccEmail,
        // Adjuntar los archivos almacenados en input.attachments
        attachments: input.attachments,
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
            attachments: []
          });
          handleClose();
        }
      } catch (error) {
        showErrorToast(error.message);
      } finally {
        setIsToastShowing(false);
      }
  };

  const handleClose = () => {
    setInput({
      subject: '',
      htmlBody: '',
      ccEmail: '',
      attachments: []
    })
    handleChangeEmail()
  }

  useEffect(() => {
    if(pdf !== null){
    setInput((prevInput) => ({
      ...prevInput,
      attachments: [pdf],
    }));
    console.log('se ejecuto el useEffect')
  }
  }, [pdf]);


  return (
  <>
    <Modal
      isOpen={isOpen}
      onClose={handleChangeEmail}
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
        onClick={handleChangeEmail}
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
          showSuccessToast={showSuccessToast}
          showErrorToast={showErrorToast}
          />
      </ModalBody>
      </ModalContent>
    </Modal>
  </>
  )
  };


export default SendEmailModal
