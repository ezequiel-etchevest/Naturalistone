import { 
  Text,
  Box,
  Modal,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react"
import SendEmailModal from "./CreateSampleEmailModal"
  
  const CreateSampleModalAskEmail = ({isOpen2, onClose2, onOpen2, formData, handleCleanFormData}) => {

    const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3} = useDisclosure()

    const handleClose = () => {
      onClose2()
      handleCleanFormData()
    }

    const handleClick = () => {
      onClose2()
      onOpen3()
    }
  
  return(
  <>
        <Modal
          isOpen={isOpen2}
          onClose={onClose2}
          size={"2xl"}
          motionPreset="slideInRight"
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            bg={"web.sideBar"}
            border={"1px solid"}
            borderColor={"web.border"}
          >
          <ModalCloseButton
            color={"web.text2"}
            mt={"2vh"}
            mr={"0.5vw"}
            position={"absolute"}
          />
          <ModalBody
            color={"web.text2"}
            display={"flex"}
            justifyContent={"center"}
            flexDir={"column"}
          >
            <Box display={"flex"} h={"20vh"} w={"full"} justifyContent={"center"} alignItems={"center"}>
            <Text mt={'10vh'} fontSize={'xl'} color={'white'} alignSelf={'flex-start'}>¿Do you want to send mail to the customer?</Text>
            </Box>
          </ModalBody>
            <ModalFooter
              mb={"2vh"}
              mt={"2vh"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"space-between"}
              ml={"1vw"}
              mr={"0.5vw"}
            >
              <Button
                colorScheme="orange"
                mr={3}
                onClick={handleClose}
              >
                No
              </Button>
                <Button
                  colorScheme="orange"
                  mr={3}
                  onClick={handleClick}
                >
                  Yes
                </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
      <SendEmailModal formData={formData} isOpen3={isOpen3} onClose3={onClose3} handleCleanFormData={handleCleanFormData}/>
    {/* </Box>  */}
  </>
  )}
  export default CreateSampleModalAskEmail;