import { useDispatch } from 'react-redux';
import {
  FormControl,
  Input,
  VStack,
  Box,
  Select,
  Text
} from '@chakra-ui/react';
import AutocompleteState from './AutocompleteState';
import '../../assets/styleSheet.css'
import { formatNumber } from '../../utils/formattedNumber';

export default function CreationCustomerForm({formData, setFormData, validate, errors, setErrors}) {

  // const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Actualizas solo la propiedad que cambió en el objeto de formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors(
      validate({
        ...formData,
        [name]: value,
      })
    );
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
              placeholder={'Full Name'}
              type={"text"}
              name={"Contact_Name"}
              value={formData.Contact_Name}
              onChange={handleChange}
              />
              { errors.Contact_Name && (
                <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                  {errors.Contact_Name}
                </Text>
              )}
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
        <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} w={'45vw'}>
          <FormControl  w={'45vw'}>
            <AutocompleteState 
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              validate={validate}
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
              value={formatNumber(formData.Phone)}
              onChange={handleChange}
            />
            { errors.Phone && (
              <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                {errors.Phone}
              </Text>
              )}
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
            { errors.Email && (
              <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                {errors.Email}
              </Text>
              )}
          </FormControl>
        </Box>
      </VStack>
    </form>
  );
}
