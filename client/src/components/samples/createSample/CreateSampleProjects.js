  import {
    Text,
    Box,
    HStack,
    Input,
    Tooltip,
    Divider,
    Select,
  } from "@chakra-ui/react";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect } from "react";
  import { CreateNewProject } from "../../customers/customerDetail/createProject";
  import "../../../assets/styleSheet.css";
  import CreateSampleProjectList from "./CreateSampleProjectList";
  import { validateInputTracking } from "../../../utils/validateForm";
  import { validateTrackingNumber } from "../../../redux/actions-samples";

  const CreateSampleProjects = ({formData, setFormData, setDisable, errorsProjectList, setErrorsProjectList }) => {
    
    const projects = useSelector((state) => state.projects_by_customer_id);
    const dispatch = useDispatch();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setErrorsProjectList({})
      const errors = validateInputTracking(formData)
        setFormData({
          ...formData,
          variables: {
            ...formData.variables,
            [name]: value,
          },
        });
      setErrorsProjectList(errors)
    };

    useEffect(() => {
      setErrorsProjectList(validateInputTracking(formData));
      dispatch(validateTrackingNumber(formData.variables.trackingNumber))
    }, [formData]);


    return (
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
                Information
              </Text>
            </Box>
            <Box display={'flex'}w={'94%'} flexDir={'row'} justifyContent={'space-between'} mb={'3vh'} ml={'1vw'}>
            <Box w={'60%'} display={"flex"} justifyContent={'space-between'} flexDirection={"row"} pl={'1vw'}>
            <Box>
            {/* <Text fontSize="sm" fontWeight={"semisemibold"}>Tracking Number</Text> */}
            <Input
              mb={"0.5vh"}
              w={"180px"}
              minH={"4.5vh"}
              variant="unstyled"
              textColor={"web.text2"}
              className="mailInputs"
              _placeholder={{ fontFamily: "body", fontWeight: "thin" }}
              placeholder="Tracking Number"
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={"web.text2"}
              type={"text"}
              name={"trackingNumber"}
              value={formData.variables.trackingNumber || ""}
              onChange={(e) => handleChange(e)}
            />
            {errorsProjectList.trackingNumber && (
              <Text
                mt={"0.5vh"}
                position={"absolute"}
                color={"web.error"}
                fontSize={"xs"}
                ml={"5vw"}
              >
                {errorsProjectList.trackingNumber}
              </Text>
            )}
            </Box>
            <Box>
              {/* <Text fontSize="sm" fontWeight={"semisemibold"}>Estimated Delivery Date </Text> */}
              <Input
                mb={'0.5vh'}
                w={"160px"}
                minH={'4.5vh'}
                variant="unstyled"
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'thin' }}
                size={"sm"}
                value={formData.variables.estDelivDate}
                borderBottomWidth={"2px"}
                borderBottomColor={'web.text2'}
                type={"date"}
                pattern={"\d{4}-\d{2}-\d{2}"}
                name={"estDelivDate"}
                cursor= {'pointer'}
                onChange={(e) => handleChange(e)}
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
              {errorsProjectList.estDelivDate && (
              <Text
                mt={"0.5vh"}
                position={"absolute"}
                color={"web.error"}
                fontSize={"xs"}
                ml={"5vw"}
              >
                {errorsProjectList.estDelivDate}
              </Text>
            )}
            </Box>
            </Box>
            <Box alignSelf={'flex-end'}>
              <CreateNewProject customer={formData.customer} />
            </Box>
          </Box>
          <CreateSampleProjectList
            projects={projects}
            formData={formData}
            setFormData={setFormData}
            setDisable={setDisable}
          />
          </Box>
      </>
    );
  };

  export default CreateSampleProjects;
