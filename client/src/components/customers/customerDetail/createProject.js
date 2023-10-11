import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react"
import { TbBuildingCommunity } from "react-icons/tb";
import CreateProjectForm from "./createProjectForm";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from '../../../redux/actions-projects';
import { validateCompletedInputsProject } from "../../../utils/validateForm";
import { useToast } from "@chakra-ui/react";


export function CreateNewProject({customer, custID}) {

  const toast = useToast()
  const toastId = 'error-toast'
  const [errors, setErrors] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [changeInput, setChangeInput] = useState(false)
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    ProjectName: '',
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
    console.log(newErrors)
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
      dispatch(createProject(formData));
      setErrors({})
      handleClose()
    } 
  }


  const handleClose = () => {
    setFormData({
        ProjectName: '',
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
  
  useEffect(() => {
    setDisabled(!Object.values(formData).every((el) => el.length !== 0 ))
  }, [formData])
  
  useEffect(() => {
    if(Object.values(errors).length > 0) setDisabled(true)
  },[errors])

  return (
    <>
      <Button
        fontSize={'1.6vh'}
        h={'4vh'}
        fontWeight={'normal'}
        size={'lg'}
        rightIcon={<TbBuildingCommunity/>}
        variant={'unstyled'} 
        display={'flex'} 
        placeContent={'center'}
        alignItems={'center'}
        color={'web.text2'} 
        _hover={{
           color: 'logo.orange'
          }}
        onClick={onOpen}
        >Add Project</Button>
      <Modal size={'xl'} isOpen={isOpen} onClose={()=>handleClose()} motionPreset='slideInRight'>
        <ModalOverlay/>
        <ModalContent
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}>
          <ModalHeader color={'web.text'}>Add New Project</ModalHeader>
          <ModalCloseButton onClick={()=>handleClose()} />
            <ModalBody >
              <CreateProjectForm formData={formData} setFormData={setFormData} errors={errors}
               setErrors={setErrors} validateCompletedInputsProject={validateCompletedInputsProject} setChangeInput={setChangeInput}/>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='orange' mr={3} onClick={(e)=>handleSubmit(e)} disabled={disabled}>
                Submit
              </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
    }