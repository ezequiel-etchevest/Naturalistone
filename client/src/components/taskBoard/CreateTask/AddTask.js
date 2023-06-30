import { ButtonGroup, IconButton, Progress, Button, useToast, useDisclosure, FormLabel, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Text, Box, Input, FormControl, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaTasks } from 'react-icons/fa';
import { useDispatch } from 'react-redux'
import { AddTaskInfo } from "./AddTaskInfo";
import AddTaskCustomer  from "./AddTaskCustomer";
import AddTaskProject  from "./AddTaskProject";
import { getCustomerById, getCustomerInvoices, getCustomers } from "../../../redux/actions-customers";
import { useSelector } from "react-redux";
import { getInvoiceById, getInvoicesBySeller } from "../../../redux/actions-invoices";
import AddTaskInvoice from "./AddTaskInvoice";
import { getProjectById } from "../../../redux/actions-projects";
import AddTaskReview from "./AddTaskReview";
import { postTask } from "../../../redux/actions-tasks";

export const AddTask = ({ user, filters, setFilters}) => {
  

  const customers = useSelector(state => state.customers)
  const seller_invoices = useSelector(state => state.seller_invoices)
  const dispatch = useDispatch();
  const toastId = 'error-toast'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ progress, setProgress ] = useState(20)
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const toast = useToast()
  const [formData, setFormData ] = useState({
    Title: '',
    Description: '',
    CustomerID: null,
    ProjectID: null,
    InvoiceID: null,
    DueDate: new Date().toISOString().split('T')[0],
    SellerID: userLocal.SellerID === 3 ? ('') : (userLocal.SellerID) ,
    Assigner: userLocal.SellerID
  })

  const handleClose = () => {
    setProgress(20)
    setFormData({})
    onClose()
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleNextButton = () => {
    if(progress == 20){
      if(formData.Title && formData.Description){
        return setProgress(progress + 20)
      }else{
        if(!toast.isActive(toastId)){
          return toast(({
            id: toastId,
            title: "Error",
            description: 'All fields must be completed',
            status: "error",
            duration: 5000,
            isClosable: true,
            }))
          }
      }}
      if(progress === 40){
        if(formData.CustomerID) return setProgress(progress + 20)
        else return setProgress(progress + 40)
      } 
      if(progress === 60){
        if(formData.CustomerID) dispatch(getCustomerInvoices(formData.CustomerID))
        return setProgress(progress + 20)
      }
       
      if(progress === 80){
        if(formData.CustomerID) dispatch(getCustomerById(formData.CustomerID))
        if(formData.ProjectID) dispatch(getProjectById(formData.ProjectID))
        if(formData.InvoiceID) dispatch(getInvoiceById(formData.InvoiceID))
        return setProgress(progress + 20)
      }
    }
  const handlePreviousButton = () => {
    if(progress === 80 ){
      if(formData.CustomerID) return setProgress(progress - 20)
      else return setProgress(progress - 40)
    }else return setProgress(progress - 20)
  }

  const handleSubmit = () => {
    if(!formData.SellerID) setFormData({...formData, SellerID: user[0].SellerID})
    dispatch(postTask(formData, 'todo'))
    setFormData({})
    setFilters({
      ...filters,
      SellerID: formData.SellerID
    })
    handleClose()
  }
  useEffect(()=>{
    if(!customers.length)dispatch(getCustomers(''))
    if(!seller_invoices.length) dispatch(getInvoicesBySeller(user[0].SellerID, {inputName: '', inputNumber: '', selectSeller: '', timeFilter: ''}))
  }, [seller_invoices])

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
         icon={<FaTasks/>}
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
      size={'3xl'}
      >
      <ModalOverlay/>
      <ModalContent 
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}
        minW={'40vw'}
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
        <ModalBody color={'web.text2'} p={'2vh'}>
          {
            progress === 20 && (
              <AddTaskInfo handleChange={handleChange} formData={formData} setFormData={setFormData} user={user}/>
            )
          }
          {
            progress === 40 && (
              <AddTaskCustomer customers={customers} formData={formData} setFormData={setFormData} user={user}/>
            )
          }
          {
            progress === 60 && (
              <AddTaskProject formData={formData} setFormData={setFormData} user={user}/>
            )
          }
          {
            progress === 80 && (
              <AddTaskInvoice handleChange={handleChange} formData={formData} setFormData={setFormData} user={user}/>
            )
          }
          {
            progress === 100 && (
              <AddTaskReview formData={formData} user={user}/>
            )
          }
        </ModalBody>
        <ModalFooter display={'flex'} justifyContent={'space-between'}>
              <Button visibility={progress === 20 ? 'hidden' : 'unset'} colorScheme='orange' mr={3} onClick={()=>handlePreviousButton()}>
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

