import {
    Text,
    Box,
    HStack,
    Input,
    Tooltip,
    Divider,
    Select,
    } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CreateNewProject } from "../../customers/customerDetail/createProject";
import '../../../assets/styleSheet.css'
import CreateSampleProjectList from "./CreateSampleProjectList";


const CreateSampleProjects = ({ formData, setFormData, setDisable, errorsTrackingNumber, setErrorsTrackingNumber }) => {

  const projects = useSelector(state => state.projects_by_customer_id)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      variables: {
        [name]: value,
      },
    });
    console.log(formData.variables.trackingNumber)
  };
  
//   useEffect(() => {
//     if(formData.variables.shipVia && formData.variables.method && formData.variables.paymentTerms && formData.variables.estDelivDate && formData.project.ProjectName){
//       setDisable(false)
//     } else { 
//       setDisable(true)}
// }, [formData.variables, formData.project]);

  return(

  <>
    <Box color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'}>
      <Box mt={'10px'}>
        <Text ml={'2vw'} mt={'2vh'} mb={'2vh'} fontSize={'lg'}w={'16vw'} color={'white'} alignSelf={'flex-start'}> 
        Tracking
        </Text>
        <Text fontSize='sm' fontWeight={'semisemibold'} ml={'4.5vw'}> Tracking Number </Text>
        <Input
          mb={'0.5vh'}
          w={'25vw'}
          minH={'4.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          type={"text"}
          name={"trackingNumber"}
          ml={'4.5vw'}
          value={formData.variables.trackingNumber || ""}
          onChange={(e)=>handleChange(e)}
          />
            { errorsTrackingNumber.trackingNumber && (
                <Text mt={'0.5vh'} position={'absolute'} color={'web.error'} fontSize={'xs'} ml={'5vw'}>
                  {errorsTrackingNumber.trackingNumber}
                </Text>
            )}
      </Box>
      <Box display={'flex'} alignItems={'end'} h={'10vh'}>
      <Text ml={'2vw'} mt={'5vh'} mb={'5vh'} fontSize={'lg'}w={'16vw'} color={'white'} alignSelf={'flex-start'}>Select Project</Text>
      </Box>
        <CreateSampleProjectList projects={ projects } formData={formData} setFormData={setFormData} setDisable={setDisable}/>
    </Box>
  </>
)}

export default CreateSampleProjects