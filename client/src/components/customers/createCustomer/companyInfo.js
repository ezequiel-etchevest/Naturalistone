import { VStack, Box, FormControl, Input, Text, FormLabel, RadioGroup, HStack, Radio, Select} from "@chakra-ui/react";
import '../../../assets/styleSheet.css'
import { useState } from "react";
import { companyRole } from "../../../utils/arrayCompanyRole";


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
                <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'companyrole'} fontWeight={'normal'}>Company Role</FormLabel>
                <Select
                  onChange={(e)=>handleChange(e)}
                  mb={'0.5vh'}
                  h={'5vh'}
                  variant="unstyled"
                  borderBottomWidth={"2px"}
                  borderBottomColor={'web.text2'}
                  textColor={'web.text2'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                  size={"sm"}
                  value={formData.Company_Position}
                  cursor={'pointer'}
                  name="Company_Position"
                >
                <option value='' className="options">Select Role</option>
                {
                  companyRole.length ? (
                    companyRole?.map((role, i) => {
                      return(
                        <option key={i} className={'options'} value={role}>{role}</option>
                  )})
                      
                  ): ( null)
              }
                </Select>
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