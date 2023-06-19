import { Box, Heading, Highlight, Text } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { getCustomerById } from "../../redux/actions-customers";
import { getProjectById } from "../../redux/actions-projects";
import { getInvoiceById } from "../../redux/actions-invoices";
import { getComments } from "../../redux/actions-tasks";

const TaskCard = ({task, setActiveCard, activeCard }) => {

  const { taskID, Description, Title, Status, CustomerID, ProjectID, InvoiceID, SellerID } = task 
  const dispatch = useDispatch()
  const handleClick = () => {
    if(CustomerID) dispatch(getCustomerById(CustomerID))
    if(ProjectID) dispatch(getProjectById(ProjectID))
    if(InvoiceID) dispatch(getInvoiceById(InvoiceID))
    dispatch(getComments(taskID))
    setActiveCard(task)
  }
  return(
    <>
    <Box
      onClick={handleClick} 
      key={taskID}
      bg={activeCard?.taskID === taskID ?  'web.navBar' : 'unset'}
      color={activeCard?.taskID === taskID ?  'logo.orange' : 'unset'}
      _hover={{
        bg: 'web.navBar',
        color: 'logo.orange'
      }}
      py={'1vh'}>
        <Heading size='xs' textTransform='uppercase' display={'flex'}>
          <Text mr={'0.75vw'} color={'logo.orange'}>#{task.taskID}</Text>{Title}
        </Heading>
        <Text pt='2' fontSize='sm'>
         {Description}
        </Text>
      </Box>
    </>
  )
}

export default TaskCard