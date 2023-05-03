import { useState } from 'react';
import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const USStates = [
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

export default function AutocompleteState({formData, setFormData}) {
  
  const [filteredStates, setFilteredStates] = useState(USStates);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      State : value,
    }))

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
          w={'20vw'}
          minH={'4.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          placeholder={'State'}
          type="text"
          value={formData.State}
          onChange={handleInputChange}
          list="stateOptions"
        />
        <datalist id="stateOptions">
          {filteredStates.map((state) => (
            <option key={state} value={state} />
          ))}
        </datalist>
      </FormControl>
    </VStack>
  );
}
