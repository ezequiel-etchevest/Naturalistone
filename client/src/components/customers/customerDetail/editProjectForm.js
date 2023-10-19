import {
    FormControl,
    Input,
    VStack,
    Box,
    Text,
    FormLabel,
    Select,
    Stack,
    StackDivider
  } from '@chakra-ui/react';
  import { USStates } from '../../../utils/USStates';
  import '../../../assets/styleSheet.css';
 
  
  export default function EditProjectForm({formData, setFormData, validateCompletedInputsProject, errors, setErrors, setChangeInput}) {

    const handleChange = (event) => {
      const { name, value } = event.target;
      // Actualizas solo la propiedad que cambió en el objeto de formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      setErrors(
        validateCompletedInputsProject({
          ...formData,
          [name]: value,
        })
      )
      setChangeInput(true)
    };

    return (
      <form>
        <VStack display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={"1vw"}>
          <Box display={"flex"} w={"full"}>
          <Text textColor={'web.text2'} ml={'2.5vw'} fontWeight={"bold"}>Project Info</Text>
          </Box>
          <Box  display={"flex"} flexDir={"row"} gap={"3vw"}>
          <Stack divider={<StackDivider />} display={'flex'} flexDir={'column'}>
            <Box pt='2' w={'19vw'} h={'8vh'} mt={'0.5vh'}>
            <FormControl>
              <FormLabel textColor={'web.text2'} fontSize={'sm'} >Project Name</FormLabel>
                <Input
                variant="unstyled"
                textColor={'web.text2'}
                pl={'2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                w={'19vw'}
                size={"sm"}
                type={"text"}
                name={"ProjectName"}
                value={formData.ProjectName}
                onChange={handleChange}
                />
              { errors.ProjectName && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'} pt={"1"}>
                  {errors.ProjectName}
                </Text>
              )}
          </FormControl>
            </Box>
            <Box pt='2' w={'19vw'} h={'8vh'} mt={'0.5vh'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} >Shipping Address</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              w={'19vw'}
              pl={'2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              type={"text"}
              name={"Shipping_Address"}
              value={formData.Shipping_Address}
              onChange={handleChange}
              />
              { errors.Shipping_Address && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'} pt={"1"}>
                  {errors.Shipping_Address}
                </Text>
              )}
          </FormControl>
            </Box>
          <Box pt='2' w={'19vw'} h={'8vh'} mt={'0.5vh'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} >Shipping Address 2</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              w={'19vw'}
              pl={'2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              type={"text"}
              name={"Shipping_Address2"}
              value={formData.Shipping_Address2}
              onChange={handleChange}
              />
          </FormControl>
          </Box>
          <Box></Box>
          </Stack>
            <Stack divider={<StackDivider />} display={'flex'} flexDir={'column'}>
            <Box pt='2' w={'19vw'} h={'8vh'} mt={'0.5vh'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} >Shipping City</FormLabel>
            <Input
              w={'19vw'}
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              pl={'2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              type={"text"}
              name={"Shipping_City"}
              value={formData.Shipping_City}
              onChange={handleChange}
              />
              { errors.Shipping_City && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'} pt={"1"}>
                  {errors.Shipping_City}
                </Text>
              )}
          </FormControl>
            </Box>
             <Box pt='2' w={'20vw'} h={'8vh'} mt={'0.5vh'}>
              <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> State </Text>
              <Select
                onChange={(e)=>handleChange(e)}
                w={'19vw'}
                maxW={'300px'}
                minH={'5vh'}
                variant="unstyled"
                color={'web.text2'}
                pl={'2'}
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
                value={formData.Shipping_State}
                cursor={'pointer'}
                name="Shipping_State"
              >
                <option value='' className="options">Select state</option>
                {
                  USStates.map((e, i) => {
                      return(
                        <option key={i} className={'options'} value={e}>{e}</option>
                  )})
                }
            </Select>
            </Box>
            <Box pt='2' w={'19vw'} h={'8vh'} mt={'0.5vh'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'}>Shipping Zip Code</FormLabel>
            <Input
              mb={'0.5vh'}
              w={'19vw'}
              variant="unstyled"
              textColor={'web.text2'}
              pl={'2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              type={"text"}
              name={"Shipping_ZipCode"}
              value={formData.Shipping_ZipCode}
              onChange={handleChange}
              />
              { errors.Shipping_ZipCode && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'} pt={"1"}>
                  {errors.Shipping_ZipCode}
                </Text>
              )}
          </FormControl>
            </Box>
            <Box></Box>
          </Stack>
          </Box>
        </VStack>
      </form>
    );
  }