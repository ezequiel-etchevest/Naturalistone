import { Box, Center, Divider } from "@chakra-ui/react"
import LogInForm from "../components/LogInForm"
import { Text } from "@chakra-ui/react"

const Redirect = () => {
  return (
    <>
      <Center
        h={'92vh'}
        w={'100vw'}
        bg={'web.bg'}
        display={'flex'}
        flexDir={'column'}>
          <Box
            position={'absolute'} top={'18vh'} display={'flex'} flexDir={'column'} alignItems={'center'}>  
            <Text
              color={'web.text2'}
              fontSize={'3vh'} fontWeight={'hairline'}>To proceed, ensure that you are logged in with your correct username and password credentials.</Text>
          </Box>
          <LogInForm/>
         </Center>
    </>
  )
}

export default Redirect