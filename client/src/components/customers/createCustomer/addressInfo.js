import { VStack, Box, FormControl, Input, Text, FormLabel, IconButton, Switch} from "@chakra-ui/react";
import AutocompleteState from "../AutocompleteState";
import { useState } from "react";

export function AddressInfo({formData, setFormData, validate, errors, setErrors, setChangeInput, handleChange}) {

  const [ check, setCheck ] = useState(false)

  const handleBillingAdress = (e) => {

    if( e.target.checked === true ) {
      setFormData({
        ...formData,
        Billing_Address: formData.Address,
        Billing_ZipCode: formData.ZipCode,
        Billing_State: formData.State,
        Billing_City: formData.City,
      })
    }
    if( e.target.checked === false ) {
      setFormData({
        ...formData,
        Billing_Address: '',
        Billing_ZipCode: '',
        Billing_State: '',
        Billing_City: '',
      })
    }
  }
  return (
    <>
      <form>
      <VStack h={'40vh'}>
        <Box w={'22vw'} display={'flex'} pt={'2vh'} flexDir={'row'} justifyContent={'space-between'}>
          <Text alignSelf={'flex-start'} textColor={'web.text2'} fontWeight={'bold'} >Address Info</Text>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} fontWeight={'normal'}>Address</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Address"}
              value={formData.Address}
              onChange={handleChange}
              />
              { errors.Address && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.Address}
                </Text>
              )}
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'}>City</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"City"}
              value={formData.City}
              onChange={handleChange}
              />
              { errors.City && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.City}
                </Text>
              )}
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
        <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'}>State</FormLabel>
            <AutocompleteState 
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              validate={validate}
              setErrors={setErrors}
              name={'State'}
            />
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'}>Zip Code</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"ZipCode"}
              value={formData.ZipCode}
              onChange={handleChange}
              />
              { errors.ZipCode && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.ZipCode}
                </Text>
              )}
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} pr={'1vw'}>
          <Text 
          alignSelf={'flex-start'} 
          textColor={'web.text2'} 
          fontWeight={'normal'} 
          fontStyle={'italic'} 
          fontSize={'sm'}>Set this adress as billing address?</Text>
          <Switch id='billing_adress' onChange={(e)=>handleBillingAdress(e)}  colorScheme={'orange'} size={'sm'}/>
        </Box>

      </VStack>
    </form>
  </>
      )
    }