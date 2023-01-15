import { 
  ButtonGroup,
  IconButton,
  useEditableControls,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  Flex
 } from "@chakra-ui/react";
 import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
 


function EditableInputNotes() {
    /* Here's a custom control */
    function EditableControls() {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls()
  
      return isEditing ? (
        <ButtonGroup  position={'fixed'} top={'35.5vh'} left={'53vw'} justifyContent='flex-end' size={'sm'}>
          <IconButton 
            variant={'ghost'}
            _hover={{
              bg: 'logo.orange'
            }}  
            icon={<CheckIcon />} {...getSubmitButtonProps()} />
          <IconButton 
            variant={'ghost'}
            _hover={{
              bg: 'logo.orange'
            }}  
            icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
      ) : (
        <Flex justifyContent='flex-end' position={'fixed'} top={'12.8vh'} left={'56vw'}>
          <IconButton 
            size='sm' 
            variant={'ghost'}
            color={'web.text2'}
            _hover={{
              bg: 'logo.orange'
            }} 
            icon={<EditIcon />} {...getEditButtonProps()} />
        </Flex>
      )
    }
  
    return (
      <Editable
        textAlign='center'
        fontSize='2vh'
        isPreviewFocusable={false}
        
      >
        <EditableControls />
        <EditablePreview
          h={'15vh'}
          w={'15vw'}
          mt={'3vh'}
          border={'1px solid'}
          borderColor={'web.border'} />
        {/* Here is the custom input */}
        <Input
          position={'fixed'}
          top={'19.2vh'}
          left={'42.5vw'}  
          h={'15vh'}
          w={'15vw'}
          as={EditableInput} />
        
      </Editable>
    )
  }

  export default EditableInputNotes