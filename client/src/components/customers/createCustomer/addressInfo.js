import { VStack, Box, FormControl, Input, Text, FormLabel, IconButton, Switch, Select} from "@chakra-ui/react";
import { USStates } from "../../../utils/USStates"; 
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
        Billing_Address2: formData.Address2,
        // Billing_Nickname: formData.Nickname,
        ShippingAddressInBilling: true
      })
    }
    if( e.target.checked === false ) {
      setFormData({
        ...formData,
        Billing_Address: '',
        Billing_ZipCode: '',
        Billing_State: '',
        Billing_City: '',
        Billing_Address2: '',
        // Billing_Nickname: '',
        ShippingAddressInBilling: false
      })
    }
  }

  return (
    <>
      <form>
        <Box display={"flex"} flexDir={"row"}>
      <VStack h={'20vh'} pr={"2vw"}>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} >
          <Text alignSelf={'flex-start'} textColor={'web.text2'} fontWeight={'bold'} >Address Info</Text>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'address'} pt={"1.5vh"} fontWeight={'normal'}>Address</FormLabel>
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
          <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'address2'} pt={"1.5vh"} fontWeight={'normal'}>Address 2</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Address2"}
              value={formData.Address2}
              onChange={handleChange}
              />
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} name={'city'} fontSize={'sm'} pt={"1.5vh"}>City</FormLabel>
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
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'} mb={"5px"}>
                  {errors.City}
                </Text>
              )}
          </FormControl>
        </Box>
      </VStack>
      <VStack h={'20vh'} pt={"4.2vh"}>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
        <FormControl>
          <FormLabel textColor={'web.text2'} name={'state'}  fontSize={'sm'}>State</FormLabel>
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
                value={formData.State}
                cursor={'pointer'}
                name="State"
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
          <FormLabel textColor={'web.text2'} name={'zipcode'} pt={"1.5vh"} fontSize={'sm'}>Zip Code</FormLabel>
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
        {/* <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} pt={"1.5vh"} name={'Nickname'}  fontWeight={'normal'}>Nickname</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Nickname"}
              value={formData.Nickname}
              onChange={handleChange}
              />
          </FormControl>
        </Box> */}
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
      </Box>
    </form>
  </>
      )
    }