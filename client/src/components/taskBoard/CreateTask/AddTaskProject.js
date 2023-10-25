import { 
    Text,
    HStack,
    Center,
    Spinner, 
    Box,
    } from "@chakra-ui/react"
  import '../../../assets/styleSheet.css'
  import { AddTaskProjectList } from "./AddTaskProjectList";
import { CreateNewProject } from "../../customers/customerDetail/createProject";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCustomerById } from "../../../redux/actions-customers";

  const AddTaskProject = ({ setFormData, formData, setDisable}) =>{

  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects_by_customer_id)
  const customer = useSelector(state => state.customer_by_id)

  const custID = formData.CustomerID //agregando esta linea para ratificar que llegue correctamente el iD a formulario createProject

  useEffect(()=>{
    if(formData.CustomerID && !Object.entries(customer).length ){
      dispatch(getCustomerById(formData.CustomerID))
    }
  }, [customer])
// console.log("soy projects", projects)
  return(
    <>
      <Text fontWeight={'semibold'}  ml={'1vw'} fontSize={'lg'}  color={'web.text2'} alignSelf={'flex-start'}>If you want to link a project, please select one from the list:</Text>
      <HStack
        display={'flex'}
        justifyContent={'flex-end'}
        h={'6vh'}
        mr={'1.2vw'}
        mt={'2vh'}
        mb={'2vh'}
        >
          <Box placeSelf={'end'}mr={'2vw'} display={'flex'} flexDir={'row'}>
              <CreateNewProject customer={customer} custID={custID}/>
          </Box>
        </HStack>
        { 
        projects.length ?
          
          // Array.isArray(projects) ?
          <>
            <Box display={'flex'} flexDir={'column'} >
            <AddTaskProjectList 
              projects={projects} 
              setFormData={setFormData}
              formData={formData}
              setDisable={setDisable}
              />
            </Box>
            </>
            :
            <>
            <Box  maxH={'50vh'} minH={'50vh'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
            <Text mb={'1vh'}>This customer does not have any assigned projects yet.</Text>
            <CreateNewProject customer={customer} custID={custID}/>
            </Box>
            </>
          // :
          // <Center maxH={'50vh'} minH={'50vh'}>
          //   <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
          // </Center>
        }
    </>
    )
  }
  
  export default AddTaskProject