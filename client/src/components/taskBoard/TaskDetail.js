import { Box, Divider, Text, chakra, Highlight } from "@chakra-ui/react"
import { TaskComents } from "./TaskComents"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getCustomerById } from "../../redux/actions-customers";
import { getProjectById } from "../../redux/actions-projects";
import { getInvoiceById } from "../../redux/actions-invoices";
import { getComments } from "../../redux/actions-tasks";
import { getSellers } from "../../redux/actions-sellers";

const TaskDetail = ({activeCard, user}) => {

  const { taskID, Description, Title, Status, CompletedDate, CustomerID, ProjectID, InvoiceID } = activeCard 
  const sellers = useSelector(state => state.sellers)
  const customer = useSelector(state => state.customer_by_id)
  const invoice = useSelector(state => state.invoice)
  const project = useSelector(state => state.project_by_id)
  const comments = useSelector(state => state.task_comments)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(CustomerID) dispatch(getCustomerById(CustomerID))
    if(ProjectID) dispatch(getProjectById(ProjectID))
    if(InvoiceID) dispatch(getInvoiceById(InvoiceID))
    if(!sellers.length) dispatch(getSellers())
    dispatch(getComments(taskID))
  }, [activeCard])
    const seller = sellers.find(e => e.SellerID === activeCard.SellerID)

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
          display={'flex'}
          flexDir={'row'}
          fontSize={'2xl'}
          textColor={'#E47424'}
          fontWeight={'normal'}
          maxH={'17vh'}
          >{`#${taskID}`}<Text ml={'1vw'} textColor={'web.text2'}>{user[0].Secction7Flag === 1 ? `${seller.FirstName} ${seller.LastName}`: null}</Text>
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
        {
          Status === 'done' && (
            <Box mb={'1.5vh'}>
            <Text 
              fontSize={'xs'}  
              color={'web.text2'}>
              Done on
            </Text>
            <Text 
              fontSize={'lg'} 
              fontWeight={'bold'}>
              {CompletedDate?.replace('T', ' ').split('.')[0]}
            </Text>
          </Box>
          )
        }

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
              {project[0]?.ProjectName ? project[0].ProjectName : '-'}
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
              {invoice[0]?.Naturali_Invoice ? invoice[0]?.Naturali_Invoice : '-'}
          </Text>
        </Box>
        <Divider mb={'2vh'}/>
          <TaskComents comments={comments}/>
        </Box>
        </>
    )
}

export default TaskDetail