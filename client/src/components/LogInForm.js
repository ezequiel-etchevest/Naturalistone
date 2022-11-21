import { Box, Input, FormControl, FormLabel, Center, Button, InputGroup, InputRightElement, Text, IconButton } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState,  useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeById, getEmployees } from "../redux/actions";
import {  AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { CgLogIn } from 'react-icons/cg'

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
        h={'92vh'}
        w={'100vw'}
        display={'flex'}
        bg={'web.bg'}
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

          <Box
            display={'flex'}
            flexDir={'column'}
            pt={'4vh'}
            pb={'5vh'}
            pl={'2vw'}
            pr={'2vw'}
            w={'25vw'}
            h={'50vh'}
            alignItems={'center'}
            justifyContent={'space-around'}
            backgroundColor={'web.sideBar'}
            color={'web.text'}
            rounded={'md'}
            border={'1px solid'}
            borderColor={'web.border'}
          > 
          <Box
            h={'70%'}
            display={'flex'}
            flexDir={'column'}
            justifyContent={'space-around'}>
              <FormControl >
                <FormLabel>Username </FormLabel>
                <Input
                  borderColor={'web.border'}
                  bg={'web.bg'}
                  id="email"
                  placeholder="Username"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  _focus={{
                    borderColor: 'logo.orange',
                    boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                  }}
                />
                {touched.email && errors.email && (
                      <Text  m={'0.5vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                        {errors.email}
                      </Text>
                    )}
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    borderColor={'web.border'}
                    bg={'web.bg'}
                    id="password"
                    name="password"
                    pr="70px"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    _focus={{
                      borderColor: 'logo.orange',
                      boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
                    }}
                  />
                  <InputRightElement width={'3vw'}>
                    <IconButton
                    _hover={{
                      color: 'white'
                    }} 
                    color={'web.text2'} 
                    colorScheme={'Gray'}
                    size={'lg'}
                    onClick={handleShowClick}
                    icon={show ? <AiOutlineEyeInvisible/> :< AiOutlineEye/>}
                    >
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
                {touched.password && errors.password && (
                      <Text m={'0.5vh'} position={'absolute'} color={'web.error'} fontSize={'xs'}>
                        {errors.password}
                      </Text>)}
              </FormControl>
          </Box>
              <Box mt={'2vh'}>
              {Object.entries(errors).length ? (
                    <Button
                      rightIcon={<CgLogIn/>}
                      p={'3vh'}
                      pb={'3.2vh'}
                      bg={'logo.orange'}
                      color={'web.text'}
                      disabled={true}
                      type="submit"
                      _hover={{
                        bg: '#c46521'
                      }}
                    >
                      Log In
                    </Button>
                  ) : (
                    <Button
                      rightIcon={<CgLogIn/>}
                      boxShadow={'0px 0px 5px 0px rgba(255,144,0,0.6)'}
                      p={'3vh'}
                      pb={'3.2vh'}
                      bg={'logo.orange'}
                      color={'web.text'}
                      disabled={false}
                      type="submit"
                      onClick={handleSubmit}
                      _hover={{
                        bg: '#c46521'
                      }}
                      _active={{
                        bg: '#c46521'
                      }}
                    >
                      Log In
                    </Button>
                  )}
                  </Box>
          </Box>

          )}
        </Formik>
      </Center>
          
    )
}

export default LogInForm