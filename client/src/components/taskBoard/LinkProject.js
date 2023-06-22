import { ButtonGroup, IconButton, Button, useToast, useDisclosure, FormLabel, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Text, Box, Input, FormControl, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiLinkAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { AddTask } from "./CreateTask/AddTask";
import AddTaskCustomer from "./CreateTask/AddTaskCustomer";
import { linkItems } from "../../redux/actions-tasks";
import { getProjectById, getCustomerProjects } from "../../redux/actions-projects";
import AddTaskProject from "./CreateTask/AddTaskProject";

export const LinkProjectModal = ({task, user, activeCard, setActiveCard}) => {
  
  const dispatch = useDispatch();
  const toastId = 'error-toast'
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const projects = useSelector(state => state.projects_by_customer_id)
  const [ formData, setFormData ] = useState({
    ProjectID: null,
  })
  const handleClose = () => {
    onClose()
  }
  
  const handleSubmit = () => {
    dispatch(linkItems(formData, user[0].SellerID, activeCard.taskID))
    setActiveCard({...activeCard, ProjectID: formData.ProjectID})
    dispatch(getProjectById(formData.ProjectID))
    setFormData({})
    onClose()
   }

  useEffect(()=>{
    if(activeCard && !projects.length){
    dispatch(getCustomerProjects(activeCard.CustomerID))
    }
  },[projects])
  return(
    <>
      <ButtonGroup
      textColor={'web.text2'}
      h={'5vh'}
      display={'flex'}
      spacing={0}
      _hover={{
      color: 'logo.orange'
      }}
      disabled={activeCard? activeCard.CustomerID ? activeCard.ProjectID ? true : false : true : true}
      >
        <IconButton
        onClick={onOpen}
        variant={'unstyled'}           
        fontSize={'xl'}
        icon={<BiLinkAlt/>}
        disabled={activeCard? activeCard.CustomerID ? activeCard.ProjectID ? true : false : true : true}

        />
        <Button
        onClick={onOpen}
        fontSize={'md'}
        variant={'unstyled'}           
        fontWeight={'normal'}
        disabled={activeCard? activeCard.CustomerID ? activeCard.ProjectID ? true : false : true : true}
        >Link Project</Button>       
    </ButtonGroup>
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size={'2xl'}
      >
      <ModalOverlay/>
      <ModalContent 
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}
        >
        <ModalHeader
        color={'web.text'}>
          Link Project
        </ModalHeader>
        <ModalCloseButton
          color={'web.text2'}
          _hover={{
            color: 'web.text'
          }} />
        <ModalBody color={'web.text2'}>
          <AddTaskProject projects={projects} setFormData={setFormData} formData={formData}/>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={formData.ProjectID ? false : true}
            colorScheme={'orange'} 
            mr={3} 
            onClick={handleSubmit}
            >
           Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
          </Modal>
    </>
    )
}

