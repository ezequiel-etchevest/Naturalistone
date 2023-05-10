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
    Select
    } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { CreateNewProject } from "../../../customers/customerDetail/createProject";
import SelectProjectModalList from "./selectProjectModalList";
import '../../../../assets/styleSheet.css'


const SelectProjectModal = ({customer, isProjectModalOpen, onProjectModalClose, isOpen, onClose}) => {

  const { isOpen: isQuotesModalOpen, onOpen: onQuotesModalOpen, onClose: onQuotesModalClose } = useDisclosure()

  const projects = useSelector(state => state.projects_by_customer_id)
  const [variables, setVariables] = useState(
    {
      shipVia: '',
      method: '',
      paymentTerms:'',
      estDelivDate:''
    })

  const handlePrevious = () => {
    onProjectModalClose()
  }

  const handleNext = () => {
    if(variables.shipVia && variables.method && variables.paymentTerms){
      onQuotesModalOpen()
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

  return(

<>
  <Modal
    isOpen={isProjectModalOpen}
    onClose={onProjectModalClose}
    size={'3xl'}
    >
    <ModalOverlay />
    <ModalContent
      bg={'web.sideBar'}
      border={'1px solid'}
      borderColor={'web.border'}
      >
      <ModalHeader></ModalHeader>
      <ModalCloseButton
        color={'web.text2'}
        _hover={{
          color: 'web.text'
        }}
        onClick={onClose} />
      <Box color={'white'}>
      <Text ml={'3vw'} fontSize={'lg'}>Select project</Text>
      <ModalBody color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'}>
      <HStack
        display={'flex'}
        justifyContent={'flex-end'}
        h={'6vh'}
        mb={'4vh'}
        mr={'1.2vw'}
        ml={'1.4vw'}
        spacing={'1.5vw'}
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
          <Tooltip label={'Add project'} fontWeight={'hairline'}>
            <CreateNewProject customer={customer} />
          </Tooltip>
        </HStack>
        <SelectProjectModalList 
          variables={variables} 
          setVariables={setVariables} 
          customer={customer} 
          projects={projects} 
          isQuotesModalOpen={isQuotesModalOpen} 
          onQuotesModalClose={onQuotesModalClose} 
          onQuotesModalOpen={onQuotesModalOpen} 
          onProjectModalClose={onProjectModalClose}/>
      </ModalBody>
      </Box>
      <ModalFooter mb={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} ml={'2vw'} mr={'2vw'}>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          onClick={()=>handlePrevious()}
          >
         Previous
        </Button>
        <Tooltip label={'Currently disabled'} bg={'red'} fontWeight={'bold'}>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          disabled={'true'}
          onClick={()=>handleNext()}
          >
         Next
        </Button>
        </Tooltip>
      </ModalFooter>
    </ModalContent>
  </Modal>
</>
)}

export default SelectProjectModal