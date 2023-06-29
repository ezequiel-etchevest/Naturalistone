// addFactory
import {
  VStack,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input, 
  Select,
  HStack} from "@chakra-ui/react";


export function CreateOrderInfo({sellers, progress, setProgress, formData, setFormData}) {

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    info: {
      ...formData.info,
      [name]: value,
    },
  });
};
console.log(formData)

const managerSellers = sellers.filter((seller)=> seller.Secction7Flag === 1)
return (
<>
  <form>
    <Text ml={'2vw'} mt={'2vh'} fontSize={'lg'} w={'16vw'} color={'white'} alignSelf={'flex-start'}>Order information</Text>
      <VStack mt={'10vh'} h={'40vh'}>
        <HStack w={'38vw'}display={'flex'} pb={'2vh'} justifyContent={'space-between'}>
          <Box w={'16vw'} h={'9vh'} >
          <FormControl>
          <FormLabel textColor={'web.text2'} fontSize={'sm'} name={'Value'}>Order value</FormLabel>
            <Input
              mb={'1vh'}
              pt={'0.7vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              placeholder="Only numbers in this field"
              pb={'1.5'}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Value"}
              value={formData.info.Value}
              onChange={handleChange}
              />
          </FormControl>
          </Box>
          <Box w={'16vw'} h={'9vh'}>
          <FormControl>
          <FormLabel textColor={'web.text2'}name={'InvoiceDate'} fontSize={'sm'}>Order date</FormLabel>
              <Input
                mb={'0.5vh'}
                w={'16vw'}
                minH={'4.5vh'}
                variant="unstyled"
                textColor={'web.text2'}
                _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
                size={"sm"}
                value={formData.info.InvoiceDate}
                borderBottomWidth={"2px"}
                borderBottomColor={'web.text2'}
                type={"date"}
                pattern={"\d{4}-\d{2}-\d{2}"}
                name={"InvoiceDate"}
                cursor= {'pointer'}
                onChange={(e)=>handleChange(e)}
                css={{
                  '::-webkit-calendar-picker-indicator': {   
                      background: `url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) center/90% no-repeat`,    
                      cursor: 'pointer',
                      filter: 'invert(59%) sepia(7%) saturate(31%) hue-rotate(184deg) brightness(97%) contrast(92%)',
                      marginRight: 10,
                      position: 'absolute',
                      right: 0,
                      top: 7,
                    },  
                }}
              />
          </FormControl>
          </Box>
        </HStack>
        <HStack  w={'38vw'}display={'flex'} pb={'2vh'} justifyContent={'space-between'}>
          <Box w={'16vw'} h={'9vh'}>
          <FormControl>
          <FormLabel textColor={'web.text2'}name={'Payment'} mb={'1vh'} fontSize={'sm'}>Payment</FormLabel>
            <Input
              mb={'0.5vh'}
              pt={'0.8vh'}
              pb={'1.5'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"Payment"}
              value={formData.info.Payment}
              onChange={handleChange}
              />
          </FormControl>
          </Box>
          <Box w={'16vw'} h={'9vh'}>
          <FormControl>
          <FormLabel textColor={'web.text2'}name={'Order_By'} fontSize={'sm'}>Ordered by</FormLabel>
          <Select
              onChange={(e)=>handleChange(e)}
              mb={'0.5vh'}
              w={'16vw'}
              minH={'4.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              _hover={{borderColor: 'web.border'}}
              name={'Order_By'}
              value={formData.info.Order_By}
              cursor={'pointer'}
            >
              <option className={'options'} value={''}>Select orderer</option>
              {
                  managerSellers?.map((e, i) => {
                      return(
                        <option key={i} className={'options'} value={e.sellerID}>{e.FirstName} {e.LastName}</option>
                  )})
              }
            </Select>    
          </FormControl>
          </Box>
        </HStack>
        <HStack w={'38vw'}display={'flex'} pb={'2vh'} justifyContent={'space-between'}>
          <Box w={'16vw'} h={'9vh'}>
          <FormControl>
          <FormLabel textColor={'web.text2'}name={'idFreightInvoice'} fontSize={'sm'}>Freight Invoice N°</FormLabel>
            <Input
              mb={'0.5vh'}
              pt={'0.7vh'}
              pb={'1.5'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              type={"text"}
              name={"idFreightInvoice"}
              value={formData.info.idFreightInvoice}
              onChange={handleChange}
              />
          </FormControl>
          </Box>
          <Box w={'16vw'} h={'9vh'}>
          <FormControl>
          <FormLabel textColor={'web.text2'}name={'Status'} fontSize={'sm'}>Status</FormLabel>
          <Select
              onChange={(e)=>handleChange(e)}
              mb={'0.5vh'}
              w={'16vw'}
              minH={'4.5vh'}
              variant="unstyled"
              textColor={'web.text2'}
              _placeholder={{ fontFamily: 'body', fontWeight: 'inherit', textColor: 'inherit' }}
              size={"sm"}
              borderBottomWidth={"2px"}
              borderBottomColor={'web.text2'}
              _hover={{borderColor: 'web.border'}}
              value={formData.info.Status}
              name={'Status'}
              cursor={'pointer'}
            >
              <option className={'options'} value={''}>Select status</option>
              <option className={'options'} value={'Incoming'}>Incoming</option>
              <option className={'options'} value={'Arrived'}>Arrived</option>
              <option className={'options'} value={'Canceled'}>Canceled</option>
            </Select>  
          </FormControl>
          </Box>
        </HStack>
      </VStack>
  </form>
</>
)}