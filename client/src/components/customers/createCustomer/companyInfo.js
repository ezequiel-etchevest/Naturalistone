import { VStack, Box, FormControl, Input, Text, FormLabel, RadioGroup, HStack, Radio, Select, Stack, StackDivider} from "@chakra-ui/react";
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
  console.log("soy formdata", formData)
  const discountRates = [0, 5, 10, 15]

  return(
    <>
      <form>
        <VStack h={'40vh'}>
          <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} mr={"4vw"}>
            <Text alignSelf={'flex-start'} textColor={'web.text2'} fontWeight={'bold'} >Company Info</Text>
          </Box>
            <Stack h={'44vh'} divider={<StackDivider />}>
            <Box w={'22vw'} display={'flex'} pt={'1.5vh'}  flexDir={'row'} justifyContent={'space-between'}>
            <FormControl>
              <FormLabel textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'} name={'companyname'}>Company Name</FormLabel>
                <Input
                  // mb={'0.5vh'}
                  variant="unstyled"
                  pl={"2"}
                  textColor={'web.text2'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                  size={"sm"}
                  // borderBottomWidth={"2px"}
                  // borderBottomColor={'web.text2'}
                  type={"text"}
                  name={"Company"}
                  value={formData.Company}
                  onChange={handleChange}
                  />
                  { errors.Company && (
                    <Text position={'absolute'} pt={"1.5vh"} color={'web.error'} fontSize={'xs'}>
                      {errors.Company}
                    </Text>
                  )}
              </FormControl>
            </Box>
            <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} pt={'3'}>
              <FormControl>
                <FormLabel textColor={'web.text2'} name={'companyrole'} fontSize='sm' fontWeight={'semibold'}>Company Role</FormLabel>
                <Select
                  onChange={(e)=>handleChange(e)}
                  // mb={'0.5vh'}
                  h={'3vh'}
                  variant="unstyled"
                  pl={"2"}
                  // borderBottomWidth={"2px"}
                  // borderBottomColor={'web.text2'}
                  color={'web.text2'}
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
                <Text position={'absolute'} pt={"1.5vh"} color={'web.error'} fontSize={'xs'}>
                   {errors.Company_Position}
                 </Text>
               )}
              </FormControl>
            </Box>
            <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} pt={'3'}>
              <FormControl>
              <FormLabel textColor={'web.text2'} name={'discount'} fontSize='sm' fontWeight={'semibold'}>Discount</FormLabel>
                <Select
                  onChange={(e)=>handleChange(e)}
                  // mb={'0.5vh'}
                  // borderBottomWidth={"2px"}
                  // borderBottomColor={'web.text2'}
                  pl={"2"}
                  minH={'3vh'}
                  color={"web.text2"}
                  variant="unstyled"
                  textColor={'web.text2'}
                  _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
                  size={"sm"}
                  value={formData.DiscountID}
                  cursor={'pointer'}
                  name="DiscountID"
                >
                    {
                      discountRates?.map((e, i) => {
                          return(
                            <option key={i} className={'options'} value={e}>{e}</option>
                      )})
                    }
                </Select>
              </FormControl>
            </Box>
            <Box></Box>
            </Stack>
          </VStack>
        </form>
      </>
          )
    }