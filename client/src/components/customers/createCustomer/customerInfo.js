import { VStack, Box, FormControl, Input, Text, FormLabel, Stack, StackDivider} from "@chakra-ui/react"



export function CustomerInfo({formData, setFormData, validate, errors, setErrors, setChangeInput, handleChange}) {

  return (
    <>
      <form>
      <VStack h={'40vh'}>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} mr={"4vw"}>
          <Text alignSelf={'flex-start'} textColor={'web.text2'} fontWeight={'bold'} >Customer Info</Text>
        </Box>
        <Stack h={'44vh'} divider={<StackDivider />}>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} pt={'1.5vh'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'} name={'name'}>Full Name</FormLabel>
            <Input
              variant="unstyled"
              textColor={'web.text2'}
              pl={"2"}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              type={"text"}
              name={"Contact_Name"}
              value={formData?.Contact_Name}
              onChange={handleChange}
              />
              { errors.Contact_Name && (
                <Text position={'absolute'} pt={"1.5vh"} color={'web.error'} fontSize={'xs'}>
                  {errors.Contact_Name}
                </Text>
              )}
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} pt={"3"}>
          <FormControl>
          <FormLabel textColor={'web.text2'}name={'email'} fontSize='sm' fontWeight={'semibold'}>Email</FormLabel>
            <Input
              variant="unstyled"
              textColor={'web.text2'}
              pl={"2"}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              type={"text"}
              name={"Email"}
              value={formData?.Email}
              onChange={handleChange}
              />
              { errors.Email && (
                <Text position={'absolute'} pt={"1.5vh"} color={'web.error'} fontSize={'xs'}>
                  {errors.Email}
                </Text>
              )}
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} pt={"3"}>
          <FormControl>
          <FormLabel textColor={'web.text2'}name={'phone'} fontSize='sm' fontWeight={'semibold'}>Phone</FormLabel>
            <Input
              variant="unstyled"
              textColor={'web.text2'}
              pl={"2"}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              type={"text"}
              name={"Phone"}
              value={formData?.Phone}
              onChange={handleChange}
              />
              { errors.Phone && (
                <Text position={'absolute'} pt={"1.5vh"} color={'web.error'} fontSize={'xs'}>
                  {errors.Phone}
                </Text>
              )}
          </FormControl>
        </Box>
        <Box></Box>
        </Stack>
      </VStack>
    </form>
  </>
      )
    }