import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Progress, Box, Text } from "@chakra-ui/react"
import { TbBuildingCommunity } from "react-icons/tb";
import CreateProjectForm from "./createProjectForm";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from '../../../redux/actions-projects';
import { validateCompletedInputsProject } from "../../../utils/validateForm";
import { useToast } from "@chakra-ui/react";
import EditProjectList from "./editProjectList";
import EditProjectForm from "./editProjectForm";
import { FiEdit } from "react-icons/fi";

export function EditProject({customer, custID, projects_by_customer_id}) {

  const toast = useToast()
  const toastId = 'error-toast'
  const [errors, setErrors] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ progress, setProgress ] = useState(50)
  const [changeInput, setChangeInput] = useState(false)
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    ProjectName: '',
    idProjects: '',
    CustomerID: customer.CustomerID || custID,
    Shipping_State: '',
    Shipping_ZipCode: '',
    Shipping_City: '',
    Shipping_Address: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setErrors({})
    let newErrors = validateCompletedInputsProject(formData)
    setErrors(newErrors)
    if(Object.entries(newErrors).length){
      if(!toast.isActive(toastId)){
        return toast(({
          id: toastId,
          title: "Error",
          description: 'All fields must be completed correctly.',
          status: "error",
          duration: 5000,
          isClosable: true,
          }))
    }}else{
      // dispatch(createProject(formData));
      setErrors({})
      // handleClose()
    } 
  }


  const handleClose = () => {
    setFormData({
        ProjectName: '',
        idProjects: '',
        CustomerID: customer.CustomerID || custID,
        Shipping_State: '',
        Shipping_ZipCode: '',
        Shipping_City: '',
        Shipping_Address: ''
    })
    setChangeInput(false)
    setErrors({})
    onClose()
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
    setDisabled(!Object.values(formData).every((el) => el.length !== 0 ))
  }, [formData])
  
  useEffect(() => {
    if(Object.values(errors).length > 0) setDisabled(true)
  },[errors])

console.log("inpts", formData)

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
        maxW={progress === 50 ? '65vw' : '40vw'}
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
            <Box h={"6vh"} mt={'1vh'}>
              <Text
                ml={"2vw"}
                fontSize={"2xl"}
                color={"white"}
              >
                Projects Information
            </Text>
            </Box>
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
            <ModalFooter display={"flex"} justifyContent={"space-between"}>
            <Button visibility={progress === 50 ? 'hidden' : 'unset'} colorScheme='orange' mr={3} onClick={()=>handlePreviousButton()}>
              Prev
            </Button>
              {
                progress === 100 ? (
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