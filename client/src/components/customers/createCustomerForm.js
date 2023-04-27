import { useDispatch } from 'react-redux';
import {
  FormControl,
  Input,
  VStack,
  Box,
  Select
} from '@chakra-ui/react';
import AutocompleteState from './AutocompleteState';
import '../../assets/styleSheet.css'

export default function CreationCustomerForm({formData, setFormData}) {

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Actualizas solo la propiedad que cambió en el objeto de formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDiscountSelect = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      DiscountID: e.target.value,
    }));
  }

  return (
    <form>
      <VStack spacing={4}>
        <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} w={'45vw'}>
          <FormControl w={'20vw'} >
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
              placeholder={'First Name'}
              type={"text"}
              name={"Name"}
              value={formData.Name}
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
              placeholder={'Last Name'}
              type={"text"}
              name={"LastName"}
              value={formData.LastName}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
        <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} w={'45vw'}>
          <FormControl w={'45vw'}>
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
              placeholder={'Address'}
              type={"text"}
              name={"Address"}
              value={formData.address}
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
            placeholder={'Company'}
            type={"text"}
            name={"Reference"}
            value={formData.Reference}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl w={'20vw'}>
          <Select
            mb={'0.5vh'}
            w={'20vw'}
            minH={'4.5vh'}
            variant="unstyled"
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            name={"discountID"}
            onChange={handleDiscountSelect}
            >
            <option className='options' disable hidden value={''}>Select Discount</option>
            <option className='options' value={1}>0%</option>
            <option className='options' value={2}>5%</option>
            <option className='options' value={3}>10%</option>
            <option className='options' value={4}>15%</option>
          </Select>
        </FormControl>
        </Box>
        <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} w={'45vw'} spacing={4}>
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
              placeholder={'Phone'}
              type={"text"}
              name={"Phone"}
              value={formData.Phone}
              onChange={handleChange}
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
              placeholder={'E-mail'}
              type={"email"}
              name={'Email'}
              value={formData.Email}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
      </VStack>
    </form>
  );
}
