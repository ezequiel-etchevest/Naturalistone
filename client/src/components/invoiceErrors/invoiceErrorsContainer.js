import {Box} from '@chakra-ui/react';
import InvoiceErrorsTable from './invoiceErrorsTable';
import InvoiceErrorsFilters from './invoiceErrorsFilters';

const InvoiceErrorsContainer = ({invoice_errors, user, sellers, invoice_errors_by_id}) => {

    return(
      <Box
        ml={'20vw'}
        bg={'web.bg'}> 
        <InvoiceErrorsFilters invoice_errors={invoice_errors} user={user} sellers={sellers} />
        <InvoiceErrorsTable invoice_errors={invoice_errors} user={user} sellers={sellers} invoice_errors_by_id={invoice_errors_by_id} />
      </Box>
    )
}
export default InvoiceErrorsContainer;