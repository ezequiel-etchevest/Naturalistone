import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Text,
    ModalBody,
    ModalCloseButton,
    Box,
    useDisclosure,
    HStack,
    Input,
    IconButton,
    Tooltip,
    Divider,
    Select,
    Progress
    } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { CreateNewProject } from "../../../customers/customerDetail/createProject";
import SelectProjectModalList from "./selectProjectModalList";
import '../../../../assets/styleSheet.css'
import { getCustomers } from "../../../../redux/actions-customers";


const SelectProjectModal = ({customer, setCustomer, onOpen2, isOpen3, onClose3, onClose2, onClose1, isOpen, onClose, setInputValue}) => {

  const { isOpen: isOpen4, onOpen: onOpen4, onClose: onClose4 } = useDisclosure()

  const dispatch = useDispatch()

  const projects = useSelector(state => state.projects_by_customer_id)
  const [disable, setDisable] = useState(true)
  const [project, setProject] = useState('')

  const [variables, setVariables] = useState(
    {
      shipVia: '',
      method: '',
      paymentTerms:'',
      estDelivDate:''
    })

    useEffect(() => {
      if(variables.shipVia && variables.method && variables.paymentTerms && variables.estDelivDate && project){
        setDisable(false)
      } else { 
        setDisable(true)}
  }, [variables, project]);

  const handlePrevious = () => {
    onClose3()
    onOpen2()
  }

  const handleNext = () => {
    if (!disable) {
      onOpen4()
    }
  }

  const handleShipVia = (e) => {
    setVariables({...variables, shipVia: e.target.value})
  }  
  const handleMethod = (e) => {
    setVariables({...variables, method: e.target.value})
  }  
  const handlePaymentTerms = (e) => {
    setVariables({...variables, paymentTerms: e.target.value})
  }  
  const handleEstDelivDate = (e) => {
    setVariables({...variables, estDelivDate: e.target.value})
  }  

  const handleClose = () => {
    onClose3()
    onClose2()
    onClose1()
    setInputValue('')
    setCustomer('')
    dispatch(getCustomers('', ''))
  }
  return(

<>
  <Modal
    isOpen={isOpen3}
    onClose={handleClose}
    size={'3xl'}
    motionPreset='slideInRight'
    >
    <ModalOverlay />
    <ModalContent
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      >
      <Progress value={60} 
        colorScheme={"orange"} 
        mb={'2vh'} 
        background={'web.border'} 
        size={'sm'}
        borderTopRightRadius={'md'}
        borderTopLeftRadius={'md'}
        />
      <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'}>
      <Text ml={'2vw'} mt={'2vh'} mb={'5vh'} fontSize={'lg'}w={'16vw'} color={'white'} alignSelf={'flex-start'}>Select Project</Text>
      <HStack
        display={'flex'}
        justifyContent={'flex-end'}
        h={'6vh'}
        mb={'3vh'}
        mr={'1.2vw'}
        ml={'1.4vw'}
        spacing={'2vw'}
        >
        <Input
          mb={'0.5vh'}
          w={'10vw'}
          minH={'4.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          placeholder={'P.O. No.'}
          type={"text"}
          name={"method"}
          onChange={(e)=>handleMethod(e)}
          />  
        <Input
          mb={'0.5vh'}
          w={'10vw'}
          minH={'4.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          placeholder={'Payment Terms'}
          type={"text"}
          name={"paymentTerms"}
          onChange={(e)=>handlePaymentTerms(e)}
          />
          <Tooltip  label="Estimated delivery date" fontWeight={'hairline'} placement='top-start'>
            <Input
              mb={'0.5vh'}
              w={'10vw'}
              minH={'4.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"date"}
              pattern="\d{4}-\d{2}-\d{2}"
              name={"EstDelivDate"}
              onChange={(e)=>handleEstDelivDate(e)}
            />
          </Tooltip>
          <Select
              onChange={(e)=>handleShipVia(e)}
              mb={'0.5vh'}
              w={'9vw'}
              minH={'4.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              _hover={{borderColor: 'web.border'}}
              cursor={'pointer'}
            >
            <option value='' className="options">Ship Via</option>
            <option value='Curbside' className="options">Curbside</option>
            <option value='3rd Party' className="options">3rd Party</option>
            <option value='Pick up' className="options">Pick up</option>
          </Select>
          <Divider orientation={'vertical'} h={'5vh'}/>
            <CreateNewProject customer={customer} />
        </HStack>
        <SelectProjectModalList 
          variables={variables} 
          setVariables={setVariables} 
          customer={customer} 
          projects={projects} 
          project={project} 
          setProject={setProject} 
          isOpen4={isOpen4} 
          onClose4={onClose4} 
          onOpen4={onOpen4} 
          onClose3={onClose3}
          onClose2={onClose2}
          onClose1={onClose1}
          setInputValue={setInputValue}
          setCustomer={setCustomer}
          />
      </ModalBody>
      <ModalFooter mb={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'2vw'} mr={'2vw'}>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          onClick={()=>handlePrevious()}
          >
         Previous
        </Button>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          disabled={disable}
          onClick={()=>handleNext()}
          >
         Next
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
</>
)}

export default SelectProjectModal