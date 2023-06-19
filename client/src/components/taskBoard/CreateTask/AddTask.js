import { ButtonGroup, IconButton, Progress, Button, useToast, useDisclosure, FormLabel, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Text, Box, Input, FormControl, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { BiTask } from 'react-icons/bi';
import { useDispatch } from 'react-redux'
import { postComment } from "../../../redux/actions-tasks";
import { AddTaskInfo } from "./AddTaskInfo";

export const AddTask = ({task, user, activeCard}) => {
  
  const dispatch = useDispatch();
  const toastId = 'error-toast'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ progress, setProgress ] = useState(20)
  const toast = useToast()
  const [formData, setFormData ] = useState({
    Title: '',
    Description: '',
    CustomerID: '',
    ProjectID: '',
    InvoiceID: '',
    SellerID: user[0].SellerID
  })
  const handleClose = () => {
    // setTask_comment({})
    onClose()
  }
  const handleChange = (e) => {
    // setTask_comment({
    //   ...task_comment,
    //   Description: e.target.value,
    //   TaskID: activeCard.taskID
    // })
  }
  const handleNextButton = () => {}
  const handlePreviousButton = () => {}
  const handleSubmit = () => {
    // if(!task_comment.Description.length) {
    //   if(!toast.isActive(toastId)){
    //     return toast(({
    //       id: toastId,
    //       title: "Error",
    //       description: 'To add a comment you must write a description',
    //       status: "error",
    //       duration: 5000,
    //       isClosable: true,
    //       }))
    // }}else{
    //   dispatch(postComment(task_comment))
    //   handleClose()
    //}
  }
  
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
      >
        <IconButton
        onClick={onOpen}
        variant={'unstyled'}           
        fontSize={'xl'}
         icon={<BiTask/>}
        />
        <Button
        onClick={onOpen}
        fontSize={'md'}
        variant={'unstyled'}           
        fontWeight={'normal'}
         >Create New Task</Button>       
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
        <Progress
        value={progress} 
        colorScheme={"orange"} 
        mb={'2vh'} 
        background={'web.border'} 
        size={'sm'} 
        borderTopRightRadius={'md'}
        borderTopLeftRadius={'md'}/>
        <ModalHeader
        color={'web.text'}>
          Add New Task
        </ModalHeader>
        <ModalCloseButton
          color={'web.text2'}
          _hover={{
            color: 'web.text'
          }} />
        <ModalBody color={'web.text2'}>
          {
            progress === 20 && (
              <AddTaskInfo formData={formData} setFormData={setFormData} user={user}/>
            )
          }
        </ModalBody>
        <ModalFooter display={'flex'} justifyContent={'space-between'}>
              <Button visibility={progress === 25 ? 'hidden' : 'unset'} colorScheme='orange' mr={3} onClick={()=>handlePreviousButton()}>
              Prev
              </Button>
              {
              progress === 100 ? (
                <Button colorScheme='orange' mr={3} onClick={(e)=>handleSubmit(e)}>
                  Submit
                </Button>
              ):(
                <Button colorScheme='orange' mr={3} onClick={()=>handleNextButton()}>
                  Next
                </Button>
              )
              }
            </ModalFooter>
      </ModalContent>
          </Modal>
    </>
    )
}

