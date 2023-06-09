import { VStack, Box, FormControl, Input, Text, FormLabel} from "@chakra-ui/react"



export function CustomerInfo({formData, setFormData, validate, errors, setErrors, setChangeInput, handleChange}) {


  return (
    <>
      <form>
      <VStack h={'40vh'}>
        <Box w={'22vw'} display={'flex'} pt={'2vh'} flexDir={'row'} justifyContent={'space-between'}>
          <Text alignSelf={'flex-start'} textColor={'web.text2'} fontWeight={'bold'} >Customer Info</Text>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} pt={'4vh'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} fontWeight={'normal'}>Full Name</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Contact_Name"}
              value={formData.Contact_Name}
              onChange={handleChange}
              />
              { errors.Contact_Name && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.Contact_Name}
                </Text>
              )}
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'}>Email</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Email"}
              value={formData.Email}
              onChange={handleChange}
              />
              { errors.Email && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.Email}
                </Text>
              )}
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'}>Phone</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Phone"}
              value={formData.Phone}
              onChange={handleChange}
              />
              { errors.Phone && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.Phone}
                </Text>
              )}
          </FormControl>
        </Box>
      </VStack>
    </form>
  </>
      )
    }