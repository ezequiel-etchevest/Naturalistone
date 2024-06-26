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
import { useEffect, useState } from "react";
import { CreateNewProject } from "../../customers/customerDetail/createProject";
import CreateQuoteProjectList from "./createQuoteProjectList";
import '../../../assets/styleSheet.css'


const CreateQuoteCustomerProjets = ({ formData, setFormData, setDisable, update, invoice }) => {

  const projects = useSelector(state => state.projects_by_customer_id)
  const [disabledPrice, setDisabledPrice] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'shippingPrice' || name === 'cratingFee' || name === 'transferFee'){

      const regex = /^\d+(\.\d{0,2})?$/;  
  
      if (regex.test(value) || value === '') {
        const rounded = value === '' ? '' : Math.round(parseFloat(value) * 100) / 100;
    
        setFormData({
          ...formData,
          variables: {
            ...formData?.variables,
            [name]: rounded,
          },
        });
      }
    } else{
      setFormData({
        ...formData,
        variables: {
          ...formData?.variables,
          [name]: value,
        },
      });
    }
  };

  useEffect(() => {
    const { shipVia } = formData?.variables;
    setDisabledPrice(shipVia === "Pick up" || shipVia === "");
  }, [formData?.variables]);

  useEffect(() => {
    const {
      shipVia,
      paymentTerms,
      estDelivDate,
      shippingFee,
    } = formData.variables;
    const { ProjectName } = formData.project;

  
    if (!Array.isArray(projects) ||
        !paymentTerms?.length ||
        !estDelivDate?.length ||
        !ProjectName?.length ||
        !shipVia?.length || 
        (shipVia !== 'Pick up' && !shippingFee?.toString().length)
        ) 
        setDisable(true);
    else {
      setDisable(false);
    }
  }, [formData?.variables, formData?.project, projects]);

  return(

  <>
    <Box color={'web.text2'} display={'flex'} justifyContent={'center'} flexDir={'column'} h={'58vh'}>
    {
        update === 'Update' ?
        <Box ml={'2vw'} mt={'2vh'} display={'flex'}flexDir={'row'} w={'42vw'}>
          <Box>
              <Text fontSize={'md'} color={'white'} alignSelf={'flex-start'}>Previous project </Text>
            <Box mt={'1vh'} display={'flex'} flexDir={'row'} w={'20vw'}>
              <Text fontSize={'sm'}>{invoice[0]?.idProjects } </Text>
              <Text ml={'2vw'} fontSize={'sm'}> {invoice[0]?.ProjectName != '-' && invoice[0]?.ProjectName != null ? invoice[0]?.ProjectName : ''}</Text>
            </Box>        
          </Box>
          <Box>
              <Text fontSize={'md'} color={'white'} alignSelf={'flex-start'}>New project </Text>
            <Box mt={'1vh'} display={'flex'} flexDir={'row'}>
              <Text fontSize={'sm'}>
                {
                  formData?.project?.idProjects === invoice[0]?.idProjects ? '' : formData?.project?.idProjects
                } 
              </Text>
              <Text ml={'2vw'} fontSize={'sm'}> 
                {
                  formData?.project?.ProjectName === invoice[0]?.ProjectName ? ''
                  :
                  formData?.project?.ProjectName != '-' && formData?.project?.ProjectName != null ? formData?.project?.ProjectName : ''
                }
              </Text>
            </Box>        
          </Box>
        </Box>
        :
        <Text ml={'2vw'} mt={'1vh'} mb={'1vh'} fontSize={'lg'}w={'16vw'} color={'white'} alignSelf={'flex-start'}>Select Project</Text>
      }
      <Box display={'flex'} mr={'2vw'} alignSelf={'flex-end'}>
      <CreateNewProject customer={formData?.customer}/>
      </Box>
      <HStack
        display={'flex'}
        gap={'3vw'}
        h={'6vh'}
        mb={'1vh'}
        mt={'2vh'}
        mr={'2vw'}
        ml={'2vw'}
        >
       <Tooltip  label="P.O. No." fontWeight={'hairline'} placement='top-start'>     
        <Input
          w={'10vw'}
          minW={'120px'}
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
          value={formData?.variables?.method || ""}
          onChange={(e)=>handleChange(e)}
          className="mailInputs"
          />
        </Tooltip>
       <Tooltip  label="Payment terms" fontWeight={'hairline'} placement='top-start'>     
        <Input
          mb={'0.5vh'}
          w={'10vw'}
          minW={'120px'}
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
          value={formData?.variables?.paymentTerms || ""}
          onChange={(e)=>handleChange(e)}
          className="mailInputs"
          />
          </Tooltip>
          <Tooltip  label="Estimated delivery date" fontWeight={'hairline'} placement='top-start'>
            <Input
              mb={'0.5vh'}
              w={'10vw'}
              minH={'4.5vh'}
              minW={'120px'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              value={formData?.variables?.estDelivDate}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"date"}
              pattern={"\d{4}-\d{2}-\d{2}"}
              name={"estDelivDate"}
              cursor= {'pointer'}
              onChange={(e)=>handleChange(e)}
              className="mailInputs"
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
          <Tooltip  label="Shipping via" fontWeight={'hairline'} placement='top-start'>     
          <Select
              onChange={(e)=>handleChange(e)}
              mb={'0.5vh'}
              w={'10vw'}
              minW={'120px'}
              minH={'4.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              _hover={{borderColor: 'web.border'}}
              cursor={'pointer'}
              value={formData?.variables?.shipVia || ""}
              name={'shipVia'}
            >
            <option value='' className="options">Ship Via</option>
            <option value='Curbside' className="options">Curbside</option>
            <option value='3rd Party' className="options">3rd Party</option>
            <option value='Pick up' className="options">Pick up</option>
          </Select>
          </Tooltip>
        </HStack>
        <HStack
          display={'flex'}
          h={'6vh'}
          gap={'3vw'}
          ml={'2vw'}>
        <Tooltip  label="Shipping fee" fontWeight={'hairline'} placement='bottom-start'>
          <Input
            mb={'0.5vh'}
            w={'10vw'}
            minW={'120px'}
            minH={'4.5vh'}
            variant="unstyled"
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            placeholder={'Shipping fee'}
            type={"number"}
            name={"shippingFee"}
            disabled={disabledPrice}
            value={formData?.variables?.shippingFee || ""}
            onChange={(e)=>handleChange(e)}
            className="mailInputs"
            />
        </Tooltip>
        <Tooltip  label="Transfer fee" fontWeight={'hairline'} placement='bottom-start'>
          <Input
            mb={'0.5vh'}
            w={'10vw'}
            minW={'120px'}
            minH={'4.5vh'}
            variant="unstyled"
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            placeholder={'Transfer fee'}
            type={"number"}
            name={"transferFee"}
            disabled={disabledPrice}
            value={formData?.variables?.transferFee || ""}
            onChange={(e)=>handleChange(e)}
            className="mailInputs"
            />
        </Tooltip>
        <Tooltip  label="Crating fee" fontWeight={'hairline'} placement='bottom-start'>
          <Input
            mb={'0.5vh'}
            w={'10vw'}
            minW={'120px'}
            minH={'4.5vh'}
            variant="unstyled"
            textColor={'web.text2'}
            _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
            size={"sm"}
            borderBottomWidth={"2px"}
            borderBottomColor={'web.text2'}
            placeholder={'Crating fee'}
            type={"number"}
            name={"cratingFee"}
            disabled={disabledPrice}
            value={formData?.variables?.cratingFee || ""}
            onChange={(e)=>handleChange(e)}
            className=" "
            />
        </Tooltip>
        </HStack>
          {/* <Divider orientation={'horizontal'} w={'50%'} display={'flex'} alignSelf={'center'}/> */}
        <CreateQuoteProjectList projects={ projects } formData={formData} setFormData={setFormData} setDisable={setDisable}/>
    </Box>
  </>
)}

export default CreateQuoteCustomerProjets