import { IconButton, 
  useDisclosure,
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  VStack,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input, 
  useToast,
  Button, 
  Progress, 
  Tooltip} from "@chakra-ui/react";
import { TbBuildingFactory2 } from "react-icons/tb";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { validateCompletedInputsFactory, validateEmptyFactory } from "../../../utils/validateForm";
import { addFactory, getFactories } from "../../../redux/actions-factories";

export function AddFactoryModal({progress, setProgress}) {

const dispatch = useDispatch();
const toastId = 'error-toast'
const [errors, setErrors] = useState({})
const toast = useToast()
const { isOpen, onOpen, onClose } = useDisclosure()
const [changeInput, setChangeInput] = useState(true)
const [formData, setFormData] = useState({
  FactoryID: '', 
  Reference: '', 
  Factory_Name: '', 
  Phone: '', 
  Email: '', 
  WebSite: '', 
  International_Flag: ''
});

const handleChange = (event) => {
  const { name, value } = event.target;
  setErrors({})
  // Actualizas solo la propiedad que cambió en el objeto de formData
  setFormData((prevFormData) => ({
  ...prevFormData,
  [name]: value,
  }));
  setErrors(
    validateCompletedInputsFactory({
    ...formData,
    [name]: value,
  })
  );
  setChangeInput(true)
};

const handleSubmit = () => {
  setErrors({})
  let newErrors = validateEmptyFactory(formData, progress)
  setErrors(newErrors)

  if(Object.entries(newErrors).length){
  if(!toast.isActive(toastId)){
    return toast(({
      id: toastId,
      title: "Error",
      description: 'All fields must be completed',
      status: "error",
      duration: 5000,
      isClosable: true,
      }))
  }} else{
    dispatch(addFactory(formData));
    handleClose()
  } 
}
const handleClose = () => {
  setFormData({
    FactoryID: '', 
    Reference: '', 
    Factory_Name: '', 
    Phone: '', 
    Email: '', 
    WebSite: '', 
    International_Flag: '',
  })
  setChangeInput(false)
  setErrors({})
  setProgress(25)
  onClose()
}

return (
<>
<Tooltip placement={'bottom-start'}  label={'Add new factory'} fontWeight={'hairline'}>
  <IconButton
  size={'lg'}
  icon={ <TbBuildingFactory2/>}
  variant={'unstyled'} 
  display={'flex'} 
  placeContent={'center'}
  alignItems={'center'}
  color={'web.text2'} 
  _hover={{
     color: 'logo.orange'
    }}
  _active={{
    }}
  onClick={onOpen}
  />
  </Tooltip>
  <Modal size={'xl'} isOpen={isOpen} onClose={()=>handleClose()} >
    <ModalOverlay/>
    <ModalContent
    bg={'web.sideBar'}
    border={'1px solid'}
    borderColor={'web.border'}>
    {/* <Progress
    value={progress} 
    colorScheme={"orange"} 
    mb={'2vh'} 
    background={'web.border'} 
    size={'sm'} 
    borderTopRightRadius={'md'}
    borderTopLeftRadius={'md'}/> */}
      <ModalHeader mt={'2vh'} ml={'2vw'} color={'web.text'}>Add new factory</ModalHeader>
        <ModalBody >
          <form>
            <VStack h={'52vh'}>
              <Box w={'22vw'} display={'flex'} h={'10vh'} flexDir={'row'} pt={'2vh'} mb={'1vh'} mt={'1vh'} justifyContent={'space-between'}>
                <FormControl>
                <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'name'}>Factory name</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={'web.text2'}
                    type={"text"}
                    name={"Factory_Name"}
                    value={formData.Factory_Name}
                    onChange={handleChange}
                    />
                    { errors.Factory_Name && (
                      <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                        {errors.Factory_Name}
                      </Text>
                    )}
                </FormControl>
              </Box>
              <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
                <FormControl>
                <FormLabel textColor={'web.text2'}name={'Reference'} mb={'1vh'} fontSize={'sm'}>Reference</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={'web.text2'}
                    type={"text"}
                    name={"Reference"}
                    value={formData.Reference}
                    onChange={handleChange}
                    />
                    { errors.Reference && (
                      <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                        {errors.Reference}
                      </Text>
                    )}
                </FormControl>
              </Box>
              <Box w={'22vw'} h={'10vh'} display={'flex'} flexDir={'row'} mb={'1vh'} justifyContent={'space-between'}>
                <FormControl>
                <FormLabel textColor={'web.text2'}name={'Phone'} fontSize={'sm'}>Phone</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={'web.text2'}
                    type={"text"}
                    name={"Phone"}
                    value={formData.Phone}
                    onChange={handleChange}
                    />
                    { errors.Phone && (
                      <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                        {errors.Phone}
                      </Text>
                    )}
                </FormControl>
              </Box>
              <Box w={'22vw'} display={'flex'}h={'10vh'}  flexDir={'row'} mb={'1vh'} justifyContent={'space-between'}>
                <FormControl>
                <FormLabel textColor={'web.text2'}name={'Email'} fontSize={'sm'}>Email</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={'web.text2'}
                    type={"text"}
                    name={"Email"}
                    value={formData.Email}
                    onChange={handleChange}
                    />
                    { errors.Email && (
                      <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                        {errors.Email}
                      </Text>
                    )}
                </FormControl>
              </Box>
              <Box w={'22vw'} display={'flex'}h={'10vh'}  flexDir={'row'} mb={'1vh'} justifyContent={'space-between'}>
                <FormControl>
                <FormLabel textColor={'web.text2'}name={'Website'} fontSize={'sm'}>Website</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={'web.text2'}
                    type={"text"}
                    name={"Website"}
                    value={formData.Website}
                    onChange={handleChange}
                    />
                    { errors.Website && (
                      <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                        {errors.Website}
                      </Text>
                    )}
                </FormControl>
              </Box>
              <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
                <FormControl>
                <FormLabel textColor={'web.text2'}name={'International_Flag'} fontSize={'sm'}>Foreing</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text2'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={'web.text2'}
                    type={"text"}
                    name={"International_Flag"}
                    value={formData.International_Flag}
                    onChange={handleChange}
                    />
                    { errors.International_Flag && (
                      <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                        {errors.International_Flag}
                      </Text>
                    )}
                </FormControl>
              </Box>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter display={'flex'} justifyContent={'space-between'} mb={'2vh'} mt={'3vh'}>
          <Button colorScheme='orange' ml={'1vw'} onClick={()=>handleClose()}>
            Prev
          </Button>
          <Button colorScheme='orange' mr={'1vw'} onClick={(e)=>handleSubmit(e)}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}