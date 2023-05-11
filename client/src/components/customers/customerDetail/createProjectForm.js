import {
    FormControl,
    Input,
    VStack,
    Box,
    Select,
    Text
  } from '@chakra-ui/react';
  import AutocompleteState from '../AutocompleteState';
  import '../../../assets/styleSheet.css'
  
  export default function CreateProjectForm({formData, setFormData, validateProject, errors, setErrors, setChangeInput}) {
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      // Actualizas solo la propiedad que cambió en el objeto de formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      setErrors(
        validateProject({
          ...formData,
          [name]: value,
        })
      )
      setChangeInput(true)
    };
  
    return (
      <form>
        <VStack spacing={4}>
          <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} w={'45vw'}>
            <FormControl w={'45vw'} >
              <Input
                mb={'0.5vh'}
                w={'45vw'}
                minH={'4.5vh'}
                variant="unstyled"
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                size={"sm"}
                borderBottomWidth={"2px"}
                borderBottomColor={'web.text2'}
                placeholder={'Project Name'}
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
          <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} w={'45vw'}>
            <FormControl w={'20vw'}>
              <Input
                mb={'0.5vh'}
                w={'20vw'}
                minH={'4.5vh'}
                variant="unstyled"
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                size={"sm"}
                borderBottomWidth={"2px"}
                borderBottomColor={'web.text2'}
                placeholder={'Shipping Address'}
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
            <FormControl w={'20vw'}>
              <Input
                mb={'0.5vh'}
                w={'20vw'}
                minH={'4.5vh'}
                variant="unstyled"
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                size={"sm"}
                borderBottomWidth={"2px"}
                borderBottomColor={'web.text2'}
                placeholder={'City'}
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
          <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} w={'45vw'}>
            <FormControl  w={'45vw'}>
            <AutocompleteState 
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              validate={validateProject}
              setErrors={setErrors}
            />
            </FormControl>
            <FormControl  w={'20vw'}>
              <Input
                mb={'0.5vh'}
                w={'20vw'}
                minH={'4.5vh'}
                variant="unstyled"
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                size={"sm"}
                borderBottomWidth={"2px"}
                borderBottomColor={'web.text2'}
                placeholder={'Zip Code'}
                type={"text"}
                name="ZipCode"
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
        </VStack>
      </form>
    );
  }