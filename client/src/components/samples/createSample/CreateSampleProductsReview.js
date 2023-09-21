import { 
    Text,
    Table,
    Thead,
    Tbody,
    Box,
    Tr,
    Th,
    Td,
    TableContainer,
    } from "@chakra-ui/react"
import '../../../assets/styleSheet.css'

const CreateSampleProductsReview = ({ formData, setFormData }) => {

  return(
<>
<Box
  color={"web.text2"}
  display={"flex"}
  flexDir={"column"}
  h={"58vh"}
  >
    <Box h={"6vh"} mt={'1vh'}>
      <Text
        ml={"1vw"}
        fontSize={"lg"}
        color={"white"}
        >
        Sample products review
      </Text>
    </Box>
    <Box 
      maxHeight={'48vh'}
      minHeight={'42vh'}
      overflow={'auto'}
      css={{
        '&::-webkit-scrollbar': {
          width: '0.2vw',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#E47424',
          borderRadius: '5px',
        },
      }} >
      <TableContainer
        mr={'0.5vw'}  
        ml={'0.5vw'}
        bg={'web.sideBar'} 
        rounded={'md'}
        px={'1vw'}
        py={'2vh'}>
        <Table color={'web.text'} variant={'simple'} size={'sm'}>
          <Thead h={'6vh'}>
            <Tr>  
              <Th color={'web.text2'} fontSize={'x-small'} w={'16vw'} >Product Name</Th>
              <Th color={'web.text2'} fontSize={'x-small'} textAlign={'center'}>Type</Th>
              <Th color={'web.text2'} fontSize={'x-small'} w={'10vw'} textAlign={'center'}>Finish</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              console.log("Number of products to render:", Object.keys(formData.products).length)
            }
            {
            Object.keys(formData.products).map((key, i) => (  
              <Tr
                cursor={"pointer"}
                key={i}
                _hover={{
                  bg: "web.navBar",
                  color: "logo.orange"
                }}
              >
                <Td fontSize={"xs"} w={"16vw"}>
                  {formData.products[key].prodName}
                </Td>
                <Td fontSize={"xs"} w={"12vw"} textAlign={"center"}>
                  {formData.products[key].type}
                </Td>
                <Td fontSize={"xs"} w={"12vw"} textAlign={"center"}>
                  {formData.products[key].finish}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  </Box>
</>
);
}; 

export default CreateSampleProductsReview

