import { Card, CardHeader, CardBody } from "@chakra-ui/card";
import { Box, Heading, Stack, Text, StackDivider, Center } from "@chakra-ui/react";

const TaskComentCard = ({e,i}) => {
  let { Date, ComentID, Description, FirstName, LastName } = e
  Date = Date.split('T')[0]

  return(
    <>
      <Box key={i}>
        <Box size='xs' display={'flex'} flexDir={'row'} alignContent={'baseline'} >
          <Text
            fontSize={'xs'}  
            color={'logo.orange'}
            >{Date}</Text>

        </Box>
        <Text
            fontSize={'md'}  
            color={'web.text2'}>{FirstName}{' '}{LastName}</Text>
        <Text fontSize='sm'>
         {Description}
        </Text>
      </Box>
    </>
  )
}
export const TaskComents = ({comments}) => {

  return(
    <>
    <Card>
      <CardHeader mb={'3vh'}>
        <Heading size='sm'>Comments</Heading>
      </CardHeader>
      <CardBody 
        maxH={'25vh'}
        overflow={'auto'}
        css={{
          '&::-webkit-scrollbar': {
            width: '0.4vw',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#E47424',
            borderRadius: '5px',
          },
        }}>
        <Stack divider={<StackDivider />} spacing='4'>
         {
          comments?.length ?
          typeof comments === 'string' ? (
            <Center h={'20vh'}>
            <Text color={'web.text2'}>No comments added to this task</Text>
            </Center>
          ):(
            comments.map((e, i) => {
              return (
                <TaskComentCard e={e} key={i}/>
              )
            }
          )
          ) : (null)
         }
        </Stack>
      </CardBody>
    </Card>
  </>
  )
} 