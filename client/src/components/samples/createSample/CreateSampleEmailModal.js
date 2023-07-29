import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Center, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Spinner, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { sendEmailSamples } from '../../../api/sendEmai';

const SendEmailModal = ({ formData, isOpen3, onClose3, handleCleanFormData }) => {

  const user = useSelector((state) => state.user)
  const [isToastShowing, setIsToastShowing] = useState(false)

  const [ input, setInput ] = useState({
    subject: '',
    htmlBody: '',
    ccEmail: '',
  })
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSendEmail = async () => {
    if(!isToastShowing){
      const email = {
        // sellerEmail: user[0].Username,
        sellerEmail: "irina@naturalistone.com",
        clientName: formData.customer.Contact_Name,
        htmlBody: input.htmlBody,
        subject: input.subject,
        clientEmail: "eduardoasm19@gmail.com",
        ccEmail: input.ccEmail,
        estimatedDelivery: new Date().toLocaleString().slice(0,9),
        products: formData.products,
        trackingNumber: formData.variables.trackingNumber,
      }
      const response = await sendEmailSamples(email)
      console.log("soy responsee", response)
      if (response.success === false){
        setIsToastShowing(true)
        return toast({
          title: 'Error in send email.',
          description: "The email was not sent correctly",
          status: 'error',
          duration: 9000,
          isClosable: true,
          onCloseComplete:() => setIsToastShowing(false)
        })
      }
      setIsToastShowing(true)
      toast({
      title: 'E-mail sent.',
      description: "The email was sent correctly",
      status: 'success',
      duration: 9000,
      isClosable: true,
      onCloseComplete:() => setIsToastShowing(false)
    })
    setInput({
    subject: '',
    htmlBody: '',
    ccEmail: '',
    })
    handleCleanFormData()
  }
  }

  return (
  <>
        <Modal
          isOpen={isOpen3}
          onClose={onClose3}
          size={"2xl"}
          motionPreset="slideInRight"
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            bg={"web.sideBar"}
            border={"1px solid"}
            borderColor={"web.border"}
          >
          <ModalCloseButton
            color={"web.text2"}
            mt={"2vh"}
            mr={"0.5vw"}
            position={"absolute"}
          />
          <ModalBody
            color={"web.text2"}
            display={"flex"}
            justifyContent={"center"}
            flexDir={"column"}
          >
          <Center>
            <Heading color={'web.text2'}  as='h1' size='md' >New Message</Heading>
          </Center>
          <Center>
            <Box mt={'15px'} mr={'30px'}>
              <Flex>
                <Heading as='h1' size='sm' color={'web.text2'} mr={'20px'} > From</Heading>
                <Input w={'25vw'} color={'web.text'} size='xs' readOnly={true} value={user[0].Username}/>
              </Flex>
            </Box>
          </Center>
          <Center>
            <Box mt={'15px'} mr={'10px'}>
              <Flex>
                <Heading as='h1' size='sm' color={'web.text2'} mr={'20px'} > To </Heading>
                <Input
                  w={'25vw'}
                  type="text"
                  color={'web.text'}
                  size='xs'
                  name={'clientEmail'}
                  defaultValue={formData.customer.Email}
                />
              </Flex>
            </Box>
          </Center>
          <Center>
            <Box mt={'15px'} mr={'10px'}>
              <Flex>
                <Heading as='h1' size='sm' color={'web.text2'} mr={'20px'} > CC </Heading>
                <Input w={'25vw'} size='xs' color={'web.text'} onChange={handleChange} name={'ccEmail'}/>
              </Flex>
            </Box>
          </Center>
          <Center>
            <Box mt={'15px'} mr={'45px'}>
              <Flex>
                <Heading
                as='h1'
                size='sm'
                color={'web.text2'}
                mr={'18px'}
                > Subject </Heading>
                <Input
                color={'web.text'}
                w={'25vw'}
                size='xs'
                type='text'
                name='subject'
                onChange={handleChange}
                value={input.subject}
                />
              </Flex>
            </Box>
          </Center>
          <Center>
            <Box mt={'15px'}>
              <Flex>
                <Textarea
                color={'web.text'}
                w={'40vw'}
                h={'50vh'}
                type='text'
                size='xs'
                name='htmlBody'
                onChange={handleChange}
                value={input.htmlBody}
                />
              </Flex>
            </Box>
          </Center>
          <Flex justify={'flex-end'} 
          p={"10px"}
           >
          <Button 
          size={'sm'}
          onClick={handleSendEmail}
          colorScheme={'orange'}
          >
            Send
          </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
  </>
  )
  };


export default SendEmailModal