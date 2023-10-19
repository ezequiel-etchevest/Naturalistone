import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Button, Progress, Box, Text, Tooltip } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  getCustomerProjects, patchProject } from '../../../redux/actions-projects';
import { validateCompletedInputsProject } from "../../../utils/validateForm";
import { useToast } from "@chakra-ui/react";
import EditProjectList from "./editProjectList";
import EditProjectForm from "./editProjectForm";
import { FiEdit } from "react-icons/fi";

export function EditProject({customer, projects_by_customer_id}) {
  const toast = useToast()
  const toastId = 'error-toast'
  const [errors, setErrors] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ progress, setProgress ] = useState(50)
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    ProjectName: '',
    idProject: '',
    CustomerID: customer.CustomerID,
    Shipping_State: '',
    Shipping_ZipCode: '',
    Shipping_City: '',
    Shipping_Address: '',
    Shipping_Address2: '',
    Shipping_Address_id: ''
  });

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    setErrors({})
    let newErrors = validateCompletedInputsProject(formData)
    setErrors(newErrors)
    if(Object.entries(newErrors).length){
      if(!toast.isActive(toastId)){
        return toast({
          id: toastId,
          title: "Error",
          description: 'All fields must be completed correctly.',
          status: "error",
          duration: 5000,
          isClosable: true,
          })
    }
    }else{
      const response = await dispatch(patchProject(formData.idProject, customer.CustomerID, formData));
      dispatch(getCustomerProjects(customer.CustomerID))
      if(response.data.success) {
        toast({
          id: toastId,
          title: "Success",
          description: 'Edit customer successful',
          status: "success",
          duration: 5000,
          isClosable: true,
          })
          setErrors({})
          handleClose()
          setProgress(50)
      } else {
        return toast({
          id: toastId,
          title: "Error",
          description: 'Error in edit customer',
          status: "error",
          duration: 5000,
          isClosable: true,
          })
      }
    } 
  }


  const handleClose = () => {
    setFormData({
        ProjectName: '',
        idProject: '',
        CustomerID: customer.CustomerID,
        Shipping_State: '',
        Shipping_ZipCode: '',
        Shipping_City: '',
        Shipping_Address: '',
        Shipping_Address2: '',
        Shipping_Address_id: ''
    })
    setErrors({})
    onClose()
    setProgress(50);
  }

  const handleNextButton = () =>{
  setProgress(progress + 50)
}

  const handlePreviousButton = () => {
    if(progress === 50) {
      return
    }
    setProgress(progress - 50)
  }
  
  useEffect(() => {
    if(progress === 100) {
      setDisabled(!Object.values(formData).every((el) => el?.length !== 0 ))
    }
  }, [formData, progress])
  
  useEffect(() => {
    if (progress === 100) {
      if(Object.values(errors).length > 0) setDisabled(true)
    }
  },[errors, progress])


  return (
    <>
      <Button
        fontSize={'1.6vh'}
        h={'4vh'}
        fontWeight={'normal'}
        size={'lg'}
        rightIcon={<FiEdit/>}
        variant={'unstyled'} 
        display={'flex'} 
        placeContent={'center'}
        alignItems={'center'}
        color={'web.text2'} 
        _hover={{
           color: 'logo.orange'
          }}
        onClick={onOpen}
        >Edit Project</Button>
      <Modal size={'xl'} isOpen={isOpen} onClose={()=>handleClose()} motionPreset='slideInRight'>
        <ModalOverlay/>
        <ModalContent
        bg={'web.sideBar'}
        h={"76vh"}
        maxW={progress === 50 ? '65vw' : '50vw'}
        minH={"55vh"}
        border={'1px solid'}
        borderColor={'web.border'}>
          <ModalCloseButton onClick={()=>handleClose()} />
            <Progress
              value={progress} 
              colorScheme={"orange"} 
              mb={'2vh'} 
              background={'web.border'} 
              size={'sm'} 
              borderTopRightRadius={'md'}
              borderTopLeftRadius={'md'}/>
            <Text ml={'3vw'} mt={"4vh"} mb={'2vh'} fontSize={'lg'} w={'14vw'} color={'white'} alignSelf={'flex-start'}>Project information</Text> 
            <ModalBody >
                {
                  progress === 50 && (
                    <EditProjectList
                    formData={formData}
                    projects={projects_by_customer_id}
                    setDisable={setDisabled}
                    setFormData={setFormData}
                    />
                  )
                }
                {
                  progress === 100 && (
                    <EditProjectForm
                    formData={formData}
                    errors={errors}
                    setErrors={setErrors}
                    setFormData={setFormData}
                    validateCompletedInputsProject={validateCompletedInputsProject}
                    />
                  )
                }
            </ModalBody>
            <ModalFooter 
              mb={"2vh"}
              mt={"2vh"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"space-between"}
              ml={"1vw"}
              mr={"0.5vw"}>
            <Button visibility={progress === 50 ? 'hidden' : 'unset'} colorScheme='orange' mr={3} onClick={()=>handlePreviousButton()}>
              Prev
            </Button>
              {
                progress === 100 ? (
                  disabled ? <Tooltip label={"All fields must be completed"} placement={'bottom-start'} fontWeight={'hairline'}>
                <Button colorScheme='orange' mr={3} onClick={(e)=>handleSubmit(e)} disabled={disabled}>
                  Submit
                </Button>
                  </Tooltip> :
                <Button colorScheme='orange' mr={3} onClick={(e)=>handleSubmit(e)} disabled={disabled}>
                  Submit
                </Button>
              ):(
                <Button colorScheme='orange' mr={3} onClick={()=>handleNextButton()} disabled={disabled}>
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