import { Box, Divider, Text, chakra, Highlight } from "@chakra-ui/react"
import { TaskComents } from "./TaskComents"
import { useSelector } from "react-redux"

const TaskDetail = ({activeCard}) => {

  const { taskID, Description, Title, Status } = activeCard 

  const customer = useSelector(state => state.customer_by_id)
  const invoice = useSelector(state => state.invoice)
  const project = useSelector(state => state.project_by_id)
  const comments = useSelector(state => state.task_comments)
  
    return(
      <>
        <Box
        mt={'3vh'}
        mr={'2vw'}
        h={'87vh'}
        display={'flex'}
        userSelect={'none'}
        px={'2vw'}
        py={'3vh'}
        w={'30vw'}
        flexDir={'column'}
        color={'web.text'} 
        rounded={'md'} 
        border={'1px solid'}
        borderColor={'web.border'}
        bg={'web.sideBar'}
        >
        <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignContent={'baseline'}>
        <chakra.h1
          fontSize={'2xl'}
          textColor={'#E47424'}
          fontWeight={'normal'}
          maxH={'17vh'}
          >{`#${taskID}`}
        </chakra.h1>
        <Box>
          <Text 
            fontSize={'xs'}  
            color={'web.text2'}>
            Status
          </Text>
          <Text 
            fontSize={'lg'} 
            fontWeight={'bold'}>
              {Status === 'todo' ? 'To Do' : 'Done'}
          </Text>
        </Box>
        </Box>
        <Text
          placeContent={'flex-start'}
          textAlign={'start'}
          fontSize={'2xl'}
          pt={'2vh'}
          color={'web.text'}
          fontWeight={'normal'}
          maxH={'17vh'}
          mb={'2vh'}
          >
            {Title}
        </Text>
        <Text
          placeContent={'flex-start'}
          textAlign={'start'}
          fontSize={'md'}
          mb={'4vh'}
          color={'web.text'}
          fontWeight={'normal'}
          maxH={'17vh'}
          >
            {Description}
        </Text>
        <Divider mb={'2.5vh'}/>
        <Box mb={'1.5vh'}>
          <Text 
            fontSize={'xs'}  
            color={'web.text2'}>
            Customer
          </Text>
          <Text 
            fontSize={'lg'} 
            fontWeight={'bold'}>
            { customer.Contact_Name ? customer.Contact_Name : '-'}
          </Text>
        </Box>
        <Box  mb={'1.5vh'}>
          <Text 
            fontSize={'xs'}  
            color={'web.text2'}>
            Company
          </Text>
          <Text 
            fontSize={'lg'} 
            fontWeight={'bold'}>
              {customer.Company ? customer.Company : '-'}
          </Text>
        </Box>
        <Box mb={'1.5vh'}>
          <Text 
            fontSize={'xs'}  
            color={'web.text2'}>
            Project
          </Text>
          <Text 
            fontSize={'lg'} 
            fontWeight={'bold'}>
              {project.ProjectName ? project.ProjectName : '-'}
          </Text>
        </Box>
        <Box mb={'1.5vh'}>
          <Text 
            fontSize={'xs'}  
            color={'web.text2'}>
            Invoice
          </Text>
          <Text 
            fontSize={'lg'} 
            fontWeight={'bold'}>
              {invoice.Naturali_Invoice ? invoice.Naturali_Invoice : '-'}
          </Text>
        </Box>
        <Divider mb={'2vh'}/>
          <TaskComents comments={comments}/>
        </Box>
        </>
    )
}

export default TaskDetail