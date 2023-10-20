import { Box, Text } from "@chakra-ui/react";
import CustomerInformation from './customerInformation';
import CustomerRelationShipList from "./CustomerRelationShipList";
import { CustomerRelationShip } from "./CustomerRelationShip";
import ProjectList from "./projectList";
import InvoiceList from "./invoiceList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerRelationship } from "../../../redux/actions-customers";
import { getSellers } from "../../../redux/actions-sellers";
import { getEmployeeById } from "../../../redux/actions-employees";


const CustomerDetail = ({user, customer, projects_by_customer_id }) => {

  const customer_relationship = useSelector(state => state.customer_relationship)
  const sellers = useSelector(state => state.sellers)
  const userLocal = JSON.parse(localStorage.getItem('user'))

  const dispatch = useDispatch()
  useEffect(() => {
    if(!customer_relationship.length) dispatch(getCustomerRelationship(customer.CustomerID))
    if(!sellers.length) dispatch(getSellers())
    if(userLocal && !user.length){
      dispatch(getEmployeeById(userLocal.SellerID))
    }
  },[])

  const [highlight, sethighlight] = useState('');

  return(
    <>     
      <Box 
      bg={'web.bg'}  
      ml={'16vw'} 
      h={'92vh'}
      display={'flex'} 
      >
        <Box 
        display={'flex'} 
        flexDir={'row'}
        my={'3vh'}
        ml={'2vw'}
        >
        {/*Customer info & notes */}
          <Box
          display={'flex'} 
          flexDir={'row'}>
            <CustomerInformation customer={customer} sellers={sellers} user={user}/>
          </Box>
        {/*Boxes */}
        <Box
        display={"flex"}
        flexDir={"column"}>
          <Box
            mx={'1vw'}
            h={'41.5vh'}
            display={'flex'}
            userSelect={'none'}
            px={'1.5vw'}
            py={'3vh'}
            w={'56vw'}
            flexDir={'column'}
            color={'web.text'}
            bg={'web.sideBar'}
            border={'1px solid'} 
            rounded={'md'} 
            borderColor={'web.border'}
            >
              <Text
                alignItems={'baseline'}
                justifySelf={'flex-start'}
                mb={'1vh'} 
                pl={'0.5vw'} 
                fontSize={'1.3rem'} 
                color={'web.text2'}
                  >Projects & Invoices</Text> 
              <Box display={'flex'} flexDir={'row'}>
                <ProjectList projects_by_customer_id={projects_by_customer_id} customer={customer} highlight={highlight} sethighlight={sethighlight}/>
                <InvoiceList/> 

              </Box>
          </Box> 
          <Box
            mx={'1vw'}
            mt={"20px"}
            h={'41.5vh'}
            display={'flex'}
            userSelect={'none'}
            px={'1.5vw'}
            py={'3vh'}
            w={'56vw'}
            flexDir={'column'}
            color={'web.text'}
            bg={'web.sideBar'}
            border={'1px solid'} 
            rounded={'md'} 
            borderColor={'web.border'}
            >
              <CustomerRelationShip user={user} customer={customer}/>
              <CustomerRelationShipList customer_relationship={customer_relationship}/>
              </Box>
        </Box>
        {/*Boxes*/}
        <Box 
        ml={'1vw'} 
        mt={'3vh'} 
        display={'flex'} 
        flexDir={'column'} >
        </Box>          
      </Box>        
      </Box>        
    </>
  )
  }

  export default CustomerDetail;