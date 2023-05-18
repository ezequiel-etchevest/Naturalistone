import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react"
import { TbBuildingCommunity } from "react-icons/tb";
import CreateProjectForm from "./createProjectForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from '../../../redux/actions-projects';
import { validateProject } from "../../../utils/validateForm";
import { useToast } from "@chakra-ui/react";


export function CreateNewProject({customer}) {

  const toast = useToast()
  const [isToastShowing, setIsToastShowing] = useState(false)
  const [errors, setErrors] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [changeInput, setChangeInput] = useState(false)
  const [formData, setFormData] = useState({
    ProjectName: '',
    CustomerID: customer.CustomerID,
    State: '',
    ZipCode: '',
    City: '',
    Shipping_Address: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    if(!isToastShowing){
    if(!changeInput){
      setIsToastShowing(true)
      return toast({
        title: 'Please complete de Info',
        description: `Need Complete the info to create a customer`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        onCloseComplete: () => setIsToastShowing(false),
      });
    }
    event.preventDefault();
      if(Object.keys(errors).length > 0){
        setIsToastShowing(true)
        return toast({
          title: 'Please complete de Info',
          description: `Need Complete the info to create a project`,
          status: 'error',
          duration: 4000,
          isClosable: true,
          onCloseComplete: () => setIsToastShowing(false),
        });
      }
      dispatch(createProject(formData));
      handleClose()
  };
}

  const handleClose = () => {
    setFormData({
        ProjectName: '',
        CustomerID: customer.CustomerID,
        State: '',
        ZipCode: '',
        City: '',
        Shipping_Address: ''
    })
    setChangeInput(false)
    onClose()
  }

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
      <Modal size={'xl'} isOpen={isOpen} onClose={()=>handleClose()}>
        <ModalOverlay/>
        <ModalContent
        minW={'50vw'}
        bg={'web.sideBar'}
        border={'1px solid'}
        borderColor={'web.border'}>
          <ModalHeader color={'web.text'}>Add New Project</ModalHeader>
          <ModalCloseButton onClick={()=>handleClose()} />
            <ModalBody >
              <CreateProjectForm formData={formData} setFormData={setFormData} errors={errors}
               setErrors={setErrors} validateProject={validateProject} setChangeInput={setChangeInput}/>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='orange' mr={3} onClick={(e)=>handleSubmit(e)}>
                Submit
              </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
    }