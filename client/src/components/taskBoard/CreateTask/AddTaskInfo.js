import { VStack, Box, FormControl, Input, Text, FormLabel, Textarea, Select} from "@chakra-ui/react";
import '../../../assets/styleSheet.css'
import { useSelector } from "react-redux";



export function AddTaskInfo({formData, handleChange, user}) {

  const sellers = useSelector(state => state.sellers)

  return (
    <>
    <form>
      <VStack h={'40vh'}>
        <Box w={'35vw'} display={'flex'} pt={'2vh'} flexDir={'row'} justifyContent={'space-between'}>
          <Text alignSelf={'flex-start'} textColor={'web.text2'} fontWeight={'bold'} >Task Info</Text>
        </Box>
        <Box  w={'35vw'} display={'flex'} flexDir={'row'} pt={'1vh'} justifyContent={'space-between'}>
          <FormControl  pr={'2vw'}>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'name'} fontWeight={'normal'}>Assignee</FormLabel>
              <Select
              onChange={handleChange}
              mb={'0.5vh'}
              w={'12vw'}
              minH={'3vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.border'}
              _hover={{borderColor: 'web.border'}}
              cursor={'pointer'}
              value={formData.SellerID}
              name={'SellerID'}
            >
                {  
                    sellers?.map((e, i) => {
                      if(e.SellerID !== 3){
                        return(
                          <option key={i} className={'options'} value={e.SellerID}>{e.FirstName} {e.LastName}</option>
                          )
                      }
                       })
                }
            </Select>
              {/* <Input
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
              /> */}
          </FormControl>
          <FormControl pl={'2vw'}>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'name'} fontWeight={'normal'}>Due Date</FormLabel>
            <Input
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderColor={'web.border'}
              type={"date"}
              name={"DueDate"}
              value={formData.DueDate}
              onChange={handleChange}
              css={{
                '::-webkit-calendar-picker-indicator': {   
                    background: `url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) center/90% no-repeat`,    
                    cursor: 'pointer',
                    filter: 'invert(59%) sepia(7%) saturate(31%) hue-rotate(184deg) brightness(97%) contrast(92%)',
                    position: 'absolute',
                    right: 6,
                    top: 0,
                  },  
              }}
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