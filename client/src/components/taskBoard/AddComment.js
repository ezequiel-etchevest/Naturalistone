import { ButtonGroup, IconButton, Button, useToast, useDisclosure, FormLabel, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Text, Box, Input, FormControl, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { BiCommentAdd } from 'react-icons/bi';
import { useDispatch } from 'react-redux'
import { postComment } from "../../redux/actions-tasks";

export const AddCommentModal = ({task, user, activeCard}) => {
  
  const dispatch = useDispatch();
  const toastId = 'error-toast'
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [task_comment, setTask_comment ] = useState({
    By: userLocal.SellerID,
    Description: '',
    Date:new Date().toISOString().split('T')[0],
    TaskID: ''
  })
  const handleClose = () => {
    setTask_comment({})
    onClose()
  }
  const handleChange = (e) => {
    setTask_comment({
      ...task_comment,
      Description: e.target.value,
      TaskID: activeCard.taskID,
      By: userLocal.SellerID,
      Date:new Date().toISOString().split('T')[0],
    })
  }
  const handleSubmit = () => {
    if(!task_comment.Description.length) {
      if(!toast.isActive(toastId)){
        return toast(({
          id: toastId,
          title: "Error",
          description: 'To add a comment you must write a description',
          status: "error",
          duration: 5000,
          isClosable: true,
          }))
    }}else{
      console.log(task_comment)
      dispatch(postComment(task_comment))
      handleClose()
    }}
  
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
      disabled={ activeCard ? false : true}
      >
        <IconButton
        onClick={onOpen}
        variant={'unstyled'}           
        fontSize={'xl'}
        icon={<BiCommentAdd/>}
        disabled={ activeCard ? false : true}/>
        <Button
        onClick={onOpen}
        fontSize={'md'}
        variant={'unstyled'}           
        fontWeight={'normal'}
        disabled={ activeCard ? false : true}
        >Add Comment</Button>       
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
          Add Comment 
        </ModalHeader>
        <ModalCloseButton
          color={'web.text2'}
          _hover={{
            color: 'web.text'
          }} />
        <ModalBody color={'web.text2'}>
        <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          <FormControl>
            <Textarea
              mb={'0.5vh'}
              variant="unstyled"
              textColor={'web.text'}
              placeholder="Write your comment here..."
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', fontStyle:'italic', pl:'1vw' }}
              size={"sm"}
              border={'1px solid'}
              borderColor={'web.border'}
              type={"text"}
              value={task_comment.Description}
              onChange={handleChange}
              />
          </FormControl>
        </Box>
        </ModalBody>
        <ModalFooter>
          <Button
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

