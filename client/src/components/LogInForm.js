import { Box, Input, FormControl, FormLabel, Center, Button, InputGroup, InputRightElement, VStack, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState,  useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeById, getEmployees } from "../redux/actions";


const LogInForm = () => {
  
  const [show, setShow] = useState(false);
  const handleShowClick = () => setShow(!show);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let employees = useSelector((state)=>state?.employees)

  const valEmailEmployee = (inputEmail) => {
      const user = employees.find( e => e.Username === inputEmail)
      if(user) return true
      else return false
    }
  const valPassword = (inputPass, inputEmail) => {
    const user = employees.find( e => e.Username === inputEmail)
    if(user.Password === inputPass) return true
    else return false
  }

    useEffect(() =>{
      dispatch(getEmployees())
     },[])


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
            errores.email = 'Please enter your username';
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )){
              errores.email = 'e.g.: example_email@naturalistone.com';
            } else if (values.email.includes('+')) {
              errores.email = 'Username can not contain +';
            }else if (valEmailEmployee(values.email)=== false){
              errores.email = 'Username does not exists'
            }
          if(!values.password){
            errores.password = 'Please enter your password'
          }else if(values.password.length < 6) {
            errores.password = 'Password must be longer than 6 characters'
          }
          return errores
        }}
        onSubmit={(values) =>{
         
          const User = employees.find(e => e.Username === values.email)

          if(values.email === User.Username && values.password === User.Password){
            dispatch(getEmployeeById(User.SellerID))
            navigate('/home')
          }else if(valPassword(values.password, values.email) == false ){
           alert('invalid match')
          }
        }}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            values,
            touched
          })=>(

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
                  id="email"
                  placeholder="Username"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                      <Text color="red.300" size="xxs">
                        {errors.email}
                      </Text>
                    )}
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    pr="70px"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}

                  />
                  <InputRightElement width="70px">
                    <Button h="30px" size="sm" onClick={handleShowClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {touched.password && errors.password && (
                      <Text color="red.300" size="xs">
                        {errors.password}
                      </Text>)}
              </FormControl>
              {Object.entries(errors).length ? (
                    <Button
                      disabled={true}
                      type="submit"
                      mt="10px"
                      onClick={handleSubmit}
                    >
                      Log In
                    </Button>
                  ) : (
                    <Button
                      disabled={false}
                      type="submit"
                      mt="10px"
                      onClick={handleSubmit}
                    >
                      Log In
                    </Button>
                  )}
            <Box
            >
            </Box>
            <Center
             
            >        
            </Center>
          </VStack>

          )}
        </Formik>
      </Center>
          
    )
}

export default LogInForm