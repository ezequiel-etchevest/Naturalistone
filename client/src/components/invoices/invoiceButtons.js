import{
	Box,
	ButtonGroup,
	Button,
	IconButton
} from '@chakra-ui/react';
import { TfiStamp } from 'react-icons/tfi'
import {AiOutlineMail, AiOutlineInfoCircle} from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';


const InvoicePanelButtons = () => {
    return(
        <>
					<Box
          	w={'13vw'}
          	display={'flex'}
          	flexDir={'column'}
          	alignItems={'flex-start'}
          	textColor={'web.text2'}
          	rounded={'md'}
          	justifyContent={'space-between'}
          	>
            <Box>
            <ButtonGroup
              display={'flex'}
              spacing={0}
              _hover={{
              color: 'logo.orange'
              }}>
            <IconButton
              variant={'unstyled'}           
              fontWeight={'normal'}
              icon={<AiOutlineInfoCircle/>}/>
            <Button
              variant={'unstyled'}           
              fontWeight={'normal'}
              >Customer Details</Button>
            </ButtonGroup>
            <ButtonGroup
            	display={'flex'}
            	spacing={0}
                _hover={{
                color: 'logo.orange'
              	}}>
            <IconButton
              variant={'unstyled'}           
              fontWeight={'normal'}
              icon={<AiOutlineMail/>}/>
            <Button
              display={'flex'}
              alignSelf={'flex-start'}
              variant={'unstyled'}           
              fontWeight={'normal'}
              >Contact Customer</Button>
            </ButtonGroup>
            <ButtonGroup
            	display={'flex'}
            	spacing={0}
                _hover={{
                color: 'logo.orange'
              	}}>
            <IconButton
              variant={'unstyled'}
              size={'md'}           
              fontWeight={'normal'}
              icon={<BsCartPlus/>}/>
            <Button
              display={'flex'}
              alignSelf={'flex-start'}
              variant={'unstyled'}           
              fontWeight={'normal'}
              >Order Products</Button>
            </ButtonGroup>
          </Box>
            <ButtonGroup
              display={'flex'}
              spacing={0}
              placeContent={'space-between'}
                _hover={{
                color: 'logo.orange'
              }}>
            <IconButton
              variant={'unstyled'}           
              fontWeight={'normal'}
              icon={<TfiStamp/>}/>
            <Button
              variant={'unstyled'}              
              fontWeight={'normal'}
              >Stamp PDF</Button>
            </ButtonGroup>
            </Box>
        
        </>
    )
}

export default InvoicePanelButtons