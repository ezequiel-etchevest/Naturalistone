import { VStack, Box, FormControl, Input, Text, FormLabel, RadioGroup, HStack, Radio} from "@chakra-ui/react";
import '../../../assets/styleSheet.css'
import { useState } from "react";


export function CompanyInfo({formData, setFormData, validate, errors, setErrors, setChangeInput, handleChange}) {
  const [ discountID, setDiscountID ] = useState(1)

  const handleDiscount = (value) => {
    setDiscountID(value)
    setFormData({
      ...formData,
      DiscountID: value
    })
  }
  return(
    <>
      <form>
        <VStack spacing={4}  h={'40vh'}>
          <Box w={'22vw'} display={'flex'} pt={'2vh'} flexDir={'row'} justifyContent={'space-between'}>
            <Text alignSelf={'flex-start'} textColor={'web.text2'} fontWeight={'bold'} >Company Info</Text>
          </Box>
          <Box w={'22vw'} display={'flex'} pt={'4vh'}  flexDir={'row'} justifyContent={'space-between'}>
            <FormControl>
              <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'companyname'} fontWeight={'normal'}>Company Name</FormLabel>
                <Input
                  mb={'0.5vh'}
                  variant="unstyled"
                  textColor={'web.text'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                  size={"sm"}
                  borderBottomWidth={"2px"}
                  borderBottomColor={'web.text2'}
                  type={"text"}
                  name={"Company"}
                  value={formData.Company}
                  onChange={handleChange}
                  />
                  { errors.Company && (
                    <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errors.Company}
                    </Text>
                  )}
              </FormControl>
            </Box>
            <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
              <FormControl>
                <FormLabel textColor={'web.text2'} name={'companyrole'}  fontSize={'sm'}>Company Role</FormLabel>
                  <Input
                  mb={'0.5vh'}
                  variant="unstyled"
                  textColor={'web.text'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                  size={"sm"}
                  borderBottomWidth={"2px"}
                  borderBottomColor={'web.text2'}
                  type={"text"}
                  name={"Company_Position"}
                  value={formData.Company_Position}
                  onChange={handleChange}
                  />
                  { errors.Company_Position && (
                    <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                      {errors.Company_Position}
                    </Text>
                  )}
              </FormControl>
            </Box>
            <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
              <FormControl>
              <FormLabel textColor={'web.text2'} name={'discount'} fontSize={'sm'}>Discount</FormLabel>
                <RadioGroup
                textColor={'web.text2'} 
                name={'DiscountID'} 
                onChange={handleDiscount} 
                value={discountID}
                colorScheme="orange">
                  <HStack spacing={'auto'} px={'1.5vw'}>
                    <Radio className='options' value={'1'}>0%</Radio>
                    <Radio className='options' value={'2'}>5%</Radio>
                    <Radio className='options' value={'3'}>10%</Radio>
                    <Radio className='options' value={'4'}>15%</Radio>
                  </HStack>
                </RadioGroup>
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