import {Box} from '@chakra-ui/react';
import InvoiceErrorsTable from './invoiceErrorsTable';
import InvoiceErrorsFilters from './invoiceErrorsFilters';
import { useState } from "react";

const InvoiceErrorsContainer = ({invoice_errors, user, sellers, invoice_errors_by_filter}) => {
   const [filteredInvoicesErrors, setFilteredInvoicesErrors] = useState([])

    return(
      <Box
        ml={'20vw'}
        bg={'web.bg'}> 
        <InvoiceErrorsFilters user={user} sellers={sellers} invoice_errors_by_filter={invoice_errors_by_filter} invoice_errors={invoice_errors} setFilteredInvoicesErrors={setFilteredInvoicesErrors}/>
        <InvoiceErrorsTable invoice_errors={invoice_errors} user={user} invoice_errors_by_filter={invoice_errors_by_filter} filteredInvoicesErrors={filteredInvoicesErrors}/>
      </Box>
    )
}
export default InvoiceErrorsContainer;