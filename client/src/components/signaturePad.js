import { Box, Button, Spacer, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';

export const Signature = ({setImgURL})=>{
    
    let sigPad = useRef({})
    let [disabled, setDisabled ] = useState(false)

    function clearPad(){
        sigPad.current.clear()
    }
    function saveSignature(){
        setDisabled(true)
        sigPad.current.clear()
        setImgURL(sigPad.current.getTrimmedCanvas().toDataURL('image/png'))
    }

    return(
        <>
        <Box
        ml={'4vh'}
        mr={'4vh'}
        mt={'4vh'}
        mb={'4vh'}
        color={'gray.600'}
        border={'1px solid'}
        borderColor={'gray.200'}
        rounded={'md'}>
        <SignaturePad
        ref={sigPad}/>
        <Spacer w={'80%'} bg={'black'}/>
        <Button
            isDisabled={disabled}
            size={'sm'}
            bg={'white'}
            w={'10vh'}
            textAlign={'start'}
            onClick={()=>clearPad()}
            _hover={{
                bg: 'white',
                color: '#E47424'
            }}
            _active={{
                bg: 'white',
                color: 'brown.700'
            }}
            >
            <Text>Clear</Text>
        </Button>
        <Button
            isDisabled={disabled}
            size={'sm'}
            bg={'white'}
            w={'10vh'}
            textAlign={'start'}
            onClick={()=>saveSignature()}
            _hover={{
                bg: 'white',
                color: '#E47424'
            }}
            _active={{
                bg: 'white',
                color: 'brown.700'
            }}
            >
            <Text>Done</Text>
        </Button>
        </Box>
        </>
    )

}