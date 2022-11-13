import { Box, Input, FormControl, FormLabel, Center, Button, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from "../redux/actions";


const LogInForm = () => {

    const [show, setShow] = useState(false);
    const handleShowClick = () => setShow(!show);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //const employees = useSelector(state => state.employees)

    useEffect(() =>{
      dispatch(getEmployees())
    },[dispatch])

    // const findEmailEmployee = (employees, email) => {
    //   const email = employees.find( e => )
    // }

    //console.log(employees)


    return (
        <Center
        h={'100vh'}
        w={'100vw'}
        display={'flex'}
      >
        <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validate={(values)=>{
          let errores = {};
          if(!values.email){
            errores.email = 'Please enter your email';
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )){
              errores.email = 'e.g.: example_email@naturalistone.com';
            } else if (values.email.includes('+')) {
              errores.email = 'Email can not contain +';
            }
        }}>
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