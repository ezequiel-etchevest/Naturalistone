import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
import { Box,  Divider, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useToast } from '@chakra-ui/react';
import { sendEmailSamples } from '../../../api/sendEmai';
import EmailTemplate from './EmailToolbar';
import '../../../assets/styleSheet.css'

const SendEmailModal = ({ formData, isOpen3, onClose3, handleCleanFormData }) => {

  const user = useSelector((state) => state.user)
  const [isToastShowing, setIsToastShowing] = useState(false)

  const [ input, setInput ] = useState({
    subject: '',
    htmlBody: '',
    ccEmail: '',
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
        clientEmail: formData.customer.Email,
        ccEmail: input.ccEmail,
      };
      
      try {
        const response = await sendEmailSamples(email);
        if (response.success === false) {
          showErrorToast('The email was not sent correctly');
        } else {
          showSuccessToast('The email was sent correctly');
          setInput({
            subject: '',
            htmlBody: '',
            ccEmail: '',
          });
          handleClose();
        }
      } catch (error) {
        showErrorToast('Error sending email: ' + error.message);
      } finally {
        setIsToastShowing(false);
      }
    }
  };
  

  const handleClose = () => {
    handleCleanFormData()
    onClose3()
  }
  // const image = 'C:\Users\Keki\Desktop\Naturalistone\Naturalistone\client\src\assets\NaturalistoneLogo.png'

  return (
  <>
    <Modal
      isOpen={isOpen3}
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
            <Input w={'92%'} maxW={'300px'} fontSize={'sm'} border={'none'} type="text" readOnly={true} name={'clientEmail'} className='mailInputs' defaultValue={formData.customer.Email} />
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
        <EmailTemplate
          formData={formData}
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


export default SendEmailModal