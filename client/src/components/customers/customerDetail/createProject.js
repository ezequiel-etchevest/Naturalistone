import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react"
import { TbBuildingCommunity } from "react-icons/tb";
import CreateProjectForm from "./createProjectForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from '../../../redux/actions-projects';


export function CreateNewProject({customer}) {

  const { isOpen, onOpen, onClose } = useDisclosure()

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
    event.preventDefault();
      dispatch(createProject(formData));
      handleClose()
  };
  const handleClose = () => {
    setFormData({
        ProjectName: '',
        CustomerID: customer.CustomerID,
        State: '',
        ZipCode: '',
        City: '',
        Shipping_Address: ''
    })
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
              <CreateProjectForm formData={formData} setFormData={setFormData}/>
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