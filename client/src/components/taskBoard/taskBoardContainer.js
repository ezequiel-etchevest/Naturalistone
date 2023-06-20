import React, {  useEffect, useState } from "react";
import { Box, Center, Text } from '@chakra-ui/react';
import Board from "./Board";
import TaskDetail from "./TaskDetail";
import { TaskBoardToolbar } from "./TaskBoardToolbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from '../../redux/actions-tasks'

const TaskBoardContainer = ({user}) => {

    const [ activeCard, setActiveCard ] = useState(null)
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    useEffect(()=>{
      if(!tasks.length) dispatch(getAllTasks(user[0].SellerID))
    }, [tasks])
    return(
    <>
      <Box userSelect={'none'} h={'92vh'} ml={'16vw'} bg={'web.bg'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
        <Box display={'flex'} flexDir={'row'}>
       <Board setActiveCard={setActiveCard} activeCard={activeCard}/>
       {
        activeCard ? (
            <TaskDetail activeCard={activeCard}/>
        ):(
            <Center
            mt={'3vh'}
            mr={'2vw'}
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
                <Text color={'web.text2'}>Please click on a task to see its details</Text>
            </Center>
        )
       }
       </Box>
       <TaskBoardToolbar user={user} activeCard={activeCard}/>

      </Box> 
      </>
    )

  }
export default TaskBoardContainer;