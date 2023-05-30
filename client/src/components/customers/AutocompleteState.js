import { useEffect, useState } from 'react';
import { FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';

export const USStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Non-US locations"
    ];

export default function AutocompleteState({formData, setFormData, errors, validate, setErrors, name}) {
  
  const [filteredStates, setFilteredStates] = useState(USStates);

  const handleInputChange = (event) => {
    setErrors({})
    const name = event.target.name
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name] : value,
    }))
    setErrors(
      validate({
        ...formData,
        [name]: [value]
      })
    )

    // Filtrar los estados que incluyen el valor ingresado
    const filtered = USStates.filter((state) =>
      state.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStates(filtered);
  };

  return (
    <VStack>
      <FormControl>
        <Input
          mb={'0.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          type="text"
          name={name}
          value={formData.State}
          onChange={handleInputChange}
          list="stateOptions"
        />
          { errors.State && (
            <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
              {errors.State}
            </Text>
              )}
        <datalist id="stateOptions">
          {filteredStates.map((state) => (
            <option key={state} value={state} />
            ))}
        </datalist>
      </FormControl>
    </VStack>
  );
}
