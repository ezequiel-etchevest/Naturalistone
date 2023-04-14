import { 
    Box, 
    HStack, 
    IconButton,
    Select,
    Divider,
    Tooltip,
    } from "@chakra-ui/react";
import '../../assets/styleSheet.css';
import {AiOutlineClear} from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSellers } from "../../redux/actions-sellers";
import { getCurrentMonth, getPaymentStats } from "../../redux/actions-stats";
  
const StatsFilters = ({user}) => {
    
  const dispatch = useDispatch()
  const sellers = useSelector(state => state.sellers)
  const handleSellerSelect = (e) => {
    if(e.target.value === 'all') {
      dispatch(getCurrentMonth(3, 1))
      dispatch(getPaymentStats(3, 1))
    }
    else {
      dispatch(getCurrentMonth(Number(e.target.value), 0))
      dispatch(getPaymentStats(Number(e.target.value), 0))
    }
    }
  useEffect(()=>{
    if(!sellers.length) dispatch(getSellers())
    },[sellers])
  return (
    <Box>
      <HStack
      ml={'2vw'}
      mr={'2vw'} 
      h={'17vh'}
      w={'80vw'}
      justifyContent={'space-between'}
      >
      {/*Inputs*/}
        <Box
        display={'flex'}
        alignItems={'center'}
        w={'48vw'}
        >         
        </Box>
      {/*Selects */}
        <Box 
        w={'28vw'} 
        display={'flex'}
        justifyContent={'flex-end'}
        > 
          <Select
          onChange={(e)=>handleSellerSelect(e)}
          w={'15vw'}
          variant='outline' 
          h={'4.4vh'}
          fontSize={'xs'}            
          bg={'web.sideBar'}
          color={'web.text2'}
          borderColor={'web.border'}
          cursor={'pointer'}
          _focus={{
            borderColor: 'logo.orange',
            boxShadow: '0 0.5px 0.5px rgba(229, 103, 23, 0.075)inset, 0 0 5px rgba(255,144,0,0.6)'
          }}>
            <option value={'all'} className="options">All seller</option>
              {  
                  sellers?.map((e, i) => {
                      return(
                        <option key={i} className={'options'} value={e.SellerID}>{e.FirstName} {e.LastName}</option>
                  )})
              }
            </Select>
          </Box>
          <Divider orientation={'vertical'} h={'5vh'}/>
          <Tooltip placement={'bottom-start'} label={'Clear all filters'} fontWeight={'hairline'}>      
            <IconButton
            disabled={true}
            icon={ <AiOutlineClear/>}
            variant={'unstyled'} 
            display={'flex'} 
            borderRadius={'sm'} 
            placeContent={'center'}
            alignItems={'center'}
            color={'web.text2'} 
            _hover={{
               color: 'logo.orange'
               }}
            _active={{
            }}
            >
            </IconButton>
          </Tooltip>   
      </HStack>
    </Box>
      )
  }
  
  export default StatsFilters