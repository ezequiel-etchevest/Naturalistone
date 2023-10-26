import {Box, Spinner, Center} from '@chakra-ui/react';
import List from './list';
import Filters from './filters';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const InfoContainer = ({
  seller_invoices,
  user,
  sellers,
  focusFilter,
  setFocusFilter,
  seller_values,
  customers,
  customersFilter,
  setCustomersFilter
}) => {

  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const queryString = location.search;
  const url = new URLSearchParams(queryString)
  const getParamsTimeFilter = url.get('timeFilter')
  const getParamsSeller = url.get('seller')
  const getParamsName = url.get('name')
  const getParamsNumber = url.get('number')
  const getParamsStatus = url.get('status')
  const [inputValues, setInputValues] = useState(
    {
      inputName: getParamsName ? getParamsName : '',
      inputNumber: getParamsNumber ? getParamsNumber : '',
      selectSeller: getParamsSeller ? getParamsSeller : '',
      timeFilter: getParamsTimeFilter ? getParamsTimeFilter : 'All',
      quoteStatus: getParamsStatus ? getParamsStatus : '',
    })

  useEffect(() => {
    // Lógica para controlar los cambios en inputvalues
    // ...
    // Simulación de una carga de datos por 5 segundos
    setTimeout(() => {
     setLoading(false);
    }, 1000);
  }, [loading]); // Asegúrate de incluir inputvalues como una dependencia del efecto


      if(seller_invoices.length){
        return(
            <Box
            userSelect={'none'}
            ml={'16vw'}
            bg={'web.bg'}> 
            <Filters
              seller_values={seller_values}
              seller_invoices={seller_invoices}
              user={user}
              sellers={sellers}
              setFocusFilter={setFocusFilter}
              focusFilter={focusFilter}
              customers={customers}
              inputValues={inputValues}
              setInputValues={setInputValues}
              setLoading={setLoading}
              customersFilter={customersFilter}
              setCustomersFilter={setCustomersFilter}
            />
            {
              loading 
                ?
                  <Center ml={'20vw'} w={'40vw'} bg={'web.bg'} h={'70vh'}>
                      <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'} />
                    </Center>
                :
                  <List seller_invoices={seller_invoices} user={user} />
            }
            </Box>
        )}else{
            return(
              <Center ml={'16vw'} w={'84vw'} bg={'web.bg'} h={'92vh'}>
                <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
              </Center>
            )
          }
}
export default InfoContainer;