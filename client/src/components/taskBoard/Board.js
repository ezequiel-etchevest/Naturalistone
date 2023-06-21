import { Box, Highlight, chakra, Stack, StackDivider, Heading, Select, Text, Divider } from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import TaskCard from "./TaskCard";
import '../../assets/styleSheet.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../redux/actions-tasks";


const Board = ({setActiveCard, activeCard, user}) => {

  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  useEffect(()=>{},[tasks])

  const handleChange = (e) => {
    console.log(user)
    dispatch(getAllTasks(user[0].SellerID, e.target.value))
    setActiveCard( null)
  }

  return(
    <>
      <Box
        mt={'3vh'}
        mx={'2vw'}
        h={'87vh'}
        display={'flex'}
        userSelect={'none'}
        px={'1.5vw'}
        py={'3vh'}
        w={'30vw'}
        flexDir={'column'}
        color={'web.text'} 
        rounded={'md'} 
        border={'1px solid'}
        borderColor={'web.border'}
        bg={'web.sideBar'}
        >
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'end'}>

        <Text fontSize={'xl'} color={'web.text2'} >
        <Highlight
         query={['TASKS']}
         styles={{color: '#E47424', fontWeight:'semibold' }}
          >Tasks Board </Highlight></Text>  
       
        <Select
          mb={'0.5vh'}
          w={'6vw'}
          minH={'4.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          _hover={{borderColor: 'web.border'}}
          cursor={'pointer'}
          onChange={handleChange}
        >
        <option value='todo' className="options">To Do </option>
        <option value='done' className="options">Done</option>

            </Select>
          </Box>
        <Divider mt={'2vh'}></Divider>
        <Card>
          <CardHeader>            
          </CardHeader>
          <CardBody mt={'2vh'}>
            <Stack 
            divider={<StackDivider />} 
            maxH={'68vh'} 
            overflow={'auto'}
            css={{
              '&::-webkit-scrollbar': {
                width: '0.4vw',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#E47424',
                borderRadius: '5px',
              },
            }}>
              {
                Array.isArray(tasks) ? (
                  tasks?.map((task, i) =>{
                    return(
                      <TaskCard task={task} key={i} setActiveCard={setActiveCard} activeCard={activeCard}/>
                    )
                  })
                ):(
                  <Text>{tasks}</Text>
                )
               
              }
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </>
  )
}

export default Board