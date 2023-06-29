import {
    Text,
    Box,
    HStack,
    Input,
    Tooltip,
    Divider,
    Select,
    } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CreateNewProject } from "../../customers/customerDetail/createProject";
import CreateQuoteProjectList from "./createQuoteProjectList";
import '../../../assets/styleSheet.css'


const CreateQuoteCustomerProjets = ({ formData, setFormData, setDisable, update, invoice }) => {

  const projects = useSelector(state => state.projects_by_customer_id)
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      variables: {
        ...formData.variables,
        [name]: value,
      },
    });
  };

  useEffect(() => {
    if(!Array.isArray(projects)) setDisable(true) 
    else {
      if(!formData.variables.shipVia.length || !formData.variables.method.length || !formData.variables.paymentTerms.length || !formData.variables.estDelivDate.length || !formData.project.ProjectName.length){
        setDisable(true)
      } else { 
        setDisable(false)}
    }
  }, [formData.variables, formData.project, projects]);

  return(

  <>
    <Box color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'}>
    {
        update === 'Update' ?
        <Box ml={'2vw'} mt={'2vh'} display={'flex'}flexDir={'row'} w={'42vw'}>
          <Box>
              <Text fontSize={'md'} color={'white'} alignSelf={'flex-start'}>Previous project </Text>
            <Box mt={'1vh'} display={'flex'} flexDir={'row'} w={'20vw'}>
              <Text fontSize={'sm'}>{invoice[0].idProjects } </Text>
              <Text ml={'2vw'} fontSize={'sm'}> {invoice[0].ProjectName != '-' && invoice[0].ProjectName != null ? invoice[0].ProjectName : ''}</Text>
            </Box>        
          </Box>
          <Box>
              <Text fontSize={'md'} color={'white'} alignSelf={'flex-start'}>New project </Text>
            <Box mt={'1vh'} display={'flex'} flexDir={'row'}>
              <Text fontSize={'sm'}>
                {
                  formData.project.idProjects === invoice[0].idProjects ? '' : formData.project.idProjects
                } 
              </Text>
              <Text ml={'2vw'} fontSize={'sm'}> 
                {
                  formData.project.ProjectName === invoice[0].ProjectName ? ''
                  :
                  formData.project.ProjectName != '-' && formData.project.ProjectName != null ? formData.project.ProjectName : ''
                }
              </Text>
            </Box>        
          </Box>
        </Box>
        :
        <Text ml={'2vw'} mt={'2vh'} mb={'1vh'} fontSize={'lg'}w={'16vw'} color={'white'} alignSelf={'flex-start'}>Select Project</Text>
      }
      <HStack
        display={'flex'}
        justifyContent={'space-between'}
        h={'6vh'}
        mb={'3vh'}
        mt={'4vh'}
        mr={'2vw'}
        ml={'2vw'}

        >
        <Input
          w={'10vw'}
          minH={'4.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          placeholder={'P.O. No.'}
          type={"text"}
          name={"method"}
          value={formData.variables.method || ""}
          onChange={(e)=>handleChange(e)}
          />  
        <Input
          mb={'0.5vh'}
          w={'10vw'}
          minH={'4.5vh'}
          variant="unstyled"
          textColor={'web.text2'}
          _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
          size={"sm"}
          borderBottomWidth={"2px"}
          borderBottomColor={'web.text2'}
          placeholder={'Payment Terms'}
          type={"text"}
          name={"paymentTerms"}
          value={formData.variables.paymentTerms || ""}
          onChange={(e)=>handleChange(e)}
          />
          <Tooltip  label="Estimated delivery date" fontWeight={'hairline'} placement='top-start'>
            <Input
              mb={'0.5vh'}
              w={'10vw'}
              minH={'4.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              value={formData.variables.estDelivDate}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"date"}
              pattern={"\d{4}-\d{2}-\d{2}"}
              name={"estDelivDate"}
              cursor= {'pointer'}
              onChange={(e)=>handleChange(e)}
              css={{
                '::-webkit-calendar-picker-indicator': {   
                    background: `url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) center/90% no-repeat`,    
                    cursor: 'pointer',
                    filter: 'invert(59%) sepia(7%) saturate(31%) hue-rotate(184deg) brightness(97%) contrast(92%)',
                    marginRight: 7,
                    position: 'absolute',
                    right: 0,
                    top: 5,
                  },  
              }}
            />
          </Tooltip>
          <Select
              onChange={(e)=>handleChange(e)}
              mb={'0.5vh'}
              w={'10vw'}
              minH={'4.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              _hover={{borderColor: 'web.border'}}
              cursor={'pointer'}
              value={formData.variables.shipVia || ""}
              name={'shipVia'}
            >
            <option value='' className="options">Ship Via</option>
            <option value='Curbside' className="options">Curbside</option>
            <option value='3rd Party' className="options">3rd Party</option>
            <option value='Pick up' className="options">Pick up</option>
          </Select>
          <Divider orientation={'vertical'} h={'5vh'}/>
            <CreateNewProject customer={formData.customer} />
        </HStack>
        <CreateQuoteProjectList projects={ projects } formData={formData} setFormData={setFormData} setDisable={setDisable}/>
    </Box>
  </>
)}

export default CreateQuoteCustomerProjets