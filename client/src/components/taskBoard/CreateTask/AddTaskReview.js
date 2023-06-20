import { Box, Divider, Text, chakra, Highlight } from "@chakra-ui/react"
import { useSelector } from "react-redux"

const AddTaskReview = ({formData}) => {

  const customer = useSelector(state => state.customer_by_id)
  const invoice = useSelector(state => state.invoice)
  const project = useSelector(state => state.project_by_id)

    return(
      <>
        <Box
        overflow={'auto'}
        mt={'3vh'}
        mr={'2vw'}
        display={'flex'}
        userSelect={'none'}
        px={'2vw'}
        py={'3vh'}
        flexDir={'column'}
        color={'web.text'} 
        rounded={'md'} 
        border={'1px solid'}
        borderColor={'web.border'}
        bg={'web.sideBar'}
        >
        <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignContent={'baseline'}>
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
            {formData.Title}
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
            {formData.Description}
        </Text>
        <Divider mb={'2.5vh'}/>
        <Box mb={'1.5vh'}>
          <Text 
            fontSize={'xs'}  
            color={'web.text2'}>
            Customer
          </Text>
          <Text 
            fontSize={'md'} 
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
            fontSize={'md'} 
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
            fontSize={'md'} 
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
            fontSize={'md'} 
            fontWeight={'bold'}>
              {invoice[0]?.Naturali_Invoice ? invoice[0].Naturali_Invoice : '-'}
          </Text>
        </Box>
        </Box>
        </>
    )
}

export default AddTaskReview