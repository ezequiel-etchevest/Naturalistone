import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Center, Flex, Heading, Input, Spinner, Textarea } from '@chakra-ui/react';


const SendEmailModal = ({handleChangeEmail, customer}) => {

  const user = useSelector((state) => state.user)

  console.log(user)
  console.log(customer)

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
                <Input w={'25vw'} size='xs' />
              </Flex>
            </Box>
          </Center>
          <Center>
            <Box mt={'15px'} mr={'10px'}>
              <Flex>
                <Heading as='h1' size='sm' color={'web.text2'} mr={'20px'} > To </Heading>
                <Input w={'25vw'} size='xs' />
              </Flex>
            </Box>
          </Center>
          <Center>
            <Box mt={'15px'} mr={'35px'}>
              <Flex>
                <Heading as='h1' size='sm' color={'web.text2'} mr={'20px'} > Affair </Heading>
                <Input w={'25vw'} size='xs' />
              </Flex>
            </Box>
          </Center>
          <Center>
            <Box mt={'15px'} mr={'35px'}>
              <Flex>
                <Heading as='h1' size='sm' color={'web.text2'} mr={'20px'} > Body </Heading>
                <Textarea w={'40vw'} h={'50vh'} size='xs' />
              </Flex>
            </Box>
          </Center>
        </Box>
  </>
  )
  };


export default SendEmailModal