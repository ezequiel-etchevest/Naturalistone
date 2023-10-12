import { VStack, Box, FormControl, Input, Text, FormLabel, Select} from "@chakra-ui/react";
import { USStates } from "../../../utils/USStates";

export function BillingInfo({formData, setFormData, validate, errors, setErrors, setChangeInput, handleChange}) {

  return (
    <>
      <form>
        <Box display={"flex"} flexDir={"row"} gap={"2vw"}>
          <VStack h={'20vh'} >
            <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <Text alignSelf={'flex-start'} textColor={'web.text2'} fontWeight={'bold'} >Billing Address Info</Text>
            </Box>
            <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} pt={"1.5vh"} name={'billingaddress'} fontWeight={'normal'}>Billing Address</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Billing_Address"}
              value={formData.Billing_Address}
              onChange={handleChange}
              />
              { errors.Billing_Address && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.Billing_Address}
                </Text>
              )}
          </FormControl>
            </Box>
            <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} pt={"1.5vh"} name={'Billing_Address2'} fontWeight={'normal'}>Billing Address 2</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Billing_Address2"}
              value={formData.Billing_Address2}
              onChange={handleChange}
              />
          </FormControl>
            </Box>
            <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} name={'billingcity'} pt={"1.5vh"} fontSize={'sm'}>City</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Billing_City"}
              value={formData.Billing_City}
              onChange={handleChange}
              />
              { errors.Billing_City && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.Billing_City}
                </Text>
              )}
          </FormControl>
            </Box>
          </VStack>
          <VStack h={'20vh'}  pt={"4.2vh"}>
            <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
        <FormControl>
          <FormLabel textColor={'web.text2'} name={'billingstate'} fontSize={'sm'}>State</FormLabel>
              <Select
                onChange={(e)=>handleChange(e)}
                mb={'0.5vh'}
                minH={'5vh'}
                borderBottomWidth={"2px"}
                borderBottomColor={'web.text2'}
                variant="unstyled"
                color={'web.text2'}
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                css={{
                '&::-webkit-scrollbar': {
                  width: '0.4vw',
                  background: '#0D1117'
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                   background: '#E47424',
                  borderRadius: '5px',
                },
                }}
                size={"sm"}
                value={formData.Billing_State}
                cursor={'pointer'}
                name="Billing_State"
              >
                <option value='' className="options">Select state</option>
                {
                  USStates.map((e, i) => {
                      return(
                        <option key={i} className={'options'} value={e}>{e}</option>
                  )})
                }
            </Select>
          </FormControl>
            </Box>
            <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} name={'billingzipcode'} pt={"1.5vh"} fontSize={'sm'}>Zip Code</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Billing_ZipCode"}
              value={formData.Billing_ZipCode}
              onChange={handleChange}
              />
              { errors.Billing_ZipCode && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.Billing_ZipCode}
                </Text>
              )}
          </FormControl>
            </Box>
            <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} pt={"1.5vh"} name={'Billing_Nickname'}  fontWeight={'normal'}>Billing Nickname</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Billing_Nickname"}
              value={formData.Billing_Nickname}
              onChange={handleChange}
              />
          </FormControl>
            </Box>
          </VStack>
        </Box>    
      </form>
    </>
    )
  }