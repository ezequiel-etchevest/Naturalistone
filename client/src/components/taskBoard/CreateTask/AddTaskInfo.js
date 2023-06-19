import { VStack, Box, FormControl, Input, Text, FormLabel, Textarea} from "@chakra-ui/react"



export function AddTaskInfo({formData, setFormData, validate, errors, setErrors, setChangeInput, handleChange, user}) {

console.log(user)
  return (
    <>
    <form>
      <VStack h={'40vh'}>
        <Box w={'22vw'} display={'flex'} pt={'2vh'} flexDir={'row'} justifyContent={'space-between'}>
          <Text alignSelf={'flex-start'} textColor={'web.text2'} fontWeight={'bold'} >Task Info</Text>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} pt={'4vh'} justifyContent={'space-between'}>
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
              type={"text"}
              name={"Title"}
              value={`${user[0].FirstName} ${user[0].LastName}`}
              />
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} pt={'4vh'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'name'} fontWeight={'normal'}>Title</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              type={"text"}
              name={"Title"}
              value={formData.Title}
              onChange={handleChange}
              />
          </FormControl>
        </Box>
        <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
          <FormLabel textColor={'web.text2'}name={'email'}  fontSize={'sm'}>Description</FormLabel>
          <Textarea
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              placeholder="Write your comment here..."
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', fontStyle:'italic', pl:'1vw' }}
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