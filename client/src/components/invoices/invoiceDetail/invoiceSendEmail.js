import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast
} from '@chakra-ui/react';
// import { sendEmail } from '../../../redux/actions-invoiceEmail';
import axios from 'axios';

const InvoiceSendEmail = ({customer, pdf, isOpen, onClose}) => {

  const user = useSelector((state) => state.user)
  const [isToastShowing, setIsToastShowing] = useState(false)
  console.log(customer)

  const dispatch = useDispatch()
  const [ input, setInput ] = useState({
    subject: '',
    htmlBody: '',
    emailClient: customer.Email ?? '',
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
    const resolvePdf = await pdf
    if(!isToastShowing){
      // const email = {
      //   ccEmail: input.ccEmail,
      //   sellerEmail: user[0].Username,
      //   htmlBody: input.htmlBody,
      //   subject: input.subject,
      //   clientEmail: input.emailClient,
      //   pdf: resolvePdf,
      // }
      // dispatch(sendEmail(email))
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

  return (
  <>
    <Modal
      isOpen={isOpen} 
      onClose={onClose} 
      size={'6xl'}
      motionPreset='slideInRight'>
      <ModalOverlay/>
      <ModalContent 
        rounded={'md'} 
        mt={'4vh'} 
        mb={'4vh'} 
        w={'60vw'} 
        bg={'web.sideBar'} 
        border={'1px solid'} 
        pt={'2vh'} 
        pb={'2vh'} 
        borderColor={'web.border'}>
          <ModalBody w={'100%'} h={'100%'}>
            <Box h={'85vh'} >
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
                  name={'emailClient'}
                  defaultValue={input.emailClient}
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
            <Box mt={'15px'} mr={'35px'}>
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

          </ModalBody>

        </ModalContent>
    </Modal>
  </>
  )
  };


export default InvoiceSendEmail