import { 
    Text,
    Box,
    Button,
    } from "@chakra-ui/react"


export function UpdateQuoteSelection({ setProgress, setComponent, setUpdate }) {
  const handleClick = (e) => {
    if(e.target.name === 'Customer') setProgress(20)
    if(e.target.name === 'Project') setProgress(20)
    if(e.target.name === 'Products') setProgress(20)
    setUpdate('Update')
    setComponent(e.target.name)
  }

  return(
    <>
      <Box h={'60vh'}>
        <Text ml={'2vw'} mt={'2vh'} fontSize={'lg'} w={'16vw'} color={'white'} alignSelf={'flex-start'}>Select edition</Text>
        <Box 
          color={'web.text2'} 
          display={'flex'} 
          flexDir={'column'} 
          alignItems={'center'}
          h={'40vh'}
          mt={'8vh'}
          justifyContent={'space-around'}
          >
          <Button colorScheme='orange' name={'Customer'} onClick={(e) => handleClick(e)}>
            Customer
          </Button>
          <Button colorScheme='orange' name={'Project'} onClick={(e) => handleClick(e)}>
            Project
          </Button>
          <Button colorScheme='orange' name={'Products'} onClick={(e) => handleClick(e)}>
            Products
          </Button>
        </Box>
      </Box>
    </>
  )
}
