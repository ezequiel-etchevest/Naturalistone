import { Box, Heading, Highlight, Text } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { cleanCustomerDetail, getCustomerById } from "../../redux/actions-customers";
import { getProjectById, cleanProjectDetail } from "../../redux/actions-projects";
import { getInvoiceById, cleanInvoiceDetail } from "../../redux/actions-invoices";
import { getComments } from "../../redux/actions-tasks";

const TaskCard = ({task, setActiveCard, activeCard, user }) => {
 
  const { taskID, Description, Title, Status, DueDate, SellerReference  } = task 

  const handleClick = () => {
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
        <Heading size='xs' textTransform='uppercase' display={'flex'}justifyContent={'space-between'}>
          <Box display={'flex'}>
            <Text mr={'0.75vw'} color={'logo.orange'}>#{task?.taskID}</Text>{Title}
            </Box>
            {
              user[0]?.Secction7Flag === 1 && (
                <Text mr={'1.5vw'}>{SellerReference}</Text>
              )
            }
        </Heading>
        <Box display={'flex'} flexDir={'row'} alignItems={'baseline'} >
        <Text pt='2' fontSize='xs' color={'web.text2'} mr={'1vw'}>Due Date</Text><Text pt='2' fontSize='sm'>{DueDate.split('T')[0]}</Text> 
        </Box>
        <Text pt='2' fontSize='sm'>
         {Description}
        </Text>
      </Box>
    </>
  )
}

export default TaskCard