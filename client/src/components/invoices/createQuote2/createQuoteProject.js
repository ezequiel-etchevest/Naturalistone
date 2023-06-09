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


const CreateQuoteCustomerProjets = ({ formData, setFormData, setDisable }) => {

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
    if(formData.variables.shipVia && formData.variables.method && formData.variables.paymentTerms && formData.variables.estDelivDate && formData.project.ProjectName){
      setDisable(false)
    } else { 
      setDisable(true)}
}, [formData.variables, formData.project]);

  return(

  <>
    <Box color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'}>
      <Text ml={'2vw'} mt={'2vh'} mb={'5vh'} fontSize={'lg'}w={'16vw'} color={'white'} alignSelf={'flex-start'}>Select Project</Text>
      <HStack
        display={'flex'}
        justifyContent={'flex-end'}
        h={'6vh'}
        mb={'3vh'}
        mr={'1.2vw'}
        ml={'1.4vw'}
        spacing={'2vw'}
        >
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
              name={"EstDelivDate"}
              cursor= {'pointer'}
              onChange={(e)=>handleChange(e)}
              css={{
                '::-webkit-calendar-picker-indicator': {   
                    background: `url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) center/90% no-repeat`,    
                    cursor: 'pointer',
                    filter: 'invert(59%) sepia(7%) saturate(31%) hue-rotate(184deg) brightness(97%) contrast(92%)',
                    left: 94,
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
              w={'9vw'}
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