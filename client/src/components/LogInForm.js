import { Box, Input, FormControl, FormLabel, Center, Button, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'


const LogInForm = () => {

    const [show, setShow] = useState(false);
    const handleShowClick = () => setShow(!show);
    const navigate = useNavigate()

    return (
        <Center
        h={'100vh'}
        w={'100vw'}
        display={'flex'}
      >
        <Formik>
          <VStack
            p={5}
            flexDir={'column'}
            w={'25vw'}
            h={'50vh'}
            backgroundColor={'white'}
            placeContent={'center'}
          >
              <FormControl>
                <FormLabel>Username </FormLabel>
                <Input
                  name="email"
                  type="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="pass"
                    pr="70px"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="70px">
                    <Button h="30px" size="sm" onClick={handleShowClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
                <Button onClick={()=> navigate('/home')}>
                  Log In
                </Button>
            <Box
            >
            </Box>
            <Center
             
            >        
            </Center>
          </VStack>
        </Formik>
      </Center>
    )
}

export default LogInForm