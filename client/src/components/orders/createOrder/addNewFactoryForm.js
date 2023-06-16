// addFactory
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
  Progress, 
  Tooltip} from "@chakra-ui/react";
import { TbBuildingFactory2 } from "react-icons/tb";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function AddFactoryModal({formData, setFormData}) {

const dispatch = useDispatch();
const toastId = 'error-toast'
const [errors, setErrors] = useState({})
const [ progress, setProgress ] = useState(25)
const toast = useToast()
const { isOpen, onOpen, onClose } = useDisclosure()
const [changeInput, setChangeInput] = useState(true)

const handleChange = (event) => {
  const { name, value } = event.target;
  setErrors({})
  // Actualizas solo la propiedad que cambió en el objeto de formData
  setFormData((prevFormData) => ({
  ...prevFormData,
  [name]: value,
  }));
  // setErrors(
  // validateCompletedInputs({
  //   ...formData,
  //   [name]: value,
  // })
  // );
  setChangeInput(true)
};

// const handleSubmit = () => {
//   setErrors({})
//   let newErrors = validateEmptyInputs(formData, progress)
//   setErrors(newErrors)

//   if(Object.entries(newErrors).length){
//   if(!toast.isActive(toastId)){
//     return toast(({
//       id: toastId,
//       title: "Error",
//       description: 'All fields must be completed',
//       status: "error",
//       duration: 5000,
//       isClosable: true,
//       }))
//   }} else{
//     dispatch(createCustomer(formData));
//     handleClose()
//   } 
// }
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
  // setChangeInput(false)
  // setErrors({})
  // setProgress(25)
  onClose()
}

// const handleNextButton = () =>{
//   setErrors({})
//   let newErrors = validateEmptyInputs(formData, progress)
//   setErrors(newErrors)
//   if(Object.entries(newErrors).length){
//     if(!toast.isActive(toastId)){
//       return toast(({
//         id: toastId,
//         title: "Error",
//         description: 'All fields must be completed',
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         }))
//     }
//   } else{
//       setProgress(progress + 25)
//   }
// }
// const handlePreviousButton = () => {
//   setProgress(progress - 25)
// }
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
            <VStack h={'64vh'}>
              <Box w={'22vw'} display={'flex'} flexDir={'row'} pt={'4vh'} justifyContent={'space-between'}>
                <FormControl>
                <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'name'} fontWeight={'normal'}>Factory name</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={'web.text2'}
                    type={"text"}
                    name={"Contact_Name"}
                    value={formData.factory.Factory_Name}
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
                <FormLabel textColor={'web.text2'}name={'reference'}  fontSize={'sm'}>Reference</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={'web.text2'}
                    type={"text"}
                    name={"Email"}
                    value={formData.factory.Reference}
                    onChange={handleChange}
                    />
                    { errors.Reference && (
                      <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                        {errors.Reference}
                      </Text>
                    )}
                </FormControl>
              </Box>
              <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
                <FormControl>
                <FormLabel textColor={'web.text2'}name={'phone'} fontSize={'sm'}>Phone</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text'}
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
              <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
                <FormControl>
                <FormLabel textColor={'web.text2'}name={'email'} fontSize={'sm'}>Email</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={'web.text2'}
                    type={"text"}
                    name={"Phone"}
                    value={formData.factory.Email}
                    onChange={handleChange}
                    />
                    { errors.Email && (
                      <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                        {errors.Email}
                      </Text>
                    )}
                </FormControl>
              </Box>
              <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
                <FormControl>
                <FormLabel textColor={'web.text2'}name={'website'} fontSize={'sm'}>Website</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={'web.text2'}
                    type={"text"}
                    name={"Phone"}
                    value={formData.factory.WebSite}
                    onChange={handleChange}
                    />
                    { errors.WebSite && (
                      <Text position={'absolute'} color={'web.error'} fontSize={'xs'}>
                        {errors.WebSite}
                      </Text>
                    )}
                </FormControl>
              </Box>
              <Box w={'22vw'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
                <FormControl>
                <FormLabel textColor={'web.text2'}name={'international'} fontSize={'sm'}>International</FormLabel>
                  <Input
                    mb={'0.5vh'}
                    variant="unstyled"
                    textColor={'web.text'}
                    _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                    size={"sm"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={'web.text2'}
                    type={"text"}
                    name={"Phone"}
                    value={formData.factory.International_Flag}
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
        {/* <ModalFooter display={'flex'} justifyContent={'space-between'}>
          <Button visibility={progress === 25 ? 'hidden' : 'unset'} colorScheme='orange' mr={3} onClick={()=>handlePreviousButton()}>
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
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  </>
  )
}