import { Box, Text } from "@chakra-ui/react"
import { useEffect } from "react"


const FreightDetailList = ({freight}) => {

  return(
    <>
      <Box
        userSelect={'none'}
        className={'order-details'}
        mt={'3vh'}
        ml={'2vw'}
        mr={'1vw'}
        py={'2vw'}
        px={'2vw'}
        h={'44vh'}
        w={'28vw'}
        display={'flex'}
        flexDir={'column'}
        color={'web.text'}
        bg={'web.sideBar'}
        border={'1px solid'} 
        rounded={'md'} 
        borderColor={'web.border'} 
        > 
        {/*Title box*/}       
        <Box 
          display={'flex'} 
          flexDir={'row'} 
          alignItems={'center'}
          
          >
          <Text
            fontSize={'2.3vh'} 
            color={'web.text2'} 
            ml={'1vh'}>
            Freight Details -
            </Text>
            <Text 
            color={'logo.orange'} 
            fontSize={'2.8vh'}
            ml={'2vh'}>
              {freight.FreightRefNumber}
            </Text>
          {/* <CancerlOrderModal/>   */}
        </Box>
        {/*Descriptions*/}
        <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} px={'1vh'}>
        <Box
          mt={'1vh'}
          w={'11vw'}
          h={'30vh'}
          display={'flex'}
          flexDir={'column'}
          justifyContent={'space-between'}
          >
          <Box>
            <Text 
              color={'web.text2'} 
              fontSize={'sm'}>
                Invoice Date
            </Text>
            <Text 
              fontSize={'md'} 
              fontWeight={'bold'}>
                {freight.InvoiceDate ? freight.InvoiceDate.slice(0,10) : '-'}
            </Text>
          </Box>
          <Box>
            <Text 
              color={'web.text2'} 
              fontSize={'sm'}>
                Estimated Date
            </Text>
            <Text 
              fontSize={'md'} 
              fontWeight={'bold'}>
                {freight.EstimatedDate ? freight.EstimatedDate.slice(0,10) : '-'}
            </Text>
          </Box>
          <Box>
            <Text 
              fontSize={'sm'} 
              color={'web.text2'}>
                Origin
            </Text>
            <Text 
              fontSize={'md'}
              fontWeight={'bold'}>
                {freight.Origin ?? '-'}
            </Text>
          </Box>
          <Box>
            <Text 
                color={'web.text2'} 
                fontSize={'sm'}>
                  Destination
              </Text>
              <Text 
                fontSize={'md'} 
                fontWeight={'bold'}>
                  {freight.Destination ?? '-'}
              </Text>
          </Box>
          <Box>
          <Text 
            color={'web.text2'} 
            fontSize={'sm'}>
              HBL
          </Text>
          <Text 
            fontSize={'md'} 
            fontWeight={'bold'}>
              {freight.HBL ?? '-'}
          </Text>
          </Box>
        </Box>
        <Box
          mt={'1vh'}
          w={'11vw'}
          h={'30vh'}
          display={'flex'}
          flexDir={'column'}
          justifyContent={'space-between'}
          >
          <Box>
            <Text 
              fontSize={'sm'}
              color={'web.text2'}
              >
              Description Of Goods
            </Text>
            <Text
              fontSize={'md'}
              w={'11vw'} 
              fontWeight={'bold'}>
                {freight.DescriptionOfGoods ?? '-'}
            </Text>
          </Box>       
          <Box>
          <Text 
            fontSize={'sm'}
            color={'web.text2'}
            >
            Packages
          </Text>
          <Text
            fontSize={'md'}
            w={'11vw'} 
            fontWeight={'bold'}>
              {freight.Packages ?? '-'}
          </Text>
          </Box>
          <Box>
          <Text 
            fontSize={'sm'} 
            color={'web.text2'}>
              Gross Weight
          </Text>
          <Text 
            fontSize={'md'} 
            fontWeight={'bold'}>
              {freight.GrossWeight ? freight.GrossWeight.toLocaleString('en-us') : '-'}
          </Text>
          </Box>
          <Box>
          <Text 
            color={'web.text2'} 
            fontSize={'sm'}>
              Total Cost
          </Text>
          <Text 
            fontSize={'md'} 
            fontWeight={'bold'}>
             $ {freight.TotalCost ? freight.TotalCost.toLocaleString('en-US') : '-'}
          </Text>
          </Box>
          <Box>
          <Text 
            color={'web.text2'} 
            fontSize={'sm'}>
              Invoice Number
          </Text>
          <Text 
            fontSize={'md'} 
            fontWeight={'bold'}>
              {freight.InvoiceNumber ?? '-'}
          </Text>
          </Box>
        </Box> 
        </Box>
        </Box>

    </>
  )
}

export default FreightDetailList