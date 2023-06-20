import { VStack, Box, FormControl, Input, Text, FormLabel, Textarea} from "@chakra-ui/react"



export function AddTaskInfo({formData, handleChange, user}) {

  return (
    <>
    <form>
      <VStack h={'40vh'}>
        <Box w={'35vw'} display={'flex'} pt={'2vh'} flexDir={'row'} justifyContent={'space-between'}>
          <Text alignSelf={'flex-start'} textColor={'web.text2'} fontWeight={'bold'} >Task Info</Text>
        </Box>
        <Box  w={'35vw'} display={'flex'} flexDir={'row'} pt={'1vh'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'name'} fontWeight={'normal'}>Assignee</FormLabel>
            <Input
              isReadOnly={true}
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderColor={'web.border'}
              type={"text"}
              name={"Title"}
              value={`${user[0].FirstName} ${user[0].LastName}`}
              />
          </FormControl>
        </Box>
        <Box  w={'35vw'} display={'flex'} flexDir={'row'} pt={'1vh'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'name'} fontWeight={'normal'}>Title</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderColor={'web.border'}
              type={"text"}
              name={"Title"}
              value={formData.Title}
              onChange={handleChange}
              />
          </FormControl>
        </Box>
        <Box w={'35vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} name={'Description'}  fontSize={'sm'}>Description</FormLabel>
          <Textarea
              resize={'none'}
              p={'1vw'}
              mb={'0.5vh'}
              minH={'13vh'}
              variant="unstyled"
              textColor={'web.text'}
              placeholder="Describe the new task here..."
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', fontStyle:'italic' }}
              size={"sm"}
              border={'1px solid'}
              borderColor={'web.border'}
              type={"text"}
              value={formData.Description}
              name="Description"
              onChange={handleChange}
              />
          </FormControl>
        </Box>
        
      </VStack>
    </form>
  </>
      )
    }