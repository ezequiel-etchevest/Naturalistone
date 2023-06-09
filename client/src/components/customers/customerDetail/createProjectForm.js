import {
    FormControl,
    Input,
    VStack,
    Box,
    Text,
    FormLabel
  } from '@chakra-ui/react';
  import AutocompleteState from '../AutocompleteState';
  import '../../../assets/styleSheet.css';
 
  
  export default function CreateProjectForm({formData, setFormData, validateCompletedInputsProject, errors, setErrors, setChangeInput}) {
  
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
        <VStack spacing={4}>
          <Box w={'22vw'} display={'flex'} flexDir={'row'} pt={'4vh'} justifyContent={'space-between'}>
            <FormControl>
              <FormLabel textColor={'web.text2'} fontSize={'sm'} fontWeight={'normal'}>Project Name</FormLabel>
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
          <FormLabel textColor={'web.text2'} fontSize={'sm'} fontWeight={'normal'}>Shipping Address</FormLabel>
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
          <FormLabel textColor={'web.text2'} fontSize={'sm'} fontWeight={'normal'}>City</FormLabel>
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
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
        <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'}>State</FormLabel>
            <AutocompleteState 
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              validate={validateCompletedInputsProject}
              setErrors={setErrors}
              name={'Shipping_State'}
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