import{
	Box,
	ButtonGroup,
	Button,
	IconButton
} from '@chakra-ui/react';
import {AiOutlineMail, AiOutlineInfoCircle} from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import ModalStamp from './modalStamp';

const InvoicePanelButtons = ({invoice, payments}) => {
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
              disabled={true}
              icon={<AiOutlineInfoCircle/>}/>
            <Button
              variant={'unstyled'}           
              fontWeight={'normal'}
              disabled={true}
              >Invoice Status</Button>
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
              disabled={true}
              icon={<AiOutlineInfoCircle/>}/>
            <Button
              variant={'unstyled'}           
              fontWeight={'normal'}
              disabled={true}
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
              disabled={true}
              icon={<AiOutlineMail/>}/>
            <Button
              display={'flex'}
              alignSelf={'flex-start'}
              variant={'unstyled'}           
              fontWeight={'normal'}
              disabled={true}
              >Contact Customer
            </Button>
            </ButtonGroup>
            <ButtonGroup
            	display={'flex'}
            	spacing={0}
                _hover={{
                color: 'logo.orange'
              	}}>
            <IconButton
              disabled={true}
              variant={'unstyled'}
              size={'md'}           
              fontWeight={'normal'}
              icon={<BsCartPlus/>}/>
            <Button
              display={'flex'}
              disabled={true}
              alignSelf={'flex-start'}
              variant={'unstyled'}           
              fontWeight={'normal'}
              >Order Products
            </Button>
            </ButtonGroup>
          </Box>
            <ModalStamp invoice={invoice} payments={payments}/>
          </Box>
        
        </>
    )
}

export default InvoicePanelButtons