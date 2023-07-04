import { Box, Highlight, chakra, Stack, StackDivider, Heading, Select, Text, Divider } from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import TaskCard from "./TaskCard";
import '../../assets/styleSheet.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../redux/actions-tasks";
import { getSellers } from "../../redux/actions-sellers";


const Board = ({setActiveCard, activeCard, user, filters, setFilters}) => {

  const tasks = useSelector(state => state.tasks)
  const sellers = useSelector(state => state.sellers)
  const dispatch = useDispatch()


  useEffect(()=>{},[tasks])
  useEffect(()=>{
    if(!sellers.length) dispatch(getSellers())
    },[sellers])


  const handleChange = (e) => {
    const {name, value} = e.target
    setFilters({
      ...filters,
      [name]:value
    })
    if(name === 'SellerID')  dispatch(getAllTasks(value, filters.Status, user[0].SellerID))
    if(name === 'Status')  dispatch(getAllTasks( filters.SellerID, value, user[0].SellerID))
  
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

        {/*Filter by seller */}
        <Box display={'flex'} flexDir={'row'}>
        {
          user[0].Secction7Flag === 1 ? (
            <Select
            onChange={(e)=>handleChange(e)}
            mb={'0.5vh'}
            w={'8vw'}
            minH={'4.5vh'}
            variant="unstyled"
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            _hover={{borderColor: 'web.border'}}
            cursor={'pointer'}
            value={filters.SellerID}
            name="SellerID"
          >
            <option value="" disabled hidden>Filter by Seller</option>
            <option value={3} className="options">All seller</option>
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
          ):(null)
        }
        <Select
          ml={'1vw'}
          mb={'0.5vh'}
          w={'5vw'}
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
          name="Status"
          >
        <option value='todo' className="options">To Do </option>
        <option value='done' className="options">Done</option>
            </Select>
            </Box>
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
                      <TaskCard user={user} task={task} key={i} setActiveCard={setActiveCard} activeCard={activeCard}/>
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