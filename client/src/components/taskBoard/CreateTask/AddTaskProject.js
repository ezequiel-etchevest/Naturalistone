import { 
    Text,
    IconButton,
    Input,
    Divider,
    HStack,
    Box,
    Center,
    Spinner 
    } from "@chakra-ui/react"
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import {BiSearch} from 'react-icons/bi'
  import '../../../assets/styleSheet.css'
  import { AddTaskProjectList } from "./AddTaskProjectList";

  const AddTaskProject = ({ setFormData, formData, setDisable}) =>{
  
  const projects = useSelector(state => state.projects_by_customer_id)
  
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
        </HStack>
        { 
        projects.length ?
          Array.isArray(projects) ?
            <AddTaskProjectList 
              projects={projects} 
              setFormData={setFormData}
              formData={formData}
              setDisable={setDisable}
              />
            :
            <Text maxH={'50vh'} minH={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>No customers match this filters</Text>
          :
          <Center maxH={'50vh'} minH={'50vh'}>
            <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
          </Center>
        }
    </>
    )
  }
  
  export default AddTaskProject