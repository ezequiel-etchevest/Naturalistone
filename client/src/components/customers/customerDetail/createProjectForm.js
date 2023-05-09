import {
    FormControl,
    Input,
    VStack,
    Box,
    Select
  } from '@chakra-ui/react';
  import AutocompleteState from '../AutocompleteState';
  import '../../../assets/styleSheet.css'
  
  export default function CreateProjectForm({formData, setFormData}) {
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      // Actualizas solo la propiedad que cambió en el objeto de formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
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
            </FormControl>
          </Box>
          <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} w={'45vw'}>
            <FormControl  w={'45vw'}>
              <AutocompleteState formData={formData} setFormData={setFormData}/>
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
            </FormControl>
          </Box>
        </VStack>
      </form>
    );
  }