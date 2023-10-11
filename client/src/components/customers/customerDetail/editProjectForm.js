import {
    FormControl,
    Input,
    VStack,
    Box,
    Text,
    FormLabel,
    Select
  } from '@chakra-ui/react';
  import AutocompleteState, { USStates } from '../AutocompleteState';
  import '../../../assets/styleSheet.css';
 
  
  export default function EditProjectForm({formData, setFormData, validateCompletedInputsProject, errors, setErrors}) {
  
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
    };
  
    return (
      <form>
        <VStack spacing={4}>
          <Box w={'22vw'} display={'flex'} flexDir={'row'} pt={'4vh'} justifyContent={'space-between'}>
            <FormControl>
              <FormLabel textColor={'web.text2'} fontSize={'sm'} >Project Name</FormLabel>
                <Input
                mb={'0.5vh'}
                variant="unstyled"
                textColor={'web.text'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                size={"sm"}
                borderBottomWidth={"2px"}
                borderBottomColor={'web.text2'}
                type={"text"}
                name={"ProjectName"}
                value={formData.ProjectName}
                onChange={handleChange}
                />
              { errors.ProjectName && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.ProjectName}
                </Text>
              )}
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'}  justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} >Shipping Address</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Shipping_Address"}
              value={formData.Shipping_Address}
              onChange={handleChange}
              />
              { errors.Shipping_Address && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.Shipping_Address}
                </Text>
              )}
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'}  justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} >Shipping City</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Shipping_City"}
              value={formData.Shipping_City}
              onChange={handleChange}
              />
              { errors.Shipping_City && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.Shipping_City}
                </Text>
              )}
          </FormControl>
        </Box>
        <Box w={'22vw'} h={'8vh'} mt={'0.5vh'}>
              <Text textColor={'web.text2'} fontSize='sm' fontWeight={'semibold'}> State </Text>
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
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'}>Shipping Zip Code</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Shipping_ZipCode"}
              value={formData.Shipping_ZipCode}
              onChange={handleChange}
              />
              { errors.Shipping_ZipCode && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.Shipping_ZipCode}
                </Text>
              )}
          </FormControl>
        </Box>
        </VStack>
      </form>
    );
  }