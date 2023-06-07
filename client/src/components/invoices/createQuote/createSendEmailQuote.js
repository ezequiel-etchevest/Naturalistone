import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Center, Flex, Heading, Input, Spinner, Textarea, useToast } from '@chakra-ui/react';
import { sendEmail } from '../../../redux/actions-invoiceEmail';
import axios from 'axios';

const SendEmailModal = ({handleChangeEmail, customer, pdf}) => {

  const [isToastShowing, setIsToastShowing] = useState(false)
  const dispatch = useDispatch()
  const [ input, setInput ] = useState({
    subject: '',
    htmlBody: '',
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
    const resolvePdf = await pdf
    console.log('soy resolvepdf', pdf)
    if(!isToastShowing){
      const email = {
        htmlBody: input.htmlBody,
        subject: input.subject,
        clientEmail: 'eduardoasm19@gmail.com',
        // nameValue: customer.name
        // sellerEmail: customer.Email
      }
      console.log('soy email', email)
      dispatch(sendEmail(email, resolvePdf))
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
    })
  }
  }

  const user = useSelector((state) => state.user)

  console.log(user)
  console.log('soy customer', customer)

  return (
  <>
        <Box h={'85vh'} >
          <Button 
          size={'sm'}
          onClick={handleChangeEmail}
          colorScheme={'orange'}
          >
            Back
          </Button>
          <Center>
            <Heading color={'web.text2'}  as='h1' size='md' >New Message</Heading>
          </Center>
          <Center>
            <Box mt={'15px'} mr={'30px'}>
              <Flex>
                <Heading as='h1' size='sm' color={'web.text2'} mr={'20px'} > From</Heading>
                <Input w={'25vw'} color={'web.text'} size='xs' value={user[0].Username}/>
              </Flex>
            </Box>
          </Center>
          <Center>
            <Box mt={'15px'} mr={'10px'}>
              <Flex>
                <Heading as='h1' size='sm' color={'web.text2'} mr={'20px'} > To </Heading>
                <Input w={'25vw'} size='xs' color={'web.text'} value={customer}/>
              </Flex>
            </Box>
          </Center>
          <Center>
            <Box mt={'15px'} mr={'35px'}>
              <Flex>
                <Heading
                as='h1'
                size='sm'
                color={'web.text2'}
                mr={'20px'}
                > Subject </Heading>
                <Input
                color={'web.text'}
                w={'25vw'}
                size='xs'
                name='subject'
                onChange={handleChange}
                value={input.subject}
                />
              </Flex>
            </Box>
          </Center>
          <Center>
            <Box mt={'15px'} mr={'35px'}>
              <Flex>
                <Heading 
                as='h1'
                size='sm'
                color={'web.text2'}
                mr={'20px'}
                > Body </Heading>
                <Textarea
                color={'web.text'}
                w={'40vw'}
                h={'50vh'}
                size='xs'
                name='htmlBody'
                onChange={handleChange}
                value={input.htmlBody}
                />
              </Flex>
            </Box>
          </Center>
          <Flex justify={'flex-end'}>
          <Button 
          size={'sm'}
          onClick={handleSendEmail}
          colorScheme={'orange'}
          >
            Send
          </Button>
            </Flex>
        </Box>
  </>
  )
  };


export default SendEmailModal