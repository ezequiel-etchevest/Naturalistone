import { VStack, Box, FormControl, Input, Text, FormLabel} from "@chakra-ui/react";
import AutocompleteState from "../AutocompleteState";

export function BillingInfo({formData, setFormData, validate, errors, setErrors, setChangeInput, handleChange}) {

  
  return (
    <>
      <form>
      <VStack  h={'40vh'}>
        <Box w={'22vw'} display={'flex'} pt={'2vh'} flexDir={'row'} justifyContent={'space-between'}>
          <Text alignSelf={'flex-start'} textColor={'web.text2'} fontWeight={'bold'} >Billing Address Info</Text>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'billingaddress'} fontWeight={'normal'}>Billing Address</FormLabel>
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
          <FormLabel textColor={'web.text2'} name={'billingcity'} fontSize={'sm'}>City</FormLabel>
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
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
        <FormControl>
          <FormLabel textColor={'web.text2'} name={'billingstate'} fontSize={'sm'}>State</FormLabel>
            <AutocompleteState 
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              validate={validate}
              setErrors={setErrors}
              name={'Billing_State'}
            />
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} name={'billingzipcode'} fontSize={'sm'}>Zip Code</FormLabel>
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
        
      </VStack>
    </form>
  </>
      )
    }