import {Box, Spinner, Center} from '@chakra-ui/react';
import InvoiceErrorsTable from './invoiceErrorsTable';
import InvoiceErrorsFilters from './invoiceErrorsFilters';
import { useState, useEffect } from "react";

const InvoiceErrorsContainer = ({invoice_errors, user, sellers, invoice_errors_by_filter}) => {
   const [filteredInvoicesErrors, setFilteredInvoicesErrors] = useState([])
   const [ spinner, setSpinner ] = useState(false)
   const handleSpinner = () => {
    setTimeout(()=>{ setSpinner(true)}, 500)
  }
  useEffect(()=>{
    handleSpinner()
  })
  if(spinner === true){
    return(
      <Box
        userSelect={'none'}
        ml={'16vw'}
        bg={'web.bg'}> 
        <InvoiceErrorsFilters 
          user={user} 
          sellers={sellers} 
          invoice_errors_by_filter={invoice_errors_by_filter} 
          invoice_errors={invoice_errors} 
          setFilteredInvoicesErrors={setFilteredInvoicesErrors}/>
        <InvoiceErrorsTable 
          invoice_errors={invoice_errors} 
          user={user} 
          invoice_errors_by_filter={invoice_errors_by_filter} 
          filteredInvoicesErrors={filteredInvoicesErrors}/>
      </Box>
    )
  }else{
    return(
      <Center ml={'16vw'} w={'84vw'} bg={'web.bg'} h={'92vh'}>
        <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
      </Center>
    )
  }
}
export default InvoiceErrorsContainer;