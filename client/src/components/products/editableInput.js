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
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useDispatch } from "react-redux";
import { updateProductNotes } from "../../redux/actions-products";
import { useState } from "react";
 


function EditableInputNotes({product, user}) {
  const dispatch = useDispatch()
  const [input, setInput] = useState({})

  let handleSubmit = () => {
    dispatch(updateProductNotes(input, product.ProdID))
  }
  let handleChange = (e) => {
    setInput({Notes: e.target.value})
  }

    /* Here's a custom control */
    function EditableControls() {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls()
  
      return isEditing ? (
        <ButtonGroup  position={'fixed'} top={'35.5vh'} left={'49vw'} justifyContent='flex-end' size={'xs'}>
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
        <Flex justifyContent='flex-end' position={'fixed'} top={'12.8vh'} left={'52vw'}>
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
        textAlign={'center'}
        fontSize='2vh'
        isPreviewFocusable={false}
        defaultValue={product.Notes}
        onSubmit={()=>handleSubmit()}      
      >
        {
          user.Secction7Flag === 1 ?
          <EditableControls /> :
          null
        }
        
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
          left={'38.5vw'}  
          h={'15vh'}
          w={'15vw'}
          as={EditableInput}
          onChange={(e)=>{handleChange(e)}} />
        
      </Editable>
    )
  }

  export default EditableInputNotes